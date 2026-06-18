"""LocalistSource — Localist `/api/2/events.json` (free-to-read JSON). Richer than
the `.ics` sibling: images, geo, free flag, categories, and multiple
`event_instances` we expand into distinct occurrences. City-bound."""
from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from .base import RawEventPayload, Source

MAX_EVENTS = 100


def _label(iso: str | None) -> str:
    if not iso:
        return ""
    try:
        dt = datetime.fromisoformat(iso.replace("Z", "+00:00"))
        hour = dt.strftime("%I").lstrip("0") or "12"
        return f"{dt.strftime('%a')} · {hour}:{dt.strftime('%M')}{dt.strftime('%p').lower()}"
    except ValueError:
        return ""


def _category(ev: dict[str, Any]) -> str:
    filters = ev.get("filters") or {}
    for key in ("event_types", "event_topic", "departments"):
        vals = filters.get(key)
        if isinstance(vals, list) and vals:
            return str(vals[0].get("name", "Community"))
    return "Community"


class LocalistSource(Source):
    type = "localist"
    min_interval_s = 1.0

    def __init__(self, name: str, city: str, lat: float, lng: float, base_url: str, popularity: float = 0.4) -> None:
        self.name = name
        self.city = city
        self.base = (lat, lng)
        self.base_url = base_url.rstrip("/")
        self.popularity = popularity

    def fetch(self, city: str, window_days: int = 30, lat: float | None = None, lng: float | None = None
              ) -> list[RawEventPayload]:
        if city.lower() != self.city.lower():
            return []
        url = f"{self.base_url}/api/2/events?days={window_days}&pp={MAX_EVENTS}"
        resp = self.get(url, timeout=20.0)
        if resp is None:
            return []
        try:
            data = resp.json()
        except Exception:
            return []

        out: list[RawEventPayload] = []
        for wrap in data.get("events", []):
            ev = wrap.get("event", {}) if isinstance(wrap, dict) else {}
            if not ev.get("title"):
                continue
            geo = ev.get("geo") or {}
            lat_v = geo.get("latitude")
            lng_v = geo.get("longitude")
            free = ev.get("free")
            base_payload = {
                "title": ev.get("title", ""),
                "category": _category(ev),
                "venue_name": ev.get("location_name") or "",
                "city": self.city,
                "lat": float(lat_v) if lat_v else None,
                "lng": float(lng_v) if lng_v else None,
                "description": ev.get("description_text") or ev.get("description") or "",
                "image_url": ev.get("photo_url") or "",
                "is_free": bool(free) if free is not None else None,
                "sources": [self.name],
                "popularity_signal": self.popularity,
            }
            # one payload per upcoming instance
            for inst in ev.get("event_instances", []) or []:
                start = (inst.get("event_instance") or {}).get("start")
                if not start:
                    continue
                p = dict(base_payload)
                p["start_utc"] = start
                p["date_label"] = _label(start)
                out.append(RawEventPayload(raw_url=ev.get("localist_url") or ev.get("url_path") or self.base_url, payload=p))
                if len(out) >= MAX_EVENTS:
                    return out
        return out
