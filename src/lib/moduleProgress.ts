"use client";

import { useCallback, useEffect, useState } from "react";

/** The four N5 modules that track per-item completion. */
export type ModuleKey = "kana" | "kanji" | "grammar" | "vocabulary";

const STORAGE_KEY = "jij.modules.v1";
const CHANGE_EVENT = "jij:modules";

type Store = Partial<Record<ModuleKey, string[]>>;

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function readStore(): Store {
  if (!isBrowser()) return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Store) : {};
  } catch {
    return {};
  }
}

function writeStore(store: Store): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    /* storage may be unavailable */
  }
}

function readModule(module: ModuleKey): string[] {
  return readStore()[module] ?? [];
}

/** Toggle an item's learned state within a module; returns the new state. */
export function toggleLearned(module: ModuleKey, itemId: string): boolean {
  const store = readStore();
  const set = new Set(store[module] ?? []);
  const learned = !set.has(itemId);
  if (learned) set.add(itemId);
  else set.delete(itemId);
  store[module] = [...set];
  writeStore(store);
  return learned;
}

function useChangeSubscription(handler: () => void): void {
  useEffect(() => {
    window.addEventListener(CHANGE_EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(CHANGE_EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, [handler]);
}

/** Reactive per-item learned state + toggle for a single module. */
export function useModuleProgress(module: ModuleKey) {
  const [learned, setLearned] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => setLearned(readModule(module)), [module]);

  useEffect(() => {
    setReady(true);
    refresh();
  }, [refresh]);
  useChangeSubscription(refresh);

  const isLearned = useCallback((id: string) => learned.includes(id), [learned]);
  const toggle = useCallback(
    (id: string) => setLearned(() => {
      toggleLearned(module, id);
      return readModule(module);
    }),
    [module]
  );

  return { learned, count: learned.length, isLearned, toggle, ready };
}

/** Reactive learned counts for every module (used by the hub progress bars). */
export function useModuleCounts(): { counts: Record<ModuleKey, number>; ready: boolean } {
  const [counts, setCounts] = useState<Record<ModuleKey, number>>({
    kana: 0,
    kanji: 0,
    grammar: 0,
    vocabulary: 0,
  });
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => {
    const store = readStore();
    setCounts({
      kana: store.kana?.length ?? 0,
      kanji: store.kanji?.length ?? 0,
      grammar: store.grammar?.length ?? 0,
      vocabulary: store.vocabulary?.length ?? 0,
    });
  }, []);

  useEffect(() => {
    setReady(true);
    refresh();
  }, [refresh]);
  useChangeSubscription(refresh);

  return { counts, ready };
}
