"""Stage 2 — normalize. Dates → tz-aware UTC, HTML stripped, category mapped to a
canonical set, price → price_min + is_free."""
from __future__ import annotations

import re
from datetime import datetime, timezone
from typing import Any

from dateutil import parser as dtparser

# NOTE: _canonical_category does substring matching in insertion order, so put
# specific multi-word tokens BEFORE the generics they'd otherwise be eaten by
# (e.g. "farmers market" before "market", "music festival" before "festival").
_CANONICAL = {
    # --- community / civic / public (specific first) ---
    "farmers market": "Farmers market", "farmers' market": "Farmers market",
    "farmer's market": "Farmers market", "farm market": "Farmers market",
    "music festival": "Festival", "street festival": "Festival",
    "festival": "Festival", "fest": "Festival",
    "carnival": "Carnival/Fair", "midway": "Carnival/Fair", "fairground": "Carnival/Fair",
    "fair": "Carnival/Fair",
    "parade": "Parade",
    "community centre": "Community", "community center": "Community",
    "community": "Community", "neighbourhood": "Community", "block party": "Community",
    "town hall": "Civic", "city hall": "Civic", "council": "Civic", "civic": "Civic",
    "library": "Civic",
    "storytime": "Family/Kids", "children": "Family/Kids", "childrens": "Family/Kids",
    "kids": "Family/Kids", "family": "Family/Kids",
    "kite": "Outdoors", "hike": "Outdoors", "nature": "Outdoors",
    "outdoors": "Outdoors", "outdoor": "Outdoors",
    "marathon": "Sports", "5k": "Sports", "yoga": "Sports", "pickleball": "Sports",
    "soccer": "Sports", "sports": "Sports", "sport": "Sports",
    "meetup": "Meetup", "club meeting": "Meetup",
    # --- original ticketed set ---
    "live music": "Live music", "concert": "Live music", "music": "Live music",
    "club": "Club", "nightlife": "Club", "dj": "Club",
    "exhibition": "Art", "exhibit": "Art", "gallery": "Art", "museum": "Art", "art": "Art",
    "film": "Film", "cinema": "Film", "movie": "Film",
    "food": "Food", "dining": "Food", "supper": "Food",
    "farmers": "Farmers market", "market": "Market", "markets": "Market",
    "lecture": "Talk", "talks": "Talk", "talk": "Talk",
    "workshop": "Workshop", "class": "Workshop",
    "comedy": "Comedy",
    "theatre": "Theatre", "theater": "Theatre", "performance": "Theatre",
}

_TAG = re.compile(r"<[^>]+>")


def _strip_html(text: str) -> str:
    return _TAG.sub("", text or "").strip()


def _to_utc(value: Any) -> datetime | None:
    if value is None:
        return None
    if isinstance(value, datetime):
        dt = value
    else:
        try:
            dt = dtparser.parse(str(value))
        except (ValueError, OverflowError):
            return None
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return dt.astimezone(timezone.utc)


CANONICAL_LABELS = set(_CANONICAL.values())


def _canonical_category(raw: str) -> str:
    key = (raw or "").strip().lower()
    if key in _CANONICAL:
        return _CANONICAL[key]
    for token, label in _CANONICAL.items():
        if token in key:
            return label
    return (raw or "Event").strip().title()


def normalize(c: dict[str, Any]) -> dict[str, Any] | None:
    start = _to_utc(c.get("start_utc"))
    if start is None:
        return None
    c["start_utc"] = start
    c["end_utc"] = _to_utc(c.get("end_utc"))
    c["title"] = _strip_html(c["title"])[:200]
    c["description"] = _strip_html(c["description"])[:1000]
    c["venue_name"] = _strip_html(c["venue_name"])[:160]
    # A source category only counts if it maps to a known label; otherwise (generic
    # "Event", or a garbage/raw string) read the category off the title instead.
    category = _canonical_category(c.get("category", "Event"))
    if category not in CANONICAL_LABELS:
        from_title = _canonical_category(c["title"])
        category = from_title if from_title in CANONICAL_LABELS else "Event"
    c["category"] = category

    price = c.get("price_min")
    is_free = c.get("is_free")
    if is_free is None:
        is_free = price in (0, 0.0)
    c["is_free"] = bool(is_free)
    c["price_min"] = None if c["is_free"] else (float(price) if price is not None else None)
    return c
