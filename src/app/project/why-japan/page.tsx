import type { Metadata } from "next";

import { ScrollReveal } from "@/components/ScrollReveal";
import { StubPage } from "@/components/StubPage";
import { site } from "@/lib/site";
import { glass } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Why Japan",
  description: "The motivation and goals behind this documentation project.",
};

const skills = [
  "Product & software engineering",
  "Cross-cultural collaboration",
  "Technical writing & documentation",
  "Data-informed decision making",
];

const fit = [
  "A sustained, structured commitment to learning the language.",
  "Experience working across time zones and cultures.",
  "A habit of documenting and sharing learning.",
];

export default function WhyJapanPage() {
  return (
    <StubPage
      title="Why Japan"
      glyph="日"
      sectionHref="/project"
      sectionLabel="Project"
      intro={
        <p>
          The motivation behind this site: preparing to live and work in Japan, and documenting that
          preparation in a structured, reference-friendly form.
        </p>
      }
    >
      <ScrollReveal as="section" className="space-y-3">
        <h2 className="font-serif text-2xl font-semibold text-ink dark:text-paper-100">Background</h2>
        <p className="max-w-2xl text-ink-light dark:text-paper-200">
          Juliette has a technical background and is preparing to relocate and work in Japan. This
          site documents that preparation: Japanese-language study, notes on culture and history,
          and material on working life in Japan.
        </p>
      </ScrollReveal>

      <section className="grid gap-4 sm:grid-cols-2">
        <ScrollReveal className={"rounded-lg p-5 " + glass}>
          <h2 className="font-serif text-lg font-semibold text-ink dark:text-paper-100">
            Professional skills
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-light dark:text-paper-200">
            {skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </ScrollReveal>
        <ScrollReveal index={1} className={"rounded-lg p-5 " + glass}>
          <h2 className="font-serif text-lg font-semibold text-ink dark:text-paper-100">
            Relevance to the Japanese market
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-light dark:text-paper-200">
            {fit.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </ScrollReveal>
      </section>

      <ScrollReveal as="section" className="flex flex-wrap gap-3">
        <a
          href={site.links.cv}
          className="rounded-md bg-hanko px-5 py-2.5 font-medium text-paper-50 transition hover:bg-hanko-dark"
        >
          Download CV
        </a>
        <a
          href={site.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={"rounded-md px-5 py-2.5 font-medium text-ink dark:text-paper-100 " + glass}
        >
          LinkedIn
        </a>
        <a
          href={`mailto:${site.links.email}`}
          className={"rounded-md px-5 py-2.5 font-medium text-ink dark:text-paper-100 " + glass}
        >
          Contact
        </a>
      </ScrollReveal>
    </StubPage>
  );
}
