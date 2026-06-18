import type { PulseEvent } from "../data";
import { EventCard } from "../components/events/EventCard";
import { Star } from "../icons";
import { Eyebrow } from "../shell/Eyebrow";

interface CommonProps {
  events: PulseEvent[];
  saved: Set<string>;
  onSave: (id: string) => void;
  onDismiss: (id: string) => void;
  onOpen: (e: PulseEvent) => void;
}

function GemsRail({ gems, saved, onSave, onDismiss, onOpen }: CommonProps & { gems: PulseEvent[] }) {
  if (!gems.length) return null;
  return (
    <section
      style={{
        margin: "var(--space-3) 0",
        padding: "var(--space-5) 0",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "0 0 var(--space-3)" }}>
        <Star size={15} style={{ color: "var(--text-strong)" }} />
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-title)", color: "var(--text-strong)", margin: 0 }}>
          Hidden gems
        </h2>
        <Eyebrow style={{ marginLeft: "auto" }}>high match · low noise</Eyebrow>
      </div>
      <div
        className="pulse-noscroll"
        style={{
          display: "flex",
          gap: "var(--space-3)",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          paddingBottom: "4px",
        }}
      >
        {gems.map((e) => (
          <div key={e.id} style={{ flex: "0 0 84%", maxWidth: "300px", scrollSnapAlign: "start" }}>
            <EventCard
              event={e}
              saved={saved.has(e.id)}
              onSave={() => onSave(e.id)}
              onDismiss={() => onDismiss(e.id)}
              onOpen={() => onOpen(e)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export function FeedList({ events, saved, onSave, onDismiss, onOpen, columns = 1 }: CommonProps & { columns?: number }) {
  const gems = events.filter((e) => e.gem);
  const main = events.filter((e) => !e.gem);
  const head = main.slice(0, 2);
  const tail = main.slice(2);

  const grid = (list: PulseEvent[]) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: columns > 1 ? `repeat(${columns}, 1fr)` : "1fr",
        gap: "var(--space-5)",
      }}
    >
      {list.map((e) => (
        <EventCard
          key={e.id}
          event={e}
          saved={saved.has(e.id)}
          onSave={() => onSave(e.id)}
          onDismiss={() => onDismiss(e.id)}
          onOpen={() => onOpen(e)}
        />
      ))}
    </div>
  );

  return (
    <div>
      {grid(head)}
      <GemsRail gems={gems} events={events} saved={saved} onSave={onSave} onDismiss={onDismiss} onOpen={onOpen} />
      {grid(tail)}
    </div>
  );
}
