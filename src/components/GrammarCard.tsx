import Link from "next/link";

import type { GrammarPoint } from "@/types/content";
import { Formula } from "./Formula";
import { glass, glassHover } from "@/lib/ui";

interface GrammarCardProps {
  point: GrammarPoint;
}

/** Compact grammar point card linking to its detail page (used in listings). */
export function GrammarCard({ point }: GrammarCardProps) {
  const href = `/language/n5/grammar/${point.category}/${point.slug}`;
  return (
    <Link
      href={href}
      className={"group flex flex-col gap-2 rounded-lg p-4 " + glass + " " + glassHover}
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-jp text-xl font-semibold text-ink group-hover:text-hanko dark:text-paper-100 dark:group-hover:text-hanko-light">
          {point.form}
        </span>
        {point.examples.length > 0 && (
          <span className="rounded-full border border-white/50 bg-white/40 px-2 py-0.5 text-[0.65rem] text-ink-muted dark:border-white/10 dark:bg-white/5 dark:text-paper-300">
            {point.examples.length} ex.
          </span>
        )}
      </div>
      <span className="font-serif text-sm font-medium text-ink-light dark:text-paper-200">
        {point.title}
      </span>
      <p className="text-sm text-ink-muted dark:text-paper-300">{point.meaning}</p>
      <div className="mt-1">
        <Formula tokens={point.formula} />
      </div>
    </Link>
  );
}
