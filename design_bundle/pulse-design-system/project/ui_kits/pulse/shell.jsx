// Pulse UI-kit shell helpers → window.PulseShell
(function () {
  const { Pin, ChevronLeft, More, Star } = window.PulseIcons;
  const NS = window.PulseDesignSystem_3c2543;
  const { MapPin } = NS;

  // ---- Mobile device frame (390 × 844) -------------------------------------
  function PhoneFrame({ children, theme }) {
    return (
      React.createElement("div", {
        "data-theme": theme,
        style: {
          width: "390px", height: "844px", flex: "0 0 auto",
          background: "var(--surface-page)", color: "var(--text-body)",
          borderRadius: "44px", border: "10px solid #0c0c0d",
          boxShadow: "0 40px 90px rgba(21,18,12,0.34), 0 0 0 1px rgba(0,0,0,0.4)",
          position: "relative", overflow: "hidden",
          display: "flex", flexDirection: "column",
        },
      },
        React.createElement("div", {
          style: {
            position: "absolute", top: "0", left: "50%", transform: "translateX(-50%)",
            width: "128px", height: "30px", background: "#0c0c0d",
            borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px", zIndex: 50,
          },
        }),
        children
      )
    );
  }

  // ---- Section eyebrow ------------------------------------------------------
  function Eyebrow({ children, style }) {
    return React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)",
        letterSpacing: "var(--ls-label)", textTransform: "uppercase",
        color: "var(--text-muted)", ...style,
      },
    }, children);
  }

  // ---- Map panel (desktop right zone) --------------------------------------
  function MapPanel({ events, selectedId, onSelect, loading }) {
    // deterministic-ish positions for pins
    const pos = [
      { top: "22%", left: "30%" }, { top: "40%", left: "62%" }, { top: "58%", left: "38%" },
      { top: "30%", left: "75%" }, { top: "68%", left: "66%" }, { top: "50%", left: "20%" },
      { top: "74%", left: "44%" }, { top: "18%", left: "55%" }, { top: "62%", left: "82%" },
      { top: "38%", left: "46%" },
    ];
    return React.createElement("aside", {
      style: {
        width: "var(--map-panel-w)", flex: "0 0 auto", position: "relative",
        borderLeft: "1px solid var(--border)", background: "var(--surface-sunken)",
        display: "flex", flexDirection: "column",
      },
    },
      React.createElement("div", {
        style: {
          padding: "var(--space-4) var(--space-5)", display: "flex",
          alignItems: "center", justifyContent: "space-between",
          borderBottom: "1px solid var(--border)", background: "var(--surface-page)",
        },
      },
        React.createElement(Eyebrow, null, loading ? "Mapping…" : `Map · ${events.length} nearby`),
        React.createElement(More, { size: 18, style: { color: "var(--text-muted)" } })
      ),
      React.createElement("div", {
        className: "map-overlay",
        style: {
          flex: 1, position: "relative", overflow: "hidden",
          backgroundColor: "var(--surface-sunken)",
        },
      },
        events.map((e, i) =>
          React.createElement("div", {
            key: e.id,
            style: { position: "absolute", transform: "translate(-50%,-50%)", ...(pos[i % pos.length]) },
          },
            React.createElement(MapPin, {
              label: e.free ? undefined : `$${e.price}`,
              free: e.free, gem: e.gem,
              selected: e.id === selectedId,
              onClick: () => onSelect && onSelect(e.id),
            })
          )
        )
      )
    );
  }

  window.PulseShell = { PhoneFrame, Eyebrow, MapPanel };
})();
