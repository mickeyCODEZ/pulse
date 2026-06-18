// Client-side .ics export + native share. No dependencies — builds the calendar
// text and triggers a download / Web Share.
import type { PulseEvent } from "./data";

function fmt(dt: Date): string {
  return dt.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}
function esc(s: string): string {
  return (s || "").replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
}

function toVEVENT(e: PulseEvent): string {
  const start = e.start ? new Date(e.start) : new Date();
  const end = new Date(start.getTime() + 2 * 3600 * 1000);
  return [
    "BEGIN:VEVENT",
    `UID:${e.id}@pulse`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${esc(e.title)}`,
    `LOCATION:${esc(e.venue || "")}`,
    `DESCRIPTION:${esc((e.blurb || "") + (e.url ? `\n${e.url}` : ""))}`,
    e.url ? `URL:${e.url}` : "",
    "END:VEVENT",
  ]
    .filter(Boolean)
    .join("\r\n");
}

export function downloadICS(events: PulseEvent[], filename = "pulse.ics"): void {
  if (!events.length) return;
  const body = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Pulse//Event Radar//EN", ...events.map(toVEVENT), "END:VCALENDAR"].join("\r\n");
  const url = URL.createObjectURL(new Blob([body], { type: "text/calendar;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function shareEvent(e: PulseEvent): Promise<void> {
  const link = e.url || `${location.origin}${location.pathname}?screen=detail&event=${e.id}`;
  const data = { title: e.title, text: `${e.title} — ${e.date} · ${e.venue}`, url: link };
  try {
    if (navigator.share) {
      await navigator.share(data);
      return;
    }
  } catch {
    /* user cancelled or unsupported → fall through to clipboard */
  }
  try {
    await navigator.clipboard.writeText(link);
  } catch {
    /* ignore */
  }
}
