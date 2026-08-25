"use client";

import { useCallback, useEffect, useState } from "react";

import type { ScheduleStore, Sm2State } from "@/types/content";

const SCHEDULE_KEY = "jij.srs.schedule.v2";
const STARRED_KEY = "jij.srs.starred.v1";

/** Custom event so all subscribers re-read after a mutation. */
const CHANGE_EVENT = "jij:flashcards";

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

/* -------------------------------- hooks ---------------------------------- */

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
