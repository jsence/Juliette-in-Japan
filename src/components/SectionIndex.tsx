import type { ReactNode } from "react";

import { PageHeader } from "./PageHeader";
import { ScrollReveal } from "./ScrollReveal";
import { SectionCard } from "./SectionCard";
import type { SiteSection } from "@/lib/site";

interface SectionIndexProps {
  section: SiteSection;
  intro?: ReactNode;
  /** Optional content rendered between the header and the sub-page cards. */
  beforeCards?: ReactNode;
  /** Optional dynamic descriptions keyed by sub-page href. */
  cardDescriptions?: Record<string, string>;
}

/** Index page listing a section's sub-pages with one-line descriptions. */
export function SectionIndex({
  section,
  intro,
  beforeCards,
  cardDescriptions,
}: SectionIndexProps) {
  return (
    <div className="space-y-8">
      <PageHeader
        title={section.label}
        glyph={section.glyph}
        intro={intro ?? <p>{section.description}</p>}
      />
      {beforeCards}
      <div className="grid gap-4 sm:grid-cols-2">
        {section.subPages.map((page, i) => (
          <ScrollReveal key={page.href} index={i}>
            <SectionCard
              href={page.href}
              title={page.label}
              glyph={page.glyph ?? section.glyph}
              description={cardDescriptions?.[page.href] ?? page.description}
            />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
