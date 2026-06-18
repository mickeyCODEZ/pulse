import React from "react";

/**
 * Pulse brand lockup: the map-pin + radar pulse mark, optionally with the
 * "Pulse" serif wordmark. Inherits color from `currentColor`.
 */
export function Logo({ size = 28, showWordmark = true, color, style, ...rest }) {
  const px = typeof size === "number" ? `${size}px` : size;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.45em",
        color: color || "var(--text-strong)",
        ...style,
      }}
      {...rest}
    >
      <svg
        width={px}
        height={px}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{ flex: "0 0 auto" }}
      >
        <path d="M12 21.6 C12 21.6 18.8 14.8 18.8 9 A6.8 6.8 0 1 0 5.2 9 C5.2 14.8 12 21.6 12 21.6 Z" />
        <circle cx="12" cy="8.8" r="1.5" fill="currentColor" stroke="none" />
        <path d="M14.7 6.1 a3.9 3.9 0 0 1 0 5.4" />
        <path d="M9.3 6.1 a3.9 3.9 0 0 0 0 5.4" />
      </svg>
      {showWordmark && (
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--fw-bold)",
            fontSize: `calc(${px} * 0.92)`,
            letterSpacing: "var(--ls-display)",
            lineHeight: 1,
          }}
        >
          Pulse
        </span>
      )}
    </span>
  );
}
