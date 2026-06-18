"""Stage 5 — rank/score. v1 ranking: tag-match vs the user profile, soft
boosts/mutes, recency, and `long_tail_weight` to down-weight high popularity so
niche events surface (the anti-incumbent inversion). Produces relevance_score
[0..1] + human reasons. Hard dealbreakers are applied at query time, not here —
we rank, we don't pre-filter."""
from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

# canonical category → the lowercase reason tokens it can match
_CATEGORY_TAGS = {
    "Live music": ["live music", "music"],
    "Club": ["live music", "late", "club"],
    "Art": ["art"],
    "Film": ["film"],
    "Food": ["food"],
    "Market": ["market", "weekends"],
    "Talk": ["talks", "history"],
    "Workshop": ["art", "hands-on"],
    "Comedy": ["comedy"],
    "Theatre": ["theatre"],
    # community / civic / public
    "Farmers market": ["market", "food", "outdoors", "weekends", "free"],
    "Festival": ["festival", "music", "community", "outdoors"],
    "Carnival/Fair": ["fair", "family", "outdoors"],
    "Community": ["community", "free", "neighbourhood"],
    "Outdoors": ["outdoors", "free", "nature"],
    "Family/Kids": ["family", "kids", "free"],
    "Sports": ["sports", "outdoors", "active"],
    "Meetup": ["meetup", "community", "hands-on"],
    "Parade": ["parade", "free", "outdoors", "community"],
    "Civic": ["civic", "free", "community"],
}

# Categories that count as "public / community" (for the long-tail reason + scope filter).
COMMUNITY_CATEGORIES = {
    "Farmers market", "Festival", "Carnival/Fair", "Community", "Outdoors",
    "Family/Kids", "Sports", "Meetup", "Parade", "Civic", "Market",
}


def _reasons(c: dict[str, Any], profile) -> list[str]:
    reasons: list[str] = []
    interests = {t.lower() for t in (profile.interest_tags or [])}
    cat_tags = _CATEGORY_TAGS.get(c["category"], [c["category"].lower()])
    for t in cat_tags:
        if t in interests and t not in reasons:
            reasons.append(t)
    if c.get("is_free"):
        reasons.append("free")
    elif c.get("price_min") is not None and c["price_min"] <= 15:
        reasons.append("under $15")
    if c.get("gem"):
        reasons.append("rarely listed")
    elif c.get("popularity_signal", 0.0) < 0.3 and c["category"] in COMMUNITY_CATEGORIES:
        reasons.append("local & under-the-radar")
    return reasons[:3] or [c["category"].lower()]


def rank(c: dict[str, Any], profile) -> dict[str, Any]:
    score = 0.30  # base — keeps everything in the feed (rank, don't filter)
    interests = {t.lower() for t in (profile.interest_tags or [])}
    cat_tags = _CATEGORY_TAGS.get(c["category"], [c["category"].lower()])

    # interest tag match
    if interests.intersection(cat_tags):
        score += 0.22

    # soft boosts / mutes (re-rank, don't remove)
    boost = (profile.boosts or {}).get(c["category"])
    if boost == "Boost":
        score += 0.12
    elif boost == "Mute":
        score -= 0.18

    # price affinity
    if c.get("is_free"):
        score += 0.06
    elif c.get("price_min") is not None and c["price_min"] <= 15:
        score += 0.03

    # recency / soon-ness
    start: datetime | None = c.get("start_utc")
    if start is not None and start.tzinfo is None:
        start = start.replace(tzinfo=timezone.utc)  # SQLite returns naive datetimes
    if start:
        days = (start - datetime.now(timezone.utc)).total_seconds() / 86400
        if 0 <= days <= 2:
            score += 0.10
        elif 0 <= days <= 5:
            score += 0.05
        elif days < 0:
            score -= 0.30

    # long-tail inversion: a low-popularity, on-interest event gets a nudge UP,
    # while a high-popularity incumbent is gently held back (long_tail_weight).
    pop = c.get("popularity_signal", 0.0)
    score += profile.long_tail_weight * (0.5 - pop) * 0.18
    # very-low-popularity community events get the "Hidden gems" treatment.
    if pop < 0.25 and c["category"] in COMMUNITY_CATEGORIES:
        c["gem"] = True
    if c.get("gem"):
        score += 0.04

    c["relevance_reasons"] = _reasons(c, profile)
    c["relevance_score"] = max(0.30, min(0.99, score))
    return c
