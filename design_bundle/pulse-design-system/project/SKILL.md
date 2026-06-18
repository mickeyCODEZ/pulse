---
name: pulse-design
description: Use this skill to generate well-branded interfaces and assets for Pulse — a personal cross-platform event-radar app (anti-walled-garden event discovery, "rank don't filter"). Contains essential design guidelines, colors, type, fonts, the line-map brand motif, assets, and a full React UI-kit component library for prototyping app screens.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

Pulse is **monochrome editorial** with two switchable themes (`[data-theme="light"]`
warm-cream-and-ink, `[data-theme="dark"]` near-black-and-bone), a high-contrast
serif display (Bodoni Moda), a clean grotesque body (Hanken Grotesk), mono labels
(JetBrains Mono), and a signature **line-map texture** (`.map-overlay`,
`.img-duotone`). The accent is monochrome — ink-on-paper inverted, never a hue.

**Foundations:** link `styles.css` (one file; it imports tokens + fonts + base
utilities). Use the CSS custom properties — `--surface-*`, `--text-*`, `--accent`,
`--font-display/sans/mono`, `--space-*`, `--radius-*`, `--shadow-*`, `--map-bg`.

**Components:** `components/<group>/<Name>.jsx` (React, styled via the CSS vars).
Key ones: `EventCard` (image-forward ranked card with relevance + source dedup +
save/dismiss, `event.gem` for the Hidden-gems treatment), `RelevanceChip`,
`SourceBadge`, `FilterBar`, `LocationSwitcher`, `BottomNav`/`SidebarNav`, plus core
(Button, Tag, Card…) and forms. Read each `.prompt.md` for usage.

**UI kit:** `ui_kits/pulse/index.html` is an interactive recreation (onboarding,
feed, detail, preferences, digest, saved, states) at mobile + desktop. Copy its
patterns rather than reinventing screens.

If creating visual artifacts (slides, mocks, throwaway prototypes), **copy assets
out** (`assets/line-map*.svg`, `assets/pulse-mark*.svg`) and produce static HTML the
user can view; for HTML you can load the components from `_ds_bundle.js` (read the
component cards in each directory for the exact mount pattern) or lift the inline
styles. If working on production code, copy assets and follow the rules here to
become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want
to build or design, ask a few questions, and act as an expert designer who outputs
HTML artifacts *or* production code, depending on the need. Honor the design
pillars: **rank don't filter · transparency = trust · long-tail is a feature ·
vibe-first · calm under cold-start.** No emoji; line icons only (Lucide, 1.75
stroke); explain relevance on every card.
