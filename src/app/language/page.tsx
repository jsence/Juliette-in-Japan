import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/PageHeader";
import { ResourceLink } from "@/components/ResourceLink";
import { ScrollReveal } from "@/components/ScrollReveal";
import { resources } from "@/lib/data";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/progress";

export const metadata: Metadata = {
  title: "Language",
  description:
    "My honest current level, weekly routine, what works and what doesn't, and the resources I actually use.",
};

const routine = [
  { day: "Mon–Fri", focus: "20 min SRS reviews before work; 15 min grammar reading at lunch." },
  { day: "Tue / Thu", focus: "One Genki lesson section with written exercises." },
  { day: "Wed", focus: "NHK News Web Easy — read one article aloud, look up unknown words." },
  { day: "Sat", focus: "Longer session: new kanji batch, then quiz myself on the week." },
  { day: "Sun", focus: "Light review only, or rest. No streak guilt." },
];

const working = [
  "Small daily SRS beats long weekend cram sessions.",
  "Writing kanji by hand fixes readings far better than recognition alone.",
  "Reading real (graded) news exposes gaps textbooks hide.",
];

const notWorking = [
  "Passive video watching — feels productive, teaches me almost nothing.",
  "Chasing the kanji count as a number instead of consolidating words.",
  "Grammar apps that gamify without ever making me produce a sentence.",
];

export default function LanguagePage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Language"
        glyph="語"
        dateLabel={`Reviewed ${formatDate(new Date().toISOString().slice(0, 10))}`}
        intro={<p>Where I actually am, how I study, and the resources I&apos;d recommend to my past self.</p>}
      />

      <ScrollReveal as="section" className="rounded-xl border border-paper-300 bg-paper-50 p-6 dark:border-sumi-border dark:bg-sumi-light">
        <h2 className="font-serif text-xl font-semibold text-ink dark:text-paper-100">Current level, honestly</h2>
        <p className="mt-2 text-ink-light dark:text-paper-200">{site.currentLevel}</p>
        <p className="mt-2 text-sm text-ink-muted dark:text-paper-300">
          Target: JLPT {site.jlptTarget.level} on {formatDate(site.jlptTarget.date)}.{" "}
          <Link href="/language/n5" className="text-hanko hover:underline dark:text-hanko-light">
            Go to the N5 study hub →
          </Link>
        </p>
      </ScrollReveal>

      <ScrollReveal as="section" className="space-y-3">
        <h2 className="font-serif text-2xl font-semibold text-ink dark:text-paper-100">Weekly routine</h2>
        <ul className="divide-y divide-paper-200 overflow-hidden rounded-lg border border-paper-300 dark:divide-sumi-border dark:border-sumi-border">
          {routine.map((r) => (
            <li key={r.day} className="flex flex-col gap-1 bg-paper-50 p-4 sm:flex-row sm:gap-4 dark:bg-sumi-light">
              <span className="w-28 shrink-0 font-medium text-hanko dark:text-hanko-light">{r.day}</span>
              <span className="text-ink-light dark:text-paper-200">{r.focus}</span>
            </li>
          ))}
        </ul>
      </ScrollReveal>

      <section className="grid gap-4 sm:grid-cols-2">
        <ScrollReveal className="rounded-lg border border-paper-300 bg-paper-50 p-5 dark:border-sumi-border dark:bg-sumi-light">
          <h2 className="font-serif text-lg font-semibold text-ink dark:text-paper-100">What works</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-light dark:text-paper-200">
            {working.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </ScrollReveal>
        <ScrollReveal index={1} className="rounded-lg border border-paper-300 bg-paper-50 p-5 dark:border-sumi-border dark:bg-sumi-light">
          <h2 className="font-serif text-lg font-semibold text-ink dark:text-paper-100">What doesn&apos;t</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-light dark:text-paper-200">
            {notWorking.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </ScrollReveal>
      </section>

      <section className="space-y-4">
        <ScrollReveal>
          <h2 className="font-serif text-2xl font-semibold text-ink dark:text-paper-100">
            Resources I actually use
          </h2>
          <p className="mt-1 text-sm text-ink-muted dark:text-paper-300">
            With my own comments — the good and the caveats.
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
