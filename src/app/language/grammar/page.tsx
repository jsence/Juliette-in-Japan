import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/PageHeader";
import { LanguageSubNav } from "@/components/LanguageSubNav";
import { Hanko } from "@/components/Hanko";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getGrammarCategories } from "@/lib/data";
import { glass, glassHover } from "@/lib/ui";

export const metadata: Metadata = {
  title: "N5 grammar",
  description:
    "N5 grammar organised by function across 11 categories — from the basic sentence to time and frequency.",
};

export default function GrammarIndexPage() {
  const categories = getGrammarCategories();
  const total = categories.reduce((sum, c) => sum + c.items.length, 0);

  return (
    <div className="space-y-8">
      <LanguageSubNav />
      <PageHeader
        title="Grammar"
        glyph="文"
        intro={
          <p>
            Organised by <strong>function, not alphabetically</strong>: {total} points across 11
            categories, so related patterns sit together. Start at the basic sentence and work
            downward, or jump to whatever you&apos;re wrestling with. Every explanation is written
            by hand; example sentences come only from open corpora.
          </p>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {categories.map((cat, i) => (
          <ScrollReveal key={cat.meta.slug} index={i}>
            <Link
              href={`/language/grammar/${cat.meta.slug}`}
              className={"group flex h-full items-start gap-4 rounded-xl p-5 " + glass + " " + glassHover}
            >
              <Hanko size="md" className="transition group-hover:animate-seal-in">
                {cat.meta.glyph}
              </Hanko>
              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <h2 className="font-serif text-lg font-semibold text-ink group-hover:text-hanko dark:text-paper-100 dark:group-hover:text-hanko-light">
                    {cat.meta.label}
                  </h2>
                  <span className="shrink-0 text-xs text-ink-muted dark:text-paper-300">
                    {cat.items.length} {cat.items.length === 1 ? "point" : "points"}
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink-light dark:text-paper-200">{cat.meta.blurb}</p>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
