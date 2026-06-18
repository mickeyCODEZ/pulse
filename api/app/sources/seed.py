"""SeedSource — a deterministic, always-available source so the feed is never
empty (and the app demonstrably *works* offline). It emits a curated set of
events with real upcoming datetimes computed relative to now, exactly the kind
of raw payloads a real adapter would dump into staging."""
from __future__ import annotations

import hashlib
from datetime import datetime, time, timedelta, timezone

from ..pipeline.geocode import CENTROIDS
from .base import RawEventPayload, Source


def _jitter(key: str, base: tuple[float, float]) -> tuple[float, float]:
    h = hashlib.sha256(key.encode()).digest()
    dy = (h[0] / 255 - 0.5) * 0.1  # ~±5km
    dx = (h[1] / 255 - 0.5) * 0.1
    return base[0] + dy, base[1] + dx

# weekday tokens → Python weekday() (Mon=0 … Sun=6)
_WD = {"Mon": 0, "Tue": 1, "Wed": 2, "Thu": 3, "Fri": 4, "Sat": 5, "Sun": 6}

# (title, category, weekday, hour, minute, venue, price|None=free, sources, img, gem, blurb)
_SEED = [
    ("Warehouse jazz, after hours", "Live music", "Fri", 21, 0, "The Lot", 12,
     ["Resident Advisor", "DICE"], "18% 30%", False,
     "A late-night quartet in a converted loading dock — BYO, low ceilings, loud horns. The kind of room that doesn't advertise."),
    ("A short history of the city's bridges", "Talk", "Sun", 14, 0, "Carnegie Library", None,
     ["City Library"], "70% 40%", True,
     "An engineer-turned-historian walks through two centuries of river crossings. Free, seats limited, almost never shows up in other apps."),
    ("Risograph zine night", "Workshop", "Thu", 19, 0, "Press Room", 25,
     ["Meetup"], "45% 70%", True,
     "Two-color printing, bring an idea, leave with a stack. Ink-stained fingers guaranteed."),
    ("Saturday makers' market", "Market", "Sat", 10, 0, "Old Customs Yard", None,
     ["Eventbrite", "Fever"], "60% 25%", False,
     "Forty stalls of ceramics, secondhand books, and very good dumplings."),
    ("Late screening: noir double bill", "Film", "Fri", 22, 30, "Roxy Cinema", 14,
     ["Songkick"], "30% 55%", False,
     "Two restored prints, one intermission, no phones."),
    ("Basement: dub & low end", "Club", "Sat", 23, 0, "Sub Club", 18,
     ["Resident Advisor", "DICE", "Eventbrite"], "80% 70%", False,
     "Sound-system night with a guest selector. Doors late, ends later."),
    ("Pop-up supper: coastal Portugal", "Food", "Wed", 19, 30, "Apt. 4 (address on booking)", 45,
     ["Luma"], "20% 80%", True,
     "Twelve seats, five courses, one chef's apartment. The opposite of a chain."),
    ("New material night", "Comedy", "Tue", 20, 0, "The Stand", 10,
     ["Eventbrite"], "50% 40%", False,
     "Seven comics trying things that may not work yet. Cheap, honest, occasionally great."),
    ("Lunchtime choral recital", "Live music", "Thu", 13, 0, "St. Anne's", None,
     ["City Listings"], "65% 60%", True,
     "Forty minutes of polyphony in a cool stone nave. Slip out of the office, slip back in."),
    ("Promenade piece: the night port", "Theatre", "Sat", 18, 0, "Harbour District", 30,
     ["Eventbrite", "DICE"], "35% 35%", False,
     "A walking performance that moves through three warehouses as the light goes."),
]


def _next_occurrence(weekday: str, hh: int, mm: int, now: datetime) -> datetime:
    delta = (_WD[weekday] - now.weekday()) % 7
    day = (now + timedelta(days=delta)).date()
    cand = datetime.combine(day, time(hh, mm), tzinfo=timezone.utc)
    if cand < now:  # already passed today → next week
        cand += timedelta(days=7)
    return cand


class SeedSource(Source):
    type = "seed"
    name = "Pulse Seed"
    enabled = True

    def fetch(
        self, city: str, window_days: int = 30, lat: float | None = None, lng: float | None = None
    ) -> list[RawEventPayload]:
        now = datetime.now(timezone.utc)
        # Locate seed events near the real coordinates we were handed (the user's
        # actual position), falling back to a known centroid for the named city.
        base = (lat, lng) if lat is not None and lng is not None else CENTROIDS.get(city, (38.7223, -9.1393))
        out: list[RawEventPayload] = []
        for i, (title, cat, wd, hh, mm, venue, price, sources, img, gem, blurb) in enumerate(_SEED):
            start = _next_occurrence(wd, hh, mm, now)
            elat, elng = _jitter(f"{city}|{title}", base)
            out.append(
                RawEventPayload(
                    raw_url=f"https://pulse.local/seed/{i}",
                    payload={
                        "title": title,
                        "category": cat,
                        "start_utc": start.isoformat(),
                        "venue_name": venue,
                        "city": city,
                        "lat": elat,
                        "lng": elng,
                        "price_min": price,
                        "is_free": price is None,
                        "sources": sources,
                        "image_pos": img,
                        "gem": gem,
                        "description": blurb,
                        "popularity_signal": 0.9 - 0.07 * i,  # incumbents rank these high
                        "synthetic": True,  # demo fallback — hidden when real events exist
                    },
                )
            )
        return out
