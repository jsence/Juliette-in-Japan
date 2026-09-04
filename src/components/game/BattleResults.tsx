"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { Kana } from "@/types/content";
import { addStarredKana } from "@/lib/flashcardStore";
import type { BestScore } from "@/lib/kanaGame";
import { glass } from "@/lib/ui";
import type { RunStats } from "./BattleArena";

interface BattleResultsProps {
  stats: RunStats;
  best: BestScore | null;
  onReplay: () => void;
  onSetup: () => void;
}

export function BattleResults({ stats, best, onReplay, onSetup }: BattleResultsProps) {
  const [drilled, setDrilled] = useState(false);

  /** Missed kana collapsed to unique characters with a miss count. */
  const missed = useMemo(() => {
    const counts = new Map<string, { kana: Kana; count: number }>();
    for (const k of stats.missed) {
      const entry = counts.get(k.char);
      if (entry) entry.count += 1;
      else counts.set(k.char, { kana: k, count: 1 });
    }
    return [...counts.values()].sort((a, b) => b.count - a.count);
  }, [stats.missed]);

  const accuracy = stats.answered > 0 ? (stats.correct / stats.answered) * 100 : 0;

  const drillThese = () => {
    addStarredKana(missed.map((m) => m.kana.char));
    setDrilled(true);
  };

  return (
    <div className="space-y-8">
      <section className={"rounded-xl p-6 text-center " + glass}>
        <p className="font-pixel text-sm text-hanko dark:text-hanko-light sm:text-base">
          Game over
        </p>
        <dl className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-4">
          <Stat label="Waves" value={String(stats.waves)} />
          <Stat label="Correct" value={String(stats.correct)} />
          <Stat label="Accuracy" value={`${Math.round(accuracy)}%`} />
          <Stat
            label="Avg. time"
            value={stats.correct > 0 ? `${(stats.averageMs / 1000).toFixed(2)}s` : "—"}
          />
        </dl>
        {best && (
          <p className="mt-6 font-pixel text-[0.625rem] text-ink-muted dark:text-paper-300">
            Best: wave {best.waves} · {best.correct} correct
          </p>
        )}
      </section>

      <section aria-labelledby="missed-heading" className={"rounded-xl p-6 " + glass}>
        <h2
          id="missed-heading"
          className="font-pixel text-xs text-ink dark:text-paper-100 sm:text-sm"
        >
          Kana to review
        </h2>

        {missed.length === 0 ? (
          <p className="mt-3 text-sm text-ink-light dark:text-paper-200">
            A flawless run — nothing missed.
          </p>
        ) : (
          <>
            <ul className="mt-4 flex flex-wrap gap-2">
              {missed.map(({ kana: k, count }) => (
                <li
                  key={k.char}
                  className="flex items-center gap-2 rounded-lg border border-hanko/30 bg-hanko/5 px-3 py-2"
                >
                  <span className="font-jp text-2xl font-semibold text-ink dark:text-paper-100">
                    {k.char}
                  </span>
                  <span className="text-sm text-ink-light dark:text-paper-200">{k.romaji}</span>
                  {count > 1 && (
                    <span className="rounded-full bg-hanko/15 px-1.5 py-0.5 text-[0.625rem] font-medium text-hanko dark:text-hanko-light">
                      ×{count}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={drillThese}
                disabled={drilled}
                className="rounded-md bg-hanko px-5 py-2.5 text-sm font-medium text-paper-50 transition hover:bg-hanko-dark disabled:opacity-60"
              >
                {drilled ? "Added to flashcards" : "Drill these"}
              </button>
              {drilled && (
                <Link
                  href="/language/drills"
                  className="text-sm font-medium text-hanko hover:underline dark:text-hanko-light"
                >
                  Open the Starred deck →
                </Link>
              )}
            </div>
          </>
        )}
      </section>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onReplay}
          className="group inline-flex items-center gap-2.5 rounded-md bg-hanko px-7 py-3 font-pixel text-xs text-paper-50 transition duration-300 hover:-translate-y-0.5 hover:bg-hanko-dark"
        >
          Rematch
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </button>
        <button
          type="button"
          onClick={onSetup}
          className="rounded-md border border-ink/20 px-7 py-3 font-pixel text-xs text-ink-light transition hover:bg-ink/5 dark:border-paper-100/20 dark:text-paper-200 dark:hover:bg-white/5"
        >
          Settings
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-pixel text-[0.5rem] uppercase tracking-wider text-ink-muted dark:text-paper-300">
        {label}
      </dt>
      <dd className="mt-2 font-pixel text-base text-ink dark:text-paper-100 sm:text-xl">
        {value}
      </dd>
    </div>
  );
}
