import { useCallback, useEffect } from "react";

type ScrollLockSnapshot = {
  scrollX: number;
  scrollY: number;
  htmlOverflow: string;
  bodyOverflow: string;
  bodyPosition: string;
  bodyTop: string;
  bodyLeft: string;
  bodyRight: string;
  bodyPaddingRight: string;
};

let scrollLockCount = 0;
let scrollLockSnapshot: ScrollLockSnapshot | null = null;

function lockScroll() {
  if (typeof window === "undefined") return;

  scrollLockCount += 1;
  if (scrollLockCount > 1) return;

  const { documentElement, body } = document;
  const scrollbarWidth = Math.max(0, window.innerWidth - documentElement.clientWidth);

  scrollLockSnapshot = {
    scrollX: window.scrollX,
    scrollY: window.scrollY,
    htmlOverflow: documentElement.style.overflow,
    bodyOverflow: body.style.overflow,
    bodyPosition: body.style.position,
    bodyTop: body.style.top,
    bodyLeft: body.style.left,
    bodyRight: body.style.right,
    bodyPaddingRight: body.style.paddingRight,
  };

  documentElement.style.overflow = "hidden";
  body.style.overflow = "hidden";
  body.style.position = "fixed";
  body.style.top = `-${scrollLockSnapshot.scrollY}px`;
  body.style.left = "0";
  body.style.right = "0";
  body.style.paddingRight = scrollbarWidth > 0 ? `${scrollbarWidth}px` : scrollLockSnapshot.bodyPaddingRight;
}

function unlockScroll() {
  if (typeof window === "undefined" || scrollLockCount === 0) return;

  scrollLockCount -= 1;
  if (scrollLockCount > 0) return;
  if (!scrollLockSnapshot) return;

  const { documentElement, body } = document;
  const { scrollX, scrollY } = scrollLockSnapshot;

  documentElement.style.overflow = scrollLockSnapshot.htmlOverflow;
  body.style.overflow = scrollLockSnapshot.bodyOverflow;
  body.style.position = scrollLockSnapshot.bodyPosition;
  body.style.top = scrollLockSnapshot.bodyTop;
  body.style.left = scrollLockSnapshot.bodyLeft;
  body.style.right = scrollLockSnapshot.bodyRight;
  body.style.paddingRight = scrollLockSnapshot.bodyPaddingRight;

  scrollLockSnapshot = null;
  window.scrollTo(scrollX, scrollY);
}

export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    lockScroll();

    return () => {
      unlockScroll();
    };
  }, [locked]);
}

export function useFocusTrap(ref: React.RefObject<HTMLElement | null>, active: boolean) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!active || !ref.current) return;
      if (e.key !== "Tab") return;

      const focusable = ref.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [active, ref]
  );

  useEffect(() => {
    if (active) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [active, handleKeyDown]);
}
