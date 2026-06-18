import type { CSSProperties } from "react";
import type { PulseEvent } from "../data";
import { Tag } from "../components/core/Tag";
import { Button } from "../components/core/Button";
import { IconButton } from "../components/core/IconButton";
import { RelevanceChip } from "../components/events/RelevanceChip";
import { PriceTag } from "../components/events/PriceTag";
import { EventCard } from "../components/events/EventCard";
import { ChevronLeft, Calendar, Share, ExternalLink, Bookmark, Pin } from "../icons";
import { Eyebrow } from "../shell/Eyebrow";
import { MapView } from "../shell/MapView";
import { downloadICS, shareEvent } from "../ics";

function OutboundRow({ source, primary, url, onGo }: { source: string; primary: boolean; url?: string; onGo?: () => void }) {
  const go = () => {
    onGo?.();
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <Button
      variant={primary ? "primary" : "secondary"}
      block
      iconRight={<ExternalLink size={17} />}
      style={{ justifyContent: "space-between" }}
      disabled={!url}
      onClick={go}
    >
      {primary ? `Get tickets · ${source}` : `Also on ${source}`}
    </Button>
  );
}

export interface EventDetailViewProps {
  event: PulseEvent | null;
  saved: boolean;
  onSave: (id: string) => void;
  onBack: () => void;
  more?: PulseEvent[];
  onOpen: (e: PulseEvent) => void;
  mode?: "mobile" | "desktop";
  theme?: string;
}

const overlayBtn = {
  background: "color-mix(in srgb, var(--black) 42%, transparent)",
  color: "var(--white)",
  backdropFilter: "blur(6px)",
  border: "1px solid color-mix(in srgb, var(--white) 22%, transparent)",
} as const;

export function EventDetailView({ event, saved, onSave, onBack, more = [], onOpen, mode = "mobile", theme = "light" }: EventDetailViewProps) {
  if (!event) return null;
  const meta = [event.date, event.venue, event.distance].filter(Boolean).join("  ·  ");
  const sources = event.sources || [];
  const heroClass = event.imageUrl ? "img-photo" : "img-duotone";
  const heroVars: CSSProperties = event.imageUrl
    ? ({ ["--photo" as string]: `url("${event.imageUrl}")` } as CSSProperties)
    : { backgroundPosition: event.img || "center" };
  return (
    <div style={{ paddingBottom: "var(--space-9)" }}>
      {/* Hero */}
      <div
        className={heroClass}
        style={{ position: "relative", height: mode === "desktop" ? "320px" : "260px", ...heroVars }}
      >
        <div style={{ position: "absolute", inset: 0, padding: "var(--space-4)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton label="Back" round onClick={onBack} style={overlayBtn}>
              <ChevronLeft size={20} />
            </IconButton>
            <IconButton label="Share" round style={overlayBtn} onClick={() => shareEvent(event)}>
              <Share size={18} />
            </IconButton>
          </div>
          <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
            <Tag
              size="sm"
              style={{
                background: "color-mix(in srgb, var(--black) 45%, transparent)",
                color: "var(--white)",
                border: "1px solid color-mix(in srgb, var(--white) 22%, transparent)",
                backdropFilter: "blur(6px)",
              }}
            >
              {event.category}
            </Tag>
            {(event.free || event.price != null) && <PriceTag price={event.price} free={event.free} overlay />}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "var(--space-6) var(--space-6) 0" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-display-md)", color: "var(--text-strong)", lineHeight: "var(--lh-tight)", letterSpacing: "var(--ls-display)", margin: "0 0 var(--space-3)" }}>
          {event.title}
        </h1>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text-muted)", letterSpacing: "0.02em", marginBottom: "var(--space-4)" }}>
          {meta}
        </div>
        {event.relevance && (
          <div style={{ display: "flex", marginBottom: "var(--space-5)" }}>
            <RelevanceChip reasons={event.relevance} score={event.score} />
          </div>
        )}
        <p style={{ fontSize: "var(--fs-subtitle)", lineHeight: "var(--lh-relaxed)", color: "var(--text-body)", margin: "0 0 var(--space-6)", maxWidth: "40rem" }}>
          {event.blurb}
        </p>

        {/* Outbound */}
        <Eyebrow style={{ marginBottom: "var(--space-3)" }}>
          {sources.length > 1 ? `Found on ${sources.length} platforms` : "Get in"}
        </Eyebrow>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", marginBottom: "var(--space-3)" }}>
          {sources.map((s, i) => (
            <OutboundRow key={s} source={s} primary={i === 0} url={event.url} />
          ))}
        </div>
        <div style={{ display: "flex", gap: "var(--space-2)", marginBottom: "var(--space-7)" }}>
          <Button variant="secondary" block onClick={() => onSave(event.id)} iconLeft={<Bookmark size={17} />}>
            {saved ? "Saved" : "Save"}
          </Button>
          <Button variant="secondary" block iconLeft={<Calendar size={17} />} onClick={() => downloadICS([event], `${event.title.slice(0, 40)}.ics`)}>
            Add to calendar
          </Button>
        </div>

        {/* Map snippet — real map when we have coordinates */}
        <Eyebrow style={{ marginBottom: "var(--space-3)" }}>Where</Eyebrow>
        <div
          style={{
            height: "180px",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border)",
            overflow: "hidden",
            position: "relative",
            marginBottom: "var(--space-7)",
          }}
        >
          {event.lat != null && event.lng != null ? (
            <MapView events={[event]} selectedId={event.id} theme={theme} />
          ) : (
            <div className="map-overlay" style={{ height: "100%", background: "var(--surface-sunken)", position: "relative" }}>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-60%)", color: "var(--text-strong)" }}>
                <Pin size={28} />
              </div>
            </div>
          )}
          <div style={{ position: "absolute", bottom: "10px", left: "12px", zIndex: 500, fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-muted)", background: "color-mix(in srgb, var(--surface-card) 85%, transparent)", padding: "2px 8px", borderRadius: "var(--radius-pill)" }}>
            {[event.venue, event.distance].filter(Boolean).join(" · ")}
          </div>
        </div>

        {/* More like this */}
        {more.length > 0 && (
          <div>
            <Eyebrow style={{ marginBottom: "var(--space-3)" }}>More like this</Eyebrow>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              {more.map((e) => (
                <EventCard key={e.id} event={e} variant="compact" onOpen={() => onOpen(e)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
