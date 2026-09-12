import type { WorkConcept } from "@/types/work";
import { RubyTerm } from "./RubyTerm";

interface WorkConceptBlockProps {
  concept: WorkConcept;
}

/** Situation block: term, what it is, and what to do in practice. */
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
        {!concept.ruby && concept.romaji ? (
          <span className="ml-2 text-base font-normal text-ink-muted dark:text-paper-300">
            ({concept.romaji})
          </span>
        ) : null}
        {concept.ruby ? (
          <span className="mt-1 block font-sans text-base font-normal text-ink-light dark:text-paper-200">
            {concept.title}
          </span>
        ) : null}
      </h2>
      <p className="mt-3 text-ink-light dark:text-paper-200">{concept.summary}</p>
      <div className="mt-4 border-t border-paper-200 pt-4 dark:border-sumi-border">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-hanko dark:text-hanko-light">
          What to do
        </h3>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-ink-light dark:text-paper-200">
          {concept.whatToDo.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
