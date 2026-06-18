"""Stage 1 — parse/validate. Coerce a raw payload into a candidate event dict.
On failure return None (the caller marks the raw row failed); never crash the
batch."""
from __future__ import annotations

from typing import Any, Optional


def parse(raw_payload: dict[str, Any]) -> Optional[dict[str, Any]]:
    title = (raw_payload.get("title") or "").strip()
    start = raw_payload.get("start_utc")
    if not title or not start:
        return None
    return {
        "title": title,
        "description": raw_payload.get("description", "") or "",
        "start_utc": start,
        "date_label": raw_payload.get("date_label", "") or "",
        "end_utc": raw_payload.get("end_utc"),
        "tz": raw_payload.get("tz", "UTC"),
        "venue_name": raw_payload.get("venue_name", "") or "",
        "lat": raw_payload.get("lat"),
        "lng": raw_payload.get("lng"),
        "city": raw_payload.get("city", "") or "",
        "category": raw_payload.get("category", "Event") or "Event",
        "price_min": raw_payload.get("price_min"),
        "is_free": raw_payload.get("is_free"),
        "currency": raw_payload.get("currency", "USD"),
        "url": raw_payload.get("url", "") or "",
        "image_url": raw_payload.get("image_url", "") or "",
        "image_pos": raw_payload.get("image_pos", "") or "",
        "sources": raw_payload.get("sources", []) or [],
        "popularity_signal": float(raw_payload.get("popularity_signal", 0.0) or 0.0),
        "gem": bool(raw_payload.get("gem", False)),
        "synthetic": bool(raw_payload.get("synthetic", False)),
    }
