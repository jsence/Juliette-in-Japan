"use client";

import Link from "next/link";
import { useFlashcardStats } from "@/lib/flashcardStore";

/**
 * Compact nav indicator: a flame streak counter and a cards-due badge,
 * linking straight into the review session. Hidden until hydrated to avoid
 * a server/client mismatch (the values live in localStorage).
 */
export function FlashcardBadge({ compact = false }: { compact?: boolean }) {
  const { due, streak, ready } = useFlashcardStats();
  if (!ready) return null;

  return (
    <Link
      href="/language/n5/review"
      title={`${due} card${due === 1 ? "" : "s"} due · ${streak}-day streak`}
      className={
        "inline-flex items-center gap-2 rounded-full border border-paper-300 bg-paper-50 px-2.5 py-1 text-xs font-medium text-ink-light transition hover:border-hanko/50 dark:border-sumi-border dark:bg-sumi-light dark:text-paper-200 " +
        (compact ? "" : "")
      }
    >
      <span className="inline-flex items-center gap-1" aria-label={`${streak} day streak`}>
        <span aria-hidden="true">🔥</span>
        {streak}
      </span>
      <span className="h-3 w-px bg-paper-300 dark:bg-sumi-border" aria-hidden="true" />
      <span
        className={
          "inline-flex min-w-[1.25rem] items-center justify-center rounded-full px-1.5 " +
          (due > 0 ? "bg-hanko text-paper-50" : "text-ink-muted dark:text-paper-300")
        }
        aria-label={`${due} cards due`}
      >
        {due > 99 ? "99+" : due}
      </span>
    </Link>
  );
}
