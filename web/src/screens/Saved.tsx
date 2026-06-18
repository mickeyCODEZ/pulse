import type { PulseEvent } from "../data";
import { Button } from "../components/core/Button";
import { EventCard } from "../components/events/EventCard";
import { EmptyState } from "../components/feedback/EmptyState";
import { Download } from "../icons";
import { downloadICS } from "../ics";

export interface SavedProps {
  saved: Set<string>;
  events: PulseEvent[];
  onOpen: (e: PulseEvent) => void;
  onSave: (id: string) => void;
  empty?: boolean;
}

export function Saved({ saved, events, onOpen, onSave, empty }: SavedProps) {
  const list = events.filter((e) => saved.has(e.id));
  if (empty || list.length === 0) {
    return (
      <EmptyState
        glyph="saved"
        title="Nothing saved yet"
        body="Tap the bookmark on any event and it lands here — with a calendar export when you're ready."
        action={<Button variant="secondary">Browse the feed</Button>}
      />
    );
  }
  return (
    <div style={{ padding: "var(--space-6)", maxWidth: "var(--content-max)", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-5)" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-display-sm)", color: "var(--text-strong)", margin: 0 }}>
          Saved
        </h1>
        <Button variant="secondary" size="sm" iconLeft={<Download size={16} />} onClick={() => downloadICS(list, "pulse-saved.ics")}>
          Export .ics
        </Button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
        {list.map((e) => (
          <EventCard key={e.id} event={e} variant="compact" saved onSave={() => onSave(e.id)} onOpen={() => onOpen(e)} />
        ))}
      </div>
    </div>
  );
}
