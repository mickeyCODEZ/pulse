import React from "react";

/**
 * Native select styled to the Pulse field. Used for sort order, frequency,
 * distance units.
 */
export function Select({ label, value, onChange, options = [], size = "md", style, ...rest }) {
  const h = size === "sm" ? "38px" : "44px";
  return (
    <label style={{ display: "block", ...style }}>
      {label && (
        <span style={{
          display: "block", marginBottom: "6px",
          fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)",
          letterSpacing: "var(--ls-label)", textTransform: "uppercase",
          color: "var(--text-muted)",
        }}>{label}</span>
      )}
      <span style={{ position: "relative", display: "block" }}>
        <select
          value={value}
          onChange={onChange}
          style={{
            appearance: "none", WebkitAppearance: "none",
            width: "100%", height: h, padding: "0 38px 0 var(--space-4)",
            background: "var(--surface-card)",
            border: "1px solid var(--border-strong)", borderRadius: "var(--radius-md)",
            fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)", color: "var(--text-strong)",
            cursor: "pointer",
          }}
          {...rest}
        >
          {options.map((o) => {
            const val = typeof o === "string" ? o : o.value;
            const lbl = typeof o === "string" ? o : o.label;
            return <option key={val} value={val}>{lbl}</option>;
          })}
        </select>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </span>
    </label>
  );
}
