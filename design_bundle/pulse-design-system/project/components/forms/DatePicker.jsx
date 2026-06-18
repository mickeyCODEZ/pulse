import React from "react";

/**
 * Compact month calendar for date search. Single-date selection with month
 * navigation; today is ringed, the selected day fills with ink. Controlled via
 * value/onChange (JS Date).
 */
export function DatePicker({ value, onChange, style, ...rest }) {
  const today = new Date();
  const init = value || today;
  const [view, setView] = React.useState({ y: init.getFullYear(), m: init.getMonth() });

  const monthName = new Date(view.y, view.m, 1).toLocaleString("en-US", { month: "long", year: "numeric" });
  const firstDow = (new Date(view.y, view.m, 1).getDay() + 6) % 7; // Mon=0
  const days = new Date(view.y, view.m + 1, 0).getDate();
  const sameDay = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  const step = (d) => setView((v) => {
    const nm = v.m + d;
    return { y: v.y + Math.floor(nm / 12), m: ((nm % 12) + 12) % 12 };
  });

  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(new Date(view.y, view.m, d));

  const Chevron = ({ dir }) => (
    <button onClick={() => step(dir)} aria-label={dir < 0 ? "Previous month" : "Next month"} style={{ width: "30px", height: "30px", display: "inline-flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--border)", background: "transparent", borderRadius: "var(--radius-sm)", cursor: "pointer", color: "var(--text-body)" }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={dir < 0 ? "m15 6-6 6 6 6" : "m9 6 6 6-6 6"} /></svg>
    </button>
  );

  return (
    <div style={{ width: "280px", background: "var(--surface-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "var(--space-4)", boxShadow: "var(--shadow-3)", ...style }} {...rest}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-3)" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-subtitle)", color: "var(--text-strong)", fontWeight: "var(--fw-semibold)" }}>{monthName}</span>
        <span style={{ display: "flex", gap: "6px" }}><Chevron dir={-1} /><Chevron dir={1} /></span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px", marginBottom: "4px" }}>
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i} style={{ textAlign: "center", fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", letterSpacing: "0.04em", color: "var(--text-faint)", padding: "4px 0" }}>{d}</span>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px" }}>
        {cells.map((date, i) => {
          if (!date) return <span key={i} />;
          const isSel = sameDay(date, value);
          const isToday = sameDay(date, today);
          return (
            <button key={i} onClick={() => onChange && onChange(date)} style={{
              height: "34px", display: "inline-flex", alignItems: "center", justifyContent: "center",
              border: isToday && !isSel ? "1px solid var(--border-strong)" : "1px solid transparent",
              borderRadius: "var(--radius-pill)", cursor: "pointer",
              background: isSel ? "var(--accent)" : "transparent",
              color: isSel ? "var(--accent-fg)" : "var(--text-body)",
              fontFamily: "var(--font-sans)", fontSize: "var(--fs-sm)", fontWeight: isSel ? "var(--fw-semibold)" : "var(--fw-regular)",
              fontVariantNumeric: "tabular-nums",
              transition: "background var(--dur-1) var(--ease-out)",
            }}
              onMouseEnter={(e) => { if (!isSel) e.currentTarget.style.background = "var(--surface-raised)"; }}
              onMouseLeave={(e) => { if (!isSel) e.currentTarget.style.background = "transparent"; }}
            >{date.getDate()}</button>
          );
        })}
      </div>
    </div>
  );
}
