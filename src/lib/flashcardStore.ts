"use client";

import { useCallback, useEffect, useState } from "react";

import type { ScheduleStore, Sm2State, StudyMode } from "@/types/content";
import { buildCards, isDue, todayIso } from "./srs";

const SCHEDULE_KEY = "jij.srs.schedule.v2";
const STARRED_KEY = "jij.srs.starred.v1";
const STREAK_KEY = "jij.srs.streak.v1";

/** Custom event so all subscribers re-read after a mutation. */
const CHANGE_EVENT = "jij:flashcards";

const ALL_MODES: StudyMode[] = ["recognition", "recall", "kanji-reading", "cloze"];

interface StreakState {
  current: number;
  last: string | null;
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function readJson<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    /* storage may be unavailable */
  }
}

/* ------------------------------- schedule -------------------------------- */

export function readSchedule(): ScheduleStore {
  return readJson<ScheduleStore>(SCHEDULE_KEY, {});
}

export function saveCardState(cardId: string, state: Sm2State): void {
  const store = readSchedule();
  store[cardId] = state;
  writeJson(SCHEDULE_KEY, store);
}

export function resetSchedule(): void {
  writeJson(SCHEDULE_KEY, {});
}

/* ------------------------------- starred --------------------------------- */

export function readStarred(): string[] {
  return readJson<string[]>(STARRED_KEY, []);
}

export function isStarred(grammarId: string): boolean {
  return readStarred().includes(grammarId);
}

/** Toggle a grammar point in the starred deck; returns the new starred state. */
export function toggleStarred(grammarId: string): boolean {
  const set = new Set(readStarred());
  const nowStarred = !set.has(grammarId);
  if (nowStarred) set.add(grammarId);
  else set.delete(grammarId);
  writeJson(STARRED_KEY, [...set]);
  return nowStarred;
}

/* -------------------------------- streak --------------------------------- */

export function readStreak(): StreakState {
  return readJson<StreakState>(STREAK_KEY, { current: 0, last: null });
}

/** Record that the learner studied today, updating the daily streak. */
export function recordStudyToday(now: Date = new Date()): StreakState {
  const today = todayIso(now);
  const prev = readStreak();
  if (prev.last === today) return prev;

  const yesterday = todayIso(new Date(now.getTime() - 24 * 60 * 60 * 1000));
  const current = prev.last === yesterday ? prev.current + 1 : 1;
  const next = { current, last: today };
  writeJson(STREAK_KEY, next);
  return next;
}

/* -------------------------------- hooks ---------------------------------- */

/** Count due cards across all modes (new cards count as due). */
function countDue(schedule: ScheduleStore): number {
  const today = todayIso();
  let due = 0;
  for (const mode of ALL_MODES) {
    for (const card of buildCards(mode)) {
      if (isDue(schedule[card.id], today)) due += 1;
    }
  }
  return due;
}

/**
 * Reactive flashcard stats for the nav badge (due count + streak). Recomputes
 * on mount and whenever the store changes in this or another tab.
 */
export function useFlashcardStats(): { due: number; streak: number; ready: boolean } {
  const [stats, setStats] = useState({ due: 0, streak: 0 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    const recompute = () => {
      setStats({ due: countDue(readSchedule()), streak: readStreak().current });
    };
    recompute();
    window.addEventListener(CHANGE_EVENT, recompute);
    window.addEventListener("storage", recompute);
    return () => {
      window.removeEventListener(CHANGE_EVENT, recompute);
      window.removeEventListener("storage", recompute);
    };
  }, []);

  return { ...stats, ready };
}

/** Reactive starred-state hook for the "Add to flashcards" button. */
export function useStarred(grammarId: string): {
  starred: boolean;
  toggle: () => void;
  ready: boolean;
} {
  const [starred, setStarred] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    setStarred(isStarred(grammarId));
    const onChange = () => setStarred(isStarred(grammarId));
    window.addEventListener(CHANGE_EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(CHANGE_EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, [grammarId]);

  const toggle = useCallback(() => {
    setStarred(toggleStarred(grammarId));
  }, [grammarId]);

  return { starred, toggle, ready };
}
