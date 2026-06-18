"""PredictHQSource — aggregated, attendance-ranked events incl. community &
festivals (paid). Disabled unless PREDICTHQ_TOKEN is set. Geo-radius."""
from __future__ import annotations

from datetime import datetime, timezone

import httpx

from ..config import settings
from .base import RawEventPayload, Source, USER_AGENT

_CATEGORY = {
    "community": "Community", "festivals": "Festival", "concerts": "Live music",
    "performing-arts": "Theatre", "sports": "Sports", "expos": "Festival",
    "conferences": "Meetup", "public-holidays": "Civic",
}


class PredictHQSource(Source):
    type = "api"
    name = "PredictHQ"
    min_interval_s = 0.3

    @property
    def enabled(self) -> bool:  # type: ignore[override]
        return bool(settings.predicthq_tokens)

    def fetch(self, city: str, window_days: int = 30, lat: float | None = None, lng: float | None = None
              ) -> list[RawEventPayload]:
        if not self.enabled or lat is None or lng is None:
            return []
        token = settings.predicthq_tokens[0]
        try:
            r = httpx.get(
                "https://api.predicthq.com/v1/events/",
                params={"within": f"25km@{lat},{lng}", "active.gte": datetime.now(timezone.utc).date().isoformat(), "limit": 50, "sort": "start"},
                headers={"Authorization": f"Bearer {token}", "Accept": "application/json", "User-Agent": USER_AGENT},
                timeout=12.0,
            )
            data = r.json() if r.status_code == 200 else {}
        except Exception:
            return []
        out: list[RawEventPayload] = []
        for ev in data.get("results", []):
            try:
                loc = ev.get("location") or [None, None]  # [lng, lat]
                out.append(
                    RawEventPayload(
                        raw_url="",
                        payload={
                            "title": ev.get("title", ""),
                            "category": _CATEGORY.get(ev.get("category", ""), "Event"),
                            "start_utc": ev.get("start"),
                            "end_utc": ev.get("end"),
                            "venue_name": (ev.get("entities", [{}])[0] or {}).get("name", "") if ev.get("entities") else "",
                            "lat": loc[1] if len(loc) > 1 else lat,
                            "lng": loc[0] if loc else lng,
                            "city": city,
                            "description": ev.get("description", ""),
                            "sources": ["PredictHQ"],
                            "popularity_signal": (ev.get("rank", 50) or 50) / 100,
                        },
                    )
                )
            except Exception:
                continue
        return out
