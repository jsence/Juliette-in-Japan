import type { GrammarPoint as GrammarPointData } from "@/types/content";

interface GrammarPointProps {
  point: GrammarPointData;
}

/** A single grammar point card: title, pattern, explanation, examples. */
export function GrammarPoint({ point }: GrammarPointProps) {
  return (
    <article
      id={point.id}
      className="scroll-mt-24 rounded-lg border border-paper-300 bg-paper-50 p-5 shadow-sm dark:border-sumi-border dark:bg-sumi-light"
    >
      <h3 className="font-jp text-xl font-semibold text-ink dark:text-paper-100">{point.title}</h3>
      <p className="mt-1 font-mono text-sm text-hanko dark:text-hanko-light">{point.structure}</p>
      <p className="mt-3 text-ink-light dark:text-paper-200">{point.explanation}</p>

      {point.exampleSentences.length > 0 && (
        <ul className="mt-4 space-y-2 border-t border-paper-200 pt-3 dark:border-sumi-border">
          {point.exampleSentences.map((s, i) => (
            <li key={i} className="text-sm">
              <span className="font-jp text-ink dark:text-paper-100">{s.jp}</span>
              <span className="mx-1 text-ink-muted">—</span>
              <span className="text-ink-light dark:text-paper-200">{s.en}</span>
              <span className="ml-2 text-xs text-ink-muted dark:text-paper-300">({s.source})</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
