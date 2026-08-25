"use client";

import { useCallback, useEffect, useState } from "react";

const COMPLETED_KEY = "jij.lessons.completed.v1";
const CHANGE_EVENT = "jij:lessons";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function readCompleted(): string[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(COMPLETED_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeCompleted(ids: string[]): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(COMPLETED_KEY, JSON.stringify(ids));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    /* storage may be unavailable */
  }
}

/** Reactive access to the set of completed lesson ids. */
export function useLessonProgress() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    setCompleted(readCompleted());
    const onChange = () => setCompleted(readCompleted());
    window.addEventListener(CHANGE_EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(CHANGE_EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const isComplete = useCallback((id: string) => completed.includes(id), [completed]);

  const setComplete = useCallback((id: string, done: boolean) => {
    const set = new Set(readCompleted());
    if (done) set.add(id);
    else set.delete(id);
    const next = [...set];
    writeCompleted(next);
    setCompleted(next);
  }, []);

  return { completed, isComplete, setComplete, ready };
}
