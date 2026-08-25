import type { Flashcard } from "@/types/content";
import { vocabulary, kanji } from "./data";

/** Build the review deck from the typed vocabulary and kanji data. */
export function buildDeck(): Flashcard[] {
  const vocabCards: Flashcard[] = vocabulary.map((v) => ({
    id: `vocab:${v.word}:${v.reading}`,
    front: v.word,
    reading: v.reading,
    back: v.meaning,
    theme: v.theme,
  }));

  const kanjiCards: Flashcard[] = kanji.map((k) => ({
    id: `kanji:${k.char}`,
    front: k.char,
    back: k.meanings.join(", "),
    theme: "kanji",
  }));

  return [...kanjiCards, ...vocabCards];
}

/** Leitner-style box state persisted per card. */
export interface CardState {
  /** Box 0 (new/again) → higher = better known. */
  box: number;
  /** Timestamp (ms) of the last review. */
  last: number;
}

export type SrsStore = Record<string, CardState>;

export const SRS_STORAGE_KEY = "jij.srs.v1";
export const MAX_BOX = 4;

/** Spacing (in days) per Leitner box. Box 0 is due immediately. */
const BOX_INTERVAL_DAYS = [0, 1, 3, 7, 16];

export function isDue(state: CardState | undefined, now: number = Date.now()): boolean {
  if (!state) return true;
  const days = BOX_INTERVAL_DAYS[Math.min(state.box, MAX_BOX)];
  const dueAt = state.last + days * 24 * 60 * 60 * 1000;
  return now >= dueAt;
}

/** Apply a grade to a card's state, returning the next state. */
export function grade(state: CardState | undefined, correct: boolean, now: number = Date.now()): CardState {
  const box = state?.box ?? 0;
  return {
    box: correct ? Math.min(box + 1, MAX_BOX) : 0,
    last: now,
  };
}
