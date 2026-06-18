"""ICalFeedSource — subscribe to a public .ics calendar (libraries, museums,
universities, venues). Highest-quality structured data, zero scraping. Each feed
belongs to a real place, so it only contributes when the user is viewing that
city, tags events with the feed's own city, and locates them around the feed's
coordinates (ICS rarely carries lat/lng). Failures are swallowed so a dead feed
never crashes the batch — ELT collects wide and judges later."""
from __future__ import annotations

import hashlib
from datetime import date, datetime, timezone

from .base import RawEventPayload, Source

try:
    from icalendar import Calendar
except Exception:  # pragma: no cover - dependency optional at runtime
    Calendar = None  # type: ignore

MAX_EVENTS = 60  # keep ingest fast + relevant (upcoming only)


def _to_dt(value) -> datetime | None:
    if isinstance(value, datetime):
        return value if value.tzinfo else value.replace(tzinfo=timezone.utc)
    if isinstance(value, date):
        return datetime(value.year, value.month, value.day, tzinfo=timezone.utc)
    return None


def _jitter(key: str, base: tuple[float, float]) -> tuple[float, float]:
    h = hashlib.sha256(key.encode()).digest()
    return base[0] + (h[0] / 255 - 0.5) * 0.06, base[1] + (h[1] / 255 - 0.5) * 0.06


def _is_all_day(dt) -> bool:
    return isinstance(dt, date) and not isinstance(dt, datetime)


def _ics_category(comp) -> str:
    """Extract clean text from a VEVENT CATEGORIES (an icalendar vCategory),
    avoiding the object repr leaking in as the category."""
    c = comp.get("categories")
    if c is None:
        return "Event"
    cats = getattr(c, "cats", None)
    if cats:
        return str(cats[0])
    try:
        return c.to_ical().decode("utf-8", "ignore").split(",")[0]
    except Exception:
        return "Event"


def _local_label(dt) -> str:
    """'Fri · 6:00pm' in the event's own timezone (ICS times are usually local);
    'Sat · all day' for date-only (all-day) VEVENTs."""
    if _is_all_day(dt):
        return f"{dt.strftime('%a')} · all day"
    if not isinstance(dt, datetime):
        return ""
    hour = dt.strftime("%I").lstrip("0") or "12"
    return f"{dt.strftime('%a')} · {hour}:{dt.strftime('%M')}{dt.strftime('%p').lower()}"


class ICalFeedSource(Source):
    type = "feed_ics"
    min_interval_s = 2.0

    def __init__(self, url: str, name: str, city: str, lat: float, lng: float, popularity: float = 0.4) -> None:
        self.url = url
        self.name = name
        self.city = city
        self.base = (lat, lng)
        self.popularity = popularity

    def fetch(
        self, city: str, window_days: int = 30, lat: float | None = None, lng: float | None = None
    ) -> list[RawEventPayload]:
        # A feed belongs to its own city — only contribute when that city is viewed.
        if Calendar is None or city.lower() != self.city.lower():
            return []
        resp = self.get(self.url, timeout=20.0)
        if resp is None:
            return []
        try:
            cal = Calendar.from_ical(resp.content)
        except Exception:
            return []

        now = datetime.now(timezone.utc)
        out: list[RawEventPayload] = []
        for comp in cal.walk("VEVENT"):
            if len(out) >= MAX_EVENTS:
                break
            try:
                dtstart = comp.get("dtstart")
                start = _to_dt(dtstart.dt) if dtstart else None
                title = str(comp.get("summary") or "").strip()
                if not title or not start:
                    continue
                # "upcoming" = future; for all-day events (start at 00:00 today)
                # keep anything from today onward so today's all-day events show.
                all_day = _is_all_day(dtstart.dt) if dtstart else False
                if (start.date() < now.date()) if all_day else (start < now):
                    continue
                local_label = _local_label(dtstart.dt) if dtstart else ""
                dtend = comp.get("dtend")
                end = _to_dt(dtend.dt) if dtend else None
                elat, elng = _jitter(f"{self.city}|{title}", self.base)
                out.append(
                    RawEventPayload(
                        raw_url=str(comp.get("url") or self.url),
                        payload={
                            "title": title,
                            "category": _ics_category(comp),
                            "start_utc": start.isoformat(),
                            "date_label": local_label,
                            "end_utc": end.isoformat() if end else None,
                            "venue_name": str(comp.get("location") or self.city),
                            "city": self.city,
                            "lat": elat,
                            "lng": elng,
                            "description": str(comp.get("description") or ""),
                            "sources": [self.name],
                            "popularity_signal": self.popularity,
                        },
                    )
                )
            except Exception:
                continue  # never crash the batch on one bad VEVENT
        return out
