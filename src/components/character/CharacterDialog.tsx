"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { glassStrong } from "@/lib/ui";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface CharacterDialogProps {
  /** Accessible name for the dialog. */
  label: string;
  onClose: () => void;
  /** Move to the previous character without closing. */
  onPrevious?: () => void;
  /** Move to the next character without closing. */
  onNext?: () => void;
  /** Element to focus once the dialog closes, usually the card that opened it. */
  getReturnFocus?: () => HTMLElement | null;
  children: React.ReactNode;
}

/**
 * A modal on wide screens and a full-height sheet on narrow ones.
 *
 * Closes on Escape, on a backdrop click and from the close button; keeps Tab
 * inside itself while open; and hands focus back to the element that opened it.
 * Left and right arrows step between characters without closing.
 */
export function CharacterDialog({
  label,
  onClose,
  onPrevious,
  onNext,
  getReturnFocus,
  children,
}: CharacterDialogProps) {
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const openedFrom = useRef<HTMLElement | null>(null);

  // Capture the trigger once, and hand focus back to it on the way out.
  useEffect(() => {
    openedFrom.current = document.activeElement as HTMLElement | null;

    // The lock goes on <html>, not <body>: body's overflow propagates to the
    // viewport, which drops the scroll position and shortens the area a fixed
    // overlay covers. The offset is restored either way, in case a browser
    // clamps it while scrolling is disabled.
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const scrollY = window.scrollY;
    root.style.overflow = "hidden";
    if (window.scrollY !== scrollY) window.scrollTo(0, scrollY);

    panelRef.current?.focus({ preventScroll: true });

    return () => {
      root.style.overflow = previousOverflow;
      if (window.scrollY !== scrollY) window.scrollTo(0, scrollY);
      const target = getReturnFocus?.() ?? openedFrom.current;
      target?.focus?.({ preventScroll: true });
    };
    // getReturnFocus is read at cleanup time; re-running would lose the trigger.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const trapTab = useCallback((event: KeyboardEvent) => {
    const panel = panelRef.current;
    if (!panel) return;
    const focusable = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
      (el) => el.offsetParent !== null || el === panel
    );
    if (focusable.length === 0) {
      event.preventDefault();
      panel.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && (active === first || active === panel)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "Tab") {
        trapTab(event);
        return;
      }
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === "ArrowLeft" && onPrevious) {
        event.preventDefault();
        onPrevious();
      }
      if (event.key === "ArrowRight" && onNext) {
        event.preventDefault();
        onNext();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, onNext, onPrevious, trapTab]);

  return (
    // `!m-0` matters: a parent using a Tailwind `space-y-*` utility would give
    // this element a top margin, which on a fixed element shifts the overlay down
    // and leaves an uncovered strip along the top of the viewport.
    <div className="fixed inset-0 z-50 flex !m-0 items-stretch justify-center sm:items-center sm:p-6">
      <motion.div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm dark:bg-black/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.2 }}
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={
          "relative flex max-h-full w-full flex-col overflow-hidden outline-none sm:max-w-2xl sm:rounded-2xl " +
          glassStrong
        }
        initial={{ opacity: 0, y: reduceMotion ? 0 : 18, scale: reduceMotion ? 1 : 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={
          reduceMotion ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
        }
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/40 px-4 py-3 dark:border-white/10 sm:px-6">
          <div className="flex gap-1">
            <button
              type="button"
              onClick={onPrevious}
              disabled={!onPrevious}
              aria-label="Previous character"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-white/50 text-ink-light transition hover:border-hanko/50 hover:text-hanko disabled:opacity-40 dark:border-white/10 dark:text-paper-200 dark:hover:text-hanko-light"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={!onNext}
              aria-label="Next character"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-white/50 text-ink-light transition hover:border-hanko/50 hover:text-hanko disabled:opacity-40 dark:border-white/10 dark:text-paper-200 dark:hover:text-hanko-light"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 items-center gap-1.5 rounded-md border border-white/50 px-3 text-sm font-medium text-ink-light transition hover:border-hanko/50 hover:text-hanko dark:border-white/10 dark:text-paper-200 dark:hover:text-hanko-light"
          >
            Close
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div className="overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">{children}</div>
      </motion.div>
    </div>
  );
}
