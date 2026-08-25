import type { Kanji } from "@/types/content";

interface KanjiCardProps {
  kanji: Kanji;
}

/** A single kanji study card: character, meanings, readings, strokes, words. */
export function KanjiCard({ kanji }: KanjiCardProps) {
  return (
    <article className="flex flex-col gap-3 rounded-lg border border-paper-300 bg-paper-50 p-4 shadow-sm dark:border-sumi-border dark:bg-sumi-light">
      <div className="flex items-start justify-between gap-3">
        <span className="font-jp text-5xl leading-none text-ink dark:text-paper-100">
          {kanji.char}
        </span>
        <span className="rounded-full bg-paper-200 px-2 py-0.5 text-xs font-medium text-ink-muted dark:bg-sumi dark:text-paper-300">
          {kanji.strokes} strokes
        </span>
      </div>

      <p className="font-serif text-lg font-semibold text-ink dark:text-paper-100">
        {kanji.meanings.join(", ")}
      </p>

      <dl className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-1 text-sm">
        <dt className="text-hanko dark:text-hanko-light">On&apos;yomi</dt>
        <dd className="font-jp text-ink-light dark:text-paper-200">
          {kanji.onyomi.length ? kanji.onyomi.join("、") : "—"}
        </dd>
        <dt className="text-hanko dark:text-hanko-light">Kun&apos;yomi</dt>
        <dd className="font-jp text-ink-light dark:text-paper-200">
          {kanji.kunyomi.length ? kanji.kunyomi.join("、") : "—"}
        </dd>
      </dl>

      {kanji.words.length > 0 && (
        <ul className="mt-1 space-y-1 border-t border-paper-200 pt-2 text-sm dark:border-sumi-border">
          {kanji.words.map((w) => (
            <li key={w.word} className="flex flex-wrap items-baseline gap-x-2">
              <ruby className="font-jp text-ink dark:text-paper-100">
                {w.word}
                <rt className="text-[0.6em] text-ink-muted dark:text-paper-300">{w.reading}</rt>
              </ruby>
              <span className="text-ink-muted dark:text-paper-300">{w.meaning}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
