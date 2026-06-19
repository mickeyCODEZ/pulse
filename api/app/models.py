"""SQLModel tables — the Pulse data model from the build spec, adapted for a
zero-config SQLite store (JSON columns instead of Postgres arrays/JSONB; string
UUIDs). The two halves of ELT are explicit: `RawEvent` is the unjudged staging
table, `Event` is the canonical table the API reads."""
from __future__ import annotations

import uuid
from datetime import datetime, timezone
from typing import Any, Optional

from sqlalchemy import Column, JSON
from sqlmodel import Field, SQLModel


def _uuid() -> str:
    return str(uuid.uuid4())


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


class Source(SQLModel, table=True):
    __tablename__ = "sources"
    id: str = Field(default_factory=_uuid, primary_key=True)
    type: str  # api | feed_ics | feed_rss | jsonld | scrape | seed
    name: str
    base_url: str = ""
    city: str = ""
    scope: str = ""
    robots_ok: bool = True
    cadence_minutes: int = 1440
    last_crawled_at: Optional[datetime] = None
    enabled: bool = True
    discovered_from: str = ""


class RawEvent(SQLModel, table=True):
    """STAGING — dump everything, no judgment. The cleanup pipeline reads this."""
    __tablename__ = "raw_events"
    id: str = Field(default_factory=_uuid, primary_key=True)
    source_id: str = Field(index=True)
    fetched_at: datetime = Field(default_factory=utcnow)
    raw_payload: dict[str, Any] = Field(default_factory=dict, sa_column=Column(JSON))
    raw_url: str = ""
    parse_status: str = Field(default="pending", index=True)  # pending|parsed|failed


class Event(SQLModel, table=True):
    """CANONICAL — what the app reads. Upserted on dedup_key by the pipeline."""
    __tablename__ = "events"
    id: str = Field(default_factory=_uuid, primary_key=True)
    title: str
    description: str = ""
    start_utc: Optional[datetime] = Field(default=None, index=True)
    end_utc: Optional[datetime] = None
    tz: str = "UTC"
    date_label: str = ""  # precomputed local "Fri · 9:00pm" (sources with real tz)

    venue_name: str = ""
    lat: Optional[float] = None
    lng: Optional[float] = None
    city: str = Field(default="", index=True)

    category: str = ""
    price_min: Optional[float] = None
    currency: str = "USD"
    is_free: bool = False

    url: str = ""
    image_url: str = ""
    image_pos: str = ""  # duotone background-position for the placeholder card
    is_gem: bool = False  # the inverted "Hidden gems" treatment (high match, low noise)
    is_synthetic: bool = Field(default=False, index=True)  # seed fallback vs. real source

    dedup_key: str = Field(index=True, unique=True)
    source_ids: list[str] = Field(default_factory=list, sa_column=Column(JSON))
    source_names: list[str] = Field(default_factory=list, sa_column=Column(JSON))

    popularity_signal: float = 0.0
    relevance_score: float = 0.0
    relevance_reasons: list[str] = Field(default_factory=list, sa_column=Column(JSON))

    first_seen_at: datetime = Field(default_factory=utcnow)
    last_seen_at: datetime = Field(default_factory=utcnow)
    status: str = Field(default="active", index=True)  # active|expired


class UserProfile(SQLModel, table=True):
    __tablename__ = "user_profile"
    # PK holds the anonymous device_id (one row per browser). "me" remains the
    # default/anon fallback for requests without an X-Device-Id header.
    id: str = Field(default="me", primary_key=True)
    home_base_city: str = "Lisbon"
    home_lat: float = 38.7223
    home_lng: float = -9.1393
    interest_tags: list[str] = Field(default_factory=list, sa_column=Column(JSON))
    dealbreakers: dict[str, Any] = Field(default_factory=dict, sa_column=Column(JSON))
    boosts: dict[str, Any] = Field(default_factory=dict, sa_column=Column(JSON))
    mutes: dict[str, Any] = Field(default_factory=dict, sa_column=Column(JSON))
    long_tail_weight: float = 0.6


class UserEventAction(SQLModel, table=True):
    __tablename__ = "user_event_actions"
    id: str = Field(default_factory=_uuid, primary_key=True)
    device_id: str = Field(default="anon", index=True)  # anonymous per-browser owner
    event_id: str = Field(index=True)
    action: str  # saved | unsaved | dismissed | clicked
    ts: datetime = Field(default_factory=utcnow)


class Waitlist(SQLModel, table=True):
    """Emails captured by the 'Pro coming soon' CTA. No auth, just interest."""
    __tablename__ = "waitlist"
    email: str = Field(primary_key=True)
    device_id: str = ""
    created_at: datetime = Field(default_factory=utcnow)


class User(SQLModel, table=True):
    """Basic email+password account so saves follow the person across devices."""
    __tablename__ = "users"
    id: str = Field(default_factory=_uuid, primary_key=True)
    email: str = Field(index=True, unique=True)
    password_hash: str = ""  # pbkdf2-hmac(sha256), hex
    salt: str = ""           # hex
    created_at: datetime = Field(default_factory=utcnow)


class AuthToken(SQLModel, table=True):
    """Opaque session token → user. One per device login (basic, no expiry)."""
    __tablename__ = "auth_tokens"
    token: str = Field(primary_key=True)
    user_id: str = Field(index=True)
    created_at: datetime = Field(default_factory=utcnow)


class City(SQLModel, table=True):
    __tablename__ = "cities"
    name: str = Field(primary_key=True)
    country: str = ""
    lat: float = 0.0
    lng: float = 0.0
    radius_km: float = 25.0
    count: int = 0
    last_full_crawl_at: Optional[datetime] = None
    last_discovery_at: Optional[datetime] = None  # per-city DiscoverySource cache TTL
    active: bool = True


class PushSubscription(SQLModel, table=True):
    __tablename__ = "push_subscriptions"
    id: str = Field(default_factory=_uuid, primary_key=True)
    endpoint: str
    payload: dict[str, Any] = Field(default_factory=dict, sa_column=Column(JSON))
    created_at: datetime = Field(default_factory=utcnow)


class GeocodeCache(SQLModel, table=True):
    """Persisted geocoder results. Mandatory under Nominatim's usage policy —
    a query is resolved over the network at most once, ever."""
    __tablename__ = "geocode_cache"
    query: str = Field(primary_key=True)  # normalized "venue, address, city"
    lat: Optional[float] = None
    lng: Optional[float] = None
    ts: datetime = Field(default_factory=utcnow)


class MetaCache(SQLModel, table=True):
    """Cached page metadata (og:image) for the image-enrich stage, keyed by URL."""
    __tablename__ = "meta_cache"
    url: str = Field(primary_key=True)
    image_url: str = ""
    ts: datetime = Field(default_factory=utcnow)


class RunStat(SQLModel, table=True):
    """Last cleanup-run counters for /admin/health (single row, id='last')."""
    __tablename__ = "run_stats"
    id: str = Field(default="last", primary_key=True)
    parsed: int = 0
    failed: int = 0
    deduped: int = 0
    upserts: int = 0
    expired: int = 0
    geocode_cache_hits: int = 0
    geocode_network: int = 0
    geocode_fallbacks: int = 0
    discovery_registered: int = 0
    ts: datetime = Field(default_factory=utcnow)
