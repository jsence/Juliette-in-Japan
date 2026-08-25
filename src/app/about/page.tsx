import type { Metadata } from "next";

import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Background, professional skills, and why this profile fits the Japanese market — with CV, LinkedIn and contact.",
};

const skills = [
  "Product & software engineering",
  "Cross-cultural collaboration",
  "Technical writing & documentation",
  "Data-informed decision making",
];

const fit = [
  "A genuine, sustained commitment to learning the language — not a one-off enthusiasm.",
  "Experience working across time zones and cultures, comfortable with ambiguity.",
  "A builder's habit of documenting and sharing what I learn.",
];

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="About"
        glyph="私"
        intro={
          <p>
            I&apos;m Juliette. This site is the public, honest record of my path toward working in
            Japan — the study, the culture I&apos;m absorbing, and the professional groundwork.
          </p>
        }
      />

      <ScrollReveal as="section" className="space-y-3">
        <h2 className="font-serif text-2xl font-semibold text-ink dark:text-paper-100">Background</h2>
        <p className="max-w-2xl text-ink-light dark:text-paper-200">
          I come from a technical background and I&apos;m preparing, deliberately and in the open,
          to relocate and work in Japan. Rather than another private study routine, I&apos;m keeping
          everything here: sources I trust, progress I can prove, and reflections I can look back on.
        </p>
      </ScrollReveal>

      <section className="grid gap-4 sm:grid-cols-2">
        <ScrollReveal className="rounded-lg border border-paper-300 bg-paper-50 p-5 dark:border-sumi-border dark:bg-sumi-light">
          <h2 className="font-serif text-lg font-semibold text-ink dark:text-paper-100">Professional skills</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-light dark:text-paper-200">
            {skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </ScrollReveal>
        <ScrollReveal index={1} className="rounded-lg border border-paper-300 bg-paper-50 p-5 dark:border-sumi-border dark:bg-sumi-light">
          <h2 className="font-serif text-lg font-semibold text-ink dark:text-paper-100">Why my profile fits</h2>
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
          className="rounded-md border border-paper-300 px-5 py-2.5 font-medium text-ink transition hover:bg-paper-200 dark:border-sumi-border dark:text-paper-100 dark:hover:bg-sumi-light"
        >
          LinkedIn
        </a>
        <a
          href={`mailto:${site.links.email}`}
          className="rounded-md border border-paper-300 px-5 py-2.5 font-medium text-ink transition hover:bg-paper-200 dark:border-sumi-border dark:text-paper-100 dark:hover:bg-sumi-light"
        >
          Contact
        </a>
      </ScrollReveal>
    </div>
  );
}
