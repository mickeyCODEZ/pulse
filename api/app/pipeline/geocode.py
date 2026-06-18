"""Stage 3 — geocode. Venue → lat/lng. Swap in Nominatim (free, cached, rate
limited) behind this same function later; for now we resolve to the city
centroid plus a deterministic per-venue offset so the map panel spreads out and
results stay stable across reruns (idempotent)."""
from __future__ import annotations

import hashlib
from typing import Any

# city centroids; extend as cities are added
CENTROIDS: dict[str, tuple[float, float]] = {
    "Lisbon": (38.7223, -9.1393),
    "Berlin": (52.52, 13.405),
    "Porto": (41.1579, -8.6291),
    "Reykjavík": (64.1466, -21.9426),
    "New York": (40.7128, -74.006),
    "Mexico City": (19.4326, -99.1332),
    "Berkeley": (37.8719, -122.2585),
}

_cache: dict[str, tuple[float, float]] = {}


def _jitter(key: str) -> tuple[float, float]:
    h = hashlib.sha256(key.encode()).digest()
    # map two bytes to ±0.05° (~5km) offsets, deterministic
    dx = (h[0] / 255 - 0.5) * 0.1
    dy = (h[1] / 255 - 0.5) * 0.1
    return dx, dy


_CACHE_CAP = 8000


def geocode(c: dict[str, Any], geocoder: Any = None) -> dict[str, Any]:
    """Resolve coords. Real coords pass through (`_geo_real=True`). If a `geocoder`
    (Nominatim) is supplied, try a real address lookup first; otherwise fall back to
    the city centroid + deterministic jitter (`_geo_real=False`) — never blocking
    ingest. The `_geo_real` flag lets dedupe avoid treating jittered centroids as a
    precise location (which would split identical coordless events)."""
    if c.get("lat") is not None and c.get("lng") is not None:
        c["_geo_real"] = True
        return c
    city = c.get("city") or "Lisbon"

    if geocoder is not None and c.get("venue_name"):
        query = ", ".join(p for p in (c.get("venue_name", ""), city) if p)
        coords = geocoder.lookup(query)
        if coords:
            c["lat"], c["lng"] = coords
            c["_geo_real"] = True
            return c
        if hasattr(geocoder, "stats"):
            geocoder.stats["fallbacks"] += 1

    # Centroid fallback — keyed on the *normalized* identity (slug + date) so the
    # same event from different sources/titles lands on identical coords, keeping
    # dedup_key stable across runs.
    from .dedupe import _date_bucket, _slug

    base = CENTROIDS.get(city, (38.7223, -9.1393))
    key = f"{city}|{_slug(c.get('title', ''))}|{_date_bucket(c.get('start_utc'))}"
    if key not in _cache:
        if len(_cache) > _CACHE_CAP:
            _cache.clear()
        dx, dy = _jitter(key)
        _cache[key] = (base[0] + dy, base[1] + dx)
    c["lat"], c["lng"] = _cache[key]
    c["_geo_real"] = False
    return c
