"""Stage 4 — dedupe. Block by (date bucket + geo cell), then match within the
block on a *normalised* title (noise words + venue suffixes stripped) plus a
token-subset rule, so the same event found on different platforms collapses into
one. Merge unions sources ("also on…") and keeps the richest fields. The
dedup_key is the upsert key, so reruns never create duplicates."""
from __future__ import annotations

import re
from datetime import datetime
from difflib import SequenceMatcher
from typing import Any

# words that carry no identity across platforms ("CATS Tickets" == "CATS")
_NOISE = {
    "the", "a", "an", "at", "of", "to", "tickets", "ticket", "official", "presents",
    "presented", "by", "live", "tour", "feat", "ft", "with", "and", "in", "concert",
    "show", "experience", "vs", "v",
}
_PUNCT = re.compile(r"[^a-z0-9 ]+")
_VENUE_SUFFIX = re.compile(r"\b at \b| @ | \| ")


def _norm(title: str) -> str:
    t = _PUNCT.sub(" ", (title or "").lower())
    t = _VENUE_SUFFIX.split(t)[0]  # drop "… at The Lot" / "… @ Venue" / "Exhibit | …"
    return " ".join(w for w in t.split() if w not in _NOISE)


def _slug(title: str) -> str:
    return _norm(title).replace(" ", "-")[:48] or "untitled"


def _geo_cell(lat: float | None, lng: float | None) -> str:
    if lat is None or lng is None:
        return "na"
    return f"{round(lat, 2)},{round(lng, 2)}"  # ~1km cells


def _cell(c: dict[str, Any]) -> str:
    """Geo cell for blocking. Synthesized centroid coords (`_geo_real=False`) are
    treated as 'na' so two coordless copies of the same event still meet in a
    block instead of being split by their per-title jitter."""
    if c.get("_geo_real", True) is False:
        return "na"
    return _geo_cell(c.get("lat"), c.get("lng"))


def _date_bucket(start: datetime | None) -> str:
    return start.strftime("%Y-%m-%d") if start else "na"


def dedup_key(c: dict[str, Any]) -> str:
    return f"{_slug(c['title'])}|{_date_bucket(c.get('start_utc'))}|{_cell(c)}"


def _same_event(a: dict[str, Any], b: dict[str, Any]) -> bool:
    if _date_bucket(a.get("start_utc")) != _date_bucket(b.get("start_utc")):
        return False
    na, nb = _norm(a["title"]), _norm(b["title"])
    if not na or not nb:
        return False
    ca = _cell(a)
    cb = _cell(b)
    if ca != cb:
        # Geo differs. Civic events often lack real coords — when BOTH are missing,
        # fall back to a strict title match within the same date bucket so the same
        # festival listed twice still collapses. Otherwise they're different events.
        if ca == "na" and cb == "na":
            return SequenceMatcher(None, na, nb).ratio() > 0.9
        return False
    # Same geo cell: looser match + token-subset ("cats" ⊆ "cats jellicle ball").
    if SequenceMatcher(None, na, nb).ratio() > 0.80:
        return True
    ta, tb = set(na.split()), set(nb.split())
    return bool(ta) and bool(tb) and (ta <= tb or tb <= ta)


def _merge_into(match: dict[str, Any], c: dict[str, Any]) -> None:
    match["sources"] = list(dict.fromkeys([*match.get("sources", []), *c.get("sources", [])]))
    match["description"] = max([match.get("description", ""), c.get("description", "")], key=len)
    match["popularity_signal"] = max(match.get("popularity_signal", 0), c.get("popularity_signal", 0))
    # keep the richest image (prefer a present one; tie → keep existing)
    if not match.get("image_url") and c.get("image_url"):
        match["image_url"] = c["image_url"]
    # keep a price if one side has it; prefer the lower
    prices = [p for p in (match.get("price_min"), c.get("price_min")) if p is not None]
    if prices:
        match["price_min"] = min(prices)
        match["is_free"] = match.get("is_free") and c.get("is_free")
    match["gem"] = match.get("gem") or c.get("gem")


def merge_block(candidates: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Collapse near-duplicates that share a (date bucket + geo cell) block."""
    survivors: list[dict[str, Any]] = []
    for c in candidates:
        match = next((s for s in survivors if _same_event(c, s)), None)
        if match is None:
            survivors.append(dict(c))
        else:
            _merge_into(match, c)
    return survivors
