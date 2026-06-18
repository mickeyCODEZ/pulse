// Search · Account · Sign-in  → window.PulseUser
(function () {
  const NS = window.PulseDesignSystem_3c2543;
  const { SearchBar, FilterChip, Tag, Button, Input, Switch, SegmentedControl,
          Avatar, Badge, EventCard, EmptyState, DatePicker } = NS;
  const I = window.PulseIcons;
  const { Eyebrow } = window.PulseShell;
  const D = window.PULSE_DATA;

  const RECENT = ["Jazz tonight", "Free this weekend", "Risograph", "Talks"];
  const CATS = [
    { label: "Live music", icon: <I.Music size={18} /> },
    { label: "Art", icon: <I.Palette size={18} /> },
    { label: "Film", icon: <I.Film size={18} /> },
    { label: "Food", icon: <I.Utensils size={18} /> },
    { label: "Talks", icon: <I.Mic size={18} /> },
    { label: "Theatre", icon: <I.Ticket size={18} /> },
  ];

  // ============================ SEARCH ============================
  const WD = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayTok = (e) => (e.date || "").split(" ")[0];
  const fmtDate = (d) => d.toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric" });

  function SearchScreen({ events, saved, onSave, onDismiss, onOpen, city }) {
    const [q, setQ] = React.useState("");
    const [dateF, setDateF] = React.useState("any");   // "any" | "today" | "weekend" | Date
    const [distF, setDistF] = React.useState("any");   // "any" | "walk" | "1mi" | "2mi"
    const [cal, setCal] = React.useState(false);
    const query = q.trim().toLowerCase();

    const matchDate = (e) => {
      if (dateF === "any") return true;
      if (dateF === "today") return dayTok(e) === "Fri";        // mock "today"
      if (dateF === "weekend") return ["Sat", "Sun"].includes(dayTok(e));
      return dayTok(e) === WD[dateF.getDay()];                  // picked Date
    };
    const matchText = (e) => !query || [e.title, e.category, e.venue].join(" ").toLowerCase().includes(query);

    const distChips = [
      { key: "any", label: "Any distance", max: Infinity },
      { key: "walk", label: "Walkable", max: 0.5 },
      { key: "1mi", label: "\u2264 1 mi", max: 1 },
      { key: "2mi", label: "\u2264 2 mi", max: 2 },
    ];
    const matchDist = (e) => parseFloat(e.distance || "99") <= distChips.find((c) => c.key === distF).max;

    const hasFilter = !!query || dateF !== "any" || distF !== "any";
    const results = events.filter((e) => matchText(e) && matchDate(e) && matchDist(e));

    const dateChips = [
      { key: "any", label: "Any day" },
      { key: "today", label: "Today" },
      { key: "weekend", label: "This weekend" },
    ];

    return (
      <div style={{ padding: "var(--space-5) var(--space-5) var(--space-9)", maxWidth: "var(--content-max)", margin: "0 auto" }}>
        <SearchBar value={q} onChange={setQ} autoFocus size="lg" placeholder={`Search events, venues & areas in ${city ? city.name : "your city"}`} style={{ marginBottom: "var(--space-3)" }} />

        {/* date search row */}
        <div style={{ position: "relative", marginBottom: "var(--space-3)" }}>
          <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "2px", scrollbarWidth: "none" }}>
            {dateChips.map((c) => (
              <FilterChip key={c.key} active={dateF === c.key} onClick={() => { setDateF(c.key); setCal(false); }}
                icon={<I.Calendar size={15} />}>{c.label}</FilterChip>
            ))}
            <FilterChip active={dateF instanceof Date} onClick={() => setCal((v) => !v)} icon={<I.Calendar size={15} />}>
              {dateF instanceof Date ? fmtDate(dateF) : "Pick a date"}
            </FilterChip>
          </div>
          {cal && (
            <div style={{ position: "absolute", top: "44px", left: 0, zIndex: 30 }}>
              <DatePicker value={dateF instanceof Date ? dateF : null} onChange={(d) => { setDateF(d); setCal(false); }} />
            </div>
          )}
        </div>

        {/* location search row */}
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "2px", marginBottom: "var(--space-6)", scrollbarWidth: "none" }}>
          {distChips.map((c) => (
            <FilterChip key={c.key} active={distF === c.key} onClick={() => setDistF(c.key)}
              icon={<I.Pin size={15} />}>{c.label}</FilterChip>
          ))}
        </div>

        {!hasFilter && (
          <React.Fragment>
            <Eyebrow style={{ marginBottom: "var(--space-3)" }}>Recent</Eyebrow>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "var(--space-7)" }}>
              {RECENT.map((r) => <FilterChip key={r} onClick={() => setQ(r.split(" ")[0])}>{r}</FilterChip>)}
            </div>
            <Eyebrow style={{ marginBottom: "var(--space-3)" }}>Browse by category</Eyebrow>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "10px", marginBottom: "var(--space-7)" }}>
              {CATS.map((c) => (
                <button key={c.label} onClick={() => setQ(c.label)} style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", padding: "var(--space-4)", background: "var(--surface-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", cursor: "pointer", color: "var(--text-strong)", fontFamily: "var(--font-sans)", fontWeight: "var(--fw-medium)", fontSize: "var(--fs-body)", textAlign: "left", transition: "background var(--dur-2)" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "var(--surface-raised)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "var(--surface-card)"}>
                  <span style={{ color: "var(--text-muted)" }}>{c.icon}</span>{c.label}
                </button>
              ))}
            </div>
            <Eyebrow style={{ marginBottom: "var(--space-3)" }}>Trending near you</Eyebrow>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              {events.slice(0, 3).map((e) => <EventCard key={e.id} event={e} variant="compact" saved={saved.has(e.id)} onSave={() => onSave(e.id)} onOpen={() => onOpen(e)} />)}
            </div>
          </React.Fragment>
        )}

        {hasFilter && results.length > 0 && (
          <React.Fragment>
            <Eyebrow style={{ marginBottom: "var(--space-3)" }}>
              {results.length} result{results.length > 1 ? "s" : ""}
              {query ? ` for “${q}”` : ""}
              {dateF !== "any" ? ` · ${dateF instanceof Date ? fmtDate(dateF) : dateChips.find((c) => c.key === dateF).label.toLowerCase()}` : ""}
              {distF !== "any" ? ` · ${distChips.find((c) => c.key === distF).label.toLowerCase()}` : ""}
            </Eyebrow>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              {results.map((e) => <EventCard key={e.id} event={e} variant="compact" saved={saved.has(e.id)} onSave={() => onSave(e.id)} onDismiss={() => onDismiss(e.id)} onOpen={() => onOpen(e)} />)}
            </div>
          </React.Fragment>
        )}

        {hasFilter && results.length === 0 && (
          <EmptyState glyph="search" title="Nothing matches yet" body="Try a broader term, a different date, or a wider distance. New sources trickle in all the time." action={<Button variant="secondary" size="sm" onClick={() => { setQ(""); setDateF("any"); setDistF("any"); }}>Clear search</Button>} />
        )}
      </div>
    );
  }

  // ============================ ACCOUNT ============================
  function Row({ icon, label, value, onClick, last }) {
    return (
      <button onClick={onClick} style={{ display: "flex", width: "100%", alignItems: "center", gap: "var(--space-3)", padding: "var(--space-4) var(--space-2)", background: "transparent", border: "none", borderBottom: last ? "none" : "1px solid var(--border)", cursor: "pointer", textAlign: "left" }}>
        <span style={{ color: "var(--text-muted)", display: "flex" }}>{icon}</span>
        <span style={{ flex: 1, fontSize: "var(--fs-body)", color: "var(--text-strong)", fontWeight: "var(--fw-medium)" }}>{label}</span>
        {value && <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-muted)", letterSpacing: "0.02em" }}>{value}</span>}
        <span style={{ color: "var(--text-faint)", display: "flex" }}><I.ChevronRight size={18} /></span>
      </button>
    );
  }
  const Group = ({ title, children }) => (
    <section style={{ marginBottom: "var(--space-6)" }}>
      <Eyebrow style={{ marginBottom: "var(--space-2)" }}>{title}</Eyebrow>
      <div style={{ background: "var(--surface-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "0 var(--space-4)" }}>{children}</div>
    </section>
  );

  function Account({ theme, setTheme, onNavigate, onSignOut, city }) {
    return (
      <div style={{ padding: "var(--space-6)", maxWidth: "var(--content-max)", margin: "0 auto" }}>
        {/* profile */}
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
          <Avatar name="Ana Ruiz" size={60} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-display-sm)", color: "var(--text-strong)", margin: "0 0 2px", letterSpacing: "var(--ls-tight)" }}>Ana Ruiz</h1>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-muted)" }}>ana@hey.com</div>
          </div>
          <Badge tone="neutral">Free plan</Badge>
        </div>

        {/* upgrade */}
        <div style={{ position: "relative", overflow: "hidden", background: "var(--surface-inverse)", color: "var(--text-inverse)", borderRadius: "var(--radius-lg)", padding: "var(--space-5)", marginBottom: "var(--space-7)" }} className="map-overlay">
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}><I.Sparkles size={18} /><span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", letterSpacing: "var(--ls-label)", textTransform: "uppercase", opacity: 0.85 }}>Pulse+</span></div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-title)", marginBottom: "4px" }}>Unlimited cities & instant drops</div>
            <div style={{ fontSize: "var(--fs-sm)", opacity: 0.75, marginBottom: "var(--space-4)", maxWidth: "44ch" }}>Real-time alerts the moment a high-match event is found — anywhere you travel.</div>
            <Button variant="secondary" size="sm" style={{ background: "var(--text-inverse)", color: "var(--surface-inverse)", borderColor: "var(--text-inverse)" }}>Upgrade — $4/mo</Button>
          </div>
        </div>

        <Group title="Account">
          <Row icon={<I.User size={18} />} label="Edit profile" />
          <Row icon={<I.Pin size={18} />} label="Home city" value={city ? city.name : "Lisbon"} />
          <Row icon={<I.Globe size={18} />} label="Connected sources" value="6 active" last />
        </Group>

        <Group title="Personalization">
          <Row icon={<I.Sliders size={18} />} label="For me — interests & ranking" onClick={() => onNavigate && onNavigate("me")} />
          <Row icon={<I.Bell size={18} />} label="Notifications & digest" onClick={() => onNavigate && onNavigate("digest")} last />
        </Group>

        <section style={{ marginBottom: "var(--space-6)" }}>
          <Eyebrow style={{ marginBottom: "var(--space-2)" }}>Appearance</Eyebrow>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--surface-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "var(--space-4)" }}>
            <span style={{ fontSize: "var(--fs-body)", color: "var(--text-strong)", fontWeight: "var(--fw-medium)" }}>Theme</span>
            <SegmentedControl size="sm" value={theme} onChange={setTheme} options={[{ value: "light", label: "Light" }, { value: "dark", label: "Dark" }]} />
          </div>
        </section>

        <Group title="Support">
          <Row icon={<I.Heart size={18} />} label="Privacy & data" />
          <Row icon={<I.ExternalLink size={18} />} label="Help & feedback" last />
        </Group>

        <Button variant="secondary" block onClick={onSignOut} style={{ marginTop: "var(--space-2)" }}>Sign out</Button>
        <p style={{ textAlign: "center", fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-faint)", marginTop: "var(--space-4)", letterSpacing: "0.04em" }}>PULSE · v1.0 · WE SEND YOU TO THE SOURCE</p>
      </div>
    );
  }

  // ============================ SIGN IN ============================
  function SignIn({ onContinue }) {
    const [email, setEmail] = React.useState("");
    const [busy, setBusy] = React.useState(false);
    const go = () => { setBusy(true); setTimeout(onContinue, 800); };
    const Oauth = ({ label, mark }) => (
      <button onClick={go} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--space-2)", width: "100%", height: "48px", background: "var(--surface-card)", border: "1px solid var(--border-strong)", borderRadius: "var(--radius-pill)", cursor: "pointer", fontFamily: "var(--font-sans)", fontWeight: "var(--fw-semibold)", fontSize: "var(--fs-body)", color: "var(--text-strong)" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "18px", width: "20px", textAlign: "center" }}>{mark}</span>{label}
      </button>
    );
    return (
      <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "var(--space-8) var(--space-6)", maxWidth: "26rem", margin: "0 auto" }}>
        <span style={{ color: "var(--text-strong)", marginBottom: "var(--space-7)" }}>
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21.6 C12 21.6 18.8 14.8 18.8 9 A6.8 6.8 0 1 0 5.2 9 C5.2 14.8 12 21.6 12 21.6 Z"/><circle cx="12" cy="8.8" r="1.5" fill="currentColor" stroke="none"/><path d="M14.7 6.1 a3.9 3.9 0 0 1 0 5.4"/><path d="M9.3 6.1 a3.9 3.9 0 0 0 0 5.4"/></svg>
        </span>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-display-md)", color: "var(--text-strong)", letterSpacing: "var(--ls-display)", lineHeight: "var(--lh-tight)", margin: "0 0 var(--space-2)" }}>Your city,<br/><em>ranked for you.</em></h1>
        <p style={{ color: "var(--text-muted)", fontSize: "var(--fs-subtitle)", margin: "0 0 var(--space-6)" }}>One feed for everything happening — no walled gardens.</p>

        <Input label="Email" type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} iconLeft={<I.User size={18} />} style={{ marginBottom: "var(--space-3)" }} />
        <Button block size="lg" loading={busy} onClick={go}>Continue</Button>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", margin: "var(--space-6) 0" }}>
          <span style={{ flex: 1, height: "1px", background: "var(--border)" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", letterSpacing: "var(--ls-label)", textTransform: "uppercase", color: "var(--text-faint)" }}>or</span>
          <span style={{ flex: 1, height: "1px", background: "var(--border)" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          <Oauth label="Continue with Apple" mark="" />
          <Oauth label="Continue with Google" mark="G" />
        </div>
        <p style={{ fontSize: "var(--fs-sm)", color: "var(--text-faint)", textAlign: "center", marginTop: "var(--space-6)", lineHeight: "var(--lh-normal)" }}>By continuing you agree to the Terms & Privacy Policy.</p>
      </div>
    );
  }

  window.PulseUser = { SearchScreen, Account, SignIn };
})();
