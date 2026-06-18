# Pulse — Design System

**Pulse** is a personal, cross-platform **event radar**. It aggregates *everything*
happening in whatever city you're in — big concerts down to a library talk or a
warehouse show — into **one ranked feed built for you**. It is explicitly
**anti-walled-garden**: where every other app (Eventbrite, DICE, Fever, Luma) only
shows events hosted on *its own* platform, Pulse shows all of them in one place and
sends you *out* to the source to attend.

Scope is **discovery + personalization only** — no ticketing, no RSVP, no social,
no hosting. The core design problem: a city has thousands of events; the product's
whole job is to make that feel like a **short, personal, trustworthy list**. So the
guiding feeling for every screen is: *"this app already knows what I'd like, and it
shows me why."*

> **Design pillars** — Rank, don't filter · Transparency = trust · Long-tail is a
> feature · Vibe-first · Calm under cold-start.

---

## Sources & provenance

This system was built **from a written brief**, not from an existing codebase or
Figma file. There is no upstream repo or design link to inherit from — Pulse is a
new brand defined here.

- **Visual direction:** a **1920s press / magazine** identity shipped as two
  switchable editions — *Morning Edition* (`[data-theme="light"]`, default,
  newsprint + ink) and *Night Edition* (`[data-theme="dark"]`, press-black + bone).
- **Accent:** near-monochrome — ink/bone primary, with a single restrained
  **press-red spot** (`--spot`; brass at night) for flourishes (relevance, rules,
  "Extra!" moments). Period devices: Didone mastheads, condensed-caps departments,
  hairline/double rules, drop caps, halftone + line-map textures.
- **Imagery:** tasteful **duotone + line-map placeholders** (no real photos), per
  the brief. Swap `.img-duotone` blocks / `event.imageStyle` for real images later.

### ⚠️ Font substitutions (please confirm)
No brand font files were provided, so these **Google Fonts** stand in. Flagging so
you can replace them with licensed files if you have specific faces in mind:

| Role | Substitute | Why |
|------|-----------|-----|
| Masthead / display | **Bodoni Moda** | Didone — the jazz-age magazine serif |
| Body / reading | **EB Garamond** | Classic editorial book serif |
| Kickers / deco (`--font-condensed`) | **Oswald** | Condensed gothic — newspaper departments, deco buttons, filter tabs |
| Wire / metadata | **JetBrains Mono** | Teletype voice for sources & timestamps |

To self-host, replace the `@import` in `tokens/fonts.css` with `@font-face` rules
pointing at your files; the `--font-display / --font-sans / --font-condensed /
--font-mono` tokens do the rest.

---

## Content fundamentals

**Voice — a knowing local, not a hype machine.** Pulse talks like a friend who
knows the city and respects your time. Confident, dry, a little editorial. It never
shouts, never uses growth-hack urgency ("Don't miss out!"), never fake scarcity.

- **Person:** second person — *"What are you into?"*, *"For you, tonight"*,
  *"3 new shows you'll probably want."* "We" appears only when describing what the
  product does to earn trust: *"We rank — we don't pre-filter."*
- **Case:** Titles are **sentence case** (`Warehouse jazz, after hours`,
  `A short history of the city's bridges`). Mono labels/overlines are **UPPERCASE**
  with tracking (`STEP 1 OF 3 · INTERESTS`, `ADDED 2H AGO`). Never Title Case.
- **Transparency phrases are part of the voice:** *"via Resident Advisor"*,
  *"also on DICE"*, *"added 2h ago"*, *"rarely listed"*. These aren't UI chrome —
  they're how Pulse earns credibility, so they read like plain English.
- **Relevance is always explained.** Cards say *"Matches: live music · under $15"* —
  short, lowercase reasons joined by `·`. Never a bare score with no reason.
- **Numerals stay concrete and small.** Prices as `$12` / `Free`, distance as
  `0.4mi`, counts as `412 events`. No vanity metrics, no slop stats.
- **Empty/quiet states are honest and kind:** *"A quiet week in Reykjavík — only a
  few events match right now. We'll ping you the moment more drop."* Calm, never
  apologetic-grovelling, always offering a next step.
- **No emoji.** The mono labels and the line-map motif carry personality instead.
- **Microcopy examples:** primary action `Get tickets · Resident Advisor`,
  dismiss is soft (`Not interested`), digest header `5 things you'll probably want`.

---

## Visual foundations

**Overall:** a 1920s press / culture-magazine feel that happens to be a fast tool.
Newsprint-and-ink (Morning Edition) or press-black-and-bone (Night Edition), big
Didone mastheads, condensed-caps departments, a reading serif, and rules + halftone
+ a faint **line-map texture** tying it together.

- **Color:** strictly neutral ramps per theme (see the Colors cards). The only
  "accent" is `--accent` = ink-on-paper inverted (a solid black pill on cream, a
  solid bone pill on black). Status colors (`--ok/--warn/--error`) carry the bare
  minimum chroma and are for **feedback only**, never content.
- **Type:** Bodoni Moda display/masthead (tight tracking `-0.02em`, lh 1.04),
  EB Garamond body (lh 1.5, drop caps on leads), Oswald `--font-condensed` for
  kickers/tags/buttons/filters (UPPERCASE, tracked), JetBrains Mono for wire
  metadata & sources. Display is for titles & numerals only — never body.
- **Press devices:** hairline & 3px double rules (`.rule`, `.rule-double`),
  department `.kicker` (condensed caps flanked by rules), `.dropcap` leads,
  `.halftone` dot field, and the press-red `--spot` second ink (relevance,
  "Extra", error). Buttons are condensed-caps deco pills.
- **The line-map motif** is the signature. A tiling topographic/street-grid SVG
  (`assets/line-map.svg` + `-dark`). Two uses: `.map-overlay` lays it faintly over
  a surface (multiply on light, screen on dark); `.img-duotone` builds every event
  "photo" as a dark duotone gradient with the map blended in via `soft-light`. Map
  panels and the event-detail "Where" block reuse it as real maps.
- **Backgrounds:** flat warm cream / near-black. **No gradients** as decoration
  (the only gradients are inside duotone image blocks). No blobs, no mesh.
- **Cards:** hairline first. `--surface-card` + `1px solid var(--border)` +
  `--radius-lg` (12px) + a restrained `--shadow-2`. Hover lifts `translateY(-2px)`
  to `--shadow-3`. The **Hidden gems** treatment inverts a card to the ink surface
  (`Card inverse` / `event.gem`) — a strong editorial signal for long-tail finds.
- **Corner radii:** restrained — chips/buttons are pills, cards 12px, fields 8px,
  tags 5px. Nothing is over-rounded.
- **Elevation:** prefer borders to shadows. Shadows only for lifts, popovers, the
  location sheet (`--shadow-4`), and the device frame.
- **Motion:** quick and unfussy. `--dur-1` 110ms taps, `--dur-2` 200ms hovers,
  `--dur-3` 320ms cards, `--dur-4` 560ms reveals. Default easing `--ease-out`;
  `--ease-spring` only for the switch knob and small toggles. Press states **scale
  down** (buttons `0.97`, icon buttons `0.92`). The onboarding "building your feed"
  mark beats gently; the cold-start status dot blinks. All looping/entrance motion
  respects `prefers-reduced-motion`.
- **Hover / press:** hover = subtle surface tint (`--surface-raised`) or border
  darken; press = scale-down. No color-shift gimmicks.
- **Overlays on imagery:** glassy capsules — `color-mix(black 42–45%)` +
  `backdrop-filter: blur` + a hairline white border — for category, price,
  freshness, and save/dismiss sitting on a photo.
- **Transparency & blur:** sticky filter bar and bottom nav use a translucent
  surface + `blur(--blur-md)`. Used sparingly, only for floating chrome.
- **Imagery vibe:** monochrome, moody, high-contrast — duotone darks with the map
  woven through. Warm-leaning in light theme, cool near-black in dark.

---

## UX baseline

Interaction patterns follow a UX checklist (adapted from the open
*ui-ux-pro-max-skill* guidelines, github.com/nextlevelbuilder/ui-ux-pro-max-skill).
Baked into the system so every screen inherits them:

- **Touch:** ≥44px primary hit targets (Button md, IconButton md), ≥40px chips,
  `touch-action: manipulation` (no 300ms tap delay), `gap`-based spacing.
- **Motion:** global `prefers-reduced-motion` guard neutralizes transitions &
  loops; `scroll-behavior: smooth`; press = `scale` feedback; durations 110–320ms.
- **Feedback:** `Button loading` (spinner + blocked input, prevents double-submit),
  skeletons for waits, toasts for confirmations, full empty/cold-start/quiet/error
  states. `EmptyState glyph="error"` carries `role="alert"`.
- **A11y:** visible `:focus-visible` rings on all interactives, `aria-label` on
  icon-only buttons & search, labelled inputs, relevance encoded by colour **and**
  icon **and** text (never colour alone), sequential headings.
- **Navigation:** active-state indication, deep links (`?screen=`/`?event=`) +
  persistence, predictable back.
- **Content:** ranked titles `line-clamp` to 2 lines; relative dates ("added 2h
  ago"); search has live results, a no-results state, and skip-able onboarding.

---

## Iconography

- **System:** **Lucide** geometry (ISC license) — 24px grid, **1.75 stroke**,
  round caps/joins. The brand mark uses the same stroke language so icons and logo
  feel of a piece. This is a **substitution** (no icon set was supplied) — swap for
  your licensed set if you have one; keep the 1.75 line weight.
- **Where they live:** the UI kit ships an inline, React-friendly set redrawn to
  Lucide geometry in `ui_kits/pulse/icons.jsx` (`window.PulseIcons`) — Pin, Search,
  Home, Bookmark, Bell, User, Sliders, Filter, Calendar, Clock, Share, chevrons,
  Star, Sparkles, ExternalLink, Music, Film, Utensils, Mic, Ticket, etc. For HTML
  artifacts you can also pull Lucide from CDN.
- **No emoji, no unicode-as-icon.** Line icons only.
- **Custom marks:** the only bespoke glyphs are the **Pulse mark** (map-pin + radar
  pulse, `assets/pulse-mark*.svg`, `currentColor`) and the **line-map** texture.
  Don't hand-draw new illustrative SVGs — reuse these or the Lucide set.

---

## Index / manifest

**Root**
- `styles.css` — global entry (imports only; consumers link this one file)
- `base.css` — reset + brand-motif utilities (`.map-overlay`, `.img-duotone`, `.u-*`)
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`
- `assets/` — `line-map.svg` / `-dark`, `pulse-mark.svg` (+ ink/bone fills)
- `readme.md` (this file) · `SKILL.md`

**Components** (`components/<group>/` — `.jsx` + `.d.ts` + `.prompt.md` + a `@dsCard`)
- `core/` — Logo, Button, IconButton, Tag, Badge, Card, Avatar
- `forms/` — Input, Select, Switch, Checkbox, SegmentedControl, DatePicker
- `feedback/` — Toast, Skeleton (+ EventCardSkeleton), EmptyState
- `navigation/` — FilterChip, FilterBar, SearchBar, BottomNav, SidebarNav
- `events/` — **EventCard**, RelevanceChip, SourceBadge, PriceTag, SaveDismiss,
  MapPin, DigestItem, LocationSwitcher

**Foundation cards** (`guidelines/`) — Colors (Morning, Night, semantic, status,
spot ink), Type (display, body, condensed kickers, wire), Spacing (scale, radius,
elevation), Brand (logo, line-map motif).

**UI kit** (`ui_kits/pulse/`) — interactive recreation of the product.
`index.html` boots an app with a toolbar to switch **viewport** (mobile / desktop)
and **edition** (Morning / Night) and jump between screens: **Sign-in**,
**Onboarding** (3-step taste setup → "building your feed"), **Feed** (ranked, sticky
filter chips, Hidden-gems rail, desktop 3-zone with map panel), **Event detail**
(sources + dedup outbound, map, more-like-this), **Search** (text + **date search**
with quick chips and a calendar popover), **Preferences / For me** (interests,
dealbreakers vs boost/mute), **Digest** (daily/weekly + notifications), **Saved**
(.ics export), **Account** (profile, plan/upgrade, settings, sign out), and
**States** (cold-start, quiet city, empty, error, toast). Screens deep-link via
`?screen=`/`?event=` and persist to localStorage. Factored across `app.jsx`,
`shell.jsx`, `screens-feed.jsx`, `screens-detail.jsx`, `screens-more.jsx`,
`screens-user.jsx`, with `data.js` (sample content) and `icons.jsx`.
`pulse-bundle.js` is a self-contained build of the components so the kit runs
offline; the canonical build is the compiler's `_ds_bundle.js`. A root `index.html`
hub links every page.

**Templates** (`templates/<slug>/`) — `feed/` (Event feed) is a copy-ready starting
screen composed from the real components via `ds-base.js` + `_ds_bundle.js`.

**Starting points / templates:** consuming projects start from the **Event feed**
template (`templates/feed/`); component-level starting-point tags were retired in
favor of templates.
