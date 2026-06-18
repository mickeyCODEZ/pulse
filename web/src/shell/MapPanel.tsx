import type { PulseEvent } from "../data";
import { MapPin } from "../components/events/MapPin";
import { More } from "../icons";
import { Eyebrow } from "./Eyebrow";

// Decorative fallback positions (used when events carry no coordinates).
const pos = [
  { top: "22%", left: "30%" }, { top: "40%", left: "62%" }, { top: "58%", left: "38%" },
  { top: "30%", left: "75%" }, { top: "68%", left: "66%" }, { top: "50%", left: "20%" },
  { top: "74%", left: "44%" }, { top: "18%", left: "55%" }, { top: "62%", left: "82%" },
  { top: "38%", left: "46%" },
];

/** Project events' real lat/lng into panel %, padded; null if too few coords. */
function projectPins(events: PulseEvent[]): (Record<"top" | "left", string> | null)[] {
  const pts = events.map((e) => (e.lat != null && e.lng != null ? { lat: e.lat, lng: e.lng } : null));
  const real = pts.filter(Boolean) as { lat: number; lng: number }[];
  if (real.length < 2) return events.map(() => null);
  const lats = real.map((p) => p.lat);
  const lngs = real.map((p) => p.lng);
  const minLat = Math.min(...lats), maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);
  const spanLat = maxLat - minLat || 1;
  const spanLng = maxLng - minLng || 1;
  const P = 12; // % padding
  return pts.map((p) => {
    if (!p) return null;
    const left = P + ((p.lng - minLng) / spanLng) * (100 - 2 * P);
    const top = P + ((maxLat - p.lat) / spanLat) * (100 - 2 * P); // north = up
    return { top: `${top.toFixed(1)}%`, left: `${left.toFixed(1)}%` };
  });
}

export interface MapPanelProps {
  events: PulseEvent[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  loading?: boolean;
}

/** Desktop right-zone map panel — line-map texture with price pins. */
export function MapPanel({ events, selectedId, onSelect, loading }: MapPanelProps) {
  const projected = projectPins(events);
  return (
    <aside className="pulse-mappanel">
      <div
        style={{
          padding: "var(--space-4) var(--space-5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid var(--border)",
          background: "var(--surface-page)",
        }}
      >
        <Eyebrow>{loading ? "Mapping…" : `Map · ${events.length} nearby`}</Eyebrow>
        <More size={18} style={{ color: "var(--text-muted)" }} />
      </div>
      <div
        className="map-overlay"
        style={{ flex: 1, position: "relative", overflow: "hidden", backgroundColor: "var(--surface-sunken)" }}
      >
        {events.map((e, i) => (
          <div key={e.id} style={{ position: "absolute", transform: "translate(-50%,-50%)", ...(projected[i] ?? pos[i % pos.length]) }}>
            <MapPin
              label={e.free || e.price == null ? undefined : `$${e.price}`}
              free={e.free}
              gem={e.gem}
              dot={!e.free && e.price == null}
              selected={e.id === selectedId}
              onClick={() => onSelect && onSelect(e.id)}
            />
          </div>
        ))}
      </div>
    </aside>
  );
}
