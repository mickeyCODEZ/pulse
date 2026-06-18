// Onboarding · Preferences · Digest · Saved · Location · States  → window.PulseScreens
(function () {
  const NS = window.PulseDesignSystem_3c2543;
  const { Logo, Button, Input, Switch, Checkbox, SegmentedControl, Select,
          Avatar, Tag, EventCard, DigestItem, EmptyState, EventCardSkeleton,
          LocationSwitcher, Toast } = NS;
  const I = window.PulseIcons;
  const { Eyebrow } = window.PulseShell;
  const D = window.PULSE_DATA;

  // ============================ ONBOARDING ============================
  function Onboarding({ onDone }) {
    const [step, setStep] = React.useState(0);
    const [picked, setPicked] = React.useState(["Live music", "Art", "Food"]);
    const [free, setFree] = React.useState(false);
    const [weekends, setWeekends] = React.useState(true);
    const [dist, setDist] = React.useState("3 miles");
    const [building, setBuilding] = React.useState(false);

    const toggle = (t) => setPicked((p) => p.includes(t) ? p.filter((x) => x !== t) : [...p, t]);
    const steps = ["Interests", "Home base", "Dealbreakers"];

    React.useEffect(() => {
      if (!building) return;
      const t = setTimeout(onDone, 2600);
      return () => clearTimeout(t);
    }, [building]);

    if (building) {
      return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "var(--space-7)", gap: "var(--space-5)" }}>
          <span className="pulse-build" style={{ color: "var(--text-strong)" }}><Logo size={40} showWordmark={false} /></span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-display-md)", color: "var(--text-strong)", letterSpacing: "var(--ls-display)", margin: 0 }}>Building your feed…</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "var(--fs-subtitle)", maxWidth: "30ch", margin: 0 }}>Ranking everything in your city around <b style={{ color: "var(--text-body)" }}>{picked.slice(0,3).join(", ").toLowerCase()}</b>.</p>
          <div style={{ width: "100%", maxWidth: "320px", display: "flex", flexDirection: "column", gap: "12px", marginTop: "var(--space-4)" }}>
            {[0,1].map((i) => <EventCardSkeleton key={i} />)}
          </div>
          <style>{`@keyframes pulse-beat{0%,100%{transform:scale(1);opacity:.85}50%{transform:scale(1.12);opacity:1}} .pulse-build{animation:pulse-beat 1.1s var(--ease-inout) infinite}`}</style>
        </div>
      );
    }

    return (
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "var(--space-6) var(--space-6) var(--space-4)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Logo size={24} />
            <button onClick={onDone} style={{ border: "none", background: "transparent", cursor: "pointer", fontFamily: "var(--font-condensed)", fontWeight: "var(--fw-semibold)", textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "var(--fs-xs)", color: "var(--text-muted)", padding: "8px" }}>Skip</button>
          </div>
          <div style={{ display: "flex", gap: "6px", marginTop: "var(--space-5)" }}>
            {steps.map((s, i) => (
              <div key={s} style={{ flex: 1, height: "3px", borderRadius: "2px", background: i <= step ? "var(--accent)" : "var(--border)" }} />
            ))}
          </div>
          <Eyebrow style={{ marginTop: "var(--space-3)" }}>{`Step ${step+1} of 3 · ${steps[step]}`}</Eyebrow>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "var(--space-2) var(--space-6) var(--space-6)" }}>
          {step === 0 && (
            <div>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-display-md)", color: "var(--text-strong)", letterSpacing: "var(--ls-display)", lineHeight: "var(--lh-tight)", margin: "var(--space-3) 0 var(--space-2)" }}>What are you into?</h1>
              <p style={{ color: "var(--text-muted)", margin: "0 0 var(--space-5)" }}>Pick a few. We rank — we don't lock you in.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {D.interests.map((t) => <Checkbox key={t} label={t} checked={picked.includes(t)} onChange={() => toggle(t)} />)}
              </div>
            </div>
          )}
          {step === 1 && (
            <div>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-display-md)", color: "var(--text-strong)", letterSpacing: "var(--ls-display)", lineHeight: "var(--lh-tight)", margin: "var(--space-3) 0 var(--space-2)" }}>Where's home base?</h1>
              <p style={{ color: "var(--text-muted)", margin: "0 0 var(--space-5)" }}>Set it once. Switch cities any time you travel.</p>
              <Input label="Home base" placeholder="Search a city or address" iconLeft={<I.Search size={18} />} defaultValue="Lisbon, Portugal" />
              <Eyebrow style={{ margin: "var(--space-5) 0 var(--space-3)" }}>Recent</Eyebrow>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {D.cities.slice(0,4).map((c) => <Tag key={c.id}>{c.name}</Tag>)}
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-display-md)", color: "var(--text-strong)", letterSpacing: "var(--ls-display)", lineHeight: "var(--lh-tight)", margin: "var(--space-3) 0 var(--space-2)" }}>Any dealbreakers?</h1>
              <p style={{ color: "var(--text-muted)", margin: "0 0 var(--space-5)" }}>Hard filters that <i>remove</i> events. You can change these later.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                <Row><Switch checked={free} onChange={setFree} label="Free events only" /></Row>
                <Row><Switch checked={weekends} onChange={setWeekends} label="Nights & weekends" /></Row>
                <div>
                  <Select label="Max distance" value={dist} onChange={(e) => setDist(e.target.value)} options={["1 mile","3 miles","5 miles","10 miles","Any"]} />
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: "var(--space-4) var(--space-6) var(--space-6)", borderTop: "1px solid var(--border)", display: "flex", gap: "var(--space-3)", background: "var(--surface-page)" }}>
          {step > 0 && <Button variant="ghost" onClick={() => setStep(step - 1)}>Back</Button>}
          <Button block loading={building} onClick={() => step < 2 ? setStep(step + 1) : setBuilding(true)}>
            {step < 2 ? "Continue" : "Build my feed"}
          </Button>
        </div>
      </div>
    );
  }
  const Row = ({ children }) => <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "var(--space-3) 0", borderBottom: "1px solid var(--border)" }}>{children}</div>;

  // ============================ PREFERENCES ============================
  function Preferences() {
    const [picked, setPicked] = React.useState(["Live music", "Art", "Food", "Film"]);
    const [free, setFree] = React.useState(false);
    const [weekends, setWeekends] = React.useState(true);
    const [boosts, setBoosts] = React.useState({ "Live music": "Boost", "Clubs": "Mute", "Comedy": "Normal", "Talks": "Boost" });
    const toggle = (t) => setPicked((p) => p.includes(t) ? p.filter((x) => x !== t) : [...p, t]);
    const setB = (k, v) => setBoosts((b) => ({ ...b, [k]: v }));

    return (
      <div style={{ padding: "var(--space-6)", maxWidth: "var(--content-max)", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-6)" }}>
          <Avatar name="Ana Ruiz" size={44} />
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-display-sm)", color: "var(--text-strong)", margin: 0, letterSpacing: "var(--ls-tight)" }}>For me</h1>
            <Eyebrow style={{ marginTop: "2px" }}>Tuning what surfaces</Eyebrow>
          </div>
        </div>

        <Section title="Interests" hint="Re-ranks your feed.">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {D.interests.map((t) => <Checkbox key={t} label={t} checked={picked.includes(t)} onChange={() => toggle(t)} />)}
          </div>
        </Section>

        <Section title="Dealbreakers" hint="Hard filters — these remove events.">
          <Row><Switch checked={free} onChange={setFree} label="Free events only" /></Row>
          <Row><Switch checked={weekends} onChange={setWeekends} label="Nights & weekends only" /></Row>
          <div style={{ paddingTop: "var(--space-3)" }}>
            <Select label="Max distance" options={["1 mile","3 miles","5 miles","10 miles","Any"]} defaultValue="3 miles" />
          </div>
        </Section>

        <Section title="Boost & mute" hint="Soft signals — these re-rank, they don't remove.">
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            {Object.keys(boosts).map((k) => (
              <div key={k} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-3)" }}>
                <span style={{ fontSize: "var(--fs-body)", color: "var(--text-body)" }}>{k}</span>
                <SegmentedControl size="sm" value={boosts[k]} onChange={(v) => setB(k, v)} options={["Mute","Normal","Boost"]} />
              </div>
            ))}
          </div>
        </Section>
      </div>
    );
  }
  const Section = ({ title, hint, children }) => (
    <section style={{ marginBottom: "var(--space-8)" }}>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-title)", color: "var(--text-strong)", margin: "0 0 4px" }}>{title}</h2>
      {hint && <p style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)", margin: "0 0 var(--space-4)" }}>{hint}</p>}
      {children}
    </section>
  );

  // ============================ DIGEST ============================
  function Digest({ onOpen }) {
    const [freq, setFreq] = React.useState("Daily");
    const [push, setPush] = React.useState(true);
    const items = D.events.slice(0, 5);
    return (
      <div style={{ padding: "var(--space-6)", maxWidth: "var(--content-max)", margin: "0 auto" }}>
        <Eyebrow>Thursday · 8:00am</Eyebrow>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-display-md)", color: "var(--text-strong)", letterSpacing: "var(--ls-display)", lineHeight: "var(--lh-tight)", margin: "var(--space-2) 0 var(--space-5)" }}>5 things you'll<br/>probably want</h1>
        <SegmentedControl value={freq} onChange={setFreq} options={["Daily","Weekly"]} />
        <div style={{ marginTop: "var(--space-5)" }}>
          {items.map((e, i) => <DigestItem key={e.id} index={i + 1} event={e} onOpen={() => onOpen(e)} />)}
        </div>
        <Section title="Notifications" hint="Push is reserved for high-relevance new drops.">
          <Row><Switch checked={push} onChange={setPush} label="New drops you'll probably want" /></Row>
          <div style={{ paddingTop: "var(--space-3)" }}>
            <Select label="Frequency" value={freq} onChange={(e) => setFreq(e.target.value)} options={["Real-time","Daily digest","Weekly digest","Off"]} />
          </div>
        </Section>
      </div>
    );
  }

  // ============================ SAVED ============================
  function Saved({ saved, events, onOpen, onSave, empty }) {
    const list = events.filter((e) => saved.has(e.id));
    if (empty || list.length === 0) {
      return <EmptyState glyph="saved" title="Nothing saved yet" body="Tap the bookmark on any event and it lands here — with a calendar export when you're ready." action={<Button variant="secondary">Browse the feed</Button>} />;
    }
    return (
      <div style={{ padding: "var(--space-6)", maxWidth: "var(--content-max)", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-5)" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-display-sm)", color: "var(--text-strong)", margin: 0 }}>Saved</h1>
          <Button variant="secondary" size="sm" iconLeft={<I.Download size={16} />}>Export .ics</Button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          {list.map((e) => <EventCard key={e.id} event={e} variant="compact" saved onSave={() => onSave(e.id)} onOpen={() => onOpen(e)} />)}
        </div>
      </div>
    );
  }

  // ============================ LOCATION PICKER ============================
  function LocationPicker({ cities, current, onPick, onClose }) {
    const [q, setQ] = React.useState("");
    const list = cities.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));
    return (
      <div style={{ position: "absolute", inset: 0, zIndex: 60, background: "var(--scrim)", display: "flex", flexDirection: "column", justifyContent: "flex-end" }} onClick={onClose}>
        <div onClick={(e) => e.stopPropagation()} style={{ background: "var(--surface-page)", borderTopLeftRadius: "var(--radius-xl)", borderTopRightRadius: "var(--radius-xl)", padding: "var(--space-5) var(--space-5) var(--space-7)", maxHeight: "80%", display: "flex", flexDirection: "column", boxShadow: "var(--shadow-4)" }}>
          <div style={{ width: "36px", height: "4px", borderRadius: "2px", background: "var(--border-strong)", margin: "0 auto var(--space-4)" }} />
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-title)", color: "var(--text-strong)", margin: "0 0 var(--space-3)" }}>Switch city</h2>
          <Input placeholder="Search any city" iconLeft={<I.Search size={18} />} value={q} onChange={(e) => setQ(e.target.value)} />
          <div style={{ overflowY: "auto", marginTop: "var(--space-3)" }}>
            {list.map((c) => (
              <button key={c.id} onClick={() => onPick(c)} style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", padding: "var(--space-4) var(--space-2)", border: "none", borderBottom: "1px solid var(--border)", background: "transparent", cursor: "pointer", textAlign: "left" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                  <span style={{ color: c.id === current ? "var(--text-strong)" : "var(--text-muted)" }}><I.Pin size={18} /></span>
                  <span>
                    <span style={{ display: "block", fontFamily: "var(--font-display)", fontSize: "var(--fs-subtitle)", color: "var(--text-strong)" }}>{c.name}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-muted)", letterSpacing: "0.04em", textTransform: "uppercase" }}>{c.country} · {c.count} events</span>
                  </span>
                </span>
                {c.id === current && <span style={{ color: "var(--text-strong)" }}><I.Check size={18} /></span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ============================ STATES GALLERY ============================
  function StatesGallery() {
    return (
      <div style={{ padding: "var(--space-6)", maxWidth: "var(--content-max)", margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-display-sm)", color: "var(--text-strong)", margin: 0 }}>States</h1>
        <StateFrame label="Cold-start · loading">
          <div style={{ padding: "var(--space-4)" }}>
            <LocationSwitcher city="Reykjavík" loading size="lg" />
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "var(--space-4)" }}>
              <EventCardSkeleton /><EventCardSkeleton />
            </div>
          </div>
        </StateFrame>
        <StateFrame label="Quiet city">
          <EmptyState glyph="quiet" title="A quiet week in Reykjavík" body="Only a few events match right now. We'll ping you the moment more drop." action={<Button variant="secondary" size="sm">Widen my filters</Button>} />
        </StateFrame>
        <StateFrame label="Empty · saved">
          <EmptyState glyph="saved" title="Nothing saved yet" body="Tap the bookmark on any event and it lands here." action={<Button variant="secondary" size="sm">Browse the feed</Button>} />
        </StateFrame>
        <StateFrame label="Error">
          <EmptyState glyph="error" title="We lost the signal" body="Couldn't reach a few sources. Your feed may be incomplete." action={<Button variant="secondary" size="sm" iconLeft={<I.Refresh size={16} />}>Try again</Button>} />
        </StateFrame>
        <StateFrame label="Toast">
          <div style={{ padding: "var(--space-6)", display: "flex", justifyContent: "center" }}>
            <Toast message="Saved to your list" actionLabel="Undo" icon={<I.Check size={16} />} />
          </div>
        </StateFrame>
      </div>
    );
  }
  const StateFrame = ({ label, children }) => (
    <div>
      <Eyebrow style={{ marginBottom: "var(--space-2)" }}>{label}</Eyebrow>
      <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", background: "var(--surface-card)", overflow: "hidden" }}>{children}</div>
    </div>
  );

  window.PulseScreens = { Onboarding, Preferences, Digest, Saved, LocationPicker, StatesGallery };
})();
