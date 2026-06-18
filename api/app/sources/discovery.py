"""DiscoverySource — the engine that makes "anywhere" work. On a city's first
refresh it probes candidate URLs for `.ics` / RSS / `schema.org/Event` JSON-LD and
registers confirmed hits as `sources` rows; subsequent visits are a cache hit
(City.last_discovery_at TTL). It's a registrar — fetch() returns no events itself;
the rows it adds produce events on later passes. Free path uses curated candidate
seeds (+ SerpApi google search when a key is present)."""
from __future__ import annotations

from datetime import datetime, timedelta, timezone

import httpx
from sqlmodel import Session, select

from ..config import settings
from ..db import engine
from ..models import City, Source as SourceRow
from .base import RawEventPayload, Source

DISCOVERY_TTL_DAYS = 7
MAX_CANDIDATES = 10

# Per-region candidate URLs to probe (GTA-deep; generic patterns elsewhere). Only
# confirmed feeds get registered, so dead guesses cost a probe and nothing else.
_SEED_CANDIDATES: dict[str, list[str]] = {
    "Toronto": [
        "https://www.toronto.ca/explore-enjoy/festivals-events/",
        "https://www.torontopubliclibrary.ca/programs-and-classes/",
    ],
    "Mississauga": [
        "https://www.mississauga.ca/events-and-attractions/events-calendar/",
        "https://www.carassauga.com/",
    ],
}


def _candidates_for(city: str) -> list[str]:
    out = list(_SEED_CANDIDATES.get(city, []))
    if settings.serpapi_keys:
        try:
            r = httpx.get(
                "https://serpapi.com/search.json",
                params={"engine": "google", "q": f"{city} events calendar ics OR festival calendar",
                        "num": 10, "api_key": settings.serpapi_keys[0]},
                timeout=12.0,
            )
            if r.status_code == 200:
                for res in r.json().get("organic_results", []):
                    if res.get("link"):
                        out.append(res["link"])
        except Exception:
            pass
    return out[:MAX_CANDIDATES]


class DiscoverySource(Source):
    type = "discovery"
    name = "Discovery"
    min_interval_s = 2.0

    def fetch(self, city: str, window_days: int = 30, lat: float | None = None, lng: float | None = None
              ) -> list[RawEventPayload]:
        with Session(engine) as session:
            row = session.get(City, city)
            now = datetime.now(timezone.utc)
            if row and row.last_discovery_at:
                last = row.last_discovery_at if row.last_discovery_at.tzinfo else row.last_discovery_at.replace(tzinfo=timezone.utc)
                if now - last < timedelta(days=DISCOVERY_TTL_DAYS):
                    return []  # cache hit — instant
            registered = 0
            for url in _candidates_for(city):
                kind = self._probe(url)
                if kind and not self._exists(session, url):
                    session.add(SourceRow(
                        type=kind, name=f"{city} · {httpx.URL(url).host}", city=city,
                        base_url=url, enabled=True, discovered_from=f"discovery:{city}",
                    ))
                    registered += 1
            if row is None:
                row = City(name=city, lat=lat or 0.0, lng=lng or 0.0)
            row.last_discovery_at = now
            session.add(row)
            session.commit()
        return []

    def _exists(self, session: Session, url: str) -> bool:
        return session.exec(select(SourceRow).where(SourceRow.base_url == url)).first() is not None

    def _probe(self, url: str) -> str | None:
        """Return 'feed_ics' | 'feed_rss' | 'jsonld' if a feed is confirmed, else None."""
        if not self.robots_allowed(url):
            return None
        if url.lower().endswith(".ics"):
            return "feed_ics"
        resp = self.get(url, timeout=15.0)
        if resp is None:
            return None
        ctype = resp.headers.get("content-type", "")
        if "text/calendar" in ctype:
            return "feed_ics"
        html = resp.text
        # alternate feed links in <head>
        if 'type="text/calendar"' in html or "type='text/calendar'" in html:
            return "feed_ics"
        if "application/rss+xml" in html:
            return "feed_rss"
        # JSON-LD events present?
        if "application/ld+json" in html:
            try:
                import extruct

                data = extruct.extract(html, syntaxes=["json-ld"], uniform=True)
                blob = str(data.get("json-ld", []))
                if "Event" in blob:
                    return "jsonld"
            except Exception:
                return None
        return None
