"use client";

import { useStarred } from "@/lib/flashcardStore";

interface AddToFlashcardsProps {
  grammarId: string;
}

/** Toggle button that stars a grammar point into the flashcard "Starred" deck. */
export function AddToFlashcards({ grammarId }: AddToFlashcardsProps) {
  const { starred, toggle, ready } = useStarred(grammarId);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={starred}
      disabled={!ready}
      className={
        "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition disabled:opacity-60 " +
        (starred
          ? "bg-hanko text-paper-50 hover:bg-hanko-dark"
          : "border border-hanko text-hanko hover:bg-hanko/10 dark:hover:bg-hanko/20")
      }
    >
      <span aria-hidden="true">{starred ? "★" : "☆"}</span>
      {starred ? "Added to flashcards" : "Add to flashcards"}
    </button>
  );
}
