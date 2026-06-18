import { useEffect, useRef, useState } from "react";
import { interests } from "../data";
import { api } from "../api";
import { Avatar } from "../components/core/Avatar";
import { Switch } from "../components/forms/Switch";
import { Select } from "../components/forms/Select";
import { Checkbox } from "../components/forms/Checkbox";
import { SegmentedControl } from "../components/forms/SegmentedControl";
import { Eyebrow } from "../shell/Eyebrow";
import { Section, Row } from "./ui-bits";

export function Preferences({ onSave }: { onSave?: (patch: Record<string, unknown>) => void }) {
  const [picked, setPicked] = useState<string[]>(["Live music", "Art", "Food", "Film"]);
  const [free, setFree] = useState(false);
  const [weekends, setWeekends] = useState(true);
  const [boosts, setBoosts] = useState<Record<string, string>>({
    "Live music": "Boost",
    Clubs: "Mute",
    Comedy: "Normal",
    Talks: "Boost",
  });
  const toggle = (t: string) => setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));
  const setB = (k: string, v: string) => setBoosts((b) => ({ ...b, [k]: v }));

  const [dist, setDist] = useState("3 miles");

  // Load the REAL stored profile first (so we don't clobber it with UI defaults),
  // then push debounced changes back so the feed re-ranks.
  const hydrated = useRef(false);
  useEffect(() => {
    let cancelled = false;
    api
      .getProfile()
      .then((p) => {
        if (cancelled || !p) return;
        if (Array.isArray(p.interest_tags)) setPicked(p.interest_tags as string[]);
        const db = (p.dealbreakers as Record<string, unknown>) || {};
        setFree(!!db.free_only);
        setWeekends(db.nights_weekends !== false);
        if (typeof db.max_distance_km === "number") {
          const mi = Math.round((db.max_distance_km as number) / 1.609);
          setDist([1, 3, 5, 10].includes(mi) ? `${mi} mile${mi > 1 ? "s" : ""}` : "Any");
        }
        if (p.boosts && typeof p.boosts === "object") setBoosts((b) => ({ ...b, ...(p.boosts as Record<string, string>) }));
      })
      .catch(() => {})
      .finally(() => {
        hydrated.current = true;
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    const t = setTimeout(() => {
      const km = dist === "Any" ? 9999 : Math.round((parseFloat(dist) || 3) * 1.609);
      onSave?.({
        interest_tags: picked,
        dealbreakers: { free_only: free, nights_weekends: weekends, max_distance_km: km },
        boosts: Object.fromEntries(Object.entries(boosts).filter(([, v]) => v !== "Normal")),
      });
    }, 600);
    return () => clearTimeout(t);
  }, [picked, free, weekends, boosts, dist, onSave]);

  return (
    <div style={{ padding: "var(--space-6)", maxWidth: "var(--content-max)", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-6)" }}>
        <Avatar name="Ana Ruiz" size={44} />
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-display-sm)", color: "var(--text-strong)", margin: 0, letterSpacing: "var(--ls-tight)" }}>
            For me
          </h1>
          <Eyebrow style={{ marginTop: "2px" }}>Tuning what surfaces</Eyebrow>
        </div>
      </div>

      <Section title="Interests" hint="Re-ranks your feed.">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {interests.map((t) => (
            <Checkbox key={t} label={t} checked={picked.includes(t)} onChange={() => toggle(t)} />
          ))}
        </div>
      </Section>

      <Section title="Dealbreakers" hint="Hard filters — these remove events.">
        <Row>
          <Switch checked={free} onChange={setFree} label="Free events only" />
        </Row>
        <Row>
          <Switch checked={weekends} onChange={setWeekends} label="Nights & weekends only" />
        </Row>
        <div style={{ paddingTop: "var(--space-3)" }}>
          <Select label="Max distance" options={["1 mile", "3 miles", "5 miles", "10 miles", "Any"]} value={dist} onChange={(e) => setDist(e.target.value)} />
        </div>
      </Section>

      <Section title="Boost & mute" hint="Soft signals — these re-rank, they don't remove.">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          {Object.keys(boosts).map((k) => (
            <div key={k} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-3)" }}>
              <span style={{ fontSize: "var(--fs-body)", color: "var(--text-body)" }}>{k}</span>
              <SegmentedControl size="sm" value={boosts[k]} onChange={(v) => setB(k, v)} options={["Mute", "Normal", "Boost"]} />
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
