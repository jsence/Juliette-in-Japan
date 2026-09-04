"use client";

import {
  KANA_ROWS,
  SPEED_PRESETS,
  buildPool,
  rowSize,
  type ChoiceCount,
  type GameSettings,
  type SpeedKey,
  type BestScore,
} from "@/lib/kanaGame";
import { glass } from "@/lib/ui";

interface BattleSetupProps {
  settings: GameSettings;
  onChange: (settings: GameSettings) => void;
  onStart: () => void;
  best: BestScore | null;
}

const CHOICE_OPTIONS: ChoiceCount[] = [2, 3, 4];
const SPEED_ORDER: SpeedKey[] = ["relaxed", "normal", "hard"];

export function BattleSetup({ settings, onChange, onStart, best }: BattleSetupProps) {
  const poolSize = buildPool(settings.rowIds).length;
  const canStart = settings.rowIds.length > 0 && poolSize > 0;

  const toggleRow = (id: string) => {
    const next = settings.rowIds.includes(id)
      ? settings.rowIds.filter((r) => r !== id)
      : [...settings.rowIds, id];
    onChange({ ...settings, rowIds: next });
  };

  return (
    <div className="space-y-8">
      <section aria-labelledby="rows-heading" className={"rounded-xl p-5 sm:p-6 " + glass}>
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2
            id="rows-heading"
            className="font-pixel text-xs text-ink dark:text-paper-100 sm:text-sm"
          >
            Choose your kana
          </h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onChange({ ...settings, rowIds: KANA_ROWS.map((r) => r.id) })}
              className="rounded-md border border-ai/40 px-3 py-1 text-xs font-medium text-ai transition hover:bg-ai/10 dark:border-ai-light/30 dark:text-ai-light"
            >
              Select all
            </button>
            <button
              type="button"
              onClick={() => onChange({ ...settings, rowIds: [] })}
              className="rounded-md border border-ink/20 px-3 py-1 text-xs font-medium text-ink-muted transition hover:bg-ink/5 dark:border-paper-100/20 dark:text-paper-300 dark:hover:bg-white/5"
            >
              Select none
            </button>
          </div>
        </div>

        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {KANA_ROWS.map((row) => {
            const checked = settings.rowIds.includes(row.id);
            return (
              <li key={row.id}>
                <label
                  className={
                    "flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition " +
                    (checked
                      ? "border-hanko/50 bg-hanko/10"
                      : "border-white/50 bg-white/30 hover:bg-white/50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10")
                  }
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleRow(row.id)}
                    className="h-4 w-4 shrink-0 accent-hanko"
                  />
                  <span className="min-w-0">
                    <span className="block font-jp text-base font-semibold text-ink dark:text-paper-100">
                      {row.label}
                    </span>
                    <span className="block truncate text-xs text-ink-muted dark:text-paper-300">
                      {row.hint} · {rowSize(row)} kana
                    </span>
                  </span>
                </label>
              </li>
            );
          })}
        </ul>

        <p className="mt-4 text-sm text-ink-muted dark:text-paper-300">
          {poolSize > 0
            ? `${poolSize} kana in the pool.`
            : "Select at least one row to begin."}
        </p>
      </section>

      <div className="grid gap-6 sm:grid-cols-2">
        <section aria-labelledby="choices-heading" className={"rounded-xl p-5 sm:p-6 " + glass}>
          <h2
            id="choices-heading"
            className="font-pixel text-xs text-ink dark:text-paper-100 sm:text-sm"
          >
            Answer choices
          </h2>
          <p className="mt-2 text-sm text-ink-muted dark:text-paper-300">
            How many hiragana to pick from each round.
          </p>
          <div className="mt-4 flex gap-2" role="group" aria-label="Number of answer choices">
            {CHOICE_OPTIONS.map((n) => (
              <button
                key={n}
                type="button"
                aria-pressed={settings.choices === n}
                onClick={() => onChange({ ...settings, choices: n })}
                className={
                  "flex-1 rounded-md px-4 py-2.5 font-pixel text-xs transition " +
                  (settings.choices === n
                    ? "bg-hanko text-paper-50"
                    : "border border-white/50 bg-white/30 text-ink-light hover:bg-white/50 dark:border-white/10 dark:bg-white/5 dark:text-paper-200 dark:hover:bg-white/10")
                }
              >
                {n}
              </button>
            ))}
          </div>
        </section>

        <section aria-labelledby="speed-heading" className={"rounded-xl p-5 sm:p-6 " + glass}>
          <h2
            id="speed-heading"
            className="font-pixel text-xs text-ink dark:text-paper-100 sm:text-sm"
          >
            Reaction time
          </h2>
          <p className="mt-2 text-sm text-ink-muted dark:text-paper-300">
            Time allowed per question. Shortens slightly each wave.
          </p>
          <div className="mt-4 flex gap-2" role="group" aria-label="Reaction time per question">
            {SPEED_ORDER.map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={settings.speed === key}
                onClick={() => onChange({ ...settings, speed: key })}
                className={
                  "flex-1 rounded-md px-2 py-2.5 text-xs font-medium transition " +
                  (settings.speed === key
                    ? "bg-hanko text-paper-50"
                    : "border border-white/50 bg-white/30 text-ink-light hover:bg-white/50 dark:border-white/10 dark:bg-white/5 dark:text-paper-200 dark:hover:bg-white/10")
                }
              >
                <span className="block font-pixel text-[0.5rem] sm:text-[0.625rem]">
                  {SPEED_PRESETS[key].label}
                </span>
                <span className="mt-1 block tabular-nums opacity-80">
                  {SPEED_PRESETS[key].ms / 1000}s
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={onStart}
          disabled={!canStart}
          className="group inline-flex items-center gap-2.5 rounded-md bg-hanko px-8 py-4 font-pixel text-xs text-paper-50 shadow-glass transition duration-300 hover:-translate-y-0.5 hover:bg-hanko-dark disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:bg-hanko sm:text-sm"
        >
          Start battle
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-disabled:translate-x-0"
          >
            →
          </span>
        </button>

        {best && (
          <p className="font-pixel text-[0.625rem] text-ink-muted dark:text-paper-300">
            Best: wave {best.waves} · {best.correct} correct
          </p>
        )}
      </div>
    </div>
  );
}
