import React from "react";

/**
 * Category / metadata tag. Mono, uppercase, hairline outline by default.
 * Use `solid` to invert (ink fill) for emphasis.
 */
export function Tag({ children, solid = false, size = "md", style, ...rest }) {
  const pad = size === "sm" ? "2px 7px" : "3px 9px";
  const fs = size === "sm" ? "var(--fs-2xs)" : "var(--fs-xs)";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        fontFamily: "var(--font-condensed)",
        fontWeight: "var(--fw-semibold)",
        fontSize: fs,
        letterSpacing: "var(--ls-label)",
        textTransform: "uppercase",
        padding: pad,
        borderRadius: "var(--radius-sm)",
        background: solid ? "var(--accent)" : "transparent",
        color: solid ? "var(--accent-fg)" : "var(--text-muted)",
        border: solid ? "1px solid var(--accent)" : "1px solid var(--border)",
        whiteSpace: "nowrap",
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
