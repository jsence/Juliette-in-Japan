import type { GrammarExample } from "@/types/content";
import { Ruby } from "./Ruby";

interface GrammarExamplesProps {
  examples: GrammarExample[];
}

/**
 * Renders grammar example sentences (Japanese with furigana, romaji, English).
 * When there are none, shows an honest sourcing note rather than inventing any.
 */
export function GrammarExamples({ examples }: GrammarExamplesProps) {
  if (examples.length === 0) {
    return (
      <p className="rounded-md border border-dashed border-paper-300 bg-paper-100 p-3 text-sm text-ink-muted dark:border-sumi-border dark:bg-sumi dark:text-paper-300">
        Example sentences are sourced only from open corpora (Tatoeba, NHK Easy) and are added as
        they are verified — none have been added for this point yet.
      </p>
    );
  }

  return (
    <ol className="space-y-3">
      {examples.map((ex, i) => (
        <li
          key={i}
          className="rounded-lg border border-paper-300 bg-paper-50 p-4 dark:border-sumi-border dark:bg-sumi-light"
        >
          <Ruby segments={ex.segments} className="text-lg text-ink dark:text-paper-100" />
          <p className="mt-1 text-sm italic text-ink-muted dark:text-paper-300">{ex.romaji}</p>
          <p className="mt-1 text-ink-light dark:text-paper-200">{ex.en}</p>
          <p className="mt-2 text-xs text-ink-muted dark:text-paper-300">
            Source: {ex.source}
            {ex.sourceId ? ` · ${ex.sourceId}` : ""}
          </p>
        </li>
      ))}
    </ol>
  );
}
