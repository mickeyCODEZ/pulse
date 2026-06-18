"""Ingest + cleanup orchestration.

ingest()  — run every active Source.fetch(), dump raw payloads into raw_events
            (ELT: collect wide, judge nothing).
cleanup() — read pending raw_events → parse → normalize → geocode → dedupe →
            rank → upsert on dedup_key into events → expire. Fully rerunnable
            end-to-end without creating duplicates.
"""
from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from sqlmodel import Session, select

from ..config import settings
from ..models import Event, RawEvent, RunStat, Source as SourceRow, UserProfile, utcnow
from ..sources import active_sources
from .dedupe import dedup_key, merge_block
from .enrich import enrich_images
from .expire import expire_past
from .geocode import geocode
from .geocoders import make_geocoder
from .normalize import normalize
from .parse import parse
from .rank import rank


def ingest(
    session: Session, city: str, window_days: int = 30, lat: float | None = None, lng: float | None = None,
    fast: bool = False, country: str = "",
) -> dict[str, int]:
    # `fast` = keyed APIs + seed only (no scraping/ICS/discovery) — used on a
    # serverless cold start so the first request doesn't time out.
    _fast_types = {"api", "seed"}
    # Discovery first: register any newly-found city-bound sources, so they
    # contribute on this same pass (subsequent visits are a cached no-op).
    try:
        from ..sources.discovery import DiscoverySource

        DiscoverySource().fetch(city, window_days, lat, lng)
    except Exception:
        pass

    # All-types coverage for ANY location: synthesize Eventbrite category feeds
    # for this city on demand (slug from name + country). Skipped in fast mode
    # (jsonld isn't a fast type) so cold starts stay quick.
    dynamic: list = []
    if not fast:
        if not country:
            from ..models import City as _City
            row = session.get(_City, city)
            country = (row.country if row else "") or ""
        try:
            from ..feeds import eventbrite_feeds_for_city
            from ..sources import _build_city_adapter

            for d in eventbrite_feeds_for_city(city, country, lat or 0.0, lng or 0.0):
                a = _build_city_adapter(d)
                if a is not None:
                    dynamic.append(a)
        except Exception:
            pass

    counts: dict[str, int] = {}
    for src in list(active_sources(session)) + dynamic:
        if getattr(src, "type", "") == "discovery":
            continue  # already ran above
        if fast and getattr(src, "type", "") not in _fast_types:
            continue  # cold-start: skip the slow scraping/ICS/CKAN sources
        row = session.exec(select(SourceRow).where(SourceRow.name == src.name)).first()
        if row is None:
            row = SourceRow(type=src.type, name=src.name, city=city,
                            base_url=getattr(src, "base_url", ""), enabled=True)
            session.add(row)
            session.commit()
            session.refresh(row)
        try:
            payloads = src.fetch(city, window_days, lat, lng)
        except Exception:
            payloads = []  # ELT: a dead source never breaks ingest
        payloads = payloads[: getattr(src, "max_results", 200)]  # per-source cap
        for p in payloads:
            session.add(
                RawEvent(source_id=row.id, raw_url=p.raw_url, raw_payload=p.payload, parse_status="pending")
            )
        row.last_crawled_at = utcnow()
        if not row.base_url:
            row.base_url = getattr(src, "base_url", "")
        session.add(row)
        counts[src.name] = len(payloads)
    session.commit()
    return counts


def _profile(session: Session, device_id: str = "me") -> UserProfile:
    """Get-or-create the profile for an anonymous device. Defaults to the shared
    'me' row (used by the pipeline's neutral base ranking and header-less calls)."""
    p = session.get(UserProfile, device_id)
    if p is None:
        p = UserProfile(
            id=device_id,
            interest_tags=["Live music", "Art", "Food", "Film", "Talks"],
            dealbreakers={"free_only": False, "max_distance_km": 25, "time_windows": []},
            boosts={"Live music": "Boost", "Talks": "Boost", "Clubs": "Mute"},
            long_tail_weight=0.6,
        )
        session.add(p)
        session.commit()
        session.refresh(p)
    return p


def cleanup(session: Session) -> dict[str, Any]:
    profile = _profile(session)
    raws = session.exec(select(RawEvent).where(RawEvent.parse_status == "pending")).all()

    geocoder = make_geocoder(session, settings.geocoder)

    candidates: list[dict[str, Any]] = []
    failed = 0
    for raw in raws:
        c = parse(raw.raw_payload)
        if c is not None:
            c = normalize(c)
        if c is None:
            raw.parse_status = "failed"
            session.add(raw)
            failed += 1
            continue
        c["url"] = c.get("url") or raw.raw_url  # carry the page URL (for outbound + enrich)
        c = geocode(c, geocoder)
        c["_source_id"] = raw.source_id
        candidates.append(c)
        raw.parse_status = "parsed"
        session.add(raw)

    survivors = merge_block(candidates)
    collapsed = len(candidates) - len(survivors)

    if settings.enable_image_enrich:
        enrich_images(survivors, session, budget=30)

    upserts = 0
    for c in survivors:
        c = rank(c, profile)
        key = dedup_key(c)
        existing = session.exec(select(Event).where(Event.dedup_key == key)).first()
        source_ids = list({c.get("_source_id", "")} - {""})
        if existing is None:
            session.add(
                Event(
                    title=c["title"], description=c["description"],
                    start_utc=c["start_utc"], end_utc=c.get("end_utc"), tz=c["tz"], date_label=c.get("date_label", ""),
                    venue_name=c["venue_name"], lat=c.get("lat"), lng=c.get("lng"), city=c["city"],
                    category=c["category"], price_min=c.get("price_min"), currency=c["currency"], is_free=c["is_free"],
                    url=c["url"], image_url=c["image_url"], image_pos=c["image_pos"], is_gem=c.get("gem", False),
                    is_synthetic=c.get("synthetic", False),
                    dedup_key=key, source_ids=source_ids, source_names=c.get("sources", []),
                    popularity_signal=c.get("popularity_signal", 0.0),
                    relevance_score=c["relevance_score"], relevance_reasons=c["relevance_reasons"],
                    status="active",
                )
            )
        else:
            # Merge a re-sighting: union sources, keep the RICHEST data — never
            # overwrite a known value with an absent/worse one.
            existing.last_seen_at = datetime.now(timezone.utc)
            existing.source_names = list(dict.fromkeys([*existing.source_names, *c.get("sources", [])]))
            existing.source_ids = list(dict.fromkeys([*existing.source_ids, *source_ids]))
            existing.relevance_score = c["relevance_score"]
            existing.relevance_reasons = c["relevance_reasons"]
            # price: keep the lower known price; don't null a known price
            new_price = c.get("price_min")
            if new_price is not None and (existing.price_min is None or new_price < existing.price_min):
                existing.price_min = new_price
            existing.is_free = existing.is_free and c["is_free"]  # free only if all agree
            # richer text/image win; better start/label fill gaps
            if len(c.get("description") or "") > len(existing.description or ""):
                existing.description = c["description"]
            if not existing.image_url and c.get("image_url"):
                existing.image_url = c["image_url"]
            if not existing.date_label and c.get("date_label"):
                existing.date_label = c["date_label"]
            existing.status = "active"
            session.add(existing)
        upserts += 1

    # Staging is transient: drop the raw rows we just processed so raw_events
    # doesn't grow unbounded across refreshes (Event keeps the canonical record).
    for raw in raws:
        session.delete(raw)

    expired = expire_past(session)

    # persist last-run counters for /admin/health
    gstats = geocoder.stats if geocoder is not None else {"cache_hits": 0, "network": 0, "fallbacks": 0}
    stat = session.get(RunStat, "last") or RunStat(id="last")
    stat.parsed, stat.failed, stat.deduped, stat.upserts, stat.expired = (
        len(candidates), failed, collapsed, upserts, expired,
    )
    stat.geocode_cache_hits = gstats.get("cache_hits", 0)
    stat.geocode_network = gstats.get("network", 0)
    stat.geocode_fallbacks = gstats.get("fallbacks", 0)
    stat.ts = datetime.now(timezone.utc)
    session.add(stat)

    session.commit()
    return {"parsed": len(candidates), "failed": failed, "deduped": collapsed, "upserts": upserts, "expired": expired}


def refresh_city(
    session: Session, city: str, lat: float | None = None, lng: float | None = None, country: str = ""
) -> dict[str, Any]:
    ingested = ingest(session, city, lat=lat, lng=lng, country=country)
    stats = cleanup(session)
    stats["ingested"] = ingested
    return stats
