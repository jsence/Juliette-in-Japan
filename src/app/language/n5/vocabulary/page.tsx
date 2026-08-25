import type { Metadata } from "next";

import { PageHeader } from "@/components/PageHeader";
import { N5SubNav } from "@/components/N5SubNav";
import { VocabTable } from "@/components/VocabTable";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getVocabularyByTheme } from "@/lib/data";

export const metadata: Metadata = {
  title: "N5 vocabulary",
  description: "N5 vocabulary grouped by theme, with readings and JMdict definitions.",
};

const themeLabels: Record<string, string> = {
  numbers: "Numbers",
  time: "Time",
  family: "Family",
  food: "Food & drink",
  transport: "Transport",
  verbs: "Core verbs",
  adjectives: "Adjectives",
  places: "Places",
  people: "People",
  everyday: "Everyday",
};

export default function VocabularyPage() {
  const groups = getVocabularyByTheme();

  return (
    <div className="space-y-8">
      <N5SubNav />
      <PageHeader
        title="Vocabulary"
        glyph="語"
        intro={
          <p>
            Grouped by theme so related words reinforce each other. Definitions follow JMdict.
            Example sentences are only added when they come from an established corpus, so many
            entries intentionally have none rather than invented ones.
          </p>
        }
      />
      {groups.map((group, i) => (
        <ScrollReveal key={group.theme} index={i} className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-ink dark:text-paper-100">
            {themeLabels[group.theme] ?? group.theme}
          </h2>
          <VocabTable entries={group.items} caption={`${themeLabels[group.theme] ?? group.theme} vocabulary`} />
        </ScrollReveal>
      ))}
    </div>
  );
}
