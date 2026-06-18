import React from "react";

/**
 * Empty / cold-start / quiet-city state. Centered line-map glyph, a serif
 * headline, supporting line, optional action. Never a blank screen.
 */
export function EmptyState({ title, body, action, glyph = "map", style, ...rest }) {
  return (
    <div
      role={glyph === "error" ? "alert" : undefined}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
        gap: "var(--space-4)", padding: "var(--space-9) var(--space-6)", maxWidth: "34rem", margin: "0 auto",
        ...style,
      }}
      {...rest}
    >
      <span style={{
        width: "76px", height: "76px", display: "flex", alignItems: "center", justifyContent: "center",
        borderRadius: "var(--radius-pill)",
        border: "1px solid var(--border)", background: "var(--surface-card)",
        color: "var(--text-muted)",
      }} className="map-overlay">
        {glyphs[glyph] || glyphs.map}
      </span>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-display-sm)", color: "var(--text-strong)", margin: 0 }}>{title}</h3>
      {body && <p style={{ fontSize: "var(--fs-subtitle)", color: "var(--text-muted)", lineHeight: "var(--lh-normal)", margin: 0 }}>{body}</p>}
      {action && <div style={{ marginTop: "var(--space-2)" }}>{action}</div>}
    </div>
  );
}

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
const glyphs = {
  map: <svg width="34" height="34" viewBox="0 0 24 24" {...stroke}><path d="m9 4 6 2 6-2v14l-6 2-6-2-6 2V6z"/><path d="M9 4v14M15 6v14"/></svg>,
  search: <svg width="32" height="32" viewBox="0 0 24 24" {...stroke}><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>,
  saved: <svg width="32" height="32" viewBox="0 0 24 24" {...stroke}><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"/></svg>,
  quiet: <svg width="32" height="32" viewBox="0 0 24 24" {...stroke}><path d="M12 3a6 6 0 0 1 6 6c0 4-6 12-6 12S6 13 6 9a6 6 0 0 1 6-6Z"/><path d="M9.5 9h5"/></svg>,
  error: <svg width="32" height="32" viewBox="0 0 24 24" {...stroke}><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/></svg>,
};
