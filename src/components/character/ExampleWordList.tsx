import type { ExampleWord } from "@/types/content";

/** Anything in the CJK ideograph ranges needs a furigana reading above it. */
const HAS_KANJI = /[\u3400-\u4dbf\u4e00-\u9fff]/;

/**
 * Example words for a character, each with furigana, romaji and its meaning.
 *
 * Words come from JMdict only. When a character has no verified common word the
 * list says so rather than showing something invented.
 */
export function ExampleWordList({ words }: { words: ExampleWord[] }) {
  if (words.length === 0) {
    return (
      <p className="text-sm text-ink-muted dark:text-paper-300">
        No common JMdict word uses this character — nothing is listed rather than inventing an
        example.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {words.map((word) => (
        <li
          key={`${word.word}-${word.reading}`}
          className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 border-b border-white/40 pb-2 last:border-0 last:pb-0 dark:border-white/10"
        >
          <span className="font-jp text-lg text-ink dark:text-paper-100">
            {HAS_KANJI.test(word.word) ? (
              <ruby>
                {word.word}
                <rt className="text-[0.55em] text-ink-muted dark:text-paper-300">{word.reading}</rt>
              </ruby>
            ) : (
              word.word
            )}
          </span>
          <span className="text-sm italic text-hanko dark:text-hanko-light">{word.romaji}</span>
          <span className="text-sm text-ink-light dark:text-paper-200">{word.meaning}</span>
        </li>
      ))}
    </ul>
  );
}
