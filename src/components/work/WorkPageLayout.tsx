import type { ReactNode } from "react";

import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import type { WorkPageContent } from "@/types/work";
import { DoDont } from "./DoDont";
import { PhraseCard } from "./PhraseCard";
import { WorkConceptBlock } from "./WorkConceptBlock";
import { WorkSubNav } from "./WorkSubNav";

interface WorkPageLayoutProps {
  page: WorkPageContent;
  /** Optional extra blocks (e.g. seating diagram) inserted before Do/Don't. */
  extra?: ReactNode;
}

export function WorkPageLayout({ page, extra }: WorkPageLayoutProps) {
  return (
    <div className="space-y-10">
      <WorkSubNav />
      <PageHeader title={page.title} glyph={page.glyph} intro={<p>{page.intro}</p>} />

      <section className="space-y-4">
        {page.concepts.map((concept, i) => (
          <ScrollReveal key={concept.id} index={i}>
            <WorkConceptBlock concept={concept} />
          </ScrollReveal>
        ))}
      </section>

      {extra}

      {page.phraseSections && page.phraseSections.length > 0
        ? page.phraseSections.map((section, si) => (
            <section key={section.title} className="space-y-4">
              <ScrollReveal index={si}>
                <h2 className="font-serif text-2xl font-semibold text-ink dark:text-paper-100">
                  {section.title}
                </h2>
              </ScrollReveal>
              <div className="grid gap-4 md:grid-cols-2">
                {section.phrases.map((phrase, i) => (
                  <ScrollReveal key={phrase.id} index={i}>
                    <PhraseCard phrase={phrase} />
                  </ScrollReveal>
                ))}
              </div>
            </section>
          ))
        : page.phrases.length > 0 && (
            <section className="space-y-4">
              <ScrollReveal>
                <h2 className="font-serif text-2xl font-semibold text-ink dark:text-paper-100">
                  Ready-to-use phrases
                </h2>
                <p className="mt-1 text-sm text-ink-muted dark:text-paper-300">
                  Register is labelled on every line — match internal vs client, and humble vs respectful, before
                  you paste into email or say aloud.
                </p>
              </ScrollReveal>
              <div className="grid gap-4 md:grid-cols-2">
                {page.phrases.map((phrase, i) => (
                  <ScrollReveal key={phrase.id} index={i}>
                    <PhraseCard phrase={phrase} />
                  </ScrollReveal>
                ))}
              </div>
            </section>
          )}

      <ScrollReveal>
        <DoDont block={page.doDont} />
      </ScrollReveal>

      <ScrollReveal>
        <aside className="rounded-lg border border-paper-300 bg-paper-100 p-5 text-sm dark:border-sumi-border dark:bg-sumi-light">
          <h2 className="font-serif text-lg font-semibold text-ink dark:text-paper-100">Sources</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-ink-light dark:text-paper-200">
            {page.sources.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </aside>
      </ScrollReveal>
    </div>
  );
}
