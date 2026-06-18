/* @ds-bundle: {"format":3,"namespace":"PulseDesignSystem_3c2543","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Logo","sourcePath":"components/core/Logo.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"DigestItem","sourcePath":"components/events/DigestItem.jsx"},{"name":"EventCard","sourcePath":"components/events/EventCard.jsx"},{"name":"LocationSwitcher","sourcePath":"components/events/LocationSwitcher.jsx"},{"name":"MapPin","sourcePath":"components/events/MapPin.jsx"},{"name":"PriceTag","sourcePath":"components/events/PriceTag.jsx"},{"name":"RelevanceChip","sourcePath":"components/events/RelevanceChip.jsx"},{"name":"SaveDismiss","sourcePath":"components/events/SaveDismiss.jsx"},{"name":"SourceBadge","sourcePath":"components/events/SourceBadge.jsx"},{"name":"EmptyState","sourcePath":"components/feedback/EmptyState.jsx"},{"name":"Skeleton","sourcePath":"components/feedback/Skeleton.jsx"},{"name":"EventCardSkeleton","sourcePath":"components/feedback/Skeleton.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"DatePicker","sourcePath":"components/forms/DatePicker.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"SegmentedControl","sourcePath":"components/forms/SegmentedControl.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"BottomNav","sourcePath":"components/navigation/BottomNav.jsx"},{"name":"FilterBar","sourcePath":"components/navigation/FilterBar.jsx"},{"name":"FilterChip","sourcePath":"components/navigation/FilterChip.jsx"},{"name":"SearchBar","sourcePath":"components/navigation/SearchBar.jsx"},{"name":"SidebarNav","sourcePath":"components/navigation/SidebarNav.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"b2449398d20c","components/core/Badge.jsx":"95eafc7ea217","components/core/Button.jsx":"cd80986c218c","components/core/Card.jsx":"f57db2c166b6","components/core/IconButton.jsx":"2cfc63d0a889","components/core/Logo.jsx":"2329a5684a99","components/core/Tag.jsx":"ffb422dd7954","components/events/DigestItem.jsx":"3bda53541f49","components/events/EventCard.jsx":"5c9a07e482f1","components/events/LocationSwitcher.jsx":"e94c102d92d9","components/events/MapPin.jsx":"29640892b70f","components/events/PriceTag.jsx":"ef23327d14ed","components/events/RelevanceChip.jsx":"26b00d1ff6ed","components/events/SaveDismiss.jsx":"034f88962924","components/events/SourceBadge.jsx":"515a16ff18d5","components/feedback/EmptyState.jsx":"b0da3b99d374","components/feedback/Skeleton.jsx":"91f2e863397c","components/feedback/Toast.jsx":"e82a30ace406","components/forms/Checkbox.jsx":"54ef7026f061","components/forms/DatePicker.jsx":"084986bfb4cd","components/forms/Input.jsx":"475aa4fb8adf","components/forms/SegmentedControl.jsx":"72ae01438553","components/forms/Select.jsx":"8832aafaf014","components/forms/Switch.jsx":"1633f60bd924","components/navigation/BottomNav.jsx":"1d2e8dbfef28","components/navigation/FilterBar.jsx":"112966046c77","components/navigation/FilterChip.jsx":"62f44644c35f","components/navigation/SearchBar.jsx":"b912deac7327","components/navigation/SidebarNav.jsx":"5dacc612580b","ui_kits/pulse/app.jsx":"7db7d32c9a52","ui_kits/pulse/data.js":"9780096429d2","ui_kits/pulse/icons.jsx":"5fdf6a8c8467","ui_kits/pulse/pulse-bundle.js":"18c39a27a025","ui_kits/pulse/screens-detail.jsx":"6a8ca4b70e4e","ui_kits/pulse/screens-feed.jsx":"e14a715e870d","ui_kits/pulse/screens-more.jsx":"5370a4a1e217","ui_kits/pulse/screens-user.jsx":"d1c4475d964d","ui_kits/pulse/shell.jsx":"abe1c2b4802c"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.PulseDesignSystem_3c2543 = window.PulseDesignSystem_3c2543 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Avatar / identity dot. Renders initials on an ink surface, or an image.
 * Used for the "For me" profile and digest sender.
 */
function Avatar({
  name = "",
  src,
  size = 36,
  style,
  ...rest
}) {
  const initials = name.split(" ").map(p => p[0]).slice(0, 2).join("").toUpperCase();
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
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
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : initials || "•");
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Small status / count badge. `tone` carries minimal chroma for feedback only;
 * default is neutral monochrome.
 */
function Badge({
  children,
  tone = "neutral",
  dot = false,
  style,
  ...rest
}) {
  const tones = {
    neutral: {
      bg: "var(--accent-soft)",
      fg: "var(--text-strong)"
    },
    inverse: {
      bg: "var(--accent)",
      fg: "var(--accent-fg)"
    },
    ok: {
      bg: "color-mix(in srgb, var(--ok) 16%, transparent)",
      fg: "var(--ok)"
    },
    warn: {
      bg: "color-mix(in srgb, var(--warn) 18%, transparent)",
      fg: "var(--warn)"
    },
    error: {
      bg: "color-mix(in srgb, var(--error) 16%, transparent)",
      fg: "var(--error)"
    }
  }[tone];
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
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
      ...style
    }
  }, rest), !dot && children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizes = {
  sm: {
    padding: "0 var(--space-3)",
    height: "36px",
    fontSize: "var(--fs-sm)"
  },
  md: {
    padding: "0 var(--space-5)",
    height: "44px",
    fontSize: "var(--fs-body)"
  },
  lg: {
    padding: "0 var(--space-6)",
    height: "52px",
    fontSize: "var(--fs-subtitle)"
  }
};
const variants = {
  primary: {
    background: "var(--accent)",
    color: "var(--accent-fg)",
    border: "1px solid var(--accent)"
  },
  secondary: {
    background: "transparent",
    color: "var(--text-strong)",
    border: "1px solid var(--border-strong)"
  },
  ghost: {
    background: "transparent",
    color: "var(--text-strong)",
    border: "1px solid transparent"
  }
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
  const spinner = /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    style: {
      animation: "pulse-spin 0.7s linear infinite"
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 3a9 9 0 1 0 9 9"
  }), /*#__PURE__*/React.createElement("style", null, "@keyframes pulse-spin{to{transform:rotate(360deg)}}"));
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: isOff,
    "aria-busy": loading || undefined,
    style: {
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
      ...style
    },
    onMouseDown: e => {
      if (!isOff) e.currentTarget.style.transform = "scale(0.97)";
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = "scale(1)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "scale(1)";
    }
  }, rest), loading ? spinner : iconLeft, children, !loading && iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: inverse ? "var(--surface-inverse)" : "var(--surface-card)",
      color: inverse ? "var(--text-inverse)" : "var(--text-body)",
      border: inverse ? "1px solid var(--surface-inverse)" : "1px solid var(--border)",
      borderRadius: "var(--radius-lg)",
      boxShadow: shadow,
      padding,
      transition: "transform var(--dur-3) var(--ease-out), box-shadow var(--dur-3) var(--ease-out)",
      cursor: interactive ? "pointer" : "default",
      ...style
    },
    onMouseEnter: interactive ? e => {
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "var(--shadow-3)";
    } : undefined,
    onMouseLeave: interactive ? e => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = shadow;
    } : undefined
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizes = {
  sm: 36,
  md: 44,
  lg: 52
};

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
    ghost: {
      background: "transparent",
      border: "1px solid transparent",
      color: "var(--text-body)"
    },
    outline: {
      background: "transparent",
      border: "1px solid var(--border-strong)",
      color: "var(--text-strong)"
    },
    solid: {
      background: "var(--accent)",
      border: "1px solid var(--accent)",
      color: "var(--accent-fg)"
    }
  }[variant];
  const activeStyle = active ? {
    background: "var(--accent-soft)",
    color: "var(--text-strong)",
    borderColor: "var(--border)"
  } : null;
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    disabled: disabled,
    style: {
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
      ...style
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = "scale(0.92)";
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = "scale(1)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "scale(1)";
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Pulse brand lockup: the map-pin + radar pulse mark, optionally with the
 * "Pulse" serif wordmark. Inherits color from `currentColor`.
 */
function Logo({
  size = 28,
  showWordmark = true,
  color,
  style,
  ...rest
}) {
  const px = typeof size === "number" ? `${size}px` : size;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.45em",
      color: color || "var(--text-strong)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("svg", {
    width: px,
    height: px,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    style: {
      flex: "0 0 auto"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 21.6 C12 21.6 18.8 14.8 18.8 9 A6.8 6.8 0 1 0 5.2 9 C5.2 14.8 12 21.6 12 21.6 Z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "8.8",
    r: "1.5",
    fill: "currentColor",
    stroke: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14.7 6.1 a3.9 3.9 0 0 1 0 5.4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9.3 6.1 a3.9 3.9 0 0 0 0 5.4"
  })), showWordmark && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: "var(--fw-bold)",
      fontSize: `calc(${px} * 0.92)`,
      letterSpacing: "var(--ls-display)",
      lineHeight: 1
    }
  }, "Pulse"));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Category / metadata tag. Mono, uppercase, hairline outline by default.
 * Use `solid` to invert (ink fill) for emphasis.
 */
function Tag({
  children,
  solid = false,
  size = "md",
  style,
  ...rest
}) {
  const pad = size === "sm" ? "2px 7px" : "3px 9px";
  const fs = size === "sm" ? "var(--fs-2xs)" : "var(--fs-xs)";
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
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
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/events/LocationSwitcher.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Location switcher — the "travel anywhere" control. Shows the active city and
 * opens the city picker. When `loading`, it surfaces the progressive cold-start
 * status ("still finding local gems…") instead of a blank wait.
 */
function LocationSwitcher({
  city,
  loading = false,
  statusText,
  onClick,
  size = "md",
  style,
  ...rest
}) {
  const big = size === "lg";
  return /*#__PURE__*/React.createElement("button", _extends({
    onClick: onClick,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-2)",
      padding: big ? "8px 14px" : "6px 12px",
      background: "transparent",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-pill)",
      cursor: "pointer",
      transition: "background var(--dur-2) var(--ease-out), border-color var(--dur-2)",
      ...style
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = "var(--surface-raised)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = "transparent";
    }
  }, rest), /*#__PURE__*/React.createElement("svg", {
    width: big ? 18 : 16,
    height: big ? 18 : 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      color: "var(--text-strong)",
      flex: "0 0 auto"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "10",
    r: "2.6"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      lineHeight: 1.1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: "var(--fw-semibold)",
      fontSize: big ? "var(--fs-title)" : "var(--fs-body)",
      color: "var(--text-strong)",
      letterSpacing: "var(--ls-tight)",
      whiteSpace: "nowrap"
    }
  }, city), loading && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "5px",
      marginTop: "3px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "pulse-ls-dot",
    style: {
      width: "5px",
      height: "5px",
      borderRadius: "var(--radius-pill)",
      background: "var(--text-muted)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--fs-2xs)",
      letterSpacing: "0.03em",
      color: "var(--text-muted)"
    }
  }, statusText || "still finding local gems…"), /*#__PURE__*/React.createElement("style", null, `@keyframes pulse-ls-blink{0%,100%{opacity:.25}50%{opacity:1}} .pulse-ls-dot{animation:pulse-ls-blink 1.1s var(--ease-inout) infinite}
              @media (prefers-reduced-motion: reduce){.pulse-ls-dot{animation:none}}`))), /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    style: {
      color: "var(--text-muted)",
      marginLeft: "2px",
      flex: "0 0 auto"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "m6 9 6 6 6-6"
  })));
}
Object.assign(__ds_scope, { LocationSwitcher });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/events/LocationSwitcher.jsx", error: String((e && e.message) || e) }); }

// components/events/MapPin.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Map marker for the desktop map panel. Shows a price (or "Free") in a pill,
 * or a bare dot for low-emphasis points. `selected` and `gem` change emphasis.
 */
function MapPin({
  label,
  free = false,
  selected = false,
  gem = false,
  dot = false,
  onClick,
  style,
  ...rest
}) {
  if (dot) {
    return /*#__PURE__*/React.createElement("button", _extends({
      onClick: onClick,
      "aria-label": label,
      style: {
        width: "12px",
        height: "12px",
        padding: 0,
        borderRadius: "var(--radius-pill)",
        border: "2px solid var(--surface-page)",
        cursor: "pointer",
        background: selected ? "var(--accent)" : "var(--text-muted)",
        boxShadow: "var(--shadow-1)",
        ...style
      }
    }, rest));
  }
  const text = free ? "Free" : label;
  return /*#__PURE__*/React.createElement("button", _extends({
    onClick: onClick,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "5px",
      padding: "4px 10px",
      cursor: "pointer",
      fontFamily: "var(--font-mono)",
      fontWeight: "var(--fw-semibold)",
      fontSize: "var(--fs-xs)",
      borderRadius: "var(--radius-pill)",
      background: selected ? "var(--accent)" : "var(--surface-card)",
      color: selected ? "var(--accent-fg)" : "var(--text-strong)",
      border: `1px solid ${selected ? "var(--accent)" : "var(--border-strong)"}`,
      boxShadow: selected ? "var(--shadow-3)" : "var(--shadow-1)",
      transform: selected ? "scale(1.06)" : "scale(1)",
      transition: "all var(--dur-2) var(--ease-out)",
      position: "relative",
      ...style
    }
  }, rest), gem && /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 3l2.5 5.2 5.5.6-4 3.8 1 5.4L12 17l-5 2.8 1-5.4-4-3.8 5.5-.6z"
  })), text);
}
Object.assign(__ds_scope, { MapPin });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/events/MapPin.jsx", error: String((e && e.message) || e) }); }

// components/events/PriceTag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Price marker. "Free" renders as a solid ink tag; a number renders as a
 * glassy capsule for overlay on imagery. Pass `overlay` when on a photo.
 */
function PriceTag({
  price,
  free = false,
  overlay = false,
  style,
  ...rest
}) {
  const label = free ? "Free" : typeof price === "number" ? `$${price}` : price;
  if (free) {
    return /*#__PURE__*/React.createElement("span", _extends({
      style: {
        fontFamily: "var(--font-mono)",
        fontWeight: "var(--fw-semibold)",
        fontSize: "var(--fs-xs)",
        letterSpacing: "var(--ls-label)",
        textTransform: "uppercase",
        padding: "4px 9px",
        borderRadius: "var(--radius-sm)",
        background: overlay ? "var(--white)" : "var(--accent)",
        color: overlay ? "var(--black)" : "var(--accent-fg)",
        ...style
      }
    }, rest), label);
  }
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      fontFamily: "var(--font-mono)",
      fontWeight: "var(--fw-semibold)",
      fontSize: "var(--fs-xs)",
      letterSpacing: "0.02em",
      padding: "4px 9px",
      borderRadius: "var(--radius-sm)",
      background: overlay ? "color-mix(in srgb, var(--black) 55%, transparent)" : "var(--accent-soft)",
      color: overlay ? "var(--white)" : "var(--text-strong)",
      backdropFilter: overlay ? "blur(var(--blur-sm))" : "none",
      WebkitBackdropFilter: overlay ? "blur(var(--blur-sm))" : "none",
      border: overlay ? "1px solid color-mix(in srgb, var(--white) 22%, transparent)" : "1px solid var(--border)",
      ...style
    }
  }, rest), label);
}
Object.assign(__ds_scope, { PriceTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/events/PriceTag.jsx", error: String((e && e.message) || e) }); }

// components/events/RelevanceChip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Relevance chip — the "why this surfaced" signal that makes a high-volume
 * feed feel curated. A small radar glyph + the matched reasons.
 */
function RelevanceChip({
  reasons = [],
  score,
  compact = false,
  style,
  ...rest
}) {
  const text = Array.isArray(reasons) ? reasons.join(" · ") : reasons;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "7px",
      padding: compact ? "3px 9px 3px 7px" : "5px 11px 5px 9px",
      background: "var(--spot-soft)",
      border: "1px solid color-mix(in srgb, var(--spot) 30%, transparent)",
      borderRadius: "var(--radius-pill)",
      color: "var(--text-strong)",
      maxWidth: "100%",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--spot)",
    strokeWidth: "1.9",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flex: "0 0 auto"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "2.2",
    fill: "var(--spot)",
    stroke: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-condensed)",
      fontSize: "var(--fs-sm)",
      letterSpacing: "0.03em",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: "var(--fw-semibold)",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      color: "var(--spot)"
    }
  }, "Matches"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)"
    }
  }, " ", text)), score != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--fs-2xs)",
      fontWeight: "var(--fw-semibold)",
      color: "var(--text-muted)",
      paddingLeft: "5px",
      marginLeft: "1px",
      borderLeft: "1px solid var(--border)"
    }
  }, score, "%"));
}
Object.assign(__ds_scope, { RelevanceChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/events/RelevanceChip.jsx", error: String((e && e.message) || e) }); }

// components/events/DigestItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Compact digest row — a date-grouped event line for the daily/weekly digest
 * and push previews. Number index + title + meta + price.
 */
function DigestItem({
  index,
  event = {},
  onOpen,
  style,
  ...rest
}) {
  const {
    title,
    date,
    venue,
    distance,
    price,
    free,
    relevance = [],
    category
  } = event;
  const meta = [date, venue, distance].filter(Boolean).join("  ·  ");
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onOpen,
    style: {
      display: "flex",
      gap: "var(--space-4)",
      alignItems: "flex-start",
      padding: "var(--space-4) 0",
      borderBottom: "1px solid var(--border)",
      cursor: onOpen ? "pointer" : "default",
      ...style
    }
  }, rest), index != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--fs-display-sm)",
      fontWeight: "var(--fw-medium)",
      color: "var(--text-faint)",
      lineHeight: 1,
      flex: "0 0 auto",
      minWidth: "1.4em",
      fontVariantNumeric: "tabular-nums"
    }
  }, String(index).padStart(2, "0")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--fs-title)",
      color: "var(--text-strong)",
      margin: "0 0 4px",
      lineHeight: "var(--lh-snug)"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--fs-xs)",
      color: "var(--text-muted)",
      letterSpacing: "0.02em",
      marginBottom: "8px"
    }
  }, category ? `${category}  ·  ${meta}` : meta), relevance.length > 0 && /*#__PURE__*/React.createElement(__ds_scope.RelevanceChip, {
    reasons: relevance,
    compact: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "0 0 auto"
    }
  }, (free || price != null) && /*#__PURE__*/React.createElement(__ds_scope.PriceTag, {
    price: price,
    free: free
  })));
}
Object.assign(__ds_scope, { DigestItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/events/DigestItem.jsx", error: String((e && e.message) || e) }); }

// components/events/SaveDismiss.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Save / dismiss control pair for cards. Dismiss is deliberately lightweight —
 * it teaches the ranker, not deletes. `onDismiss` should feel reversible.
 */
function SaveDismiss({
  saved = false,
  onSave,
  onDismiss,
  overlay = false,
  size = "md",
  style,
  ...rest
}) {
  const bookmark = /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: saved ? "currentColor" : "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"
  }));
  const x = /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  }));
  const overlayStyle = overlay ? {
    background: "color-mix(in srgb, var(--black) 42%, transparent)",
    color: "var(--white)",
    backdropFilter: "blur(var(--blur-sm))",
    WebkitBackdropFilter: "blur(var(--blur-sm))",
    border: "1px solid color-mix(in srgb, var(--white) 22%, transparent)"
  } : undefined;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "inline-flex",
      gap: "var(--space-2)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    label: "Dismiss",
    size: size,
    round: true,
    variant: overlay ? "ghost" : "outline",
    onClick: onDismiss,
    style: overlayStyle
  }, x), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    label: saved ? "Saved" : "Save",
    size: size,
    round: true,
    variant: overlay ? "ghost" : "outline",
    active: saved && !overlay,
    onClick: onSave,
    style: overlay ? overlayStyle : saved ? {
      background: "var(--accent)",
      color: "var(--accent-fg)",
      borderColor: "var(--accent)"
    } : undefined
  }, bookmark));
}
Object.assign(__ds_scope, { SaveDismiss });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/events/SaveDismiss.jsx", error: String((e && e.message) || e) }); }

// components/events/SourceBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Source attribution + dedup. Shows the primary source the event was found on,
 * plus an "also on …" chip when the same event was deduped across platforms —
 * the transparency signal the aggregation depends on.
 */
function SourceBadge({
  sources = [],
  style,
  ...rest
}) {
  const list = Array.isArray(sources) ? sources : [sources];
  const [primary, ...rest2] = list;
  if (!primary) return null;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      flexWrap: "wrap",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "5px",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--fs-xs)",
      letterSpacing: "0.02em",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "5px",
      height: "5px",
      borderRadius: "var(--radius-pill)",
      background: "var(--text-muted)"
    }
  }), "via ", primary), rest2.length > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--fs-2xs)",
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      padding: "2px 7px",
      borderRadius: "var(--radius-sm)",
      border: "1px dashed var(--border-strong)"
    }
  }, "also on ", rest2.join(", ")));
}
Object.assign(__ds_scope, { SourceBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/events/SourceBadge.jsx", error: String((e && e.message) || e) }); }

// components/events/EventCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
    category,
    title,
    date,
    venue,
    distance,
    price,
    free,
    relevance = [],
    sources = [],
    freshness,
    gem,
    score,
    imageStyle
  } = event;
  const meta = [date, venue, distance].filter(Boolean).join("  ·  ");
  if (variant === "compact") {
    return /*#__PURE__*/React.createElement("div", _extends({
      onClick: onOpen,
      style: {
        display: "flex",
        gap: "var(--space-3)",
        alignItems: "stretch",
        padding: "var(--space-3)",
        background: "var(--surface-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        cursor: onOpen ? "pointer" : "default",
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement("div", {
      className: "img-duotone",
      style: {
        width: "84px",
        flex: "0 0 auto",
        borderRadius: "var(--radius-md)",
        ...imageStyle
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        gap: "4px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: "8px",
        alignItems: "center"
      }
    }, category && /*#__PURE__*/React.createElement(__ds_scope.Tag, {
      size: "sm"
    }, category), (free || price != null) && /*#__PURE__*/React.createElement(__ds_scope.PriceTag, {
      price: price,
      free: free
    })), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: "var(--fs-title)",
        color: "var(--text-strong)",
        lineHeight: "var(--lh-snug)",
        margin: 0,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-xs)",
        color: "var(--text-muted)",
        letterSpacing: "0.02em"
      }
    }, meta), relevance.length > 0 && /*#__PURE__*/React.createElement(__ds_scope.RelevanceChip, {
      reasons: relevance,
      compact: true,
      style: {
        marginTop: "2px"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.SaveDismiss, {
      saved: saved,
      onSave: e => {
        e?.stopPropagation?.();
        onSave?.();
      },
      onDismiss: e => {
        e?.stopPropagation?.();
        onDismiss?.();
      },
      size: "sm"
    })));
  }
  const inverse = !!gem;
  const chipDark = inverse ? {
    background: "color-mix(in srgb, var(--text-inverse) 12%, transparent)",
    borderColor: "color-mix(in srgb, var(--text-inverse) 20%, transparent)",
    color: "var(--text-inverse)"
  } : undefined;
  return /*#__PURE__*/React.createElement("article", _extends({
    style: {
      background: inverse ? "var(--surface-inverse)" : "var(--surface-card)",
      color: inverse ? "var(--text-inverse)" : "var(--text-body)",
      border: `1px solid ${inverse ? "var(--surface-inverse)" : "var(--border)"}`,
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      boxShadow: "var(--shadow-2)",
      transition: "transform var(--dur-3) var(--ease-out), box-shadow var(--dur-3) var(--ease-out)",
      ...style
    },
    onMouseEnter: e => {
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "var(--shadow-3)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "var(--shadow-2)";
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "img-duotone",
    onClick: onOpen,
    style: {
      position: "relative",
      height: "196px",
      cursor: onOpen ? "pointer" : "default",
      ...imageStyle
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "6px",
      alignItems: "center"
    }
  }, gem && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "5px",
      fontFamily: "var(--font-mono)",
      fontWeight: "var(--fw-semibold)",
      fontSize: "var(--fs-2xs)",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      padding: "4px 9px",
      borderRadius: "var(--radius-sm)",
      background: "var(--white)",
      color: "var(--black)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 3l2.5 5.2 5.5.6-4 3.8 1 5.4L12 17l-5 2.8 1-5.4-4-3.8 5.5-.6z"
  })), "Hidden gem"), freshness && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--fs-2xs)",
      letterSpacing: "0.03em",
      padding: "4px 8px",
      borderRadius: "var(--radius-sm)",
      background: "color-mix(in srgb, var(--black) 45%, transparent)",
      color: "var(--white)",
      backdropFilter: "blur(var(--blur-sm))",
      WebkitBackdropFilter: "blur(var(--blur-sm))",
      whiteSpace: "nowrap"
    }
  }, freshness)), /*#__PURE__*/React.createElement(__ds_scope.SaveDismiss, {
    saved: saved,
    overlay: true,
    onSave: e => {
      e?.stopPropagation?.();
      onSave?.();
    },
    onDismiss: e => {
      e?.stopPropagation?.();
      onDismiss?.();
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end"
    }
  }, category && /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    size: "sm",
    style: {
      background: "color-mix(in srgb, var(--black) 45%, transparent)",
      color: "var(--white)",
      border: "1px solid color-mix(in srgb, var(--white) 22%, transparent)",
      backdropFilter: "blur(var(--blur-sm))"
    }
  }, category), (free || price != null) && /*#__PURE__*/React.createElement(__ds_scope.PriceTag, {
    price: price,
    free: free,
    overlay: true
  })))), /*#__PURE__*/React.createElement("div", {
    onClick: onOpen,
    style: {
      padding: "var(--space-4) var(--space-5) var(--space-5)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      cursor: onOpen ? "pointer" : "default"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--fs-display-sm)",
      color: inverse ? "var(--text-inverse)" : "var(--text-strong)",
      lineHeight: "var(--lh-snug)",
      margin: "0 0 6px",
      letterSpacing: "var(--ls-tight)",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--fs-xs)",
      letterSpacing: "0.03em",
      color: inverse ? "color-mix(in srgb, var(--text-inverse) 72%, transparent)" : "var(--text-muted)"
    }
  }, meta)), relevance.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.RelevanceChip, {
    reasons: relevance,
    score: score,
    style: chipDark
  })), sources.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: "var(--space-1)",
      borderTop: `1px solid ${inverse ? "color-mix(in srgb, var(--text-inverse) 14%, transparent)" : "var(--border)"}`
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.SourceBadge, {
    sources: sources,
    style: inverse ? {
      color: "var(--text-inverse)"
    } : undefined
  }))));
}
Object.assign(__ds_scope, { EventCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/events/EventCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/EmptyState.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Empty / cold-start / quiet-city state. Centered line-map glyph, a serif
 * headline, supporting line, optional action. Never a blank screen.
 */
function EmptyState({
  title,
  body,
  action,
  glyph = "map",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: glyph === "error" ? "alert" : undefined,
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: "var(--space-4)",
      padding: "var(--space-9) var(--space-6)",
      maxWidth: "34rem",
      margin: "0 auto",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: "76px",
      height: "76px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-pill)",
      border: "1px solid var(--border)",
      background: "var(--surface-card)",
      color: "var(--text-muted)"
    },
    className: "map-overlay"
  }, glyphs[glyph] || glyphs.map), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--fs-display-sm)",
      color: "var(--text-strong)",
      margin: 0
    }
  }, title), body && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--fs-subtitle)",
      color: "var(--text-muted)",
      lineHeight: "var(--lh-normal)",
      margin: 0
    }
  }, body), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-2)"
    }
  }, action));
}
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const glyphs = {
  map: /*#__PURE__*/React.createElement("svg", _extends({
    width: "34",
    height: "34",
    viewBox: "0 0 24 24"
  }, stroke), /*#__PURE__*/React.createElement("path", {
    d: "m9 4 6 2 6-2v14l-6 2-6-2-6 2V6z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 4v14M15 6v14"
  })),
  search: /*#__PURE__*/React.createElement("svg", _extends({
    width: "32",
    height: "32",
    viewBox: "0 0 24 24"
  }, stroke), /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m21 21-4.3-4.3"
  })),
  saved: /*#__PURE__*/React.createElement("svg", _extends({
    width: "32",
    height: "32",
    viewBox: "0 0 24 24"
  }, stroke), /*#__PURE__*/React.createElement("path", {
    d: "M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"
  })),
  quiet: /*#__PURE__*/React.createElement("svg", _extends({
    width: "32",
    height: "32",
    viewBox: "0 0 24 24"
  }, stroke), /*#__PURE__*/React.createElement("path", {
    d: "M12 3a6 6 0 0 1 6 6c0 4-6 12-6 12S6 13 6 9a6 6 0 0 1 6-6Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9.5 9h5"
  })),
  error: /*#__PURE__*/React.createElement("svg", _extends({
    width: "32",
    height: "32",
    viewBox: "0 0 24 24"
  }, stroke), /*#__PURE__*/React.createElement("path", {
    d: "M12 9v4M12 17h.01"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"
  }))
};
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Skeleton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Loading placeholder. A subtle shimmer over a neutral block — used during
 * cold-start and infinite-scroll. Compose `EventCardSkeleton` from these.
 */
function Skeleton({
  width = "100%",
  height = "16px",
  radius = "var(--radius-sm)",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    "aria-hidden": "true",
    style: {
      display: "block",
      width,
      height,
      borderRadius: radius,
      background: "linear-gradient(100deg, var(--surface-raised) 30%, var(--surface-sunken) 50%, var(--surface-raised) 70%)",
      backgroundSize: "200% 100%",
      animation: "pulse-shimmer 1.4s var(--ease-inout) infinite",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("style", null, `@keyframes pulse-shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
        @media (prefers-reduced-motion: reduce){[aria-hidden="true"]{animation:none!important}}`));
}

/** Full event-card skeleton (image + two text rows). */
function EventCardSkeleton({
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      ...style
    }
  }, /*#__PURE__*/React.createElement(Skeleton, {
    height: "150px",
    radius: "0"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-4)",
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }
  }, /*#__PURE__*/React.createElement(Skeleton, {
    width: "38%",
    height: "11px"
  }), /*#__PURE__*/React.createElement(Skeleton, {
    width: "80%",
    height: "20px"
  }), /*#__PURE__*/React.createElement(Skeleton, {
    width: "55%",
    height: "13px"
  })));
}
Object.assign(__ds_scope, { Skeleton, EventCardSkeleton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Skeleton.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Lightweight transient notice — confirms saves/dismisses and "added to
 * calendar". Ink surface, optional undo action. Auto-styled; you control
 * mount/unmount.
 */
function Toast({
  message,
  actionLabel,
  onAction,
  icon,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-3)",
      padding: "var(--space-3) var(--space-3) var(--space-3) var(--space-4)",
      background: "var(--surface-inverse)",
      color: "var(--text-inverse)",
      borderRadius: "var(--radius-pill)",
      boxShadow: "var(--shadow-3)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-sm)",
      fontWeight: "var(--fw-medium)",
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      opacity: 0.85
    }
  }, icon), /*#__PURE__*/React.createElement("span", null, message), actionLabel && /*#__PURE__*/React.createElement("button", {
    onClick: onAction,
    style: {
      border: "1px solid color-mix(in srgb, var(--text-inverse) 32%, transparent)",
      background: "transparent",
      color: "var(--text-inverse)",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--fs-xs)",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      padding: "6px 12px",
      borderRadius: "var(--radius-pill)",
      cursor: "pointer"
    }
  }, actionLabel));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Selectable interest token used in onboarding & preferences. Tap to toggle;
 * selected state inverts to ink fill with a check.
 */
function Checkbox({
  checked = false,
  onChange,
  label,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    role: "checkbox",
    "aria-checked": checked,
    onClick: () => onChange && onChange(!checked),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-2)",
      height: "44px",
      padding: "0 var(--space-4)",
      background: checked ? "var(--accent)" : "var(--surface-card)",
      color: checked ? "var(--accent-fg)" : "var(--text-body)",
      border: `1px solid ${checked ? "var(--accent)" : "var(--border-strong)"}`,
      borderRadius: "var(--radius-pill)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body)",
      fontWeight: "var(--fw-medium)",
      cursor: "pointer",
      transition: "background var(--dur-2) var(--ease-out), color var(--dur-2), border-color var(--dur-2)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "18px",
      height: "18px",
      flex: "0 0 auto"
    }
  }, checked ? /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  })) : /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14M5 12h14",
    opacity: "0.55"
  }))), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/DatePicker.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Compact month calendar for date search. Single-date selection with month
 * navigation; today is ringed, the selected day fills with ink. Controlled via
 * value/onChange (JS Date).
 */
function DatePicker({
  value,
  onChange,
  style,
  ...rest
}) {
  const today = new Date();
  const init = value || today;
  const [view, setView] = React.useState({
    y: init.getFullYear(),
    m: init.getMonth()
  });
  const monthName = new Date(view.y, view.m, 1).toLocaleString("en-US", {
    month: "long",
    year: "numeric"
  });
  const firstDow = (new Date(view.y, view.m, 1).getDay() + 6) % 7; // Mon=0
  const days = new Date(view.y, view.m + 1, 0).getDate();
  const sameDay = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  const step = d => setView(v => {
    const nm = v.m + d;
    return {
      y: v.y + Math.floor(nm / 12),
      m: (nm % 12 + 12) % 12
    };
  });
  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(new Date(view.y, view.m, d));
  const Chevron = ({
    dir
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: () => step(dir),
    "aria-label": dir < 0 ? "Previous month" : "Next month",
    style: {
      width: "30px",
      height: "30px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      border: "1px solid var(--border)",
      background: "transparent",
      borderRadius: "var(--radius-sm)",
      cursor: "pointer",
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: dir < 0 ? "m15 6-6 6 6 6" : "m9 6 6 6-6 6"
  })));
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: "280px",
      background: "var(--surface-card)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-lg)",
      padding: "var(--space-4)",
      boxShadow: "var(--shadow-3)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--fs-subtitle)",
      color: "var(--text-strong)",
      fontWeight: "var(--fw-semibold)"
    }
  }, monthName), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: "6px"
    }
  }, /*#__PURE__*/React.createElement(Chevron, {
    dir: -1
  }), /*#__PURE__*/React.createElement(Chevron, {
    dir: 1
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: "2px",
      marginBottom: "4px"
    }
  }, ["M", "T", "W", "T", "F", "S", "S"].map((d, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      textAlign: "center",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--fs-2xs)",
      letterSpacing: "0.04em",
      color: "var(--text-faint)",
      padding: "4px 0"
    }
  }, d))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: "2px"
    }
  }, cells.map((date, i) => {
    if (!date) return /*#__PURE__*/React.createElement("span", {
      key: i
    });
    const isSel = sameDay(date, value);
    const isToday = sameDay(date, today);
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => onChange && onChange(date),
      style: {
        height: "34px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        border: isToday && !isSel ? "1px solid var(--border-strong)" : "1px solid transparent",
        borderRadius: "var(--radius-pill)",
        cursor: "pointer",
        background: isSel ? "var(--accent)" : "transparent",
        color: isSel ? "var(--accent-fg)" : "var(--text-body)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-sm)",
        fontWeight: isSel ? "var(--fw-semibold)" : "var(--fw-regular)",
        fontVariantNumeric: "tabular-nums",
        transition: "background var(--dur-1) var(--ease-out)"
      },
      onMouseEnter: e => {
        if (!isSel) e.currentTarget.style.background = "var(--surface-raised)";
      },
      onMouseLeave: e => {
        if (!isSel) e.currentTarget.style.background = "transparent";
      }
    }, date.getDate());
  })));
}
Object.assign(__ds_scope, { DatePicker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/DatePicker.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      display: "block",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginBottom: "6px",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--fs-xs)",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-2)",
      height: h,
      padding: "0 var(--space-4)",
      background: "var(--surface-card)",
      border: "1px solid var(--border-strong)",
      borderRadius: "var(--radius-md)",
      transition: "border-color var(--dur-2) var(--ease-out), box-shadow var(--dur-2)"
    },
    onFocus: e => {
      e.currentTarget.style.borderColor = "var(--accent)";
    },
    onBlur: e => {
      e.currentTarget.style.borderColor = "var(--border-strong)";
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      color: "var(--text-muted)"
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    style: {
      flex: 1,
      minWidth: 0,
      border: "none",
      outline: "none",
      background: "transparent",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body)",
      color: "var(--text-strong)"
    }
  }, rest))), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginTop: "6px",
      fontSize: "var(--fs-sm)",
      color: "var(--text-muted)"
    }
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/SegmentedControl.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Segmented control for 2–4 mutually-exclusive options — the boost/mute
 * tri-state and time-window pickers in Preferences.
 */
function SegmentedControl({
  options = [],
  value,
  onChange,
  size = "md",
  style,
  ...rest
}) {
  const h = size === "sm" ? "34px" : "40px";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "inline-flex",
      padding: "3px",
      gap: "2px",
      background: "var(--surface-sunken)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-pill)",
      ...style
    }
  }, rest), options.map(o => {
    const val = typeof o === "string" ? o : o.value;
    const lbl = typeof o === "string" ? o : o.label;
    const active = val === value;
    return /*#__PURE__*/React.createElement("button", {
      key: val,
      onClick: () => onChange && onChange(val),
      style: {
        height: h,
        padding: "0 var(--space-4)",
        border: "none",
        borderRadius: "var(--radius-pill)",
        background: active ? "var(--accent)" : "transparent",
        color: active ? "var(--accent-fg)" : "var(--text-muted)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-sm)",
        fontWeight: "var(--fw-semibold)",
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "background var(--dur-2) var(--ease-out), color var(--dur-2)"
      }
    }, lbl);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Native select styled to the Pulse field. Used for sort order, frequency,
 * distance units.
 */
function Select({
  label,
  value,
  onChange,
  options = [],
  size = "md",
  style,
  ...rest
}) {
  const h = size === "sm" ? "38px" : "44px";
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginBottom: "6px",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--fs-xs)",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    value: value,
    onChange: onChange,
    style: {
      appearance: "none",
      WebkitAppearance: "none",
      width: "100%",
      height: h,
      padding: "0 38px 0 var(--space-4)",
      background: "var(--surface-card)",
      border: "1px solid var(--border-strong)",
      borderRadius: "var(--radius-md)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body)",
      color: "var(--text-strong)",
      cursor: "pointer"
    }
  }, rest), options.map(o => {
    const val = typeof o === "string" ? o : o.value;
    const lbl = typeof o === "string" ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: val,
      value: val
    }, lbl);
  })), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    style: {
      position: "absolute",
      right: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "var(--text-muted)",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "m6 9 6 6 6-6"
  }))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * On/off switch. Used for dealbreakers (free-only, nights & weekends) and
 * notification toggles. Track fills with ink when on.
 */
function Switch({
  checked = false,
  onChange,
  disabled = false,
  label,
  style,
  ...rest
}) {
  const toggle = () => {
    if (!disabled && onChange) onChange(!checked);
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    role: "switch",
    "aria-checked": checked,
    onClick: toggle,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-3)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      width: "44px",
      height: "26px",
      flex: "0 0 auto",
      borderRadius: "var(--radius-pill)",
      background: checked ? "var(--accent)" : "var(--surface-raised)",
      border: `1px solid ${checked ? "var(--accent)" : "var(--border-strong)"}`,
      transition: "background var(--dur-2) var(--ease-out), border-color var(--dur-2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: "2px",
      left: checked ? "20px" : "2px",
      width: "20px",
      height: "20px",
      borderRadius: "var(--radius-pill)",
      background: checked ? "var(--accent-fg)" : "var(--surface-card)",
      boxShadow: "var(--shadow-1)",
      transition: "left var(--dur-2) var(--ease-spring)"
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-body)",
      color: "var(--text-body)"
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/BottomNav.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Mobile bottom navigation. Five slots max. Active slot shows the ink mark +
 * label; others are muted. Honors safe-area inset.
 */
function BottomNav({
  items = [],
  active,
  onSelect,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "stretch",
      height: "var(--bottomnav-h)",
      paddingBottom: "env(safe-area-inset-bottom, 0)",
      background: "color-mix(in srgb, var(--surface-card) 92%, transparent)",
      backdropFilter: "blur(var(--blur-md))",
      WebkitBackdropFilter: "blur(var(--blur-md))",
      borderTop: "1px solid var(--border)",
      ...style
    }
  }, rest), items.map(it => {
    const on = it.key === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.key,
      onClick: () => onSelect && onSelect(it.key),
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "3px",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        color: on ? "var(--text-strong)" : "var(--text-faint)",
        position: "relative",
        transition: "color var(--dur-2) var(--ease-out)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        position: "relative"
      }
    }, it.icon, it.badge && /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: "-3px",
        right: "-6px",
        width: "7px",
        height: "7px",
        borderRadius: "var(--radius-pill)",
        background: "var(--accent)",
        border: "1.5px solid var(--surface-card)"
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "9px",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        fontWeight: on ? "var(--fw-semibold)" : "var(--fw-regular)"
      }
    }, it.label));
  }));
}
Object.assign(__ds_scope, { BottomNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/BottomNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/FilterChip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Single filter chip. Toggles between hairline (off) and ink-fill (on).
 * Optional leading icon and trailing count.
 */
function FilterChip({
  children,
  active = false,
  icon,
  count,
  onClick,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    onClick: onClick,
    "aria-pressed": active,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      height: "40px",
      padding: "0 var(--space-4)",
      flex: "0 0 auto",
      backgroundColor: active ? "var(--accent)" : "var(--surface-card)",
      color: active ? "var(--accent-fg)" : "var(--text-body)",
      border: `1px solid ${active ? "var(--accent)" : "var(--border-strong)"}`,
      borderRadius: "var(--radius-pill)",
      fontFamily: "var(--font-condensed)",
      fontSize: "var(--fs-sm)",
      fontWeight: "var(--fw-medium)",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      whiteSpace: "nowrap",
      cursor: "pointer",
      transition: "background-color var(--dur-2) var(--ease-out), color var(--dur-2), border-color var(--dur-2)",
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex"
    }
  }, icon), children, count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--fs-2xs)",
      opacity: 0.7,
      marginLeft: "2px"
    }
  }, count));
}
Object.assign(__ds_scope, { FilterChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/FilterChip.jsx", error: String((e && e.message) || e) }); }

// components/navigation/FilterBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Horizontally-scrollable filter chip bar. Sticky at the top of the feed.
 * Pass `filters` as a list; `active` is the set of selected keys.
 */
function FilterBar({
  filters = [],
  active = [],
  onToggle,
  sticky = true,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: sticky ? "sticky" : "static",
      top: 0,
      zIndex: 5,
      display: "flex",
      gap: "var(--space-2)",
      padding: "var(--space-3) var(--gutter-mobile)",
      overflowX: "auto",
      scrollbarWidth: "none",
      background: "color-mix(in srgb, var(--surface-page) 86%, transparent)",
      backdropFilter: "saturate(1.2) blur(var(--blur-md))",
      WebkitBackdropFilter: "saturate(1.2) blur(var(--blur-md))",
      borderBottom: "1px solid var(--border)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("style", null, `.pulse-filterbar::-webkit-scrollbar{display:none}`), filters.map(f => {
    const key = typeof f === "string" ? f : f.key;
    const label = typeof f === "string" ? f : f.label;
    const icon = typeof f === "string" ? null : f.icon;
    const count = typeof f === "string" ? null : f.count;
    return /*#__PURE__*/React.createElement(__ds_scope.FilterChip, {
      key: key,
      active: active.includes(key),
      icon: icon,
      count: count,
      onClick: () => onToggle && onToggle(key)
    }, label);
  }));
}
Object.assign(__ds_scope, { FilterBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/FilterBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SearchBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Search field — pill input with leading search glyph and a clear button.
 * Used for event search and the city picker. Controlled via value/onChange.
 */
function SearchBar({
  value = "",
  onChange,
  onSubmit,
  onClear,
  placeholder = "Search",
  autoFocus = false,
  size = "md",
  style,
  ...rest
}) {
  const h = size === "lg" ? "54px" : size === "sm" ? "40px" : "46px";
  return /*#__PURE__*/React.createElement("form", _extends({
    onSubmit: e => {
      e.preventDefault();
      onSubmit && onSubmit(value);
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-2)",
      height: h,
      padding: "0 var(--space-3) 0 var(--space-4)",
      background: "var(--surface-card)",
      border: "1px solid var(--border-strong)",
      borderRadius: "var(--radius-pill)",
      transition: "border-color var(--dur-2) var(--ease-out)",
      ...style
    },
    onFocus: e => {
      e.currentTarget.style.borderColor = "var(--accent)";
    },
    onBlur: e => {
      e.currentTarget.style.borderColor = "var(--border-strong)";
    }
  }, rest), /*#__PURE__*/React.createElement("svg", {
    width: size === "lg" ? 22 : 19,
    height: size === "lg" ? 22 : 19,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      color: "var(--text-muted)",
      flex: "0 0 auto"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m21 21-4.3-4.3"
  })), /*#__PURE__*/React.createElement("input", {
    type: "search",
    value: value,
    autoFocus: autoFocus,
    placeholder: placeholder,
    "aria-label": placeholder || "Search",
    onChange: e => onChange && onChange(e.target.value),
    style: {
      flex: 1,
      minWidth: 0,
      border: "none",
      outline: "none",
      background: "transparent",
      fontFamily: "var(--font-sans)",
      fontSize: size === "lg" ? "var(--fs-subtitle)" : "var(--fs-body)",
      color: "var(--text-strong)"
    }
  }), value && /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Clear search",
    onClick: () => {
      onChange && onChange("");
      onClear && onClear();
    },
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "28px",
      height: "28px",
      flex: "0 0 auto",
      border: "none",
      borderRadius: "var(--radius-pill)",
      cursor: "pointer",
      background: "var(--accent-soft)",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  }))));
}
Object.assign(__ds_scope, { SearchBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SearchBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SidebarNav.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Desktop left-rail navigation. Vertical list of destinations with the active
 * item marked by an ink bar + fill. Pairs with the 3-zone shell.
 */
function SidebarNav({
  items = [],
  active,
  onSelect,
  footer,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "2px",
      ...style
    }
  }, rest), items.map(it => {
    const on = it.key === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.key,
      onClick: () => onSelect && onSelect(it.key),
      style: {
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        height: "42px",
        padding: "0 var(--space-3)",
        width: "100%",
        border: "none",
        borderRadius: "var(--radius-md)",
        cursor: "pointer",
        background: on ? "var(--accent-soft)" : "transparent",
        color: on ? "var(--text-strong)" : "var(--text-muted)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-body)",
        fontWeight: on ? "var(--fw-semibold)" : "var(--fw-medium)",
        position: "relative",
        textAlign: "left",
        transition: "background var(--dur-2) var(--ease-out), color var(--dur-2)"
      },
      onMouseEnter: e => {
        if (!on) e.currentTarget.style.background = "var(--surface-raised)";
      },
      onMouseLeave: e => {
        if (!on) e.currentTarget.style.background = "transparent";
      }
    }, on && /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 0,
        top: "9px",
        bottom: "9px",
        width: "3px",
        borderRadius: "var(--radius-pill)",
        background: "var(--accent)"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        flex: "0 0 auto"
      }
    }, it.icon), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, it.label), it.badge && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-2xs)",
        background: "var(--accent)",
        color: "var(--accent-fg)",
        padding: "1px 6px",
        borderRadius: "var(--radius-pill)"
      }
    }, it.badge));
  }), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto"
    }
  }, footer));
}
Object.assign(__ds_scope, { SidebarNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SidebarNav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/pulse/app.jsx
try { (() => {
// Pulse UI-kit app root → mounts the interactive demo into #root
(function () {
  const NS = window.PulseDesignSystem_3c2543;
  const {
    Logo,
    LocationSwitcher,
    FilterBar,
    BottomNav,
    SidebarNav,
    IconButton,
    Avatar,
    Select,
    SegmentedControl,
    Badge
  } = NS;
  const I = window.PulseIcons;
  const {
    PhoneFrame,
    MapPanel
  } = window.PulseShell;
  const {
    FeedList
  } = window.PulseFeed;
  const {
    EventDetailView
  } = window.PulseDetail;
  const {
    Onboarding,
    Preferences,
    Digest,
    Saved,
    LocationPicker,
    StatesGallery
  } = window.PulseScreens;
  const {
    SearchScreen,
    Account,
    SignIn
  } = window.PulseUser;
  const D = window.PULSE_DATA;
  const NAV = [{
    key: "feed",
    label: "Feed",
    icon: /*#__PURE__*/React.createElement(I.Home, {
      size: 20
    })
  }, {
    key: "search",
    label: "Search",
    icon: /*#__PURE__*/React.createElement(I.Search, {
      size: 20
    })
  }, {
    key: "saved",
    label: "Saved",
    icon: /*#__PURE__*/React.createElement(I.Bookmark, {
      size: 20
    })
  }, {
    key: "digest",
    label: "Digest",
    icon: /*#__PURE__*/React.createElement(I.Bell, {
      size: 20
    }),
    badge: 3
  }, {
    key: "me",
    label: "For me",
    icon: /*#__PURE__*/React.createElement(I.User, {
      size: 20
    })
  }];
  const FILTERS = [{
    key: "today",
    label: "Today"
  }, {
    key: "weekend",
    label: "This weekend"
  }, {
    key: "free",
    label: "Free"
  }, {
    key: "near",
    label: "Near me"
  }, {
    key: "music",
    label: "Live music"
  }, {
    key: "art",
    label: "Art"
  }, {
    key: "food",
    label: "Food"
  }, {
    key: "film",
    label: "Film"
  }];
  function App() {
    const params = new URLSearchParams(location.search);
    const ls = (k, d) => {
      try {
        return localStorage.getItem("pulse." + k) ?? d;
      } catch (e) {
        return d;
      }
    };
    const initEvent = params.get("event") ? D.events.find(e => e.id === params.get("event")) : null;
    const initRoute = initEvent ? "detail" : params.get("screen") || ls("route", "feed");
    const [theme, setTheme] = React.useState(params.get("theme") || ls("theme", "light"));
    const [view, setView] = React.useState(params.get("view") || ls("view", "desktop"));
    const [route, setRoute] = React.useState(initRoute);
    const [sel, setSel] = React.useState(initEvent);
    const [saved, setSaved] = React.useState(new Set(["film"]));
    const [dismissed, setDismissed] = React.useState(new Set());
    const [active, setActive] = React.useState(["weekend"]);
    const [city, setCity] = React.useState(D.cities[0]);
    const [picker, setPicker] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [mapSel, setMapSel] = React.useState(D.events[0].id);
    const events = D.events.filter(e => !dismissed.has(e.id));
    const toggleSave = id => setSaved(s => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
    const dismiss = id => setDismissed(s => new Set(s).add(id));
    const toggleFilter = k => setActive(a => a.includes(k) ? a.filter(x => x !== k) : [...a, k]);
    const open = e => {
      setSel(e);
      setRoute("detail");
    };
    const pickCity = c => {
      setCity(c);
      setPicker(false);
      setLoading(true);
      setTimeout(() => setLoading(false), 3200);
    };
    const moreLike = sel ? events.filter(e => e.id !== sel.id && e.category === sel.category).slice(0, 2) : [];
    React.useEffect(() => {
      try {
        localStorage.setItem("pulse.theme", theme);
        localStorage.setItem("pulse.view", view);
        localStorage.setItem("pulse.route", route);
      } catch (e) {}
      const p = new URLSearchParams();
      p.set("screen", route);
      p.set("view", view);
      p.set("theme", theme);
      if (route === "detail" && sel) p.set("event", sel.id);
      try {
        history.replaceState(null, "", location.pathname + "?" + p.toString());
      } catch (e) {}
    }, [theme, view, route, sel]);

    // ---- shared pieces ----
    const Header = ({
      desktop
    }) => /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: desktop ? "var(--space-5) var(--space-6) var(--space-3)" : "var(--space-3) var(--space-4)",
        gap: "var(--space-3)"
      }
    }, /*#__PURE__*/React.createElement(LocationSwitcher, {
      city: city.name,
      loading: loading,
      size: desktop ? "lg" : "md",
      onClick: () => setPicker(true)
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: "var(--space-2)",
        alignItems: "center"
      }
    }, desktop && /*#__PURE__*/React.createElement(Select, {
      size: "sm",
      defaultValue: "For you",
      options: ["For you", "Soonest", "Nearest", "Cheapest"]
    }), /*#__PURE__*/React.createElement(IconButton, {
      label: "Search",
      variant: "ghost",
      onClick: () => setRoute("search")
    }, /*#__PURE__*/React.createElement(I.Search, {
      size: 20
    })), !desktop && /*#__PURE__*/React.createElement("button", {
      onClick: () => setRoute("account"),
      style: {
        border: "none",
        background: "transparent",
        padding: 0,
        cursor: "pointer"
      },
      "aria-label": "Account"
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: "Ana Ruiz",
      size: 32
    }))));
    const FeedBody = ({
      columns
    }) => /*#__PURE__*/React.createElement("div", {
      style: {
        padding: `var(--space-5) ${columns > 1 ? "var(--space-6)" : "var(--gutter-mobile)"} var(--space-9)`
      }
    }, /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: "var(--fs-display-md)",
        color: "var(--text-strong)",
        letterSpacing: "var(--ls-display)",
        lineHeight: "var(--lh-tight)",
        margin: "0 0 var(--space-2)"
      }
    }, "For you, tonight"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: "var(--text-muted)",
        margin: "0 0 var(--space-5)",
        fontSize: "var(--fs-subtitle)"
      }
    }, events.length, " events in ", city.name, ", ranked \u2014 not pre-filtered."), /*#__PURE__*/React.createElement(FeedList, {
      events: events,
      saved: saved,
      onSave: toggleSave,
      onDismiss: dismiss,
      onOpen: open,
      columns: columns
    }));
    const screenBody = desktop => {
      switch (route) {
        case "feed":
          return /*#__PURE__*/React.createElement(FeedBody, {
            columns: 1
          });
        case "detail":
          return /*#__PURE__*/React.createElement(EventDetailView, {
            event: sel,
            saved: saved.has(sel?.id),
            onSave: toggleSave,
            onBack: () => setRoute("feed"),
            more: moreLike,
            onOpen: open,
            mode: desktop ? "desktop" : "mobile"
          });
        case "saved":
          return /*#__PURE__*/React.createElement(Saved, {
            saved: saved,
            events: D.events,
            onSave: toggleSave,
            onOpen: open
          });
        case "digest":
          return /*#__PURE__*/React.createElement(Digest, {
            onOpen: open
          });
        case "me":
          return /*#__PURE__*/React.createElement(Preferences, null);
        case "search":
          return /*#__PURE__*/React.createElement(SearchScreen, {
            events: events,
            saved: saved,
            onSave: toggleSave,
            onDismiss: dismiss,
            onOpen: open,
            city: city
          });
        case "account":
          return /*#__PURE__*/React.createElement(Account, {
            theme: theme,
            setTheme: setTheme,
            onNavigate: setRoute,
            onSignOut: () => setRoute("signin"),
            city: city
          });
        case "states":
          return /*#__PURE__*/React.createElement(StatesGallery, null);
        default:
          return null;
      }
    };

    // ---- Onboarding / sign-in take the whole surface ----
    const isOnboarding = route === "onboarding" || route === "signin";
    const fullSurface = route === "signin" ? /*#__PURE__*/React.createElement(SignIn, {
      onContinue: () => setRoute("onboarding")
    }) : /*#__PURE__*/React.createElement(Onboarding, {
      onDone: () => setRoute("feed")
    });

    // ---- MOBILE ----
    const mobile = /*#__PURE__*/React.createElement(PhoneFrame, {
      theme: theme
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: 0
      }
    }, isOnboarding ? fullSurface : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflowY: "auto",
        paddingTop: route === "detail" ? 0 : "30px"
      }
    }, route === "feed" && /*#__PURE__*/React.createElement(Header, null), route === "feed" && /*#__PURE__*/React.createElement(FilterBar, {
      filters: FILTERS,
      active: active,
      onToggle: toggleFilter,
      sticky: true
    }), screenBody(false)), route !== "detail" && /*#__PURE__*/React.createElement(BottomNav, {
      items: NAV,
      active: route,
      onSelect: setRoute
    })), picker && /*#__PURE__*/React.createElement(LocationPicker, {
      cities: D.cities,
      current: city.id,
      onPick: pickCity,
      onClose: () => setPicker(false)
    })));

    // ---- DESKTOP ----
    const desktopShell = /*#__PURE__*/React.createElement("div", {
      "data-theme": theme,
      style: {
        width: "1280px",
        height: "820px",
        flex: "0 0 auto",
        background: "var(--surface-page)",
        color: "var(--text-body)",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid var(--border)",
        boxShadow: "0 40px 90px rgba(21,18,12,0.28)",
        display: "flex",
        position: "relative"
      }
    }, isOnboarding ? /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: "flex",
        alignItems: "stretch",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: "520px"
      }
    }, fullSurface)) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("nav", {
      style: {
        width: "var(--sidebar-w)",
        flex: "0 0 auto",
        borderRight: "1px solid var(--border)",
        padding: "var(--space-5) var(--space-4)",
        display: "flex",
        flexDirection: "column",
        background: "var(--surface-page)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 var(--space-2) var(--space-6)"
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      size: 26
    })), /*#__PURE__*/React.createElement(SidebarNav, {
      items: NAV,
      active: route === "detail" ? "feed" : route,
      onSelect: setRoute
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "2px"
      }
    }, /*#__PURE__*/React.createElement(SidebarNav, {
      items: [{
        key: "search",
        label: "Search",
        icon: /*#__PURE__*/React.createElement(I.Search, {
          size: 20
        })
      }, {
        key: "states",
        label: "States",
        icon: /*#__PURE__*/React.createElement(I.Sparkles, {
          size: 20
        })
      }],
      active: route,
      onSelect: setRoute
    }), /*#__PURE__*/React.createElement("button", {
      onClick: () => setRoute("account"),
      style: {
        display: "flex",
        width: "100%",
        textAlign: "left",
        alignItems: "center",
        gap: "var(--space-3)",
        padding: "var(--space-3) var(--space-3)",
        marginTop: "var(--space-2)",
        borderRadius: "var(--radius-md)",
        border: "none",
        borderTop: "1px solid var(--border)",
        cursor: "pointer",
        background: route === "account" ? "var(--accent-soft)" : "transparent"
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: "Ana Ruiz",
      size: 34
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: "var(--fs-sm)",
        fontWeight: "var(--fw-semibold)",
        color: "var(--text-strong)"
      }
    }, "Ana Ruiz"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-2xs)",
        color: "var(--text-muted)"
      }
    }, "Free plan"))))), /*#__PURE__*/React.createElement("main", {
      style: {
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRight: route === "feed" ? "1px solid var(--border)" : "none"
      }
    }, route !== "detail" && /*#__PURE__*/React.createElement(Header, {
      desktop: true
    }), route === "feed" && /*#__PURE__*/React.createElement(FilterBar, {
      filters: FILTERS,
      active: active,
      onToggle: toggleFilter,
      sticky: false
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflowY: "auto"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: route === "feed" ? "660px" : "100%",
        margin: route === "feed" ? "0 auto" : 0
      }
    }, screenBody(true)))), route === "feed" && /*#__PURE__*/React.createElement(MapPanel, {
      events: events,
      selectedId: mapSel,
      onSelect: setMapSel,
      loading: loading
    })), picker && /*#__PURE__*/React.createElement(LocationPicker, {
      cities: D.cities,
      current: city.id,
      onPick: pickCity,
      onClose: () => setPicker(false)
    }));
    return /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: "100vh",
        background: "#E4DCCB",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(Toolbar, {
      theme,
      setTheme,
      view,
      setView,
      route,
      setRoute
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "28px",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        boxSizing: "border-box"
      }
    }, view === "mobile" ? mobile : desktopShell));
  }
  function Toolbar({
    theme,
    setTheme,
    view,
    setView,
    route,
    setRoute
  }) {
    const routes = [{
      value: "signin",
      label: "Sign in"
    }, {
      value: "onboarding",
      label: "Onboarding"
    }, {
      value: "feed",
      label: "Feed"
    }, {
      value: "search",
      label: "Search"
    }, {
      value: "saved",
      label: "Saved"
    }, {
      value: "digest",
      label: "Digest"
    }, {
      value: "me",
      label: "For me"
    }, {
      value: "account",
      label: "Account"
    }, {
      value: "states",
      label: "States"
    }];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "sticky",
        top: 0,
        zIndex: 100,
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        padding: "12px 24px",
        background: "rgba(20,20,21,0.92)",
        backdropFilter: "blur(12px)",
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "#A9A79F"
      }
    }, "Pulse \xB7 UI Kit"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: "10px",
        alignItems: "center",
        flexWrap: "wrap"
      },
      "data-theme": "dark"
    }, /*#__PURE__*/React.createElement("select", {
      value: route,
      onChange: e => setRoute(e.target.value),
      style: {
        appearance: "none",
        background: "#1f1f23",
        color: "#f2f0ea",
        border: "1px solid rgba(255,255,255,0.16)",
        borderRadius: "999px",
        padding: "8px 16px",
        fontFamily: "var(--font-sans)",
        fontSize: "13px",
        fontWeight: 600,
        cursor: "pointer"
      }
    }, routes.map(r => /*#__PURE__*/React.createElement("option", {
      key: r.value,
      value: r.value
    }, r.label))), /*#__PURE__*/React.createElement(SegmentedControl, {
      size: "sm",
      value: view,
      onChange: setView,
      options: [{
        value: "mobile",
        label: "Mobile"
      }, {
        value: "desktop",
        label: "Desktop"
      }]
    }), /*#__PURE__*/React.createElement(SegmentedControl, {
      size: "sm",
      value: theme,
      onChange: setTheme,
      options: [{
        value: "light",
        label: "Light"
      }, {
        value: "dark",
        label: "Dark"
      }]
    })));
  }
  ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pulse/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/pulse/data.js
try { (() => {
// Sample content for the Pulse UI kit. Plain globals (no module system).
window.PULSE_DATA = function () {
  const events = [{
    id: "jazz",
    category: "Live music",
    title: "Warehouse jazz, after hours",
    date: "Fri · 9:00pm",
    venue: "The Lot",
    distance: "0.4mi",
    price: 12,
    freshness: "added 2h ago",
    score: 94,
    relevance: ["live music", "under $15", "near you"],
    sources: ["Resident Advisor", "DICE"],
    img: "18% 30%",
    blurb: "A late-night quartet in a converted loading dock — BYO, low ceilings, loud horns. The kind of room that doesn't advertise."
  }, {
    id: "bridges",
    category: "Talk",
    title: "A short history of the city's bridges",
    date: "Sun · 2:00pm",
    venue: "Carnegie Library",
    distance: "1.1mi",
    free: true,
    freshness: "added 6h ago",
    gem: true,
    score: 88,
    relevance: ["history", "free", "rarely listed"],
    sources: ["City Library"],
    img: "70% 40%",
    blurb: "An engineer-turned-historian walks through two centuries of river crossings. Free, seats limited, almost never shows up in other apps."
  }, {
    id: "riso",
    category: "Workshop",
    title: "Risograph zine night",
    date: "Thu · 7:00pm",
    venue: "Press Room",
    distance: "0.8mi",
    price: 25,
    freshness: "added 1d ago",
    gem: true,
    score: 83,
    relevance: ["art", "hands-on", "small venue"],
    sources: ["Meetup"],
    img: "45% 70%",
    blurb: "Two-color printing, bring an idea, leave with a stack. Ink-stained fingers guaranteed."
  }, {
    id: "market",
    category: "Market",
    title: "Saturday makers' market",
    date: "Sat · 10:00am",
    venue: "Old Customs Yard",
    distance: "0.6mi",
    free: true,
    freshness: "added 3h ago",
    score: 79,
    relevance: ["free", "weekends", "food"],
    sources: ["Eventbrite", "Fever"],
    img: "60% 25%",
    blurb: "Forty stalls of ceramics, secondhand books, and very good dumplings."
  }, {
    id: "film",
    category: "Film",
    title: "Late screening: noir double bill",
    date: "Fri · 10:30pm",
    venue: "Roxy Cinema",
    distance: "1.4mi",
    price: 14,
    freshness: "added 5h ago",
    score: 86,
    relevance: ["film", "under $15", "tonight"],
    sources: ["Songkick"],
    img: "30% 55%",
    blurb: "Two restored prints, one intermission, no phones."
  }, {
    id: "club",
    category: "Club",
    title: "Basement: dub & low end",
    date: "Sat · 11:00pm",
    venue: "Sub Club",
    distance: "2.0mi",
    price: 18,
    freshness: "added 9h ago",
    score: 90,
    relevance: ["live music", "late"],
    sources: ["Resident Advisor", "DICE", "Eventbrite"],
    img: "80% 70%",
    blurb: "Sound-system night with a guest selector. Doors late, ends later."
  }, {
    id: "supper",
    category: "Food",
    title: "Pop-up supper: coastal Portugal",
    date: "Wed · 7:30pm",
    venue: "Apt. 4 (address on booking)",
    distance: "0.9mi",
    price: 45,
    freshness: "added 2d ago",
    gem: true,
    score: 81,
    relevance: ["food", "intimate"],
    sources: ["Luma"],
    img: "20% 80%",
    blurb: "Twelve seats, five courses, one chef's apartment. The opposite of a chain."
  }, {
    id: "comedy",
    category: "Comedy",
    title: "New material night",
    date: "Tue · 8:00pm",
    venue: "The Stand",
    distance: "1.7mi",
    price: 10,
    freshness: "added 12h ago",
    score: 74,
    relevance: ["comedy", "under $15"],
    sources: ["Eventbrite"],
    img: "50% 40%",
    blurb: "Seven comics trying things that may not work yet. Cheap, honest, occasionally great."
  }, {
    id: "choir",
    category: "Live music",
    title: "Lunchtime choral recital",
    date: "Thu · 1:00pm",
    venue: "St. Anne's",
    distance: "0.3mi",
    free: true,
    freshness: "added 4h ago",
    gem: true,
    score: 77,
    relevance: ["free", "near you", "quiet"],
    sources: ["City Listings"],
    img: "65% 60%",
    blurb: "Forty minutes of polyphony in a cool stone nave. Slip out of the office, slip back in."
  }, {
    id: "theatre",
    category: "Theatre",
    title: "Promenade piece: the night port",
    date: "Sat · 6:00pm",
    venue: "Harbour District",
    distance: "2.4mi",
    price: 30,
    freshness: "added 1d ago",
    score: 84,
    relevance: ["theatre", "outdoors"],
    sources: ["Eventbrite", "DICE"],
    img: "35% 35%",
    blurb: "A walking performance that moves through three warehouses as the light goes."
  }];
  const cities = [{
    id: "lisbon",
    name: "Lisbon",
    country: "Portugal",
    count: 412
  }, {
    id: "berlin",
    name: "Berlin",
    country: "Germany",
    count: 1340
  }, {
    id: "porto",
    name: "Porto",
    country: "Portugal",
    count: 188
  }, {
    id: "reykjavik",
    name: "Reykjavík",
    country: "Iceland",
    count: 23
  }, {
    id: "nyc",
    name: "New York",
    country: "USA",
    count: 2980
  }, {
    id: "mexico",
    name: "Mexico City",
    country: "Mexico",
    count: 870
  }];
  const interests = ["Live music", "Art", "Film", "Food", "Theatre", "Talks", "Comedy", "Markets", "Workshops", "Clubs", "Books", "Design"];
  return {
    events,
    cities,
    interests
  };
}();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pulse/data.js", error: String((e && e.message) || e) }); }

// ui_kits/pulse/icons.jsx
try { (() => {
// Pulse icon set — Lucide geometry (ISC), 1.75 stroke, redrawn inline so they
// compose cleanly inside React. Exposed as window.PulseIcons.
(function () {
  const S = ({
    size = 20,
    sw = 1.75,
    children,
    style
  }) => React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: sw,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style,
    "aria-hidden": "true"
  }, children);
  const p = (d, extra) => React.createElement("path", {
    d,
    ...(extra || {})
  });
  const c = (cx, cy, r, extra) => React.createElement("circle", {
    cx,
    cy,
    r,
    ...(extra || {})
  });
  const make = (...nodes) => props => S({
    ...props,
    children: nodes.map((n, i) => React.cloneElement(n, {
      key: i
    }))
  });
  window.PulseIcons = {
    Pin: make(p("M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"), c(12, 10, 2.6)),
    Search: make(c(11, 11, 7), p("m21 21-4.3-4.3")),
    Home: make(p("M3 10.5 12 3l9 7.5"), p("M5 9.5V21h14V9.5")),
    Bookmark: make(p("M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z")),
    Bell: make(p("M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z"), p("M10 20a2 2 0 0 0 4 0")),
    User: make(c(12, 8, 4), p("M5 21a7 7 0 0 1 14 0")),
    Sliders: make(p("M4 8h10"), p("M18 8h2"), c(16, 8, 2), p("M4 16h2"), p("M10 16h10"), c(8, 16, 2)),
    Filter: make(p("M3 5h18l-7 8v6l-4-2v-4z")),
    X: make(p("M18 6 6 18M6 6l12 12")),
    Check: make(p("M20 6 9 17l-5-5")),
    Plus: make(p("M12 5v14M5 12h14")),
    Calendar: make(p("M7 3v3M17 3v3"), React.createElement("rect", {
      x: 4,
      y: 5,
      width: 16,
      height: 16,
      rx: 2
    }), p("M4 10h16")),
    Clock: make(c(12, 12, 8.5), p("M12 8v4.5l3 1.6")),
    Share: make(c(18, 5, 3), c(6, 12, 3), c(18, 19, 3), p("m8.6 13.5 6.8 4M15.4 6.5 8.6 10.5")),
    ChevronRight: make(p("m9 6 6 6-6 6")),
    ChevronLeft: make(p("m15 6-6 6 6 6")),
    ChevronDown: make(p("m6 9 6 6 6-6")),
    Star: make(p("M12 3l2.6 5.6 6 .7-4.4 4.1 1.1 5.9L12 16.6 6.7 19.4l1.1-5.9L3.4 9.3l6-.7z")),
    Sparkles: make(p("M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6z"), p("M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z")),
    ArrowUpRight: make(p("M7 17 17 7M8 7h9v9")),
    ExternalLink: make(p("M14 4h6v6"), p("M20 4 11 13"), p("M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5")),
    Navigation: make(p("M3 11 21 3l-8 18-2-7z")),
    More: make(c(5, 12, 1), c(12, 12, 1), c(19, 12, 1)),
    Music: make(p("M9 18V5l11-2v13"), c(6, 18, 3), c(17, 16, 3)),
    Palette: make(p("M12 21a9 9 0 1 1 9-9c0 2-2 3-4 3h-2a2 2 0 0 0-1 3.7A1.5 1.5 0 0 1 12 21Z"), c(7.5, 11.5, 1), c(12, 8, 1), c(16, 11, 1)),
    Film: make(React.createElement("rect", {
      x: 3,
      y: 4,
      width: 18,
      height: 16,
      rx: 2
    }), p("M3 9h4M17 9h4M3 15h4M17 15h4M8 4v16M16 4v16")),
    Utensils: make(p("M5 3v7a2 2 0 0 0 4 0V3M7 10v11"), p("M17 3c-1.5 0-2.5 2-2.5 5s1 4 2.5 4v9")),
    Mic: make(React.createElement("rect", {
      x: 9,
      y: 3,
      width: 6,
      height: 11,
      rx: 3
    }), p("M6 11a6 6 0 0 0 12 0M12 17v4")),
    Ticket: make(p("M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4Z"), p("M14 6v12", {
      strokeDasharray: "2 3"
    })),
    Heart: make(p("M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.4-7 10-7 10Z")),
    Globe: make(c(12, 12, 9), p("M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18")),
    Refresh: make(p("M21 12a9 9 0 1 1-3-6.7L21 8"), p("M21 3v5h-5")),
    Download: make(p("M12 4v11m0 0 4-4m-4 4-4-4"), p("M5 19h14"))
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pulse/icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/pulse/pulse-bundle.js
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// AUTO-GENERATED local bundle for the Pulse UI kit. Do not edit by hand.
window.__PulseSrc = window.__PulseSrc || {};
(function () {
  /**
   * Pulse brand lockup: the map-pin + radar pulse mark, optionally with the
   * "Pulse" serif wordmark. Inherits color from `currentColor`.
   */
  function Logo({
    size = 28,
    showWordmark = true,
    color,
    style,
    ...rest
  }) {
    const px = typeof size === "number" ? `${size}px` : size;
    return /*#__PURE__*/React.createElement("span", _extends({
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.45em",
        color: color || "var(--text-strong)",
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement("svg", {
      width: px,
      height: px,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.7",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      style: {
        flex: "0 0 auto"
      }
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 21.6 C12 21.6 18.8 14.8 18.8 9 A6.8 6.8 0 1 0 5.2 9 C5.2 14.8 12 21.6 12 21.6 Z"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "8.8",
      r: "1.5",
      fill: "currentColor",
      stroke: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M14.7 6.1 a3.9 3.9 0 0 1 0 5.4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9.3 6.1 a3.9 3.9 0 0 0 0 5.4"
    })), showWordmark && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: "var(--fw-bold)",
        fontSize: `calc(${px} * 0.92)`,
        letterSpacing: "var(--ls-display)",
        lineHeight: 1
      }
    }, "Pulse"));
  }
  Object.assign(window.__PulseSrc, {
    Logo
  });
})();
(function () {
  const sizes = {
    sm: {
      padding: "0 var(--space-3)",
      height: "36px",
      fontSize: "var(--fs-sm)"
    },
    md: {
      padding: "0 var(--space-5)",
      height: "44px",
      fontSize: "var(--fs-body)"
    },
    lg: {
      padding: "0 var(--space-6)",
      height: "52px",
      fontSize: "var(--fs-subtitle)"
    }
  };
  const variants = {
    primary: {
      background: "var(--accent)",
      color: "var(--accent-fg)",
      border: "1px solid var(--accent)"
    },
    secondary: {
      background: "transparent",
      color: "var(--text-strong)",
      border: "1px solid var(--border-strong)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-strong)",
      border: "1px solid transparent"
    }
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
    const spinner = /*#__PURE__*/React.createElement("svg", {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.4",
      strokeLinecap: "round",
      style: {
        animation: "pulse-spin 0.7s linear infinite"
      },
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 3a9 9 0 1 0 9 9"
    }), /*#__PURE__*/React.createElement("style", null, "@keyframes pulse-spin{to{transform:rotate(360deg)}}"));
    return /*#__PURE__*/React.createElement("button", _extends({
      disabled: isOff,
      "aria-busy": loading || undefined,
      style: {
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
        ...style
      },
      onMouseDown: e => {
        if (!isOff) e.currentTarget.style.transform = "scale(0.97)";
      },
      onMouseUp: e => {
        e.currentTarget.style.transform = "scale(1)";
      },
      onMouseLeave: e => {
        e.currentTarget.style.transform = "scale(1)";
      }
    }, rest), loading ? spinner : iconLeft, children, !loading && iconRight);
  }
  Object.assign(window.__PulseSrc, {
    Button
  });
})();
(function () {
  const sizes = {
    sm: 36,
    md: 44,
    lg: 52
  };

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
      ghost: {
        background: "transparent",
        border: "1px solid transparent",
        color: "var(--text-body)"
      },
      outline: {
        background: "transparent",
        border: "1px solid var(--border-strong)",
        color: "var(--text-strong)"
      },
      solid: {
        background: "var(--accent)",
        border: "1px solid var(--accent)",
        color: "var(--accent-fg)"
      }
    }[variant];
    const activeStyle = active ? {
      background: "var(--accent-soft)",
      color: "var(--text-strong)",
      borderColor: "var(--border)"
    } : null;
    return /*#__PURE__*/React.createElement("button", _extends({
      "aria-label": label,
      disabled: disabled,
      style: {
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
        ...style
      },
      onMouseDown: e => {
        if (!disabled) e.currentTarget.style.transform = "scale(0.92)";
      },
      onMouseUp: e => {
        e.currentTarget.style.transform = "scale(1)";
      },
      onMouseLeave: e => {
        e.currentTarget.style.transform = "scale(1)";
      }
    }, rest), children);
  }
  Object.assign(window.__PulseSrc, {
    IconButton
  });
})();
(function () {
  /**
   * Category / metadata tag. Mono, uppercase, hairline outline by default.
   * Use `solid` to invert (ink fill) for emphasis.
   */
  function Tag({
    children,
    solid = false,
    size = "md",
    style,
    ...rest
  }) {
    const pad = size === "sm" ? "2px 7px" : "3px 9px";
    const fs = size === "sm" ? "var(--fs-2xs)" : "var(--fs-xs)";
    return /*#__PURE__*/React.createElement("span", _extends({
      style: {
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
        ...style
      }
    }, rest), children);
  }
  Object.assign(window.__PulseSrc, {
    Tag
  });
})();
(function () {
  /**
   * Small status / count badge. `tone` carries minimal chroma for feedback only;
   * default is neutral monochrome.
   */
  function Badge({
    children,
    tone = "neutral",
    dot = false,
    style,
    ...rest
  }) {
    const tones = {
      neutral: {
        bg: "var(--accent-soft)",
        fg: "var(--text-strong)"
      },
      inverse: {
        bg: "var(--accent)",
        fg: "var(--accent-fg)"
      },
      ok: {
        bg: "color-mix(in srgb, var(--ok) 16%, transparent)",
        fg: "var(--ok)"
      },
      warn: {
        bg: "color-mix(in srgb, var(--warn) 18%, transparent)",
        fg: "var(--warn)"
      },
      error: {
        bg: "color-mix(in srgb, var(--error) 16%, transparent)",
        fg: "var(--error)"
      }
    }[tone];
    return /*#__PURE__*/React.createElement("span", _extends({
      style: {
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
        ...style
      }
    }, rest), !dot && children);
  }
  Object.assign(window.__PulseSrc, {
    Badge
  });
})();
(function () {
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
    return /*#__PURE__*/React.createElement("div", _extends({
      style: {
        background: inverse ? "var(--surface-inverse)" : "var(--surface-card)",
        color: inverse ? "var(--text-inverse)" : "var(--text-body)",
        border: inverse ? "1px solid var(--surface-inverse)" : "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        boxShadow: shadow,
        padding,
        transition: "transform var(--dur-3) var(--ease-out), box-shadow var(--dur-3) var(--ease-out)",
        cursor: interactive ? "pointer" : "default",
        ...style
      },
      onMouseEnter: interactive ? e => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "var(--shadow-3)";
      } : undefined,
      onMouseLeave: interactive ? e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = shadow;
      } : undefined
    }, rest), children);
  }
  Object.assign(window.__PulseSrc, {
    Card
  });
})();
(function () {
  /**
   * Avatar / identity dot. Renders initials on an ink surface, or an image.
   * Used for the "For me" profile and digest sender.
   */
  function Avatar({
    name = "",
    src,
    size = 36,
    style,
    ...rest
  }) {
    const initials = name.split(" ").map(p => p[0]).slice(0, 2).join("").toUpperCase();
    return /*#__PURE__*/React.createElement("span", _extends({
      style: {
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
        ...style
      }
    }, rest), src ? /*#__PURE__*/React.createElement("img", {
      src: src,
      alt: name,
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }
    }) : initials || "•");
  }
  Object.assign(window.__PulseSrc, {
    Avatar
  });
})();
(function () {
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
    return /*#__PURE__*/React.createElement("label", {
      htmlFor: inputId,
      style: {
        display: "block",
        ...style
      }
    }, label && /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        marginBottom: "6px",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-xs)",
        letterSpacing: "var(--ls-label)",
        textTransform: "uppercase",
        color: "var(--text-muted)"
      }
    }, label), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "var(--space-2)",
        height: h,
        padding: "0 var(--space-4)",
        background: "var(--surface-card)",
        border: "1px solid var(--border-strong)",
        borderRadius: "var(--radius-md)",
        transition: "border-color var(--dur-2) var(--ease-out), box-shadow var(--dur-2)"
      },
      onFocus: e => {
        e.currentTarget.style.borderColor = "var(--accent)";
      },
      onBlur: e => {
        e.currentTarget.style.borderColor = "var(--border-strong)";
      }
    }, iconLeft && /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        color: "var(--text-muted)"
      }
    }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
      id: inputId,
      style: {
        flex: 1,
        minWidth: 0,
        border: "none",
        outline: "none",
        background: "transparent",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-body)",
        color: "var(--text-strong)"
      }
    }, rest))), hint && /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        marginTop: "6px",
        fontSize: "var(--fs-sm)",
        color: "var(--text-muted)"
      }
    }, hint));
  }
  Object.assign(window.__PulseSrc, {
    Input
  });
})();
(function () {
  /**
   * Native select styled to the Pulse field. Used for sort order, frequency,
   * distance units.
   */
  function Select({
    label,
    value,
    onChange,
    options = [],
    size = "md",
    style,
    ...rest
  }) {
    const h = size === "sm" ? "38px" : "44px";
    return /*#__PURE__*/React.createElement("label", {
      style: {
        display: "block",
        ...style
      }
    }, label && /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        marginBottom: "6px",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-xs)",
        letterSpacing: "var(--ls-label)",
        textTransform: "uppercase",
        color: "var(--text-muted)"
      }
    }, label), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "relative",
        display: "block"
      }
    }, /*#__PURE__*/React.createElement("select", _extends({
      value: value,
      onChange: onChange,
      style: {
        appearance: "none",
        WebkitAppearance: "none",
        width: "100%",
        height: h,
        padding: "0 38px 0 var(--space-4)",
        background: "var(--surface-card)",
        border: "1px solid var(--border-strong)",
        borderRadius: "var(--radius-md)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-body)",
        color: "var(--text-strong)",
        cursor: "pointer"
      }
    }, rest), options.map(o => {
      const val = typeof o === "string" ? o : o.value;
      const lbl = typeof o === "string" ? o : o.label;
      return /*#__PURE__*/React.createElement("option", {
        key: val,
        value: val
      }, lbl);
    })), /*#__PURE__*/React.createElement("svg", {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      style: {
        position: "absolute",
        right: "12px",
        top: "50%",
        transform: "translateY(-50%)",
        color: "var(--text-muted)",
        pointerEvents: "none"
      }
    }, /*#__PURE__*/React.createElement("path", {
      d: "m6 9 6 6 6-6"
    }))));
  }
  Object.assign(window.__PulseSrc, {
    Select
  });
})();
(function () {
  /**
   * On/off switch. Used for dealbreakers (free-only, nights & weekends) and
   * notification toggles. Track fills with ink when on.
   */
  function Switch({
    checked = false,
    onChange,
    disabled = false,
    label,
    style,
    ...rest
  }) {
    const toggle = () => {
      if (!disabled && onChange) onChange(!checked);
    };
    return /*#__PURE__*/React.createElement("span", _extends({
      role: "switch",
      "aria-checked": checked,
      onClick: toggle,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-3)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "relative",
        width: "44px",
        height: "26px",
        flex: "0 0 auto",
        borderRadius: "var(--radius-pill)",
        background: checked ? "var(--accent)" : "var(--surface-raised)",
        border: `1px solid ${checked ? "var(--accent)" : "var(--border-strong)"}`,
        transition: "background var(--dur-2) var(--ease-out), border-color var(--dur-2)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: "2px",
        left: checked ? "20px" : "2px",
        width: "20px",
        height: "20px",
        borderRadius: "var(--radius-pill)",
        background: checked ? "var(--accent-fg)" : "var(--surface-card)",
        boxShadow: "var(--shadow-1)",
        transition: "left var(--dur-2) var(--ease-spring)"
      }
    })), label && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "var(--fs-body)",
        color: "var(--text-body)"
      }
    }, label));
  }
  Object.assign(window.__PulseSrc, {
    Switch
  });
})();
(function () {
  /**
   * Selectable interest token used in onboarding & preferences. Tap to toggle;
   * selected state inverts to ink fill with a check.
   */
  function Checkbox({
    checked = false,
    onChange,
    label,
    style,
    ...rest
  }) {
    return /*#__PURE__*/React.createElement("button", _extends({
      role: "checkbox",
      "aria-checked": checked,
      onClick: () => onChange && onChange(!checked),
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        height: "44px",
        padding: "0 var(--space-4)",
        background: checked ? "var(--accent)" : "var(--surface-card)",
        color: checked ? "var(--accent-fg)" : "var(--text-body)",
        border: `1px solid ${checked ? "var(--accent)" : "var(--border-strong)"}`,
        borderRadius: "var(--radius-pill)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-body)",
        fontWeight: "var(--fw-medium)",
        cursor: "pointer",
        transition: "background var(--dur-2) var(--ease-out), color var(--dur-2), border-color var(--dur-2)",
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "18px",
        height: "18px",
        flex: "0 0 auto"
      }
    }, checked ? /*#__PURE__*/React.createElement("svg", {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.4",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M20 6 9 17l-5-5"
    })) : /*#__PURE__*/React.createElement("svg", {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 5v14M5 12h14",
      opacity: "0.55"
    }))), label);
  }
  Object.assign(window.__PulseSrc, {
    Checkbox
  });
})();
(function () {
  /**
   * Segmented control for 2–4 mutually-exclusive options — the boost/mute
   * tri-state and time-window pickers in Preferences.
   */
  function SegmentedControl({
    options = [],
    value,
    onChange,
    size = "md",
    style,
    ...rest
  }) {
    const h = size === "sm" ? "34px" : "40px";
    return /*#__PURE__*/React.createElement("div", _extends({
      style: {
        display: "inline-flex",
        padding: "3px",
        gap: "2px",
        background: "var(--surface-sunken)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-pill)",
        ...style
      }
    }, rest), options.map(o => {
      const val = typeof o === "string" ? o : o.value;
      const lbl = typeof o === "string" ? o : o.label;
      const active = val === value;
      return /*#__PURE__*/React.createElement("button", {
        key: val,
        onClick: () => onChange && onChange(val),
        style: {
          height: h,
          padding: "0 var(--space-4)",
          border: "none",
          borderRadius: "var(--radius-pill)",
          background: active ? "var(--accent)" : "transparent",
          color: active ? "var(--accent-fg)" : "var(--text-muted)",
          fontFamily: "var(--font-sans)",
          fontSize: "var(--fs-sm)",
          fontWeight: "var(--fw-semibold)",
          cursor: "pointer",
          whiteSpace: "nowrap",
          transition: "background var(--dur-2) var(--ease-out), color var(--dur-2)"
        }
      }, lbl);
    }));
  }
  Object.assign(window.__PulseSrc, {
    SegmentedControl
  });
})();
(function () {
  /**
   * Compact month calendar for date search. Single-date selection with month
   * navigation; today is ringed, the selected day fills with ink. Controlled via
   * value/onChange (JS Date).
   */
  function DatePicker({
    value,
    onChange,
    style,
    ...rest
  }) {
    const today = new Date();
    const init = value || today;
    const [view, setView] = React.useState({
      y: init.getFullYear(),
      m: init.getMonth()
    });
    const monthName = new Date(view.y, view.m, 1).toLocaleString("en-US", {
      month: "long",
      year: "numeric"
    });
    const firstDow = (new Date(view.y, view.m, 1).getDay() + 6) % 7; // Mon=0
    const days = new Date(view.y, view.m + 1, 0).getDate();
    const sameDay = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
    const step = d => setView(v => {
      const nm = v.m + d;
      return {
        y: v.y + Math.floor(nm / 12),
        m: (nm % 12 + 12) % 12
      };
    });
    const cells = [];
    for (let i = 0; i < firstDow; i++) cells.push(null);
    for (let d = 1; d <= days; d++) cells.push(new Date(view.y, view.m, d));
    const Chevron = ({
      dir
    }) => /*#__PURE__*/React.createElement("button", {
      onClick: () => step(dir),
      "aria-label": dir < 0 ? "Previous month" : "Next month",
      style: {
        width: "30px",
        height: "30px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid var(--border)",
        background: "transparent",
        borderRadius: "var(--radius-sm)",
        cursor: "pointer",
        color: "var(--text-body)"
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: dir < 0 ? "m15 6-6 6 6 6" : "m9 6 6 6-6 6"
    })));
    return /*#__PURE__*/React.createElement("div", _extends({
      style: {
        width: "280px",
        background: "var(--surface-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-4)",
        boxShadow: "var(--shadow-3)",
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "var(--space-3)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: "var(--fs-subtitle)",
        color: "var(--text-strong)",
        fontWeight: "var(--fw-semibold)"
      }
    }, monthName), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        gap: "6px"
      }
    }, /*#__PURE__*/React.createElement(Chevron, {
      dir: -1
    }), /*#__PURE__*/React.createElement(Chevron, {
      dir: 1
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "2px",
        marginBottom: "4px"
      }
    }, ["M", "T", "W", "T", "F", "S", "S"].map((d, i) => /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        textAlign: "center",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-2xs)",
        letterSpacing: "0.04em",
        color: "var(--text-faint)",
        padding: "4px 0"
      }
    }, d))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "2px"
      }
    }, cells.map((date, i) => {
      if (!date) return /*#__PURE__*/React.createElement("span", {
        key: i
      });
      const isSel = sameDay(date, value);
      const isToday = sameDay(date, today);
      return /*#__PURE__*/React.createElement("button", {
        key: i,
        onClick: () => onChange && onChange(date),
        style: {
          height: "34px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          border: isToday && !isSel ? "1px solid var(--border-strong)" : "1px solid transparent",
          borderRadius: "var(--radius-pill)",
          cursor: "pointer",
          background: isSel ? "var(--accent)" : "transparent",
          color: isSel ? "var(--accent-fg)" : "var(--text-body)",
          fontFamily: "var(--font-sans)",
          fontSize: "var(--fs-sm)",
          fontWeight: isSel ? "var(--fw-semibold)" : "var(--fw-regular)",
          fontVariantNumeric: "tabular-nums",
          transition: "background var(--dur-1) var(--ease-out)"
        },
        onMouseEnter: e => {
          if (!isSel) e.currentTarget.style.background = "var(--surface-raised)";
        },
        onMouseLeave: e => {
          if (!isSel) e.currentTarget.style.background = "transparent";
        }
      }, date.getDate());
    })));
  }
  Object.assign(window.__PulseSrc, {
    DatePicker
  });
})();
(function () {
  /**
   * Lightweight transient notice — confirms saves/dismisses and "added to
   * calendar". Ink surface, optional undo action. Auto-styled; you control
   * mount/unmount.
   */
  function Toast({
    message,
    actionLabel,
    onAction,
    icon,
    style,
    ...rest
  }) {
    return /*#__PURE__*/React.createElement("div", _extends({
      role: "status",
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-3)",
        padding: "var(--space-3) var(--space-3) var(--space-3) var(--space-4)",
        background: "var(--surface-inverse)",
        color: "var(--text-inverse)",
        borderRadius: "var(--radius-pill)",
        boxShadow: "var(--shadow-3)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-sm)",
        fontWeight: "var(--fw-medium)",
        ...style
      }
    }, rest), icon && /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        opacity: 0.85
      }
    }, icon), /*#__PURE__*/React.createElement("span", null, message), actionLabel && /*#__PURE__*/React.createElement("button", {
      onClick: onAction,
      style: {
        border: "1px solid color-mix(in srgb, var(--text-inverse) 32%, transparent)",
        background: "transparent",
        color: "var(--text-inverse)",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-xs)",
        letterSpacing: "var(--ls-label)",
        textTransform: "uppercase",
        padding: "6px 12px",
        borderRadius: "var(--radius-pill)",
        cursor: "pointer"
      }
    }, actionLabel));
  }
  Object.assign(window.__PulseSrc, {
    Toast
  });
})();
(function () {
  /**
   * Loading placeholder. A subtle shimmer over a neutral block — used during
   * cold-start and infinite-scroll. Compose `EventCardSkeleton` from these.
   */
  function Skeleton({
    width = "100%",
    height = "16px",
    radius = "var(--radius-sm)",
    style,
    ...rest
  }) {
    return /*#__PURE__*/React.createElement("span", _extends({
      "aria-hidden": "true",
      style: {
        display: "block",
        width,
        height,
        borderRadius: radius,
        background: "linear-gradient(100deg, var(--surface-raised) 30%, var(--surface-sunken) 50%, var(--surface-raised) 70%)",
        backgroundSize: "200% 100%",
        animation: "pulse-shimmer 1.4s var(--ease-inout) infinite",
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement("style", null, `@keyframes pulse-shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
        @media (prefers-reduced-motion: reduce){[aria-hidden="true"]{animation:none!important}}`));
  }

  /** Full event-card skeleton (image + two text rows). */
  function EventCardSkeleton({
    style
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--surface-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        ...style
      }
    }, /*#__PURE__*/React.createElement(Skeleton, {
      height: "150px",
      radius: "0"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "var(--space-4)",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
      }
    }, /*#__PURE__*/React.createElement(Skeleton, {
      width: "38%",
      height: "11px"
    }), /*#__PURE__*/React.createElement(Skeleton, {
      width: "80%",
      height: "20px"
    }), /*#__PURE__*/React.createElement(Skeleton, {
      width: "55%",
      height: "13px"
    })));
  }
  Object.assign(window.__PulseSrc, {
    Skeleton,
    EventCardSkeleton
  });
})();
(function () {
  /**
   * Empty / cold-start / quiet-city state. Centered line-map glyph, a serif
   * headline, supporting line, optional action. Never a blank screen.
   */
  function EmptyState({
    title,
    body,
    action,
    glyph = "map",
    style,
    ...rest
  }) {
    return /*#__PURE__*/React.createElement("div", _extends({
      role: glyph === "error" ? "alert" : undefined,
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "var(--space-4)",
        padding: "var(--space-9) var(--space-6)",
        maxWidth: "34rem",
        margin: "0 auto",
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement("span", {
      style: {
        width: "76px",
        height: "76px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "var(--radius-pill)",
        border: "1px solid var(--border)",
        background: "var(--surface-card)",
        color: "var(--text-muted)"
      },
      className: "map-overlay"
    }, glyphs[glyph] || glyphs.map), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: "var(--fs-display-sm)",
        color: "var(--text-strong)",
        margin: 0
      }
    }, title), body && /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: "var(--fs-subtitle)",
        color: "var(--text-muted)",
        lineHeight: "var(--lh-normal)",
        margin: 0
      }
    }, body), action && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "var(--space-2)"
      }
    }, action));
  }
  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  const glyphs = {
    map: /*#__PURE__*/React.createElement("svg", _extends({
      width: "34",
      height: "34",
      viewBox: "0 0 24 24"
    }, stroke), /*#__PURE__*/React.createElement("path", {
      d: "m9 4 6 2 6-2v14l-6 2-6-2-6 2V6z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9 4v14M15 6v14"
    })),
    search: /*#__PURE__*/React.createElement("svg", _extends({
      width: "32",
      height: "32",
      viewBox: "0 0 24 24"
    }, stroke), /*#__PURE__*/React.createElement("circle", {
      cx: "11",
      cy: "11",
      r: "7"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m21 21-4.3-4.3"
    })),
    saved: /*#__PURE__*/React.createElement("svg", _extends({
      width: "32",
      height: "32",
      viewBox: "0 0 24 24"
    }, stroke), /*#__PURE__*/React.createElement("path", {
      d: "M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"
    })),
    quiet: /*#__PURE__*/React.createElement("svg", _extends({
      width: "32",
      height: "32",
      viewBox: "0 0 24 24"
    }, stroke), /*#__PURE__*/React.createElement("path", {
      d: "M12 3a6 6 0 0 1 6 6c0 4-6 12-6 12S6 13 6 9a6 6 0 0 1 6-6Z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9.5 9h5"
    })),
    error: /*#__PURE__*/React.createElement("svg", _extends({
      width: "32",
      height: "32",
      viewBox: "0 0 24 24"
    }, stroke), /*#__PURE__*/React.createElement("path", {
      d: "M12 9v4M12 17h.01"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"
    }))
  };
  Object.assign(window.__PulseSrc, {
    EmptyState
  });
})();
(function () {
  /**
   * Single filter chip. Toggles between hairline (off) and ink-fill (on).
   * Optional leading icon and trailing count.
   */
  function FilterChip({
    children,
    active = false,
    icon,
    count,
    onClick,
    style,
    ...rest
  }) {
    return /*#__PURE__*/React.createElement("button", _extends({
      onClick: onClick,
      "aria-pressed": active,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        height: "40px",
        padding: "0 var(--space-4)",
        flex: "0 0 auto",
        backgroundColor: active ? "var(--accent)" : "var(--surface-card)",
        color: active ? "var(--accent-fg)" : "var(--text-body)",
        border: `1px solid ${active ? "var(--accent)" : "var(--border-strong)"}`,
        borderRadius: "var(--radius-pill)",
        fontFamily: "var(--font-condensed)",
        fontSize: "var(--fs-sm)",
        fontWeight: "var(--fw-medium)",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        whiteSpace: "nowrap",
        cursor: "pointer",
        transition: "background-color var(--dur-2) var(--ease-out), color var(--dur-2), border-color var(--dur-2)",
        ...style
      }
    }, rest), icon && /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex"
      }
    }, icon), children, count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-2xs)",
        opacity: 0.7,
        marginLeft: "2px"
      }
    }, count));
  }
  Object.assign(window.__PulseSrc, {
    FilterChip
  });
})();
(function () {
  const {
    FilterChip
  } = window.__PulseSrc;

  /**
   * Horizontally-scrollable filter chip bar. Sticky at the top of the feed.
   * Pass `filters` as a list; `active` is the set of selected keys.
   */
  function FilterBar({
    filters = [],
    active = [],
    onToggle,
    sticky = true,
    style,
    ...rest
  }) {
    return /*#__PURE__*/React.createElement("div", _extends({
      style: {
        position: sticky ? "sticky" : "static",
        top: 0,
        zIndex: 5,
        display: "flex",
        gap: "var(--space-2)",
        padding: "var(--space-3) var(--gutter-mobile)",
        overflowX: "auto",
        scrollbarWidth: "none",
        background: "color-mix(in srgb, var(--surface-page) 86%, transparent)",
        backdropFilter: "saturate(1.2) blur(var(--blur-md))",
        WebkitBackdropFilter: "saturate(1.2) blur(var(--blur-md))",
        borderBottom: "1px solid var(--border)",
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement("style", null, `.pulse-filterbar::-webkit-scrollbar{display:none}`), filters.map(f => {
      const key = typeof f === "string" ? f : f.key;
      const label = typeof f === "string" ? f : f.label;
      const icon = typeof f === "string" ? null : f.icon;
      const count = typeof f === "string" ? null : f.count;
      return /*#__PURE__*/React.createElement(FilterChip, {
        key: key,
        active: active.includes(key),
        icon: icon,
        count: count,
        onClick: () => onToggle && onToggle(key)
      }, label);
    }));
  }
  Object.assign(window.__PulseSrc, {
    FilterBar
  });
})();
(function () {
  /**
   * Search field — pill input with leading search glyph and a clear button.
   * Used for event search and the city picker. Controlled via value/onChange.
   */
  function SearchBar({
    value = "",
    onChange,
    onSubmit,
    onClear,
    placeholder = "Search",
    autoFocus = false,
    size = "md",
    style,
    ...rest
  }) {
    const h = size === "lg" ? "54px" : size === "sm" ? "40px" : "46px";
    return /*#__PURE__*/React.createElement("form", _extends({
      onSubmit: e => {
        e.preventDefault();
        onSubmit && onSubmit(value);
      },
      style: {
        display: "flex",
        alignItems: "center",
        gap: "var(--space-2)",
        height: h,
        padding: "0 var(--space-3) 0 var(--space-4)",
        background: "var(--surface-card)",
        border: "1px solid var(--border-strong)",
        borderRadius: "var(--radius-pill)",
        transition: "border-color var(--dur-2) var(--ease-out)",
        ...style
      },
      onFocus: e => {
        e.currentTarget.style.borderColor = "var(--accent)";
      },
      onBlur: e => {
        e.currentTarget.style.borderColor = "var(--border-strong)";
      }
    }, rest), /*#__PURE__*/React.createElement("svg", {
      width: size === "lg" ? 22 : 19,
      height: size === "lg" ? 22 : 19,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: {
        color: "var(--text-muted)",
        flex: "0 0 auto"
      }
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "11",
      cy: "11",
      r: "7"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m21 21-4.3-4.3"
    })), /*#__PURE__*/React.createElement("input", {
      type: "search",
      value: value,
      autoFocus: autoFocus,
      placeholder: placeholder,
      "aria-label": placeholder || "Search",
      onChange: e => onChange && onChange(e.target.value),
      style: {
        flex: 1,
        minWidth: 0,
        border: "none",
        outline: "none",
        background: "transparent",
        fontFamily: "var(--font-sans)",
        fontSize: size === "lg" ? "var(--fs-subtitle)" : "var(--fs-body)",
        color: "var(--text-strong)"
      }
    }), value && /*#__PURE__*/React.createElement("button", {
      type: "button",
      "aria-label": "Clear search",
      onClick: () => {
        onChange && onChange("");
        onClear && onClear();
      },
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "28px",
        height: "28px",
        flex: "0 0 auto",
        border: "none",
        borderRadius: "var(--radius-pill)",
        cursor: "pointer",
        background: "var(--accent-soft)",
        color: "var(--text-muted)"
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "15",
      height: "15",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M18 6 6 18M6 6l12 12"
    }))));
  }
  Object.assign(window.__PulseSrc, {
    SearchBar
  });
})();
(function () {
  /**
   * Mobile bottom navigation. Five slots max. Active slot shows the ink mark +
   * label; others are muted. Honors safe-area inset.
   */
  function BottomNav({
    items = [],
    active,
    onSelect,
    style,
    ...rest
  }) {
    return /*#__PURE__*/React.createElement("nav", _extends({
      style: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "stretch",
        height: "var(--bottomnav-h)",
        paddingBottom: "env(safe-area-inset-bottom, 0)",
        background: "color-mix(in srgb, var(--surface-card) 92%, transparent)",
        backdropFilter: "blur(var(--blur-md))",
        WebkitBackdropFilter: "blur(var(--blur-md))",
        borderTop: "1px solid var(--border)",
        ...style
      }
    }, rest), items.map(it => {
      const on = it.key === active;
      return /*#__PURE__*/React.createElement("button", {
        key: it.key,
        onClick: () => onSelect && onSelect(it.key),
        style: {
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "3px",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          color: on ? "var(--text-strong)" : "var(--text-faint)",
          position: "relative",
          transition: "color var(--dur-2) var(--ease-out)"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          display: "flex",
          position: "relative"
        }
      }, it.icon, it.badge && /*#__PURE__*/React.createElement("span", {
        style: {
          position: "absolute",
          top: "-3px",
          right: "-6px",
          width: "7px",
          height: "7px",
          borderRadius: "var(--radius-pill)",
          background: "var(--accent)",
          border: "1.5px solid var(--surface-card)"
        }
      })), /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          fontWeight: on ? "var(--fw-semibold)" : "var(--fw-regular)"
        }
      }, it.label));
    }));
  }
  Object.assign(window.__PulseSrc, {
    BottomNav
  });
})();
(function () {
  /**
   * Desktop left-rail navigation. Vertical list of destinations with the active
   * item marked by an ink bar + fill. Pairs with the 3-zone shell.
   */
  function SidebarNav({
    items = [],
    active,
    onSelect,
    footer,
    style,
    ...rest
  }) {
    return /*#__PURE__*/React.createElement("nav", _extends({
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "2px",
        ...style
      }
    }, rest), items.map(it => {
      const on = it.key === active;
      return /*#__PURE__*/React.createElement("button", {
        key: it.key,
        onClick: () => onSelect && onSelect(it.key),
        style: {
          display: "flex",
          alignItems: "center",
          gap: "var(--space-3)",
          height: "42px",
          padding: "0 var(--space-3)",
          width: "100%",
          border: "none",
          borderRadius: "var(--radius-md)",
          cursor: "pointer",
          background: on ? "var(--accent-soft)" : "transparent",
          color: on ? "var(--text-strong)" : "var(--text-muted)",
          fontFamily: "var(--font-sans)",
          fontSize: "var(--fs-body)",
          fontWeight: on ? "var(--fw-semibold)" : "var(--fw-medium)",
          position: "relative",
          textAlign: "left",
          transition: "background var(--dur-2) var(--ease-out), color var(--dur-2)"
        },
        onMouseEnter: e => {
          if (!on) e.currentTarget.style.background = "var(--surface-raised)";
        },
        onMouseLeave: e => {
          if (!on) e.currentTarget.style.background = "transparent";
        }
      }, on && /*#__PURE__*/React.createElement("span", {
        style: {
          position: "absolute",
          left: 0,
          top: "9px",
          bottom: "9px",
          width: "3px",
          borderRadius: "var(--radius-pill)",
          background: "var(--accent)"
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          display: "flex",
          flex: "0 0 auto"
        }
      }, it.icon), /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1
        }
      }, it.label), it.badge && /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-2xs)",
          background: "var(--accent)",
          color: "var(--accent-fg)",
          padding: "1px 6px",
          borderRadius: "var(--radius-pill)"
        }
      }, it.badge));
    }), footer && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "auto"
      }
    }, footer));
  }
  Object.assign(window.__PulseSrc, {
    SidebarNav
  });
})();
(function () {
  /**
   * Relevance chip — the "why this surfaced" signal that makes a high-volume
   * feed feel curated. A small radar glyph + the matched reasons.
   */
  function RelevanceChip({
    reasons = [],
    score,
    compact = false,
    style,
    ...rest
  }) {
    const text = Array.isArray(reasons) ? reasons.join(" · ") : reasons;
    return /*#__PURE__*/React.createElement("span", _extends({
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "7px",
        padding: compact ? "3px 9px 3px 7px" : "5px 11px 5px 9px",
        background: "var(--spot-soft)",
        border: "1px solid color-mix(in srgb, var(--spot) 30%, transparent)",
        borderRadius: "var(--radius-pill)",
        color: "var(--text-strong)",
        maxWidth: "100%",
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement("svg", {
      width: "13",
      height: "13",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "var(--spot)",
      strokeWidth: "1.9",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: {
        flex: "0 0 auto"
      }
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "2.2",
      fill: "var(--spot)",
      stroke: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7"
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-condensed)",
        fontSize: "var(--fs-sm)",
        letterSpacing: "0.03em",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        fontWeight: "var(--fw-semibold)",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "var(--spot)"
      }
    }, "Matches"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-muted)"
      }
    }, " ", text)), score != null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-2xs)",
        fontWeight: "var(--fw-semibold)",
        color: "var(--text-muted)",
        paddingLeft: "5px",
        marginLeft: "1px",
        borderLeft: "1px solid var(--border)"
      }
    }, score, "%"));
  }
  Object.assign(window.__PulseSrc, {
    RelevanceChip
  });
})();
(function () {
  /**
   * Source attribution + dedup. Shows the primary source the event was found on,
   * plus an "also on …" chip when the same event was deduped across platforms —
   * the transparency signal the aggregation depends on.
   */
  function SourceBadge({
    sources = [],
    style,
    ...rest
  }) {
    const list = Array.isArray(sources) ? sources : [sources];
    const [primary, ...rest2] = list;
    if (!primary) return null;
    return /*#__PURE__*/React.createElement("span", _extends({
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        flexWrap: "wrap",
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-xs)",
        letterSpacing: "0.02em",
        color: "var(--text-muted)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: "5px",
        height: "5px",
        borderRadius: "var(--radius-pill)",
        background: "var(--text-muted)"
      }
    }), "via ", primary), rest2.length > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-2xs)",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
        padding: "2px 7px",
        borderRadius: "var(--radius-sm)",
        border: "1px dashed var(--border-strong)"
      }
    }, "also on ", rest2.join(", ")));
  }
  Object.assign(window.__PulseSrc, {
    SourceBadge
  });
})();
(function () {
  /**
   * Price marker. "Free" renders as a solid ink tag; a number renders as a
   * glassy capsule for overlay on imagery. Pass `overlay` when on a photo.
   */
  function PriceTag({
    price,
    free = false,
    overlay = false,
    style,
    ...rest
  }) {
    const label = free ? "Free" : typeof price === "number" ? `$${price}` : price;
    if (free) {
      return /*#__PURE__*/React.createElement("span", _extends({
        style: {
          fontFamily: "var(--font-mono)",
          fontWeight: "var(--fw-semibold)",
          fontSize: "var(--fs-xs)",
          letterSpacing: "var(--ls-label)",
          textTransform: "uppercase",
          padding: "4px 9px",
          borderRadius: "var(--radius-sm)",
          background: overlay ? "var(--white)" : "var(--accent)",
          color: overlay ? "var(--black)" : "var(--accent-fg)",
          ...style
        }
      }, rest), label);
    }
    return /*#__PURE__*/React.createElement("span", _extends({
      style: {
        fontFamily: "var(--font-mono)",
        fontWeight: "var(--fw-semibold)",
        fontSize: "var(--fs-xs)",
        letterSpacing: "0.02em",
        padding: "4px 9px",
        borderRadius: "var(--radius-sm)",
        background: overlay ? "color-mix(in srgb, var(--black) 55%, transparent)" : "var(--accent-soft)",
        color: overlay ? "var(--white)" : "var(--text-strong)",
        backdropFilter: overlay ? "blur(var(--blur-sm))" : "none",
        WebkitBackdropFilter: overlay ? "blur(var(--blur-sm))" : "none",
        border: overlay ? "1px solid color-mix(in srgb, var(--white) 22%, transparent)" : "1px solid var(--border)",
        ...style
      }
    }, rest), label);
  }
  Object.assign(window.__PulseSrc, {
    PriceTag
  });
})();
(function () {
  const {
    IconButton
  } = window.__PulseSrc;

  /**
   * Save / dismiss control pair for cards. Dismiss is deliberately lightweight —
   * it teaches the ranker, not deletes. `onDismiss` should feel reversible.
   */
  function SaveDismiss({
    saved = false,
    onSave,
    onDismiss,
    overlay = false,
    size = "md",
    style,
    ...rest
  }) {
    const bookmark = /*#__PURE__*/React.createElement("svg", {
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: saved ? "currentColor" : "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"
    }));
    const x = /*#__PURE__*/React.createElement("svg", {
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M18 6 6 18M6 6l12 12"
    }));
    const overlayStyle = overlay ? {
      background: "color-mix(in srgb, var(--black) 42%, transparent)",
      color: "var(--white)",
      backdropFilter: "blur(var(--blur-sm))",
      WebkitBackdropFilter: "blur(var(--blur-sm))",
      border: "1px solid color-mix(in srgb, var(--white) 22%, transparent)"
    } : undefined;
    return /*#__PURE__*/React.createElement("div", _extends({
      style: {
        display: "inline-flex",
        gap: "var(--space-2)",
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement(IconButton, {
      label: "Dismiss",
      size: size,
      round: true,
      variant: overlay ? "ghost" : "outline",
      onClick: onDismiss,
      style: overlayStyle
    }, x), /*#__PURE__*/React.createElement(IconButton, {
      label: saved ? "Saved" : "Save",
      size: size,
      round: true,
      variant: overlay ? "ghost" : "outline",
      active: saved && !overlay,
      onClick: onSave,
      style: overlay ? overlayStyle : saved ? {
        background: "var(--accent)",
        color: "var(--accent-fg)",
        borderColor: "var(--accent)"
      } : undefined
    }, bookmark));
  }
  Object.assign(window.__PulseSrc, {
    SaveDismiss
  });
})();
(function () {
  /**
   * Map marker for the desktop map panel. Shows a price (or "Free") in a pill,
   * or a bare dot for low-emphasis points. `selected` and `gem` change emphasis.
   */
  function MapPin({
    label,
    free = false,
    selected = false,
    gem = false,
    dot = false,
    onClick,
    style,
    ...rest
  }) {
    if (dot) {
      return /*#__PURE__*/React.createElement("button", _extends({
        onClick: onClick,
        "aria-label": label,
        style: {
          width: "12px",
          height: "12px",
          padding: 0,
          borderRadius: "var(--radius-pill)",
          border: "2px solid var(--surface-page)",
          cursor: "pointer",
          background: selected ? "var(--accent)" : "var(--text-muted)",
          boxShadow: "var(--shadow-1)",
          ...style
        }
      }, rest));
    }
    const text = free ? "Free" : label;
    return /*#__PURE__*/React.createElement("button", _extends({
      onClick: onClick,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "4px 10px",
        cursor: "pointer",
        fontFamily: "var(--font-mono)",
        fontWeight: "var(--fw-semibold)",
        fontSize: "var(--fs-xs)",
        borderRadius: "var(--radius-pill)",
        background: selected ? "var(--accent)" : "var(--surface-card)",
        color: selected ? "var(--accent-fg)" : "var(--text-strong)",
        border: `1px solid ${selected ? "var(--accent)" : "var(--border-strong)"}`,
        boxShadow: selected ? "var(--shadow-3)" : "var(--shadow-1)",
        transform: selected ? "scale(1.06)" : "scale(1)",
        transition: "all var(--dur-2) var(--ease-out)",
        position: "relative",
        ...style
      }
    }, rest), gem && /*#__PURE__*/React.createElement("svg", {
      width: "11",
      height: "11",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 3l2.5 5.2 5.5.6-4 3.8 1 5.4L12 17l-5 2.8 1-5.4-4-3.8 5.5-.6z"
    })), text);
  }
  Object.assign(window.__PulseSrc, {
    MapPin
  });
})();
(function () {
  const {
    Tag,
    RelevanceChip,
    SourceBadge,
    PriceTag,
    SaveDismiss
  } = window.__PulseSrc;

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
      category,
      title,
      date,
      venue,
      distance,
      price,
      free,
      relevance = [],
      sources = [],
      freshness,
      gem,
      score,
      imageStyle
    } = event;
    const meta = [date, venue, distance].filter(Boolean).join("  ·  ");
    if (variant === "compact") {
      return /*#__PURE__*/React.createElement("div", _extends({
        onClick: onOpen,
        style: {
          display: "flex",
          gap: "var(--space-3)",
          alignItems: "stretch",
          padding: "var(--space-3)",
          background: "var(--surface-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          cursor: onOpen ? "pointer" : "default",
          ...style
        }
      }, rest), /*#__PURE__*/React.createElement("div", {
        className: "img-duotone",
        style: {
          width: "84px",
          flex: "0 0 auto",
          borderRadius: "var(--radius-md)",
          ...imageStyle
        }
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: "4px"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: "8px",
          alignItems: "center"
        }
      }, category && /*#__PURE__*/React.createElement(Tag, {
        size: "sm"
      }, category), (free || price != null) && /*#__PURE__*/React.createElement(PriceTag, {
        price: price,
        free: free
      })), /*#__PURE__*/React.createElement("h3", {
        style: {
          fontFamily: "var(--font-display)",
          fontSize: "var(--fs-title)",
          color: "var(--text-strong)",
          lineHeight: "var(--lh-snug)",
          margin: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }
      }, title), /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-xs)",
          color: "var(--text-muted)",
          letterSpacing: "0.02em"
        }
      }, meta), relevance.length > 0 && /*#__PURE__*/React.createElement(RelevanceChip, {
        reasons: relevance,
        compact: true,
        style: {
          marginTop: "2px"
        }
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement(SaveDismiss, {
        saved: saved,
        onSave: e => {
          e?.stopPropagation?.();
          onSave?.();
        },
        onDismiss: e => {
          e?.stopPropagation?.();
          onDismiss?.();
        },
        size: "sm"
      })));
    }
    const inverse = !!gem;
    const chipDark = inverse ? {
      background: "color-mix(in srgb, var(--text-inverse) 12%, transparent)",
      borderColor: "color-mix(in srgb, var(--text-inverse) 20%, transparent)",
      color: "var(--text-inverse)"
    } : undefined;
    return /*#__PURE__*/React.createElement("article", _extends({
      style: {
        background: inverse ? "var(--surface-inverse)" : "var(--surface-card)",
        color: inverse ? "var(--text-inverse)" : "var(--text-body)",
        border: `1px solid ${inverse ? "var(--surface-inverse)" : "var(--border)"}`,
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        boxShadow: "var(--shadow-2)",
        transition: "transform var(--dur-3) var(--ease-out), box-shadow var(--dur-3) var(--ease-out)",
        ...style
      },
      onMouseEnter: e => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "var(--shadow-3)";
      },
      onMouseLeave: e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "var(--shadow-2)";
      }
    }, rest), /*#__PURE__*/React.createElement("div", {
      className: "img-duotone",
      onClick: onOpen,
      style: {
        position: "relative",
        height: "196px",
        cursor: onOpen ? "pointer" : "default",
        ...imageStyle
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "var(--space-3)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: "6px",
        alignItems: "center"
      }
    }, gem && /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        fontFamily: "var(--font-mono)",
        fontWeight: "var(--fw-semibold)",
        fontSize: "var(--fs-2xs)",
        letterSpacing: "var(--ls-label)",
        textTransform: "uppercase",
        padding: "4px 9px",
        borderRadius: "var(--radius-sm)",
        background: "var(--white)",
        color: "var(--black)"
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "11",
      height: "11",
      viewBox: "0 0 24 24",
      fill: "currentColor"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 3l2.5 5.2 5.5.6-4 3.8 1 5.4L12 17l-5 2.8 1-5.4-4-3.8 5.5-.6z"
    })), "Hidden gem"), freshness && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-2xs)",
        letterSpacing: "0.03em",
        padding: "4px 8px",
        borderRadius: "var(--radius-sm)",
        background: "color-mix(in srgb, var(--black) 45%, transparent)",
        color: "var(--white)",
        backdropFilter: "blur(var(--blur-sm))",
        WebkitBackdropFilter: "blur(var(--blur-sm))",
        whiteSpace: "nowrap"
      }
    }, freshness)), /*#__PURE__*/React.createElement(SaveDismiss, {
      saved: saved,
      overlay: true,
      onSave: e => {
        e?.stopPropagation?.();
        onSave?.();
      },
      onDismiss: e => {
        e?.stopPropagation?.();
        onDismiss?.();
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end"
      }
    }, category && /*#__PURE__*/React.createElement(Tag, {
      size: "sm",
      style: {
        background: "color-mix(in srgb, var(--black) 45%, transparent)",
        color: "var(--white)",
        border: "1px solid color-mix(in srgb, var(--white) 22%, transparent)",
        backdropFilter: "blur(var(--blur-sm))"
      }
    }, category), (free || price != null) && /*#__PURE__*/React.createElement(PriceTag, {
      price: price,
      free: free,
      overlay: true
    })))), /*#__PURE__*/React.createElement("div", {
      onClick: onOpen,
      style: {
        padding: "var(--space-4) var(--space-5) var(--space-5)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)",
        cursor: onOpen ? "pointer" : "default"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: "var(--fs-display-sm)",
        color: inverse ? "var(--text-inverse)" : "var(--text-strong)",
        lineHeight: "var(--lh-snug)",
        margin: "0 0 6px",
        letterSpacing: "var(--ls-tight)",
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden"
      }
    }, title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-xs)",
        letterSpacing: "0.03em",
        color: inverse ? "color-mix(in srgb, var(--text-inverse) 72%, transparent)" : "var(--text-muted)"
      }
    }, meta)), relevance.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex"
      }
    }, /*#__PURE__*/React.createElement(RelevanceChip, {
      reasons: relevance,
      score: score,
      style: chipDark
    })), sources.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "var(--space-1)",
        borderTop: `1px solid ${inverse ? "color-mix(in srgb, var(--text-inverse) 14%, transparent)" : "var(--border)"}`
      }
    }, /*#__PURE__*/React.createElement(SourceBadge, {
      sources: sources,
      style: inverse ? {
        color: "var(--text-inverse)"
      } : undefined
    }))));
  }
  Object.assign(window.__PulseSrc, {
    EventCard
  });
})();
(function () {
  const {
    RelevanceChip,
    PriceTag
  } = window.__PulseSrc;

  /**
   * Compact digest row — a date-grouped event line for the daily/weekly digest
   * and push previews. Number index + title + meta + price.
   */
  function DigestItem({
    index,
    event = {},
    onOpen,
    style,
    ...rest
  }) {
    const {
      title,
      date,
      venue,
      distance,
      price,
      free,
      relevance = [],
      category
    } = event;
    const meta = [date, venue, distance].filter(Boolean).join("  ·  ");
    return /*#__PURE__*/React.createElement("div", _extends({
      onClick: onOpen,
      style: {
        display: "flex",
        gap: "var(--space-4)",
        alignItems: "flex-start",
        padding: "var(--space-4) 0",
        borderBottom: "1px solid var(--border)",
        cursor: onOpen ? "pointer" : "default",
        ...style
      }
    }, rest), index != null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: "var(--fs-display-sm)",
        fontWeight: "var(--fw-medium)",
        color: "var(--text-faint)",
        lineHeight: 1,
        flex: "0 0 auto",
        minWidth: "1.4em",
        fontVariantNumeric: "tabular-nums"
      }
    }, String(index).padStart(2, "0")), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("h4", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: "var(--fs-title)",
        color: "var(--text-strong)",
        margin: "0 0 4px",
        lineHeight: "var(--lh-snug)"
      }
    }, title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-xs)",
        color: "var(--text-muted)",
        letterSpacing: "0.02em",
        marginBottom: "8px"
      }
    }, category ? `${category}  ·  ${meta}` : meta), relevance.length > 0 && /*#__PURE__*/React.createElement(RelevanceChip, {
      reasons: relevance,
      compact: true
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: "0 0 auto"
      }
    }, (free || price != null) && /*#__PURE__*/React.createElement(PriceTag, {
      price: price,
      free: free
    })));
  }
  Object.assign(window.__PulseSrc, {
    DigestItem
  });
})();
(function () {
  /**
   * Location switcher — the "travel anywhere" control. Shows the active city and
   * opens the city picker. When `loading`, it surfaces the progressive cold-start
   * status ("still finding local gems…") instead of a blank wait.
   */
  function LocationSwitcher({
    city,
    loading = false,
    statusText,
    onClick,
    size = "md",
    style,
    ...rest
  }) {
    const big = size === "lg";
    return /*#__PURE__*/React.createElement("button", _extends({
      onClick: onClick,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        padding: big ? "8px 14px" : "6px 12px",
        background: "transparent",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-pill)",
        cursor: "pointer",
        transition: "background var(--dur-2) var(--ease-out), border-color var(--dur-2)",
        ...style
      },
      onMouseEnter: e => {
        e.currentTarget.style.background = "var(--surface-raised)";
      },
      onMouseLeave: e => {
        e.currentTarget.style.background = "transparent";
      }
    }, rest), /*#__PURE__*/React.createElement("svg", {
      width: big ? 18 : 16,
      height: big ? 18 : 16,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: {
        color: "var(--text-strong)",
        flex: "0 0 auto"
      }
    }, /*#__PURE__*/React.createElement("path", {
      d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "10",
      r: "2.6"
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        lineHeight: 1.1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: "var(--fw-semibold)",
        fontSize: big ? "var(--fs-title)" : "var(--fs-body)",
        color: "var(--text-strong)",
        letterSpacing: "var(--ls-tight)",
        whiteSpace: "nowrap"
      }
    }, city), loading && /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        marginTop: "3px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "pulse-ls-dot",
      style: {
        width: "5px",
        height: "5px",
        borderRadius: "var(--radius-pill)",
        background: "var(--text-muted)"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-2xs)",
        letterSpacing: "0.03em",
        color: "var(--text-muted)"
      }
    }, statusText || "still finding local gems…"), /*#__PURE__*/React.createElement("style", null, `@keyframes pulse-ls-blink{0%,100%{opacity:.25}50%{opacity:1}} .pulse-ls-dot{animation:pulse-ls-blink 1.1s var(--ease-inout) infinite}
              @media (prefers-reduced-motion: reduce){.pulse-ls-dot{animation:none}}`))), /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      style: {
        color: "var(--text-muted)",
        marginLeft: "2px",
        flex: "0 0 auto"
      }
    }, /*#__PURE__*/React.createElement("path", {
      d: "m6 9 6 6 6-6"
    })));
  }
  Object.assign(window.__PulseSrc, {
    LocationSwitcher
  });
})();
window.PulseDesignSystem_3c2543 = window.__PulseSrc;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pulse/pulse-bundle.js", error: String((e && e.message) || e) }); }

// ui_kits/pulse/screens-detail.jsx
try { (() => {
// Event detail → window.PulseDetail
(function () {
  const NS = window.PulseDesignSystem_3c2543;
  const {
    Tag,
    Button,
    IconButton,
    RelevanceChip,
    PriceTag,
    EventCard
  } = NS;
  const {
    ChevronLeft,
    Calendar,
    Share,
    ExternalLink,
    Bookmark,
    Pin
  } = window.PulseIcons;
  const {
    Eyebrow
  } = window.PulseShell;
  function OutboundRow({
    source,
    primary
  }) {
    return React.createElement(Button, {
      variant: primary ? "primary" : "secondary",
      block: true,
      iconRight: React.createElement(ExternalLink, {
        size: 17
      }),
      style: {
        justifyContent: "space-between"
      }
    }, primary ? `Get tickets · ${source}` : `Also on ${source}`);
  }
  function EventDetailView({
    event,
    saved,
    onSave,
    onBack,
    more = [],
    onOpen,
    mode = "mobile"
  }) {
    if (!event) return null;
    const meta = [event.date, event.venue, event.distance].filter(Boolean).join("  ·  ");
    const sources = event.sources || [];
    return React.createElement("div", {
      style: {
        paddingBottom: "var(--space-9)"
      }
    },
    // Hero
    React.createElement("div", {
      className: "img-duotone",
      style: {
        position: "relative",
        height: mode === "desktop" ? "320px" : "260px",
        backgroundPosition: event.img || "center"
      }
    }, React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        padding: "var(--space-4)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }
    }, React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between"
      }
    }, React.createElement(IconButton, {
      label: "Back",
      round: true,
      onClick: onBack,
      style: {
        background: "color-mix(in srgb, var(--black) 42%, transparent)",
        color: "var(--white)",
        backdropFilter: "blur(6px)",
        border: "1px solid color-mix(in srgb, var(--white) 22%, transparent)"
      }
    }, React.createElement(ChevronLeft, {
      size: 20
    })), React.createElement(IconButton, {
      label: "Share",
      round: true,
      style: {
        background: "color-mix(in srgb, var(--black) 42%, transparent)",
        color: "var(--white)",
        backdropFilter: "blur(6px)",
        border: "1px solid color-mix(in srgb, var(--white) 22%, transparent)"
      }
    }, React.createElement(Share, {
      size: 18
    }))), React.createElement("div", {
      style: {
        display: "flex",
        gap: "8px",
        alignItems: "flex-end"
      }
    }, React.createElement(Tag, {
      size: "sm",
      style: {
        background: "color-mix(in srgb, var(--black) 45%, transparent)",
        color: "var(--white)",
        border: "1px solid color-mix(in srgb, var(--white) 22%, transparent)",
        backdropFilter: "blur(6px)"
      }
    }, event.category), (event.free || event.price != null) && React.createElement(PriceTag, {
      price: event.price,
      free: event.free,
      overlay: true
    })))),
    // Body
    React.createElement("div", {
      style: {
        padding: "var(--space-6) var(--space-6) 0"
      }
    }, React.createElement("h1", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: "var(--fs-display-md)",
        color: "var(--text-strong)",
        lineHeight: "var(--lh-tight)",
        letterSpacing: "var(--ls-display)",
        margin: "0 0 var(--space-3)"
      }
    }, event.title), React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-sm)",
        color: "var(--text-muted)",
        letterSpacing: "0.02em",
        marginBottom: "var(--space-4)"
      }
    }, meta), event.relevance && React.createElement("div", {
      style: {
        display: "flex",
        marginBottom: "var(--space-5)"
      }
    }, React.createElement(RelevanceChip, {
      reasons: event.relevance,
      score: event.score
    })), React.createElement("p", {
      style: {
        fontSize: "var(--fs-subtitle)",
        lineHeight: "var(--lh-relaxed)",
        color: "var(--text-body)",
        margin: "0 0 var(--space-6)",
        maxWidth: "40rem"
      }
    }, event.blurb),
    // Outbound
    React.createElement(Eyebrow, {
      style: {
        marginBottom: "var(--space-3)"
      }
    }, sources.length > 1 ? `Found on ${sources.length} platforms` : "Get in"), React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-2)",
        marginBottom: "var(--space-3)"
      }
    }, sources.map((s, i) => React.createElement(OutboundRow, {
      key: s,
      source: s,
      primary: i === 0
    }))), React.createElement("div", {
      style: {
        display: "flex",
        gap: "var(--space-2)",
        marginBottom: "var(--space-7)"
      }
    }, React.createElement(Button, {
      variant: "secondary",
      block: true,
      onClick: () => onSave(event.id),
      iconLeft: React.createElement(Bookmark, {
        size: 17
      })
    }, saved ? "Saved" : "Save"), React.createElement(Button, {
      variant: "secondary",
      block: true,
      iconLeft: React.createElement(Calendar, {
        size: 17
      })
    }, "Add to calendar")),
    // Map snippet
    React.createElement(Eyebrow, {
      style: {
        marginBottom: "var(--space-3)"
      }
    }, "Where"), React.createElement("div", {
      className: "map-overlay",
      style: {
        height: "150px",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border)",
        background: "var(--surface-sunken)",
        position: "relative",
        marginBottom: "var(--space-7)"
      }
    }, React.createElement("div", {
      style: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-60%)",
        color: "var(--text-strong)"
      }
    }, React.createElement(Pin, {
      size: 28
    })), React.createElement("div", {
      style: {
        position: "absolute",
        bottom: "10px",
        left: "12px",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-xs)",
        color: "var(--text-muted)"
      }
    }, `${event.venue} · ${event.distance}`)),
    // More like this
    more.length > 0 && React.createElement("div", null, React.createElement(Eyebrow, {
      style: {
        marginBottom: "var(--space-3)"
      }
    }, "More like this"), React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)"
      }
    }, more.map(e => React.createElement(EventCard, {
      key: e.id,
      event: e,
      variant: "compact",
      onOpen: () => onOpen(e)
    }))))));
  }
  window.PulseDetail = {
    EventDetailView
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pulse/screens-detail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/pulse/screens-feed.jsx
try { (() => {
// Feed + Hidden-gems rail → window.PulseFeed
(function () {
  const NS = window.PulseDesignSystem_3c2543;
  const {
    EventCard
  } = NS;
  const {
    Star,
    Sparkles
  } = window.PulseIcons;
  const {
    Eyebrow
  } = window.PulseShell;
  function GemsRail({
    gems,
    saved,
    onSave,
    onDismiss,
    onOpen
  }) {
    if (!gems.length) return null;
    return React.createElement("section", {
      style: {
        margin: "var(--space-3) 0",
        padding: "var(--space-5) 0",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)"
      }
    }, React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "0 0 var(--space-3)"
      }
    }, React.createElement(Star, {
      size: 15,
      style: {
        color: "var(--text-strong)"
      }
    }), React.createElement("h2", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: "var(--fs-title)",
        color: "var(--text-strong)",
        margin: 0
      }
    }, "Hidden gems"), React.createElement(Eyebrow, {
      style: {
        marginLeft: "auto"
      }
    }, "high match · low noise")), React.createElement("div", {
      style: {
        display: "flex",
        gap: "var(--space-3)",
        overflowX: "auto",
        scrollSnapType: "x mandatory",
        paddingBottom: "4px",
        scrollbarWidth: "none"
      }
    }, gems.map(e => React.createElement("div", {
      key: e.id,
      style: {
        flex: "0 0 84%",
        maxWidth: "300px",
        scrollSnapAlign: "start"
      }
    }, React.createElement(EventCard, {
      event: e,
      saved: saved.has(e.id),
      onSave: () => onSave(e.id),
      onDismiss: () => onDismiss(e.id),
      onOpen: () => onOpen(e)
    })))));
  }
  function FeedList({
    events,
    saved,
    onSave,
    onDismiss,
    onOpen,
    columns = 1
  }) {
    const gems = events.filter(e => e.gem);
    const main = events.filter(e => !e.gem);
    const head = main.slice(0, 2);
    const tail = main.slice(2);
    const grid = list => React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: columns > 1 ? `repeat(${columns}, 1fr)` : "1fr",
        gap: "var(--space-5)"
      }
    }, list.map(e => React.createElement(EventCard, {
      key: e.id,
      event: e,
      saved: saved.has(e.id),
      onSave: () => onSave(e.id),
      onDismiss: () => onDismiss(e.id),
      onOpen: () => onOpen(e)
    })));
    return React.createElement("div", null, grid(head), React.createElement(GemsRail, {
      gems,
      saved,
      onSave,
      onDismiss,
      onOpen
    }), grid(tail));
  }
  window.PulseFeed = {
    FeedList,
    GemsRail
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pulse/screens-feed.jsx", error: String((e && e.message) || e) }); }

// ui_kits/pulse/screens-more.jsx
try { (() => {
// Onboarding · Preferences · Digest · Saved · Location · States  → window.PulseScreens
(function () {
  const NS = window.PulseDesignSystem_3c2543;
  const {
    Logo,
    Button,
    Input,
    Switch,
    Checkbox,
    SegmentedControl,
    Select,
    Avatar,
    Tag,
    EventCard,
    DigestItem,
    EmptyState,
    EventCardSkeleton,
    LocationSwitcher,
    Toast
  } = NS;
  const I = window.PulseIcons;
  const {
    Eyebrow
  } = window.PulseShell;
  const D = window.PULSE_DATA;

  // ============================ ONBOARDING ============================
  function Onboarding({
    onDone
  }) {
    const [step, setStep] = React.useState(0);
    const [picked, setPicked] = React.useState(["Live music", "Art", "Food"]);
    const [free, setFree] = React.useState(false);
    const [weekends, setWeekends] = React.useState(true);
    const [dist, setDist] = React.useState("3 miles");
    const [building, setBuilding] = React.useState(false);
    const toggle = t => setPicked(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t]);
    const steps = ["Interests", "Home base", "Dealbreakers"];
    React.useEffect(() => {
      if (!building) return;
      const t = setTimeout(onDone, 2600);
      return () => clearTimeout(t);
    }, [building]);
    if (building) {
      return /*#__PURE__*/React.createElement("div", {
        style: {
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "var(--space-7)",
          gap: "var(--space-5)"
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "pulse-build",
        style: {
          color: "var(--text-strong)"
        }
      }, /*#__PURE__*/React.createElement(Logo, {
        size: 40,
        showWordmark: false
      })), /*#__PURE__*/React.createElement("h1", {
        style: {
          fontFamily: "var(--font-display)",
          fontSize: "var(--fs-display-md)",
          color: "var(--text-strong)",
          letterSpacing: "var(--ls-display)",
          margin: 0
        }
      }, "Building your feed\u2026"), /*#__PURE__*/React.createElement("p", {
        style: {
          color: "var(--text-muted)",
          fontSize: "var(--fs-subtitle)",
          maxWidth: "30ch",
          margin: 0
        }
      }, "Ranking everything in your city around ", /*#__PURE__*/React.createElement("b", {
        style: {
          color: "var(--text-body)"
        }
      }, picked.slice(0, 3).join(", ").toLowerCase()), "."), /*#__PURE__*/React.createElement("div", {
        style: {
          width: "100%",
          maxWidth: "320px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "var(--space-4)"
        }
      }, [0, 1].map(i => /*#__PURE__*/React.createElement(EventCardSkeleton, {
        key: i
      }))), /*#__PURE__*/React.createElement("style", null, `@keyframes pulse-beat{0%,100%{transform:scale(1);opacity:.85}50%{transform:scale(1.12);opacity:1}} .pulse-build{animation:pulse-beat 1.1s var(--ease-inout) infinite}`));
    }
    return /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "var(--space-6) var(--space-6) var(--space-4)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      size: 24
    }), /*#__PURE__*/React.createElement("button", {
      onClick: onDone,
      style: {
        border: "none",
        background: "transparent",
        cursor: "pointer",
        fontFamily: "var(--font-condensed)",
        fontWeight: "var(--fw-semibold)",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        fontSize: "var(--fs-xs)",
        color: "var(--text-muted)",
        padding: "8px"
      }
    }, "Skip")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: "6px",
        marginTop: "var(--space-5)"
      }
    }, steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
      key: s,
      style: {
        flex: 1,
        height: "3px",
        borderRadius: "2px",
        background: i <= step ? "var(--accent)" : "var(--border)"
      }
    }))), /*#__PURE__*/React.createElement(Eyebrow, {
      style: {
        marginTop: "var(--space-3)"
      }
    }, `Step ${step + 1} of 3 · ${steps[step]}`)), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflowY: "auto",
        padding: "var(--space-2) var(--space-6) var(--space-6)"
      }
    }, step === 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: "var(--fs-display-md)",
        color: "var(--text-strong)",
        letterSpacing: "var(--ls-display)",
        lineHeight: "var(--lh-tight)",
        margin: "var(--space-3) 0 var(--space-2)"
      }
    }, "What are you into?"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: "var(--text-muted)",
        margin: "0 0 var(--space-5)"
      }
    }, "Pick a few. We rank \u2014 we don't lock you in."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: "10px"
      }
    }, D.interests.map(t => /*#__PURE__*/React.createElement(Checkbox, {
      key: t,
      label: t,
      checked: picked.includes(t),
      onChange: () => toggle(t)
    })))), step === 1 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: "var(--fs-display-md)",
        color: "var(--text-strong)",
        letterSpacing: "var(--ls-display)",
        lineHeight: "var(--lh-tight)",
        margin: "var(--space-3) 0 var(--space-2)"
      }
    }, "Where's home base?"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: "var(--text-muted)",
        margin: "0 0 var(--space-5)"
      }
    }, "Set it once. Switch cities any time you travel."), /*#__PURE__*/React.createElement(Input, {
      label: "Home base",
      placeholder: "Search a city or address",
      iconLeft: /*#__PURE__*/React.createElement(I.Search, {
        size: 18
      }),
      defaultValue: "Lisbon, Portugal"
    }), /*#__PURE__*/React.createElement(Eyebrow, {
      style: {
        margin: "var(--space-5) 0 var(--space-3)"
      }
    }, "Recent"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: "8px"
      }
    }, D.cities.slice(0, 4).map(c => /*#__PURE__*/React.createElement(Tag, {
      key: c.id
    }, c.name)))), step === 2 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: "var(--fs-display-md)",
        color: "var(--text-strong)",
        letterSpacing: "var(--ls-display)",
        lineHeight: "var(--lh-tight)",
        margin: "var(--space-3) 0 var(--space-2)"
      }
    }, "Any dealbreakers?"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: "var(--text-muted)",
        margin: "0 0 var(--space-5)"
      }
    }, "Hard filters that ", /*#__PURE__*/React.createElement("i", null, "remove"), " events. You can change these later."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)"
      }
    }, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Switch, {
      checked: free,
      onChange: setFree,
      label: "Free events only"
    })), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Switch, {
      checked: weekends,
      onChange: setWeekends,
      label: "Nights & weekends"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Select, {
      label: "Max distance",
      value: dist,
      onChange: e => setDist(e.target.value),
      options: ["1 mile", "3 miles", "5 miles", "10 miles", "Any"]
    }))))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "var(--space-4) var(--space-6) var(--space-6)",
        borderTop: "1px solid var(--border)",
        display: "flex",
        gap: "var(--space-3)",
        background: "var(--surface-page)"
      }
    }, step > 0 && /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => setStep(step - 1)
    }, "Back"), /*#__PURE__*/React.createElement(Button, {
      block: true,
      loading: building,
      onClick: () => step < 2 ? setStep(step + 1) : setBuilding(true)
    }, step < 2 ? "Continue" : "Build my feed")));
  }
  const Row = ({
    children
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "var(--space-3) 0",
      borderBottom: "1px solid var(--border)"
    }
  }, children);

  // ============================ PREFERENCES ============================
  function Preferences() {
    const [picked, setPicked] = React.useState(["Live music", "Art", "Food", "Film"]);
    const [free, setFree] = React.useState(false);
    const [weekends, setWeekends] = React.useState(true);
    const [boosts, setBoosts] = React.useState({
      "Live music": "Boost",
      "Clubs": "Mute",
      "Comedy": "Normal",
      "Talks": "Boost"
    });
    const toggle = t => setPicked(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t]);
    const setB = (k, v) => setBoosts(b => ({
      ...b,
      [k]: v
    }));
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "var(--space-6)",
        maxWidth: "var(--content-max)",
        margin: "0 auto"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        marginBottom: "var(--space-6)"
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: "Ana Ruiz",
      size: 44
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: "var(--fs-display-sm)",
        color: "var(--text-strong)",
        margin: 0,
        letterSpacing: "var(--ls-tight)"
      }
    }, "For me"), /*#__PURE__*/React.createElement(Eyebrow, {
      style: {
        marginTop: "2px"
      }
    }, "Tuning what surfaces"))), /*#__PURE__*/React.createElement(Section, {
      title: "Interests",
      hint: "Re-ranks your feed."
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: "10px"
      }
    }, D.interests.map(t => /*#__PURE__*/React.createElement(Checkbox, {
      key: t,
      label: t,
      checked: picked.includes(t),
      onChange: () => toggle(t)
    })))), /*#__PURE__*/React.createElement(Section, {
      title: "Dealbreakers",
      hint: "Hard filters \u2014 these remove events."
    }, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Switch, {
      checked: free,
      onChange: setFree,
      label: "Free events only"
    })), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Switch, {
      checked: weekends,
      onChange: setWeekends,
      label: "Nights & weekends only"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        paddingTop: "var(--space-3)"
      }
    }, /*#__PURE__*/React.createElement(Select, {
      label: "Max distance",
      options: ["1 mile", "3 miles", "5 miles", "10 miles", "Any"],
      defaultValue: "3 miles"
    }))), /*#__PURE__*/React.createElement(Section, {
      title: "Boost & mute",
      hint: "Soft signals \u2014 these re-rank, they don't remove."
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)"
      }
    }, Object.keys(boosts).map(k => /*#__PURE__*/React.createElement("div", {
      key: k,
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--space-3)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "var(--fs-body)",
        color: "var(--text-body)"
      }
    }, k), /*#__PURE__*/React.createElement(SegmentedControl, {
      size: "sm",
      value: boosts[k],
      onChange: v => setB(k, v),
      options: ["Mute", "Normal", "Boost"]
    }))))));
  }
  const Section = ({
    title,
    hint,
    children
  }) => /*#__PURE__*/React.createElement("section", {
    style: {
      marginBottom: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--fs-title)",
      color: "var(--text-strong)",
      margin: "0 0 4px"
    }
  }, title), hint && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--fs-sm)",
      color: "var(--text-muted)",
      margin: "0 0 var(--space-4)"
    }
  }, hint), children);

  // ============================ DIGEST ============================
  function Digest({
    onOpen
  }) {
    const [freq, setFreq] = React.useState("Daily");
    const [push, setPush] = React.useState(true);
    const items = D.events.slice(0, 5);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "var(--space-6)",
        maxWidth: "var(--content-max)",
        margin: "0 auto"
      }
    }, /*#__PURE__*/React.createElement(Eyebrow, null, "Thursday \xB7 8:00am"), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: "var(--fs-display-md)",
        color: "var(--text-strong)",
        letterSpacing: "var(--ls-display)",
        lineHeight: "var(--lh-tight)",
        margin: "var(--space-2) 0 var(--space-5)"
      }
    }, "5 things you'll", /*#__PURE__*/React.createElement("br", null), "probably want"), /*#__PURE__*/React.createElement(SegmentedControl, {
      value: freq,
      onChange: setFreq,
      options: ["Daily", "Weekly"]
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "var(--space-5)"
      }
    }, items.map((e, i) => /*#__PURE__*/React.createElement(DigestItem, {
      key: e.id,
      index: i + 1,
      event: e,
      onOpen: () => onOpen(e)
    }))), /*#__PURE__*/React.createElement(Section, {
      title: "Notifications",
      hint: "Push is reserved for high-relevance new drops."
    }, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Switch, {
      checked: push,
      onChange: setPush,
      label: "New drops you'll probably want"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        paddingTop: "var(--space-3)"
      }
    }, /*#__PURE__*/React.createElement(Select, {
      label: "Frequency",
      value: freq,
      onChange: e => setFreq(e.target.value),
      options: ["Real-time", "Daily digest", "Weekly digest", "Off"]
    }))));
  }

  // ============================ SAVED ============================
  function Saved({
    saved,
    events,
    onOpen,
    onSave,
    empty
  }) {
    const list = events.filter(e => saved.has(e.id));
    if (empty || list.length === 0) {
      return /*#__PURE__*/React.createElement(EmptyState, {
        glyph: "saved",
        title: "Nothing saved yet",
        body: "Tap the bookmark on any event and it lands here \u2014 with a calendar export when you're ready.",
        action: /*#__PURE__*/React.createElement(Button, {
          variant: "secondary"
        }, "Browse the feed")
      });
    }
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "var(--space-6)",
        maxWidth: "var(--content-max)",
        margin: "0 auto"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "var(--space-5)"
      }
    }, /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: "var(--fs-display-sm)",
        color: "var(--text-strong)",
        margin: 0
      }
    }, "Saved"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      iconLeft: /*#__PURE__*/React.createElement(I.Download, {
        size: 16
      })
    }, "Export .ics")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)"
      }
    }, list.map(e => /*#__PURE__*/React.createElement(EventCard, {
      key: e.id,
      event: e,
      variant: "compact",
      saved: true,
      onSave: () => onSave(e.id),
      onOpen: () => onOpen(e)
    }))));
  }

  // ============================ LOCATION PICKER ============================
  function LocationPicker({
    cities,
    current,
    onPick,
    onClose
  }) {
    const [q, setQ] = React.useState("");
    const list = cities.filter(c => c.name.toLowerCase().includes(q.toLowerCase()));
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        zIndex: 60,
        background: "var(--scrim)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end"
      },
      onClick: onClose
    }, /*#__PURE__*/React.createElement("div", {
      onClick: e => e.stopPropagation(),
      style: {
        background: "var(--surface-page)",
        borderTopLeftRadius: "var(--radius-xl)",
        borderTopRightRadius: "var(--radius-xl)",
        padding: "var(--space-5) var(--space-5) var(--space-7)",
        maxHeight: "80%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "var(--shadow-4)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: "36px",
        height: "4px",
        borderRadius: "2px",
        background: "var(--border-strong)",
        margin: "0 auto var(--space-4)"
      }
    }), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: "var(--fs-title)",
        color: "var(--text-strong)",
        margin: "0 0 var(--space-3)"
      }
    }, "Switch city"), /*#__PURE__*/React.createElement(Input, {
      placeholder: "Search any city",
      iconLeft: /*#__PURE__*/React.createElement(I.Search, {
        size: 18
      }),
      value: q,
      onChange: e => setQ(e.target.value)
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        overflowY: "auto",
        marginTop: "var(--space-3)"
      }
    }, list.map(c => /*#__PURE__*/React.createElement("button", {
      key: c.id,
      onClick: () => onPick(c),
      style: {
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "var(--space-4) var(--space-2)",
        border: "none",
        borderBottom: "1px solid var(--border)",
        background: "transparent",
        cursor: "pointer",
        textAlign: "left"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: c.id === current ? "var(--text-strong)" : "var(--text-muted)"
      }
    }, /*#__PURE__*/React.createElement(I.Pin, {
      size: 18
    })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        fontFamily: "var(--font-display)",
        fontSize: "var(--fs-subtitle)",
        color: "var(--text-strong)"
      }
    }, c.name), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-2xs)",
        color: "var(--text-muted)",
        letterSpacing: "0.04em",
        textTransform: "uppercase"
      }
    }, c.country, " \xB7 ", c.count, " events"))), c.id === current && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-strong)"
      }
    }, /*#__PURE__*/React.createElement(I.Check, {
      size: 18
    })))))));
  }

  // ============================ STATES GALLERY ============================
  function StatesGallery() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "var(--space-6)",
        maxWidth: "var(--content-max)",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-6)"
      }
    }, /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: "var(--fs-display-sm)",
        color: "var(--text-strong)",
        margin: 0
      }
    }, "States"), /*#__PURE__*/React.createElement(StateFrame, {
      label: "Cold-start \xB7 loading"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "var(--space-4)"
      }
    }, /*#__PURE__*/React.createElement(LocationSwitcher, {
      city: "Reykjav\xEDk",
      loading: true,
      size: "lg"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginTop: "var(--space-4)"
      }
    }, /*#__PURE__*/React.createElement(EventCardSkeleton, null), /*#__PURE__*/React.createElement(EventCardSkeleton, null)))), /*#__PURE__*/React.createElement(StateFrame, {
      label: "Quiet city"
    }, /*#__PURE__*/React.createElement(EmptyState, {
      glyph: "quiet",
      title: "A quiet week in Reykjav\xEDk",
      body: "Only a few events match right now. We'll ping you the moment more drop.",
      action: /*#__PURE__*/React.createElement(Button, {
        variant: "secondary",
        size: "sm"
      }, "Widen my filters")
    })), /*#__PURE__*/React.createElement(StateFrame, {
      label: "Empty \xB7 saved"
    }, /*#__PURE__*/React.createElement(EmptyState, {
      glyph: "saved",
      title: "Nothing saved yet",
      body: "Tap the bookmark on any event and it lands here.",
      action: /*#__PURE__*/React.createElement(Button, {
        variant: "secondary",
        size: "sm"
      }, "Browse the feed")
    })), /*#__PURE__*/React.createElement(StateFrame, {
      label: "Error"
    }, /*#__PURE__*/React.createElement(EmptyState, {
      glyph: "error",
      title: "We lost the signal",
      body: "Couldn't reach a few sources. Your feed may be incomplete.",
      action: /*#__PURE__*/React.createElement(Button, {
        variant: "secondary",
        size: "sm",
        iconLeft: /*#__PURE__*/React.createElement(I.Refresh, {
          size: 16
        })
      }, "Try again")
    })), /*#__PURE__*/React.createElement(StateFrame, {
      label: "Toast"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "var(--space-6)",
        display: "flex",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement(Toast, {
      message: "Saved to your list",
      actionLabel: "Undo",
      icon: /*#__PURE__*/React.createElement(I.Check, {
        size: 16
      })
    }))));
  }
  const StateFrame = ({
    label,
    children
  }) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: "var(--space-2)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-lg)",
      background: "var(--surface-card)",
      overflow: "hidden"
    }
  }, children));
  window.PulseScreens = {
    Onboarding,
    Preferences,
    Digest,
    Saved,
    LocationPicker,
    StatesGallery
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pulse/screens-more.jsx", error: String((e && e.message) || e) }); }

// ui_kits/pulse/screens-user.jsx
try { (() => {
// Search · Account · Sign-in  → window.PulseUser
(function () {
  const NS = window.PulseDesignSystem_3c2543;
  const {
    SearchBar,
    FilterChip,
    Tag,
    Button,
    Input,
    Switch,
    SegmentedControl,
    Avatar,
    Badge,
    EventCard,
    EmptyState,
    DatePicker
  } = NS;
  const I = window.PulseIcons;
  const {
    Eyebrow
  } = window.PulseShell;
  const D = window.PULSE_DATA;
  const RECENT = ["Jazz tonight", "Free this weekend", "Risograph", "Talks"];
  const CATS = [{
    label: "Live music",
    icon: /*#__PURE__*/React.createElement(I.Music, {
      size: 18
    })
  }, {
    label: "Art",
    icon: /*#__PURE__*/React.createElement(I.Palette, {
      size: 18
    })
  }, {
    label: "Film",
    icon: /*#__PURE__*/React.createElement(I.Film, {
      size: 18
    })
  }, {
    label: "Food",
    icon: /*#__PURE__*/React.createElement(I.Utensils, {
      size: 18
    })
  }, {
    label: "Talks",
    icon: /*#__PURE__*/React.createElement(I.Mic, {
      size: 18
    })
  }, {
    label: "Theatre",
    icon: /*#__PURE__*/React.createElement(I.Ticket, {
      size: 18
    })
  }];

  // ============================ SEARCH ============================
  const WD = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayTok = e => (e.date || "").split(" ")[0];
  const fmtDate = d => d.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
  function SearchScreen({
    events,
    saved,
    onSave,
    onDismiss,
    onOpen,
    city
  }) {
    const [q, setQ] = React.useState("");
    const [dateF, setDateF] = React.useState("any"); // "any" | "today" | "weekend" | Date
    const [distF, setDistF] = React.useState("any"); // "any" | "walk" | "1mi" | "2mi"
    const [cal, setCal] = React.useState(false);
    const query = q.trim().toLowerCase();
    const matchDate = e => {
      if (dateF === "any") return true;
      if (dateF === "today") return dayTok(e) === "Fri"; // mock "today"
      if (dateF === "weekend") return ["Sat", "Sun"].includes(dayTok(e));
      return dayTok(e) === WD[dateF.getDay()]; // picked Date
    };
    const matchText = e => !query || [e.title, e.category, e.venue].join(" ").toLowerCase().includes(query);
    const distChips = [{
      key: "any",
      label: "Any distance",
      max: Infinity
    }, {
      key: "walk",
      label: "Walkable",
      max: 0.5
    }, {
      key: "1mi",
      label: "\u2264 1 mi",
      max: 1
    }, {
      key: "2mi",
      label: "\u2264 2 mi",
      max: 2
    }];
    const matchDist = e => parseFloat(e.distance || "99") <= distChips.find(c => c.key === distF).max;
    const hasFilter = !!query || dateF !== "any" || distF !== "any";
    const results = events.filter(e => matchText(e) && matchDate(e) && matchDist(e));
    const dateChips = [{
      key: "any",
      label: "Any day"
    }, {
      key: "today",
      label: "Today"
    }, {
      key: "weekend",
      label: "This weekend"
    }];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "var(--space-5) var(--space-5) var(--space-9)",
        maxWidth: "var(--content-max)",
        margin: "0 auto"
      }
    }, /*#__PURE__*/React.createElement(SearchBar, {
      value: q,
      onChange: setQ,
      autoFocus: true,
      size: "lg",
      placeholder: `Search events, venues & areas in ${city ? city.name : "your city"}`,
      style: {
        marginBottom: "var(--space-3)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        marginBottom: "var(--space-3)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: "8px",
        overflowX: "auto",
        paddingBottom: "2px",
        scrollbarWidth: "none"
      }
    }, dateChips.map(c => /*#__PURE__*/React.createElement(FilterChip, {
      key: c.key,
      active: dateF === c.key,
      onClick: () => {
        setDateF(c.key);
        setCal(false);
      },
      icon: /*#__PURE__*/React.createElement(I.Calendar, {
        size: 15
      })
    }, c.label)), /*#__PURE__*/React.createElement(FilterChip, {
      active: dateF instanceof Date,
      onClick: () => setCal(v => !v),
      icon: /*#__PURE__*/React.createElement(I.Calendar, {
        size: 15
      })
    }, dateF instanceof Date ? fmtDate(dateF) : "Pick a date")), cal && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: "44px",
        left: 0,
        zIndex: 30
      }
    }, /*#__PURE__*/React.createElement(DatePicker, {
      value: dateF instanceof Date ? dateF : null,
      onChange: d => {
        setDateF(d);
        setCal(false);
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: "8px",
        overflowX: "auto",
        paddingBottom: "2px",
        marginBottom: "var(--space-6)",
        scrollbarWidth: "none"
      }
    }, distChips.map(c => /*#__PURE__*/React.createElement(FilterChip, {
      key: c.key,
      active: distF === c.key,
      onClick: () => setDistF(c.key),
      icon: /*#__PURE__*/React.createElement(I.Pin, {
        size: 15
      })
    }, c.label))), !hasFilter && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Eyebrow, {
      style: {
        marginBottom: "var(--space-3)"
      }
    }, "Recent"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        marginBottom: "var(--space-7)"
      }
    }, RECENT.map(r => /*#__PURE__*/React.createElement(FilterChip, {
      key: r,
      onClick: () => setQ(r.split(" ")[0])
    }, r))), /*#__PURE__*/React.createElement(Eyebrow, {
      style: {
        marginBottom: "var(--space-3)"
      }
    }, "Browse by category"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: "10px",
        marginBottom: "var(--space-7)"
      }
    }, CATS.map(c => /*#__PURE__*/React.createElement("button", {
      key: c.label,
      onClick: () => setQ(c.label),
      style: {
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
        transition: "background var(--dur-2)"
      },
      onMouseEnter: e => e.currentTarget.style.background = "var(--surface-raised)",
      onMouseLeave: e => e.currentTarget.style.background = "var(--surface-card)"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-muted)"
      }
    }, c.icon), c.label))), /*#__PURE__*/React.createElement(Eyebrow, {
      style: {
        marginBottom: "var(--space-3)"
      }
    }, "Trending near you"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)"
      }
    }, events.slice(0, 3).map(e => /*#__PURE__*/React.createElement(EventCard, {
      key: e.id,
      event: e,
      variant: "compact",
      saved: saved.has(e.id),
      onSave: () => onSave(e.id),
      onOpen: () => onOpen(e)
    })))), hasFilter && results.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Eyebrow, {
      style: {
        marginBottom: "var(--space-3)"
      }
    }, results.length, " result", results.length > 1 ? "s" : "", query ? ` for “${q}”` : "", dateF !== "any" ? ` · ${dateF instanceof Date ? fmtDate(dateF) : dateChips.find(c => c.key === dateF).label.toLowerCase()}` : "", distF !== "any" ? ` · ${distChips.find(c => c.key === distF).label.toLowerCase()}` : ""), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)"
      }
    }, results.map(e => /*#__PURE__*/React.createElement(EventCard, {
      key: e.id,
      event: e,
      variant: "compact",
      saved: saved.has(e.id),
      onSave: () => onSave(e.id),
      onDismiss: () => onDismiss(e.id),
      onOpen: () => onOpen(e)
    })))), hasFilter && results.length === 0 && /*#__PURE__*/React.createElement(EmptyState, {
      glyph: "search",
      title: "Nothing matches yet",
      body: "Try a broader term, a different date, or a wider distance. New sources trickle in all the time.",
      action: /*#__PURE__*/React.createElement(Button, {
        variant: "secondary",
        size: "sm",
        onClick: () => {
          setQ("");
          setDateF("any");
          setDistF("any");
        }
      }, "Clear search")
    }));
  }

  // ============================ ACCOUNT ============================
  function Row({
    icon,
    label,
    value,
    onClick,
    last
  }) {
    return /*#__PURE__*/React.createElement("button", {
      onClick: onClick,
      style: {
        display: "flex",
        width: "100%",
        alignItems: "center",
        gap: "var(--space-3)",
        padding: "var(--space-4) var(--space-2)",
        background: "transparent",
        border: "none",
        borderBottom: last ? "none" : "1px solid var(--border)",
        cursor: "pointer",
        textAlign: "left"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-muted)",
        display: "flex"
      }
    }, icon), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        fontSize: "var(--fs-body)",
        color: "var(--text-strong)",
        fontWeight: "var(--fw-medium)"
      }
    }, label), value && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-xs)",
        color: "var(--text-muted)",
        letterSpacing: "0.02em"
      }
    }, value), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-faint)",
        display: "flex"
      }
    }, /*#__PURE__*/React.createElement(I.ChevronRight, {
      size: 18
    })));
  }
  const Group = ({
    title,
    children
  }) => /*#__PURE__*/React.createElement("section", {
    style: {
      marginBottom: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: "var(--space-2)"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-lg)",
      padding: "0 var(--space-4)"
    }
  }, children));
  function Account({
    theme,
    setTheme,
    onNavigate,
    onSignOut,
    city
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "var(--space-6)",
        maxWidth: "var(--content-max)",
        margin: "0 auto"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "var(--space-4)",
        marginBottom: "var(--space-6)"
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: "Ana Ruiz",
      size: 60
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: "var(--fs-display-sm)",
        color: "var(--text-strong)",
        margin: "0 0 2px",
        letterSpacing: "var(--ls-tight)"
      }
    }, "Ana Ruiz"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-xs)",
        color: "var(--text-muted)"
      }
    }, "ana@hey.com")), /*#__PURE__*/React.createElement(Badge, {
      tone: "neutral"
    }, "Free plan")), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        overflow: "hidden",
        background: "var(--surface-inverse)",
        color: "var(--text-inverse)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-5)",
        marginBottom: "var(--space-7)"
      },
      className: "map-overlay"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        zIndex: 2
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "6px"
      }
    }, /*#__PURE__*/React.createElement(I.Sparkles, {
      size: 18
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-xs)",
        letterSpacing: "var(--ls-label)",
        textTransform: "uppercase",
        opacity: 0.85
      }
    }, "Pulse+")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: "var(--fs-title)",
        marginBottom: "4px"
      }
    }, "Unlimited cities & instant drops"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: "var(--fs-sm)",
        opacity: 0.75,
        marginBottom: "var(--space-4)",
        maxWidth: "44ch"
      }
    }, "Real-time alerts the moment a high-match event is found \u2014 anywhere you travel."), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      style: {
        background: "var(--text-inverse)",
        color: "var(--surface-inverse)",
        borderColor: "var(--text-inverse)"
      }
    }, "Upgrade \u2014 $4/mo"))), /*#__PURE__*/React.createElement(Group, {
      title: "Account"
    }, /*#__PURE__*/React.createElement(Row, {
      icon: /*#__PURE__*/React.createElement(I.User, {
        size: 18
      }),
      label: "Edit profile"
    }), /*#__PURE__*/React.createElement(Row, {
      icon: /*#__PURE__*/React.createElement(I.Pin, {
        size: 18
      }),
      label: "Home city",
      value: city ? city.name : "Lisbon"
    }), /*#__PURE__*/React.createElement(Row, {
      icon: /*#__PURE__*/React.createElement(I.Globe, {
        size: 18
      }),
      label: "Connected sources",
      value: "6 active",
      last: true
    })), /*#__PURE__*/React.createElement(Group, {
      title: "Personalization"
    }, /*#__PURE__*/React.createElement(Row, {
      icon: /*#__PURE__*/React.createElement(I.Sliders, {
        size: 18
      }),
      label: "For me \u2014 interests & ranking",
      onClick: () => onNavigate && onNavigate("me")
    }), /*#__PURE__*/React.createElement(Row, {
      icon: /*#__PURE__*/React.createElement(I.Bell, {
        size: 18
      }),
      label: "Notifications & digest",
      onClick: () => onNavigate && onNavigate("digest"),
      last: true
    })), /*#__PURE__*/React.createElement("section", {
      style: {
        marginBottom: "var(--space-6)"
      }
    }, /*#__PURE__*/React.createElement(Eyebrow, {
      style: {
        marginBottom: "var(--space-2)"
      }
    }, "Appearance"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "var(--surface-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-4)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "var(--fs-body)",
        color: "var(--text-strong)",
        fontWeight: "var(--fw-medium)"
      }
    }, "Theme"), /*#__PURE__*/React.createElement(SegmentedControl, {
      size: "sm",
      value: theme,
      onChange: setTheme,
      options: [{
        value: "light",
        label: "Light"
      }, {
        value: "dark",
        label: "Dark"
      }]
    }))), /*#__PURE__*/React.createElement(Group, {
      title: "Support"
    }, /*#__PURE__*/React.createElement(Row, {
      icon: /*#__PURE__*/React.createElement(I.Heart, {
        size: 18
      }),
      label: "Privacy & data"
    }), /*#__PURE__*/React.createElement(Row, {
      icon: /*#__PURE__*/React.createElement(I.ExternalLink, {
        size: 18
      }),
      label: "Help & feedback",
      last: true
    })), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      block: true,
      onClick: onSignOut,
      style: {
        marginTop: "var(--space-2)"
      }
    }, "Sign out"), /*#__PURE__*/React.createElement("p", {
      style: {
        textAlign: "center",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-2xs)",
        color: "var(--text-faint)",
        marginTop: "var(--space-4)",
        letterSpacing: "0.04em"
      }
    }, "PULSE \xB7 v1.0 \xB7 WE SEND YOU TO THE SOURCE"));
  }

  // ============================ SIGN IN ============================
  function SignIn({
    onContinue
  }) {
    const [email, setEmail] = React.useState("");
    const [busy, setBusy] = React.useState(false);
    const go = () => {
      setBusy(true);
      setTimeout(onContinue, 800);
    };
    const Oauth = ({
      label,
      mark
    }) => /*#__PURE__*/React.createElement("button", {
      onClick: go,
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-2)",
        width: "100%",
        height: "48px",
        background: "var(--surface-card)",
        border: "1px solid var(--border-strong)",
        borderRadius: "var(--radius-pill)",
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
        fontWeight: "var(--fw-semibold)",
        fontSize: "var(--fs-body)",
        color: "var(--text-strong)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: "18px",
        width: "20px",
        textAlign: "center"
      }
    }, mark), label);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "var(--space-8) var(--space-6)",
        maxWidth: "26rem",
        margin: "0 auto"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-strong)",
        marginBottom: "var(--space-7)"
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "38",
      height: "38",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.7",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 21.6 C12 21.6 18.8 14.8 18.8 9 A6.8 6.8 0 1 0 5.2 9 C5.2 14.8 12 21.6 12 21.6 Z"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "8.8",
      r: "1.5",
      fill: "currentColor",
      stroke: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M14.7 6.1 a3.9 3.9 0 0 1 0 5.4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9.3 6.1 a3.9 3.9 0 0 0 0 5.4"
    }))), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: "var(--fs-display-md)",
        color: "var(--text-strong)",
        letterSpacing: "var(--ls-display)",
        lineHeight: "var(--lh-tight)",
        margin: "0 0 var(--space-2)"
      }
    }, "Your city,", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, "ranked for you.")), /*#__PURE__*/React.createElement("p", {
      style: {
        color: "var(--text-muted)",
        fontSize: "var(--fs-subtitle)",
        margin: "0 0 var(--space-6)"
      }
    }, "One feed for everything happening \u2014 no walled gardens."), /*#__PURE__*/React.createElement(Input, {
      label: "Email",
      type: "email",
      placeholder: "you@email.com",
      value: email,
      onChange: e => setEmail(e.target.value),
      iconLeft: /*#__PURE__*/React.createElement(I.User, {
        size: 18
      }),
      style: {
        marginBottom: "var(--space-3)"
      }
    }), /*#__PURE__*/React.createElement(Button, {
      block: true,
      size: "lg",
      loading: busy,
      onClick: go
    }, "Continue"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        margin: "var(--space-6) 0"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        height: "1px",
        background: "var(--border)"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-2xs)",
        letterSpacing: "var(--ls-label)",
        textTransform: "uppercase",
        color: "var(--text-faint)"
      }
    }, "or"), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        height: "1px",
        background: "var(--border)"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-2)"
      }
    }, /*#__PURE__*/React.createElement(Oauth, {
      label: "Continue with Apple",
      mark: ""
    }), /*#__PURE__*/React.createElement(Oauth, {
      label: "Continue with Google",
      mark: "G"
    })), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: "var(--fs-sm)",
        color: "var(--text-faint)",
        textAlign: "center",
        marginTop: "var(--space-6)",
        lineHeight: "var(--lh-normal)"
      }
    }, "By continuing you agree to the Terms & Privacy Policy."));
  }
  window.PulseUser = {
    SearchScreen,
    Account,
    SignIn
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pulse/screens-user.jsx", error: String((e && e.message) || e) }); }

// ui_kits/pulse/shell.jsx
try { (() => {
// Pulse UI-kit shell helpers → window.PulseShell
(function () {
  const {
    Pin,
    ChevronLeft,
    More,
    Star
  } = window.PulseIcons;
  const NS = window.PulseDesignSystem_3c2543;
  const {
    MapPin
  } = NS;

  // ---- Mobile device frame (390 × 844) -------------------------------------
  function PhoneFrame({
    children,
    theme
  }) {
    return React.createElement("div", {
      "data-theme": theme,
      style: {
        width: "390px",
        height: "844px",
        flex: "0 0 auto",
        background: "var(--surface-page)",
        color: "var(--text-body)",
        borderRadius: "44px",
        border: "10px solid #0c0c0d",
        boxShadow: "0 40px 90px rgba(21,18,12,0.34), 0 0 0 1px rgba(0,0,0,0.4)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column"
      }
    }, React.createElement("div", {
      style: {
        position: "absolute",
        top: "0",
        left: "50%",
        transform: "translateX(-50%)",
        width: "128px",
        height: "30px",
        background: "#0c0c0d",
        borderBottomLeftRadius: "16px",
        borderBottomRightRadius: "16px",
        zIndex: 50
      }
    }), children);
  }

  // ---- Section eyebrow ------------------------------------------------------
  function Eyebrow({
    children,
    style
  }) {
    return React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-xs)",
        letterSpacing: "var(--ls-label)",
        textTransform: "uppercase",
        color: "var(--text-muted)",
        ...style
      }
    }, children);
  }

  // ---- Map panel (desktop right zone) --------------------------------------
  function MapPanel({
    events,
    selectedId,
    onSelect,
    loading
  }) {
    // deterministic-ish positions for pins
    const pos = [{
      top: "22%",
      left: "30%"
    }, {
      top: "40%",
      left: "62%"
    }, {
      top: "58%",
      left: "38%"
    }, {
      top: "30%",
      left: "75%"
    }, {
      top: "68%",
      left: "66%"
    }, {
      top: "50%",
      left: "20%"
    }, {
      top: "74%",
      left: "44%"
    }, {
      top: "18%",
      left: "55%"
    }, {
      top: "62%",
      left: "82%"
    }, {
      top: "38%",
      left: "46%"
    }];
    return React.createElement("aside", {
      style: {
        width: "var(--map-panel-w)",
        flex: "0 0 auto",
        position: "relative",
        borderLeft: "1px solid var(--border)",
        background: "var(--surface-sunken)",
        display: "flex",
        flexDirection: "column"
      }
    }, React.createElement("div", {
      style: {
        padding: "var(--space-4) var(--space-5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface-page)"
      }
    }, React.createElement(Eyebrow, null, loading ? "Mapping…" : `Map · ${events.length} nearby`), React.createElement(More, {
      size: 18,
      style: {
        color: "var(--text-muted)"
      }
    })), React.createElement("div", {
      className: "map-overlay",
      style: {
        flex: 1,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "var(--surface-sunken)"
      }
    }, events.map((e, i) => React.createElement("div", {
      key: e.id,
      style: {
        position: "absolute",
        transform: "translate(-50%,-50%)",
        ...pos[i % pos.length]
      }
    }, React.createElement(MapPin, {
      label: e.free ? undefined : `$${e.price}`,
      free: e.free,
      gem: e.gem,
      selected: e.id === selectedId,
      onClick: () => onSelect && onSelect(e.id)
    })))));
  }
  window.PulseShell = {
    PhoneFrame,
    Eyebrow,
    MapPanel
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pulse/shell.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.DigestItem = __ds_scope.DigestItem;

__ds_ns.EventCard = __ds_scope.EventCard;

__ds_ns.LocationSwitcher = __ds_scope.LocationSwitcher;

__ds_ns.MapPin = __ds_scope.MapPin;

__ds_ns.PriceTag = __ds_scope.PriceTag;

__ds_ns.RelevanceChip = __ds_scope.RelevanceChip;

__ds_ns.SaveDismiss = __ds_scope.SaveDismiss;

__ds_ns.SourceBadge = __ds_scope.SourceBadge;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.Skeleton = __ds_scope.Skeleton;

__ds_ns.EventCardSkeleton = __ds_scope.EventCardSkeleton;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.DatePicker = __ds_scope.DatePicker;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.BottomNav = __ds_scope.BottomNav;

__ds_ns.FilterBar = __ds_scope.FilterBar;

__ds_ns.FilterChip = __ds_scope.FilterChip;

__ds_ns.SearchBar = __ds_scope.SearchBar;

__ds_ns.SidebarNav = __ds_scope.SidebarNav;

})();
