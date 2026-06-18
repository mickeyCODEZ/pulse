import React from "react";

/**
 * Single filter chip. Toggles between hairline (off) and ink-fill (on).
 * Optional leading icon and trailing count.
 */
export function FilterChip({ children, active = false, icon, count, onClick, style, ...rest }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        height: "40px", padding: "0 var(--space-4)", flex: "0 0 auto",
        backgroundColor: active ? "var(--accent)" : "var(--surface-card)",
        color: active ? "var(--accent-fg)" : "var(--text-body)",
        border: `1px solid ${active ? "var(--accent)" : "var(--border-strong)"}`,
        borderRadius: "var(--radius-pill)",
        fontFamily: "var(--font-condensed)", fontSize: "var(--fs-sm)", fontWeight: "var(--fw-medium)", textTransform: "uppercase", letterSpacing: "0.05em",
        whiteSpace: "nowrap", cursor: "pointer",
        transition: "background-color var(--dur-2) var(--ease-out), color var(--dur-2), border-color var(--dur-2)",
        ...style,
      }}
      {...rest}
    >
      {icon && <span style={{ display: "flex" }}>{icon}</span>}
      {children}
      {count != null && (
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)",
          opacity: 0.7, marginLeft: "2px",
        }}>{count}</span>
      )}
    </button>
  );
}
