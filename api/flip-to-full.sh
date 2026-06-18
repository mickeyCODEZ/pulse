#!/usr/bin/env bash
# Flip the Vercel `pulse-api` backend from the stateless live-Ticketmaster app to
# the FULL Postgres-backed app (durable saved/profile + civic/festival scraping).
#
# Prereqs (your inputs):
#   1) Neon Postgres connected to the pulse-api project so DATABASE_URL is set
#      (Vercel dashboard → pulse-api → Storage/Integrations → Neon), OR
#      `vercel env add DATABASE_URL production` with a Neon POOLED connection string.
#   2) (optional) `vercel env add SEATGEEK_CLIENT_ID production`.
#
# Then run this from the api/ directory:  bash flip-to-full.sh
set -euo pipefail
cd "$(dirname "$0")"

echo "→ using full requirements (psycopg + icalendar + extruct + selectolax)"
cp requirements-vercel-full.txt requirements.txt

echo "→ pointing the Vercel build at full.py (app/main.py)"
python3 - <<'PY'
import json, pathlib
p = pathlib.Path("vercel.json")
cfg = json.loads(p.read_text())
for b in cfg.get("builds", []):
    if b.get("src", "").endswith("index.py"):
        b["src"] = "full.py"
for r in cfg.get("routes", []):
    if r.get("dest", "").endswith("index.py"):
        r["dest"] = "full.py"
p.write_text(json.dumps(cfg, indent=2) + "\n")
print(p.read_text())
PY

echo "→ deploying full app to production"
vercel deploy --prod --yes
echo "✓ done. Verify: curl \$BACKEND/health  and  /admin/health"
