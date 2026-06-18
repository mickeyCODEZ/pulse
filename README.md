# Pulse — personal cross-platform event radar

Pulse aggregates *everything* happening in whatever city you're in — big concerts
down to a library talk or a warehouse show — into **one ranked feed built for you**.
It's explicitly anti-walled-garden: where every other app shows only events hosted on
*its own* platform, Pulse shows all of them in one place and sends you out to the
source to attend. Scope is **discovery + personalization only** — no ticketing, RSVP,
social, or hosting.

This repo is a **working full-stack implementation** of the Pulse design + build spec:

- **[`web/`](web/)** — React + Vite + TypeScript frontend, built pixel-faithfully
  from the Pulse design system (1920s-press identity, Morning + Night editions).
  Genuinely responsive: mobile single-column + bottom nav, desktop 3-zone shell
  (sidebar · feed · live map panel).
- **[`api/`](api/)** — FastAPI backend implementing the build spec's **ELT** slice:
  ingestion → `raw_events` staging → idempotent cleanup pipeline (parse → normalize →
  geocode → dedupe → rank → expire) → canonical `events` table → ranked API. SQLite,
  zero external services, no API keys required to run.

## Run it (two terminals)

**Backend** — `http://localhost:8000`

```bash
cd api
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

**Frontend** — `http://localhost:5173`

```bash
cd web
npm install
npm run dev
```

Open `http://localhost:5173`. The frontend probes the backend on load and renders the
**live, ranked feed**; if the backend isn't running it falls back to bundled sample
data so the design still renders. Saving an event, dismissing it, and switching cities
(which triggers on-demand ingest) all round-trip to the API.

## Location + data

- **Senses your location.** On load the app asks the browser for your position,
  reverse-geocodes it to a city (free, no-key BigDataCloud), and loads the ranked
  feed for where you actually are. There's also a **"Use my current location"**
  button in the city picker. Deny permission and it falls back to a default city.
- **Real event data.** Two real sources, both wired:
  - **Public `.ics` feeds** — no signup. A verified UC Berkeley calendar ships by
    default (`api/app/feeds.py`); switch the city to **Berkeley** to see ~40 genuine
    upcoming events. Add your own as `ICS_FEEDS=url|City|lat|lng` in `api/.env`.
  - **Ticketmaster** — real events *anywhere* by geo-point. Add a free key
    (`TICKETMASTER_API_KEY` in `api/.env`, ~1-min signup at
    [developer.ticketmaster.com](https://developer-acct.ticketmaster.com)) and real
    events flow for your location.
  - When a real source has events for a city, the built-in demo seed automatically
    steps aside — so genuine data always wins, but the feed is never empty.

## How it works end to end

1. On boot the API runs ingest+cleanup for Lisbon (demo seed) and Berkeley (real
   `.ics`), so `/feed` has data immediately.
2. The cleanup pipeline ranks events tag-match vs the user profile, applies a
   `long_tail_weight` so niche "hidden gems" surface above popularity-ranked
   incumbents, and computes the card's relevance reasons + dedup ("also on…").
3. The React app fetches `/feed`, renders the ranked cards with the live relevance
   score, distance (haversine from your real position), and freshness; the desktop
   map panel plots price/gem pins.
4. Switching city — or sensing your location — calls `POST /cities/{city}/refresh`
   with coordinates → ingest + cleanup for that place → reloaded feed (the "travel
   anywhere" cold-start).

See [`api/README.md`](api/README.md) and [`web/README.md`](web/README.md) for detail,
and the design provenance in [`design_bundle/`](design_bundle/) (the Claude Design
handoff this was built from).

## What's intentionally deferred

Per the build spec's milestones: this is M0 + M1 (the working end-to-end vertical
slice) plus the personalization and search of M2–M3. Embedding-based ranking
(pgvector), the always-on scheduler, and web push (M4) are stubbed behind interfaces
— swap `DATABASE_URL` to Postgres and add the source keys to grow into them without a
refactor.
