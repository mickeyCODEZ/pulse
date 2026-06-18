"""MeetupSource — hobby/community meetups (kite-flying, clubs) via Meetup's GraphQL
API (paid Pro + OAuth). Disabled unless MEETUP_TOKEN is set. Geo-radius."""
from __future__ import annotations

import httpx

from ..config import settings
from .base import RawEventPayload, Source, USER_AGENT

_QUERY = """
query($lat: Float!, $lon: Float!) {
  keywordSearch(filter: {query: "events", lat: $lat, lon: $lon, source: EVENTS, radius: 25}) {
    edges { node { result { ... on Event {
      title eventUrl dateTime description
      venue { name lat lng }
    } } } }
  }
}
"""


class MeetupSource(Source):
    type = "api"
    name = "Meetup"
    min_interval_s = 0.5

    @property
    def enabled(self) -> bool:  # type: ignore[override]
        return bool(settings.meetup_tokens)

    def fetch(self, city: str, window_days: int = 30, lat: float | None = None, lng: float | None = None
              ) -> list[RawEventPayload]:
        if not self.enabled or lat is None or lng is None:
            return []
        token = settings.meetup_tokens[0]
        try:
            r = httpx.post(
                "https://api.meetup.com/gql",
                json={"query": _QUERY, "variables": {"lat": lat, "lon": lng}},
                headers={"Authorization": f"Bearer {token}", "User-Agent": USER_AGENT},
                timeout=12.0,
            )
            data = r.json() if r.status_code == 200 else {}
        except Exception:
            return []
        out: list[RawEventPayload] = []
        edges = (((data.get("data") or {}).get("keywordSearch") or {}).get("edges")) or []
        for edge in edges:
            node = ((edge or {}).get("node") or {}).get("result") or {}
            try:
                venue = node.get("venue") or {}
                out.append(
                    RawEventPayload(
                        raw_url=node.get("eventUrl", ""),
                        payload={
                            "title": node.get("title", ""),
                            "category": "Meetup",
                            "start_utc": node.get("dateTime"),
                            "venue_name": venue.get("name", ""),
                            "lat": venue.get("lat", lat),
                            "lng": venue.get("lng", lng),
                            "city": city,
                            "description": node.get("description", ""),
                            "sources": ["Meetup"],
                            "popularity_signal": 0.3,
                        },
                    )
                )
            except Exception:
                continue
        return out
