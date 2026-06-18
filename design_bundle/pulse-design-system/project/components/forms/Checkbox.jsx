import React from "react";

/**
 * Selectable interest token used in onboarding & preferences. Tap to toggle;
 * selected state inverts to ink fill with a check.
 */
export function Checkbox({ checked = false, onChange, label, style, ...rest }) {
  return (
    <button
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange && onChange(!checked)}
      style={{
        display: "inline-flex", alignItems: "center", gap: "var(--space-2)",
        height: "44px", padding: "0 var(--space-4)",
        background: checked ? "var(--accent)" : "var(--surface-card)",
        color: checked ? "var(--accent-fg)" : "var(--text-body)",
        border: `1px solid ${checked ? "var(--accent)" : "var(--border-strong)"}`,
        borderRadius: "var(--radius-pill)",
        fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)", fontWeight: "var(--fw-medium)",
        cursor: "pointer",
        transition: "background var(--dur-2) var(--ease-out), color var(--dur-2), border-color var(--dur-2)",
        ...style,
      }}
      {...rest}
    >
      <span style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: "18px", height: "18px", flex: "0 0 auto",
      }}>
        {checked ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" opacity="0.55" /></svg>
        )}
      </span>
      {label}
    </button>
  );
}
