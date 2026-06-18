import type { CSSProperties } from "react";

export interface PriceTagProps {
  price?: number;
  free?: boolean;
  overlay?: boolean;
  style?: CSSProperties;
}

/**
 * Price marker. "Free" renders as a solid ink tag; a number renders as a
 * glassy capsule for overlay on imagery. Pass `overlay` when on a photo.
 */
export function PriceTag({ price, free = false, overlay = false, style }: PriceTagProps) {
  const label = free ? "Free" : typeof price === "number" ? `$${price}` : price;
  if (free) {
    return (
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontWeight: "var(--fw-semibold)",
          fontSize: "var(--fs-xs)",
          letterSpacing: "var(--ls-label)",
          textTransform: "uppercase",
          padding: "4px 9px",
          borderRadius: "var(--radius-sm)",
          background: overlay ? "var(--white)" : "var(--accent)",
          color: overlay ? "var(--black)" : "var(--accent-fg)",
          ...style,
        }}
      >
        {label}
      </span>
    );
  }
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontWeight: "var(--fw-semibold)",
        fontSize: "var(--fs-xs)",
        letterSpacing: "0.02em",
        padding: "4px 9px",
        borderRadius: "var(--radius-sm)",
        background: overlay ? "color-mix(in srgb, var(--black) 55%, transparent)" : "var(--accent-soft)",
        color: overlay ? "var(--white)" : "var(--text-strong)",
        backdropFilter: overlay ? "blur(var(--blur-sm))" : "none",
        WebkitBackdropFilter: overlay ? "blur(var(--blur-sm))" : "none",
        border: overlay
          ? "1px solid color-mix(in srgb, var(--white) 22%, transparent)"
          : "1px solid var(--border)",
        ...style,
      }}
    >
      {label}
    </span>
  );
}
