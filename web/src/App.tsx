import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode, MouseEvent as ReactMouseEvent } from "react";
import { events as ALL_EVENTS, cities as CITIES, type City, type PulseEvent } from "./data";
import { Logo } from "./components/core/Logo";
import { IconButton } from "./components/core/IconButton";
import { Avatar } from "./components/core/Avatar";
import { Button } from "./components/core/Button";
import { EmptyState } from "./components/feedback/EmptyState";
import { FeedLoading } from "./components/feedback/FeedLoading";
import { Select } from "./components/forms/Select";
import { LocationSwitcher } from "./components/events/LocationSwitcher";
import { FilterBar } from "./components/navigation/FilterBar";
import { BottomNav } from "./components/navigation/BottomNav";
import { SidebarNav } from "./components/navigation/SidebarNav";
import { MapView } from "./shell/MapView";
import { FeedList } from "./screens/Feed";
import { EventDetailView } from "./screens/Detail";
import { Onboarding } from "./screens/Onboarding";
import { Preferences } from "./screens/Preferences";
import { Digest } from "./screens/Digest";
import { Saved } from "./screens/Saved";
import { SearchScreen } from "./screens/Search";
import { Account } from "./screens/Account";
import { SignIn } from "./screens/SignIn";
import { StatesGallery } from "./screens/States";
import { LocationPicker } from "./screens/LocationPicker";
import { LocationGate } from "./screens/LocationGate";
import { Home, Search, Bookmark, Bell, User, Sparkles, MapIcon } from "./icons";
import { useIsDesktop } from "./hooks";
import { api, backendOnline } from "./api";
import { detectLocation, locationToCity } from "./geo";

type Route =
  | "feed" | "detail" | "saved" | "digest" | "me"
  | "search" | "account" | "states" | "signin" | "onboarding" | "map";

const NAV = [
  { key: "feed", label: "Feed", icon: <Home size={20} /> },
  { key: "map", label: "Map", icon: <MapIcon size={20} /> },
  { key: "search", label: "Search", icon: <Search size={20} /> },
  { key: "saved", label: "Saved", icon: <Bookmark size={20} /> },
  { key: "digest", label: "Digest", icon: <Bell size={20} /> },
  { key: "me", label: "For me", icon: <User size={20} /> },
];

const FILTERS = [
  { key: "today", label: "Today" },
  { key: "weekend", label: "This weekend" },
  { key: "free", label: "Free" },
  { key: "near", label: "Near me" },
  { key: "music", label: "Live music" },
  { key: "festivals", label: "Festivals" },
  { key: "markets", label: "Farmers markets" },
  { key: "community", label: "Community" },
  { key: "family", label: "Family" },
  { key: "outdoors", label: "Outdoors" },
  { key: "sports", label: "Sports" },
  { key: "fairs", label: "Fairs" },
  { key: "parades", label: "Parades" },
  { key: "civic", label: "Civic" },
  { key: "art", label: "Art" },
  { key: "food", label: "Food" },
  { key: "film", label: "Film" },
];

const _num = (s?: string) => {
  const m = s ? parseFloat(s) : NaN;
  return Number.isFinite(m) ? m : Infinity;
};
function sortEvents(evs: PulseEvent[], sort: string): PulseEvent[] {
  const a = [...evs];
  if (sort === "Soonest") a.sort((x, y) => (x.start || "9999") < (y.start || "9999") ? -1 : 1);
  else if (sort === "Nearest") a.sort((x, y) => _num(x.distance) - _num(y.distance));
  else if (sort === "Cheapest") a.sort((x, y) => (x.free ? 0 : x.price ?? Infinity) - (y.free ? 0 : y.price ?? Infinity));
  return a; // "For you" keeps the backend's relevance order
}

const ls = (k: string, d: string) => {
  try {
    return localStorage.getItem("pulse." + k) ?? d;
  } catch {
    return d;
  }
};

// The user's last city (explicit pick or detected location), so returning
// visitors aren't re-prompted. `cityChosen` distinguishes a real choice from
// the cold default, so first-timers who deny geolocation still get the picker.
const lsCity = (): City | null => {
  try {
    const c = localStorage.getItem("pulse.city");
    return c ? (JSON.parse(c) as City) : null;
  } catch {
    return null;
  }
};
const persistCity = (c: City) => {
  try {
    localStorage.setItem("pulse.city", JSON.stringify(c));
    localStorage.setItem("pulse.cityChosen", "1");
  } catch {
    /* storage blocked */
  }
};
const hasChosenCity = () => {
  try {
    return !!localStorage.getItem("pulse.cityChosen");
  } catch {
    return false;
  }
};

export default function App() {
  const isDesktop = useIsDesktop();
  const params = useMemo(() => new URLSearchParams(location.search), []);

  const initEvent = params.get("event")
    ? ALL_EVENTS.find((e) => e.id === params.get("event")) ?? null
    : null;
  const initRoute = (initEvent ? "detail" : params.get("screen") || ls("route", "feed")) as Route;

  const [theme, setTheme] = useState(params.get("theme") || ls("theme", "light"));
  const [route, setRoute] = useState<Route>(initRoute);
  const [sel, setSel] = useState<PulseEvent | null>(initEvent);
  const [saved, setSaved] = useState<Set<string>>(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem("pulse.saved") || "[]"));
    } catch {
      return new Set();
    }
  });
  const [savedEvents, setSavedEvents] = useState<PulseEvent[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("pulse.savedEvents") || "[]");
    } catch {
      return [];
    }
  });
  const [digestEvents, setDigestEvents] = useState<PulseEvent[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem("pulse.dismissed") || "[]"));
    } catch {
      return new Set();
    }
  });
  const [active, setActive] = useState<string[]>([]);
  const [sort, setSort] = useState("For you");
  const [city, setCity] = useState<City>(() => lsCity() ?? CITIES[0]);
  const [picker, setPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mapSel, setMapSel] = useState<string>("");
  const [catalog, setCatalog] = useState<PulseEvent[]>([]); // real events only; no bundled samples
  const [cityList, setCityList] = useState<City[]>(CITIES);
  const [online, setOnline] = useState(false);
  const [userLoc, setUserLoc] = useState<{ lat: number; lng: number } | null>(null);
  const [mapW, setMapW] = useState(420); // desktop map-rail width, user-resizable
  // Feed lifecycle for honest states (no blank screens, no fake fallback data).
  const [feedStatus, setFeedStatus] = useState<"loading" | "ok" | "empty" | "error">("loading");
  // Location-first: a brand-new visitor sets a location before any feed loads.
  const [needLocation, setNeedLocation] = useState(false);
  const [geoBusy, setGeoBusy] = useState(false);
  const [geoDenied, setGeoDenied] = useState(false);
  const [locating, setLocating] = useState(false); // silent first-load geolocation splash
  const reqId = useRef(0); // guards against stale-response races

  // Fetch the live ranked feed (+ saved + digest) for a city; falls back to
  // sample data. `activeFilters` (chip keys) are passed so chips actually filter.
  const loadFeed = useCallback(async (c: City, activeFilters: string[] = [], retry = false) => {
    const myReq = ++reqId.current;
    if (!retry) setFeedStatus("loading");
    try {
      const [feed, sv, dg] = await Promise.all([
        api.feed({ city: c.name, lat: c.lat, lng: c.lng, active: activeFilters }),
        api.saved(),
        api.digest(c.name),
      ]);
      if (myReq !== reqId.current) return; // a newer request superseded this one
      // Self-heal an un-ingested city: if it's empty (and no filters narrowing
      // it), trigger one ingest and reload so the default city is never blank.
      if (!feed.events?.length && !retry && !activeFilters.length) {
        try {
          await api.refresh(c.name, c.lat, c.lng, c.country);
        } catch {
          /* ignore */
        }
        if (myReq === reqId.current) return loadFeed(c, activeFilters, true);
      }
      setCatalog(feed.events?.length ? feed.events : []);
      setFeedStatus(feed.events?.length ? "ok" : "empty");
      setOnline(true); // a successful load means we're online (recovers after an outage)
      if (feed.events?.length) setMapSel(feed.events[0].id);
      // Union backend-known saves with the locally persisted set (resilient to a
      // stateless backend that may reset its in-memory saves on a cold start).
      if (sv.saved_ids?.length) setSaved((prev) => new Set([...prev, ...sv.saved_ids]));
      if (sv.events?.length) {
        setSavedEvents((prev) => {
          const byId = new Map(prev.map((e) => [e.id, e]));
          for (const e of sv.events) byId.set(e.id, e);
          return [...byId.values()];
        });
      }
      if (dg.events) setDigestEvents(dg.events);
    } catch {
      // Online but the request failed → show an honest error state with Retry,
      // never silently substitute bundled sample data. (Offline/demo mode is
      // handled separately at mount, where ALL_EVENTS is intentional.)
      if (myReq === reqId.current) setFeedStatus("error");
    }
  }, []);

  // Probe the backend, sense the user's real location, then load that city's feed.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const ok = await backendOnline();
      if (cancelled) return;
      setOnline(ok);
      if (!ok) {
        // Backend unreachable → honest error state (never fabricated sample data).
        setFeedStatus("error");
        return;
      }
      // Resolve a deep-linked ?event=<id> against the backend (real events have
      // UUIDs not in the bundled sample set).
      const evParam = params.get("event");
      if (evParam && !sel) {
        try {
          const ev = await api.event(evParam);
          if (!cancelled && ev && ev.id) {
            setSel(ev);
            setRoute("detail");
          }
        } catch {
          /* event expired / cache miss → fall through to the feed */
        }
      }
      api.cities().then((cs) => {
        if (!cancelled && cs.length) setCityList(cs);
      }).catch(() => {});
      if (hasChosenCity()) {
        // Returning visitor → load the city they last used (no re-prompt).
        if (!cancelled) await loadFeed(city, active);
      } else {
        // Brand-new visitor → try to locate them silently first (lowest friction:
        // most people land straight in their city's feed). If denied/unavailable,
        // fall back to the search-first gate.
        setLocating(true);
        const loc = await detectLocation();
        if (cancelled) return;
        setLocating(false);
        if (loc) {
          setUserLoc({ lat: loc.lat, lng: loc.lng });
          pickCity(locationToCity(loc)); // persists + refreshes + loads (with FeedLoading)
        } else {
          setGeoDenied(true);
          setNeedLocation(true);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const events = catalog.filter((e) => !dismissed.has(e.id));
  const feedEvents = useMemo(() => sortEvents(events, sort), [events, sort]);
  const eventById = (id: string) =>
    catalog.find((e) => e.id === id) || savedEvents.find((e) => e.id === id) || digestEvents.find((e) => e.id === id);
  const toggleSave = (id: string) =>
    setSaved((s) => {
      const n = new Set(s);
      const willSave = !n.has(id);
      willSave ? n.add(id) : n.delete(id);
      // un-save is its own signal, NOT a dismissal.
      if (online) void api.action(id, willSave ? "saved" : "unsaved");
      // keep the Saved tab's event list in sync optimistically
      setSavedEvents((prev) => {
        if (willSave) {
          const ev = eventById(id);
          return ev && !prev.some((e) => e.id === id) ? [ev, ...prev] : prev;
        }
        return prev.filter((e) => e.id !== id);
      });
      return n;
    });
  const dismiss = (id: string) => {
    setDismissed((s) => new Set(s).add(id));
    if (online) void api.action(id, "dismissed");
  };
  const toggleFilter = (k: string) =>
    setActive((a) => {
      const next = a.includes(k) ? a.filter((x) => x !== k) : [...a, k];
      if (online) {
        setLoading(true);
        void loadFeed(city, next).finally(() => setLoading(false));
      }
      return next;
    });
  const open = (e: PulseEvent) => {
    setSel(e);
    setRoute("detail");
    window.scrollTo({ top: 0 });
    if (online) void api.action(e.id, "clicked");
  };
  // Persist profile edits (interests / dealbreakers / boosts) → backend re-ranks
  // → reload the feed so the new ranking takes effect.
  const saveProfile = async (patch: Record<string, unknown>) => {
    if (!online) return;
    await api.putProfile(patch);
    await loadFeed(city, active);
  };
  const pickCity = (c: City) => {
    setCity(c);
    persistCity(c);
    setPicker(false);
    setNeedLocation(false); // a choice clears the first-run location gate
    setLoading(true);
    // Show the loading UI for the NEW city immediately — clear the previous
    // city's events so we never display stale results during the refresh.
    setFeedStatus("loading");
    setCatalog([]);
    if (online) {
      // Travel anywhere: trigger on-demand ingest for the city, then reload.
      // (refresh is a fast no-op when the city was crawled in the last 10 min.)
      (async () => {
        try {
          await api.refresh(c.name, c.lat, c.lng, c.country);
          await loadFeed(c, active);
        } catch {
          setFeedStatus("error");
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setTimeout(() => setLoading(false), 3200);
    }
  };

  // "Use my current location" — from the picker or the first-run gate.
  const useMyLocation = async () => {
    setPicker(false);
    setGeoBusy(true);
    const loc = await detectLocation();
    setGeoBusy(false);
    if (loc) {
      setUserLoc({ lat: loc.lat, lng: loc.lng });
      pickCity(locationToCity(loc));
    } else {
      // denied/unavailable → stay on the gate and invite a manual choice
      setGeoDenied(true);
    }
  };
  const moreLike = sel ? events.filter((e) => e.id !== sel.id && e.category === sel.category).slice(0, 2) : [];

  // Persist saved/dismissed locally (survives reload + stateless-backend resets).
  useEffect(() => {
    try {
      localStorage.setItem("pulse.saved", JSON.stringify([...saved]));
    } catch {
      /* ignore */
    }
  }, [saved]);
  useEffect(() => {
    try {
      localStorage.setItem("pulse.savedEvents", JSON.stringify(savedEvents));
    } catch {
      /* ignore */
    }
  }, [savedEvents]);
  useEffect(() => {
    try {
      localStorage.setItem("pulse.dismissed", JSON.stringify([...dismissed]));
    } catch {
      /* ignore */
    }
  }, [dismissed]);

  // Theme → <html data-theme>, plus persistence + deep-link sync.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem("pulse.theme", theme);
      localStorage.setItem("pulse.route", route);
    } catch {
      /* ignore */
    }
    const p = new URLSearchParams();
    p.set("screen", route);
    p.set("theme", theme);
    if (route === "detail" && sel) p.set("event", sel.id);
    try {
      history.replaceState(null, "", location.pathname + "?" + p.toString());
    } catch {
      /* ignore */
    }
  }, [theme, route, sel]);

  const isOnboarding = route === "onboarding" || route === "signin";

  // ----- shared header -----
  const Header = ({ desktop }: { desktop?: boolean }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: desktop ? "var(--space-5) var(--space-6) var(--space-3)" : "var(--space-3) var(--space-4)",
        gap: "var(--space-3)",
      }}
    >
      <LocationSwitcher city={city.name} loading={loading} size={desktop ? "lg" : "md"} onClick={() => setPicker(true)} />
      <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center" }}>
        {desktop && <Select size="sm" value={sort} onChange={(e) => setSort(e.target.value)} options={["For you", "Soonest", "Nearest", "Cheapest"]} />}
        <IconButton label="Search" variant="ghost" onClick={() => setRoute("search")}>
          <Search size={20} />
        </IconButton>
        {!desktop && (
          <button onClick={() => setRoute("account")} style={{ border: "none", background: "transparent", padding: 0, cursor: "pointer" }} aria-label="Account">
            <Avatar name="You" size={32} />
          </button>
        )}
      </div>
    </div>
  );

  const FeedBody = ({ columns }: { columns: number }) => (
    <div style={{ padding: `var(--space-5) ${columns > 1 ? "var(--space-6)" : "var(--gutter-mobile)"} var(--space-9)` }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-display-md)", color: "var(--text-strong)", letterSpacing: "var(--ls-display)", lineHeight: "var(--lh-tight)", margin: "0 0 var(--space-2)" }}>
        For you, tonight
      </h1>
      {feedStatus !== "loading" && (
        <p style={{ color: "var(--text-muted)", margin: "0 0 var(--space-5)", fontSize: "var(--fs-subtitle)" }}>
          {feedStatus === "ok"
            ? `${events.length} events in ${city.name}, ranked — not pre-filtered.`
            : `In ${city.name}`}
        </p>
      )}
      {feedStatus === "loading" ? (
        <FeedLoading city={city.name} columns={columns} />
      ) : feedStatus === "error" ? (
        <EmptyState
          glyph="error"
          title="Couldn't load events"
          body="The connection hiccuped. The server may be waking up — give it a moment."
          action={<Button variant="primary" onClick={() => loadFeed(city, active)}>Try again</Button>}
        />
      ) : feedStatus === "empty" ? (
        <EmptyState
          glyph="quiet"
          title={`Nothing in ${city.name} just yet`}
          body={active.length ? "Try clearing your filters, or pick another city." : "We're still gathering events here — try another city."}
          action={
            active.length
              ? <Button variant="secondary" onClick={() => { setActive([]); loadFeed(city, []); }}>Clear filters</Button>
              : <Button variant="secondary" onClick={() => setPicker(true)}>Change city</Button>
          }
        />
      ) : (
        <FeedList events={feedEvents} saved={saved} onSave={toggleSave} onDismiss={dismiss} onOpen={open} columns={columns} />
      )}
    </div>
  );

  // Real digest count on the Digest nav badge (no hardcoded number).
  const navItems = NAV.map((n) =>
    n.key === "digest" ? { ...n, badge: digestEvents.length || undefined } : n,
  );

  // "Near me" filter → draw a discovery ring around the user on the map.
  const radiusKm = active.includes("near") ? 5 : null;
  // Hovering a pin highlights it in the feed; clicking a pin opens the event.
  const onPin = (id: string) => setMapSel(id);

  // Drag the divider to slide the map rail wider/narrower (300px … 72% of viewport).
  const clampMapW = (w: number) => Math.min(Math.max(w, 300), Math.round(window.innerWidth * 0.72));
  const startMapDrag = (e: ReactMouseEvent) => {
    e.preventDefault();
    const handle = e.currentTarget as HTMLElement;
    handle.classList.add("drag");
    const move = (ev: MouseEvent) => setMapW(clampMapW(window.innerWidth - ev.clientX));
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      handle.classList.remove("drag");
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };
  const mapExpanded = mapW > window.innerWidth * 0.5;
  const toggleMapSize = () => setMapW((w) => (w > window.innerWidth * 0.5 ? 420 : Math.round(window.innerWidth * 0.66)));

  const screenBody = (desktop: boolean): ReactNode => {
    switch (route) {
      case "feed":
        return <FeedBody columns={1} />;
      case "map":
        return (
          <div style={{ height: "calc(100dvh - 66px)" }}>
            <MapView
              events={events}
              selectedId={mapSel}
              theme={theme}
              userLoc={userLoc}
              radiusKm={radiusKm}
              onSelect={open}
              onHover={onPin}
            />
          </div>
        );
      case "detail":
        return (
          <EventDetailView
            event={sel}
            saved={saved.has(sel?.id ?? "")}
            onSave={toggleSave}
            onBack={() => setRoute("feed")}
            more={moreLike}
            onOpen={open}
            mode={desktop ? "desktop" : "mobile"}
            theme={theme}
          />
        );
      case "saved":
        return <Saved saved={saved} events={savedEvents.length || online ? savedEvents : catalog.filter((e) => saved.has(e.id))} onSave={toggleSave} onOpen={open} />;
      case "digest":
        return <Digest onOpen={open} items={digestEvents.length ? digestEvents : undefined} />;
      case "me":
        return <Preferences onSave={saveProfile} />;
      case "search":
        return <SearchScreen events={events} saved={saved} onSave={toggleSave} onDismiss={dismiss} onOpen={open} city={city} cityList={cityList} onSwitchCity={(c) => { pickCity(c); setRoute("feed"); }} />;
      case "account":
        return <Account theme={theme} setTheme={setTheme} onNavigate={(r) => setRoute(r as Route)} onSignOut={() => setRoute("signin")} city={city} />;
      case "states":
        return <StatesGallery />;
      default:
        return null;
    }
  };

  const fullSurface =
    route === "signin" ? <SignIn onContinue={() => setRoute("onboarding")} /> : <Onboarding onDone={() => setRoute("feed")} onComplete={saveProfile} />;

  // ===== Onboarding / Sign-in: take the whole surface =====
  if (isOnboarding) {
    return (
      <div className="pulse-app" style={{ justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: "520px", minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
          {fullSurface}
        </div>
      </div>
    );
  }

  // ===== Silent first-load geolocation splash (before the gate) =====
  if (online && locating && !needLocation) {
    return (
      <div className="pulse-app" style={{ justifyContent: "center", alignItems: "center" }}>
        <div className="pulse-screen-enter" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-4)" }}>
          <Logo size={32} />
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", color: "var(--text-muted)", fontSize: "var(--fs-subtitle)" }}>
            <span aria-hidden="true" style={{ width: 16, height: 16, border: "2px solid var(--border-strong)", borderTopColor: "var(--accent)", borderRadius: "50%", display: "inline-block", animation: "pulse-spin 0.7s linear infinite" }} />
            Finding events near you…
            <style>{"@keyframes pulse-spin{to{transform:rotate(360deg)}}"}</style>
          </div>
        </div>
      </div>
    );
  }

  // ===== First-run location gate: search a place before any feed loads =====
  if (online && needLocation) {
    return (
      <div className="pulse-app" style={{ position: "relative", justifyContent: "center" }}>
        <LocationGate
          cityList={cityList}
          onPick={pickCity}
          onUseLocation={useMyLocation}
          locating={geoBusy}
          denied={geoDenied}
        />
      </div>
    );
  }

  // ===== Desktop: 3-zone shell =====
  if (isDesktop) {
    return (
      <div className="pulse-app">
        {/* sidebar */}
        <nav className="pulse-sidebar">
          <div style={{ padding: "0 var(--space-2) var(--space-6)" }}>
            <Logo size={26} />
          </div>
          <SidebarNav items={navItems} active={route === "detail" ? "feed" : route} onSelect={(k) => setRoute(k as Route)} />
          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "2px" }}>
            <SidebarNav
              items={[{ key: "states", label: "States", icon: <Sparkles size={20} /> }]}
              active={route}
              onSelect={(k) => setRoute(k as Route)}
            />
            <button
              onClick={() => setRoute("account")}
              style={{
                display: "flex",
                width: "100%",
                textAlign: "left",
                alignItems: "center",
                gap: "var(--space-3)",
                padding: "var(--space-3)",
                marginTop: "var(--space-2)",
                borderRadius: "var(--radius-md)",
                border: "none",
                borderTop: "1px solid var(--border)",
                cursor: "pointer",
                background: route === "account" ? "var(--accent-soft)" : "transparent",
              }}
            >
              <Avatar name="You" size={34} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: "var(--fs-sm)", fontWeight: "var(--fw-semibold)", color: "var(--text-strong)" }}>You</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-muted)" }}>Browsing anonymously</div>
              </div>
            </button>
          </div>
        </nav>

        {/* center */}
        <main className="pulse-main" style={{ borderRight: route === "feed" ? "1px solid var(--border)" : "none" }}>
          {route !== "detail" && <Header desktop />}
          {route === "feed" && <FilterBar filters={FILTERS} active={active} onToggle={toggleFilter} sticky={false} />}
          <div className="pulse-screen-enter" style={{ flex: 1 }}>
            <div style={{ maxWidth: route === "feed" ? "660px" : "100%", margin: route === "feed" ? "0 auto" : 0 }}>
              {screenBody(true)}
            </div>
          </div>
        </main>

        {/* right map (feed only) — real interactive map, synced to the feed,
            resizable by dragging the divider or the Expand toggle */}
        {route === "feed" && (
          <aside className="pulse-mappanel" style={{ width: mapW, position: "relative" }}>
            <div className="pulse-map-resizer" onMouseDown={startMapDrag} title="Drag to resize the map" />
            <button className="pulse-map-btn" style={{ top: 12, right: 12 }} onClick={toggleMapSize}>
              {mapExpanded ? "Shrink" : "Expand"}
            </button>
            <MapView
              events={events}
              selectedId={mapSel}
              theme={theme}
              userLoc={userLoc}
              radiusKm={radiusKm}
              onSelect={open}
              onHover={onPin}
            />
          </aside>
        )}

        {picker && <LocationPicker cities={cityList} current={city.id} onPick={pickCity} onClose={() => setPicker(false)} onUseLocation={useMyLocation} />}
      </div>
    );
  }

  // ===== Mobile: single column + bottom nav =====
  return (
    <div className="pulse-mobile-shell" style={{ position: "relative" }}>
      <div className="pulse-screen-enter" style={{ flex: 1 }}>
        {route === "feed" && <Header />}
        {route === "feed" && <FilterBar filters={FILTERS} active={active} onToggle={toggleFilter} sticky />}
        {screenBody(false)}
      </div>
      {route !== "detail" && (
        <div className="pulse-bottomnav-wrap">
          <BottomNav items={navItems} active={route} onSelect={(k) => setRoute(k as Route)} />
        </div>
      )}
      {picker && <LocationPicker cities={cityList} current={city.id} onPick={pickCity} onClose={() => setPicker(false)} onUseLocation={useMyLocation} />}
    </div>
  );
}
