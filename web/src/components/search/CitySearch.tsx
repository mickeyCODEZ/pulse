import { useEffect, useRef, useState } from "react";
import type { City } from "../../data";
import { SearchBar } from "../navigation/SearchBar";
import { searchCities } from "../../geo";
import { Pin, Navigation } from "../../icons";

export interface CitySearchProps {
  cityList: City[]; // seeded cities (shown first, with event counts)
  onPick: (c: City) => void;
  onUseLocation?: () => void;
  locating?: boolean;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  autoFocus?: boolean;
}

const cityLabel = (c: City) => [c.region, c.country].filter(Boolean).join(", ");

/**
 * Smart city search: matches the seeded list instantly (with event counts) and,
 * as you type, augments with any city worldwide via Open-Meteo (debounced). The
 * shared entry point for both the first-run gate and the in-app Search tab.
 */
export function CitySearch({ cityList, onPick, onUseLocation, locating, placeholder, size = "lg", autoFocus }: CitySearchProps) {
  const [q, setQ] = useState("");
  const [remote, setRemote] = useState<City[]>([]);
  const [busy, setBusy] = useState(false);
  const reqId = useRef(0);

  useEffect(() => {
    const query = q.trim();
    if (query.length < 2) {
      setRemote([]);
      setBusy(false);
      return;
    }
    setBusy(true);
    const id = ++reqId.current;
    const t = setTimeout(async () => {
      const res = await searchCities(query);
      if (id === reqId.current) {
        setRemote(res);
        setBusy(false);
      }
    }, 250);
    return () => clearTimeout(t);
  }, [q]);

  // Seeded matches first (they carry real event counts), then de-duped remote
  // results for everywhere else.
  const local = q.trim()
    ? cityList.filter((c) => c.name.toLowerCase().includes(q.trim().toLowerCase()))
    : [];
  const seen = new Set(local.map((c) => `${c.name}|${c.country}`.toLowerCase()));
  const merged = [...local, ...remote.filter((c) => !seen.has(`${c.name}|${c.country}`.toLowerCase()))].slice(0, 8);

  return (
    <div style={{ width: "100%" }}>
      <SearchBar
        value={q}
        onChange={setQ}
        onSubmit={() => merged[0] && onPick(merged[0])}
        size={size}
        autoFocus={autoFocus}
        placeholder={placeholder || "Search any city — Toronto, Lisbon, Tokyo…"}
      />

      {onUseLocation && !q.trim() && (
        <button
          onClick={onUseLocation}
          style={{
            display: "flex", alignItems: "center", gap: "var(--space-3)", width: "100%",
            marginTop: "var(--space-3)", padding: "var(--space-3) var(--space-4)",
            background: "transparent", border: "1px solid var(--border)", borderRadius: "var(--radius-pill)",
            cursor: "pointer", color: "var(--text-strong)", fontSize: "var(--fs-body)", fontWeight: "var(--fw-medium)",
          }}
        >
          <Navigation size={18} />
          {locating ? "Locating you…" : "Use my current location"}
        </button>
      )}

      {q.trim().length >= 2 && (
        <div
          className="pulse-scroll"
          style={{ marginTop: "var(--space-3)", maxHeight: "46vh", overflowY: "auto", textAlign: "left" }}
        >
          {merged.map((c) => (
            <button
              key={c.id}
              onClick={() => onPick(c)}
              style={{
                display: "flex", alignItems: "center", gap: "var(--space-3)", width: "100%",
                padding: "var(--space-3) var(--space-2)", background: "transparent", border: "none",
                borderBottom: "1px solid var(--border)", cursor: "pointer", textAlign: "left",
              }}
            >
              <Pin size={17} style={{ color: "var(--text-muted)", flex: "0 0 auto" }} />
              <span style={{ flex: 1, minWidth: 0, color: "var(--text-strong)", fontWeight: "var(--fw-medium)" }}>{c.name}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-muted)" }}>
                {c.count ? `${cityLabel(c)} · ${c.count} events` : cityLabel(c)}
              </span>
            </button>
          ))}
          {!merged.length && !busy && (
            <p style={{ padding: "var(--space-3) var(--space-2)", color: "var(--text-muted)", fontSize: "var(--fs-sm)", margin: 0 }}>
              No match for “{q.trim()}”. Try another spelling.
            </p>
          )}
          {busy && !merged.length && (
            <p style={{ padding: "var(--space-3) var(--space-2)", color: "var(--text-faint)", fontSize: "var(--fs-sm)", margin: 0 }}>
              Searching…
            </p>
          )}
        </div>
      )}
    </div>
  );
}
