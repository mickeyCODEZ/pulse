// Feed + Hidden-gems rail → window.PulseFeed
(function () {
  const NS = window.PulseDesignSystem_3c2543;
  const { EventCard } = NS;
  const { Star, Sparkles } = window.PulseIcons;
  const { Eyebrow } = window.PulseShell;

  function GemsRail({ gems, saved, onSave, onDismiss, onOpen }) {
    if (!gems.length) return null;
    return React.createElement("section", {
      style: {
        margin: "var(--space-3) 0", padding: "var(--space-5) 0",
        borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
      },
    },
      React.createElement("div", {
        style: { display: "flex", alignItems: "center", gap: "8px", padding: "0 0 var(--space-3)" },
      },
        React.createElement(Star, { size: 15, style: { color: "var(--text-strong)" } }),
        React.createElement("h2", {
          style: { fontFamily: "var(--font-display)", fontSize: "var(--fs-title)", color: "var(--text-strong)", margin: 0 },
        }, "Hidden gems"),
        React.createElement(Eyebrow, { style: { marginLeft: "auto" } }, "high match · low noise")
      ),
      React.createElement("div", {
        style: {
          display: "flex", gap: "var(--space-3)", overflowX: "auto",
          scrollSnapType: "x mandatory", paddingBottom: "4px",
          scrollbarWidth: "none",
        },
      },
        gems.map((e) =>
          React.createElement("div", {
            key: e.id,
            style: { flex: "0 0 84%", maxWidth: "300px", scrollSnapAlign: "start" },
          },
            React.createElement(EventCard, {
              event: e, saved: saved.has(e.id),
              onSave: () => onSave(e.id), onDismiss: () => onDismiss(e.id), onOpen: () => onOpen(e),
            })
          )
        )
      )
    );
  }

  function FeedList({ events, saved, onSave, onDismiss, onOpen, columns = 1 }) {
    const gems = events.filter((e) => e.gem);
    const main = events.filter((e) => !e.gem);
    const head = main.slice(0, 2);
    const tail = main.slice(2);

    const grid = (list) =>
      React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: columns > 1 ? `repeat(${columns}, 1fr)` : "1fr",
          gap: "var(--space-5)",
        },
      },
        list.map((e) =>
          React.createElement(EventCard, {
            key: e.id, event: e, saved: saved.has(e.id),
            onSave: () => onSave(e.id), onDismiss: () => onDismiss(e.id), onOpen: () => onOpen(e),
          })
        )
      );

    return React.createElement("div", null,
      grid(head),
      React.createElement(GemsRail, { gems, saved, onSave, onDismiss, onOpen }),
      grid(tail)
    );
  }

  window.PulseFeed = { FeedList, GemsRail };
})();
