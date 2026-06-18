"""Seed the cities table (the location switcher's list). Idempotent."""
from __future__ import annotations

from sqlmodel import Session

from .models import City

# (name, country, lat, lng). Real event counts fill in on the first refresh/cron;
# seeded at 0 so the picker never shows a fabricated number.
_CITIES = [
    ("Lisbon", "Portugal", 38.7223, -9.1393),
    ("Berlin", "Germany", 52.52, 13.405),
    ("Porto", "Portugal", 41.1579, -8.6291),
    ("Mexico City", "Mexico", 19.4326, -99.1332),
    ("Berkeley", "USA", 37.8719, -122.2585),
    # --- GTA (Greater Toronto Area) ---
    ("Toronto", "Canada", 43.6532, -79.3832),
    ("Mississauga", "Canada", 43.589, -79.6441),
    ("Brampton", "Canada", 43.7315, -79.7624),
    ("Hamilton", "Canada", 43.2557, -79.8711),
    ("Markham", "Canada", 43.8561, -79.337),
    ("Vaughan", "Canada", 43.8361, -79.4983),
    ("Oakville", "Canada", 43.4675, -79.6877),
    ("Richmond Hill", "Canada", 43.8828, -79.4403),
    ("Burlington", "Canada", 43.3255, -79.799),
    # --- Eastern US ---
    ("New York", "USA", 40.7128, -74.006),
    ("Brooklyn", "USA", 40.6782, -73.9442),
    ("Newark", "USA", 40.7357, -74.1724),
    ("Jersey City", "USA", 40.7178, -74.0431),
    ("Boston", "USA", 42.3601, -71.0589),
    ("Philadelphia", "USA", 39.9526, -75.1652),
    ("Washington", "USA", 38.9072, -77.0369),
    ("Atlanta", "USA", 33.749, -84.388),
    ("Miami", "USA", 25.7617, -80.1918),
    ("Baltimore", "USA", 39.2904, -76.6122),
]


def seed_cities(session: Session) -> None:
    for name, country, lat, lng in _CITIES:
        if session.get(City, name) is None:
            session.add(City(name=name, country=country, lat=lat, lng=lng, count=0, active=True))
    session.commit()
