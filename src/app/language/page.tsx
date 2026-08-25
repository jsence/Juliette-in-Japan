import type { Metadata } from "next";

import { SectionIndex } from "@/components/SectionIndex";
import { ModuleProgress } from "@/components/ModuleProgress";
import { SourceNote } from "@/components/SourceNote";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getSection } from "@/lib/site";
import { kana, kanji, vocabulary, grammar } from "@/lib/data";

export const metadata: Metadata = {
  title: "Language",
  description:
    "Japanese writing systems, N5 grammar organised by function, vocabulary and spaced-repetition drills.",
};

const section = getSection("language")!;

const cardDescriptions: Record<string, string> = {
  "/language/kana": `Hiragana & katakana — ${kana.length} characters with stroke counts.`,
  "/language/kanji": `${kanji.length} kanji cards with readings and common words.`,
  "/language/vocabulary": `${vocabulary.length} words grouped by theme.`,
  "/language/grammar": `${grammar.length} grammar points across 11 functional categories.`,
  "/language/drills": "SM-2 flashcards with four study modes and deck selection.",
};

export default function LanguagePage() {
  return (
    <SectionIndex
      section={section}
      intro={
        <p>
          The Japanese-language section covers kana, kanji, grammar organised by function, themed
          vocabulary and flashcard drills. Material is built from typed data files, with kanji
          readings following KANJIDIC2 and word definitions following JMdict.
        </p>
      }
      cardDescriptions={cardDescriptions}
      beforeCards={
        <>
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
                lists. The N5 scope shown here is a <strong>community-consensus estimate</strong>,
                not an official syllabus. Kanji readings and stroke counts follow KANJIDIC2; word
                definitions follow JMdict.
              </p>
            </SourceNote>
          </ScrollReveal>
        </>
      }
    />
  );
}
