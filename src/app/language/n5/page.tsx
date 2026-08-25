import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
import { SourceNote } from "@/components/SourceNote";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ModuleProgress } from "@/components/ModuleProgress";
import { n5Nav } from "@/lib/site";
import { kana, kanji, vocabulary, grammar, lessons } from "@/lib/data";

export const metadata: Metadata = {
  title: "N5 study hub",
  description:
    "The N5 study hub: kana, kanji, vocabulary, grammar and review, built from open, human-verified data.",
};

const cardMeta: Record<string, { description: string }> = {
  "/language/n5/lessons": { description: `${lessons.length} guided lessons bundling grammar, vocab and kanji with a drill.` },
  "/language/n5/kana": { description: `Hiragana & katakana — ${kana.length} characters with stroke counts.` },
  "/language/n5/kanji": { description: `${kanji.length} kanji cards with readings and common words.` },
  "/language/n5/vocabulary": { description: `${vocabulary.length} words grouped by theme.` },
  "/language/n5/grammar": { description: `${grammar.length} grammar points across 11 functional categories.` },
  "/language/n5/review": { description: "SM-2 flashcards with four study modes and deck selection." },
};

export default function N5HubPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="N5 study hub"
        glyph="五"
        intro={
          <p>
            The N5 modules are built from typed data files: kana and kanji tables, grammar
            organised by function, themed vocabulary, and flashcard drills. A suggested order is
            kana, then kanji and vocabulary alongside grammar, with review to consolidate.
          </p>
        }
      />

      <ScrollReveal>
        <ModuleProgress
          totals={{
            kana: kana.length,
            kanji: kanji.length,
            grammar: grammar.length,
            vocabulary: vocabulary.length,
          }}
        />
      </ScrollReveal>

      <ScrollReveal>
        <SourceNote>
          <p>
            Since the 2010 revision, the JLPT no longer publishes official vocabulary or kanji
            lists. The N5 scope shown across this hub is a <strong>community-consensus estimate</strong>,
            not an official syllabus. Kanji readings and stroke counts follow KANJIDIC2; word
            definitions follow JMdict.
          </p>
        </SourceNote>
      </ScrollReveal>

      <div className="grid gap-4 sm:grid-cols-2">
        {n5Nav.map((item, i) => (
          <ScrollReveal key={item.href} index={i}>
            <SectionCard
              href={item.href}
              title={item.label}
              glyph={item.glyph ?? "五"}
              description={cardMeta[item.href]?.description ?? ""}
            />
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <p className="text-sm text-ink-muted dark:text-paper-300">
          <Link href="/language" className="text-hanko hover:underline dark:text-hanko-light">
            Back to the Language overview and resources →
          </Link>
        </p>
      </ScrollReveal>
    </div>
  );
}
