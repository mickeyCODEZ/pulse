import { useState, type ReactNode } from "react";
import type { City } from "../data";
import { Avatar } from "../components/core/Avatar";
import { Badge } from "../components/core/Badge";
import { Button } from "../components/core/Button";
import { SegmentedControl } from "../components/forms/SegmentedControl";
import {
  Sparkles, Pin, Sliders, Bell, Heart, ChevronRight,
} from "../icons";
import { Eyebrow } from "../shell/Eyebrow";
import { api } from "../api";

function Row({ icon, label, value, onClick, last }: { icon: ReactNode; label: string; value?: string; onClick?: () => void; last?: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        gap: "var(--space-3)",
        padding: "var(--space-4) var(--space-2)",
        background: "transparent",
        border: "none",
        borderBottom: last ? "none" : "1px solid var(--border)",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <span style={{ color: "var(--text-muted)", display: "flex" }}>{icon}</span>
      <span style={{ flex: 1, fontSize: "var(--fs-body)", color: "var(--text-strong)", fontWeight: "var(--fw-medium)" }}>{label}</span>
      {value && <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-muted)", letterSpacing: "0.02em" }}>{value}</span>}
      <span style={{ color: "var(--text-faint)", display: "flex" }}>
        <ChevronRight size={18} />
      </span>
    </button>
  );
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ marginBottom: "var(--space-6)" }}>
      <Eyebrow style={{ marginBottom: "var(--space-2)" }}>{title}</Eyebrow>
      <div style={{ background: "var(--surface-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "0 var(--space-4)" }}>
        {children}
      </div>
    </section>
  );
}

export interface AccountProps {
  theme: string;
  setTheme: (t: string) => void;
  onNavigate?: (route: string) => void;
  city: City;
  account?: string | null; // logged-in email, or null
  onAuthChange?: (email: string | null) => void;
}

export function Account({ theme, setTheme, onNavigate, city, account, onAuthChange }: AccountProps) {
  const [email, setEmail] = useState("");
  const [waitState, setWaitState] = useState<"idle" | "sending" | "done" | "error">("idle");
  // Auth form
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPw, setAuthPw] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  const [authErr, setAuthErr] = useState("");
  const submitWaitlist = async () => {
    if (waitState === "sending") return;
    setWaitState("sending");
    try {
      await api.waitlist(email.trim());
      setWaitState("done");
    } catch {
      setWaitState("error");
    }
  };
  const submitAuth = async () => {
    if (authBusy) return;
    setAuthBusy(true);
    setAuthErr("");
    try {
      const r = mode === "signup"
        ? await api.signup(authEmail.trim(), authPw)
        : await api.login(authEmail.trim(), authPw);
      setAuthPw("");
      onAuthChange?.(r.email);
    } catch (e) {
      setAuthErr(mode === "signup" ? "Couldn't sign up — that email may be taken, or use a longer password." : "Wrong email or password.");
    } finally {
      setAuthBusy(false);
    }
  };
  const logout = async () => {
    await api.logout();
    onAuthChange?.(null);
  };

  return (
    <div style={{ padding: "var(--space-6)", maxWidth: "var(--content-max)", margin: "0 auto" }}>
      {/* identity */}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
        <Avatar name={account || "You"} size={60} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-display-sm)", color: "var(--text-strong)", margin: "0 0 2px", letterSpacing: "var(--ls-tight)", overflow: "hidden", textOverflow: "ellipsis" }}>
            {account || "You"}
          </h1>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-muted)" }}>
            {account ? "Signed in — saves sync across your devices" : "Browsing anonymously — saves live on this device"}
          </div>
        </div>
        <Badge tone="neutral">Free</Badge>
      </div>

      {/* auth: sign in / up to sync saves, or log out */}
      <section style={{ marginBottom: "var(--space-7)" }}>
        <Eyebrow style={{ marginBottom: "var(--space-3)" }}>{account ? "Account" : "Save across devices"}</Eyebrow>
        <div style={{ background: "var(--surface-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "var(--space-5)" }}>
          {account ? (
            <Button variant="secondary" block onClick={logout}>Log out</Button>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); void submitAuth(); }} style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "var(--fs-sm)" }}>
                {mode === "signup" ? "Create an account to keep your saved events on every device." : "Log in to sync your saved events."}
              </p>
              <input type="email" required autoComplete="email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} placeholder="you@email.com" aria-label="Email"
                style={{ padding: "10px 12px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-strong)", background: "var(--surface-page)", color: "var(--text-strong)", fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)" }} />
              <input type="password" required autoComplete={mode === "signup" ? "new-password" : "current-password"} value={authPw} onChange={(e) => setAuthPw(e.target.value)} placeholder="Password (6+ characters)" aria-label="Password"
                style={{ padding: "10px 12px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-strong)", background: "var(--surface-page)", color: "var(--text-strong)", fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)" }} />
              {authErr && <div style={{ color: "var(--danger, #b00)", fontSize: "var(--fs-sm)" }}>{authErr}</div>}
              <Button type="submit" variant="primary" block loading={authBusy}>{mode === "signup" ? "Create account" : "Log in"}</Button>
              <button type="button" onClick={() => { setMode(mode === "signup" ? "login" : "signup"); setAuthErr(""); }}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: "var(--fs-sm)", textDecoration: "underline" }}>
                {mode === "signup" ? "Already have an account? Log in" : "New here? Create an account"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Pro waitlist (real email capture — no fake billing) */}
      <div
        style={{
          overflow: "hidden",
          background: "var(--surface-inverse)",
          color: "var(--text-inverse)",
          borderRadius: "var(--radius-lg)",
          padding: "var(--space-5)",
          marginBottom: "var(--space-7)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          <Sparkles size={18} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", letterSpacing: "var(--ls-label)", textTransform: "uppercase", opacity: 0.85 }}>
            Pulse+ · coming soon
          </span>
        </div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-title)", marginBottom: "4px" }}>Unlimited cities & instant drops</div>
        <div style={{ fontSize: "var(--fs-sm)", opacity: 0.75, marginBottom: "var(--space-4)", maxWidth: "44ch" }}>
          Real-time alerts the moment a high-match event is found — anywhere you travel. Join the waitlist to hear first.
        </div>
        {waitState === "done" ? (
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)" }}>✓ You're on the list. Thanks!</div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); void submitWaitlist(); }}
            style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              aria-label="Email for the Pulse+ waitlist"
              style={{
                flex: "1 1 200px", minWidth: 0, padding: "9px 12px", borderRadius: "var(--radius-pill)",
                border: "1px solid color-mix(in srgb, var(--text-inverse) 30%, transparent)",
                background: "color-mix(in srgb, var(--text-inverse) 8%, transparent)",
                color: "var(--text-inverse)", fontFamily: "var(--font-sans)", fontSize: "var(--fs-sm)",
              }}
            />
            <Button
              type="submit"
              variant="secondary"
              size="sm"
              style={{ background: "var(--text-inverse)", color: "var(--surface-inverse)", borderColor: "var(--text-inverse)" }}
            >
              {waitState === "sending" ? "Joining…" : "Join waitlist"}
            </Button>
          </form>
        )}
        {waitState === "error" && (
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", marginTop: "8px", opacity: 0.85 }}>
            Couldn't save that — check the address and try again.
          </div>
        )}
      </div>

      <Group title="Personalization">
        <Row icon={<Sliders size={18} />} label="For me — interests & ranking" onClick={() => onNavigate && onNavigate("me")} />
        <Row icon={<Bell size={18} />} label="Notifications & digest" onClick={() => onNavigate && onNavigate("digest")} />
        <Row icon={<Pin size={18} />} label="Home city" value={city ? city.name : "Lisbon"} last />
      </Group>

      <section style={{ marginBottom: "var(--space-6)" }}>
        <Eyebrow style={{ marginBottom: "var(--space-2)" }}>Appearance</Eyebrow>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--surface-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "var(--space-4)" }}>
          <span style={{ fontSize: "var(--fs-body)", color: "var(--text-strong)", fontWeight: "var(--fw-medium)" }}>Theme</span>
          <SegmentedControl
            size="sm"
            value={theme}
            onChange={setTheme}
            options={[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
            ]}
          />
        </div>
      </section>

      <Group title="About">
        <Row icon={<Heart size={18} />} label="Privacy: no account, saves stay on your device" last />
      </Group>

      <p style={{ textAlign: "center", fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-faint)", marginTop: "var(--space-4)", letterSpacing: "0.04em" }}>
        PULSE · v1.0 · WE SEND YOU TO THE SOURCE
      </p>
    </div>
  );
}
