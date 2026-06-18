import type { CSSProperties } from "react";

export interface LocationSwitcherProps {
  city: string;
  loading?: boolean;
  statusText?: string;
  onClick?: () => void;
  size?: "md" | "lg";
  style?: CSSProperties;
}

/**
 * Location switcher — the "travel anywhere" control. Shows the active city and
 * opens the city picker. When `loading`, it surfaces the progressive cold-start
 * status ("still finding local gems…") instead of a blank wait.
 */
export function LocationSwitcher({ city, loading = false, statusText, onClick, size = "md", style }: LocationSwitcherProps) {
  const big = size === "lg";
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        padding: big ? "8px 14px" : "6px 12px",
        background: "transparent",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-pill)",
        cursor: "pointer",
        transition: "background var(--dur-2) var(--ease-out), border-color var(--dur-2)",
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--surface-raised)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      <svg
        width={big ? 18 : 16}
        height={big ? 18 : 16}
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round"
        style={{ color: "var(--text-strong)", flex: "0 0 auto" }}
      >
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="2.6" />
      </svg>
      <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1.1, minWidth: 0 }}>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--fw-semibold)",
            fontSize: big ? "var(--fs-title)" : "var(--fs-body)",
            color: "var(--text-strong)",
            letterSpacing: "var(--ls-tight)",
            whiteSpace: "nowrap",
          }}
        >
          {city}
        </span>
        {loading && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", marginTop: "3px" }}>
            <span className="pulse-ls-dot" style={{ width: "5px", height: "5px", borderRadius: "var(--radius-pill)", background: "var(--text-muted)" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", letterSpacing: "0.03em", color: "var(--text-muted)" }}>
              {statusText || "still finding local gems…"}
            </span>
            <style>{`@keyframes pulse-ls-blink{0%,100%{opacity:.25}50%{opacity:1}} .pulse-ls-dot{animation:pulse-ls-blink 1.1s var(--ease-inout) infinite}
              @media (prefers-reduced-motion: reduce){.pulse-ls-dot{animation:none}}`}</style>
          </span>
        )}
      </span>
      <svg
        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        style={{ color: "var(--text-muted)", marginLeft: "2px", flex: "0 0 auto" }}
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  );
}
