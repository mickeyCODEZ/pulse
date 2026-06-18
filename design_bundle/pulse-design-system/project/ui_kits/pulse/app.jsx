// Pulse UI-kit app root → mounts the interactive demo into #root
(function () {
  const NS = window.PulseDesignSystem_3c2543;
  const { Logo, LocationSwitcher, FilterBar, BottomNav, SidebarNav, IconButton, Avatar, Select, SegmentedControl, Badge } = NS;
  const I = window.PulseIcons;
  const { PhoneFrame, MapPanel } = window.PulseShell;
  const { FeedList } = window.PulseFeed;
  const { EventDetailView } = window.PulseDetail;
  const { Onboarding, Preferences, Digest, Saved, LocationPicker, StatesGallery } = window.PulseScreens;
  const { SearchScreen, Account, SignIn } = window.PulseUser;
  const D = window.PULSE_DATA;

  const NAV = [
    { key: "feed", label: "Feed", icon: <I.Home size={20} /> },
    { key: "search", label: "Search", icon: <I.Search size={20} /> },
    { key: "saved", label: "Saved", icon: <I.Bookmark size={20} /> },
    { key: "digest", label: "Digest", icon: <I.Bell size={20} />, badge: 3 },
    { key: "me", label: "For me", icon: <I.User size={20} /> },
  ];
  const FILTERS = [
    { key: "today", label: "Today" }, { key: "weekend", label: "This weekend" },
    { key: "free", label: "Free" }, { key: "near", label: "Near me" },
    { key: "music", label: "Live music" }, { key: "art", label: "Art" },
    { key: "food", label: "Food" }, { key: "film", label: "Film" },
  ];

  function App() {
    const params = new URLSearchParams(location.search);
    const ls = (k, d) => { try { return localStorage.getItem("pulse." + k) ?? d; } catch (e) { return d; } };
    const initEvent = params.get("event") ? D.events.find((e) => e.id === params.get("event")) : null;
    const initRoute = initEvent ? "detail" : (params.get("screen") || ls("route", "feed"));

    const [theme, setTheme] = React.useState(params.get("theme") || ls("theme", "light"));
    const [view, setView] = React.useState(params.get("view") || ls("view", "desktop"));
    const [route, setRoute] = React.useState(initRoute);
    const [sel, setSel] = React.useState(initEvent);
    const [saved, setSaved] = React.useState(new Set(["film"]));
    const [dismissed, setDismissed] = React.useState(new Set());
    const [active, setActive] = React.useState(["weekend"]);
    const [city, setCity] = React.useState(D.cities[0]);
    const [picker, setPicker] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [mapSel, setMapSel] = React.useState(D.events[0].id);

    const events = D.events.filter((e) => !dismissed.has(e.id));
    const toggleSave = (id) => setSaved((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
    const dismiss = (id) => setDismissed((s) => new Set(s).add(id));
    const toggleFilter = (k) => setActive((a) => a.includes(k) ? a.filter((x) => x !== k) : [...a, k]);
    const open = (e) => { setSel(e); setRoute("detail"); };
    const pickCity = (c) => {
      setCity(c); setPicker(false); setLoading(true);
      setTimeout(() => setLoading(false), 3200);
    };
    const moreLike = sel ? events.filter((e) => e.id !== sel.id && e.category === sel.category).slice(0, 2) : [];

    React.useEffect(() => {
      try {
        localStorage.setItem("pulse.theme", theme);
        localStorage.setItem("pulse.view", view);
        localStorage.setItem("pulse.route", route);
      } catch (e) {}
      const p = new URLSearchParams();
      p.set("screen", route); p.set("view", view); p.set("theme", theme);
      if (route === "detail" && sel) p.set("event", sel.id);
      try { history.replaceState(null, "", location.pathname + "?" + p.toString()); } catch (e) {}
    }, [theme, view, route, sel]);

    // ---- shared pieces ----
    const Header = ({ desktop }) => (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: desktop ? "var(--space-5) var(--space-6) var(--space-3)" : "var(--space-3) var(--space-4)", gap: "var(--space-3)" }}>
        <LocationSwitcher city={city.name} loading={loading} size={desktop ? "lg" : "md"} onClick={() => setPicker(true)} />
        <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center" }}>
          {desktop && <Select size="sm" defaultValue="For you" options={["For you","Soonest","Nearest","Cheapest"]} />}
          <IconButton label="Search" variant="ghost" onClick={() => setRoute("search")}><I.Search size={20} /></IconButton>
          {!desktop && <button onClick={() => setRoute("account")} style={{ border: "none", background: "transparent", padding: 0, cursor: "pointer" }} aria-label="Account"><Avatar name="Ana Ruiz" size={32} /></button>}
        </div>
      </div>
    );

    const FeedBody = ({ columns }) => (
      <div style={{ padding: `var(--space-5) ${columns > 1 ? "var(--space-6)" : "var(--gutter-mobile)"} var(--space-9)` }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-display-md)", color: "var(--text-strong)", letterSpacing: "var(--ls-display)", lineHeight: "var(--lh-tight)", margin: "0 0 var(--space-2)" }}>For you, tonight</h1>
        <p style={{ color: "var(--text-muted)", margin: "0 0 var(--space-5)", fontSize: "var(--fs-subtitle)" }}>{events.length} events in {city.name}, ranked — not pre-filtered.</p>
        <FeedList events={events} saved={saved} onSave={toggleSave} onDismiss={dismiss} onOpen={open} columns={columns} />
      </div>
    );

    const screenBody = (desktop) => {
      switch (route) {
        case "feed": return <FeedBody columns={1} />;
        case "detail": return <EventDetailView event={sel} saved={saved.has(sel?.id)} onSave={toggleSave} onBack={() => setRoute("feed")} more={moreLike} onOpen={open} mode={desktop ? "desktop" : "mobile"} />;
        case "saved": return <Saved saved={saved} events={D.events} onSave={toggleSave} onOpen={open} />;
        case "digest": return <Digest onOpen={open} />;
        case "me": return <Preferences />;
        case "search": return <SearchScreen events={events} saved={saved} onSave={toggleSave} onDismiss={dismiss} onOpen={open} city={city} />;
        case "account": return <Account theme={theme} setTheme={setTheme} onNavigate={setRoute} onSignOut={() => setRoute("signin")} city={city} />;
        case "states": return <StatesGallery />;
        default: return null;
      }
    };

    // ---- Onboarding / sign-in take the whole surface ----
    const isOnboarding = route === "onboarding" || route === "signin";

    const fullSurface = route === "signin"
      ? <SignIn onContinue={() => setRoute("onboarding")} />
      : <Onboarding onDone={() => setRoute("feed")} />;

    // ---- MOBILE ----
    const mobile = (
      <PhoneFrame theme={theme}>
        <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
          {isOnboarding ? (
            fullSurface
          ) : (
            <React.Fragment>
              <div style={{ flex: 1, overflowY: "auto", paddingTop: route === "detail" ? 0 : "30px" }}>
                {route === "feed" && <Header />}
                {route === "feed" && <FilterBar filters={FILTERS} active={active} onToggle={toggleFilter} sticky />}
                {screenBody(false)}
              </div>
              {route !== "detail" && <BottomNav items={NAV} active={route} onSelect={setRoute} />}
            </React.Fragment>
          )}
          {picker && <LocationPicker cities={D.cities} current={city.id} onPick={pickCity} onClose={() => setPicker(false)} />}
        </div>
      </PhoneFrame>
    );

    // ---- DESKTOP ----
    const desktopShell = (
      <div data-theme={theme} style={{ width: "1280px", height: "820px", flex: "0 0 auto", background: "var(--surface-page)", color: "var(--text-body)", borderRadius: "16px", overflow: "hidden", border: "1px solid var(--border)", boxShadow: "0 40px 90px rgba(21,18,12,0.28)", display: "flex", position: "relative" }}>
        {isOnboarding ? (
          <div style={{ flex: 1, display: "flex", alignItems: "stretch", justifyContent: "center" }}>
            <div style={{ width: "520px" }}>{fullSurface}</div>
          </div>
        ) : (
          <React.Fragment>
            {/* sidebar */}
            <nav style={{ width: "var(--sidebar-w)", flex: "0 0 auto", borderRight: "1px solid var(--border)", padding: "var(--space-5) var(--space-4)", display: "flex", flexDirection: "column", background: "var(--surface-page)" }}>
              <div style={{ padding: "0 var(--space-2) var(--space-6)" }}><Logo size={26} /></div>
              <SidebarNav items={NAV} active={route === "detail" ? "feed" : route} onSelect={setRoute} />
              <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "2px" }}>
                <SidebarNav items={[{ key: "search", label: "Search", icon: <I.Search size={20} /> }, { key: "states", label: "States", icon: <I.Sparkles size={20} /> }]} active={route} onSelect={setRoute} />
                <button onClick={() => setRoute("account")} style={{ display: "flex", width: "100%", textAlign: "left", alignItems: "center", gap: "var(--space-3)", padding: "var(--space-3) var(--space-3)", marginTop: "var(--space-2)", borderRadius: "var(--radius-md)", border: "none", borderTop: "1px solid var(--border)", cursor: "pointer", background: route === "account" ? "var(--accent-soft)" : "transparent" }}>
                  <Avatar name="Ana Ruiz" size={34} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: "var(--fs-sm)", fontWeight: "var(--fw-semibold)", color: "var(--text-strong)" }}>Ana Ruiz</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-muted)" }}>Free plan</div>
                  </div>
                </button>
              </div>
            </nav>
            {/* center */}
            <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", overflow: "hidden", borderRight: route === "feed" ? "1px solid var(--border)" : "none" }}>
              {route !== "detail" && <Header desktop />}
              {route === "feed" && <FilterBar filters={FILTERS} active={active} onToggle={toggleFilter} sticky={false} />}
              <div style={{ flex: 1, overflowY: "auto" }}>
                <div style={{ maxWidth: route === "feed" ? "660px" : "100%", margin: route === "feed" ? "0 auto" : 0 }}>
                  {screenBody(true)}
                </div>
              </div>
            </main>
            {/* right map (feed only) */}
            {route === "feed" && <MapPanel events={events} selectedId={mapSel} onSelect={setMapSel} loading={loading} />}
          </React.Fragment>
        )}
        {picker && <LocationPicker cities={D.cities} current={city.id} onPick={pickCity} onClose={() => setPicker(false)} />}
      </div>
    );

    return (
      <div style={{ minHeight: "100vh", background: "#E4DCCB", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Toolbar {...{ theme, setTheme, view, setView, route, setRoute }} />
        <div style={{ padding: "28px", display: "flex", justifyContent: "center", width: "100%", boxSizing: "border-box" }}>
          {view === "mobile" ? mobile : desktopShell}
        </div>
      </div>
    );
  }

  function Toolbar({ theme, setTheme, view, setView, route, setRoute }) {
    const routes = [
      { value: "signin", label: "Sign in" }, { value: "onboarding", label: "Onboarding" },
      { value: "feed", label: "Feed" }, { value: "search", label: "Search" },
      { value: "saved", label: "Saved" }, { value: "digest", label: "Digest" },
      { value: "me", label: "For me" }, { value: "account", label: "Account" },
      { value: "states", label: "States" },
    ];
    return (
      <div style={{ position: "sticky", top: 0, zIndex: 100, width: "100%", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", padding: "12px 24px", background: "rgba(20,20,21,0.92)", backdropFilter: "blur(12px)", flexWrap: "wrap" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A9A79F" }}>Pulse · UI Kit</span>
        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }} data-theme="dark">
          <select value={route} onChange={(e) => setRoute(e.target.value)} style={{ appearance: "none", background: "#1f1f23", color: "#f2f0ea", border: "1px solid rgba(255,255,255,0.16)", borderRadius: "999px", padding: "8px 16px", fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
            {routes.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
          <SegmentedControl size="sm" value={view} onChange={setView} options={[{ value: "mobile", label: "Mobile" }, { value: "desktop", label: "Desktop" }]} />
          <SegmentedControl size="sm" value={theme} onChange={setTheme} options={[{ value: "light", label: "Light" }, { value: "dark", label: "Dark" }]} />
        </div>
      </div>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
