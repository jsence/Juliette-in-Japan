import type { Metadata } from "next";

import { ScrollReveal } from "@/components/ScrollReveal";
import { StubPage } from "@/components/StubPage";
import { SourceNote } from "@/components/SourceNote";
import { glass } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Sources",
  description:
    "Open data references for kanji readings, vocabulary definitions and example sentences.",
};

const sources = [
  {
    name: "KANJIDIC2",
    role: "Kanji readings and stroke counts",
    detail:
      "Kanji card readings (on'yomi and kun'yomi) and stroke counts on this site follow the KANJIDIC2 dictionary file maintained by the Electronic Dictionary Research and Development Group (EDRDG).",
  },
  {
    name: "JMdict",
    role: "Vocabulary definitions",
    detail:
      "English meanings for vocabulary entries follow JMdict / EDRDG word sense data. Part-of-speech labels are simplified for study use.",
  },
  {
    name: "Tatoeba & NHK Easy",
    role: "Example sentences",
    detail:
      "Example sentences appear only when they can be tied to an established corpus such as Tatoeba or NHK News Web Easy. Sentences are never machine-generated — if no verified example exists, the field is left empty.",
  },
];

export default function SourcesPage() {
  return (
    <StubPage
      title="Sources"
      glyph="源"
      sectionHref="/project"
      sectionLabel="Project"
      intro={
        <p>
          The Japanese-language study material is built from typed data files backed by open,
          human-verified references. This page documents the sourcing rules applied across the site.
        </p>
      }
    >
      <ScrollReveal as="section" className="space-y-4">
        <SourceNote>
          <p>
            No Japanese prose on this site is machine-generated. Kanji readings follow{" "}
            <strong>KANJIDIC2</strong>; word definitions follow <strong>JMdict</strong>; example
            sentences come only from established corpora.
          </p>
        </SourceNote>
        <ul className="space-y-4">
          {sources.map((source) => (
            <li key={source.name} className={"rounded-xl p-5 " + glass}>
              <h2 className="font-serif text-lg font-semibold text-ink dark:text-paper-100">
                {source.name}
              </h2>
              <p className="mt-1 text-sm font-medium text-hanko dark:text-hanko-light">
                {source.role}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-light dark:text-paper-200">
                {source.detail}
              </p>
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </StubPage>
  );
}
