import type { Metadata } from "next";

import { PageHeader } from "@/components/PageHeader";
import { LanguageSubNav } from "@/components/LanguageSubNav";
import { KanjiCard } from "@/components/KanjiCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { kanji } from "@/lib/data";

export const metadata: Metadata = {
  title: "N5 kanji",
  description: "Kanji cards with meanings, on'yomi, kun'yomi, stroke counts and common words.",
};

export default function KanjiPage() {
  return (
    <div className="space-y-8">
      <LanguageSubNav />
      <PageHeader
        title="Kanji"
        glyph="字"
        intro={
          <p>
            Each card shows the character, its meanings, readings and stroke count, plus two or
            three common words. Readings and stroke counts follow KANJIDIC2. This set is growing
            toward the community-estimated N5 scope of roughly 100&ndash;110 kanji.
          </p>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kanji.map((k, i) => (
          <ScrollReveal key={k.char} index={i}>
            <KanjiCard kanji={k} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
