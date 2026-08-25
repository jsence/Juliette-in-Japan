"use client";

import { useState } from "react";
import type { Flashcard as FlashcardData } from "@/types/content";

interface FlashcardProps {
  card: FlashcardData;
  /** Called when the learner grades the card (used by the SRS on /review). */
  onGrade?: (correct: boolean) => void;
}

/** A tap-to-flip flashcard. Grading buttons appear once the back is shown. */
export function Flashcard({ card, onGrade }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="mx-auto w-full max-w-md">
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        className="flex min-h-[12rem] w-full flex-col items-center justify-center gap-2 rounded-xl border border-paper-300 bg-paper-50 p-8 text-center shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-hanko dark:border-sumi-border dark:bg-sumi-light"
      >
        {!flipped ? (
          <>
            <span className="font-jp text-4xl text-ink dark:text-paper-100">{card.front}</span>
            {card.reading && (
              <span className="font-jp text-sm text-ink-muted dark:text-paper-300">{card.reading}</span>
            )}
            <span className="mt-2 text-xs uppercase tracking-wide text-ink-muted dark:text-paper-300">
              Tap to reveal
            </span>
          </>
        ) : (
          <span className="text-2xl font-serif text-ink dark:text-paper-100">{card.back}</span>
        )}
      </button>

      {flipped && onGrade && (
        <div className="mt-3 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              onGrade(false);
              setFlipped(false);
            }}
            className="rounded-md border border-hanko px-4 py-2 text-sm font-medium text-hanko transition hover:bg-hanko hover:text-paper-50"
          >
            Again
          </button>
          <button
            type="button"
            onClick={() => {
              onGrade(true);
              setFlipped(false);
            }}
            className="rounded-md bg-hanko px-4 py-2 text-sm font-medium text-paper-50 transition hover:bg-hanko-dark"
          >
            Got it
          </button>
        </div>
      )}
    </div>
  );
}
