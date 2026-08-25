import type { ReactNode } from "react";
import Link from "next/link";

import { PageHeader } from "./PageHeader";
import { ScrollReveal } from "./ScrollReveal";
import { glass } from "@/lib/ui";

interface StubPageProps {
  title: string;
  glyph: string;
  sectionHref: string;
  sectionLabel: string;
  intro: ReactNode;
  /** Optional sub-navigation rendered above the header. */
  subNav?: ReactNode;
  children?: ReactNode;
}

/** A sub-page with standard layout; shows a placeholder when content is not yet written. */
export function StubPage({
  title,
  glyph,
  sectionHref,
  sectionLabel,
  intro,
  subNav,
  children,
}: StubPageProps) {
  return (
    <div className="space-y-8">
      {subNav}
      <PageHeader title={title} glyph={glyph} intro={intro} />
      {children ?? (
        <ScrollReveal as="section" className={"rounded-xl p-6 " + glass}>
          <p className="text-ink-light dark:text-paper-200">
            This page is a placeholder. Content for this topic will be added in a future update.
          </p>
        </ScrollReveal>
      )}
      <ScrollReveal>
        <p className="text-sm text-ink-muted dark:text-paper-300">
          <Link href={sectionHref} className="text-hanko hover:underline dark:text-hanko-light">
            ← Back to {sectionLabel}
          </Link>
        </p>
      </ScrollReveal>
    </div>
  );
}
