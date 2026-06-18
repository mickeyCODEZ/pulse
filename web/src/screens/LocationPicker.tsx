import { useState } from "react";
import type { City } from "../data";
import { Input } from "../components/forms/Input";
import { Search, Pin, Check, Navigation } from "../icons";
// (LocationGate lives in its own module — see screens/LocationGate.tsx)

export interface LocationPickerProps {
  cities: City[];
  current: string;
  onPick: (c: City) => void;
  onClose: () => void;
  onUseLocation?: () => void;
}

/**
 * City switcher bottom sheet — the "travel anywhere" first impression. On a
 * pick, the feed shows progressive cold-start loading (handled by the app).
 */
export function LocationPicker({ cities, current, onPick, onClose, onUseLocation }: LocationPickerProps) {
  const [q, setQ] = useState("");
  const list = cities.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 60,
        background: "var(--scrim)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--surface-page)",
          borderTopLeftRadius: "var(--radius-xl)",
          borderTopRightRadius: "var(--radius-xl)",
          padding: "var(--space-5) var(--space-5) var(--space-7)",
          maxHeight: "80%",
          display: "flex",
          flexDirection: "column",
          boxShadow: "var(--shadow-4)",
        }}
      >
        <div style={{ width: "36px", height: "4px", borderRadius: "2px", background: "var(--border-strong)", margin: "0 auto var(--space-4)" }} />
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-title)", color: "var(--text-strong)", margin: "0 0 var(--space-3)" }}>
          Switch city
        </h2>
        <Input placeholder="Search any city" iconLeft={<Search size={18} />} value={q} onChange={(e) => setQ(e.target.value)} />
        {onUseLocation && (
          <button
            onClick={onUseLocation}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-3)",
              width: "100%",
              marginTop: "var(--space-3)",
              padding: "var(--space-3) var(--space-2)",
              border: "none",
              borderBottom: "1px solid var(--border)",
              background: "transparent",
              cursor: "pointer",
              textAlign: "left",
              color: "var(--text-strong)",
            }}
          >
            <span style={{ color: "var(--spot)", display: "flex" }}>
              <Navigation size={18} />
            </span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)", fontWeight: "var(--fw-semibold)" }}>
              Use my current location
            </span>
          </button>
        )}
        <div className="pulse-scroll" style={{ overflowY: "auto", marginTop: "var(--space-3)" }}>
          {list.map((c) => (
            <button
              key={c.id}
              onClick={() => onPick(c)}
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "var(--space-4) var(--space-2)",
                border: "none",
                borderBottom: "1px solid var(--border)",
                background: "transparent",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                <span style={{ color: c.id === current ? "var(--text-strong)" : "var(--text-muted)" }}>
                  <Pin size={18} />
                </span>
                <span>
                  <span style={{ display: "block", fontFamily: "var(--font-display)", fontSize: "var(--fs-subtitle)", color: "var(--text-strong)" }}>
                    {c.name}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-muted)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    {c.country} · {c.count} events
                  </span>
                </span>
              </span>
              {c.id === current && (
                <span style={{ color: "var(--text-strong)" }}>
                  <Check size={18} />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
