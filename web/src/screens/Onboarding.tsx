import { useEffect, useState } from "react";
import { interests, type City } from "../data";
import { Logo } from "../components/core/Logo";
import { Button } from "../components/core/Button";
import { Switch } from "../components/forms/Switch";
import { Select } from "../components/forms/Select";
import { Checkbox } from "../components/forms/Checkbox";
import { CitySearch } from "../components/search/CitySearch";
import { EventCardSkeleton } from "../components/feedback/Skeleton";
import { Eyebrow } from "../shell/Eyebrow";
import { Row } from "./ui-bits";

const titleStyle = {
  fontFamily: "var(--font-display)",
  fontSize: "var(--fs-display-md)",
  color: "var(--text-strong)",
  letterSpacing: "var(--ls-display)",
  lineHeight: "var(--lh-tight)",
  margin: "var(--space-3) 0 var(--space-2)",
} as const;

export function Onboarding({
  onDone,
  onComplete,
  cityList = [],
  onPickCity,
}: {
  onDone: () => void;
  onComplete?: (patch: Record<string, unknown>) => void;
  cityList?: City[];
  onPickCity?: (c: City) => void;
}) {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<string[]>(["Live music", "Art", "Food"]);
  const [home, setHome] = useState<City | null>(null);
  const [free, setFree] = useState(false);
  const [weekends, setWeekends] = useState(true);
  const [dist, setDist] = useState("3 miles");
  const [building, setBuilding] = useState(false);

  const toggle = (t: string) => setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));
  const steps = ["Interests", "Home base", "Dealbreakers"];

  const finish = () => {
    // Set the chosen home city as the active city (loads its feed + syncs to the
    // backend profile); fall back to including it in the profile patch directly.
    if (home && onPickCity) onPickCity(home);
    onComplete?.({
      ...(home ? { home_base_city: home.name, home_lat: home.lat, home_lng: home.lng } : {}),
      interest_tags: picked,
      dealbreakers: {
        free_only: free,
        nights_weekends: weekends,
        max_distance_km: Math.round((parseFloat(dist) || 3) * 1.609),
      },
    });
    setBuilding(true);
  };

  useEffect(() => {
    if (!building) return;
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, [building, onDone]);

  if (building) {
    return (
      <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "var(--space-7)", gap: "var(--space-5)" }}>
        <span className="pulse-build" style={{ color: "var(--text-strong)" }}>
          <Logo size={40} showWordmark={false} />
        </span>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-display-md)", color: "var(--text-strong)", letterSpacing: "var(--ls-display)", margin: 0 }}>
          Building your feed…
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "var(--fs-subtitle)", maxWidth: "30ch", margin: 0 }}>
          Ranking everything in your city around{" "}
          <b style={{ color: "var(--text-body)" }}>{picked.slice(0, 3).join(", ").toLowerCase()}</b>.
        </p>
        <div style={{ width: "100%", maxWidth: "320px", display: "flex", flexDirection: "column", gap: "12px", marginTop: "var(--space-4)" }}>
          {[0, 1].map((i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
        <style>{`@keyframes pulse-beat{0%,100%{transform:scale(1);opacity:.85}50%{transform:scale(1.12);opacity:1}} .pulse-build{animation:pulse-beat 1.1s var(--ease-inout) infinite}
          @media (prefers-reduced-motion: reduce){.pulse-build{animation:none}}`}</style>
      </div>
    );
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "var(--space-6) var(--space-6) var(--space-4)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Logo size={24} />
          <button
            onClick={onDone}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontFamily: "var(--font-condensed)",
              fontWeight: "var(--fw-semibold)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontSize: "var(--fs-xs)",
              color: "var(--text-muted)",
              padding: "8px",
            }}
          >
            Skip
          </button>
        </div>
        <div style={{ display: "flex", gap: "6px", marginTop: "var(--space-5)" }}>
          {steps.map((s, i) => (
            <div key={s} style={{ flex: 1, height: "3px", borderRadius: "2px", background: i <= step ? "var(--accent)" : "var(--border)" }} />
          ))}
        </div>
        <Eyebrow style={{ marginTop: "var(--space-3)" }}>{`Step ${step + 1} of 3 · ${steps[step]}`}</Eyebrow>
      </div>

      <div className="pulse-scroll" style={{ flex: 1, overflowY: "auto", padding: "var(--space-2) var(--space-6) var(--space-6)" }}>
        {step === 0 && (
          <div>
            <h1 style={titleStyle}>What are you into?</h1>
            <p style={{ color: "var(--text-muted)", margin: "0 0 var(--space-5)" }}>Pick a few. We rank — we don't lock you in.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {interests.map((t) => (
                <Checkbox key={t} label={t} checked={picked.includes(t)} onChange={() => toggle(t)} />
              ))}
            </div>
          </div>
        )}
        {step === 1 && (
          <div>
            <h1 style={titleStyle}>Where's home base?</h1>
            <p style={{ color: "var(--text-muted)", margin: "0 0 var(--space-5)" }}>Set it once. Switch cities any time you travel.</p>
            <CitySearch
              cityList={cityList}
              size="md"
              placeholder="Search a city — Toronto, Lisbon, Tokyo…"
              onPick={(c) => {
                setHome(c);
                setStep(2);
              }}
            />
            {home && (
              <p style={{ marginTop: "var(--space-4)", fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>
                Home base: <b style={{ color: "var(--text-strong)" }}>{[home.name, home.country].filter(Boolean).join(", ")}</b>
              </p>
            )}
          </div>
        )}
        {step === 2 && (
          <div>
            <h1 style={titleStyle}>Any dealbreakers?</h1>
            <p style={{ color: "var(--text-muted)", margin: "0 0 var(--space-5)" }}>
              Hard filters that <i>remove</i> events. You can change these later.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <Row>
                <Switch checked={free} onChange={setFree} label="Free events only" />
              </Row>
              <Row>
                <Switch checked={weekends} onChange={setWeekends} label="Nights & weekends" />
              </Row>
              <div>
                <Select label="Max distance" value={dist} onChange={(e) => setDist(e.target.value)} options={["1 mile", "3 miles", "5 miles", "10 miles", "Any"]} />
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: "var(--space-4) var(--space-6) var(--space-6)", borderTop: "1px solid var(--border)", display: "flex", gap: "var(--space-3)", background: "var(--surface-page)" }}>
        {step > 0 && (
          <Button variant="ghost" onClick={() => setStep(step - 1)}>
            Back
          </Button>
        )}
        <Button block loading={building} onClick={() => (step < 2 ? setStep(step + 1) : finish())}>
          {step < 2 ? "Continue" : "Build my feed"}
        </Button>
      </div>
    </div>
  );
}
