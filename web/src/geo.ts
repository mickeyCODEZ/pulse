// Browser geolocation → city. Uses the Geolocation API (works on localhost +
// HTTPS) and BigDataCloud's free, no-key, CORS-enabled reverse geocoder to turn
// coordinates into a city name. Returns null if the user denies or it's
// unavailable, so the caller can fall back to a default city.
import type { City } from "./data";

export interface DetectedLocation {
  lat: number;
  lng: number;
  city: string;
  country: string;
}

function getPosition(): Promise<GeolocationPosition | null> {
  if (typeof navigator === "undefined" || !("geolocation" in navigator)) return Promise.resolve(null);
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos),
      () => resolve(null),
      { timeout: 8000, maximumAge: 10 * 60 * 1000, enableHighAccuracy: false },
    );
  });
}

export async function detectLocation(): Promise<DetectedLocation | null> {
  const pos = await getPosition();
  if (!pos) return null;
  const { latitude: lat, longitude: lng } = pos.coords;
  let city = "Your area";
  let country = "";
  try {
    const r = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
    );
    const j = await r.json();
    city = j.city || j.locality || j.principalSubdivision || city;
    country = j.countryName || "";
  } catch {
    /* keep the coordinates even if reverse-geocoding fails */
  }
  return { lat, lng, city, country };
}

/** Build a City object from a detected location. */
export function locationToCity(loc: DetectedLocation): City {
  return { id: "here", name: loc.city, country: loc.country, count: 0, lat: loc.lat, lng: loc.lng };
}

/**
 * Forward-search cities worldwide by name via Open-Meteo's free, keyless,
 * CORS-enabled geocoding API. Returns City objects (with country + coords, which
 * the backend needs for all-types Eventbrite coverage). Empty array on failure.
 */
export async function searchCities(query: string, count = 6): Promise<City[]> {
  const q = query.trim();
  if (q.length < 2) return [];
  try {
    const r = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=${count}&language=en&format=json`,
    );
    const j = await r.json();
    const results: any[] = Array.isArray(j?.results) ? j.results : [];
    return results.map((c) => ({
      id: `geo:${c.id ?? `${c.latitude},${c.longitude}`}`,
      name: c.name as string,
      country: (c.country as string) || "",
      count: 0,
      lat: c.latitude as number,
      lng: c.longitude as number,
      // admin1 (state/region) helps disambiguate same-named cities in the UI
      region: (c.admin1 as string) || "",
    })) as City[];
  } catch {
    return [];
  }
}
