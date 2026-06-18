"""Image enrich — fill a missing event image from the page's og:image / twitter:image.
Runs on dedupe survivors only, budget-capped, robots-checked, cached by URL. Off by
default (network) behind settings.enable_image_enrich."""
from __future__ import annotations

from typing import Any

from sqlmodel import Session

from ..models import MetaCache
from ..sources.base import Source

try:
    from selectolax.parser import HTMLParser
except Exception:  # pragma: no cover
    HTMLParser = None  # type: ignore


class _Fetcher(Source):
    type = "enrich"
    name = "enrich"
    min_interval_s = 1.5

    def fetch(self, *a, **k):  # not a real source
        return []


def _og_image(html: str) -> str:
    if HTMLParser is None:
        return ""
    try:
        tree = HTMLParser(html)
        for prop in ("og:image", "og:image:url", "twitter:image"):
            n = tree.css_first(f'meta[property="{prop}"]') or tree.css_first(f'meta[name="{prop}"]')
            if n and n.attributes.get("content"):
                return n.attributes["content"] or ""
    except Exception:
        pass
    return ""


def enrich_images(survivors: list[dict[str, Any]], session: Session, budget: int = 30) -> list[dict[str, Any]]:
    f = _Fetcher()
    for c in survivors:
        if budget <= 0:
            break
        if c.get("image_url") or not c.get("url"):
            continue
        url = c["url"]
        cached = session.get(MetaCache, url)
        if cached is not None:
            if cached.image_url:
                c["image_url"] = cached.image_url
            continue
        if not f.robots_allowed(url):
            continue
        budget -= 1
        img = ""
        resp = f.get(url, timeout=12.0)
        if resp is not None:
            img = _og_image(resp.text)
        session.add(MetaCache(url=url, image_url=img))
        if img:
            c["image_url"] = img
    return survivors
