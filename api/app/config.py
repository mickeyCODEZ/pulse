"""Runtime configuration. Every setting has a working default so the app boots
with no .env file at all (zero-config SQLite, no token, free sources only)."""
from __future__ import annotations

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str = "sqlite:///./pulse.db"
    app_token: str = ""  # blank → single-user gate disabled (dev)
    cron_secret: str = ""  # if set, /cron/* requires Vercel's "Bearer <CRON_SECRET>" header
    event_retention_days: int = 30  # expired events older than this are pruned by the cron
    refresh_min_interval_s: int = 600  # min seconds between on-demand refreshes of a city
    search_min_interval_s: int = 600  # min seconds between deep-search scrapes of a city+query
    sentry_dsn: str = ""  # blank → Sentry disabled (local dev)
    ics_feeds: str = ""  # comma-separated public .ics URLs
    ticketmaster_api_key: str = ""
    seatgeek_client_id: str = ""  # free key at seatgeek.com/build
    serpapi_key: str = ""  # paid stub (google_events) — disabled unless set
    predicthq_token: str = ""  # paid stub — disabled unless set
    meetup_token: str = ""  # paid stub (GraphQL) — disabled unless set
    enable_llm_extraction: bool = False
    # extra registered sources beyond CURATED: JSON lines or
    # "type|name|city|lat|lng|base_url|resource_id", comma-separated
    source_defs: str = ""
    # geocoding backend: "centroid" (default, offline) | "nominatim" (real, cached, 1 req/s)
    geocoder: str = "centroid"
    enable_image_enrich: bool = False  # og:image enrich stage (network; off by default)
    frontend_origin: str = "http://localhost:5173"

    @staticmethod
    def _csv(value: str) -> list[str]:
        return [v.strip() for v in value.split(",") if v.strip()]

    @property
    def ics_feed_list(self) -> list[str]:
        return self._csv(self.ics_feeds)

    @property
    def ticketmaster_keys(self) -> list[str]:
        """Ticketmaster keys (comma-separated) — tried in order with failover, so
        multiple keys multiply the daily quota and add resilience."""
        return self._csv(self.ticketmaster_api_key)

    @property
    def seatgeek_keys(self) -> list[str]:
        """SeatGeek client_id(s), same failover semantics."""
        return self._csv(self.seatgeek_client_id)

    @property
    def serpapi_keys(self) -> list[str]:
        return self._csv(self.serpapi_key)

    @property
    def predicthq_tokens(self) -> list[str]:
        return self._csv(self.predicthq_token)

    @property
    def meetup_tokens(self) -> list[str]:
        return self._csv(self.meetup_token)

    @property
    def source_def_list(self) -> list[str]:
        return self._csv(self.source_defs)


settings = Settings()
