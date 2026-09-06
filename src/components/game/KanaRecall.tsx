"use client";

import { useCallback, useEffect, useState } from "react";

import type { Kana } from "@/types/content";
import {
  DEFAULT_SETTINGS,
  buildRecallDeck,
  readRecallSettings,
  shuffleDeck,
  writeRecallSettings,
  type RecallSettings,
} from "@/lib/kanaRecall";
import { RecallArena, type RecallRunStats } from "./RecallArena";
import { RecallResults } from "./RecallResults";
import { RecallSetup } from "./RecallSetup";

type Screen = "setup" | "play" | "results";

/** Kana Recall: setup → typed drill → results, with settings persisted. */
export function KanaRecall() {
  const [screen, setScreen] = useState<Screen>("setup");
  const [settings, setSettings] = useState<RecallSettings>(DEFAULT_SETTINGS);
  const [deck, setDeck] = useState<Kana[]>([]);
  const [stats, setStats] = useState<RecallRunStats | null>(null);
  const [ready, setReady] = useState(false);
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    setSettings(readRecallSettings());
    setReady(true);
  }, []);

  const updateSettings = useCallback((next: RecallSettings) => {
    setSettings(next);
    writeRecallSettings(next);
  }, []);

  const startWithDeck = useCallback((cards: Kana[]) => {
    setDeck(shuffleDeck(cards));
    setRunId((n) => n + 1);
    setScreen("play");
  }, []);

  const start = useCallback(() => {
    startWithDeck(buildRecallDeck(settings));
  }, [settings, startWithDeck]);

  const handleComplete = useCallback((run: RecallRunStats) => {
    setStats(run);
    setScreen("results");
  }, []);

  const replayFull = useCallback(() => {
    startWithDeck(buildRecallDeck(settings));
  }, [settings, startWithDeck]);

  const replayMissed = useCallback(() => {
    if (!stats || stats.flipped.length === 0) return;
    const seen = new Set<string>();
    const missed: Kana[] = [];
    for (const k of stats.flipped) {
      if (seen.has(k.char)) continue;
      seen.add(k.char);
      missed.push(k);
    }
    startWithDeck(missed);
  }, [stats, startWithDeck]);

  if (!ready) {
    return <p className="font-pixel text-xs text-ink-muted dark:text-paper-300">Loading…</p>;
  }

  if (screen === "play") {
    return (
      <section aria-label="Kana Recall drill" className="w-full">
        <RecallArena
          key={runId}
          deck={deck}
          onComplete={handleComplete}
          onQuit={() => setScreen("setup")}
        />
      </section>
    );
  }

  if (screen === "results" && stats) {
    return (
      <RecallResults
        stats={stats}
        onReplayFull={replayFull}
        onReplayMissed={replayMissed}
        onSetup={() => setScreen("setup")}
        canReplayMissed={stats.flipped.length > 0}
      />
    );
  }

  return <RecallSetup settings={settings} onChange={updateSettings} onStart={start} />;
}
