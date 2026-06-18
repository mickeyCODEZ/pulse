"""Swappable geocoding backends behind geocode.py. CentroidGeocoder is the
offline default (city centroid + deterministic jitter). NominatimGeocoder does
real address→lat/lng with the policy-mandated guards: real UA, strict 1 req/s,
persistent cache (never resolve a query twice), and a per-run network budget that
degrades to the centroid rather than stalling."""
from __future__ import annotations

import time
from datetime import datetime, timezone
from typing import Optional

import httpx
from sqlmodel import Session

from ..models import GeocodeCache
from ..sources.base import USER_AGENT

_NOMINATIM = "https://nominatim.openstreetmap.org/search"
_last_call = [0.0]  # module-level 1 req/s gate
_mem: dict[str, Optional[tuple[float, float]]] = {}


class NominatimGeocoder:
    def __init__(self, session: Session, budget: int = 50) -> None:
        self.session = session
        self.budget = budget
        self.stats = {"cache_hits": 0, "network": 0, "fallbacks": 0}

    def lookup(self, query: str) -> Optional[tuple[float, float]]:
        key = " ".join(query.lower().split())[:200]
        if not key:
            return None
        # in-process cache
        if key in _mem:
            self.stats["cache_hits"] += 1
            return _mem[key]
        # persistent cache
        row = self.session.get(GeocodeCache, key)
        if row is not None:
            self.stats["cache_hits"] += 1
            coords = (row.lat, row.lng) if row.lat is not None and row.lng is not None else None
            _mem[key] = coords
            return coords
        # network (budgeted, 1 req/s)
        if self.budget <= 0:
            self.stats["fallbacks"] += 1
            return None
        self.budget -= 1
        wait = 1.0 - (time.monotonic() - _last_call[0])
        if wait > 0:
            time.sleep(wait)
        _last_call[0] = time.monotonic()
        coords: Optional[tuple[float, float]] = None
        transient = False
        try:
            r = httpx.get(_NOMINATIM, params={"q": query, "format": "json", "limit": 1},
                          headers={"User-Agent": USER_AGENT}, timeout=10.0)
            self.stats["network"] += 1
            if r.status_code == 200:
                arr = r.json()
                if arr:
                    coords = (float(arr[0]["lat"]), float(arr[0]["lon"]))
                # else: a real "no match" — cache the miss so we don't re-query
            else:
                transient = True  # rate-limited / server error → allow a retry later
        except Exception:
            transient = True
        if not transient:
            # Persist hits and genuine misses only (policy: never re-query these).
            self.session.add(GeocodeCache(query=key, lat=coords[0] if coords else None,
                                          lng=coords[1] if coords else None, ts=datetime.now(timezone.utc)))
            if len(_mem) > 20000:
                _mem.clear()
            _mem[key] = coords
        return coords


def make_geocoder(session: Session, mode: str, budget: int = 50) -> Optional[NominatimGeocoder]:
    return NominatimGeocoder(session, budget) if mode == "nominatim" else None
