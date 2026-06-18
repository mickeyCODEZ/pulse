"""JsonLdSource — extract schema.org/Event from a public page via extruct. Catches
the long tail whose APIs are closed (Carassauga, festival/venue/Eventbrite/DICE
pages that ship JSON-LD). City-bound, robots-checked, capped, per-object tolerant."""
from __future__ import annotations

from datetime import datetime
from typing import Any

from .base import RawEventPayload, Source


def _label(value: Any) -> str:
    """'Fri · 7:00pm' from a schema.org startDate (kept in its local offset)."""
    try:
        dt = datetime.fromisoformat(str(value).replace("Z", "+00:00"))
    except (ValueError, TypeError):
        return ""
    if dt.hour == 0 and dt.minute == 0:
        return f"{dt.strftime('%a')} · all day"
    hour = dt.strftime("%I").lstrip("0") or "12"
    return f"{dt.strftime('%a')} · {hour}:{dt.strftime('%M')}{dt.strftime('%p').lower()}"

try:
    import extruct  # type: ignore
except Exception:  # pragma: no cover
    extruct = None  # type: ignore

MAX_EVENTS = 60

_TYPE_MAP = {
    "Festival": "Festival", "MusicEvent": "Live music", "ChildrensEvent": "Family/Kids",
    "SportsEvent": "Sports", "ComedyEvent": "Comedy", "TheaterEvent": "Theatre",
    "ScreeningEvent": "Film", "ExhibitionEvent": "Art", "EducationEvent": "Workshop",
    "FoodEvent": "Food", "SocialEvent": "Community", "BusinessEvent": "Meetup",
    "DanceEvent": "Theatre", "LiteraryEvent": "Talk", "VisualArtsEvent": "Art",
}


def _types(obj: dict[str, Any]) -> list[str]:
    t = obj.get("@type") or obj.get("type") or []
    return [t] if isinstance(t, str) else list(t)


def _is_event(obj: dict[str, Any]) -> bool:
    return any("event" in str(t).lower() for t in _types(obj))


def _category(obj: dict[str, Any]) -> str:
    for t in _types(obj):
        if t in _TYPE_MAP:
            return _TYPE_MAP[t]
    return "Event"


def _scalar(v: Any) -> Any:
    return v[0] if isinstance(v, list) and v else v


def _image(obj: dict[str, Any]) -> str:
    img = _scalar(obj.get("image"))
    if isinstance(img, dict):
        return str(img.get("url", ""))
    return str(img or "")


def _location(obj: dict[str, Any]) -> tuple[str, float | None, float | None]:
    loc = _scalar(obj.get("location"))
    if isinstance(loc, str):
        return loc, None, None
    if isinstance(loc, dict):
        name = str(loc.get("name", "") or "")
        geo = loc.get("geo") or {}
        lat = geo.get("latitude")
        lng = geo.get("longitude")
        if not name:
            addr = loc.get("address")
            if isinstance(addr, dict):
                name = str(addr.get("streetAddress") or addr.get("addressLocality") or "")
            elif isinstance(addr, str):
                name = addr
        try:
            return name, (float(lat) if lat else None), (float(lng) if lng else None)
        except (TypeError, ValueError):
            return name, None, None
    return "", None, None


def _offers(obj: dict[str, Any]) -> tuple[float | None, bool]:
    off = _scalar(obj.get("offers"))
    if isinstance(off, dict):
        price = off.get("price")
        if price is None:
            price = off.get("lowPrice")
        try:
            p = float(price)
            return (None, True) if p == 0 else (p, False)
        except (TypeError, ValueError):
            return None, False
    return None, False  # no offers → price unknown, NOT free (avoids false "free")


def _walk(node: Any, out: list[dict]) -> None:
    if isinstance(node, dict):
        if "@graph" in node:
            _walk(node["@graph"], out)
        if _is_event(node):
            out.append(node)
        for v in node.values():
            if isinstance(v, (list, dict)):
                _walk(v, out)
    elif isinstance(node, list):
        for v in node:
            _walk(v, out)


class JsonLdSource(Source):
    type = "jsonld"
    min_interval_s = 1.5
    max_results = MAX_EVENTS

    def __init__(self, name: str, city: str, lat: float, lng: float, base_url: str,
                 kind: str = "single", popularity: float = 0.35, category_hint: str = "") -> None:
        self.name = name
        self.city = city
        self.base = (lat, lng)
        self.base_url = base_url
        self.kind = kind
        self.popularity = popularity
        self.category_hint = category_hint  # used when the event's own @type is generic

    def fetch(self, city: str, window_days: int = 30, lat: float | None = None, lng: float | None = None
              ) -> list[RawEventPayload]:
        if extruct is None or city.lower() != self.city.lower():
            return []
        if not self.robots_allowed(self.base_url):
            return []
        resp = self.get(self.base_url, timeout=20.0)
        if resp is None:
            return []
        try:
            data = extruct.extract(resp.text, syntaxes=["json-ld", "microdata"], uniform=True)
        except Exception:
            return []

        events: list[dict] = []
        for syn in ("json-ld", "microdata"):
            _walk(data.get(syn, []), events)

        out: list[RawEventPayload] = []
        seen = set()
        for ev in events:
            if len(out) >= MAX_EVENTS:
                break
            try:
                title = str(_scalar(ev.get("name")) or "").strip()
                start = _scalar(ev.get("startDate"))
                if not title or not start or title in seen:
                    continue
                seen.add(title)
                venue, elat, elng = _location(ev)
                price, is_free = _offers(ev)
                out.append(
                    RawEventPayload(
                        raw_url=str(_scalar(ev.get("url")) or self.base_url),
                        payload={
                            "title": title,
                            # use the event's own @type; fall back to the feed's
                            # category hint when it's the generic "Event".
                            "category": (lambda c: c if c != "Event" else (self.category_hint or "Event"))(_category(ev)),
                            "start_utc": str(start),
                            "date_label": _label(start),
                            "end_utc": str(_scalar(ev.get("endDate")) or "") or None,
                            "venue_name": venue,
                            "city": self.city,
                            "lat": elat,
                            "lng": elng,
                            "description": str(_scalar(ev.get("description")) or ""),
                            "image_url": _image(ev),
                            "price_min": price,
                            "is_free": is_free,
                            "sources": [self.name],
                            "popularity_signal": self.popularity,
                        },
                    )
                )
            except Exception:
                continue
        return out
