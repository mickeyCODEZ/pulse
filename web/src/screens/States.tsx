import type { ReactNode } from "react";
import { Button } from "../components/core/Button";
import { EmptyState } from "../components/feedback/EmptyState";
import { EventCardSkeleton } from "../components/feedback/Skeleton";
import { Toast } from "../components/feedback/Toast";
import { LocationSwitcher } from "../components/events/LocationSwitcher";
import { Refresh, Check } from "../icons";
import { Eyebrow } from "../shell/Eyebrow";

function StateFrame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <Eyebrow style={{ marginBottom: "var(--space-2)" }}>{label}</Eyebrow>
      <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", background: "var(--surface-card)", overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}

export function StatesGallery() {
  return (
    <div style={{ padding: "var(--space-6)", maxWidth: "var(--content-max)", margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-display-sm)", color: "var(--text-strong)", margin: 0 }}>
        States
      </h1>
      <StateFrame label="Cold-start · loading">
        <div style={{ padding: "var(--space-4)" }}>
          <LocationSwitcher city="Reykjavík" loading size="lg" />
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "var(--space-4)" }}>
            <EventCardSkeleton />
            <EventCardSkeleton />
          </div>
        </div>
      </StateFrame>
      <StateFrame label="Quiet city">
        <EmptyState
          glyph="quiet"
          title="A quiet week in Reykjavík"
          body="Only a few events match right now. We'll ping you the moment more drop."
          action={<Button variant="secondary" size="sm">Widen my filters</Button>}
        />
      </StateFrame>
      <StateFrame label="Empty · saved">
        <EmptyState
          glyph="saved"
          title="Nothing saved yet"
          body="Tap the bookmark on any event and it lands here."
          action={<Button variant="secondary" size="sm">Browse the feed</Button>}
        />
      </StateFrame>
      <StateFrame label="Error">
        <EmptyState
          glyph="error"
          title="We lost the signal"
          body="Couldn't reach a few sources. Your feed may be incomplete."
          action={<Button variant="secondary" size="sm" iconLeft={<Refresh size={16} />}>Try again</Button>}
        />
      </StateFrame>
      <StateFrame label="Toast">
        <div style={{ padding: "var(--space-6)", display: "flex", justifyContent: "center" }}>
          <Toast message="Saved to your list" actionLabel="Undo" icon={<Check size={16} />} />
        </div>
      </StateFrame>
    </div>
  );
}
