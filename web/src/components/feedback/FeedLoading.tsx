import { useEffect, useState } from "react";
import { EventCardSkeleton } from "./Skeleton";

/**
 * Feed loading state. A brand-new city is ingested live and can take ~30s, so
 * the copy escalates over time to make the wait feel guided rather than stuck,
 * with shimmering card skeletons underneath. A cached/warm city resolves in a
 * second, so the first message is all most people ever see.
 */
export function FeedLoading({ city, columns }: { city: string; columns: number }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 4500),
      setTimeout(() => setPhase(2), 12000),
      setTimeout(() => setPhase(3), 22000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const message = [
    `Finding events in ${city}…`,
    `Scanning sources across ${city}…`,
    "Gathering concerts, markets, festivals & community nights…",
    "Almost there — ranking everything for you…",
  ][phase];

  return (
    <div role="status" aria-live="polite">
      <p
        style={{
          color: "var(--text-muted)",
          margin: "0 0 var(--space-5)",
          fontSize: "var(--fs-subtitle)",
          display: "flex",
          alignItems: "center",
          gap: "var(--space-2)",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: 14,
            height: 14,
            border: "2px solid var(--border-strong)",
            borderTopColor: "var(--accent)",
            borderRadius: "50%",
            display: "inline-block",
            animation: "pulse-spin 0.7s linear infinite",
          }}
        />
        {message}
        <style>{"@keyframes pulse-spin{to{transform:rotate(360deg)}}"}</style>
      </p>
      <div style={{ display: "grid", gap: "var(--space-4)", gridTemplateColumns: columns > 1 ? "1fr 1fr" : "1fr" }}>
        {Array.from({ length: columns > 1 ? 6 : 4 }).map((_, i) => (
          <EventCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
