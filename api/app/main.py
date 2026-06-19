"""Pulse API — FastAPI surface over the canonical events table.

On startup it creates tables, seeds the profile + cities, and runs one
ingest+cleanup pass so `/feed` returns ranked data immediately. Single-user:
gated behind one optional secret token (APP_TOKEN), not full auth.
"""
from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import Any, Optional

from fastapi import Depends, FastAPI, Header, HTTPException, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlmodel import Session, select

from .config import settings
from .db import engine, get_session, init_db
from .models import City, Event, Source as SourceRow, UserEventAction, UserProfile, Waitlist

if settings.sentry_dsn:  # error tracking in prod; no-op locally when unset
    import sentry_sdk

    sentry_sdk.init(dsn=settings.sentry_dsn, traces_sample_rate=0.1, send_default_pii=False)
from .pipeline.geocode import CENTROIDS
from .pipeline.rank import COMMUNITY_CATEGORIES
from .pipeline.expire import prune_expired
from .pipeline.run import _profile, cleanup, ingest, ingest_query, refresh_city
from .pipeline.rank import rank as _rank
from .schemas import event_card
from .cities_seed import seed_cities


def _origin(city: str, profile: UserProfile) -> tuple[float, float]:
    """When 'in' a city, distances are measured from that city's centroid."""
    return CENTROIDS.get(city, (profile.home_lat, profile.home_lng))

app = FastAPI(title="Pulse API", version="1.0.0", description="Personal event radar — discovery + personalization only.")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # single-user personal app; security intentionally relaxed
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---- single-user gate ------------------------------------------------------
def require_token(x_pulse_token: Optional[str] = Header(default=None)) -> None:
    if settings.app_token and x_pulse_token != settings.app_token:
        raise HTTPException(status_code=401, detail="Invalid or missing token")


# ---- identity: logged-in user, else anonymous device ----------------------
import hashlib
import secrets
from .models import AuthToken, User


def _hash_pw(password: str, salt: str) -> str:
    return hashlib.pbkdf2_hmac("sha256", password.encode(), bytes.fromhex(salt), 100_000).hex()


def _device_of(x_device_id: Optional[str]) -> str:
    return ((x_device_id or "").strip()[:64]) or "me"


def get_identity(
    authorization: Optional[str] = Header(default=None),
    x_device_id: Optional[str] = Header(default=None),
    session: Session = Depends(get_session),
) -> str:
    """Scoping key for saves + preferences. A valid Bearer token → 'user:<id>'
    (follows the person across devices); otherwise the anonymous device id."""
    if authorization and authorization.lower().startswith("bearer "):
        tok = authorization[7:].strip()
        row = session.get(AuthToken, tok) if tok else None
        if row is not None:
            return f"user:{row.user_id}"
    return _device_of(x_device_id)


def _migrate(session: Session) -> None:
    """Idempotent column adds for pre-existing Postgres tables (create_all won't
    ALTER). Safe on SQLite/Postgres; no-ops once the columns exist."""
    stmts = ["ALTER TABLE user_event_actions ADD COLUMN IF NOT EXISTS device_id VARCHAR DEFAULT 'anon'"]
    for sql in stmts:
        try:
            session.execute(text(sql))
            session.commit()
        except Exception:
            session.rollback()


# ---- startup ---------------------------------------------------------------
@app.on_event("startup")
def on_startup() -> None:
    init_db()
    with Session(engine) as session:
        _migrate(session)
        _profile(session)
        seed_cities(session)
        # Purge any synthetic demo events left from the old seed fallback — the
        # feed is real-only now. Idempotent (a no-op once they're gone).
        stale = session.exec(select(Event).where(Event.is_synthetic == True)).all()  # noqa: E712
        for ev in stale:
            session.delete(ev)
        if stale:
            session.commit()
        # First boot: a FAST populate (keyed APIs only) so the cold start doesn't
        # block on scraping. Civic/festival sources come in on the first
        # /cities/{city}/refresh (which the frontend fires on load).
        if not session.exec(select(Event).where(Event.is_synthetic == False)).first():  # noqa: E712
            ingest(session, "Lisbon", fast=True)
            cleanup(session)


# ---- health ----------------------------------------------------------------
@app.get("/health")
def health() -> dict[str, Any]:
    with Session(engine) as session:
        events = len(session.exec(select(Event).where(Event.status == "active")).all())
    return {"status": "ok", "active_events": events, "time": datetime.now(timezone.utc).isoformat()}


# ---- auth (basic email + password) -----------------------------------------
def _issue_token(session: Session, user_id: str) -> str:
    tok = secrets.token_urlsafe(32)
    session.add(AuthToken(token=tok, user_id=user_id))
    session.commit()
    return tok


def _migrate_device_to_user(session: Session, device: str, user_id: str) -> None:
    """Carry a signup's anonymous saves + preferences into the new account."""
    if not device or device in ("me", "anon") or device.startswith("user:"):
        return
    for a in session.exec(select(UserEventAction).where(UserEventAction.device_id == device)).all():
        a.device_id = f"user:{user_id}"
        session.add(a)
    dp = session.get(UserProfile, device)
    up = session.get(UserProfile, f"user:{user_id}")
    if dp is not None and up is None:
        session.add(UserProfile(
            id=f"user:{user_id}", home_base_city=dp.home_base_city, home_lat=dp.home_lat, home_lng=dp.home_lng,
            interest_tags=dp.interest_tags, dealbreakers=dp.dealbreakers, boosts=dp.boosts, mutes=dp.mutes,
            long_tail_weight=dp.long_tail_weight,
        ))
    session.commit()


@app.post("/auth/signup", dependencies=[Depends(require_token)])
def signup(body: dict[str, Any], session: Session = Depends(get_session), x_device_id: Optional[str] = Header(default=None)) -> dict[str, Any]:
    email = (body.get("email") or "").strip().lower()
    password = body.get("password") or ""
    if "@" not in email or "." not in email or len(email) > 254:
        raise HTTPException(400, "valid email required")
    if len(password) < 6:
        raise HTTPException(400, "password must be at least 6 characters")
    if session.exec(select(User).where(User.email == email)).first():
        raise HTTPException(409, "an account with that email already exists")
    salt = secrets.token_hex(16)
    user = User(email=email, salt=salt, password_hash=_hash_pw(password, salt))
    session.add(user)
    session.commit()
    session.refresh(user)
    _migrate_device_to_user(session, _device_of(x_device_id), user.id)
    return {"token": _issue_token(session, user.id), "email": user.email}


@app.post("/auth/login", dependencies=[Depends(require_token)])
def login(body: dict[str, Any], session: Session = Depends(get_session)) -> dict[str, Any]:
    email = (body.get("email") or "").strip().lower()
    password = body.get("password") or ""
    user = session.exec(select(User).where(User.email == email)).first()
    if user is None or not secrets.compare_digest(user.password_hash, _hash_pw(password, user.salt)):
        raise HTTPException(401, "wrong email or password")
    return {"token": _issue_token(session, user.id), "email": user.email}


@app.post("/auth/logout")
def logout(session: Session = Depends(get_session), authorization: Optional[str] = Header(default=None)) -> dict[str, Any]:
    if authorization and authorization.lower().startswith("bearer "):
        row = session.get(AuthToken, authorization[7:].strip())
        if row is not None:
            session.delete(row)
            session.commit()
    return {"ok": True}


@app.get("/auth/me")
def auth_me(session: Session = Depends(get_session), authorization: Optional[str] = Header(default=None)) -> dict[str, Any]:
    if authorization and authorization.lower().startswith("bearer "):
        row = session.get(AuthToken, authorization[7:].strip())
        if row is not None:
            user = session.get(User, row.user_id)
            if user is not None:
                return {"email": user.email}
    return {"email": None}


# ---- feed ------------------------------------------------------------------
_CHIP_TO_CATEGORY = {
    "music": "Live music", "art": "Art", "food": "Food", "film": "Film",
    "markets": "Farmers market", "festivals": "Festival", "fairs": "Carnival/Fair",
    "community": "Community", "outdoors": "Outdoors", "family": "Family/Kids",
    "sports": "Sports", "meetups": "Meetup", "parades": "Parade", "civic": "Civic",
}


@app.get("/feed", dependencies=[Depends(require_token)])
def feed(
    session: Session = Depends(get_session),
    device: str = Depends(get_identity),
    city: Optional[str] = None,
    lat: Optional[float] = None,
    lng: Optional[float] = None,
    free: bool = False,
    near: bool = False,
    when: str = "any",  # any | today | weekend
    scope: str = "all",  # all | community | ticketed
    cats: Optional[str] = Query(default=None, description="comma-separated chip keys or category labels"),
    q: Optional[str] = None,
    limit: int = 50,
    offset: int = 0,
) -> dict[str, Any]:
    profile = _profile(session, device)
    city = city or profile.home_base_city
    # Distances are measured from the user's real position when provided.
    origin = (lat, lng) if lat is not None and lng is not None else _origin(city, profile)

    stmt = select(Event).where(Event.status == "active", Event.city == city)
    rows = session.exec(stmt).all()

    # Real events only — never fabricated/synthetic fillers. An empty city
    # surfaces the empty state on the client instead of fake events.
    rows = [e for e in rows if not e.is_synthetic]

    # Time guard: never show events that have already passed. `expire_past` flags
    # them during a refresh, but this also excludes by clock on every request so
    # stale events drop off even between refreshes. A small grace keeps things
    # that started earlier today (likely still ongoing) visible.
    now = datetime.now(timezone.utc)
    grace = timedelta(hours=6)

    # Hard dealbreakers: free-only, max distance. Everything else just ranks.
    def keep(ev: Event) -> bool:
        if ev.start_utc is not None:
            start = ev.start_utc if ev.start_utc.tzinfo else ev.start_utc.replace(tzinfo=timezone.utc)
            if start < now - grace:
                return False
        if free and not ev.is_free:
            return False
        if near and ev.lat is not None:
            from .schemas import _distance_label

            d = _distance_label(ev, profile, origin)
            if d and float(d.rstrip("mi")) > (profile.dealbreakers or {}).get("max_distance_km", 25) / 1.609:
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
            wanted = {_CHIP_TO_CATEGORY.get(c.strip().lower(), c.strip()) for c in cats.split(",") if c.strip()}
            if wanted and ev.category not in wanted:
                return False
        if q:
            hay = f"{ev.title} {ev.category} {ev.venue_name}".lower()
            if q.lower() not in hay:
                return False
        return True

    kept = [ev for ev in rows if keep(ev)]

    # Personalize per device: re-rank against THIS device's profile in-memory for
    # this request only. event_card reads ev.relevance_score/_reasons, and the
    # session is never committed in a read path, so nothing persists or leaks
    # across devices (the old PUT /profile global re-rank is gone).
    from .pipeline.rank import rank

    for ev in kept:
        c = {
            "category": ev.category, "is_free": ev.is_free, "price_min": ev.price_min,
            "gem": ev.is_gem, "start_utc": ev.start_utc, "popularity_signal": ev.popularity_signal,
        }
        rank(c, profile)
        ev.relevance_score = c["relevance_score"]
        ev.relevance_reasons = c["relevance_reasons"]

    kept.sort(key=lambda e: (e.relevance_score, e.start_utc or datetime.max.replace(tzinfo=timezone.utc)), reverse=True)
    page = kept[offset : offset + limit]
    return {
        "city": city,
        "total": len(kept),
        "events": [event_card(ev, profile, origin) for ev in page],
    }


# Per-(city, query) deep-search throttle (warm-instance; avoids re-scraping).
_SEARCH_TS: dict[str, datetime] = {}


@app.get("/search", dependencies=[Depends(require_token)])
def search(
    session: Session = Depends(get_session),
    device: str = Depends(get_identity),
    q: Optional[str] = None,
    city: Optional[str] = None,
    lat: Optional[float] = None,
    lng: Optional[float] = None,
    country: Optional[str] = None,
    limit: int = 50,
) -> dict[str, Any]:
    """Adaptive deep search: pull Eventbrite's live keyword results for q in this
    city (e.g. FIFA watch parties), fold them through the pipeline, then return
    real, upcoming, per-device-ranked matches. Throttled per (city, q)."""
    profile = _profile(session, device)
    city = city or profile.home_base_city
    query = (q or "").strip()
    if len(query) < 2:
        return {"city": city, "q": query, "total": 0, "events": []}

    # Deep-ingest the keyword page (cached per city+q to avoid re-scraping).
    key = f"{city}|{query}".lower()
    now = datetime.now(timezone.utc)
    last = _SEARCH_TS.get(key)
    if last is None or (now - last).total_seconds() > settings.search_min_interval_s:
        try:
            ingest_query(session, city, query, country=country or "", lat=lat, lng=lng)
            cleanup(session)
            _SEARCH_TS[key] = now
        except Exception:
            pass  # fall back to whatever's already indexed

    origin = (lat, lng) if lat is not None and lng is not None else _origin(city, profile)
    grace = timedelta(hours=6)
    tokens = [t for t in query.lower().split() if t]

    rows = session.exec(select(Event).where(Event.status == "active", Event.city == city)).all()
    matches = []
    for ev in rows:
        if ev.is_synthetic:
            continue
        if ev.start_utc is not None:
            start = ev.start_utc if ev.start_utc.tzinfo else ev.start_utc.replace(tzinfo=timezone.utc)
            if start < now - grace:
                continue
        hay = f"{ev.title} {ev.category} {ev.venue_name} {ev.description}".lower()
        if not all(t in hay for t in tokens):
            continue
        c = {"category": ev.category, "is_free": ev.is_free, "price_min": ev.price_min,
             "gem": ev.is_gem, "start_utc": ev.start_utc, "popularity_signal": ev.popularity_signal}
        _rank(c, profile)
        ev.relevance_score = c["relevance_score"]
        ev.relevance_reasons = c["relevance_reasons"]
        matches.append(ev)

    matches.sort(key=lambda e: (e.relevance_score, e.start_utc or datetime.max.replace(tzinfo=timezone.utc)), reverse=True)
    return {
        "city": city,
        "q": query,
        "total": len(matches),
        "events": [event_card(ev, profile, origin) for ev in matches[:limit]],
    }


@app.get("/events/{event_id}", dependencies=[Depends(require_token)])
def get_event(event_id: str, session: Session = Depends(get_session)) -> dict[str, Any]:
    ev = session.get(Event, event_id)
    if ev is None:
        raise HTTPException(404, "Event not found")
    profile = _profile(session)
    return event_card(ev, profile, _origin(ev.city, profile))


@app.post("/events/{event_id}/action", dependencies=[Depends(require_token)])
def post_action(
    event_id: str, body: dict[str, Any],
    session: Session = Depends(get_session), device: str = Depends(get_identity),
) -> dict[str, Any]:
    action = body.get("action")
    if action not in {"saved", "unsaved", "dismissed", "clicked"}:
        raise HTTPException(400, "action must be saved|unsaved|dismissed|clicked")
    # Record the action even if the event isn't in the canonical table (it may have
    # expired or come from a stateless instance) — no-op-friendly, matches index.py.
    session.add(UserEventAction(device_id=device, event_id=event_id, action=action))
    session.commit()
    return {"ok": True, "event_id": event_id, "action": action}


@app.get("/saved", dependencies=[Depends(require_token)])
def saved(session: Session = Depends(get_session), device: str = Depends(get_identity)) -> dict[str, Any]:
    # Only THIS device's saves — never another visitor's.
    actions = session.exec(
        select(UserEventAction).where(
            UserEventAction.device_id == device,
            UserEventAction.action.in_(["saved", "unsaved", "dismissed"]),  # type: ignore[attr-defined]
        )
    ).all()
    saved_ids: set[str] = set()
    for a in sorted(actions, key=lambda x: x.ts):
        if a.action == "saved":
            saved_ids.add(a.event_id)
        else:  # "unsaved" (explicit un-bookmark) or "dismissed" both clear the save
            saved_ids.discard(a.event_id)
    profile = _profile(session, device)
    events = []
    for i in saved_ids:
        ev = session.get(Event, i)
        if ev:
            events.append(event_card(ev, profile, _origin(ev.city, profile)))
    return {"saved_ids": list(saved_ids), "events": events}


@app.get("/digest", dependencies=[Depends(require_token)])
def digest(
    session: Session = Depends(get_session), device: str = Depends(get_identity), city: Optional[str] = None,
) -> dict[str, Any]:
    profile = _profile(session, device)
    city = city or profile.home_base_city
    origin = _origin(city, profile)
    rows = session.exec(select(Event).where(Event.status == "active", Event.city == city)).all()
    rows = [e for e in rows if not e.is_synthetic]  # real events only — no synthetic fillers
    # personalize the digest order per device (in-memory, read-only path)
    from .pipeline.rank import rank

    for ev in rows:
        c = {"category": ev.category, "is_free": ev.is_free, "price_min": ev.price_min,
             "gem": ev.is_gem, "start_utc": ev.start_utc, "popularity_signal": ev.popularity_signal}
        rank(c, profile)
        ev.relevance_score = c["relevance_score"]
        ev.relevance_reasons = c["relevance_reasons"]
    rows.sort(key=lambda e: e.relevance_score, reverse=True)
    return {"title": "things you'll probably want", "events": [event_card(ev, profile, origin) for ev in rows[:5]]}


@app.get("/profile", dependencies=[Depends(require_token)])
def get_profile(session: Session = Depends(get_session), device: str = Depends(get_identity)) -> UserProfile:
    return _profile(session, device)


@app.put("/profile", dependencies=[Depends(require_token)])
def put_profile(
    body: dict[str, Any], session: Session = Depends(get_session), device: str = Depends(get_identity),
) -> UserProfile:
    # Update ONLY this device's profile. Ranking is applied per-request at /feed,
    # so there's no global re-rank to contaminate other devices.
    p = _profile(session, device)
    for field in ("home_base_city", "home_lat", "home_lng", "interest_tags", "dealbreakers", "boosts", "mutes", "long_tail_weight"):
        if field in body:
            setattr(p, field, body[field])
    session.add(p)
    session.commit()
    session.refresh(p)
    return p


@app.post("/waitlist", dependencies=[Depends(require_token)])
def join_waitlist(
    body: dict[str, Any], session: Session = Depends(get_session), device: str = Depends(get_identity),
) -> dict[str, Any]:
    email = (body.get("email") or "").strip().lower()
    if "@" not in email or "." not in email or len(email) > 254:
        raise HTTPException(400, "valid email required")
    if session.get(Waitlist, email) is None:
        session.add(Waitlist(email=email, device_id=device))
        session.commit()
    return {"ok": True}


@app.get("/cities", dependencies=[Depends(require_token)])
def list_cities(session: Session = Depends(get_session)) -> list[City]:
    return session.exec(select(City).where(City.active)).all()


@app.post("/cities/{city}/refresh", dependencies=[Depends(require_token)])
def refresh(
    city: str,
    session: Session = Depends(get_session),
    lat: Optional[float] = None,
    lng: Optional[float] = None,
    country: Optional[str] = None,
) -> dict[str, Any]:
    # Register a freshly-discovered city (from geolocation) so distances + the
    # location switcher know about it.
    if lat is not None and lng is not None:
        CENTROIDS.setdefault(city, (lat, lng))
    # Stampede guard: if this city was crawled very recently, return the cached
    # count instead of re-ingesting. Stops N concurrent visitors on a cold city
    # from firing N parallel source-API fetches and burning quota.
    existing = session.get(City, city)
    if existing and existing.last_full_crawl_at is not None:
        last = existing.last_full_crawl_at
        if last.tzinfo is None:
            last = last.replace(tzinfo=timezone.utc)
        if (datetime.now(timezone.utc) - last).total_seconds() < settings.refresh_min_interval_s:
            return {"city": city, "active_events": existing.count, "cached": True}
    stats = refresh_city(session, city, lat=lat, lng=lng, country=country or (existing.country if existing else ""))
    count = len(session.exec(select(Event).where(Event.status == "active", Event.city == city)).all())
    row = session.get(City, city)
    if row is None:
        row = City(name=city, country=country or "", lat=lat or 0.0, lng=lng or 0.0, count=count, active=True)
    row.count = count
    row.last_full_crawl_at = datetime.now(timezone.utc)
    session.add(row)
    session.commit()
    return {"city": city, "active_events": count, **stats}


# ---- scheduled refresh (Vercel Cron) ---------------------------------------
def _crawl_key(c: City) -> datetime:
    t = c.last_full_crawl_at
    if t is None:
        return datetime.min.replace(tzinfo=timezone.utc)
    return t if t.tzinfo else t.replace(tzinfo=timezone.utc)


@app.get("/cron/refresh-all")
def cron_refresh_all(request: Request, session: Session = Depends(get_session), limit: int = 5) -> dict[str, Any]:
    """Keep data fresh without a user present: refresh the stalest active cities
    (bounded per run to stay within the function budget). Each cleanup pass also
    runs expire_past globally, so past events drop off everywhere. Wired to a
    Vercel Cron in vercel.json."""
    # Vercel sends "Authorization: Bearer <CRON_SECRET>" when CRON_SECRET is set.
    if settings.cron_secret and request.headers.get("authorization") != f"Bearer {settings.cron_secret}":
        raise HTTPException(401, "unauthorized")

    cities = sorted(
        session.exec(select(City).where(City.active == True)).all(),  # noqa: E712
        key=_crawl_key,
    )
    targets = cities[: max(1, limit)]
    results: list[dict[str, Any]] = []
    for c in targets:
        try:
            stats = refresh_city(session, c.name, lat=c.lat or None, lng=c.lng or None, country=c.country)
            count = len(session.exec(select(Event).where(Event.status == "active", Event.city == c.name)).all())
            c.count = count
            c.last_full_crawl_at = datetime.now(timezone.utc)
            session.add(c)
            session.commit()
            results.append({"city": c.name, "active_events": count,
                            "upserts": stats.get("upserts"), "expired": stats.get("expired")})
        except Exception as exc:  # one bad city shouldn't sink the whole run
            session.rollback()
            results.append({"city": c.name, "error": str(exc)[:200]})

    if not targets:  # no cities yet — at least sweep past events
        stats = cleanup(session)
        results.append({"city": None, "expired": stats.get("expired")})

    # Retention: delete events that finished long ago so the table stays bounded.
    pruned = prune_expired(session, settings.event_retention_days)
    session.commit()

    return {"refreshed": len(targets), "pruned": pruned, "results": results}


@app.post("/push/subscribe", dependencies=[Depends(require_token)])
def push_subscribe(body: dict[str, Any], session: Session = Depends(get_session)) -> dict[str, Any]:
    from .models import PushSubscription

    sub = PushSubscription(endpoint=body.get("endpoint", ""), payload=body)
    session.add(sub)
    session.commit()
    return {"ok": True}


# ---- observability / source health ----------------------------------------
@app.get("/admin/health", dependencies=[Depends(require_token)])
def admin_health(session: Session = Depends(get_session)) -> dict[str, Any]:
    from .models import RawEvent, RunStat

    sources = session.exec(select(SourceRow)).all()
    raws = session.exec(select(RawEvent)).all()
    by_status: dict[str, int] = {}
    for r in raws:
        by_status[r.parse_status] = by_status.get(r.parse_status, 0) + 1
    active_rows = session.exec(select(Event).where(Event.status == "active")).all()
    active = len(active_rows)
    total = len(session.exec(select(Event)).all())

    # Source coverage: how many active events each source uniquely contributes
    # (events where it's the *only* source) vs shares (deduped "also on").
    coverage: dict[str, dict[str, int]] = {}
    by_category: dict[str, int] = {}
    for ev in active_rows:
        by_category[ev.category] = by_category.get(ev.category, 0) + 1
        names = ev.source_names or []
        for n in names:
            coverage.setdefault(n, {"total": 0, "unique": 0})
            coverage[n]["total"] += 1
            if len(names) == 1:
                coverage[n]["unique"] += 1

    discovered = [s for s in sources if s.discovered_from]
    stat = session.get(RunStat, "last")
    geo_total = (stat.geocode_cache_hits + stat.geocode_network) if stat else 0

    return {
        "key_pool": {
            "ticketmaster_keys": len(settings.ticketmaster_keys),
            "seatgeek_keys": len(settings.seatgeek_keys),
            "serpapi_keys": len(settings.serpapi_keys),
            "predicthq": bool(settings.predicthq_tokens),
            "meetup": bool(settings.meetup_tokens),
            "geocoder": settings.geocoder,
            "image_enrich": settings.enable_image_enrich,
        },
        "sources": [
            {"name": s.name, "type": s.type, "city": s.city, "enabled": s.enabled,
             "discovered_from": s.discovered_from, "last_crawled_at": s.last_crawled_at}
            for s in sources
        ],
        "discovery_yield": len(discovered),
        "coverage": coverage,  # per-source unique vs shared contribution (the Venn)
        "by_category": dict(sorted(by_category.items(), key=lambda kv: -kv[1])),
        "last_run": (
            {"parsed": stat.parsed, "failed": stat.failed, "deduped": stat.deduped,
             "upserts": stat.upserts, "expired": stat.expired,
             "geocode": {"cache_hits": stat.geocode_cache_hits, "network": stat.geocode_network,
                         "fallbacks": stat.geocode_fallbacks,
                         "hit_rate": round(stat.geocode_cache_hits / geo_total, 3) if geo_total else None}}
            if stat else None
        ),
        "raw_events": {"total": len(raws), "by_status": by_status},
        "events": {"active": active, "total": total},
        "parse_failure_rate": round(by_status.get("failed", 0) / max(len(raws), 1), 3),
    }
