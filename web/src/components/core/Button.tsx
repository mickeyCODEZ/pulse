import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

const sizes: Record<string, CSSProperties> = {
  sm: { padding: "0 var(--space-3)", height: "36px", fontSize: "var(--fs-sm)" },
  md: { padding: "0 var(--space-5)", height: "44px", fontSize: "var(--fs-body)" },
  lg: { padding: "0 var(--space-6)", height: "52px", fontSize: "var(--fs-subtitle)" },
};

const variants: Record<string, CSSProperties> = {
  primary: {
    background: "var(--accent)",
    color: "var(--accent-fg)",
    border: "1px solid var(--accent)",
  },
  secondary: {
    background: "transparent",
    color: "var(--text-strong)",
    border: "1px solid var(--border-strong)",
  },
  ghost: {
    background: "transparent",
    color: "var(--text-strong)",
    border: "1px solid transparent",
  },
};

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  block?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  loading?: boolean;
}

/**
 * Primary action control. Monochrome by design: `primary` is a solid ink/bone
 * fill, `secondary` is a hairline outline, `ghost` is bare. `loading` shows a
 * spinner and blocks input to prevent double-submit.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  block = false,
  iconLeft,
  iconRight,
  disabled = false,
  loading = false,
  style,
  ...rest
}: ButtonProps) {
  const isOff = disabled || loading;
  const spinner = (
    <svg
      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.4" strokeLinecap="round"
      style={{ animation: "pulse-spin 0.7s linear infinite" }} aria-hidden="true"
    >
      <path d="M12 3a9 9 0 1 0 9 9" />
      <style>{"@keyframes pulse-spin{to{transform:rotate(360deg)}}"}</style>
    </svg>
  );
  return (
    <button
      disabled={isOff}
      aria-busy={loading || undefined}
      style={{
        display: block ? "flex" : "inline-flex",
        width: block ? "100%" : "auto",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-2)",
        fontFamily: "var(--font-condensed)",
        fontWeight: "var(--fw-semibold)",
        textTransform: "uppercase",
        letterSpacing: "0.07em",
        borderRadius: "var(--radius-pill)",
        cursor: isOff ? "not-allowed" : "pointer",
        opacity: isOff ? 0.55 : 1,
        whiteSpace: "nowrap",
        transition:
          "transform var(--dur-1) var(--ease-out), background var(--dur-2) var(--ease-out), border-color var(--dur-2) var(--ease-out), opacity var(--dur-2)",
        ...sizes[size],
        ...variants[variant],
        ...style,
      }}
      onMouseDown={(e) => {
        if (!isOff) e.currentTarget.style.transform = "scale(0.97)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
      {...rest}
    >
      {loading ? spinner : iconLeft}
      {children}
      {!loading && iconRight}
    </button>
  );
}
