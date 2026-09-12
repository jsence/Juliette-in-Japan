import type { WorkConcept } from "@/types/work";
import { RubyTerm } from "./RubyTerm";
import { WorkTermTable } from "./WorkTermTable";

interface WorkConceptBlockProps {
  concept: WorkConcept;
}

/** Behaviour in English; Japanese only in the heading or term table. */
export function WorkConceptBlock({ concept }: WorkConceptBlockProps) {
  return (
    <article
      id={concept.id}
      className="scroll-mt-24 rounded-xl border border-paper-300 bg-paper-50 p-5 dark:border-sumi-border dark:bg-sumi-light"
    >
      <h2 className="font-serif text-xl font-semibold text-ink dark:text-paper-100">
        {concept.ruby ? (
          <RubyTerm kanji={concept.ruby.kanji} reading={concept.ruby.reading} romaji={concept.romaji} />
        ) : (
          concept.title
        )}
        {concept.ruby ? (
          <span className="mt-1 block font-sans text-base font-normal text-ink-light dark:text-paper-200">
            {concept.title}
          </span>
        ) : null}
      </h2>
      <div className="mt-3 space-y-2 text-sm text-ink-light dark:text-paper-200">
        {concept.summaryLines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      {concept.terms && concept.terms.length > 0 ? (
        <div className="mt-4">
          <WorkTermTable rows={concept.terms} />
        </div>
      ) : null}
      <div className="mt-4 border-t border-paper-200 pt-4 dark:border-sumi-border">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-hanko dark:text-hanko-light">
          What to do
        </h3>
        <ul className="mt-2 list-none space-y-1.5 text-sm text-ink-light dark:text-paper-200">
          {concept.whatToDo.map((step) => (
            <li key={step} className="flex gap-2">
              <span className="text-hanko dark:text-hanko-light" aria-hidden>
                →
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
