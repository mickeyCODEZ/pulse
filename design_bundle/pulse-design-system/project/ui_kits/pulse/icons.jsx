// Pulse icon set — Lucide geometry (ISC), 1.75 stroke, redrawn inline so they
// compose cleanly inside React. Exposed as window.PulseIcons.
(function () {
  const S = ({ size = 20, sw = 1.75, children, style }) =>
    React.createElement("svg", {
      width: size, height: size, viewBox: "0 0 24 24", fill: "none",
      stroke: "currentColor", strokeWidth: sw, strokeLinecap: "round",
      strokeLinejoin: "round", style, "aria-hidden": "true",
    }, children);
  const p = (d, extra) => React.createElement("path", { d, ...(extra || {}) });
  const c = (cx, cy, r, extra) => React.createElement("circle", { cx, cy, r, ...(extra || {}) });
  const make = (...nodes) => (props) => S({ ...props, children: nodes.map((n, i) => React.cloneElement(n, { key: i })) });

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
    Calendar: make(p("M7 3v3M17 3v3"), React.createElement("rect", { x: 4, y: 5, width: 16, height: 16, rx: 2 }), p("M4 10h16")),
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
    Film: make(React.createElement("rect", { x: 3, y: 4, width: 18, height: 16, rx: 2 }), p("M3 9h4M17 9h4M3 15h4M17 15h4M8 4v16M16 4v16")),
    Utensils: make(p("M5 3v7a2 2 0 0 0 4 0V3M7 10v11"), p("M17 3c-1.5 0-2.5 2-2.5 5s1 4 2.5 4v9")),
    Mic: make(React.createElement("rect", { x: 9, y: 3, width: 6, height: 11, rx: 3 }), p("M6 11a6 6 0 0 0 12 0M12 17v4")),
    Ticket: make(p("M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4Z"), p("M14 6v12", { strokeDasharray: "2 3" })),
    Heart: make(p("M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.4-7 10-7 10Z")),
    Globe: make(c(12, 12, 9), p("M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18")),
    Refresh: make(p("M21 12a9 9 0 1 1-3-6.7L21 8"), p("M21 3v5h-5")),
    Download: make(p("M12 4v11m0 0 4-4m-4 4-4-4"), p("M5 19h14")),
  };
})();
