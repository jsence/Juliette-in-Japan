"use client";

import {
  RECALL_ROWS,
  deckSize,
  recallRowSize,
  type RecallScript,
  type RecallSettings,
  type RecallVariant,
} from "@/lib/kanaRecall";
import { glass } from "@/lib/ui";

interface RecallSetupProps {
  settings: RecallSettings;
  onChange: (settings: RecallSettings) => void;
  onStart: () => void;
}

const SCRIPT_OPTIONS: { id: RecallScript; label: string; glyph: string }[] = [
  { id: "hiragana", label: "Hiragana", glyph: "ひ" },
  { id: "katakana", label: "Katakana", glyph: "カ" },
];

const VARIANT_OPTIONS: { id: RecallVariant; label: string; detail: string }[] = [
  { id: "monographs", label: "Monographs", detail: "Plain gojūon" },
  { id: "diacritics", label: "Diacritics", detail: "Dakuten & handakuten" },
  { id: "digraphs", label: "Digraphs", detail: "Yōon" },
];

export function RecallSetup({ settings, onChange, onStart }: RecallSetupProps) {
  const size = deckSize(settings);
  const canStart = settings.scripts.length > 0 && settings.variants.length > 0 && size > 0;

  const toggleScript = (id: RecallScript) => {
    const has = settings.scripts.includes(id);
    const next = has ? settings.scripts.filter((s) => s !== id) : [...settings.scripts, id];
    onChange({ ...settings, scripts: next });
  };

  const toggleVariant = (id: RecallVariant) => {
    const has = settings.variants.includes(id);
    const next = has ? settings.variants.filter((v) => v !== id) : [...settings.variants, id];
    onChange({ ...settings, variants: next });
  };

  const toggleRow = (id: string) => {
    const next = settings.rowIds.includes(id)
      ? settings.rowIds.filter((r) => r !== id)
      : [...settings.rowIds, id];
    onChange({ ...settings, rowIds: next });
  };

  const toggleClass = (active: boolean) =>
    "rounded-md px-4 py-2.5 text-sm font-medium transition " +
    (active
      ? "bg-hanko text-paper-50"
      : "border border-white/50 bg-white/30 text-ink-light hover:bg-white/50 dark:border-white/10 dark:bg-white/5 dark:text-paper-200 dark:hover:bg-white/10");

  return (
    <div className="space-y-8">
      <section aria-labelledby="script-heading" className={"rounded-xl p-5 sm:p-6 " + glass}>
        <h2
          id="script-heading"
          className="font-pixel text-xs text-ink dark:text-paper-100 sm:text-sm"
        >
          Writing system
        </h2>
        <p className="mt-2 text-sm text-ink-muted dark:text-paper-300">
          Choose at least one script. Both doubles the deck when the same rows and variants are
          selected.
        </p>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Writing system">
          {SCRIPT_OPTIONS.map(({ id, label, glyph }) => (
            <button
              key={id}
              type="button"
              aria-pressed={settings.scripts.includes(id)}
              onClick={() => toggleScript(id)}
              className={toggleClass(settings.scripts.includes(id))}
            >
              <span className="font-jp">{glyph}</span> {label}
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="variant-heading" className={"rounded-xl p-5 sm:p-6 " + glass}>
        <h2
          id="variant-heading"
          className="font-pixel text-xs text-ink dark:text-paper-100 sm:text-sm"
        >
          Variants
        </h2>
        <p className="mt-2 text-sm text-ink-muted dark:text-paper-300">
          Which forms to include from the rows you pick below.
        </p>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Kana variants">
          {VARIANT_OPTIONS.map(({ id, label, detail }) => (
            <button
              key={id}
              type="button"
              aria-pressed={settings.variants.includes(id)}
              onClick={() => toggleVariant(id)}
              className={toggleClass(settings.variants.includes(id))}
            >
              <span className="block font-medium">{label}</span>
              <span className="mt-0.5 block text-[0.65rem] opacity-80">{detail}</span>
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="rows-heading" className={"rounded-xl p-5 sm:p-6 " + glass}>
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2
            id="rows-heading"
            className="font-pixel text-xs text-ink dark:text-paper-100 sm:text-sm"
          >
            Rows
          </h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onChange({ ...settings, rowIds: RECALL_ROWS.map((r) => r.id) })}
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

        <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {RECALL_ROWS.map((row) => {
            const checked = settings.rowIds.includes(row.id);
            const count = recallRowSize(row, settings);
            return (
              <li key={row.id}>
                <label
                  className={
                    "flex cursor-pointer items-center gap-2 rounded-lg border p-2.5 transition " +
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
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline gap-1.5">
                      <span className="font-jp text-sm font-semibold text-ink dark:text-paper-100">
                        {row.label}
                      </span>
                      <span className="font-pixel text-[0.5rem] uppercase text-ink-muted dark:text-paper-300">
                        {row.hint}
                      </span>
                    </span>
                    <span className="block text-[0.65rem] text-ink-muted dark:text-paper-300">
                      {count} card{count === 1 ? "" : "s"}
                    </span>
                  </span>
                </label>
              </li>
            );
          })}
        </ul>

        <p className="mt-4 font-pixel text-[0.625rem] text-ink-muted dark:text-paper-300 sm:text-xs">
          {size > 0
            ? `${size} card${size === 1 ? "" : "s"} in this deck.`
            : "Pick at least one script, variant and row to begin."}
        </p>
      </section>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={onStart}
          disabled={!canStart}
          className="group inline-flex items-center gap-2.5 rounded-md bg-hanko px-8 py-4 font-pixel text-xs text-paper-50 shadow-[2px_2px_0_rgba(43,38,32,0.35)] transition duration-300 hover:-translate-y-0.5 hover:bg-hanko-dark disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 dark:shadow-[2px_2px_0_rgba(0,0,0,0.5)] sm:text-sm"
        >
          Start drill
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-disabled:translate-x-0"
          >
            →
          </span>
        </button>
      </div>
    </div>
  );
}
