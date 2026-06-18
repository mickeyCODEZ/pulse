# Pulse — API (backend)

The FastAPI backend for **Pulse**, implementing the build spec's **ELT** vertical
slice (M0 + M1): *scrape wide, stage raw, clean after*. Ingestion casts a wide net
into a raw staging table; a separate, idempotent, rerunnable cleanup pipeline
validates → normalizes → geocodes → dedupes → ranks and promotes survivors into the
canonical `events` table the API reads.

Runs with **zero external services** — SQLite by default, no API keys required. A
deterministic `SeedSource` guarantees the feed is never empty, so the app works out
of the box; real sources slot in behind the same interface.

## Run

```bash
cd api
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

`http://localhost:8000/health` → `{"status":"ok","active_events":10,...}`
Interactive docs at `http://localhost:8000/docs`.

On startup the app creates tables, seeds the profile + cities, and runs one
ingest+cleanup pass so `/feed` returns ranked data immediately.

## Architecture (ELT)

```
sources/ (per-source adapters)        write raw, unjudged
      │
      ▼
raw_events  (JSONB-style staging, no constraints)
      │
      ▼
pipeline/ (ordered, idempotent, rerunnable):
   parse → normalize → geocode → dedupe → rank → expire
      │   upsert on dedup_key
      ▼
events  (canonical) ── read by the API
```

- **`app/sources/`** — the common `Source` interface (`fetch(city, window) ->
  list[RawEventPayload]`) with politeness (real User-Agent, per-domain rate limit,
  timeout, exponential backoff) baked into the base class.
  - `SeedSource` — always-on deterministic source (events with real upcoming dates).
  - `ICalFeedSource` — fetches public `.ics` feeds (set `ICS_FEEDS`).
  - `TicketmasterSource` — Discovery API; **disabled stub** until
    `TICKETMASTER_API_KEY` is set. (SerpApi / PredictHQ / LLM extraction follow the
    same disabled-stub pattern.)
- **`app/pipeline/`** — one file per stage (`parse`, `normalize`, `geocode`,
  `dedupe`, `rank`, `expire`) + `run.py` orchestrator. Every stage is idempotent and
  independently testable; the full pass reruns without creating duplicates (upsert
  on `dedup_key`). Ranking is v1: tag-match + soft boosts/mutes + recency +
  `long_tail_weight` to surface niche events (the anti-incumbent inversion).
  Hard dealbreakers (free-only, distance) are applied at query time — *rank, don't
  filter*.
- **`app/models.py`** — SQLModel tables (`sources`, `raw_events`, `events`,
  `user_profile`, `user_event_actions`, `cities`, `push_subscriptions`).

## API surface

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/health` | liveness + active-event count |
| GET | `/feed?city=&free=&near=&when=&cats=&q=` | ranked, paginated feed |
| GET | `/events/{id}` | one event (card shape) |
| POST | `/events/{id}/action` | `saved` \| `dismissed` \| `clicked` |
| GET | `/saved` | saved events |
| GET | `/digest` | top-5 high-relevance |
| GET/PUT | `/profile` | the single user's profile (re-ranks on PUT) |
| GET | `/cities` | location-switcher list |
| POST | `/cities/{city}/refresh` | on-demand ingest+cleanup (travel anywhere) |
| POST | `/push/subscribe` | web-push subscription (stub) |
| GET | `/admin/health` | observability: per-source crawl, parse-failure rate, dedupe |

Single-user: set `APP_TOKEN` to require an `X-Pulse-Token` header (blank = open dev
mode). Config is via env (`.env.example`); every setting has a working default.

## Make it production-grade later

Swap `DATABASE_URL` to Postgres + pgvector (no code change for the relational part);
move geocoding to cached Nominatim behind `pipeline/geocode.py`; enable the paid
source stubs by adding keys; add APScheduler for cadenced crawls + web push (M4).
