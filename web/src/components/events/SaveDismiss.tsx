import type { CSSProperties, MouseEvent } from "react";
import { IconButton } from "../core/IconButton";

export interface SaveDismissProps {
  saved?: boolean;
  onSave?: (e?: MouseEvent) => void;
  onDismiss?: (e?: MouseEvent) => void;
  showDismiss?: boolean; // hide the dismiss (×) where it has no meaning, e.g. the Saved list
  overlay?: boolean;
  size?: "sm" | "md" | "lg";
  style?: CSSProperties;
}

/**
 * Save / dismiss control pair for cards. Dismiss is deliberately lightweight —
 * it teaches the ranker, not deletes. `onDismiss` should feel reversible.
 */
export function SaveDismiss({
  saved = false,
  onSave,
  onDismiss,
  showDismiss = true,
  overlay = false,
  size = "md",
  style,
}: SaveDismissProps) {
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
  const overlayStyle: CSSProperties | undefined = overlay
    ? {
        background: "color-mix(in srgb, var(--black) 42%, transparent)",
        color: "var(--white)",
        backdropFilter: "blur(var(--blur-sm))",
        WebkitBackdropFilter: "blur(var(--blur-sm))",
        border: "1px solid color-mix(in srgb, var(--white) 22%, transparent)",
      }
    : undefined;
  return (
    <div style={{ display: "inline-flex", gap: "var(--space-2)", ...style }}>
      {showDismiss && (
        <IconButton
          label="Dismiss"
          size={size}
          round
          variant={overlay ? "ghost" : "outline"}
          onClick={onDismiss}
          style={overlayStyle}
        >
          {x}
        </IconButton>
      )}
      <IconButton
        label={saved ? "Saved" : "Save"}
        size={size}
        round
        variant={overlay ? "ghost" : "outline"}
        active={saved && !overlay}
        onClick={onSave}
        style={
          overlay
            ? overlayStyle
            : saved
              ? { background: "var(--accent)", color: "var(--accent-fg)", borderColor: "var(--accent)" }
              : undefined
        }
      >
        {bookmark}
      </IconButton>
    </div>
  );
}
