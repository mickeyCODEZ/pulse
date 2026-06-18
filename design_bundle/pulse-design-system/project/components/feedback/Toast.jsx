import React from "react";

/**
 * Lightweight transient notice — confirms saves/dismisses and "added to
 * calendar". Ink surface, optional undo action. Auto-styled; you control
 * mount/unmount.
 */
export function Toast({ message, actionLabel, onAction, icon, style, ...rest }) {
  return (
    <div
      role="status"
      style={{
        display: "inline-flex", alignItems: "center", gap: "var(--space-3)",
        padding: "var(--space-3) var(--space-3) var(--space-3) var(--space-4)",
        background: "var(--surface-inverse)", color: "var(--text-inverse)",
        borderRadius: "var(--radius-pill)",
        boxShadow: "var(--shadow-3)",
        fontFamily: "var(--font-sans)", fontSize: "var(--fs-sm)", fontWeight: "var(--fw-medium)",
        ...style,
      }}
      {...rest}
    >
      {icon && <span style={{ display: "flex", opacity: 0.85 }}>{icon}</span>}
      <span>{message}</span>
      {actionLabel && (
        <button
          onClick={onAction}
          style={{
            border: "1px solid color-mix(in srgb, var(--text-inverse) 32%, transparent)",
            background: "transparent", color: "var(--text-inverse)",
            fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)",
            letterSpacing: "var(--ls-label)", textTransform: "uppercase",
            padding: "6px 12px", borderRadius: "var(--radius-pill)", cursor: "pointer",
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
