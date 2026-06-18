import type { CSSProperties } from "react";

type Option = string | { value: string; label: string };

export interface SegmentedControlProps {
  options?: Option[];
  value?: string;
  onChange?: (value: string) => void;
  size?: "sm" | "md";
  style?: CSSProperties;
}

/**
 * Segmented control for 2–4 mutually-exclusive options — the boost/mute
 * tri-state and time-window pickers in Preferences.
 */
export function SegmentedControl({
  options = [],
  value,
  onChange,
  size = "md",
  style,
}: SegmentedControlProps) {
  const h = size === "sm" ? "34px" : "40px";
  return (
    <div
      style={{
        display: "inline-flex",
        padding: "3px",
        gap: "2px",
        background: "var(--surface-sunken)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-pill)",
        ...style,
      }}
    >
      {options.map((o) => {
        const val = typeof o === "string" ? o : o.value;
        const lbl = typeof o === "string" ? o : o.label;
        const active = val === value;
        return (
          <button
            key={val}
            onClick={() => onChange && onChange(val)}
            style={{
              height: h,
              padding: "0 var(--space-4)",
              border: "none",
              borderRadius: "var(--radius-pill)",
              background: active ? "var(--accent)" : "transparent",
              color: active ? "var(--accent-fg)" : "var(--text-muted)",
              fontFamily: "var(--font-sans)",
              fontSize: "var(--fs-sm)",
              fontWeight: "var(--fw-semibold)",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "background var(--dur-2) var(--ease-out), color var(--dur-2)",
            }}
          >
            {lbl}
          </button>
        );
      })}
    </div>
  );
}
