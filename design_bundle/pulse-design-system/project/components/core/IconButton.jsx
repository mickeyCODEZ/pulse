import React from "react";

const sizes = { sm: 36, md: 44, lg: 52 };

/**
 * Square/circular icon-only control. Pass a 18–22px icon node as children.
 * Meets the 44px hit-target rule at `md`+ via padding on touch surfaces.
 */
export function IconButton({
  children,
  variant = "ghost",
  size = "md",
  round = false,
  active = false,
  disabled = false,
  label,
  style,
  ...rest
}) {
  const d = sizes[size];
  const base = {
    ghost: { background: "transparent", border: "1px solid transparent", color: "var(--text-body)" },
    outline: { background: "transparent", border: "1px solid var(--border-strong)", color: "var(--text-strong)" },
    solid: { background: "var(--accent)", border: "1px solid var(--accent)", color: "var(--accent-fg)" },
  }[variant];

  const activeStyle = active
    ? { background: "var(--accent-soft)", color: "var(--text-strong)", borderColor: "var(--border)" }
    : null;

  return (
    <button
      aria-label={label}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: `${d}px`,
        height: `${d}px`,
        borderRadius: round ? "var(--radius-pill)" : "var(--radius-md)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transition: "background var(--dur-2) var(--ease-out), transform var(--dur-1) var(--ease-out), color var(--dur-2)",
        ...base,
        ...activeStyle,
        ...style,
      }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = "scale(0.92)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      {...rest}
    >
      {children}
    </button>
  );
}
