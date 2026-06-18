import React from "react";

/**
 * Relevance chip — the "why this surfaced" signal that makes a high-volume
 * feed feel curated. A small radar glyph + the matched reasons.
 */
export function RelevanceChip({ reasons = [], score, compact = false, style, ...rest }) {
  const text = Array.isArray(reasons) ? reasons.join(" · ") : reasons;
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: "7px",
        padding: compact ? "3px 9px 3px 7px" : "5px 11px 5px 9px",
        background: "var(--spot-soft)",
        border: "1px solid color-mix(in srgb, var(--spot) 30%, transparent)",
        borderRadius: "var(--radius-pill)",
        color: "var(--text-strong)",
        maxWidth: "100%",
        ...style,
      }}
      {...rest}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--spot)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto" }}>
        <circle cx="12" cy="12" r="2.2" fill="var(--spot)" stroke="none" />
        <path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7" />
      </svg>
      <span style={{
        fontFamily: "var(--font-condensed)", fontSize: "var(--fs-sm)",
        letterSpacing: "0.03em", whiteSpace: "nowrap",
        overflow: "hidden", textOverflow: "ellipsis",
      }}>
        <b style={{ fontWeight: "var(--fw-semibold)", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--spot)" }}>Matches</b>
        <span style={{ color: "var(--text-muted)" }}>{" "}{text}</span>
      </span>
      {score != null && (
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)",
          fontWeight: "var(--fw-semibold)", color: "var(--text-muted)",
          paddingLeft: "5px", marginLeft: "1px", borderLeft: "1px solid var(--border)",
        }}>{score}%</span>
      )}
    </span>
  );
}
