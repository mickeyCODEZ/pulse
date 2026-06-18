import { useEffect, useState } from "react";

/**
 * Returns true when the viewport is at/above the desktop breakpoint (1024px),
 * driving the mobile single-column vs desktop 3-zone shell. Mobile-first.
 */
export function useIsDesktop(breakpoint = 1024): boolean {
  const query = `(min-width: ${breakpoint}px)`;
  const [match, setMatch] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatch(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return match;
}

/** Persisted state backed by localStorage (single-user, no auth). */
export function usePersistentState<T extends string>(key: string, initial: T) {
  const storageKey = `pulse.${key}`;
  const [value, setValue] = useState<T>(() => {
    try {
      return (localStorage.getItem(storageKey) as T) ?? initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, value);
    } catch {
      /* ignore */
    }
  }, [storageKey, value]);
  return [value, setValue] as const;
}
