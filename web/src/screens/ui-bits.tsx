import type { ReactNode } from "react";

/** A labelled settings section used across Preferences and Digest. */
export function Section({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <section style={{ marginBottom: "var(--space-8)" }}>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-title)", color: "var(--text-strong)", margin: "0 0 4px" }}>
        {title}
      </h2>
      {hint && <p style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)", margin: "0 0 var(--space-4)" }}>{hint}</p>}
      {children}
    </section>
  );
}

/** A single toggle row with a hairline divider. */
export function Row({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "var(--space-3) 0",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {children}
    </div>
  );
}
