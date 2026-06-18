import type { CSSProperties, InputHTMLAttributes, ReactNode } from "react";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  hint?: string;
  iconLeft?: ReactNode;
  size?: "sm" | "md" | "lg";
  wrapStyle?: CSSProperties;
}

/**
 * Text input with optional leading icon and label. Hairline field that
 * deepens its border on focus. Used for search, location, preferences.
 */
export function Input({
  label,
  hint,
  iconLeft,
  size = "md",
  style,
  wrapStyle,
  id,
  ...rest
}: InputProps) {
  const h = size === "sm" ? "38px" : size === "lg" ? "52px" : "44px";
  const inputId = id || (label ? `in-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  return (
    <label htmlFor={inputId} style={{ display: "block", ...(style as CSSProperties) }}>
      {label && (
        <span
          style={{
            display: "block",
            marginBottom: "6px",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--fs-xs)",
            letterSpacing: "var(--ls-label)",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          {label}
        </span>
      )}
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-2)",
          height: h,
          padding: "0 var(--space-4)",
          background: "var(--surface-card)",
          border: "1px solid var(--border-strong)",
          borderRadius: "var(--radius-md)",
          transition: "border-color var(--dur-2) var(--ease-out), box-shadow var(--dur-2)",
          ...wrapStyle,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--accent)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--border-strong)";
        }}
      >
        {iconLeft && <span style={{ display: "flex", color: "var(--text-muted)" }}>{iconLeft}</span>}
        <input
          id={inputId}
          style={{
            flex: 1,
            minWidth: 0,
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--fs-body)",
            color: "var(--text-strong)",
          }}
          {...rest}
        />
      </span>
      {hint && (
        <span style={{ display: "block", marginTop: "6px", fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>
          {hint}
        </span>
      )}
    </label>
  );
}
