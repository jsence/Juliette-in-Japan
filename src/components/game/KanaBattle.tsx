"use client";

import { useCallback, useEffect, useState } from "react";

import {
  DEFAULT_SETTINGS,
  readBest,
  readSettings,
  saveBest,
  writeSettings,
  type BestScore,
  type GameSettings,
} from "@/lib/kanaGame";
import { BattleArena, type RunStats } from "./BattleArena";
import { BattleResults } from "./BattleResults";
import { BattleSetup } from "./BattleSetup";

type Screen = "setup" | "battle" | "results";

/** Kana Battle: setup → duel → results, with settings and best score persisted. */
export function KanaBattle() {
  const [screen, setScreen] = useState<Screen>("setup");
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);
  const [best, setBest] = useState<BestScore | null>(null);
  const [stats, setStats] = useState<RunStats | null>(null);
  const [ready, setReady] = useState(false);
  /** Bumped on each run so the arena remounts with fresh state. */
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    setSettings(readSettings());
    setBest(readBest());
    setReady(true);
  }, []);

  const updateSettings = useCallback((next: GameSettings) => {
    setSettings(next);
    writeSettings(next);
  }, []);

  const start = useCallback(() => {
    setRunId((n) => n + 1);
    setScreen("battle");
  }, []);

  const handleGameOver = useCallback((run: RunStats) => {
    setStats(run);
    setBest(
      saveBest({
        waves: run.waves,
        correct: run.correct,
        accuracy: run.answered > 0 ? (run.correct / run.answered) * 100 : 0,
      })
    );
    setScreen("results");
  }, []);

  if (!ready) {
    return (
      <p className="font-pixel text-xs text-ink-muted dark:text-paper-300">Loading…</p>
    );
  }

  if (screen === "battle") {
    return (
      <BattleArena
        key={runId}
        settings={settings}
        onGameOver={handleGameOver}
        onQuit={() => setScreen("setup")}
      />
    );
  }

  if (screen === "results" && stats) {
    return (
      <BattleResults
        stats={stats}
        best={best}
        onReplay={start}
        onSetup={() => setScreen("setup")}
      />
    );
  }

  return (
    <BattleSetup
      settings={settings}
      onChange={updateSettings}
      onStart={start}
      best={best}
    />
  );
}
