import type { ReactNode } from "react";
import { Hanko } from "./Hanko";
import { ScrollReveal } from "./ScrollReveal";

interface PageHeaderProps {
  title: string;
  /** Decorative Japanese glyph shown as a seal beside the title. */
  glyph?: string;
  intro?: ReactNode;
  /** Optional dated line (proof of consistency). */
  dateLabel?: string;
}

/** Shared page header with a serif title, optional hanko glyph and intro. */
export function PageHeader({ title, glyph, intro, dateLabel }: PageHeaderProps) {
  return (
    <ScrollReveal as="section" className="mb-8">
      <div className="flex items-center gap-3">
        {glyph && <Hanko size="md">{glyph}</Hanko>}
        <div>
          {dateLabel && (
            <p className="text-xs font-medium uppercase tracking-wide text-hanko dark:text-hanko-light">
              {dateLabel}
            </p>
          )}
          <h1 className="font-serif text-3xl font-bold text-ink dark:text-paper-100 sm:text-4xl">
            {title}
          </h1>
        </div>
      </div>
      {intro && (
        <div className="mt-4 max-w-2xl text-ink-light dark:text-paper-200">{intro}</div>
      )}
    </ScrollReveal>
  );
}
