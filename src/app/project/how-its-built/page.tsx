import type { Metadata } from "next";

import { ScrollReveal } from "@/components/ScrollReveal";
import { StubPage } from "@/components/StubPage";
import { glass } from "@/lib/ui";

export const metadata: Metadata = {
  title: "How it's built",
  description: "The technical stack, data sources and site architecture.",
};

const stack = [
  { label: "Framework", detail: "Next.js 14 (App Router) with React 18 and TypeScript." },
  { label: "Styling", detail: "Tailwind CSS with a warm paper palette, serif headings and glassmorphism panels." },
  { label: "Content", detail: "Typed JSON data files for study material; MDX for long-form notes where needed." },
  { label: "Flashcards", detail: "SM-2 spaced repetition with state stored in the browser's local storage." },
];

const dataSources = [
  "KANJIDIC2 for kanji readings and stroke counts.",
  "JMdict for vocabulary definitions.",
  "Tatoeba and NHK Easy for example sentences (never machine-generated).",
];

export default function HowItsBuiltPage() {
  return (
    <StubPage
      title="How it's built"
      glyph="構"
      sectionHref="/project"
      sectionLabel="Project"
      intro={
        <p>
          A technical overview of this site — the stack, how study data is structured, and the
          sourcing rules that govern Japanese-language content.
        </p>
      }
    >
      <ScrollReveal as="section" className="space-y-3">
        <h2 className="font-serif text-2xl font-semibold text-ink dark:text-paper-100">Stack</h2>
        <ul className={"divide-y divide-white/40 overflow-hidden rounded-lg dark:divide-white/10 " + glass}>
          {stack.map((item) => (
            <li key={item.label} className="flex flex-col gap-1 p-4 sm:flex-row sm:gap-4">
              <span className="w-32 shrink-0 font-medium text-hanko dark:text-hanko-light">
                {item.label}
              </span>
              <span className="text-ink-light dark:text-paper-200">{item.detail}</span>
            </li>
          ))}
        </ul>
      </ScrollReveal>

      <ScrollReveal as="section" className="space-y-3">
        <h2 className="font-serif text-2xl font-semibold text-ink dark:text-paper-100">Data sources</h2>
        <ul className={"list-disc space-y-1 rounded-lg p-5 pl-10 text-sm text-ink-light dark:text-paper-200 " + glass}>
          {dataSources.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </ScrollReveal>
    </StubPage>
  );
}
