import Link from "next/link";

import { ProgressCounters } from "@/components/ProgressCounters";
import { SectionCard } from "@/components/SectionCard";
import { JournalEntry } from "@/components/JournalEntry";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Hanko } from "@/components/Hanko";
import { site } from "@/lib/site";
import { getPosts } from "@/lib/posts";
import { formatDate } from "@/lib/progress";

const sections = [
  { href: "/language", title: "Language", glyph: "語", description: "My honest level, weekly routine, and the resources I actually use." },
  { href: "/language/n5", title: "N5 study hub", glyph: "五", description: "Kana, kanji, vocabulary, grammar and review — built from open data." },
  { href: "/culture", title: "Culture", glyph: "文", description: "Short, dated notes on history, traditions, regions and food." },
  { href: "/work", title: "Working in Japan", glyph: "働", description: "Hierarchy, keigo, hiring, visas, and real job postings I analyse." },
  { href: "/journal", title: "Journal", glyph: "記", description: "Reflections, doubts, mistakes and small discoveries — dated." },
  { href: "/about", title: "About", glyph: "私", description: "My background, skills, and why my profile fits the Japanese market." },
];

export default function HomePage() {
  const latestJournal = getPosts("journal").slice(0, 3);

  return (
    <div className="space-y-16">
      <section className="relative">
        <ScrollReveal className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Hanko size="lg" className="animate-seal-in">日本</Hanko>
            <p className="text-sm font-medium uppercase tracking-widest text-hanko dark:text-hanko-light">
              A learning log · updated {formatDate(new Date().toISOString().slice(0, 10))}
            </p>
          </div>
          <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight text-ink dark:text-paper-100 sm:text-5xl">
            {site.name}
          </h1>
          <div className="max-w-2xl space-y-2 text-lg text-ink-light dark:text-paper-200">
            {site.pitch.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/language/n5"
              className="rounded-md bg-hanko px-5 py-2.5 font-medium text-paper-50 transition hover:bg-hanko-dark"
            >
              Start with N5
            </Link>
            <Link
              href="/journal"
              className="rounded-md border border-paper-300 px-5 py-2.5 font-medium text-ink transition hover:bg-paper-200 dark:border-sumi-border dark:text-paper-100 dark:hover:bg-sumi-light"
            >
              Read the journal
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <section aria-labelledby="progress-heading" className="space-y-4">
        <ScrollReveal>
          <h2 id="progress-heading" className="font-serif text-2xl font-semibold text-ink dark:text-paper-100">
            Progress, honestly
          </h2>
        </ScrollReveal>
        <ProgressCounters />
      </section>

      <section aria-labelledby="latest-heading" className="space-y-4">
        <ScrollReveal className="flex items-baseline justify-between">
          <h2 id="latest-heading" className="font-serif text-2xl font-semibold text-ink dark:text-paper-100">
            Latest from the journal
          </h2>
          <Link href="/journal" className="text-sm font-medium text-hanko hover:underline dark:text-hanko-light">
            All entries →
          </Link>
        </ScrollReveal>
        {latestJournal.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latestJournal.map((post, i) => (
              <ScrollReveal key={post.slug} index={i}>
                <JournalEntry post={post} compact />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <p className="text-ink-muted dark:text-paper-300">No entries yet — the first one is coming soon.</p>
        )}
      </section>

      <section aria-labelledby="sections-heading" className="space-y-4">
        <ScrollReveal>
          <h2 id="sections-heading" className="font-serif text-2xl font-semibold text-ink dark:text-paper-100">
            Explore
          </h2>
        </ScrollReveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s, i) => (
            <ScrollReveal key={s.href} index={i}>
              <SectionCard {...s} />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
