import { useEffect, useRef, useState } from "react";
import type { City, PulseEvent } from "../data";
import { SearchBar } from "../components/navigation/SearchBar";
import { FilterChip } from "../components/navigation/FilterChip";
import { Button } from "../components/core/Button";
import { EventCard } from "../components/events/EventCard";
import { EmptyState } from "../components/feedback/EmptyState";
import { DatePicker } from "../components/forms/DatePicker";
import { Calendar, Pin, Music, Palette, Film, Utensils, Mic, Ticket, Navigation } from "../icons";
import { Eyebrow } from "../shell/Eyebrow";
import { searchCities } from "../geo";

const RECENT = ["Jazz tonight", "Free this weekend", "Risograph", "Talks"];
const CATS = [
  { label: "Live music", icon: <Music size={18} /> },
  { label: "Art", icon: <Palette size={18} /> },
  { label: "Film", icon: <Film size={18} /> },
  { label: "Food", icon: <Utensils size={18} /> },
  { label: "Talks", icon: <Mic size={18} /> },
  { label: "Theatre", icon: <Ticket size={18} /> },
];

const WD = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const dayTok = (e: PulseEvent) => (e.date || "").split(" ")[0];
const fmtDate = (d: Date) => d.toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric" });

type DateFilter = "any" | "today" | "weekend" | Date;
type DistFilter = "any" | "walk" | "1mi" | "2mi";

export interface SearchScreenProps {
  events: PulseEvent[];
  saved: Set<string>;
  onSave: (id: string) => void;
  onDismiss: (id: string) => void;
  onOpen: (e: PulseEvent) => void;
  city: City;
  cityList?: City[];
  onSwitchCity?: (c: City) => void;
}

export function SearchScreen({ events, saved, onSave, onDismiss, onOpen, city, cityList = [], onSwitchCity }: SearchScreenProps) {
  const [q, setQ] = useState("");
  const [dateF, setDateF] = useState<DateFilter>("any");
  const [distF, setDistF] = useState<DistFilter>("any");
  const [cal, setCal] = useState(false);
  const [cityMatches, setCityMatches] = useState<City[]>([]);
  const cityReq = useRef(0);
  const query = q.trim().toLowerCase();

  // The same bar also finds places: as you type, surface cities to switch to
  // (worldwide via Open-Meteo, seeded matches first). So one bar = place + keyword.
  useEffect(() => {
    const term = q.trim();
    if (!onSwitchCity || term.length < 2) {
      setCityMatches([]);
      return;
    }
    const id = ++cityReq.current;
    const t = setTimeout(async () => {
      const remote = await searchCities(term);
      if (id !== cityReq.current) return;
      const local = cityList.filter((c) => c.name.toLowerCase().includes(term.toLowerCase()) && c.name !== city.name);
      const seen = new Set(local.map((c) => `${c.name}|${c.country}`.toLowerCase()));
      setCityMatches(
        [...local, ...remote.filter((c) => c.name !== city.name && !seen.has(`${c.name}|${c.country}`.toLowerCase()))].slice(0, 4),
      );
    }, 250);
    return () => clearTimeout(t);
  }, [q, cityList, city.name, onSwitchCity]);

  const matchDate = (e: PulseEvent) => {
    if (dateF === "any") return true;
    if (dateF === "today") return dayTok(e) === WD[new Date().getDay()];
    if (dateF === "weekend") return ["Sat", "Sun"].includes(dayTok(e));
    return dayTok(e) === WD[dateF.getDay()]; // picked Date
  };
  const matchText = (e: PulseEvent) =>
    !query || [e.title, e.category, e.venue].join(" ").toLowerCase().includes(query);

  const distChips: { key: DistFilter; label: string; max: number }[] = [
    { key: "any", label: "Any distance", max: Infinity },
    { key: "walk", label: "Walkable", max: 0.5 },
    { key: "1mi", label: "≤ 1 mi", max: 1 },
    { key: "2mi", label: "≤ 2 mi", max: 2 },
  ];
  const matchDist = (e: PulseEvent) =>
    parseFloat(e.distance || "99") <= distChips.find((c) => c.key === distF)!.max;

  const hasFilter = !!query || dateF !== "any" || distF !== "any";
  const results = events.filter((e) => matchText(e) && matchDate(e) && matchDist(e));

  const dateChips: { key: "any" | "today" | "weekend"; label: string }[] = [
    { key: "any", label: "Any day" },
    { key: "today", label: "Today" },
    { key: "weekend", label: "This weekend" },
  ];

  return (
    <div style={{ padding: "var(--space-5) var(--space-5) var(--space-9)", maxWidth: "var(--content-max)", margin: "0 auto" }}>
      <SearchBar
        value={q}
        onChange={setQ}
        autoFocus
        size="lg"
        placeholder={`Search events, venues & areas in ${city ? city.name : "your city"}`}
        style={{ marginBottom: "var(--space-3)" }}
      />

      {/* date search row */}
      <div style={{ position: "relative", marginBottom: "var(--space-3)" }}>
        <div className="pulse-noscroll" style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "2px" }}>
          {dateChips.map((c) => (
            <FilterChip
              key={c.key}
              active={dateF === c.key}
              onClick={() => {
                setDateF(c.key);
                setCal(false);
              }}
              icon={<Calendar size={15} />}
            >
              {c.label}
            </FilterChip>
          ))}
          <FilterChip active={dateF instanceof Date} onClick={() => setCal((v) => !v)} icon={<Calendar size={15} />}>
            {dateF instanceof Date ? fmtDate(dateF) : "Pick a date"}
          </FilterChip>
        </div>
        {cal && (
          <div style={{ position: "absolute", top: "44px", left: 0, zIndex: 30 }}>
            <DatePicker
              value={dateF instanceof Date ? dateF : null}
              onChange={(d) => {
                setDateF(d);
                setCal(false);
              }}
            />
          </div>
        )}
      </div>

      {/* location search row */}
      <div className="pulse-noscroll" style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "2px", marginBottom: "var(--space-6)" }}>
        {distChips.map((c) => (
          <FilterChip key={c.key} active={distF === c.key} onClick={() => setDistF(c.key)} icon={<Pin size={15} />}>
            {c.label}
          </FilterChip>
        ))}
      </div>

      {/* Offer switching cities only when the query found no events here — so a
          keyword that matches events doesn't surface stray place names. */}
      {onSwitchCity && cityMatches.length > 0 && results.length === 0 && (
        <div style={{ marginBottom: "var(--space-6)" }}>
          <Eyebrow style={{ marginBottom: "var(--space-3)" }}>Go to a city</Eyebrow>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {cityMatches.map((c) => (
              <button
                key={c.id}
                onClick={() => onSwitchCity(c)}
                style={{
                  display: "flex", alignItems: "center", gap: "var(--space-3)", width: "100%",
                  padding: "var(--space-3) var(--space-2)", background: "transparent", border: "none",
                  borderBottom: "1px solid var(--border)", cursor: "pointer", textAlign: "left",
                }}
              >
                <Navigation size={16} style={{ color: "var(--spot)", flex: "0 0 auto" }} />
                <span style={{ flex: 1, minWidth: 0, color: "var(--text-strong)", fontWeight: "var(--fw-medium)" }}>
                  Switch to {c.name}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-muted)" }}>
                  {[c.region, c.country].filter(Boolean).join(", ")}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {!hasFilter && (
        <>
          <Eyebrow style={{ marginBottom: "var(--space-3)" }}>Recent</Eyebrow>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "var(--space-7)" }}>
            {RECENT.map((r) => (
              <FilterChip key={r} onClick={() => setQ(r.split(" ")[0])}>
                {r}
              </FilterChip>
            ))}
          </div>
          <Eyebrow style={{ marginBottom: "var(--space-3)" }}>Browse by category</Eyebrow>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "10px", marginBottom: "var(--space-7)" }}>
            {CATS.map((c) => (
              <button
                key={c.label}
                onClick={() => setQ(c.label)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-3)",
                  padding: "var(--space-4)",
                  background: "var(--surface-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  cursor: "pointer",
                  color: "var(--text-strong)",
                  fontFamily: "var(--font-sans)",
                  fontWeight: "var(--fw-medium)",
                  fontSize: "var(--fs-body)",
                  textAlign: "left",
                  transition: "background var(--dur-2)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-raised)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--surface-card)")}
              >
                <span style={{ color: "var(--text-muted)" }}>{c.icon}</span>
                {c.label}
              </button>
            ))}
          </div>
          <Eyebrow style={{ marginBottom: "var(--space-3)" }}>Trending near you</Eyebrow>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            {events.slice(0, 3).map((e) => (
              <EventCard key={e.id} event={e} variant="compact" saved={saved.has(e.id)} onSave={() => onSave(e.id)} onOpen={() => onOpen(e)} />
            ))}
          </div>
        </>
      )}

      {hasFilter && results.length > 0 && (
        <>
          <Eyebrow style={{ marginBottom: "var(--space-3)" }}>
            {results.length} result{results.length > 1 ? "s" : ""}
            {query ? ` for “${q}”` : ""}
            {dateF !== "any" ? ` · ${dateF instanceof Date ? fmtDate(dateF) : dateChips.find((c) => c.key === dateF)!.label.toLowerCase()}` : ""}
            {distF !== "any" ? ` · ${distChips.find((c) => c.key === distF)!.label.toLowerCase()}` : ""}
          </Eyebrow>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            {results.map((e) => (
              <EventCard key={e.id} event={e} variant="compact" saved={saved.has(e.id)} onSave={() => onSave(e.id)} onDismiss={() => onDismiss(e.id)} onOpen={() => onOpen(e)} />
            ))}
          </div>
        </>
      )}

      {hasFilter && results.length === 0 && (
        <EmptyState
          glyph="search"
          title="Nothing matches yet"
          body="Try a broader term, a different date, or a wider distance. New sources trickle in all the time."
          action={
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setQ("");
                setDateF("any");
                setDistF("any");
              }}
            >
              Clear search
            </Button>
          }
        />
      )}
    </div>
  );
}
