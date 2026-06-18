import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  interactive?: boolean;
  inverse?: boolean;
  padding?: string;
  elevation?: 0 | 1 | 2 | 3 | 4;
}

/**
 * Generic surface container. Hairline border + restrained elevation.
 * `interactive` adds a lift-on-hover affordance; `inverse` flips to the ink
 * surface (used for the "Hidden gems" editorial treatment).
 */
export function Card({
  children,
  interactive = false,
  inverse = false,
  padding = "var(--space-5)",
  elevation = 1,
  style,
  ...rest
}: CardProps) {
  const shadow = `var(--shadow-${elevation})`;
  return (
    <div
      style={{
        background: inverse ? "var(--surface-inverse)" : "var(--surface-card)",
        color: inverse ? "var(--text-inverse)" : "var(--text-body)",
        border: inverse ? "1px solid var(--surface-inverse)" : "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        boxShadow: shadow,
        padding,
        transition:
          "transform var(--dur-3) var(--ease-out), box-shadow var(--dur-3) var(--ease-out)",
        cursor: interactive ? "pointer" : "default",
        ...(style as CSSProperties),
      }}
      onMouseEnter={
        interactive
          ? (e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "var(--shadow-3)";
            }
          : undefined
      }
      onMouseLeave={
        interactive
          ? (e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = shadow;
            }
          : undefined
      }
      {...rest}
    >
      {children}
    </div>
  );
}
