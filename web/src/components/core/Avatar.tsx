import type { HTMLAttributes } from "react";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  name?: string;
  src?: string;
  size?: number;
}

/**
 * Avatar / identity dot. Renders initials on an ink surface, or an image.
 * Used for the "For me" profile and digest sender.
 */
export function Avatar({ name = "", src, size = 36, style, ...rest }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "var(--radius-pill)",
        background: src ? "var(--surface-raised)" : "var(--accent)",
        color: "var(--accent-fg)",
        fontFamily: "var(--font-mono)",
        fontWeight: "var(--fw-semibold)",
        fontSize: `${Math.round(size * 0.34)}px`,
        letterSpacing: "0.02em",
        overflow: "hidden",
        flex: "0 0 auto",
        ...style,
      }}
      {...rest}
    >
      {src ? (
        <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        initials || "•"
      )}
    </span>
  );
}
