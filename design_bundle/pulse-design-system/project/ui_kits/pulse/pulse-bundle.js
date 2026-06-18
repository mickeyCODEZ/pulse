// AUTO-GENERATED local bundle for the Pulse UI kit. Do not edit by hand.
window.__PulseSrc = window.__PulseSrc || {};

(function(){

/**
 * Pulse brand lockup: the map-pin + radar pulse mark, optionally with the
 * "Pulse" serif wordmark. Inherits color from `currentColor`.
 */
function Logo({ size = 28, showWordmark = true, color, style, ...rest }) {
  const px = typeof size === "number" ? `${size}px` : size;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.45em",
        color: color || "var(--text-strong)",
        ...style,
      }}
      {...rest}
    >
      <svg
        width={px}
        height={px}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{ flex: "0 0 auto" }}
      >
        <path d="M12 21.6 C12 21.6 18.8 14.8 18.8 9 A6.8 6.8 0 1 0 5.2 9 C5.2 14.8 12 21.6 12 21.6 Z" />
        <circle cx="12" cy="8.8" r="1.5" fill="currentColor" stroke="none" />
        <path d="M14.7 6.1 a3.9 3.9 0 0 1 0 5.4" />
        <path d="M9.3 6.1 a3.9 3.9 0 0 0 0 5.4" />
      </svg>
      {showWordmark && (
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--fw-bold)",
            fontSize: `calc(${px} * 0.92)`,
            letterSpacing: "var(--ls-display)",
            lineHeight: 1,
          }}
        >
          Pulse
        </span>
      )}
    </span>
  );
}

  Object.assign(window.__PulseSrc, { Logo });
})();

(function(){

const sizes = {
  sm: { padding: "0 var(--space-3)", height: "36px", fontSize: "var(--fs-sm)" },
  md: { padding: "0 var(--space-5)", height: "44px", fontSize: "var(--fs-body)" },
  lg: { padding: "0 var(--space-6)", height: "52px", fontSize: "var(--fs-subtitle)" },
};

const variants = {
  primary: {
    background: "var(--accent)",
    color: "var(--accent-fg)",
    border: "1px solid var(--accent)",
  },
  secondary: {
    background: "transparent",
    color: "var(--text-strong)",
    border: "1px solid var(--border-strong)",
  },
  ghost: {
    background: "transparent",
    color: "var(--text-strong)",
    border: "1px solid transparent",
  },
};

/**
 * Primary action control. Monochrome by design: `primary` is a solid ink/bone
 * fill, `secondary` is a hairline outline, `ghost` is bare. `loading` shows a
 * spinner and blocks input to prevent double-submit.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  block = false,
  iconLeft,
  iconRight,
  disabled = false,
  loading = false,
  style,
  ...rest
}) {
  const isOff = disabled || loading;
  const spinner = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" style={{ animation: "pulse-spin 0.7s linear infinite" }} aria-hidden="true">
      <path d="M12 3a9 9 0 1 0 9 9" />
      <style>{"@keyframes pulse-spin{to{transform:rotate(360deg)}}"}</style>
    </svg>
  );
  return (
    <button
      disabled={isOff}
      aria-busy={loading || undefined}
      style={{
        display: block ? "flex" : "inline-flex",
        width: block ? "100%" : "auto",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-2)",
        fontFamily: "var(--font-condensed)",
        fontWeight: "var(--fw-semibold)",
        textTransform: "uppercase",
        letterSpacing: "0.07em",
        borderRadius: "var(--radius-pill)",
        cursor: isOff ? "not-allowed" : "pointer",
        opacity: isOff ? 0.55 : 1,
        whiteSpace: "nowrap",
        transition: "transform var(--dur-1) var(--ease-out), background var(--dur-2) var(--ease-out), border-color var(--dur-2) var(--ease-out), opacity var(--dur-2)",
        ...sizes[size],
        ...variants[variant],
        ...style,
      }}
      onMouseDown={(e) => { if (!isOff) e.currentTarget.style.transform = "scale(0.97)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      {...rest}
    >
      {loading ? spinner : iconLeft}
      {children}
      {!loading && iconRight}
    </button>
  );
}

  Object.assign(window.__PulseSrc, { Button });
})();

(function(){

const sizes = { sm: 36, md: 44, lg: 52 };

/**
 * Square/circular icon-only control. Pass a 18–22px icon node as children.
 * Meets the 44px hit-target rule at `md`+ via padding on touch surfaces.
 */
function IconButton({
  children,
  variant = "ghost",
  size = "md",
  round = false,
  active = false,
  disabled = false,
  label,
  style,
  ...rest
}) {
  const d = sizes[size];
  const base = {
    ghost: { background: "transparent", border: "1px solid transparent", color: "var(--text-body)" },
    outline: { background: "transparent", border: "1px solid var(--border-strong)", color: "var(--text-strong)" },
    solid: { background: "var(--accent)", border: "1px solid var(--accent)", color: "var(--accent-fg)" },
  }[variant];

  const activeStyle = active
    ? { background: "var(--accent-soft)", color: "var(--text-strong)", borderColor: "var(--border)" }
    : null;

  return (
    <button
      aria-label={label}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: `${d}px`,
        height: `${d}px`,
        borderRadius: round ? "var(--radius-pill)" : "var(--radius-md)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transition: "background var(--dur-2) var(--ease-out), transform var(--dur-1) var(--ease-out), color var(--dur-2)",
        ...base,
        ...activeStyle,
        ...style,
      }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = "scale(0.92)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      {...rest}
    >
      {children}
    </button>
  );
}

  Object.assign(window.__PulseSrc, { IconButton });
})();

(function(){

/**
 * Category / metadata tag. Mono, uppercase, hairline outline by default.
 * Use `solid` to invert (ink fill) for emphasis.
 */
function Tag({ children, solid = false, size = "md", style, ...rest }) {
  const pad = size === "sm" ? "2px 7px" : "3px 9px";
  const fs = size === "sm" ? "var(--fs-2xs)" : "var(--fs-xs)";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        fontFamily: "var(--font-condensed)",
        fontWeight: "var(--fw-semibold)",
        fontSize: fs,
        letterSpacing: "var(--ls-label)",
        textTransform: "uppercase",
        padding: pad,
        borderRadius: "var(--radius-sm)",
        background: solid ? "var(--accent)" : "transparent",
        color: solid ? "var(--accent-fg)" : "var(--text-muted)",
        border: solid ? "1px solid var(--accent)" : "1px solid var(--border)",
        whiteSpace: "nowrap",
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}

  Object.assign(window.__PulseSrc, { Tag });
})();

(function(){

/**
 * Small status / count badge. `tone` carries minimal chroma for feedback only;
 * default is neutral monochrome.
 */
function Badge({ children, tone = "neutral", dot = false, style, ...rest }) {
  const tones = {
    neutral: { bg: "var(--accent-soft)", fg: "var(--text-strong)" },
    inverse: { bg: "var(--accent)", fg: "var(--accent-fg)" },
    ok: { bg: "color-mix(in srgb, var(--ok) 16%, transparent)", fg: "var(--ok)" },
    warn: { bg: "color-mix(in srgb, var(--warn) 18%, transparent)", fg: "var(--warn)" },
    error: { bg: "color-mix(in srgb, var(--error) 16%, transparent)", fg: "var(--error)" },
  }[tone];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        fontFamily: "var(--font-mono)",
        fontWeight: "var(--fw-semibold)",
        fontSize: "var(--fs-2xs)",
        letterSpacing: "0.04em",
        lineHeight: 1,
        whiteSpace: "nowrap",
        flex: "0 0 auto",
        padding: dot ? "0" : "3px 7px",
        minWidth: dot ? "8px" : "auto",
        height: dot ? "8px" : "auto",
        borderRadius: "var(--radius-pill)",
        background: tones.bg,
        color: tones.fg,
        ...style,
      }}
      {...rest}
    >
      {!dot && children}
    </span>
  );
}

  Object.assign(window.__PulseSrc, { Badge });
})();

(function(){

/**
 * Generic surface container. Hairline border + restrained elevation.
 * `interactive` adds a lift-on-hover affordance; `inverse` flips to the ink
 * surface (used for the "Hidden gems" editorial treatment).
 */
function Card({
  children,
  interactive = false,
  inverse = false,
  padding = "var(--space-5)",
  elevation = 1,
  style,
  ...rest
}) {
  const shadow = `var(--shadow-${elevation})`;
  return (
    <div
      style={{
        background: inverse ? "var(--surface-inverse)" : "var(--surface-card)",
        color: inverse ? "var(--text-inverse)" : "var(--text-body)",
        border: inverse ? "1px solid var(--surface-inverse)" : "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        boxShadow: shadow,
        padding,
        transition: "transform var(--dur-3) var(--ease-out), box-shadow var(--dur-3) var(--ease-out)",
        cursor: interactive ? "pointer" : "default",
        ...style,
      }}
      onMouseEnter={interactive ? (e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "var(--shadow-3)";
      } : undefined}
      onMouseLeave={interactive ? (e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = shadow;
      } : undefined}
      {...rest}
    >
      {children}
    </div>
  );
}

  Object.assign(window.__PulseSrc, { Card });
})();

(function(){

/**
 * Avatar / identity dot. Renders initials on an ink surface, or an image.
 * Used for the "For me" profile and digest sender.
 */
function Avatar({ name = "", src, size = 36, style, ...rest }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "var(--radius-pill)",
        background: src ? "var(--surface-raised)" : "var(--accent)",
        color: "var(--accent-fg)",
        fontFamily: "var(--font-mono)",
        fontWeight: "var(--fw-semibold)",
        fontSize: `${Math.round(size * 0.34)}px`,
        letterSpacing: "0.02em",
        overflow: "hidden",
        flex: "0 0 auto",
        ...style,
      }}
      {...rest}
    >
      {src ? (
        <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        initials || "•"
      )}
    </span>
  );
}

  Object.assign(window.__PulseSrc, { Avatar });
})();

(function(){

/**
 * Text input with optional leading icon and label. Hairline field that
 * deepens its border on focus. Used for search, location, preferences.
 */
function Input({
  label,
  hint,
  iconLeft,
  size = "md",
  style,
  id,
  ...rest
}) {
  const h = size === "sm" ? "38px" : size === "lg" ? "52px" : "44px";
  const inputId = id || (label ? `in-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  return (
    <label htmlFor={inputId} style={{ display: "block", ...style }}>
      {label && (
        <span style={{
          display: "block", marginBottom: "6px",
          fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)",
          letterSpacing: "var(--ls-label)", textTransform: "uppercase",
          color: "var(--text-muted)",
        }}>{label}</span>
      )}
      <span style={{
        display: "flex", alignItems: "center", gap: "var(--space-2)",
        height: h, padding: "0 var(--space-4)",
        background: "var(--surface-card)",
        border: "1px solid var(--border-strong)",
        borderRadius: "var(--radius-md)",
        transition: "border-color var(--dur-2) var(--ease-out), box-shadow var(--dur-2)",
      }}
        onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border-strong)"; }}
      >
        {iconLeft && <span style={{ display: "flex", color: "var(--text-muted)" }}>{iconLeft}</span>}
        <input
          id={inputId}
          style={{
            flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent",
            fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)", color: "var(--text-strong)",
          }}
          {...rest}
        />
      </span>
      {hint && (
        <span style={{ display: "block", marginTop: "6px", fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>{hint}</span>
      )}
    </label>
  );
}

  Object.assign(window.__PulseSrc, { Input });
})();

(function(){

/**
 * Native select styled to the Pulse field. Used for sort order, frequency,
 * distance units.
 */
function Select({ label, value, onChange, options = [], size = "md", style, ...rest }) {
  const h = size === "sm" ? "38px" : "44px";
  return (
    <label style={{ display: "block", ...style }}>
      {label && (
        <span style={{
          display: "block", marginBottom: "6px",
          fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)",
          letterSpacing: "var(--ls-label)", textTransform: "uppercase",
          color: "var(--text-muted)",
        }}>{label}</span>
      )}
      <span style={{ position: "relative", display: "block" }}>
        <select
          value={value}
          onChange={onChange}
          style={{
            appearance: "none", WebkitAppearance: "none",
            width: "100%", height: h, padding: "0 38px 0 var(--space-4)",
            background: "var(--surface-card)",
            border: "1px solid var(--border-strong)", borderRadius: "var(--radius-md)",
            fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)", color: "var(--text-strong)",
            cursor: "pointer",
          }}
          {...rest}
        >
          {options.map((o) => {
            const val = typeof o === "string" ? o : o.value;
            const lbl = typeof o === "string" ? o : o.label;
            return <option key={val} value={val}>{lbl}</option>;
          })}
        </select>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </span>
    </label>
  );
}

  Object.assign(window.__PulseSrc, { Select });
})();

(function(){

/**
 * On/off switch. Used for dealbreakers (free-only, nights & weekends) and
 * notification toggles. Track fills with ink when on.
 */
function Switch({ checked = false, onChange, disabled = false, label, style, ...rest }) {
  const toggle = () => { if (!disabled && onChange) onChange(!checked); };
  return (
    <span
      role="switch"
      aria-checked={checked}
      onClick={toggle}
      style={{
        display: "inline-flex", alignItems: "center", gap: "var(--space-3)",
        cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1,
        ...style,
      }}
      {...rest}
    >
      <span style={{
        position: "relative", width: "44px", height: "26px", flex: "0 0 auto",
        borderRadius: "var(--radius-pill)",
        background: checked ? "var(--accent)" : "var(--surface-raised)",
        border: `1px solid ${checked ? "var(--accent)" : "var(--border-strong)"}`,
        transition: "background var(--dur-2) var(--ease-out), border-color var(--dur-2)",
      }}>
        <span style={{
          position: "absolute", top: "2px", left: checked ? "20px" : "2px",
          width: "20px", height: "20px", borderRadius: "var(--radius-pill)",
          background: checked ? "var(--accent-fg)" : "var(--surface-card)",
          boxShadow: "var(--shadow-1)",
          transition: "left var(--dur-2) var(--ease-spring)",
        }} />
      </span>
      {label && <span style={{ fontSize: "var(--fs-body)", color: "var(--text-body)" }}>{label}</span>}
    </span>
  );
}

  Object.assign(window.__PulseSrc, { Switch });
})();

(function(){

/**
 * Selectable interest token used in onboarding & preferences. Tap to toggle;
 * selected state inverts to ink fill with a check.
 */
function Checkbox({ checked = false, onChange, label, style, ...rest }) {
  return (
    <button
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange && onChange(!checked)}
      style={{
        display: "inline-flex", alignItems: "center", gap: "var(--space-2)",
        height: "44px", padding: "0 var(--space-4)",
        background: checked ? "var(--accent)" : "var(--surface-card)",
        color: checked ? "var(--accent-fg)" : "var(--text-body)",
        border: `1px solid ${checked ? "var(--accent)" : "var(--border-strong)"}`,
        borderRadius: "var(--radius-pill)",
        fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)", fontWeight: "var(--fw-medium)",
        cursor: "pointer",
        transition: "background var(--dur-2) var(--ease-out), color var(--dur-2), border-color var(--dur-2)",
        ...style,
      }}
      {...rest}
    >
      <span style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: "18px", height: "18px", flex: "0 0 auto",
      }}>
        {checked ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" opacity="0.55" /></svg>
        )}
      </span>
      {label}
    </button>
  );
}

  Object.assign(window.__PulseSrc, { Checkbox });
})();

(function(){

/**
 * Segmented control for 2–4 mutually-exclusive options — the boost/mute
 * tri-state and time-window pickers in Preferences.
 */
function SegmentedControl({ options = [], value, onChange, size = "md", style, ...rest }) {
  const h = size === "sm" ? "34px" : "40px";
  return (
    <div
      style={{
        display: "inline-flex", padding: "3px", gap: "2px",
        background: "var(--surface-sunken)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-pill)",
        ...style,
      }}
      {...rest}
    >
      {options.map((o) => {
        const val = typeof o === "string" ? o : o.value;
        const lbl = typeof o === "string" ? o : o.label;
        const active = val === value;
        return (
          <button
            key={val}
            onClick={() => onChange && onChange(val)}
            style={{
              height: h, padding: "0 var(--space-4)",
              border: "none", borderRadius: "var(--radius-pill)",
              background: active ? "var(--accent)" : "transparent",
              color: active ? "var(--accent-fg)" : "var(--text-muted)",
              fontFamily: "var(--font-sans)", fontSize: "var(--fs-sm)", fontWeight: "var(--fw-semibold)",
              cursor: "pointer", whiteSpace: "nowrap",
              transition: "background var(--dur-2) var(--ease-out), color var(--dur-2)",
            }}
          >
            {lbl}
          </button>
        );
      })}
    </div>
  );
}

  Object.assign(window.__PulseSrc, { SegmentedControl });
})();

(function(){

/**
 * Compact month calendar for date search. Single-date selection with month
 * navigation; today is ringed, the selected day fills with ink. Controlled via
 * value/onChange (JS Date).
 */
function DatePicker({ value, onChange, style, ...rest }) {
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

  Object.assign(window.__PulseSrc, { DatePicker });
})();

(function(){

/**
 * Lightweight transient notice — confirms saves/dismisses and "added to
 * calendar". Ink surface, optional undo action. Auto-styled; you control
 * mount/unmount.
 */
function Toast({ message, actionLabel, onAction, icon, style, ...rest }) {
  return (
    <div
      role="status"
      style={{
        display: "inline-flex", alignItems: "center", gap: "var(--space-3)",
        padding: "var(--space-3) var(--space-3) var(--space-3) var(--space-4)",
        background: "var(--surface-inverse)", color: "var(--text-inverse)",
        borderRadius: "var(--radius-pill)",
        boxShadow: "var(--shadow-3)",
        fontFamily: "var(--font-sans)", fontSize: "var(--fs-sm)", fontWeight: "var(--fw-medium)",
        ...style,
      }}
      {...rest}
    >
      {icon && <span style={{ display: "flex", opacity: 0.85 }}>{icon}</span>}
      <span>{message}</span>
      {actionLabel && (
        <button
          onClick={onAction}
          style={{
            border: "1px solid color-mix(in srgb, var(--text-inverse) 32%, transparent)",
            background: "transparent", color: "var(--text-inverse)",
            fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)",
            letterSpacing: "var(--ls-label)", textTransform: "uppercase",
            padding: "6px 12px", borderRadius: "var(--radius-pill)", cursor: "pointer",
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

  Object.assign(window.__PulseSrc, { Toast });
})();

(function(){

/**
 * Loading placeholder. A subtle shimmer over a neutral block — used during
 * cold-start and infinite-scroll. Compose `EventCardSkeleton` from these.
 */
function Skeleton({ width = "100%", height = "16px", radius = "var(--radius-sm)", style, ...rest }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "block", width, height, borderRadius: radius,
        background: "linear-gradient(100deg, var(--surface-raised) 30%, var(--surface-sunken) 50%, var(--surface-raised) 70%)",
        backgroundSize: "200% 100%",
        animation: "pulse-shimmer 1.4s var(--ease-inout) infinite",
        ...style,
      }}
      {...rest}
    >
      <style>{`@keyframes pulse-shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
        @media (prefers-reduced-motion: reduce){[aria-hidden="true"]{animation:none!important}}`}</style>
    </span>
  );
}

/** Full event-card skeleton (image + two text rows). */
function EventCardSkeleton({ style }) {
  return (
    <div style={{
      background: "var(--surface-card)", border: "1px solid var(--border)",
      borderRadius: "var(--radius-lg)", overflow: "hidden", ...style,
    }}>
      <Skeleton height="150px" radius="0" />
      <div style={{ padding: "var(--space-4)", display: "flex", flexDirection: "column", gap: "10px" }}>
        <Skeleton width="38%" height="11px" />
        <Skeleton width="80%" height="20px" />
        <Skeleton width="55%" height="13px" />
      </div>
    </div>
  );
}

  Object.assign(window.__PulseSrc, { Skeleton, EventCardSkeleton });
})();

(function(){

/**
 * Empty / cold-start / quiet-city state. Centered line-map glyph, a serif
 * headline, supporting line, optional action. Never a blank screen.
 */
function EmptyState({ title, body, action, glyph = "map", style, ...rest }) {
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

  Object.assign(window.__PulseSrc, { EmptyState });
})();

(function(){

/**
 * Single filter chip. Toggles between hairline (off) and ink-fill (on).
 * Optional leading icon and trailing count.
 */
function FilterChip({ children, active = false, icon, count, onClick, style, ...rest }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        height: "40px", padding: "0 var(--space-4)", flex: "0 0 auto",
        backgroundColor: active ? "var(--accent)" : "var(--surface-card)",
        color: active ? "var(--accent-fg)" : "var(--text-body)",
        border: `1px solid ${active ? "var(--accent)" : "var(--border-strong)"}`,
        borderRadius: "var(--radius-pill)",
        fontFamily: "var(--font-condensed)", fontSize: "var(--fs-sm)", fontWeight: "var(--fw-medium)", textTransform: "uppercase", letterSpacing: "0.05em",
        whiteSpace: "nowrap", cursor: "pointer",
        transition: "background-color var(--dur-2) var(--ease-out), color var(--dur-2), border-color var(--dur-2)",
        ...style,
      }}
      {...rest}
    >
      {icon && <span style={{ display: "flex" }}>{icon}</span>}
      {children}
      {count != null && (
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)",
          opacity: 0.7, marginLeft: "2px",
        }}>{count}</span>
      )}
    </button>
  );
}

  Object.assign(window.__PulseSrc, { FilterChip });
})();

(function(){
  const { FilterChip } = window.__PulseSrc;

/**
 * Horizontally-scrollable filter chip bar. Sticky at the top of the feed.
 * Pass `filters` as a list; `active` is the set of selected keys.
 */
function FilterBar({ filters = [], active = [], onToggle, sticky = true, style, ...rest }) {
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

  Object.assign(window.__PulseSrc, { FilterBar });
})();

(function(){

/**
 * Search field — pill input with leading search glyph and a clear button.
 * Used for event search and the city picker. Controlled via value/onChange.
 */
function SearchBar({ value = "", onChange, onSubmit, onClear, placeholder = "Search", autoFocus = false, size = "md", style, ...rest }) {
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

  Object.assign(window.__PulseSrc, { SearchBar });
})();

(function(){

/**
 * Mobile bottom navigation. Five slots max. Active slot shows the ink mark +
 * label; others are muted. Honors safe-area inset.
 */
function BottomNav({ items = [], active, onSelect, style, ...rest }) {
  return (
    <nav
      style={{
        display: "flex", justifyContent: "space-around", alignItems: "stretch",
        height: "var(--bottomnav-h)",
        paddingBottom: "env(safe-area-inset-bottom, 0)",
        background: "color-mix(in srgb, var(--surface-card) 92%, transparent)",
        backdropFilter: "blur(var(--blur-md))", WebkitBackdropFilter: "blur(var(--blur-md))",
        borderTop: "1px solid var(--border)",
        ...style,
      }}
      {...rest}
    >
      {items.map((it) => {
        const on = it.key === active;
        return (
          <button
            key={it.key}
            onClick={() => onSelect && onSelect(it.key)}
            style={{
              flex: 1, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: "3px",
              border: "none", background: "transparent", cursor: "pointer",
              color: on ? "var(--text-strong)" : "var(--text-faint)",
              position: "relative",
              transition: "color var(--dur-2) var(--ease-out)",
            }}
          >
            <span style={{ display: "flex", position: "relative" }}>
              {it.icon}
              {it.badge && (
                <span style={{
                  position: "absolute", top: "-3px", right: "-6px",
                  width: "7px", height: "7px", borderRadius: "var(--radius-pill)",
                  background: "var(--accent)", border: "1.5px solid var(--surface-card)",
                }} />
              )}
            </span>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "9px",
              letterSpacing: "0.06em", textTransform: "uppercase",
              fontWeight: on ? "var(--fw-semibold)" : "var(--fw-regular)",
            }}>{it.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

  Object.assign(window.__PulseSrc, { BottomNav });
})();

(function(){

/**
 * Desktop left-rail navigation. Vertical list of destinations with the active
 * item marked by an ink bar + fill. Pairs with the 3-zone shell.
 */
function SidebarNav({ items = [], active, onSelect, footer, style, ...rest }) {
  return (
    <nav
      style={{ display: "flex", flexDirection: "column", gap: "2px", ...style }}
      {...rest}
    >
      {items.map((it) => {
        const on = it.key === active;
        return (
          <button
            key={it.key}
            onClick={() => onSelect && onSelect(it.key)}
            style={{
              display: "flex", alignItems: "center", gap: "var(--space-3)",
              height: "42px", padding: "0 var(--space-3)", width: "100%",
              border: "none", borderRadius: "var(--radius-md)", cursor: "pointer",
              background: on ? "var(--accent-soft)" : "transparent",
              color: on ? "var(--text-strong)" : "var(--text-muted)",
              fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)",
              fontWeight: on ? "var(--fw-semibold)" : "var(--fw-medium)",
              position: "relative", textAlign: "left",
              transition: "background var(--dur-2) var(--ease-out), color var(--dur-2)",
            }}
            onMouseEnter={(e) => { if (!on) e.currentTarget.style.background = "var(--surface-raised)"; }}
            onMouseLeave={(e) => { if (!on) e.currentTarget.style.background = "transparent"; }}
          >
            {on && <span style={{
              position: "absolute", left: 0, top: "9px", bottom: "9px", width: "3px",
              borderRadius: "var(--radius-pill)", background: "var(--accent)",
            }} />}
            <span style={{ display: "flex", flex: "0 0 auto" }}>{it.icon}</span>
            <span style={{ flex: 1 }}>{it.label}</span>
            {it.badge && (
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)",
                background: "var(--accent)", color: "var(--accent-fg)",
                padding: "1px 6px", borderRadius: "var(--radius-pill)",
              }}>{it.badge}</span>
            )}
          </button>
        );
      })}
      {footer && <div style={{ marginTop: "auto" }}>{footer}</div>}
    </nav>
  );
}

  Object.assign(window.__PulseSrc, { SidebarNav });
})();

(function(){

/**
 * Relevance chip — the "why this surfaced" signal that makes a high-volume
 * feed feel curated. A small radar glyph + the matched reasons.
 */
function RelevanceChip({ reasons = [], score, compact = false, style, ...rest }) {
  const text = Array.isArray(reasons) ? reasons.join(" · ") : reasons;
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: "7px",
        padding: compact ? "3px 9px 3px 7px" : "5px 11px 5px 9px",
        background: "var(--spot-soft)",
        border: "1px solid color-mix(in srgb, var(--spot) 30%, transparent)",
        borderRadius: "var(--radius-pill)",
        color: "var(--text-strong)",
        maxWidth: "100%",
        ...style,
      }}
      {...rest}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--spot)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto" }}>
        <circle cx="12" cy="12" r="2.2" fill="var(--spot)" stroke="none" />
        <path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7" />
      </svg>
      <span style={{
        fontFamily: "var(--font-condensed)", fontSize: "var(--fs-sm)",
        letterSpacing: "0.03em", whiteSpace: "nowrap",
        overflow: "hidden", textOverflow: "ellipsis",
      }}>
        <b style={{ fontWeight: "var(--fw-semibold)", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--spot)" }}>Matches</b>
        <span style={{ color: "var(--text-muted)" }}>{" "}{text}</span>
      </span>
      {score != null && (
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)",
          fontWeight: "var(--fw-semibold)", color: "var(--text-muted)",
          paddingLeft: "5px", marginLeft: "1px", borderLeft: "1px solid var(--border)",
        }}>{score}%</span>
      )}
    </span>
  );
}

  Object.assign(window.__PulseSrc, { RelevanceChip });
})();

(function(){

/**
 * Source attribution + dedup. Shows the primary source the event was found on,
 * plus an "also on …" chip when the same event was deduped across platforms —
 * the transparency signal the aggregation depends on.
 */
function SourceBadge({ sources = [], style, ...rest }) {
  const list = Array.isArray(sources) ? sources : [sources];
  const [primary, ...rest2] = list;
  if (!primary) return null;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", flexWrap: "wrap", ...style }} {...rest}>
      <span style={{
        display: "inline-flex", alignItems: "center", gap: "5px",
        fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)",
        letterSpacing: "0.02em", color: "var(--text-muted)",
      }}>
        <span style={{ width: "5px", height: "5px", borderRadius: "var(--radius-pill)", background: "var(--text-muted)" }} />
        via {primary}
      </span>
      {rest2.length > 0 && (
        <span style={{
          display: "inline-flex", alignItems: "center", gap: "4px",
          fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)",
          letterSpacing: "0.04em", textTransform: "uppercase",
          color: "var(--text-muted)",
          padding: "2px 7px", borderRadius: "var(--radius-sm)",
          border: "1px dashed var(--border-strong)",
        }}>
          also on {rest2.join(", ")}
        </span>
      )}
    </span>
  );
}

  Object.assign(window.__PulseSrc, { SourceBadge });
})();

(function(){

/**
 * Price marker. "Free" renders as a solid ink tag; a number renders as a
 * glassy capsule for overlay on imagery. Pass `overlay` when on a photo.
 */
function PriceTag({ price, free = false, overlay = false, style, ...rest }) {
  const label = free ? "Free" : typeof price === "number" ? `$${price}` : price;
  if (free) {
    return (
      <span style={{
        fontFamily: "var(--font-mono)", fontWeight: "var(--fw-semibold)",
        fontSize: "var(--fs-xs)", letterSpacing: "var(--ls-label)", textTransform: "uppercase",
        padding: "4px 9px", borderRadius: "var(--radius-sm)",
        background: overlay ? "var(--white)" : "var(--accent)",
        color: overlay ? "var(--black)" : "var(--accent-fg)",
        ...style,
      }} {...rest}>{label}</span>
    );
  }
  return (
    <span style={{
      fontFamily: "var(--font-mono)", fontWeight: "var(--fw-semibold)",
      fontSize: "var(--fs-xs)", letterSpacing: "0.02em",
      padding: "4px 9px", borderRadius: "var(--radius-sm)",
      background: overlay ? "color-mix(in srgb, var(--black) 55%, transparent)" : "var(--accent-soft)",
      color: overlay ? "var(--white)" : "var(--text-strong)",
      backdropFilter: overlay ? "blur(var(--blur-sm))" : "none",
      WebkitBackdropFilter: overlay ? "blur(var(--blur-sm))" : "none",
      border: overlay ? "1px solid color-mix(in srgb, var(--white) 22%, transparent)" : "1px solid var(--border)",
      ...style,
    }} {...rest}>{label}</span>
  );
}

  Object.assign(window.__PulseSrc, { PriceTag });
})();

(function(){
  const { IconButton } = window.__PulseSrc;

/**
 * Save / dismiss control pair for cards. Dismiss is deliberately lightweight —
 * it teaches the ranker, not deletes. `onDismiss` should feel reversible.
 */
function SaveDismiss({ saved = false, onSave, onDismiss, overlay = false, size = "md", style, ...rest }) {
  const bookmark = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
    </svg>
  );
  const x = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
  const overlayStyle = overlay ? {
    background: "color-mix(in srgb, var(--black) 42%, transparent)",
    color: "var(--white)",
    backdropFilter: "blur(var(--blur-sm))",
    WebkitBackdropFilter: "blur(var(--blur-sm))",
    border: "1px solid color-mix(in srgb, var(--white) 22%, transparent)",
  } : undefined;
  return (
    <div style={{ display: "inline-flex", gap: "var(--space-2)", ...style }} {...rest}>
      <IconButton label="Dismiss" size={size} round variant={overlay ? "ghost" : "outline"} onClick={onDismiss} style={overlayStyle}>{x}</IconButton>
      <IconButton label={saved ? "Saved" : "Save"} size={size} round variant={overlay ? "ghost" : "outline"} active={saved && !overlay} onClick={onSave}
        style={overlay ? overlayStyle : (saved ? { background: "var(--accent)", color: "var(--accent-fg)", borderColor: "var(--accent)" } : undefined)}>{bookmark}</IconButton>
    </div>
  );
}

  Object.assign(window.__PulseSrc, { SaveDismiss });
})();

(function(){

/**
 * Map marker for the desktop map panel. Shows a price (or "Free") in a pill,
 * or a bare dot for low-emphasis points. `selected` and `gem` change emphasis.
 */
function MapPin({ label, free = false, selected = false, gem = false, dot = false, onClick, style, ...rest }) {
  if (dot) {
    return (
      <button onClick={onClick} aria-label={label} style={{
        width: "12px", height: "12px", padding: 0, borderRadius: "var(--radius-pill)",
        border: "2px solid var(--surface-page)", cursor: "pointer",
        background: selected ? "var(--accent)" : "var(--text-muted)",
        boxShadow: "var(--shadow-1)", ...style,
      }} {...rest} />
    );
  }
  const text = free ? "Free" : label;
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: "5px",
      padding: "4px 10px", cursor: "pointer",
      fontFamily: "var(--font-mono)", fontWeight: "var(--fw-semibold)", fontSize: "var(--fs-xs)",
      borderRadius: "var(--radius-pill)",
      background: selected ? "var(--accent)" : "var(--surface-card)",
      color: selected ? "var(--accent-fg)" : "var(--text-strong)",
      border: `1px solid ${selected ? "var(--accent)" : "var(--border-strong)"}`,
      boxShadow: selected ? "var(--shadow-3)" : "var(--shadow-1)",
      transform: selected ? "scale(1.06)" : "scale(1)",
      transition: "all var(--dur-2) var(--ease-out)",
      position: "relative", ...style,
    }} {...rest}>
      {gem && (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l2.5 5.2 5.5.6-4 3.8 1 5.4L12 17l-5 2.8 1-5.4-4-3.8 5.5-.6z" />
        </svg>
      )}
      {text}
    </button>
  );
}

  Object.assign(window.__PulseSrc, { MapPin });
})();

(function(){
  const { Tag, RelevanceChip, SourceBadge, PriceTag, SaveDismiss } = window.__PulseSrc;

/**
 * The key component. Image-forward, ranked event card showing why it surfaced
 * (relevance), where it was found (sources + dedup), price, and lightweight
 * save/dismiss. `gem` applies the inverted "Hidden gems" treatment.
 */
function EventCard({
  event = {},
  variant = "feed",
  saved = false,
  onSave,
  onDismiss,
  onOpen,
  style,
  ...rest
}) {
  const {
    category, title, date, venue, distance, price, free,
    relevance = [], sources = [], freshness, gem, score, imageStyle,
  } = event;

  const meta = [date, venue, distance].filter(Boolean).join("  ·  ");

  if (variant === "compact") {
    return (
      <div onClick={onOpen} style={{
        display: "flex", gap: "var(--space-3)", alignItems: "stretch",
        padding: "var(--space-3)", background: "var(--surface-card)",
        border: "1px solid var(--border)", borderRadius: "var(--radius-lg)",
        cursor: onOpen ? "pointer" : "default", ...style,
      }} {...rest}>
        <div className="img-duotone" style={{ width: "84px", flex: "0 0 auto", borderRadius: "var(--radius-md)", ...imageStyle }} />
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {category && <Tag size="sm">{category}</Tag>}
            {(free || price != null) && <PriceTag price={price} free={free} />}
          </div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-title)", color: "var(--text-strong)", lineHeight: "var(--lh-snug)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</h3>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-muted)", letterSpacing: "0.02em" }}>{meta}</div>
          {relevance.length > 0 && <RelevanceChip reasons={relevance} compact style={{ marginTop: "2px" }} />}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <SaveDismiss saved={saved} onSave={(e) => { e?.stopPropagation?.(); onSave?.(); }} onDismiss={(e) => { e?.stopPropagation?.(); onDismiss?.(); }} size="sm" />
        </div>
      </div>
    );
  }

  const inverse = !!gem;
  const chipDark = inverse ? {
    background: "color-mix(in srgb, var(--text-inverse) 12%, transparent)",
    borderColor: "color-mix(in srgb, var(--text-inverse) 20%, transparent)",
    color: "var(--text-inverse)",
  } : undefined;

  return (
    <article style={{
      background: inverse ? "var(--surface-inverse)" : "var(--surface-card)",
      color: inverse ? "var(--text-inverse)" : "var(--text-body)",
      border: `1px solid ${inverse ? "var(--surface-inverse)" : "var(--border)"}`,
      borderRadius: "var(--radius-lg)", overflow: "hidden",
      boxShadow: "var(--shadow-2)",
      transition: "transform var(--dur-3) var(--ease-out), box-shadow var(--dur-3) var(--ease-out)",
      ...style,
    }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "var(--shadow-3)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "var(--shadow-2)"; }}
      {...rest}
    >
      {/* Image */}
      <div className="img-duotone" onClick={onOpen} style={{ position: "relative", height: "196px", cursor: onOpen ? "pointer" : "default", ...imageStyle }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "var(--space-3)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              {gem && (
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "5px",
                  fontFamily: "var(--font-mono)", fontWeight: "var(--fw-semibold)",
                  fontSize: "var(--fs-2xs)", letterSpacing: "var(--ls-label)", textTransform: "uppercase",
                  padding: "4px 9px", borderRadius: "var(--radius-sm)",
                  background: "var(--white)", color: "var(--black)",
                }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l2.5 5.2 5.5.6-4 3.8 1 5.4L12 17l-5 2.8 1-5.4-4-3.8 5.5-.6z" /></svg>
                  Hidden gem
                </span>
              )}
              {freshness && (
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", letterSpacing: "0.03em",
                  padding: "4px 8px", borderRadius: "var(--radius-sm)",
                  background: "color-mix(in srgb, var(--black) 45%, transparent)", color: "var(--white)",
                  backdropFilter: "blur(var(--blur-sm))", WebkitBackdropFilter: "blur(var(--blur-sm))", whiteSpace: "nowrap",
                }}>{freshness}</span>
              )}
            </div>
            <SaveDismiss saved={saved} overlay onSave={(e) => { e?.stopPropagation?.(); onSave?.(); }} onDismiss={(e) => { e?.stopPropagation?.(); onDismiss?.(); }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            {category && <Tag size="sm" style={{ background: "color-mix(in srgb, var(--black) 45%, transparent)", color: "var(--white)", border: "1px solid color-mix(in srgb, var(--white) 22%, transparent)", backdropFilter: "blur(var(--blur-sm))" }}>{category}</Tag>}
            {(free || price != null) && <PriceTag price={price} free={free} overlay />}
          </div>
        </div>
      </div>

      {/* Body */}
      <div onClick={onOpen} style={{ padding: "var(--space-4) var(--space-5) var(--space-5)", display: "flex", flexDirection: "column", gap: "var(--space-3)", cursor: onOpen ? "pointer" : "default" }}>
        <div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-display-sm)", color: inverse ? "var(--text-inverse)" : "var(--text-strong)", lineHeight: "var(--lh-snug)", margin: "0 0 6px", letterSpacing: "var(--ls-tight)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{title}</h3>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", letterSpacing: "0.03em", color: inverse ? "color-mix(in srgb, var(--text-inverse) 72%, transparent)" : "var(--text-muted)" }}>{meta}</div>
        </div>
        {relevance.length > 0 && (
          <div style={{ display: "flex" }}>
            <RelevanceChip reasons={relevance} score={score} style={chipDark} />
          </div>
        )}
        {sources.length > 0 && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "var(--space-1)", borderTop: `1px solid ${inverse ? "color-mix(in srgb, var(--text-inverse) 14%, transparent)" : "var(--border)"}` }}>
            <SourceBadge sources={sources} style={inverse ? { color: "var(--text-inverse)" } : undefined} />
          </div>
        )}
      </div>
    </article>
  );
}

  Object.assign(window.__PulseSrc, { EventCard });
})();

(function(){
  const { RelevanceChip, PriceTag } = window.__PulseSrc;

/**
 * Compact digest row — a date-grouped event line for the daily/weekly digest
 * and push previews. Number index + title + meta + price.
 */
function DigestItem({ index, event = {}, onOpen, style, ...rest }) {
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

  Object.assign(window.__PulseSrc, { DigestItem });
})();

(function(){

/**
 * Location switcher — the "travel anywhere" control. Shows the active city and
 * opens the city picker. When `loading`, it surfaces the progressive cold-start
 * status ("still finding local gems…") instead of a blank wait.
 */
function LocationSwitcher({ city, loading = false, statusText, onClick, size = "md", style, ...rest }) {
  const big = size === "lg";
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: "var(--space-2)",
      padding: big ? "8px 14px" : "6px 12px",
      background: "transparent", border: "1px solid var(--border)",
      borderRadius: "var(--radius-pill)", cursor: "pointer",
      transition: "background var(--dur-2) var(--ease-out), border-color var(--dur-2)",
      ...style,
    }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "var(--surface-raised)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
      {...rest}
    >
      <svg width={big ? 18 : 16} height={big ? 18 : 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-strong)", flex: "0 0 auto" }}>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.6" />
      </svg>
      <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1.1, minWidth: 0 }}>
        <span style={{
          fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)",
          fontSize: big ? "var(--fs-title)" : "var(--fs-body)", color: "var(--text-strong)",
          letterSpacing: "var(--ls-tight)", whiteSpace: "nowrap",
        }}>{city}</span>
        {loading && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", marginTop: "3px" }}>
            <span className="pulse-ls-dot" style={{ width: "5px", height: "5px", borderRadius: "var(--radius-pill)", background: "var(--text-muted)" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", letterSpacing: "0.03em", color: "var(--text-muted)" }}>
              {statusText || "still finding local gems…"}
            </span>
            <style>{`@keyframes pulse-ls-blink{0%,100%{opacity:.25}50%{opacity:1}} .pulse-ls-dot{animation:pulse-ls-blink 1.1s var(--ease-inout) infinite}
              @media (prefers-reduced-motion: reduce){.pulse-ls-dot{animation:none}}`}</style>
          </span>
        )}
      </span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--text-muted)", marginLeft: "2px", flex: "0 0 auto" }}><path d="m6 9 6 6 6-6" /></svg>
    </button>
  );
}

  Object.assign(window.__PulseSrc, { LocationSwitcher });
})();

window.PulseDesignSystem_3c2543 = window.__PulseSrc;
