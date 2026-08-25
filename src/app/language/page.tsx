import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/PageHeader";
import { ResourceLink } from "@/components/ResourceLink";
import { ScrollReveal } from "@/components/ScrollReveal";
import { resources } from "@/lib/data";
import { glass } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Language",
  description:
    "An overview of the Japanese language material: the N5 modules, how they are organised, and curated study resources.",
};

const modules = [
  { title: "Kana", text: "Hiragana and katakana with stroke counts and the modified sounds (dakuten, yōon)." },
  { title: "Kanji", text: "Character cards with meanings, on'yomi and kun'yomi readings, stroke counts and common words." },
  { title: "Grammar", text: "N5 grammar organised by function across 11 categories, each point with a construction formula and examples." },
  { title: "Vocabulary", text: "Words grouped by theme, with readings and definitions." },
  { title: "Flashcard drills", text: "SM-2 spaced-repetition review with four study modes and deck selection." },
];

const routine = [
  { day: "Mon–Fri", focus: "A short spaced-repetition review, plus focused grammar reading." },
  { day: "Tue / Thu", focus: "One grammar section worked through with written exercises." },
  { day: "Wed", focus: "Graded reading (for example, NHK News Web Easy), noting unknown words." },
  { day: "Sat", focus: "A longer session: a new kanji set, then review of the week." },
  { day: "Sun", focus: "Light review or rest." },
];

export default function LanguagePage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Language"
        glyph="語"
        intro={
          <p>
            The Japanese-language section covers the N5 modules and the resources behind them.
            Material is built from typed data files, with kanji readings following KANJIDIC2 and
            word definitions following JMdict.
          </p>
        }
      />

      <ScrollReveal as="section" className={"rounded-xl p-6 " + glass}>
        <h2 className="font-serif text-xl font-semibold text-ink dark:text-paper-100">N5 study hub</h2>
        <p className="mt-2 text-ink-light dark:text-paper-200">
          The study material is grouped into modules for kana, kanji, grammar, vocabulary and
          flashcard review, with a guided lesson path that bundles them together.
        </p>
        <p className="mt-2 text-sm">
          <Link href="/language/n5" className="text-hanko hover:underline dark:text-hanko-light">
            Open the N5 study hub →
          </Link>
        </p>
      </ScrollReveal>

      <ScrollReveal as="section" className="space-y-3">
        <h2 className="font-serif text-2xl font-semibold text-ink dark:text-paper-100">Modules</h2>
        <ul className={"divide-y divide-white/40 overflow-hidden rounded-lg dark:divide-white/10 " + glass}>
          {modules.map((m) => (
            <li key={m.title} className="flex flex-col gap-1 p-4 sm:flex-row sm:gap-4">
              <span className="w-40 shrink-0 font-medium text-hanko dark:text-hanko-light">{m.title}</span>
              <span className="text-ink-light dark:text-paper-200">{m.text}</span>
            </li>
          ))}
        </ul>
      </ScrollReveal>

      <ScrollReveal as="section" className="space-y-3">
        <h2 className="font-serif text-2xl font-semibold text-ink dark:text-paper-100">A suggested weekly routine</h2>
        <ul className={"divide-y divide-white/40 overflow-hidden rounded-lg dark:divide-white/10 " + glass}>
          {routine.map((r) => (
            <li key={r.day} className="flex flex-col gap-1 p-4 sm:flex-row sm:gap-4">
              <span className="w-28 shrink-0 font-medium text-hanko dark:text-hanko-light">{r.day}</span>
              <span className="text-ink-light dark:text-paper-200">{r.focus}</span>
            </li>
          ))}
        </ul>
      </ScrollReveal>

      <section className="space-y-4">
        <ScrollReveal>
          <h2 className="font-serif text-2xl font-semibold text-ink dark:text-paper-100">Resources</h2>
          <p className="mt-1 text-sm text-ink-muted dark:text-paper-300">
            Established, widely used resources for studying at the N5 level.
          </p>
        </ScrollReveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {resources.map((resource, i) => (
            <ScrollReveal key={resource.name} index={i}>
              <ResourceLink resource={resource} />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
