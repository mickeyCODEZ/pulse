"""SeatGeek Discovery — free `client_id` (seatgeek.com/build, ~2-min signup).
US-strong live-events dataset with venue coordinates, prices, and performer
images. Surfaces inventory Ticketmaster misses; dedupe unions the overlap into
"also on". Interface-complete but disabled until SEATGEEK_CLIENT_ID is set."""
from __future__ import annotations

from datetime import datetime, timezone

from ..config import settings
from ..pipeline.geocode import CENTROIDS
from .base import RawEventPayload, Source

_TYPE = {
    "concert": "Live music", "music_festival": "Live music",
    "theater": "Theatre", "broadway_tickets_national": "Theatre", "theatre": "Theatre",
    "comedy": "Comedy",
    "film": "Film", "movie": "Film",
}


def _category(type_str: str) -> str:
    t = (type_str or "").lower()
    if t in _TYPE:
        return _TYPE[t]
    if "sport" in t or t in ("nba", "nfl", "mlb", "nhl", "mls", "soccer"):
        return "Sports"
    if "concert" in t or "music" in t:
        return "Live music"
    if "theater" in t or "broadway" in t:
        return "Theatre"
    return "Event"


def _label(local_iso: str | None) -> str:
    if not local_iso:
        return ""
    try:
        dt = datetime.fromisoformat(local_iso)
        hour = dt.strftime("%I").lstrip("0") or "12"
        return f"{dt.strftime('%a')} · {hour}:{dt.strftime('%M')}{dt.strftime('%p').lower()}"
    except ValueError:
        return ""


def _image(ev: dict) -> str:
    for p in ev.get("performers", []) or []:
        imgs = p.get("images") or {}
        return imgs.get("huge") or imgs.get("large") or p.get("image") or ""
    return ""


class SeatGeekSource(Source):
    type = "api"
    name = "SeatGeek"
    min_interval_s = 0.3

    @property
    def enabled(self) -> bool:  # type: ignore[override]
        return bool(settings.seatgeek_keys)

    def fetch(
        self, city: str, window_days: int = 30, lat: float | None = None, lng: float | None = None
    ) -> list[RawEventPayload]:
        if not self.enabled:
            return []
        if lat is None or lng is None:
            lat, lng = CENTROIDS.get(city, (38.7223, -9.1393))
        base = "https://api.seatgeek.com/2/events"
        data = self.get_json_failover(
            lambda key: f"{base}?client_id={key}&lat={lat}&lon={lng}&range=25mi&per_page=50&sort=datetime_utc.asc",
            settings.seatgeek_keys,
        )
        if data is None:
            return []

        out: list[RawEventPayload] = []
        for ev in data.get("events", []):
            try:
                utc = ev.get("datetime_utc")
                start = f"{utc}+00:00" if utc and "+" not in utc and "Z" not in utc else utc
                if start:
                    start = datetime.fromisoformat(start.replace("Z", "+00:00")).astimezone(timezone.utc).isoformat()
                venue = ev.get("venue", {}) or {}
                loc = venue.get("location", {}) or {}
                price = (ev.get("stats", {}) or {}).get("lowest_price")
                out.append(
                    RawEventPayload(
                        raw_url=ev.get("url", ""),
                        payload={
                            "title": ev.get("title", "") or ev.get("short_title", ""),
                            "category": _category(ev.get("type", "")),
                            "start_utc": start,
                            "date_label": _label(ev.get("datetime_local")),
                            "venue_name": venue.get("name", ""),
                            "lat": float(loc.get("lat", lat) or lat),
                            "lng": float(loc.get("lon", lng) or lng),
                            "city": city,
                            "price_min": price,
                            "is_free": price == 0,
                            "image_url": _image(ev),
                            "sources": ["SeatGeek"],
                            "popularity_signal": 0.9,
                        },
                    )
                )
            except Exception:
                continue
        return out
