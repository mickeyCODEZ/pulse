"""Fixture tests for the fragile pipeline stages (parse, normalize, dedupe, rank).
Runs with plain asserts — `python -m tests.test_pipeline` from the api/ dir, no
pytest required."""
from __future__ import annotations

from datetime import datetime, timezone

from app.pipeline.dedupe import dedup_key, merge_block
from app.pipeline.normalize import _canonical_category, normalize
from app.pipeline.parse import parse
from app.pipeline.rank import rank
from app.sources.recurrence import synthesize
from app.sources.jsonld import _category as ld_category, _offers as ld_offers


class _Profile:
    interest_tags = ["Live music", "Talks"]
    boosts = {"Live music": "Boost", "Comedy": "Mute"}
    long_tail_weight = 0.6


def test_parse_requires_title_and_start():
    assert parse({"title": "", "start_utc": "2026-06-20T21:00:00Z"}) is None
    assert parse({"title": "Show", "start_utc": None}) is None
    ok = parse({"title": "Show", "start_utc": "2026-06-20T21:00:00Z", "category": "music"})
    assert ok and ok["title"] == "Show"


def test_normalize_dates_category_price():
    c = parse({"title": "Gig", "start_utc": "2026-06-20T21:00:00Z", "category": "concert", "price_min": 0})
    c = normalize(c)
    assert c is not None
    assert c["start_utc"].tzinfo is not None  # tz-aware UTC
    assert c["category"] == "Live music"  # canonical mapping
    assert c["is_free"] is True and c["price_min"] is None  # price 0 → free


def test_dedupe_merges_cross_platform_duplicates():
    base = {
        "title": "Warehouse jazz, after hours", "start_utc": datetime(2026, 6, 20, 21, tzinfo=timezone.utc),
        "lat": 38.72, "lng": -9.14, "description": "short",
    }
    a = {**base, "sources": ["Resident Advisor"], "popularity_signal": 0.5}
    b = {**base, "title": "Warehouse jazz after hours!", "sources": ["DICE"], "description": "a longer richer blurb", "popularity_signal": 0.9}
    merged = merge_block([a, b])
    assert len(merged) == 1  # collapsed to one
    assert set(merged[0]["sources"]) == {"Resident Advisor", "DICE"}  # union → "also on"
    assert merged[0]["description"] == "a longer richer blurb"  # richest kept
    assert merged[0]["popularity_signal"] == 0.9


def test_dedup_key_is_stable_and_idempotent():
    c = {"title": "Risograph zine night", "start_utc": datetime(2026, 6, 18, 19, tzinfo=timezone.utc), "lat": 38.7, "lng": -9.1}
    assert dedup_key(c) == dedup_key(dict(c))  # same input → same key (rerunnable upsert)


def test_rank_long_tail_favors_niche():
    soon = datetime(2026, 12, 31, 20, tzinfo=timezone.utc)
    niche = rank({"category": "Live music", "is_free": True, "price_min": None, "gem": True, "start_utc": soon, "popularity_signal": 0.2}, _Profile())
    incumbent = rank({"category": "Live music", "is_free": False, "price_min": 80, "gem": False, "start_utc": soon, "popularity_signal": 0.95}, _Profile())
    assert niche["relevance_score"] > incumbent["relevance_score"]  # anti-incumbent inversion
    assert "live music" in niche["relevance_reasons"]


def test_community_category_mappings():
    cases = {
        "Streetsville Farmers Market": "Farmers market",
        "Carassauga Festival of Cultures": "Festival",
        "Canada Day Parade": "Parade",
        "Toddler Storytime": "Family/Kids",
        "Community Centre Open House": "Community",
        "Fall Fair & Midway": "Carnival/Fair",
        "Council Meeting": "Civic",
    }
    for raw, want in cases.items():
        assert _canonical_category(raw) == want, f"{raw} -> {_canonical_category(raw)} != {want}"


def test_recurrence_directory_in_season():
    now = datetime(2026, 6, 17, 12, 0, tzinfo=timezone.utc)  # a Wednesday
    starts, ongoing = synthesize("Saturdays, May–October, 8:00am–2:00pm", now, count=4)
    assert ongoing is None and len(starts) == 4
    assert all(d.weekday() == 5 for d in starts)  # all Saturdays
    assert all(5 <= d.month <= 10 for d in starts)  # in season


def test_recurrence_unparseable_is_ongoing():
    now = datetime(2026, 6, 17, 12, 0, tzinfo=timezone.utc)
    starts, ongoing = synthesize("whenever the weather is nice", now)
    assert ongoing == "Ongoing" and len(starts) == 1


def test_jsonld_offers_and_category():
    assert ld_offers({"offers": {"price": 0}}) == (None, True)
    assert ld_offers({"offers": {"price": "25"}}) == (25.0, False)
    assert ld_offers({}) == (None, False)  # no offers → price unknown, not free
    assert ld_category({"@type": "Festival"}) == "Festival"
    assert ld_category({"@type": ["ChildrensEvent"]}) == "Family/Kids"


def test_dedupe_geo_na_fallback_merges():
    base = {"start_utc": datetime(2026, 7, 4, 12, tzinfo=timezone.utc), "lat": None, "lng": None}
    a = {**base, "title": "Carassauga Festival of Cultures", "sources": ["City of Mississauga"], "description": "x"}
    b = {**base, "title": "Carassauga Festival of Cultures!", "sources": ["Carassauga"], "description": "longer"}
    merged = merge_block([a, b])
    assert len(merged) == 1
    assert set(merged[0]["sources"]) == {"City of Mississauga", "Carassauga"}


def test_ssrf_guard_blocks_private_and_bad_schemes():
    from app.sources.base import is_safe_url
    assert is_safe_url("https://www.eventbrite.ca/d/x") is True
    for bad in ["http://localhost/x", "http://127.0.0.1/x", "http://169.254.169.254/latest/meta-data/",
                "http://10.0.0.5/x", "file:///etc/passwd", "ftp://example.com/x", "http://[::1]/x"]:
        assert is_safe_url(bad) is False, bad


def _run():
    fns = [v for k, v in sorted(globals().items()) if k.startswith("test_")]
    for fn in fns:
        fn()
        print(f"  ✓ {fn.__name__}")
    print(f"\n{len(fns)} passed")


if __name__ == "__main__":
    _run()
