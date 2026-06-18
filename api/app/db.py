"""Engine + session helpers. SQLite by default; the same code works against
Postgres by swapping DATABASE_URL."""
from __future__ import annotations

from collections.abc import Iterator

from sqlmodel import Session, SQLModel, create_engine

from .config import settings

_is_sqlite = settings.database_url.startswith("sqlite")
if _is_sqlite:
    engine = create_engine(settings.database_url, echo=False, connect_args={"check_same_thread": False})
else:
    # Postgres (e.g. Neon on Vercel). Small pool + pre-ping survives the serverless
    # cold-start / idle-connection churn; use Neon's POOLED connection string.
    engine = create_engine(
        settings.database_url, echo=False, pool_pre_ping=True, pool_size=3, max_overflow=2, pool_recycle=300,
    )


def init_db() -> None:
    # Import models so SQLModel.metadata is populated before create_all.
    from . import models  # noqa: F401

    SQLModel.metadata.create_all(engine)


def get_session() -> Iterator[Session]:
    with Session(engine) as session:
        yield session
