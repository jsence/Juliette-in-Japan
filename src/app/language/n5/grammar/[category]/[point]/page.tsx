import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { N5SubNav } from "@/components/N5SubNav";
import { GrammarPoint } from "@/components/GrammarPoint";
import { Hanko } from "@/components/Hanko";
import {
  getCategoryMeta,
  getGrammarPoint,
  getGrammarPointById,
  getGrammarPointParams,
} from "@/lib/data";

interface Params {
  params: { category: string; point: string };
}

export function generateStaticParams() {
  return getGrammarPointParams();
}

export function generateMetadata({ params }: Params): Metadata {
  const point = getGrammarPoint(params.category, params.point);
  if (!point) return {};
  return { title: `${point.title} — N5 grammar`, description: point.meaning };
}

export default function GrammarPointPage({ params }: Params) {
  const point = getGrammarPoint(params.category, params.point);
  const meta = getCategoryMeta(params.category);
  if (!point || !meta) notFound();

  const related = point.related
    .map((id) => getGrammarPointById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .map((p) => ({
      id: p.id,
      title: p.title,
      href: `/language/n5/grammar/${p.category}/${p.slug}`,
    }));

  return (
    <div className="space-y-8">
      <N5SubNav />

      <nav aria-label="Breadcrumb" className="text-sm text-ink-muted dark:text-paper-300">
        <Link href="/language/n5/grammar" className="hover:text-hanko dark:hover:text-hanko-light">
          Grammar
        </Link>
        <span className="mx-1.5">/</span>
        <Link
          href={`/language/n5/grammar/${meta.slug}`}
          className="hover:text-hanko dark:hover:text-hanko-light"
        >
          {meta.label}
        </Link>
      </nav>

      <header className="flex items-center gap-3">
        <Hanko size="md">{meta.glyph}</Hanko>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-hanko dark:text-hanko-light">
            {meta.label}
          </p>
          <h1 className="font-serif text-3xl font-bold text-ink dark:text-paper-100 sm:text-4xl">
            {point.title}
          </h1>
        </div>
      </header>

      <GrammarPoint point={point} related={related} />
    </div>
  );
}
