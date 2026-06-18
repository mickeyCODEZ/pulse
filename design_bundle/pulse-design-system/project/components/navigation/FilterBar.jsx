import React from "react";
import { FilterChip } from "./FilterChip.jsx";

/**
 * Horizontally-scrollable filter chip bar. Sticky at the top of the feed.
 * Pass `filters` as a list; `active` is the set of selected keys.
 */
export function FilterBar({ filters = [], active = [], onToggle, sticky = true, style, ...rest }) {
  return (
    <div
      style={{
        position: sticky ? "sticky" : "static", top: 0, zIndex: 5,
        display: "flex", gap: "var(--space-2)",
        padding: "var(--space-3) var(--gutter-mobile)",
        overflowX: "auto", scrollbarWidth: "none",
        background: "color-mix(in srgb, var(--surface-page) 86%, transparent)",
        backdropFilter: "saturate(1.2) blur(var(--blur-md))",
        WebkitBackdropFilter: "saturate(1.2) blur(var(--blur-md))",
        borderBottom: "1px solid var(--border)",
        ...style,
      }}
      {...rest}
    >
      <style>{`.pulse-filterbar::-webkit-scrollbar{display:none}`}</style>
      {filters.map((f) => {
        const key = typeof f === "string" ? f : f.key;
        const label = typeof f === "string" ? f : f.label;
        const icon = typeof f === "string" ? null : f.icon;
        const count = typeof f === "string" ? null : f.count;
        return (
          <FilterChip
            key={key}
            active={active.includes(key)}
            icon={icon}
            count={count}
            onClick={() => onToggle && onToggle(key)}
          >
            {label}
          </FilterChip>
        );
      })}
    </div>
  );
}
