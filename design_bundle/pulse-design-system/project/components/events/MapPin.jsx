import React from "react";

/**
 * Map marker for the desktop map panel. Shows a price (or "Free") in a pill,
 * or a bare dot for low-emphasis points. `selected` and `gem` change emphasis.
 */
export function MapPin({ label, free = false, selected = false, gem = false, dot = false, onClick, style, ...rest }) {
  if (dot) {
    return (
      <button onClick={onClick} aria-label={label} style={{
        width: "12px", height: "12px", padding: 0, borderRadius: "var(--radius-pill)",
        border: "2px solid var(--surface-page)", cursor: "pointer",
        background: selected ? "var(--accent)" : "var(--text-muted)",
        boxShadow: "var(--shadow-1)", ...style,
      }} {...rest} />
    );
  }
  const text = free ? "Free" : label;
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: "5px",
      padding: "4px 10px", cursor: "pointer",
      fontFamily: "var(--font-mono)", fontWeight: "var(--fw-semibold)", fontSize: "var(--fs-xs)",
      borderRadius: "var(--radius-pill)",
      background: selected ? "var(--accent)" : "var(--surface-card)",
      color: selected ? "var(--accent-fg)" : "var(--text-strong)",
      border: `1px solid ${selected ? "var(--accent)" : "var(--border-strong)"}`,
      boxShadow: selected ? "var(--shadow-3)" : "var(--shadow-1)",
      transform: selected ? "scale(1.06)" : "scale(1)",
      transition: "all var(--dur-2) var(--ease-out)",
      position: "relative", ...style,
    }} {...rest}>
      {gem && (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l2.5 5.2 5.5.6-4 3.8 1 5.4L12 17l-5 2.8 1-5.4-4-3.8 5.5-.6z" />
        </svg>
      )}
      {text}
    </button>
  );
}
