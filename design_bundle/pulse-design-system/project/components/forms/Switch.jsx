import React from "react";

/**
 * On/off switch. Used for dealbreakers (free-only, nights & weekends) and
 * notification toggles. Track fills with ink when on.
 */
export function Switch({ checked = false, onChange, disabled = false, label, style, ...rest }) {
  const toggle = () => { if (!disabled && onChange) onChange(!checked); };
  return (
    <span
      role="switch"
      aria-checked={checked}
      onClick={toggle}
      style={{
        display: "inline-flex", alignItems: "center", gap: "var(--space-3)",
        cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1,
        ...style,
      }}
      {...rest}
    >
      <span style={{
        position: "relative", width: "44px", height: "26px", flex: "0 0 auto",
        borderRadius: "var(--radius-pill)",
        background: checked ? "var(--accent)" : "var(--surface-raised)",
        border: `1px solid ${checked ? "var(--accent)" : "var(--border-strong)"}`,
        transition: "background var(--dur-2) var(--ease-out), border-color var(--dur-2)",
      }}>
        <span style={{
          position: "absolute", top: "2px", left: checked ? "20px" : "2px",
          width: "20px", height: "20px", borderRadius: "var(--radius-pill)",
          background: checked ? "var(--accent-fg)" : "var(--surface-card)",
          boxShadow: "var(--shadow-1)",
          transition: "left var(--dur-2) var(--ease-spring)",
        }} />
      </span>
      {label && <span style={{ fontSize: "var(--fs-body)", color: "var(--text-body)" }}>{label}</span>}
    </span>
  );
}
