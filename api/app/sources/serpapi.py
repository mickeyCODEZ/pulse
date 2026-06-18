"""SerpApiEventsSource — Google Events via SerpApi (paid; the meta-aggregator that
surfaces Eventbrite/DICE/Meetup/festivals from Google's index). Disabled unless
SERPAPI_KEY is set. Also designed to power DiscoverySource candidate generation."""
from __future__ import annotations

from ..config import settings
from .base import RawEventPayload, Source


class SerpApiEventsSource(Source):
    type = "api"
    name = "Google Events"
    min_interval_s = 0.5

    @property
    def enabled(self) -> bool:  # type: ignore[override]
        return bool(settings.serpapi_keys)

    def fetch(self, city: str, window_days: int = 30, lat: float | None = None, lng: float | None = None
              ) -> list[RawEventPayload]:
        if not self.enabled:
            return []
        data = self.get_json_failover(
            lambda key: (
                "https://serpapi.com/search.json?engine=google_events"
                f"&q={'events in ' + city}&hl=en&api_key={key}"
            ),
            settings.serpapi_keys,
        )
        if not data:
            return []
        out: list[RawEventPayload] = []
        for ev in data.get("events_results", []):
            try:
                addr = ev.get("address")
                venue = addr[0] if isinstance(addr, list) and addr else str(addr or "")
                start = (ev.get("date", {}) or {}).get("start_date") or (ev.get("date", {}) or {}).get("when")
                out.append(
                    RawEventPayload(
                        raw_url=ev.get("link", ""),
                        payload={
                            "title": ev.get("title", ""),
                            "category": "Event",
                            "start_utc": start,
                            "venue_name": venue,
                            "city": city,
                            "description": ev.get("description", ""),
                            "image_url": ev.get("image") or ev.get("thumbnail", ""),
                            "sources": ["Google Events"],
                            "popularity_signal": 0.6,
                        },
                    )
                )
            except Exception:
                continue
        return out
