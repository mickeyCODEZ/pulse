import React from "react";

/**
 * Small status / count badge. `tone` carries minimal chroma for feedback only;
 * default is neutral monochrome.
 */
export function Badge({ children, tone = "neutral", dot = false, style, ...rest }) {
  const tones = {
    neutral: { bg: "var(--accent-soft)", fg: "var(--text-strong)" },
    inverse: { bg: "var(--accent)", fg: "var(--accent-fg)" },
    ok: { bg: "color-mix(in srgb, var(--ok) 16%, transparent)", fg: "var(--ok)" },
    warn: { bg: "color-mix(in srgb, var(--warn) 18%, transparent)", fg: "var(--warn)" },
    error: { bg: "color-mix(in srgb, var(--error) 16%, transparent)", fg: "var(--error)" },
  }[tone];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        fontFamily: "var(--font-mono)",
        fontWeight: "var(--fw-semibold)",
        fontSize: "var(--fs-2xs)",
        letterSpacing: "0.04em",
        lineHeight: 1,
        whiteSpace: "nowrap",
        flex: "0 0 auto",
        padding: dot ? "0" : "3px 7px",
        minWidth: dot ? "8px" : "auto",
        height: dot ? "8px" : "auto",
        borderRadius: "var(--radius-pill)",
        background: tones.bg,
        color: tones.fg,
        ...style,
      }}
      {...rest}
    >
      {!dot && children}
    </span>
  );
}
