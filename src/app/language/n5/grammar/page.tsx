import type { Metadata } from "next";

import { PageHeader } from "@/components/PageHeader";
import { N5SubNav } from "@/components/N5SubNav";
import { GrammarPoint } from "@/components/GrammarPoint";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getGrammarByCategory } from "@/lib/data";

export const metadata: Metadata = {
  title: "N5 grammar",
  description: "N5 grammar points with structures and human-written explanations.",
};

const categoryLabels: Record<string, string> = {
  copula: "The copula (です・だ)",
  particles: "Particles",
  adjectives: "Adjectives",
  "verb-forms": "Verb forms",
  existence: "Existence (ある・いる)",
  comparison: "Comparatives",
  desire: "Desire (〜たい)",
  reason: "Reason (から・ので)",
};

export default function GrammarPage() {
  const groups = getGrammarByCategory();

  return (
    <div className="space-y-8">
      <N5SubNav />
      <PageHeader
        title="Grammar"
        glyph="文"
        intro={
          <p>
            The core N5 grammar, grouped by function. Every explanation here is written by hand —
            never generated. Example sentences are added only from established corpora.
          </p>
        }
      />
      {groups.map((group, gi) => (
        <section key={group.category} className="space-y-4">
          <ScrollReveal>
            <h2 className="font-serif text-xl font-semibold text-ink dark:text-paper-100">
              {categoryLabels[group.category] ?? group.category}
            </h2>
          </ScrollReveal>
          <div className="grid gap-4 md:grid-cols-2">
            {group.items.map((point, i) => (
              <ScrollReveal key={point.id} index={i}>
                <GrammarPoint point={point} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
