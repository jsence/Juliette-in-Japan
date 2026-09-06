"use client";

import { ExampleWordList } from "./ExampleWordList";
import { StrokeOrder } from "./StrokeOrder";
import type { CharacterDetail as Detail, KanaRelation } from "@/types/content";

/** How each kana relationship reads in the UI. */
const RELATION_LABELS: Record<KanaRelation, string> = {
  base: "Plain form",
  dakuten: "Dakuten ゛",
  handakuten: "Handakuten ゜",
  combination: "Combination",
  series: "Same series",
};

const SECTION_HEADING =
  "font-serif text-sm font-semibold uppercase tracking-wide text-ink-muted dark:text-paper-300";

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-ink-muted dark:text-paper-300">{label}</dt>
      <dd className="mt-0.5 text-ink dark:text-paper-100">{children}</dd>
    </div>
  );
}

/**
 * The body of a character detail panel, shared by kana and kanji.
 *
 * `onSelectCharacter` lets the related-kana chips swap the panel's subject
 * without closing it.
 */
export function CharacterDetail({
  detail,
  onSelectCharacter,
}: {
  detail: Detail;
  onSelectCharacter?: (char: string) => void;
}) {
  return (
    <div className="space-y-7">
      <header className="flex flex-wrap items-start gap-x-6 gap-y-4">
        <p
          lang="ja"
          className="font-jp text-[5.5rem] font-semibold leading-none text-hanko dark:text-hanko-light sm:text-[7rem]"
        >
          {detail.char}
        </p>

        <dl className="grid min-w-[12rem] flex-1 grid-cols-2 gap-x-4 gap-y-3 text-sm">
          {detail.kind === "kana" ? (
            <>
              <Fact label="Reading">
                <span className="text-xl font-medium">{detail.romaji}</span>
              </Fact>
              <Fact label="Script">
                {detail.script === "hiragana" ? "Hiragana ひらがな" : "Katakana カタカナ"}
              </Fact>
              <Fact label="Strokes">{detail.strokes}</Fact>
              {detail.row && detail.column ? (
                <Fact label="Position">
                  <span className="font-jp">
                    {detail.row} · {detail.column}
                  </span>
                </Fact>
              ) : (
                <Fact label="Position">Outside the gojūon grid</Fact>
              )}
            </>
          ) : (
            <>
              <Fact label="Meaning">
                <span className="text-lg font-medium">{detail.meanings.join(", ")}</span>
              </Fact>
              <Fact label="Strokes">{detail.strokes}</Fact>
              <Fact label="On'yomi">
                <span className="font-jp">{detail.onyomi.length ? detail.onyomi.join("、") : "—"}</span>
              </Fact>
              <Fact label="Kun'yomi">
                <span className="font-jp">
                  {detail.kunyomi.length ? detail.kunyomi.join("、") : "—"}
                </span>
              </Fact>
              <Fact label="Radical">
                <span className="font-jp text-lg">{detail.radical.char}</span>
                <span className="ml-2 text-xs text-ink-muted dark:text-paper-300">
                  Kangxi {detail.radical.number}
                </span>
              </Fact>
            </>
          )}
        </dl>
      </header>

      {detail.kind === "kana" && detail.note && (
        <p className="rounded-lg border-l-4 border-hanko bg-white/40 p-3 text-sm text-ink-light dark:bg-white/5 dark:text-paper-200">
          {detail.note}
        </p>
      )}

      <section className="space-y-2">
        <h3 className={SECTION_HEADING}>Stroke order</h3>
        <StrokeOrder char={detail.char} />
      </section>

      {detail.kind === "kana" && detail.related.length > 0 && (
        <section className="space-y-2">
          <h3 className={SECTION_HEADING}>Related characters</h3>
          <ul className="flex flex-wrap gap-2">
            {detail.related.map((related) => (
              <li key={related.char}>
                <button
                  type="button"
                  onClick={() => onSelectCharacter?.(related.char)}
                  disabled={!onSelectCharacter}
                  className="flex items-center gap-2 rounded-lg border border-white/50 bg-white/40 px-3 py-2 text-left transition hover:border-hanko/50 hover:bg-white/70 disabled:cursor-default dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <span lang="ja" className="font-jp text-2xl text-ink dark:text-paper-100">
                    {related.char}
                  </span>
                  <span className="leading-tight">
                    <span className="block text-sm text-ink-light dark:text-paper-200">
                      {related.romaji}
                    </span>
                    <span className="block text-[0.65rem] uppercase tracking-wide text-ink-muted dark:text-paper-300">
                      {RELATION_LABELS[related.relation]}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="space-y-2">
        <h3 className={SECTION_HEADING}>Example words</h3>
        <ExampleWordList words={detail.words} />
      </section>
    </div>
  );
}
