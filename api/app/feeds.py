"""The per-city SOURCE REGISTRY. Each entry is a `SourceDef` describing a public
source bound to a real place (an event calendar/dataset/page belongs to a city).
`registered_sources()` = curated defaults + env overrides + rows discovered at
runtime and persisted to the `sources` DB table. The adapters in
`active_sources()` are built from these defs by `type`.

Seeded GTA-deep (Toronto/Mississauga/Ontario) + a global example; the
DiscoverySource fills in any other city automatically."""
from __future__ import annotations

import re
import unicodedata
from dataclasses import dataclass, field
from typing import Any, Optional

from .config import settings


@dataclass
class SourceDef:
    type: str  # feed_ics | ckan | localist | jsonld | feed_rss
    name: str
    city: str
    lat: float = 0.0
    lng: float = 0.0
    country: str = ""
    base_url: str = ""  # .ics URL / page URL / API base / feed-file URL
    resource_id: str = ""  # CKAN datastore resource id
    kind: str = ""  # ckan: dated|directory|json_feed · jsonld: single|listing
    field_map: dict[str, Any] = field(default_factory=dict)
    popularity: Optional[float] = None
    category: str = ""  # category hint for listing feeds whose events lack a specific type


# Back-compat shim: some code refers to FeedDef (ICS-only).
FeedDef = SourceDef


# Eventbrite exposes a JSON-LD listing page per event category (their public
# search API was retired in 2020). Fanning out across categories gives broad,
# all-types coverage per city — and the category slug is a reliable hint when an
# event's own schema.org @type is the generic "Event". (slug, category-hint):
EVENTBRITE_CATEGORIES: list[tuple[str, str]] = [
    ("all-events", ""),                  # catch-all (uses each event's own type)
    ("music", "Live music"),
    ("food-and-drink", "Food"),
    ("arts", "Art"),
    ("film-and-media", "Film"),
    ("family-education", "Family/Kids"),
    ("sports-and-fitness", "Sports"),
    ("community", "Community"),
    ("charity-and-causes", "Civic"),
    ("travel-and-outdoor", "Outdoors"),
    ("festivals", "Festival"),
    ("business", "Meetup"),
]


def _slug(s: str) -> str:
    """Eventbrite URL slug: ascii-fold, lowercase, non-alnum → single hyphen."""
    s = unicodedata.normalize("NFKD", s or "").encode("ascii", "ignore").decode()
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", s.lower())).strip("-")


# Normalize the many country spellings (seed short-forms + reverse-geocoder
# long-forms) to the slug Eventbrite uses in its /d/<country>--<city>/ URLs.
_COUNTRY_ALIAS = {
    "usa": "united-states", "us": "united-states", "u.s.": "united-states",
    "u.s.a.": "united-states", "united states of america": "united-states",
    "united states": "united-states",
    "uk": "united-kingdom", "u.k.": "united-kingdom",
    "great britain": "united-kingdom", "england": "united-kingdom",
}


def eventbrite_feeds_for_city(city: str, country: str, lat: float = 0.0, lng: float = 0.0) -> list[SourceDef]:
    """All-types Eventbrite listing feeds for ANY city, built from its name +
    country at refresh time. Eventbrite's global /d/<country>--<city>/<cat>/ pages
    each carry schema.org/Event JSON-LD. A wrong slug just yields 0 (graceful)."""
    cslug, ctyslug = _slug(city), _COUNTRY_ALIAS.get((country or "").lower().strip(), _slug(country))
    if not cslug or not ctyslug:
        return []
    place = f"{ctyslug}--{cslug}"
    return [
        SourceDef(
            type="jsonld", kind="listing",
            name=f"Eventbrite {cat or 'all'} ({city})", city=city,
            lat=lat, lng=lng, country=country,
            base_url=f"https://www.eventbrite.com/d/{place}/{slug}/",
            popularity=0.5, category=cat,
        )
        for slug, cat in EVENTBRITE_CATEGORIES
    ]


CURATED: list[SourceDef] = [
    # --- Global example (verified working .ics, LiveWhale) -----------------
    # Non-Eventbrite curated feeds live here. All-types Eventbrite coverage is
    # generated dynamically per refreshed city — see eventbrite_feeds_for_city().
    SourceDef(
        type="feed_ics", name="UC Berkeley", city="Berkeley",
        lat=37.8719, lng=-122.2585, country="USA",
        base_url="https://events.berkeley.edu/live/ical/events", popularity=0.4,
    ),
]


def _parse_env_def(entry: str) -> Optional[SourceDef]:
    # "type|name|city|lat|lng|base_url|resource_id"
    p = [x.strip() for x in entry.split("|")]
    if len(p) < 3:
        return None
    return SourceDef(
        type=p[0], name=p[1], city=p[2],
        lat=float(p[3]) if len(p) > 3 and p[3] else 0.0,
        lng=float(p[4]) if len(p) > 4 and p[4] else 0.0,
        base_url=p[5] if len(p) > 5 else "",
        resource_id=p[6] if len(p) > 6 else "",
    )


def registered_sources(session: Any = None) -> list[SourceDef]:
    """Curated + env (ICS_FEEDS legacy + SOURCE_DEFS) + DB-discovered rows."""
    out: list[SourceDef] = list(CURATED)

    # legacy ICS_FEEDS ("url|City|lat|lng")
    for entry in settings.ics_feed_list:
        p = [x.strip() for x in entry.split("|")]
        if not p or not p[0]:
            continue
        city = p[1] if len(p) > 1 else "Your area"
        out.append(
            SourceDef(
                type="feed_ics", name=f"ICS {city}", city=city,
                lat=float(p[2]) if len(p) > 2 and p[2] else 0.0,
                lng=float(p[3]) if len(p) > 3 and p[3] else 0.0,
                base_url=p[0], popularity=0.3,
            )
        )

    # generic SOURCE_DEFS
    for entry in settings.source_def_list:
        d = _parse_env_def(entry)
        if d:
            out.append(d)

    # rows discovered at runtime (persisted to the sources table)
    if session is not None:
        try:
            from sqlmodel import select

            from .models import Source as SourceRow
            from .pipeline.geocode import CENTROIDS

            for row in session.exec(select(SourceRow).where(SourceRow.enabled)).all():
                if row.type in ("feed_ics", "ckan", "localist", "jsonld", "feed_rss") and row.discovered_from:
                    clat, clng = CENTROIDS.get(row.city, (0.0, 0.0))
                    out.append(
                        SourceDef(
                            type=row.type, name=row.name, city=row.city,
                            lat=clat, lng=clng, base_url=row.base_url, popularity=0.3,
                        )
                    )
        except Exception:
            pass
    return out


# Back-compat: ICS-only view used by older call sites.
def feed_defs(session: Any = None) -> list[SourceDef]:
    return [d for d in registered_sources(session) if d.type == "feed_ics"]
