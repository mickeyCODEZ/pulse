"""Seed the cities table (the location switcher's list). Idempotent."""
from __future__ import annotations

from sqlmodel import Session

from .models import City

_CITIES = [
    ("Lisbon", "Portugal", 38.7223, -9.1393, 412),
    ("Berlin", "Germany", 52.52, 13.405, 1340),
    ("Porto", "Portugal", 41.1579, -8.6291, 188),
    ("Reykjavík", "Iceland", 64.1466, -21.9426, 23),
    ("New York", "USA", 40.7128, -74.006, 2980),
    ("Mexico City", "Mexico", 19.4326, -99.1332, 870),
    ("Berkeley", "USA", 37.8719, -122.2585, 0),  # has a real public .ics feed
]


def seed_cities(session: Session) -> None:
    for name, country, lat, lng, count in _CITIES:
        if session.get(City, name) is None:
            session.add(City(name=name, country=country, lat=lat, lng=lng, count=count, active=True))
    session.commit()
