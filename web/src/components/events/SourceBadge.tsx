import type { CSSProperties } from "react";

export interface SourceBadgeProps {
  sources?: string[] | string;
  style?: CSSProperties;
}

/**
 * Source attribution + dedup. Shows the primary source the event was found on,
 * plus an "also on …" chip when the same event was deduped across platforms —
 * the transparency signal the aggregation depends on.
 */
export function SourceBadge({ sources = [], style }: SourceBadgeProps) {
  const list = Array.isArray(sources) ? sources : [sources];
  const [primary, ...rest2] = list;
  if (!primary) return null;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", flexWrap: "wrap", ...style }}>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-xs)",
          letterSpacing: "0.02em",
          color: "var(--text-muted)",
        }}
      >
        <span style={{ width: "5px", height: "5px", borderRadius: "var(--radius-pill)", background: "var(--text-muted)" }} />
        via {primary}
      </span>
      {rest2.length > 0 && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--fs-2xs)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            padding: "2px 7px",
            borderRadius: "var(--radius-sm)",
            border: "1px dashed var(--border-strong)",
          }}
        >
          also on {rest2.join(", ")}
        </span>
      )}
    </span>
  );
}
