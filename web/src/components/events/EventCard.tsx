import type { CSSProperties } from "react";
import type { PulseEvent } from "../../data";
import { Tag } from "../core/Tag";
import { RelevanceChip } from "./RelevanceChip";
import { SourceBadge } from "./SourceBadge";
import { PriceTag } from "./PriceTag";
import { SaveDismiss } from "./SaveDismiss";

export interface EventCardProps {
  event: PulseEvent;
  variant?: "feed" | "compact";
  saved?: boolean;
  onSave?: () => void;
  onDismiss?: () => void;
  onOpen?: () => void;
  style?: CSSProperties;
}

/**
 * The key component. Image-forward, ranked event card showing why it surfaced
 * (relevance), where it was found (sources + dedup), price, and lightweight
 * save/dismiss. `gem` applies the inverted "Hidden gems" treatment.
 */
export function EventCard({
  event,
  variant = "feed",
  saved = false,
  onSave,
  onDismiss,
  onOpen,
  style,
}: EventCardProps) {
  const {
    category, title, date, venue, distance, price, free,
    relevance = [], sources = [], freshness, gem, score, imageStyle, img, imageUrl,
  } = event;

  const meta = [date, venue, distance].filter(Boolean).join("  ·  ");
  const bgPos = imageStyle?.backgroundPosition ?? img;

  // Real source photo (kept on-brand via .img-photo) or the duotone placeholder.
  const imageClass = imageUrl ? "img-photo" : "img-duotone";
  const imageVars: CSSProperties = imageUrl
    ? ({ ["--photo" as string]: `url("${imageUrl}")` } as CSSProperties)
    : { backgroundPosition: bgPos };

  if (variant === "compact") {
    return (
      <div
        onClick={onOpen}
        style={{
          display: "flex",
          gap: "var(--space-3)",
          alignItems: "stretch",
          padding: "var(--space-3)",
          background: "var(--surface-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          cursor: onOpen ? "pointer" : "default",
          ...style,
        }}
      >
        <div className={imageClass} style={{ width: "84px", flex: "0 0 auto", borderRadius: "var(--radius-md)", ...imageVars, ...imageStyle }} />
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {category && <Tag size="sm">{category}</Tag>}
            {(free || price != null) && <PriceTag price={price} free={free} />}
          </div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-title)", color: "var(--text-strong)", lineHeight: "var(--lh-snug)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {title}
          </h3>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-muted)", letterSpacing: "0.02em" }}>{meta}</div>
          {relevance.length > 0 && <RelevanceChip reasons={relevance} compact style={{ marginTop: "2px" }} />}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <SaveDismiss
            saved={saved}
            onSave={(e) => {
              e?.stopPropagation?.();
              onSave?.();
            }}
            onDismiss={(e) => {
              e?.stopPropagation?.();
              onDismiss?.();
            }}
            size="sm"
          />
        </div>
      </div>
    );
  }

  const inverse = !!gem;
  const chipDark: CSSProperties | undefined = inverse
    ? {
        background: "color-mix(in srgb, var(--text-inverse) 12%, transparent)",
        borderColor: "color-mix(in srgb, var(--text-inverse) 20%, transparent)",
        color: "var(--text-inverse)",
      }
    : undefined;

  return (
    <article
      style={{
        background: inverse ? "var(--surface-inverse)" : "var(--surface-card)",
        color: inverse ? "var(--text-inverse)" : "var(--text-body)",
        border: `1px solid ${inverse ? "var(--surface-inverse)" : "var(--border)"}`,
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        boxShadow: "var(--shadow-2)",
        transition: "transform var(--dur-3) var(--ease-out), box-shadow var(--dur-3) var(--ease-out)",
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "var(--shadow-3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "var(--shadow-2)";
      }}
    >
      {/* Image */}
      <div className={imageClass} onClick={onOpen} style={{ position: "relative", height: "196px", cursor: onOpen ? "pointer" : "default", ...imageVars, ...imageStyle }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "var(--space-3)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              {gem && (
                <span
                  style={{
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
                    color: "var(--black)",
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3l2.5 5.2 5.5.6-4 3.8 1 5.4L12 17l-5 2.8 1-5.4-4-3.8 5.5-.6z" />
                  </svg>
                  Hidden gem
                </span>
              )}
              {freshness && (
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--fs-2xs)",
                    letterSpacing: "0.03em",
                    padding: "4px 8px",
                    borderRadius: "var(--radius-sm)",
                    background: "color-mix(in srgb, var(--black) 45%, transparent)",
                    color: "var(--white)",
                    backdropFilter: "blur(var(--blur-sm))",
                    WebkitBackdropFilter: "blur(var(--blur-sm))",
                    whiteSpace: "nowrap",
                  }}
                >
                  {freshness}
                </span>
              )}
            </div>
            <SaveDismiss
              saved={saved}
              overlay
              onSave={(e) => {
                e?.stopPropagation?.();
                onSave?.();
              }}
              onDismiss={(e) => {
                e?.stopPropagation?.();
                onDismiss?.();
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            {category && (
              <Tag
                size="sm"
                style={{
                  background: "color-mix(in srgb, var(--black) 45%, transparent)",
                  color: "var(--white)",
                  border: "1px solid color-mix(in srgb, var(--white) 22%, transparent)",
                  backdropFilter: "blur(var(--blur-sm))",
                }}
              >
                {category}
              </Tag>
            )}
            {(free || price != null) && <PriceTag price={price} free={free} overlay />}
          </div>
        </div>
      </div>

      {/* Body */}
      <div onClick={onOpen} style={{ padding: "var(--space-4) var(--space-5) var(--space-5)", display: "flex", flexDirection: "column", gap: "var(--space-3)", cursor: onOpen ? "pointer" : "default" }}>
        <div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--fs-display-sm)",
              color: inverse ? "var(--text-inverse)" : "var(--text-strong)",
              lineHeight: "var(--lh-snug)",
              margin: "0 0 6px",
              letterSpacing: "var(--ls-tight)",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </h3>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--fs-xs)",
              letterSpacing: "0.03em",
              color: inverse ? "color-mix(in srgb, var(--text-inverse) 72%, transparent)" : "var(--text-muted)",
            }}
          >
            {meta}
          </div>
        </div>
        {relevance.length > 0 && (
          <div style={{ display: "flex" }}>
            <RelevanceChip reasons={relevance} score={score} style={chipDark} />
          </div>
        )}
        {sources.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: "var(--space-1)",
              borderTop: `1px solid ${inverse ? "color-mix(in srgb, var(--text-inverse) 14%, transparent)" : "var(--border)"}`,
            }}
          >
            <SourceBadge sources={sources} style={inverse ? { color: "var(--text-inverse)" } : undefined} />
          </div>
        )}
      </div>
    </article>
  );
}
