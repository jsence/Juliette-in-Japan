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

interface Source {
  name: string;
  role: string;
  detail: string;
  /** Home page for the dataset, shown as a link where a licence requires it. */
  url?: string;
  licence?: string;
}

const sources: Source[] = [
  {
    name: "KANJIDIC2",
    role: "Kanji readings, stroke counts and radicals",
    detail:
      "Kanji card readings (on'yomi and kun'yomi), stroke counts and classical Kangxi radicals on this site follow the KANJIDIC2 dictionary file maintained by the Electronic Dictionary Research and Development Group (EDRDG).",
    url: "https://www.edrdg.org/wiki/index.php/KANJIDIC_Project",
  },
  {
    name: "JMdict",
    role: "Vocabulary definitions and example words",
    detail:
      "English meanings for vocabulary entries follow JMdict / EDRDG word sense data, and the example words on each kana and kanji detail panel are selected from JMdict's common-words set. Part-of-speech labels are simplified for study use. Where no common JMdict word contains a character, the panel shows nothing rather than an invented example.",
    url: "https://www.edrdg.org/wiki/index.php/JMdict-EDICT_Dictionary_Project",
  },
  {
    name: "KanjiVG",
    role: "Stroke-order diagrams",
    detail:
      "The animated and numbered stroke-order diagrams are drawn from KanjiVG stroke data by Ulrich Apel. The extracted outlines served from /strokes are a derivative work and are redistributed under the same licence.",
    url: "https://kanjivg.tagaini.net",
    licence: "CC BY-SA 3.0",
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
            <strong>KANJIDIC2</strong>; word definitions and example words follow{" "}
            <strong>JMdict</strong>; stroke-order diagrams come from <strong>KanjiVG</strong>;
            example sentences come only from established corpora.
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
              {(source.url || source.licence) && (
                <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted dark:text-paper-300">
                  {source.url && (
                    <a
                      href={source.url}
                      className="font-medium text-hanko underline decoration-hanko/40 underline-offset-2 hover:decoration-hanko dark:text-hanko-light"
                      rel="noreferrer"
                      target="_blank"
                    >
                      {source.url.replace(/^https?:\/\//, "")}
                    </a>
                  )}
                  {source.licence && (
                    <span className="rounded-full border border-white/50 bg-white/40 px-2 py-0.5 dark:border-white/10 dark:bg-white/5">
                      {source.licence}
                    </span>
                  )}
                </p>
              )}
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </StubPage>
  );
}
