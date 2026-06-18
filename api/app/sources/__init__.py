"""Source registry → adapters.

Geo-radius sources (Ticketmaster, SeatGeek, + paid stubs) query by lat/lng and
self-gate on `.enabled`. City-bound sources (ICS, CKAN, Localist, JSON-LD, RSS)
are built from the per-city `SourceDef` registry (curated + env + DB-discovered).
`DiscoverySource` registers new city-bound rows. `SeedSource` is the last-resort
synthetic fallback, hidden by `/feed` whenever a city has real events."""
from __future__ import annotations

from typing import Any, Optional

from .base import RawEventPayload, Source
from .ckan import CkanSource
from .ical import ICalFeedSource
from .localist import LocalistSource
from .seatgeek import SeatGeekSource
from .seed import SeedSource
from .ticketmaster import TicketmasterSource


def _build_city_adapter(d) -> Optional[Source]:
    """Construct a city-bound adapter from a SourceDef; None for unknown/Phase-2 types."""
    pop = d.popularity
    if d.type == "feed_ics":
        return ICalFeedSource(d.base_url, d.name, d.city, d.lat, d.lng, pop if pop is not None else 0.4)
    if d.type == "ckan":
        cat = "Farmers market" if d.kind == "directory" else "Festival"
        return CkanSource(d.name, d.city, d.lat, d.lng, d.base_url, d.resource_id,
                          d.kind or "json_feed", d.field_map, pop if pop is not None else 0.25, cat)
    if d.type == "localist":
        return LocalistSource(d.name, d.city, d.lat, d.lng, d.base_url, pop if pop is not None else 0.4)
    # Phase-2 types (jsonld, feed_rss) + discovery are added by _phase2_adapters().
    return _phase2_city_adapter(d)


def _phase2_city_adapter(d) -> Optional[Source]:
    """JSON-LD / RSS adapters — present once Phase 2 modules exist; else skipped."""
    try:
        if d.type == "jsonld":
            from .jsonld import JsonLdSource

            return JsonLdSource(d.name, d.city, d.lat, d.lng, d.base_url, d.kind or "single",
                                d.popularity if d.popularity is not None else 0.35,
                                getattr(d, "category", "") or "")
    except Exception:
        return None
    return None


def _geo_and_paid() -> list[Source]:
    out: list[Source] = [TicketmasterSource(), SeatGeekSource()]
    for mod, cls in (("serpapi", "SerpApiEventsSource"), ("predicthq", "PredictHQSource"), ("meetup", "MeetupSource")):
        try:
            out.append(getattr(__import__(f"app.sources.{mod}", fromlist=[cls]), cls)())
        except Exception:
            pass
    return out


def active_sources(session: Any = None) -> list[Source]:
    from ..feeds import registered_sources

    sources: list[Source] = list(_geo_and_paid())
    for d in registered_sources(session):
        a = _build_city_adapter(d)
        if a is not None:
            sources.append(a)

    # DiscoverySource (registrar) — present once Phase 2 exists.
    try:
        from .discovery import DiscoverySource

        sources.append(DiscoverySource())
    except Exception:
        pass

    # NOTE: SeedSource (synthetic demo fallback) intentionally NOT registered —
    # the feed is real-events-only, defaulting off the user's location. A city
    # with no real data shows the empty state, not fabricated events.
    return [s for s in sources if getattr(s, "enabled", True)]


__all__ = [
    "Source", "RawEventPayload", "SeedSource", "ICalFeedSource", "CkanSource",
    "LocalistSource", "TicketmasterSource", "SeatGeekSource", "active_sources",
]
