import type { CSSProperties, ReactNode } from "react";

export interface NavItem {
  key: string;
  label: string;
  icon: ReactNode;
  badge?: number;
}

export interface BottomNavProps {
  items?: NavItem[];
  active?: string;
  onSelect?: (key: string) => void;
  style?: CSSProperties;
}

/**
 * Mobile bottom navigation. Five slots max. Active slot shows the ink mark +
 * label; others are muted. Honors safe-area inset.
 */
export function BottomNav({ items = [], active, onSelect, style }: BottomNavProps) {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "stretch",
        height: "var(--bottomnav-h)",
        paddingBottom: "env(safe-area-inset-bottom, 0)",
        background: "color-mix(in srgb, var(--surface-card) 92%, transparent)",
        backdropFilter: "blur(var(--blur-md))",
        WebkitBackdropFilter: "blur(var(--blur-md))",
        borderTop: "1px solid var(--border)",
        ...style,
      }}
    >
      {items.map((it) => {
        const on = it.key === active;
        return (
          <button
            key={it.key}
            onClick={() => onSelect && onSelect(it.key)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "3px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: on ? "var(--text-strong)" : "var(--text-faint)",
              position: "relative",
              transition: "color var(--dur-2) var(--ease-out)",
            }}
          >
            <span style={{ display: "flex", position: "relative" }}>
              {it.icon}
              {it.badge && (
                <span
                  style={{
                    position: "absolute",
                    top: "-3px",
                    right: "-6px",
                    width: "7px",
                    height: "7px",
                    borderRadius: "var(--radius-pill)",
                    background: "var(--accent)",
                    border: "1.5px solid var(--surface-card)",
                  }}
                />
              )}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontWeight: on ? "var(--fw-semibold)" : "var(--fw-regular)",
              }}
            >
              {it.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
