import Link from "next/link";

import type { GrammarPoint as GrammarPointData } from "@/types/content";
import { Formula } from "./Formula";
import { GrammarExamples } from "./GrammarExamples";
import { AddToFlashcards } from "./AddToFlashcards";

interface RelatedLink {
  id: string;
  title: string;
  href: string;
}

interface GrammarPointProps {
  point: GrammarPointData;
  related: RelatedLink[];
}

/** Full detail view for a single grammar point (used on the point page). */
export function GrammarPoint({ point, related }: GrammarPointProps) {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="font-jp text-3xl font-semibold text-hanko dark:text-hanko-light">
          {point.form}
        </p>
        <p className="text-lg text-ink-light dark:text-paper-200">{point.meaning}</p>
      </section>

      <section aria-labelledby="formula-heading" className="space-y-2">
        <h2 id="formula-heading" className="text-sm font-semibold uppercase tracking-wide text-ink-muted dark:text-paper-300">
          Construction
        </h2>
        <Formula tokens={point.formula} />
      </section>

      <section aria-labelledby="explanation-heading" className="space-y-2">
        <h2 id="explanation-heading" className="text-sm font-semibold uppercase tracking-wide text-ink-muted dark:text-paper-300">
          How it works
        </h2>
        <p className="text-ink-light dark:text-paper-200">{point.explanation}</p>
      </section>

      <section aria-labelledby="examples-heading" className="space-y-3">
        <h2 id="examples-heading" className="text-sm font-semibold uppercase tracking-wide text-ink-muted dark:text-paper-300">
          Examples
        </h2>
        <GrammarExamples examples={point.examples} />
      </section>

      {point.mistakes.length > 0 && (
        <section
          aria-labelledby="mistakes-heading"
          className="rounded-lg border-l-4 border-hanko bg-paper-100 p-4 dark:bg-sumi-light"
        >
          <h2 id="mistakes-heading" className="font-serif text-lg font-semibold text-hanko dark:text-hanko-light">
            Common mistakes
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-light dark:text-paper-200">
            {point.mistakes.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </section>
      )}

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="space-y-2">
          <h2 id="related-heading" className="text-sm font-semibold uppercase tracking-wide text-ink-muted dark:text-paper-300">
            Related points
          </h2>
          <ul className="flex flex-wrap gap-2">
            {related.map((r) => (
              <li key={r.id}>
                <Link
                  href={r.href}
                  className="rounded-full border border-paper-300 px-3 py-1.5 text-sm text-ink-light transition hover:border-hanko/50 hover:text-hanko dark:border-sumi-border dark:text-paper-200 dark:hover:text-hanko-light"
                >
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="border-t border-paper-200 pt-6 dark:border-sumi-border">
        <AddToFlashcards grammarId={point.id} />
      </section>
    </div>
  );
}
