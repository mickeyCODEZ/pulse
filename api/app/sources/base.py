"""The common `Source` contract. Adapters return raw, unjudged payloads — they
never clean. Politeness (real User-Agent, per-domain rate limit, timeout,
backoff) is baked into the shared base so every adapter inherits it."""
from __future__ import annotations

import ipaddress
import socket
import time
import urllib.robotparser
from collections.abc import Callable
from dataclasses import dataclass, field
from typing import Any, ClassVar
from urllib.parse import urlsplit

import httpx

USER_AGENT = "PulseEventRadar/1.0 (+https://example.com/pulse; personal, non-commercial)"


def _host_is_public(host: str) -> bool:
    """All resolved IPs for `host` must be public (SSRF guard)."""
    try:
        infos = socket.getaddrinfo(host, None)
    except Exception:
        return False
    for info in infos:
        try:
            addr = ipaddress.ip_address(info[4][0])
        except ValueError:
            return False
        if (addr.is_private or addr.is_loopback or addr.is_link_local
                or addr.is_reserved or addr.is_multicast or addr.is_unspecified):
            return False
    return bool(infos)


def is_safe_url(url: str) -> bool:
    """Only fetch public http(s) URLs — blocks file://, localhost, 169.254.x,
    RFC-1918, etc. Defends the scrape/discovery/enrich fetchers against SSRF."""
    try:
        parts = urlsplit(url)
    except Exception:
        return False
    if parts.scheme not in ("http", "https") or not parts.hostname:
        return False
    return _host_is_public(parts.hostname)


@dataclass
class RawEventPayload:
    """What an adapter emits — a raw candidate, pre-cleanup."""
    raw_url: str
    payload: dict[str, Any] = field(default_factory=dict)


class Source:
    """Abstract contract: `fetch(city, window) -> list[RawEventPayload]`."""

    type: ClassVar[str] = "base"
    name: ClassVar[str] = "base"
    enabled: ClassVar[bool] = True

    # crude per-process, per-domain rate limiting
    _last_hit: ClassVar[dict[str, float]] = {}
    _robots: ClassVar[dict[str, Any]] = {}
    min_interval_s: ClassVar[float] = 1.0
    max_results: ClassVar[int] = 200  # per-source cap applied by ingest()

    def fetch(
        self, city: str, window_days: int = 30, lat: float | None = None, lng: float | None = None
    ) -> list[RawEventPayload]:
        raise NotImplementedError

    # ---- shared polite HTTP -------------------------------------------------
    def _throttle(self, host: str) -> None:
        last = Source._last_hit.get(host, 0.0)
        wait = self.min_interval_s - (time.monotonic() - last)
        if wait > 0:
            time.sleep(wait)
        Source._last_hit[host] = time.monotonic()

    def robots_allowed(self, url: str) -> bool:
        """Honor robots.txt before any HTML/JSON-LD scrape (cached per host).
        Missing/unreadable robots.txt → allowed (the polite default)."""
        if not is_safe_url(url):
            return False  # never even fetch robots for a non-public/odd-scheme URL
        u = httpx.URL(url)
        base = f"{u.scheme}://{u.host}"
        rp = Source._robots.get(base, "__missing__")
        if rp == "__missing__":
            rp = urllib.robotparser.RobotFileParser()
            try:
                self._throttle(u.host or base)
                r = httpx.get(base + "/robots.txt", timeout=8.0, headers={"User-Agent": USER_AGENT}, follow_redirects=True)
                if r.status_code == 200 and r.text:
                    rp.parse(r.text.splitlines())
                else:
                    rp = None
            except Exception:
                rp = None
            Source._robots[base] = rp
        if rp is None:
            return True
        try:
            return rp.can_fetch(USER_AGENT, url)
        except Exception:
            return True

    def get_json_failover(self, build_url: Callable[[str], str], keys: list[str]) -> dict | None:
        """Try each API key in turn (round-robin failover). A key that errors or
        is rate-limited (`get` returns None) is skipped; the first key that yields
        parseable JSON wins. Shared by all keyed sources so the key-pool behaviour
        is identical everywhere — add a key, get more quota + resilience."""
        for key in keys:
            resp = self.get(build_url(key))
            if resp is None:
                continue
            try:
                return resp.json()
            except Exception:
                continue
        return None

    def get(self, url: str, *, timeout: float = 10.0, retries: int = 2, max_redirects: int = 4) -> httpx.Response | None:
        """Polite, SSRF-guarded GET. Validates the URL (and every redirect hop)
        against `is_safe_url`, follows redirects manually with a cap, throttles
        once per attempt, and retries transient failures with backoff."""
        for attempt in range(retries + 1):
            try:
                cur = url
                for _ in range(max_redirects + 1):
                    if not is_safe_url(cur):
                        return None  # blocked scheme / private host (also each hop)
                    self._throttle(httpx.URL(cur).host or cur)
                    r = httpx.get(cur, timeout=timeout, headers={"User-Agent": USER_AGENT}, follow_redirects=False)
                    if r.is_redirect and r.headers.get("location"):
                        cur = str(httpx.URL(cur).join(r.headers["location"]))
                        continue
                    r.raise_for_status()
                    return r
                return None  # too many redirects
            except Exception:
                if attempt == retries:
                    return None
                time.sleep(0.5 * (2**attempt))  # exponential backoff
        return None
