import { useState } from "react";
import { Input } from "../components/forms/Input";
import { Button } from "../components/core/Button";
import { User } from "../icons";

export function SignIn({ onContinue }: { onContinue: () => void }) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const go = () => {
    setBusy(true);
    setTimeout(onContinue, 800);
  };
  const Oauth = ({ label, mark }: { label: string; mark: string }) => (
    <button
      onClick={go}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-2)",
        width: "100%",
        height: "48px",
        background: "var(--surface-card)",
        border: "1px solid var(--border-strong)",
        borderRadius: "var(--radius-pill)",
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
        fontWeight: "var(--fw-semibold)",
        fontSize: "var(--fs-body)",
        color: "var(--text-strong)",
      }}
    >
      <span style={{ fontFamily: "var(--font-display)", fontSize: "18px", width: "20px", textAlign: "center" }}>{mark}</span>
      {label}
    </button>
  );
  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "var(--space-8) var(--space-6)", maxWidth: "26rem", margin: "0 auto" }}>
      <span style={{ color: "var(--text-strong)", marginBottom: "var(--space-7)" }}>
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21.6 C12 21.6 18.8 14.8 18.8 9 A6.8 6.8 0 1 0 5.2 9 C5.2 14.8 12 21.6 12 21.6 Z" />
          <circle cx="12" cy="8.8" r="1.5" fill="currentColor" stroke="none" />
          <path d="M14.7 6.1 a3.9 3.9 0 0 1 0 5.4" />
          <path d="M9.3 6.1 a3.9 3.9 0 0 0 0 5.4" />
        </svg>
      </span>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-display-md)", color: "var(--text-strong)", letterSpacing: "var(--ls-display)", lineHeight: "var(--lh-tight)", margin: "0 0 var(--space-2)" }}>
        Your city,
        <br />
        <em>ranked for you.</em>
      </h1>
      <p style={{ color: "var(--text-muted)", fontSize: "var(--fs-subtitle)", margin: "0 0 var(--space-6)" }}>
        One feed for everything happening — no walled gardens.
      </p>

      <Input label="Email" type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} iconLeft={<User size={18} />} style={{ marginBottom: "var(--space-3)" }} />
      <Button block size="lg" loading={busy} onClick={go}>
        Continue
      </Button>

      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", margin: "var(--space-6) 0" }}>
        <span style={{ flex: 1, height: "1px", background: "var(--border)" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", letterSpacing: "var(--ls-label)", textTransform: "uppercase", color: "var(--text-faint)" }}>or</span>
        <span style={{ flex: 1, height: "1px", background: "var(--border)" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
        <Oauth label="Continue with Apple" mark="" />
        <Oauth label="Continue with Google" mark="G" />
      </div>
      <p style={{ fontSize: "var(--fs-sm)", color: "var(--text-faint)", textAlign: "center", marginTop: "var(--space-6)", lineHeight: "var(--lh-normal)" }}>
        By continuing you agree to the Terms & Privacy Policy.
      </p>
    </div>
  );
}
