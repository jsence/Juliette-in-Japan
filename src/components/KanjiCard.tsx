import Link from "next/link";

import type { Kanji } from "@/types/content";
import { characterHref } from "@/lib/characterPaths";
import { glass } from "@/lib/ui";

interface KanjiCardProps {
  kanji: Kanji;
}

/**
 * A single kanji study card: character, meanings, readings, strokes, words.
 *
 * The card links to the character's own page. Inside a CharacterBrowser a plain
 * click opens the detail panel instead of navigating.
 */
export function KanjiCard({ kanji }: KanjiCardProps) {
  return (
    <Link
      href={characterHref("kanji", kanji.char)}
      data-char={kanji.char}
      className={
        "group flex h-full flex-col gap-3 rounded-lg p-4 transition duration-200 hover:-translate-y-0.5 hover:border-hanko/40 hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hanko dark:hover:bg-white/10 " +
        glass
      }
    >
      <div className="flex items-start justify-between gap-3">
        <span
          lang="ja"
          className="font-jp text-5xl leading-none text-ink transition group-hover:text-hanko dark:text-paper-100 dark:group-hover:text-hanko-light"
        >
          {kanji.char}
        </span>
        <span className="rounded-full border border-white/50 bg-white/40 px-2 py-0.5 text-xs font-medium text-ink-muted dark:border-white/10 dark:bg-white/5 dark:text-paper-300">
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
        <ul className="mt-1 space-y-1 border-t border-white/40 pt-2 text-sm dark:border-white/10">
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
    </Link>
  );
}
