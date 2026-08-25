import type { VocabEntry } from "@/types/content";

interface VocabTableProps {
  entries: VocabEntry[];
  /** Optional caption for accessibility / context. */
  caption?: string;
}

const posLabels: Record<VocabEntry["partOfSpeech"], string> = {
  noun: "noun",
  "verb-u": "u-verb",
  "verb-ru": "ru-verb",
  "verb-irregular": "irr. verb",
  "i-adjective": "い-adj",
  "na-adjective": "な-adj",
  adverb: "adverb",
  particle: "particle",
  expression: "expression",
  counter: "counter",
  pronoun: "pronoun",
};

/** A responsive vocabulary table with furigana readings. */
export function VocabTable({ entries, caption }: VocabTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-paper-300 dark:border-sumi-border">
      <table className="w-full border-collapse text-left text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="bg-paper-200 text-ink-light dark:bg-sumi dark:text-paper-200">
            <th scope="col" className="px-4 py-2 font-serif font-semibold">Word</th>
            <th scope="col" className="px-4 py-2 font-serif font-semibold">Reading</th>
            <th scope="col" className="px-4 py-2 font-serif font-semibold">Meaning</th>
            <th scope="col" className="px-4 py-2 font-serif font-semibold">Type</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => (
            <tr
              key={`${entry.word}-${entry.reading}`}
              className={
                i % 2 === 0
                  ? "bg-paper-50 dark:bg-sumi-light"
                  : "bg-paper-100 dark:bg-sumi"
              }
            >
              <td className="px-4 py-2 font-jp text-base text-ink dark:text-paper-100">{entry.word}</td>
              <td className="px-4 py-2 font-jp text-ink-light dark:text-paper-200">{entry.reading}</td>
              <td className="px-4 py-2 text-ink-light dark:text-paper-200">{entry.meaning}</td>
              <td className="px-4 py-2 text-ink-muted dark:text-paper-300">{posLabels[entry.partOfSpeech]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
