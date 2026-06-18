# Pulse — Web (frontend)

The **Pulse** web app: a personal cross-platform **event radar** that aggregates
everything happening in whatever city you're in into one ranked feed built for you.
This package is the React frontend, implemented pixel-faithfully from the **Pulse
Design System** (Claude Design handoff) — the *1920s press / culture-magazine*
identity with two switchable editions (Morning + Night).

> Scope here is the **design implementation**: the screens, the component library,
> and the design tokens. It runs on sample data (`src/data.ts`); wire it to the
> FastAPI `/feed`, `/events/{id}`, `/profile`, … endpoints from the build spec when
> the backend lands.

## Stack

- **React 18 + Vite + TypeScript**, no UI framework — components are self-contained
  and style themselves entirely through the design-system **CSS custom properties**.
- Genuinely responsive (mobile-first, excellent on desktop): a `useIsDesktop` hook
  switches between the **mobile single-column + bottom-nav** shell and the
  **desktop 3-zone** shell (sidebar · feed · map panel) at 1024px.
- Theme = `data-theme` on `<html>` (`light` = Morning Edition, `dark` = Night
  Edition). Route + theme persist to `localStorage` and deep-link via
  `?screen=`/`?event=`/`?theme=`.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build → dist/
npm run preview  # preview the production build
```

## Layout

```
web/
  public/assets/        line-map.svg / -dark, pulse-mark*.svg  (copied from the design system)
  src/
    styles/             styles.css (entry) → tokens/*.css + base.css + app.css
    icons.tsx           Lucide-geometry icon set (1.75 stroke), typed
    data.ts             sample events / cities / interests (+ PulseEvent type)
    hooks.ts            useIsDesktop, usePersistentState
    components/
      core/             Button, IconButton, Tag, Badge, Card, Avatar, Logo
      forms/            Input, Select, Switch, Checkbox, SegmentedControl, DatePicker
      feedback/         Toast, Skeleton (+ EventCardSkeleton), EmptyState
      navigation/       FilterChip, FilterBar, SearchBar, BottomNav, SidebarNav
      events/           EventCard, RelevanceChip, SourceBadge, PriceTag,
                        SaveDismiss, MapPin, DigestItem, LocationSwitcher
    shell/              Eyebrow, MapPanel (desktop right zone)
    screens/            Feed, Detail, Onboarding, Preferences, Digest, Saved,
                        Search, Account, SignIn, States, LocationPicker
    App.tsx             responsive shell + routing + state
    main.tsx            entry
```

## Screens implemented

Sign-in · Onboarding (3-step taste setup → "building your feed") · Feed (ranked,
sticky filter chips, **Hidden gems** rail, desktop map panel) · Event detail
(sources + dedup outbound, "Where" map, more-like-this) · Search (text + **date**
+ **location/distance**, calendar popover) · Preferences / "For me" (interests,
dealbreakers vs boost/mute) · Digest + notifications · Saved (.ics export) ·
Account (profile, Pulse+ upgrade, theme, sign out) · States gallery (cold-start,
quiet city, empty, error, toast) · Location switcher with progressive cold-start.

## Design provenance

Tokens, motif, and components are a faithful port of the **Pulse Design System**
handoff bundle. Fonts are Google Fonts substitutes (Bodoni Moda · EB Garamond ·
Oswald · JetBrains Mono) — swap `tokens/fonts.css` for licensed faces if you have
them. The line-map texture and Pulse mark are the design system's original SVGs.

## What's intentionally out of scope

Per the brief: discovery + personalization only — **no** ticketing, RSVP, social,
or hosting. The app always sends you *out to the source*. Backend ingestion/cleanup
(ELT), ranking, scheduler, and web push are described in the root build spec and are
not part of this frontend package.
