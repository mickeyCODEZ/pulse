import { useState } from "react";
import { events as allEvents } from "../data";
import type { PulseEvent } from "../data";
import { Switch } from "../components/forms/Switch";
import { SegmentedControl } from "../components/forms/SegmentedControl";
import { DigestItem } from "../components/events/DigestItem";
import { Eyebrow } from "../shell/Eyebrow";
import { Section, Row } from "./ui-bits";

// Notification settings are device-scoped (browser permission can't transfer
// across devices), so they persist in localStorage alongside saves + city.
const ls = (k: string, d: string) => {
  try {
    return localStorage.getItem("pulse." + k) ?? d;
  } catch {
    return d;
  }
};
const setLs = (k: string, v: string) => {
  try {
    localStorage.setItem("pulse." + k, v);
  } catch {
    /* storage blocked */
  }
};
const canNotify = () => typeof window !== "undefined" && "Notification" in window;

export function Digest({ onOpen, items: live }: { onOpen: (e: PulseEvent) => void; items?: PulseEvent[] }) {
  const items = (live && live.length ? live : allEvents).slice(0, 5);
  const [freq, setFreq] = useState(() => ls("notifyFreq", "Daily"));
  const [perm, setPerm] = useState<NotificationPermission>(() => (canNotify() ? Notification.permission : "denied"));
  // "On" only when the user opted in AND the browser actually granted permission.
  const [push, setPush] = useState(() => ls("notifyPush", "0") === "1" && canNotify() && Notification.permission === "granted");
  const [status, setStatus] = useState("");

  const changeFreq = (f: string) => {
    setFreq(f);
    setLs("notifyFreq", f);
  };

  // Real browser permission flow: enabling asks the browser, persists the choice,
  // and confirms with an actual notification so the toggle is never a no-op.
  const togglePush = async (next: boolean) => {
    if (!next) {
      setPush(false);
      setLs("notifyPush", "0");
      setStatus("");
      return;
    }
    if (!canNotify()) {
      setStatus("This browser doesn't support notifications.");
      return;
    }
    let p = Notification.permission;
    if (p === "default") p = await Notification.requestPermission();
    setPerm(p);
    if (p === "granted") {
      setPush(true);
      setLs("notifyPush", "1");
      setStatus("");
      new Notification("Pulse notifications on", { body: "We'll ping you when a high-match event drops." });
    } else {
      setPush(false);
      setLs("notifyPush", "0");
      setStatus("Notifications are blocked — enable them in your browser settings.");
    }
  };

  const sendTest = () => {
    if (canNotify() && Notification.permission === "granted") {
      new Notification("A new drop you'll probably want", {
        body: items[0] ? items[0].title : "Tap to see what's on tonight.",
      });
    }
  };

  return (
    <div style={{ padding: "var(--space-6)", maxWidth: "var(--content-max)", margin: "0 auto" }}>
      <Eyebrow>Thursday · 8:00am</Eyebrow>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-display-md)", color: "var(--text-strong)", letterSpacing: "var(--ls-display)", lineHeight: "var(--lh-tight)", margin: "var(--space-2) 0 var(--space-5)" }}>
        5 things you'll
        <br />
        probably want
      </h1>
      <SegmentedControl value={freq} onChange={changeFreq} options={["Daily", "Weekly"]} />
      <div style={{ marginTop: "var(--space-5)" }}>
        {items.map((e, i) => (
          <DigestItem key={e.id} index={i + 1} event={e} onOpen={() => onOpen(e)} />
        ))}
      </div>
      <Section title="Notifications" hint="Push is reserved for high-relevance new drops.">
        <Row>
          <Switch checked={push} onChange={togglePush} label="New drops you'll probably want" disabled={perm === "denied"} />
        </Row>
        {push && perm === "granted" && (
          <div style={{ paddingTop: "var(--space-4)" }}>
            <button
              onClick={sendTest}
              style={{
                padding: "8px 16px", borderRadius: "var(--radius-pill)", cursor: "pointer",
                border: "1px solid var(--border-strong)", background: "var(--surface-card)",
                color: "var(--text-strong)", fontSize: "var(--fs-sm)", fontWeight: "var(--fw-medium)",
              }}
            >
              Send a test notification
            </button>
          </div>
        )}
        {(status || perm === "denied") && (
          <p style={{ marginTop: "var(--space-3)", fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>
            {status || "Notifications are blocked in your browser settings."}
          </p>
        )}
      </Section>
    </div>
  );
}
