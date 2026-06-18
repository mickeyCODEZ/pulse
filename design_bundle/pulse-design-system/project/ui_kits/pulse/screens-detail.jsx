// Event detail → window.PulseDetail
(function () {
  const NS = window.PulseDesignSystem_3c2543;
  const { Tag, Button, IconButton, RelevanceChip, PriceTag, EventCard } = NS;
  const { ChevronLeft, Calendar, Share, ExternalLink, Bookmark, Pin } = window.PulseIcons;
  const { Eyebrow } = window.PulseShell;

  function OutboundRow({ source, primary }) {
    return React.createElement(Button, {
      variant: primary ? "primary" : "secondary", block: true,
      iconRight: React.createElement(ExternalLink, { size: 17 }),
      style: { justifyContent: "space-between" },
    }, primary ? `Get tickets · ${source}` : `Also on ${source}`);
  }

  function EventDetailView({ event, saved, onSave, onBack, more = [], onOpen, mode = "mobile" }) {
    if (!event) return null;
    const meta = [event.date, event.venue, event.distance].filter(Boolean).join("  ·  ");
    const sources = event.sources || [];
    return React.createElement("div", { style: { paddingBottom: "var(--space-9)" } },
      // Hero
      React.createElement("div", {
        className: "img-duotone",
        style: {
          position: "relative", height: mode === "desktop" ? "320px" : "260px",
          backgroundPosition: event.img || "center",
        },
      },
        React.createElement("div", {
          style: { position: "absolute", inset: 0, padding: "var(--space-4)", display: "flex", flexDirection: "column", justifyContent: "space-between" },
        },
          React.createElement("div", { style: { display: "flex", justifyContent: "space-between" } },
            React.createElement(IconButton, {
              label: "Back", round: true, onClick: onBack,
              style: { background: "color-mix(in srgb, var(--black) 42%, transparent)", color: "var(--white)", backdropFilter: "blur(6px)", border: "1px solid color-mix(in srgb, var(--white) 22%, transparent)" },
            }, React.createElement(ChevronLeft, { size: 20 })),
            React.createElement(IconButton, {
              label: "Share", round: true,
              style: { background: "color-mix(in srgb, var(--black) 42%, transparent)", color: "var(--white)", backdropFilter: "blur(6px)", border: "1px solid color-mix(in srgb, var(--white) 22%, transparent)" },
            }, React.createElement(Share, { size: 18 }))
          ),
          React.createElement("div", { style: { display: "flex", gap: "8px", alignItems: "flex-end" } },
            React.createElement(Tag, { size: "sm", style: { background: "color-mix(in srgb, var(--black) 45%, transparent)", color: "var(--white)", border: "1px solid color-mix(in srgb, var(--white) 22%, transparent)", backdropFilter: "blur(6px)" } }, event.category),
            (event.free || event.price != null) && React.createElement(PriceTag, { price: event.price, free: event.free, overlay: true })
          )
        )
      ),
      // Body
      React.createElement("div", { style: { padding: "var(--space-6) var(--space-6) 0" } },
        React.createElement("h1", {
          style: { fontFamily: "var(--font-display)", fontSize: "var(--fs-display-md)", color: "var(--text-strong)", lineHeight: "var(--lh-tight)", letterSpacing: "var(--ls-display)", margin: "0 0 var(--space-3)" },
        }, event.title),
        React.createElement("div", {
          style: { fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text-muted)", letterSpacing: "0.02em", marginBottom: "var(--space-4)" },
        }, meta),
        event.relevance && React.createElement("div", { style: { display: "flex", marginBottom: "var(--space-5)" } },
          React.createElement(RelevanceChip, { reasons: event.relevance, score: event.score })
        ),
        React.createElement("p", {
          style: { fontSize: "var(--fs-subtitle)", lineHeight: "var(--lh-relaxed)", color: "var(--text-body)", margin: "0 0 var(--space-6)", maxWidth: "40rem" },
        }, event.blurb),

        // Outbound
        React.createElement(Eyebrow, { style: { marginBottom: "var(--space-3)" } },
          sources.length > 1 ? `Found on ${sources.length} platforms` : "Get in"),
        React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "var(--space-2)", marginBottom: "var(--space-3)" } },
          sources.map((s, i) => React.createElement(OutboundRow, { key: s, source: s, primary: i === 0 }))
        ),
        React.createElement("div", { style: { display: "flex", gap: "var(--space-2)", marginBottom: "var(--space-7)" } },
          React.createElement(Button, { variant: "secondary", block: true, onClick: () => onSave(event.id), iconLeft: React.createElement(Bookmark, { size: 17 }) }, saved ? "Saved" : "Save"),
          React.createElement(Button, { variant: "secondary", block: true, iconLeft: React.createElement(Calendar, { size: 17 }) }, "Add to calendar")
        ),

        // Map snippet
        React.createElement(Eyebrow, { style: { marginBottom: "var(--space-3)" } }, "Where"),
        React.createElement("div", {
          className: "map-overlay",
          style: { height: "150px", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", background: "var(--surface-sunken)", position: "relative", marginBottom: "var(--space-7)" },
        },
          React.createElement("div", { style: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-60%)", color: "var(--text-strong)" } },
            React.createElement(Pin, { size: 28 })
          ),
          React.createElement("div", { style: { position: "absolute", bottom: "10px", left: "12px", fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-muted)" } }, `${event.venue} · ${event.distance}`)
        ),

        // More like this
        more.length > 0 && React.createElement("div", null,
          React.createElement(Eyebrow, { style: { marginBottom: "var(--space-3)" } }, "More like this"),
          React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "var(--space-3)" } },
            more.map((e) => React.createElement(EventCard, { key: e.id, event: e, variant: "compact", onOpen: () => onOpen(e) }))
          )
        )
      )
    );
  }

  window.PulseDetail = { EventDetailView };
})();
