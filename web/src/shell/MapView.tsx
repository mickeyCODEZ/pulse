// Real interactive map (Leaflet + CARTO basemaps), themed to the editorial look.
// Pins at true venue coords, clustering, click→open, selection sync, a "near me"
// radius ring, and a recenter control. Vanilla Leaflet via refs (no react-leaflet).
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import type { PulseEvent } from "../data";

const TILES = {
  light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
};
const ATTRIB = '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> &copy; <a href="https://carto.com">CARTO</a>';
const GEM_SVG =
  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l2.5 5.2 5.5.6-4 3.8 1 5.4L12 17l-5 2.8 1-5.4-4-3.8 5.5-.6z"/></svg>';

function pinLabel(e: PulseEvent): string {
  return e.free ? "Free" : e.price != null ? `$${e.price}` : "•";
}

function pinHTML(e: PulseEvent, selected: boolean): string {
  const cls = ["pulse-pin", selected ? "sel" : "", e.gem ? "gem" : ""].filter(Boolean).join(" ");
  return `<div class="${cls}">${e.gem ? GEM_SVG : ""}${pinLabel(e)}</div>`;
}

// Real, clickable hit-box: size the divIcon to the pill so the whole pin is
// tappable (a [0,0] icon has effectively no hit area). Width is estimated from
// the label since the marker is created before layout.
function pinIconSize(e: PulseEvent): [number, number] {
  const w = Math.max(26, 20 + pinLabel(e).length * 7 + (e.gem ? 16 : 0));
  return [w, 24];
}

// The card that pops up when a pin is clicked — image, tags, title, meta and a
// clear "View details" button that opens the full event.
function popupCardHTML(e: PulseEvent): string {
  const price = e.free ? "Free" : e.price != null ? `$${e.price}` : null;
  const tags = [e.category, price].filter(Boolean).map((t) => `<span class="pulse-pop-tag">${t}</span>`).join("");
  const meta = [e.date, e.venue, e.distance].filter(Boolean).join(" · ");
  const img = e.imageUrl
    ? `<div class="pulse-pop-img" style="background-image:url('${e.imageUrl.replace(/'/g, "%27")}')"></div>`
    : "";
  return `${img}<div class="pulse-pop-body">
    ${tags ? `<div class="pulse-pop-tags">${tags}</div>` : ""}
    <div class="pulse-pop-title">${e.title}</div>
    ${meta ? `<div class="pulse-pop-meta">${meta}</div>` : ""}
    <button class="pulse-pop-btn" data-ev="${e.id}">View details →</button>
  </div>`;
}

function makeIcon(e: PulseEvent, selected: boolean): L.DivIcon {
  const [w, h] = pinIconSize(e);
  return L.divIcon({ html: pinHTML(e, selected), className: "pulse-pin-icon", iconSize: [w, h], iconAnchor: [w / 2, h / 2] });
}

export interface MapViewProps {
  events: PulseEvent[];
  selectedId?: string;
  theme: string;
  userLoc?: { lat: number; lng: number } | null;
  radiusKm?: number | null; // draw a "near me" ring when set
  onSelect?: (e: PulseEvent) => void; // open detail
  onHover?: (id: string) => void; // sync highlight back to the feed
  className?: string;
}

export function MapView({ events, selectedId, theme, userLoc, radiusKm, onSelect, onHover, className }: MapViewProps) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileRef = useRef<L.TileLayer | null>(null);
  const clusterRef = useRef<any>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const ringRef = useRef<L.Layer | null>(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;
  const onHoverRef = useRef(onHover);
  onHoverRef.current = onHover;

  const withCoords = events.filter((e) => e.lat != null && e.lng != null);
  // refs so the once-built popup handler / icon rebuilds see current values
  const eventsRef = useRef(withCoords);
  eventsRef.current = withCoords;
  const selectedIdRef = useRef(selectedId);
  selectedIdRef.current = selectedId;
  const prevSelRef = useRef<string | undefined>(undefined);

  // ---- create the map once ----
  useEffect(() => {
    if (!elRef.current || mapRef.current) return;
    const map = L.map(elRef.current, { zoomControl: true, attributionControl: true, scrollWheelZoom: true });
    mapRef.current = map;
    map.setView([39, -30], 2);
    tileRef.current = L.tileLayer(theme === "dark" ? TILES.dark : TILES.light, { attribution: ATTRIB, maxZoom: 19 }).addTo(map);
    const cluster = (L as any).markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 48,
      iconCreateFunction: (c: any) =>
        L.divIcon({ html: `<div class="pulse-cluster">${c.getChildCount()}</div>`, className: "", iconSize: [38, 38] }),
    });
    clusterRef.current = cluster;
    map.addLayer(cluster);

    // wire the popup card's "View details" button to open the full event
    map.on("popupopen", (ev: any) => {
      const el: HTMLElement | undefined = ev.popup.getElement();
      const btn = el?.querySelector(".pulse-pop-btn") as HTMLButtonElement | null;
      if (!btn) return;
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-ev");
        const ev2 = eventsRef.current.find((x) => x.id === id);
        if (ev2) onSelectRef.current?.(ev2);
      };
    });
    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- keep tiles correct when the container is resized (drag/expand) ----
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !elRef.current || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => map.invalidateSize({ animate: false }));
    ro.observe(elRef.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- theme → swap tiles ----
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !tileRef.current) return;
    map.removeLayer(tileRef.current);
    tileRef.current = L.tileLayer(theme === "dark" ? TILES.dark : TILES.light, { attribution: ATTRIB, maxZoom: 19 }).addTo(map);
    tileRef.current.bringToBack();
  }, [theme]);

  // ---- events → markers (+ fit bounds) ----
  useEffect(() => {
    const map = mapRef.current;
    const cluster = clusterRef.current;
    if (!map || !cluster) return;
    cluster.clearLayers();
    markersRef.current.clear();
    for (const e of withCoords) {
      const marker = L.marker([e.lat!, e.lng!], { icon: makeIcon(e, e.id === selectedIdRef.current), riseOnHover: true });
      // click a pin → pop up its card (and highlight it in the feed). The card's
      // "View details" button opens the full event.
      marker.bindPopup(popupCardHTML(e), { closeButton: true, offset: [0, -10], minWidth: 210, maxWidth: 250, className: "pulse-pop", autoPanPadding: [24, 24] });
      marker.on("click", () => onHoverRef.current?.(e.id));
      marker.on("mouseover", () => onHoverRef.current?.(e.id));
      cluster.addLayer(marker);
      markersRef.current.set(e.id, marker);
    }
    const pts = withCoords.map((e) => [e.lat!, e.lng!]) as [number, number][];
    if (pts.length) map.fitBounds(L.latLngBounds(pts).pad(0.2), { animate: false, maxZoom: 14 });
    // give the container a beat to size, then fix tile rendering
    setTimeout(() => map.invalidateSize(), 60);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events.map((e) => e.id).join(",")]);

  // ---- selection → re-style the affected pins only (no map movement, so a
  //      click never "refreshes" or re-centres the map) ----
  useEffect(() => {
    if (!mapRef.current) return;
    for (const id of [prevSelRef.current, selectedId]) {
      if (!id) continue;
      const e = withCoords.find((x) => x.id === id);
      const m = markersRef.current.get(id);
      if (e && m) m.setIcon(makeIcon(e, id === selectedId));
    }
    prevSelRef.current = selectedId;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  // ---- "near me" radius ring + you-are-here ----
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (ringRef.current) {
      map.removeLayer(ringRef.current);
      ringRef.current = null;
    }
    if (userLoc) {
      // SVG attributes can't resolve CSS vars — read the resolved spot colour.
      const spot = getComputedStyle(document.documentElement).getPropertyValue("--spot").trim() || "#9E2B23";
      const group = L.layerGroup();
      if (radiusKm) {
        L.circle([userLoc.lat, userLoc.lng], {
          radius: radiusKm * 1000,
          color: spot,
          weight: 1.5,
          fillColor: spot,
          fillOpacity: 0.06,
        }).addTo(group);
      }
      L.marker([userLoc.lat, userLoc.lng], { icon: L.divIcon({ html: '<div class="pulse-here"></div>', className: "", iconSize: [0, 0] }) }).addTo(group);
      group.addTo(map);
      ringRef.current = group;
    }
  }, [userLoc?.lat, userLoc?.lng, radiusKm, theme]);

  return (
    <div className={`pulse-map ${className || ""}`} style={{ position: "relative" }}>
      <div ref={elRef} style={{ width: "100%", height: "100%" }} />
      <button
        className="pulse-map-btn"
        style={{ bottom: 12, right: 12 }}
        onClick={() => {
          const map = mapRef.current;
          const pts = withCoords.map((e) => [e.lat!, e.lng!]) as [number, number][];
          if (map && pts.length) map.fitBounds(L.latLngBounds(pts).pad(0.2), { maxZoom: 14 });
        }}
      >
        Fit all
      </button>
    </div>
  );
}
