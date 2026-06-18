import type { CSSProperties, ReactNode } from "react";

/** Mono uppercase section overline — the "wire-service" voice for metadata. */
export function Eyebrow({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-xs)",
        letterSpacing: "var(--ls-label)",
        textTransform: "uppercase",
        color: "var(--text-muted)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
