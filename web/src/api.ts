// Typed client for the Pulse backend. The API already returns the PulseEvent
// card shape, so mapping is near-identity. Every call degrades gracefully — if
// the backend is unreachable the app falls back to bundled sample data, so the
// design always renders.
import type { City, PulseEvent } from "./data";

const BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:8000";
const TOKEN = import.meta.env.VITE_APP_TOKEN as string | undefined;

// Stable anonymous per-browser id so the backend can scope saves + preferences
// to THIS device (no accounts). This is the seam to migrate to real accounts later.
function deviceId(): string {
  const KEY = "pulse.device";
  try {
    let id = localStorage.getItem(KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `dev-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    return "anon"; // private mode with storage blocked
  }
}

function headers(): HeadersInit {
  const h: Record<string, string> = { "Content-Type": "application/json", "X-Device-Id": deviceId() };
  if (TOKEN) h["X-Pulse-Token"] = TOKEN;
  return h;
}

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(BASE + path, { ...init, headers: headers() });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return (await res.json()) as T;
}

export interface FeedQuery {
  city?: string;
  lat?: number;
  lng?: number;
  active?: string[]; // FilterBar chip keys
  q?: string;
  limit?: number;
}

function feedParams(query: FeedQuery): string {
  const p = new URLSearchParams();
  if (query.city) p.set("city", query.city);
  if (query.lat != null && query.lng != null) {
    p.set("lat", String(query.lat));
    p.set("lng", String(query.lng));
  }
  const a = query.active ?? [];
  if (a.includes("free")) p.set("free", "true");
  if (a.includes("near")) p.set("near", "true");
  if (a.includes("today")) p.set("when", "today");
  else if (a.includes("weekend")) p.set("when", "weekend");
  const CATEGORY_CHIPS = [
    "music", "art", "food", "film", "festivals", "markets", "community",
    "family", "outdoors", "sports", "fairs", "parades", "civic", "meetups",
  ];
  const cats = a.filter((k) => CATEGORY_CHIPS.includes(k));
  if (cats.length) p.set("cats", cats.join(","));
  if (query.q) p.set("q", query.q);
  if (query.limit) p.set("limit", String(query.limit));
  return p.toString();
}

export interface ApiHealth {
  status: string;
  active_events: number;
}

export const api = {
  async health(): Promise<ApiHealth> {
    return req<ApiHealth>("/health");
  },

  async feed(query: FeedQuery): Promise<{ city: string; total: number; events: PulseEvent[] }> {
    return req(`/feed?${feedParams(query)}`);
  },

  async event(id: string): Promise<PulseEvent> {
    return req(`/events/${id}`);
  },

  async action(id: string, action: "saved" | "unsaved" | "dismissed" | "clicked"): Promise<void> {
    await req(`/events/${id}/action`, { method: "POST", body: JSON.stringify({ action }) }).catch(() => {});
  },

  async saved(): Promise<{ saved_ids: string[]; events: PulseEvent[] }> {
    return req("/saved");
  },

  async digest(city?: string): Promise<{ title: string; events: PulseEvent[] }> {
    return req(`/digest${city ? `?city=${encodeURIComponent(city)}` : ""}`);
  },

  async getProfile(): Promise<Record<string, unknown>> {
    return req("/profile");
  },

  async putProfile(body: Record<string, unknown>): Promise<Record<string, unknown>> {
    return req<Record<string, unknown>>("/profile", { method: "PUT", body: JSON.stringify(body) }).catch(() => ({}));
  },

  async waitlist(email: string): Promise<{ ok: boolean }> {
    return req<{ ok: boolean }>("/waitlist", { method: "POST", body: JSON.stringify({ email }) });
  },

  async cities(): Promise<City[]> {
    const rows = await req<Array<{ name: string; country: string; count: number; lat: number; lng: number }>>("/cities");
    return rows.map((c) => ({ id: c.name, name: c.name, country: c.country, count: c.count, lat: c.lat, lng: c.lng }));
  },

  async refresh(city: string, lat?: number, lng?: number, country?: string): Promise<{ active_events: number }> {
    const p = new URLSearchParams();
    if (lat != null && lng != null) {
      p.set("lat", String(lat));
      p.set("lng", String(lng));
    }
    if (country) p.set("country", country);
    const qs = p.toString();
    return req(`/cities/${encodeURIComponent(city)}/refresh${qs ? `?${qs}` : ""}`, { method: "POST" });
  },
};

/** Probe the backend once; used to switch between live + offline (sample) mode. */
export async function backendOnline(): Promise<boolean> {
  try {
    await api.health();
    return true;
  } catch {
    return false;
  }
}
