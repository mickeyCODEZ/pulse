import { useState } from "react";
import { events as allEvents } from "../data";
import type { PulseEvent } from "../data";
import { Switch } from "../components/forms/Switch";
import { Select } from "../components/forms/Select";
import { SegmentedControl } from "../components/forms/SegmentedControl";
import { DigestItem } from "../components/events/DigestItem";
import { Eyebrow } from "../shell/Eyebrow";
import { Section, Row } from "./ui-bits";

export function Digest({ onOpen, items: live }: { onOpen: (e: PulseEvent) => void; items?: PulseEvent[] }) {
  const [freq, setFreq] = useState("Daily");
  const [push, setPush] = useState(true);
  const items = (live && live.length ? live : allEvents).slice(0, 5);
  return (
    <div style={{ padding: "var(--space-6)", maxWidth: "var(--content-max)", margin: "0 auto" }}>
      <Eyebrow>Thursday · 8:00am</Eyebrow>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-display-md)", color: "var(--text-strong)", letterSpacing: "var(--ls-display)", lineHeight: "var(--lh-tight)", margin: "var(--space-2) 0 var(--space-5)" }}>
        5 things you'll
        <br />
        probably want
      </h1>
      <SegmentedControl value={freq} onChange={setFreq} options={["Daily", "Weekly"]} />
      <div style={{ marginTop: "var(--space-5)" }}>
        {items.map((e, i) => (
          <DigestItem key={e.id} index={i + 1} event={e} onOpen={() => onOpen(e)} />
        ))}
      </div>
      <Section title="Notifications" hint="Push is reserved for high-relevance new drops.">
        <Row>
          <Switch checked={push} onChange={setPush} label="New drops you'll probably want" />
        </Row>
        <div style={{ paddingTop: "var(--space-3)" }}>
          <Select label="Frequency" value={freq} onChange={(e) => setFreq(e.target.value)} options={["Real-time", "Daily digest", "Weekly digest", "Off"]} />
        </div>
      </Section>
    </div>
  );
}
