"""Stateless serverless entrypoint for Vercel.

Vercel functions have an ephemeral filesystem, so there's no SQLite/Postgres here.
Instead this reuses the SAME pipeline (parse → normalize → geocode → dedupe →
rank → event_card) but runs it IN-MEMORY per request, fetching live data from the
keyed APIs (Ticketmaster / SeatGeek — fast, ideal for serverless). The civic/
scraping/ELT superset lives in app/main.py for a stateful (Postgres) host.

Security is intentionally relaxed for a public demo: open CORS, no token.
"""
from __future__ import annotations

import time
from datetime import datetime, timezone
from typing import Any, Optional

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

from app.cities_seed import _CITIES
from app.models import Event, UserProfile
from app.pipeline.dedupe import merge_block
from app.pipeline.geocode import CENTROIDS, geocode
from app.pipeline.normalize import normalize
from app.pipeline.rank import COMMUNITY_CATEGORIES, rank
from app.pipeline.parse import parse
from app.schemas import event_card
from app.sources.seatgeek import SeatGeekSource
from app.sources.seed import SeedSource
from app.sources.ticketmaster import TicketmasterSource

app = FastAPI(title="Pulse API (serverless)", version="1.0.0")
app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"],
)

# ---- in-memory single-user state (per warm instance) -----------------------
PROFILE = UserProfile(
    id="me",
    interest_tags=["Live music", "Art", "Food", "Film", "Talks", "Festival"],
    dealbreakers={"free_only": False, "max_distance_km": 25, "time_windows": []},
    boosts={"Live music": "Boost", "Festival": "Boost", "Talks": "Boost"},
    long_tail_weight=0.6,
)
SAVED: set[str] = set()
EVENT_CACHE: dict[str, Event] = {}  # recently served events (for /events/{id})
_FEED_CACHE: dict[str, tuple[float, list[Event]]] = {}  # per-city (ttl, events)
_FEED_TTL = 180.0  # seconds — feed+digest+refresh in one load share one live fetch
_CHIP_TO_CATEGORY = {
    "music": "Live music", "art": "Art", "food": "Food", "film": "Film",
    "markets": "Farmers market", "festivals": "Festival", "fairs": "Carnival/Fair",
    "community": "Community", "outdoors": "Outdoors", "family": "Family/Kids",
    "sports": "Sports", "meetups": "Meetup", "parades": "Parade", "civic": "Civic",
}


def _origin(city: str, lat: Optional[float], lng: Optional[float]) -> tuple[float, float]:
    if lat is not None and lng is not None:
        return (lat, lng)
    return CENTROIDS.get(city, (PROFILE.home_lat, PROFILE.home_lng))


def _to_event(c: dict[str, Any]) -> Event:
    return Event(
        title=c["title"], description=c.get("description", ""),
        start_utc=c.get("start_utc"), end_utc=c.get("end_utc"), tz=c.get("tz", "UTC"),
        date_label=c.get("date_label", ""), venue_name=c.get("venue_name", ""),
        lat=c.get("lat"), lng=c.get("lng"), city=c.get("city", ""),
        category=c.get("category", "Event"), price_min=c.get("price_min"),
        currency=c.get("currency", "USD"), is_free=bool(c.get("is_free")),
        url=c.get("url", ""), image_url=c.get("image_url", ""), image_pos=c.get("image_pos", ""),
        is_gem=bool(c.get("gem")), is_synthetic=bool(c.get("synthetic")),
        source_names=c.get("sources", []), popularity_signal=c.get("popularity_signal", 0.0),
        relevance_score=c.get("relevance_score", 0.0), relevance_reasons=c.get("relevance_reasons", []),
        status="active",
    )


def build_events(city: str, lat: Optional[float], lng: Optional[float]) -> list[Event]:
    """Live, in-memory ELT for one city/point — cached per warm instance so the
    feed+digest+refresh calls in a single page load share ONE live fetch (instead
    of 3+), keeping Ticketmaster quota + latency down."""
    key = city.lower()
    hit = _FEED_CACHE.get(key)
    if hit and (time.monotonic() - hit[0]) < _FEED_TTL:
        return hit[1]
    events = _build_events_uncached(city, lat, lng)
    _FEED_CACHE[key] = (time.monotonic(), events)
    if len(_FEED_CACHE) > 100:
        _FEED_CACHE.clear()
    return events


def _build_events_uncached(city: str, lat: Optional[float], lng: Optional[float]) -> list[Event]:
    sources = [TicketmasterSource(), SeatGeekSource(), SeedSource()]
    payloads = []
    for s in sources:
        if not getattr(s, "enabled", True):
            continue
        try:
            payloads += s.fetch(city, 30, lat, lng)[: s.max_results]
        except Exception:
            pass

    candidates: list[dict[str, Any]] = []
    for p in payloads:
        c = parse(p.payload)
        if c is not None:
            c = normalize(c)
        if c is None:
            continue
        c["url"] = c.get("url") or p.raw_url
        geocode(c)  # centroid (no Nominatim on serverless)
        candidates.append(c)

    survivors = merge_block(candidates)
    real = [c for c in survivors if not c.get("synthetic")]
    survivors = real if real else survivors  # hide seed when real exists
    for c in survivors:
        rank(c, PROFILE)
    events = [_to_event(c) for c in survivors]
    for ev in events:
        EVENT_CACHE[ev.id] = ev
    if len(EVENT_CACHE) > 2000:
        for k in list(EVENT_CACHE)[:1000]:
            EVENT_CACHE.pop(k, None)
    return events


@app.get("/health")
def health() -> dict[str, Any]:
    return {"status": "ok", "mode": "serverless", "active_events": sum(len(v[1]) for v in _FEED_CACHE.values()),
            "ticketmaster": bool(settings_keys()), "time": datetime.now(timezone.utc).isoformat()}


def settings_keys() -> bool:
    from app.config import settings
    return bool(settings.ticketmaster_keys or settings.seatgeek_keys)


@app.get("/feed")
def feed(city: Optional[str] = None, lat: Optional[float] = None, lng: Optional[float] = None,
         free: bool = False, near: bool = False, when: str = "any", scope: str = "all",
         cats: Optional[str] = Query(default=None), q: Optional[str] = None,
         limit: int = 60, offset: int = 0) -> dict[str, Any]:
    city = city or PROFILE.home_base_city
    origin = _origin(city, lat, lng)
    rows = build_events(city, lat, lng)

    from app.schemas import _distance_label

    def keep(ev: Event) -> bool:
        if free and not ev.is_free:
            return False
        if near and ev.lat is not None:
            d = _distance_label(ev, PROFILE, origin)
            if d and float(d[:-2]) > (PROFILE.dealbreakers or {}).get("max_distance_km", 25) / 1.609:
                return False
        if when in ("today", "weekend") and ev.start_utc:
            start = ev.start_utc if ev.start_utc.tzinfo else ev.start_utc.replace(tzinfo=timezone.utc)
            if when == "today" and start.date() != datetime.now(timezone.utc).date():
                return False
            if when == "weekend" and start.weekday() < 5:
                return False
        if scope == "community" and ev.category not in COMMUNITY_CATEGORIES:
            return False
        if scope == "ticketed" and ev.category in COMMUNITY_CATEGORIES:
            return False
        if cats:
            wanted = {_CHIP_TO_CATEGORY.get(x.strip().lower(), x.strip()) for x in cats.split(",") if x.strip()}
            if wanted and ev.category not in wanted:
                return False
        if q and q.lower() not in f"{ev.title} {ev.category} {ev.venue_name}".lower():
            return False
        return True

    kept = [e for e in rows if keep(e)]
    kept.sort(key=lambda e: (e.relevance_score, e.start_utc or datetime.max.replace(tzinfo=timezone.utc)), reverse=True)
    page = kept[offset: offset + limit]
    return {"city": city, "total": len(kept), "events": [event_card(e, PROFILE, origin) for e in page]}


@app.get("/events/{event_id}")
def get_event(event_id: str) -> dict[str, Any]:
    ev = EVENT_CACHE.get(event_id)
    if ev is None:
        return {"error": "not found (stateless cache miss)"}
    return event_card(ev, PROFILE, _origin(ev.city, ev.lat, ev.lng))


@app.post("/events/{event_id}/action")
def action(event_id: str, body: dict[str, Any]) -> dict[str, Any]:
    a = body.get("action")
    if a == "saved":
        SAVED.add(event_id)
    elif a in ("unsaved", "dismissed"):
        SAVED.discard(event_id)
    return {"ok": True, "action": a}


@app.get("/saved")
def saved() -> dict[str, Any]:
    evs = [event_card(EVENT_CACHE[i], PROFILE, _origin(EVENT_CACHE[i].city, EVENT_CACHE[i].lat, EVENT_CACHE[i].lng))
           for i in SAVED if i in EVENT_CACHE]
    return {"saved_ids": list(SAVED), "events": evs}


@app.get("/digest")
def digest(city: Optional[str] = None, lat: Optional[float] = None, lng: Optional[float] = None) -> dict[str, Any]:
    city = city or PROFILE.home_base_city
    origin = _origin(city, lat, lng)
    rows = build_events(city, lat, lng)
    real = [e for e in rows if not e.is_synthetic]
    rows = real if real else rows
    rows.sort(key=lambda e: e.relevance_score, reverse=True)
    return {"title": "things you'll probably want", "events": [event_card(e, PROFILE, origin) for e in rows[:5]]}


@app.get("/profile")
def get_profile() -> UserProfile:
    return PROFILE


@app.put("/profile")
def put_profile(body: dict[str, Any]) -> UserProfile:
    for f in ("home_base_city", "home_lat", "home_lng", "interest_tags", "dealbreakers", "boosts", "mutes", "long_tail_weight"):
        if f in body:
            setattr(PROFILE, f, body[f])
    return PROFILE


@app.get("/cities")
def cities() -> list[dict[str, Any]]:
    return [{"name": n, "country": c, "lat": la, "lng": ln, "count": cnt} for (n, c, la, ln, cnt) in _CITIES]


@app.post("/cities/{city}/refresh")
def refresh(city: str, lat: Optional[float] = None, lng: Optional[float] = None, country: Optional[str] = None) -> dict[str, Any]:
    # Explicit refresh busts the per-city cache so the user gets fresh data.
    _FEED_CACHE.pop(city.lower(), None)
    n = len(build_events(city, lat, lng))
    return {"city": city, "active_events": n}


@app.get("/admin/health")
def admin_health() -> dict[str, Any]:
    from app.config import settings
    return {"mode": "serverless", "key_pool": {"ticketmaster_keys": len(settings.ticketmaster_keys),
            "seatgeek_keys": len(settings.seatgeek_keys)}, "cache": len(EVENT_CACHE), "saved": len(SAVED)}
