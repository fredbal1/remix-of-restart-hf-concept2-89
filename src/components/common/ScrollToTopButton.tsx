import { useEffect, useState, useCallback, forwardRef } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const SCROLL_THRESHOLD = 480;

export const ScrollToTopButton = forwardRef<HTMLButtonElement>(
  function ScrollToTopButton(_, ref) {
    const [visible, setVisible] = useState(false);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
      const onScroll = () => {
        setVisible(window.scrollY >= SCROLL_THRESHOLD);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = useCallback(() => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    }, [prefersReducedMotion]);

    return (
      <button
        ref={ref}
        type="button"
        aria-label="Remonter en haut"
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-5 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-hf-border-soft bg-hf-surface-card text-hf-strong shadow-[0_16px_28px_-22px_rgba(0,0,0,0.26)] transition-[transform,background-color,border-color,box-shadow,opacity] duration-200 ease-out hover:-translate-y-px hover:border-hf-ink-soft hover:bg-hf-surface-muted hover:shadow-[0_20px_32px_-22px_rgba(0,0,0,0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hf-ink active:translate-y-px",
          "lg:bottom-6 lg:right-6 lg:w-12 lg:h-12",
          "motion-reduce:transition-none",
          visible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-3 pointer-events-none"
        )}
      >
        <ArrowUp aria-hidden="true" />
      </button>
    );
  }
);

ScrollToTopButton.displayName = "ScrollToTopButton";
