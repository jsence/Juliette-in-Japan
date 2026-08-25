import Link from "next/link";

import { JournalEntry } from "@/components/JournalEntry";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Hanko } from "@/components/Hanko";
import { site } from "@/lib/site";
import { getPosts } from "@/lib/posts";
import { glass, glassHover } from "@/lib/ui";

const contents = [
  {
    href: "/language",
    title: "Language",
    glyph: "語",
    description: "The Japanese writing systems, grammar and vocabulary, with spaced-repetition drills.",
    keywords: ["Kana", "Kanji", "Grammar by function", "Vocabulary", "Flashcard drills"],
  },
  {
    href: "/culture",
    title: "Culture & History",
    glyph: "文",
    description: "Dated entries on Japanese traditions, regions, food and history.",
    keywords: ["Traditions", "Regions", "Food", "History"],
  },
  {
    href: "/work",
    title: "Working in Japan",
    glyph: "働",
    description: "How Japanese workplaces operate, from etiquette to the hiring process.",
    keywords: ["Hierarchy", "Meeting etiquette", "Business keigo", "Hiring & visas"],
  },
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
              Japanese language · culture · work
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
              className={"rounded-md px-5 py-2.5 font-medium text-ink dark:text-paper-100 " + glass + " " + glassHover}
            >
              Read the journal
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <section aria-labelledby="inside-heading" className="space-y-4">
        <ScrollReveal>
          <h2 id="inside-heading" className="font-serif text-2xl font-semibold text-ink dark:text-paper-100">
            What&apos;s inside
          </h2>
        </ScrollReveal>
        <div className="grid gap-4 md:grid-cols-3">
          {contents.map((c, i) => (
            <ScrollReveal key={c.href} index={i}>
              <Link
                href={c.href}
                className={"group flex h-full flex-col gap-3 rounded-xl p-5 " + glass + " " + glassHover}
              >
                <div className="flex items-center gap-3">
                  <Hanko size="md" className="transition group-hover:animate-seal-in">
                    {c.glyph}
                  </Hanko>
                  <h3 className="font-serif text-lg font-semibold text-ink group-hover:text-hanko dark:text-paper-100 dark:group-hover:text-hanko-light">
                    {c.title}
                  </h3>
                </div>
                <p className="text-sm text-ink-light dark:text-paper-200">{c.description}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
                  {c.keywords.map((kw) => (
                    <li
                      key={kw}
                      className="rounded-full border border-white/50 bg-white/40 px-2 py-0.5 text-xs text-ink-muted dark:border-white/10 dark:bg-white/5 dark:text-paper-300"
                    >
                      {kw}
                    </li>
                  ))}
                </ul>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="latest-heading" className="space-y-4">
        <ScrollReveal className="flex items-baseline justify-between">
          <h2 id="latest-heading" className="font-serif text-2xl font-semibold text-ink dark:text-paper-100">
            Latest journal entries
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
          <p className="text-ink-muted dark:text-paper-300">No entries yet.</p>
        )}
      </section>
    </div>
  );
}
