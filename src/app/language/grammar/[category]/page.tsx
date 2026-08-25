import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/PageHeader";
import { LanguageSubNav } from "@/components/LanguageSubNav";
import { GrammarCard } from "@/components/GrammarCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  GRAMMAR_CATEGORIES,
  getCategoryMeta,
  getGrammarByCategorySlug,
} from "@/lib/data";
import type { GrammarCategorySlug } from "@/types/content";

interface Params {
  params: { category: string };
}

export function generateStaticParams() {
  return GRAMMAR_CATEGORIES.map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const meta = getCategoryMeta(params.category);
  if (!meta) return {};
  return { title: `${meta.label} — N5 grammar`, description: meta.blurb };
}

export default function GrammarCategoryPage({ params }: Params) {
  const meta = getCategoryMeta(params.category);
  if (!meta) notFound();

  const points = getGrammarByCategorySlug(params.category as GrammarCategorySlug);

  return (
    <div className="space-y-8">
      <LanguageSubNav />
      <div>
        <Link
          href="/language/grammar"
          className="text-sm font-medium text-hanko hover:underline dark:text-hanko-light"
        >
          ← All grammar categories
        </Link>
      </div>
      <PageHeader title={meta.label} glyph={meta.glyph} intro={<p>{meta.blurb}</p>} />

      {points.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {points.map((point, i) => (
            <ScrollReveal key={point.id} index={i}>
              <GrammarCard point={point} />
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <p className="text-ink-muted dark:text-paper-300">
          No points in this category yet — coming soon.
        </p>
      )}
    </div>
  );
}
