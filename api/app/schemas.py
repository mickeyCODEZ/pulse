"""API serialization — turn a canonical Event into the card shape the React
frontend already speaks (PulseEvent), computing display fields (date string,
distance, freshness) at read time."""
from __future__ import annotations

import math
from datetime import datetime, timezone
from typing import Any

from .models import Event, UserProfile


def _aware(dt: datetime | None) -> datetime | None:
    if dt is None:
        return None
    return dt if dt.tzinfo else dt.replace(tzinfo=timezone.utc)


def _date_label(start: datetime | None) -> str:
    start = _aware(start)
    if not start:
        return ""
    hour = start.strftime("%I").lstrip("0") or "12"
    minute = start.strftime("%M")
    ampm = start.strftime("%p").lower()
    clock = f"{hour}:{minute}{ampm}"
    return f"{start.strftime('%a')} · {clock}"


def _haversine_mi(lat1, lng1, lat2, lng2) -> float:
    r = 3958.8  # miles
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dp = math.radians(lat2 - lat1)
    dl = math.radians(lng2 - lng1)
    a = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 2 * r * math.asin(math.sqrt(a))


def _distance_label(ev: Event, profile: UserProfile, origin: tuple[float, float] | None = None) -> str | None:
    if ev.lat is None or ev.lng is None:
        return None
    olat, olng = origin if origin else (profile.home_lat, profile.home_lng)
    mi = _haversine_mi(olat, olng, ev.lat, ev.lng)
    return f"{mi:.1f}mi"


def _freshness(first_seen: datetime | None) -> str:
    first_seen = _aware(first_seen)
    if not first_seen:
        return ""
    delta = datetime.now(timezone.utc) - first_seen
    hours = delta.total_seconds() / 3600
    if hours < 1:
        return "just added"
    if hours < 24:
        return f"added {int(hours)}h ago"
    return f"added {int(hours // 24)}d ago"


def event_card(ev: Event, profile: UserProfile, origin: tuple[float, float] | None = None) -> dict[str, Any]:
    return {
        "id": ev.id,
        "category": ev.category,
        "title": ev.title,
        "start": _aware(ev.start_utc).isoformat() if ev.start_utc else None,
        "date": ev.date_label or _date_label(ev.start_utc),
        "venue": ev.venue_name,
        "distance": _distance_label(ev, profile, origin),
        "price": None if ev.is_free else ev.price_min,
        "free": ev.is_free,
        "freshness": _freshness(ev.first_seen_at),
        "gem": ev.is_gem,
        "score": round(ev.relevance_score * 100),
        "relevance": ev.relevance_reasons,
        "sources": ev.source_names,
        "img": ev.image_pos or None,
        "imageUrl": ev.image_url or None,
        "blurb": ev.description,
        "url": ev.url,
        "lat": ev.lat,
        "lng": ev.lng,
    }
