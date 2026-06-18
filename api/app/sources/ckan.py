"""CkanSource — civic open data (no key). Three shapes:
  - json_feed : fetch a JSON resource file (e.g. Toronto Festivals & Events) and
                map each record. Tolerant of the city's `calEvent` wrapper.
  - dated     : CKAN DataStore `datastore_search` over a dated events resource.
  - directory : CKAN DataStore over a static listing (farmers markets) → synthesize
                upcoming occurrences from a schedule column.
City-bound (a dataset belongs to a place). Failures swallowed — ELT judges later."""
from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from .base import RawEventPayload, Source
from .recurrence import synthesize

MAX_RECORDS = 200


def _first(d: dict[str, Any], *keys: str) -> Any:
    """Return the first present, non-empty value among candidate keys (case-insensitive)."""
    low = {k.lower(): v for k, v in d.items()}
    for k in keys:
        v = low.get(k.lower())
        if v not in (None, "", [], {}):
            return v
    return None


def _coords(item: dict[str, Any]) -> tuple[float | None, float | None]:
    # Toronto: locations[0].coords {lat,lng}; generic: lat/lng/latitude/longitude columns
    locs = _first(item, "locations", "location")
    if isinstance(locs, list) and locs:
        locs = locs[0]
    if isinstance(locs, dict):
        coords = _first(locs, "coords", "geo") or locs
        lat = _first(coords, "lat", "latitude")
        lng = _first(coords, "lng", "lon", "longitude")
        if lat and lng:
            try:
                return float(lat), float(lng)
            except (TypeError, ValueError):
                pass
    lat = _first(item, "lat", "latitude")
    lng = _first(item, "lng", "lon", "longitude")
    try:
        return (float(lat), float(lng)) if lat and lng else (None, None)
    except (TypeError, ValueError):
        return None, None


def _venue(item: dict[str, Any]) -> str:
    locs = _first(item, "locations", "location")
    if isinstance(locs, list) and locs:
        locs = locs[0]
    if isinstance(locs, dict):
        return str(_first(locs, "locationName", "name", "address") or "")
    return str(locs or _first(item, "venue", "venue_name", "address") or "")


def _start(item: dict[str, Any]) -> str | None:
    # Toronto: dates:[{startDateTime|startDate}]; generic: start/startDate columns
    dates = _first(item, "dates")
    if isinstance(dates, list) and dates and isinstance(dates[0], dict):
        return _first(dates[0], "startDateTime", "startDate", "start")
    return _first(item, "startDateTime", "startDate", "start_date", "start", "date")


class CkanSource(Source):
    type = "ckan"
    min_interval_s = 1.0

    def __init__(self, name: str, city: str, lat: float, lng: float, base_url: str,
                 resource_id: str = "", kind: str = "json_feed", field_map: dict | None = None,
                 popularity: float = 0.25, category: str = "Festival") -> None:
        self.name = name
        self.city = city
        self.base = (lat, lng)
        self.base_url = base_url
        self.resource_id = resource_id
        self.kind = kind
        self.field_map = field_map or {}
        self.popularity = popularity
        self.category = category

    def fetch(self, city: str, window_days: int = 30, lat: float | None = None, lng: float | None = None
              ) -> list[RawEventPayload]:
        if city.lower() != self.city.lower():
            return []
        records = self._records()
        if not records:
            return []
        if self.kind == "directory":
            return self._directory(records, window_days)
        return self._dated(records)

    # ---- fetch records (json_feed file or datastore_search) -----------------
    def _records(self) -> list[dict[str, Any]]:
        if self.kind == "json_feed":
            resp = self.get(self.base_url, timeout=25.0)
            if resp is None:
                return []
            try:
                data = resp.json()
            except Exception:
                return []
            items = data if isinstance(data, list) else data.get("result", {}).get("records", data)
            out = []
            for it in items[:MAX_RECORDS] if isinstance(items, list) else []:
                out.append(it.get("calEvent", it) if isinstance(it, dict) else {})
            return [x for x in out if x]
        # datastore_search
        url = f"{self.base_url}/api/3/action/datastore_search?resource_id={self.resource_id}&limit={MAX_RECORDS}"
        data = self.get_json_failover(lambda _k: url, [""])  # no key; reuse failover plumbing
        if not data:
            return []
        return data.get("result", {}).get("records", [])

    # ---- map a dated event record -------------------------------------------
    def _to_payload(self, item: dict[str, Any], start_iso: str | None, date_label: str = "") -> RawEventPayload | None:
        title = str(_first(item, *self.field_map.get("title", []), "eventName", "name", "title", "event_name") or "").strip()
        if not title:
            return None
        lat, lng = _coords(item)
        cost = _first(item, "cost", "price", "admission")
        free = _first(item, "freeEvent", "free", "is_free")
        is_free = bool(free) if free is not None else (not cost or str(cost).strip().lower() in ("0", "free", ""))
        return RawEventPayload(
            raw_url=str(_first(item, "eventWebsite", "url", "link", "website") or self.base_url),
            payload={
                "title": title,
                "category": str(_first(item, "category", "eventCategory") or self.category),
                "start_utc": start_iso,
                "date_label": date_label,
                "end_utc": None,
                "venue_name": _venue(item),
                "city": self.city,
                "lat": lat,  # None → geocoder resolves the address
                "lng": lng,
                "description": str(_first(item, "description", "shortDescription", "details") or ""),
                "image_url": str(_first(item, "image", "thumbImage", "imageUrl") or ""),
                "sources": [self.name],
                "popularity_signal": self.popularity,
            },
        )

    def _dated(self, records: list[dict[str, Any]]) -> list[RawEventPayload]:
        out: list[RawEventPayload] = []
        for item in records:
            try:
                start = _start(item)
                if not start:
                    continue
                p = self._to_payload(item, start)
                if p:
                    out.append(p)
            except Exception:
                continue
        return out

    # ---- directory (static listings) → synthesize occurrences ---------------
    def _directory(self, records: list[dict[str, Any]], window_days: int) -> list[RawEventPayload]:
        now = datetime.now(timezone.utc)
        out: list[RawEventPayload] = []
        for item in records:
            try:
                sched_text = str(
                    _first(item, *self.field_map.get("schedule", []), "schedule", "hours", "days", "season", "dates") or ""
                )
                starts, ongoing = synthesize(sched_text, now, count=4, window_days=max(window_days, 60))
                for dt in starts:
                    p = self._to_payload(item, dt.isoformat(), date_label=ongoing or "")
                    if p:
                        p.payload["category"] = self.category  # e.g. "Farmers market"
                        out.append(p)
            except Exception:
                continue
        return out
