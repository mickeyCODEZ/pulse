import React from "react";

/**
 * Search field — pill input with leading search glyph and a clear button.
 * Used for event search and the city picker. Controlled via value/onChange.
 */
export function SearchBar({ value = "", onChange, onSubmit, onClear, placeholder = "Search", autoFocus = false, size = "md", style, ...rest }) {
  const h = size === "lg" ? "54px" : size === "sm" ? "40px" : "46px";
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit && onSubmit(value); }}
      style={{
        display: "flex", alignItems: "center", gap: "var(--space-2)",
        height: h, padding: "0 var(--space-3) 0 var(--space-4)",
        background: "var(--surface-card)",
        border: "1px solid var(--border-strong)",
        borderRadius: "var(--radius-pill)",
        transition: "border-color var(--dur-2) var(--ease-out)",
        ...style,
      }}
      onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
      onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border-strong)"; }}
      {...rest}
    >
      <svg width={size === "lg" ? 22 : 19} height={size === "lg" ? 22 : 19} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-muted)", flex: "0 0 auto" }}>
        <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="search"
        value={value}
        autoFocus={autoFocus}
        placeholder={placeholder}
        aria-label={placeholder || "Search"}
        onChange={(e) => onChange && onChange(e.target.value)}
        style={{
          flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent",
          fontFamily: "var(--font-sans)", fontSize: size === "lg" ? "var(--fs-subtitle)" : "var(--fs-body)",
          color: "var(--text-strong)",
        }}
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => { onChange && onChange(""); onClear && onClear(); }}
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: "28px", height: "28px", flex: "0 0 auto",
            border: "none", borderRadius: "var(--radius-pill)", cursor: "pointer",
            background: "var(--accent-soft)", color: "var(--text-muted)",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>
      )}
    </form>
  );
}
