import React from "react";

/**
 * Loading placeholder. A subtle shimmer over a neutral block — used during
 * cold-start and infinite-scroll. Compose `EventCardSkeleton` from these.
 */
export function Skeleton({ width = "100%", height = "16px", radius = "var(--radius-sm)", style, ...rest }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "block", width, height, borderRadius: radius,
        background: "linear-gradient(100deg, var(--surface-raised) 30%, var(--surface-sunken) 50%, var(--surface-raised) 70%)",
        backgroundSize: "200% 100%",
        animation: "pulse-shimmer 1.4s var(--ease-inout) infinite",
        ...style,
      }}
      {...rest}
    >
      <style>{`@keyframes pulse-shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
        @media (prefers-reduced-motion: reduce){[aria-hidden="true"]{animation:none!important}}`}</style>
    </span>
  );
}

/** Full event-card skeleton (image + two text rows). */
export function EventCardSkeleton({ style }) {
  return (
    <div style={{
      background: "var(--surface-card)", border: "1px solid var(--border)",
      borderRadius: "var(--radius-lg)", overflow: "hidden", ...style,
    }}>
      <Skeleton height="150px" radius="0" />
      <div style={{ padding: "var(--space-4)", display: "flex", flexDirection: "column", gap: "10px" }}>
        <Skeleton width="38%" height="11px" />
        <Skeleton width="80%" height="20px" />
        <Skeleton width="55%" height="13px" />
      </div>
    </div>
  );
}
