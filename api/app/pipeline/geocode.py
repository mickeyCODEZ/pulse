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
    # GTA (Greater Toronto Area)
    "Toronto": (43.6532, -79.3832),
    "Mississauga": (43.589, -79.6441),
    "Brampton": (43.7315, -79.7624),
    "Hamilton": (43.2557, -79.8711),
    "Markham": (43.8561, -79.337),
    "Vaughan": (43.8361, -79.4983),
    "Oakville": (43.4675, -79.6877),
    "Richmond Hill": (43.8828, -79.4403),
    "Burlington": (43.3255, -79.799),
    # Eastern US
    "Brooklyn": (40.6782, -73.9442),
    "Newark": (40.7357, -74.1724),
    "Jersey City": (40.7178, -74.0431),
    "Boston": (42.3601, -71.0589),
    "Philadelphia": (39.9526, -75.1652),
    "Washington": (38.9072, -77.0369),
    "Atlanta": (33.749, -84.388),
    "Miami": (25.7617, -80.1918),
    "Baltimore": (39.2904, -76.6122),
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
