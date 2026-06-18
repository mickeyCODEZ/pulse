"""Stage 6 — expire. Mark past events `expired`, then prune long-dead ones so the
table doesn't grow forever. Both idempotent."""
from __future__ import annotations

from datetime import datetime, timedelta, timezone

from sqlmodel import Session, select

from ..models import Event


def _aware(dt: datetime | None) -> datetime | None:
    if dt is not None and dt.tzinfo is None:
        return dt.replace(tzinfo=timezone.utc)
    return dt


def expire_past(session: Session) -> int:
    now = datetime.now(timezone.utc)
    rows = session.exec(select(Event).where(Event.status == "active")).all()
    n = 0
    for ev in rows:
        start = _aware(ev.start_utc)
        if start is not None and start < now:
            ev.status = "expired"
            session.add(ev)
            n += 1
    return n


def prune_expired(session: Session, days: int = 30) -> int:
    """Delete events that finished more than `days` ago so Postgres stays bounded.
    User actions reference events by id and tolerate misses, so they're untouched."""
    cutoff = datetime.now(timezone.utc) - timedelta(days=days)
    rows = session.exec(select(Event).where(Event.status == "expired")).all()
    n = 0
    for ev in rows:
        ref = _aware(ev.start_utc) or _aware(ev.last_seen_at)
        if ref is not None and ref < cutoff:
            session.delete(ev)
            n += 1
    return n
