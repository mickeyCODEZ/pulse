import React from "react";
import { RelevanceChip } from "./RelevanceChip.jsx";
import { PriceTag } from "./PriceTag.jsx";

/**
 * Compact digest row — a date-grouped event line for the daily/weekly digest
 * and push previews. Number index + title + meta + price.
 */
export function DigestItem({ index, event = {}, onOpen, style, ...rest }) {
  const { title, date, venue, distance, price, free, relevance = [], category } = event;
  const meta = [date, venue, distance].filter(Boolean).join("  ·  ");
  return (
    <div onClick={onOpen} style={{
      display: "flex", gap: "var(--space-4)", alignItems: "flex-start",
      padding: "var(--space-4) 0", borderBottom: "1px solid var(--border)",
      cursor: onOpen ? "pointer" : "default", ...style,
    }} {...rest}>
      {index != null && (
        <span style={{
          fontFamily: "var(--font-display)", fontSize: "var(--fs-display-sm)",
          fontWeight: "var(--fw-medium)", color: "var(--text-faint)",
          lineHeight: 1, flex: "0 0 auto", minWidth: "1.4em", fontVariantNumeric: "tabular-nums",
        }}>{String(index).padStart(2, "0")}</span>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-title)", color: "var(--text-strong)", margin: "0 0 4px", lineHeight: "var(--lh-snug)" }}>{title}</h4>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-muted)", letterSpacing: "0.02em", marginBottom: "8px" }}>
          {category ? `${category}  ·  ${meta}` : meta}
        </div>
        {relevance.length > 0 && <RelevanceChip reasons={relevance} compact />}
      </div>
      <div style={{ flex: "0 0 auto" }}>
        {(free || price != null) && <PriceTag price={price} free={free} />}
      </div>
    </div>
  );
}
