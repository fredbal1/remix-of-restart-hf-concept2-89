import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { RefObject } from "react";
import { useReducedMotion } from "./useReducedMotion";

gsap.registerPlugin(useGSAP);

export interface UseGsapRevealOptions {
  /**
   * CSS selector(s) of elements to animate, scoped to `scope.current`.
   * Defaults to `[data-reveal]`.
   */
  selector?: string;
  /** Initial Y offset in pixels. Reduced automatically on mobile. Default: 16. */
  y?: number;
  /** Animation duration in seconds. Default: 0.6. */
  duration?: number;
  /** Stagger between elements in seconds. Default: 0.08. */
  stagger?: number;
  /** GSAP ease. Default: "power2.out". */
  ease?: string;
  /**
   * Lighten the animation on small screens (smaller offset, faster duration,
   * no stagger). Default: true.
   */
  lightenOnMobile?: boolean;
  /**
   * Mobile breakpoint in CSS pixels. Default: 768.
   */
  mobileBreakpoint?: number;
}

const MOBILE_LIGHTEN_FACTOR = 0.6;

/**
 * Tiny, opt-in reveal hook built on the official GSAP React hook.
 *
 * - Runs on the client with a local scope.
 * - Respects `prefers-reduced-motion` without hiding content.
 * - Cleans up automatically on unmount.
 *
 * Usage:
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * useGsapReveal(ref);
 * return (
 *   <div ref={ref}>
 *     <h2 data-reveal>Title</h2>
 *     <p data-reveal>Body</p>
 *   </div>
 * );
 * ```
 */
export function useGsapReveal(
  scope: RefObject<HTMLElement | null>,
  options: UseGsapRevealOptions = {},
): void {
  const reduced = useReducedMotion();

  const {
    selector = "[data-reveal]",
    y = 16,
    duration = 0.6,
    stagger = 0.08,
    ease = "power2.out",
    lightenOnMobile = true,
    mobileBreakpoint = 768,
  } = options;

  function prefersReducedMotionNow(): boolean {
    return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  useGSAP(
    () => {
      if (reduced || prefersReducedMotionNow()) return;
      if (!scope.current) return;

      const targets = scope.current.querySelectorAll<HTMLElement>(selector);
      if (targets.length === 0) return;

      const isMobile =
        lightenOnMobile &&
        typeof window !== "undefined" &&
        window.innerWidth <= mobileBreakpoint;

      const effectiveY = isMobile ? Math.round(y * MOBILE_LIGHTEN_FACTOR) : y;
      const effectiveDuration = isMobile ? duration * MOBILE_LIGHTEN_FACTOR : duration;
      const effectiveStagger = isMobile ? 0 : stagger;

      gsap.fromTo(
        targets,
        { autoAlpha: 0, y: effectiveY },
        {
          autoAlpha: 1,
          y: 0,
          duration: effectiveDuration,
          stagger: effectiveStagger,
          ease,
          clearProps: "transform,opacity,visibility",
        },
      );
    },
    {
      scope,
      dependencies: [reduced, selector, y, duration, stagger, ease, lightenOnMobile, mobileBreakpoint],
    },
  );
}
