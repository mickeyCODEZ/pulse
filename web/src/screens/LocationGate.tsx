import type { City } from "../data";
import { Logo } from "../components/core/Logo";
import { CitySearch } from "../components/search/CitySearch";

export interface LocationGateProps {
  cityList: City[];
  onPick: (c: City) => void;
  onUseLocation: () => void;
  locating?: boolean;
  denied?: boolean; // geolocation was tried and refused
}

// One-tap starting points (self-contained so they always render + carry the
// country/coords the backend needs for all-types coverage).
const POPULAR: City[] = [
  { id: "pop:toronto", name: "Toronto", country: "Canada", count: 0, lat: 43.6532, lng: -79.3832 },
  { id: "pop:mississauga", name: "Mississauga", country: "Canada", count: 0, lat: 43.589, lng: -79.6441 },
  { id: "pop:hamilton", name: "Hamilton", country: "Canada", count: 0, lat: 43.2557, lng: -79.8711 },
  { id: "pop:nyc", name: "New York", country: "United States", count: 0, lat: 40.7128, lng: -74.006 },
  { id: "pop:boston", name: "Boston", country: "United States", count: 0, lat: 42.3601, lng: -71.0589 },
  { id: "pop:philadelphia", name: "Philadelphia", country: "United States", count: 0, lat: 39.9526, lng: -75.1652 },
  { id: "pop:miami", name: "Miami", country: "United States", count: 0, lat: 25.7617, lng: -80.1918 },
  { id: "pop:atlanta", name: "Atlanta", country: "United States", count: 0, lat: 33.749, lng: -84.388 },
];

/**
 * First-run location gate, search-first. Pulse is location-first — but instead
 * of a wall of buttons, the visitor just searches any city in the world (or
 * shares their location). The feed loads as soon as they pick.
 */
export function LocationGate({ cityList, onPick, onUseLocation, locating, denied }: LocationGateProps) {
  const popularCities = POPULAR;

  return (
    <div
      className="pulse-screen-enter"
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "var(--space-6)",
        gap: "var(--space-5)",
        width: "100%",
        maxWidth: "560px",
        margin: "0 auto",
      }}
    >
      <Logo size={34} />
      <div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--fs-display-md)",
            color: "var(--text-strong)",
            letterSpacing: "var(--ls-display)",
            lineHeight: "var(--lh-tight)",
            margin: "0 0 var(--space-3)",
          }}
        >
          Where to tonight?
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "var(--fs-subtitle)", margin: 0, maxWidth: "42ch", marginInline: "auto" }}>
          Search any city for every real event around you — concerts, markets, community nights, fairs — in one ranked feed.
        </p>
      </div>

      <div style={{ width: "100%", maxWidth: "420px" }}>
        <CitySearch
          cityList={cityList}
          onPick={onPick}
          onUseLocation={onUseLocation}
          locating={locating}
          autoFocus
        />
      </div>

      {popularCities.length > 0 && (
        <div style={{ width: "100%", maxWidth: "420px" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", letterSpacing: "var(--ls-label)", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: "var(--space-2)" }}>
            Popular
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", justifyContent: "center" }}>
            {popularCities.map((c) => (
              <button
                key={c.id}
                onClick={() => onPick(c)}
                style={{
                  padding: "6px 14px", borderRadius: "var(--radius-pill)",
                  border: "1px solid var(--border-strong)", background: "var(--surface-card)",
                  cursor: "pointer", color: "var(--text-strong)", fontSize: "var(--fs-sm)", fontWeight: "var(--fw-medium)",
                }}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {denied && (
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-faint)", margin: 0 }}>
          Location is off — search a city above to continue.
        </p>
      )}
    </div>
  );
}
