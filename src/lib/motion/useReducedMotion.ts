import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * SSR-safe hook that returns whether the user prefers reduced motion.
 *
 * - Returns `false` during SSR / first render (no DOM access during render).
 * - Reads `window.matchMedia` only inside `useEffect` (client-only).
 * - Subscribes to preference changes and cleans up on unmount.
 *
 * Use this to gate any GSAP / non-essential animation. When it returns `true`,
 * skip the animation entirely and render the final, static state.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mql = window.matchMedia(QUERY);
    setReduced(mql.matches);

    const handler = (event: MediaQueryListEvent) => {
      setReduced(event.matches);
    };

    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", handler);
      return () => mql.removeEventListener("change", handler);
    }

    // Legacy Safari fallback
    mql.addListener(handler);
    return () => mql.removeListener(handler);
  }, []);

  return reduced;
}
