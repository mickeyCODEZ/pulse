"""TicketmasterSource — Discovery API baseline (geoPoint + radius). Free dev key.
Interface-complete but disabled until TICKETMASTER_API_KEY is set, so it slots in
without a refactor. Paid stubs (SerpApi, PredictHQ) follow the same shape."""
from __future__ import annotations

from datetime import datetime, timezone

from ..config import settings
from .base import RawEventPayload, Source

_GEO = {
    "Lisbon": (38.7223, -9.1393), "Berlin": (52.52, 13.405), "Porto": (41.1579, -8.6291),
    "Reykjavík": (64.1466, -21.9426), "New York": (40.7128, -74.006), "Mexico City": (19.4326, -99.1332),
}


def _tm_category(classifications: list) -> str:
    if not classifications:
        return "Event"
    c = classifications[0] or {}
    seg = (c.get("segment") or {}).get("name", "") or ""
    genre = ((c.get("genre") or {}).get("name", "") or "").lower()
    if seg == "Music":
        return "Live music"
    if seg in ("Sports", "Film"):
        return seg
    if seg == "Arts & Theatre":
        if "film" in genre:
            return "Film"
        if "comedy" in genre:
            return "Comedy"
        if "fine art" in genre or "exhibit" in genre or genre == "art":
            return "Art"
        return "Theatre"  # the vast majority of this segment
    if seg in ("Undefined", "Miscellaneous", ""):
        return "Event"
    return seg


def _tm_label(local_date: str | None, local_time: str | None) -> str:
    """'Wed · 2:00pm' in the venue's local time (Ticketmaster gives localDate/Time)."""
    if not local_date:
        return ""
    try:
        if local_time:
            dt = datetime.strptime(f"{local_date} {local_time[:5]}", "%Y-%m-%d %H:%M")
            hour = dt.strftime("%I").lstrip("0") or "12"
            return f"{dt.strftime('%a')} · {hour}:{dt.strftime('%M')}{dt.strftime('%p').lower()}"
        return datetime.strptime(local_date, "%Y-%m-%d").strftime("%a")
    except ValueError:
        return ""


class TicketmasterSource(Source):
    type = "api"
    name = "Ticketmaster"
    min_interval_s = 0.3

    @property
    def enabled(self) -> bool:  # type: ignore[override]
        return bool(settings.ticketmaster_keys)

    def fetch(
        self, city: str, window_days: int = 30, lat: float | None = None, lng: float | None = None
    ) -> list[RawEventPayload]:
        if not self.enabled:
            return []
        if lat is None or lng is None:
            lat, lng = _GEO.get(city, (38.7223, -9.1393))
        url = "https://app.ticketmaster.com/discovery/v2/events.json"
        data = self.get_json_failover(
            lambda key: f"{url}?apikey={key}&latlong={lat},{lng}&radius=25&unit=miles&size=50&sort=date,asc",
            settings.ticketmaster_keys,
        )
        if data is None:
            return []

        out: list[RawEventPayload] = []
        for ev in data.get("_embedded", {}).get("events", []):
            try:
                start_block = ev.get("dates", {}).get("start", {})
                start = start_block.get("dateTime")
                if start:
                    start = datetime.fromisoformat(start.replace("Z", "+00:00")).astimezone(timezone.utc).isoformat()
                elif start_block.get("localDate"):  # all-day / TBA-time events
                    start = f"{start_block['localDate']}T00:00:00+00:00"
                venues = ev.get("_embedded", {}).get("venues", [{}])
                venue = venues[0] if venues else {}
                price = None
                ranges = ev.get("priceRanges") or []
                if ranges:
                    price = ranges[0].get("min")
                out.append(
                    RawEventPayload(
                        raw_url=ev.get("url", ""),
                        payload={
                            "title": ev.get("name", ""),
                            "category": _tm_category(ev.get("classifications", [])),
                            "start_utc": start,
                            "date_label": _tm_label(start_block.get("localDate"), start_block.get("localTime")),
                            "venue_name": venue.get("name", ""),
                            "lat": float(venue.get("location", {}).get("latitude", lat) or lat),
                            "lng": float(venue.get("location", {}).get("longitude", lng) or lng),
                            "city": city,
                            "price_min": price,
                            "is_free": price == 0,
                            "image_url": (ev.get("images", [{}])[0] or {}).get("url", ""),
                            "sources": ["Ticketmaster"],
                            "popularity_signal": 0.95,
                        },
                    )
                )
            except Exception:
                continue
        return out
