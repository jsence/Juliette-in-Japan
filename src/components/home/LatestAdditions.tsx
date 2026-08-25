import Link from "next/link";

import { ScrollReveal } from "@/components/ScrollReveal";
import { formatDate } from "@/lib/progress";
import type { LatestPage } from "@/lib/latestPages";
import { glass, glassLift } from "@/lib/ui";

interface LatestAdditionsProps {
  pages: LatestPage[];
}

/** Row of the most recently updated pages. */
export function LatestAdditions({ pages }: LatestAdditionsProps) {
  if (pages.length === 0) return null;

  return (
    <ScrollReveal as="section" aria-labelledby="latest-heading">
      <h2
        id="latest-heading"
        className="mb-6 font-serif text-xl font-semibold text-ink dark:text-paper-100 sm:text-2xl"
      >
        Latest additions
      </h2>
      <ul className="grid gap-4 sm:grid-cols-3">
        {pages.map((page, i) => (
          <ScrollReveal key={page.href} as="li" index={i}>
            <Link
              href={page.href}
              className={"group flex h-full flex-col gap-2 rounded-xl p-5 " + glass + " " + glassLift}
            >
              <time
                dateTime={page.date}
                className="text-xs font-medium uppercase tracking-wide text-hanko dark:text-hanko-light"
              >
                {formatDate(page.date)}
              </time>
              <span className="font-serif text-lg font-semibold text-ink group-hover:text-hanko dark:text-paper-100 dark:group-hover:text-hanko-light">
                {page.title}
              </span>
            </Link>
          </ScrollReveal>
        ))}
      </ul>
    </ScrollReveal>
  );
}
