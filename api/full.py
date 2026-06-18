"""Vercel entrypoint for the FULL stateful app (Postgres-backed, all civic/
scraping sources). Activate by: set DATABASE_URL to a Neon POOLED connection
string, point vercel.json's build at `full.py`, and use the full requirements
(`requirements-sources.txt`) so icalendar/extruct/selectolax/psycopg are present.
"""
from app.main import app  # noqa: F401  (Vercel serves this ASGI `app`)
