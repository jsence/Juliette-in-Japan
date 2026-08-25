"use client";

import { useEffect, useMemo, useState } from "react";

import { Flashcard } from "./Flashcard";
import { ProgressBar } from "./ProgressBar";
import {
  buildDeck,
  grade,
  isDue,
  MAX_BOX,
  SRS_STORAGE_KEY,
  type SrsStore,
} from "@/lib/srs";

/** A self-contained flashcard review session with a localStorage-backed SRS. */
export function ReviewDeck() {
  const deck = useMemo(() => buildDeck(), []);
  const [store, setStore] = useState<SrsStore>({});
  const [loaded, setLoaded] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SRS_STORAGE_KEY);
      if (raw) setStore(JSON.parse(raw) as SrsStore);
    } catch {
      /* ignore malformed storage */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(SRS_STORAGE_KEY, JSON.stringify(store));
      } catch {
        /* storage may be unavailable */
      }
    }
  }, [store, loaded]);

  const dueCards = useMemo(
    () => (loaded ? deck.filter((c) => isDue(store[c.id])) : []),
    [deck, store, loaded]
  );

  const learned = useMemo(
    () => Object.values(store).filter((s) => s.box >= MAX_BOX).length,
    [store]
  );

  if (!loaded) {
    return <p className="text-ink-muted dark:text-paper-300">Loading your deck…</p>;
  }

  const card = dueCards[index % Math.max(dueCards.length, 1)];

  const handleGrade = (correct: boolean) => {
    if (!card) return;
    setStore((prev) => ({ ...prev, [card.id]: grade(prev[card.id], correct) }));
    setIndex((i) => i + 1);
  };

  const resetProgress = () => {
    setStore({});
    setIndex(0);
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Total cards" value={deck.length} />
        <Stat label="Due now" value={dueCards.length} />
        <Stat label="Mastered" value={learned} />
      </div>

      <ProgressBar value={learned} max={deck.length} label="Mastered (reached the final box)" />

      {dueCards.length > 0 && card ? (
        <div className="space-y-2">
          <p className="text-center text-sm text-ink-muted dark:text-paper-300">
            {dueCards.length} due · reveal, then grade yourself honestly
          </p>
          <Flashcard card={card} onGrade={handleGrade} />
        </div>
      ) : (
        <div className="rounded-xl border border-paper-300 bg-paper-50 p-8 text-center dark:border-sumi-border dark:bg-sumi-light">
          <p className="font-serif text-xl text-ink dark:text-paper-100">Nothing due right now.</p>
          <p className="mt-1 text-sm text-ink-muted dark:text-paper-300">
            Come back tomorrow — spaced repetition works best when you don&apos;t cram.
          </p>
        </div>
      )}

      <div className="text-center">
        <button
          type="button"
          onClick={resetProgress}
          className="text-xs text-ink-muted underline-offset-2 hover:text-hanko hover:underline dark:text-paper-300 dark:hover:text-hanko-light"
        >
          Reset my progress
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-paper-300 bg-paper-50 p-4 text-center dark:border-sumi-border dark:bg-sumi-light">
      <p className="font-serif text-2xl font-bold text-hanko dark:text-hanko-light">{value}</p>
      <p className="text-xs uppercase tracking-wide text-ink-muted dark:text-paper-300">{label}</p>
    </div>
  );
}
