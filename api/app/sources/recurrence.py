"""Occurrence synthesis for *directory* sources — static, undated listings like
farmers markets ("Saturdays, May–Oct, 8am–2pm"). Turns a free-text (or column)
schedule into concrete upcoming start datetimes within a window. The top
correctness risk in the plan, so it's conservative: clamp to [now, now+window],
validate the parse, and fall back to a single "ongoing" entry rather than guess."""
from __future__ import annotations

import re
from datetime import datetime, time, timedelta, timezone
from typing import Optional

_WD = {"monday": 0, "tuesday": 1, "wednesday": 2, "thursday": 3, "friday": 4, "saturday": 5, "sunday": 6}
_WD_ABBR = {"mon": 0, "tue": 1, "wed": 2, "thu": 3, "fri": 4, "sat": 5, "sun": 6}
_MONTHS = {
    "january": 1, "february": 2, "march": 3, "april": 4, "may": 5, "june": 6, "july": 7,
    "august": 8, "september": 9, "october": 10, "november": 11, "december": 12,
    "jan": 1, "feb": 2, "mar": 3, "apr": 4, "jun": 6, "jul": 7, "aug": 8, "sep": 9,
    "sept": 9, "oct": 10, "nov": 11, "dec": 12,
}
_WD_LABEL = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]


class Schedule:
    def __init__(self, weekday: int, hh: int, mm: int, months: Optional[set[int]]):
        self.weekday = weekday
        self.hh = hh
        self.mm = mm
        self.months = months  # None = all year

    @property
    def label(self) -> str:
        ampm = "am" if self.hh < 12 else "pm"
        h12 = self.hh % 12 or 12
        return f"{_WD_LABEL[self.weekday]} · {h12}:{self.mm:02d}{ampm}"


def parse_schedule(text: str) -> Optional[Schedule]:
    """Best-effort parse. Returns None if no weekday is found (caller falls back)."""
    if not text:
        return None
    t = text.lower()

    weekday = None
    for name, idx in _WD.items():
        if name in t:
            weekday = idx
            break
    if weekday is None:
        for name, idx in _WD_ABBR.items():
            if re.search(rf"\b{name}\b", t):
                weekday = idx
                break
    if weekday is None:
        return None

    hh, mm = 9, 0
    m = re.search(r"(\d{1,2})(?::(\d{2}))?\s*([ap])\.?m", t)
    if m:
        hh = int(m.group(1)) % 12 + (12 if m.group(3) == "p" else 0)
        mm = int(m.group(2) or 0)

    # months: collect mentions in order; a "may–oct" range expands inclusively
    found: list[int] = []
    for mo in re.finditer(r"[a-z]+", t):
        w = mo.group(0)
        if w in _MONTHS and _MONTHS[w] not in found:
            found.append(_MONTHS[w])
    months: Optional[set[int]] = None
    if len(found) >= 2 and ("-" in t or "–" in t or "to" in t):
        a, b = found[0], found[-1]
        rng = list(range(a, b + 1)) if a <= b else list(range(a, 13)) + list(range(1, b + 1))
        months = set(rng)
    elif found:
        months = set(found)
    return Schedule(weekday, hh, mm, months)


def occurrences(sched: Schedule, now: datetime, count: int = 4, window_days: int = 60) -> list[datetime]:
    """Up to `count` upcoming starts matching the schedule, within the window."""
    out: list[datetime] = []
    horizon = now + timedelta(days=window_days)
    delta = (sched.weekday - now.weekday()) % 7
    cand = datetime.combine((now + timedelta(days=delta)).date(), time(sched.hh, sched.mm), tzinfo=timezone.utc)
    if cand < now:
        cand += timedelta(days=7)
    guard = 0
    while len(out) < count and cand <= horizon and guard < 60:
        if sched.months is None or cand.month in sched.months:
            out.append(cand)
        cand += timedelta(days=7)
        guard += 1
    return out


def synthesize(text: str, now: datetime, count: int = 4, window_days: int = 60) -> tuple[list[datetime], Optional[str]]:
    """(start datetimes, ongoing_label). If unparseable, returns ([now], "Ongoing")
    so a real listing is never dropped — just shown as ongoing."""
    sched = parse_schedule(text)
    if sched is None:
        return [now], "Ongoing"
    occ = occurrences(sched, now, count, window_days)
    if not occ:  # parsed but out of season within the window
        return [now], f"Ongoing · {sched.label}"
    return occ, None
