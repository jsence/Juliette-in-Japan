"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { Kana } from "@/types/content";
import { addStarredKana } from "@/lib/flashcardStore";
import { glass } from "@/lib/ui";
import type { RecallRunStats } from "./RecallArena";

interface RecallResultsProps {
  stats: RecallRunStats;
  onReplayFull: () => void;
  onReplayMissed: () => void;
  onSetup: () => void;
  canReplayMissed: boolean;
}

function formatElapsed(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  if (min > 0) return `${min}m ${sec}s`;
  return `${(ms / 1000).toFixed(1)}s`;
}

export function RecallResults({
  stats,
  onReplayFull,
  onReplayMissed,
  onSetup,
  canReplayMissed,
}: RecallResultsProps) {
  const [drilled, setDrilled] = useState(false);

  const review = useMemo(() => {
    const seen = new Set<string>();
    const out: Kana[] = [];
    for (const k of stats.flipped) {
      if (seen.has(k.char)) continue;
      seen.add(k.char);
      out.push(k);
    }
    return out;
  }, [stats.flipped]);

  const recallPct =
    stats.total > 0 ? Math.round((stats.recalledWithoutFlip / stats.total) * 100) : 0;

  const drillThese = () => {
    addStarredKana(review.map((k) => k.char));
    setDrilled(true);
  };

  return (
    <div className="space-y-8">
      <section className={"rounded-xl p-6 text-center " + glass}>
        <p className="font-pixel text-sm text-hanko dark:text-hanko-light sm:text-base">
          Session complete
        </p>
        <dl className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-4">
          <Stat label="Time" value={formatElapsed(stats.elapsedMs)} />
          <Stat label="Cards" value={String(stats.completed)} />
          <Stat label="Recalled" value={String(stats.recalledWithoutFlip)} />
          <Stat label="Recall rate" value={`${recallPct}%`} />
        </dl>
        <p className="mt-5 text-sm text-ink-light dark:text-paper-200">
          Recalled without flipping: {stats.recalledWithoutFlip} of {stats.total} (
          {recallPct}%).
        </p>
      </section>

      <section aria-labelledby="review-heading" className={"rounded-xl p-6 " + glass}>
        <h2
          id="review-heading"
          className="font-pixel text-xs text-ink dark:text-paper-100 sm:text-sm"
        >
          To review
        </h2>
        <p className="mt-2 text-sm text-ink-light dark:text-paper-200">
          Only cards you flipped appear here — mistyped answers are not counted as misses. Flip
          means you needed to peek before you could type the reading.
        </p>

        {review.length === 0 ? (
          <p className="mt-4 text-sm text-ink-light dark:text-paper-200">
            Every card recalled from memory — nothing to review.
          </p>
        ) : (
          <>
            <ul className="mt-4 flex flex-wrap gap-2">
              {review.map((k) => (
                <li
                  key={k.char}
                  className="flex items-center gap-2 rounded-lg border border-hanko/30 bg-hanko/5 px-3 py-2"
                >
                  <span className="font-jp text-2xl font-semibold text-ink dark:text-paper-100">
                    {k.char}
                  </span>
                  <span className="text-sm text-ink-light dark:text-paper-200">{k.romaji}</span>
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
        {canReplayMissed && review.length > 0 && (
          <button
            type="button"
            onClick={onReplayMissed}
            className="rounded-md border border-hanko/40 bg-hanko/10 px-6 py-3 font-pixel text-[0.625rem] text-hanko transition hover:bg-hanko/20 dark:text-hanko-light sm:text-xs"
          >
            Replay these only
          </button>
        )}
        <button
          type="button"
          onClick={onReplayFull}
          className="group inline-flex items-center gap-2.5 rounded-md bg-hanko px-7 py-3 font-pixel text-xs text-paper-50 transition duration-300 hover:-translate-y-0.5 hover:bg-hanko-dark"
        >
          Replay full deck
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
          Back to setup
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
