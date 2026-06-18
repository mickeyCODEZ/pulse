import React from "react";

/**
 * Desktop left-rail navigation. Vertical list of destinations with the active
 * item marked by an ink bar + fill. Pairs with the 3-zone shell.
 */
export function SidebarNav({ items = [], active, onSelect, footer, style, ...rest }) {
  return (
    <nav
      style={{ display: "flex", flexDirection: "column", gap: "2px", ...style }}
      {...rest}
    >
      {items.map((it) => {
        const on = it.key === active;
        return (
          <button
            key={it.key}
            onClick={() => onSelect && onSelect(it.key)}
            style={{
              display: "flex", alignItems: "center", gap: "var(--space-3)",
              height: "42px", padding: "0 var(--space-3)", width: "100%",
              border: "none", borderRadius: "var(--radius-md)", cursor: "pointer",
              background: on ? "var(--accent-soft)" : "transparent",
              color: on ? "var(--text-strong)" : "var(--text-muted)",
              fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)",
              fontWeight: on ? "var(--fw-semibold)" : "var(--fw-medium)",
              position: "relative", textAlign: "left",
              transition: "background var(--dur-2) var(--ease-out), color var(--dur-2)",
            }}
            onMouseEnter={(e) => { if (!on) e.currentTarget.style.background = "var(--surface-raised)"; }}
            onMouseLeave={(e) => { if (!on) e.currentTarget.style.background = "transparent"; }}
          >
            {on && <span style={{
              position: "absolute", left: 0, top: "9px", bottom: "9px", width: "3px",
              borderRadius: "var(--radius-pill)", background: "var(--accent)",
            }} />}
            <span style={{ display: "flex", flex: "0 0 auto" }}>{it.icon}</span>
            <span style={{ flex: 1 }}>{it.label}</span>
            {it.badge && (
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)",
                background: "var(--accent)", color: "var(--accent-fg)",
                padding: "1px 6px", borderRadius: "var(--radius-pill)",
              }}>{it.badge}</span>
            )}
          </button>
        );
      })}
      {footer && <div style={{ marginTop: "auto" }}>{footer}</div>}
    </nav>
  );
}
