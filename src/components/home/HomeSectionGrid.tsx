import Link from "next/link";

import { ScrollReveal } from "@/components/ScrollReveal";
import type { SiteSection } from "@/lib/site";
import { glass, glassLift } from "@/lib/ui";

interface HomeSectionGridProps {
  sections: SiteSection[];
}

/** Asymmetric glass card grid — Language spans a larger cell. */
export function HomeSectionGrid({ sections }: HomeSectionGridProps) {
  const language = sections.find((s) => s.id === "language")!;
  const others = sections.filter((s) => s.id !== "language");

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
      <ScrollReveal index={0} className="h-full sm:col-span-2 lg:row-span-2">
        <SectionCard section={language} large />
      </ScrollReveal>
      {others.map((section, i) => (
        <ScrollReveal key={section.href} index={i + 1} className="h-full">
          <SectionCard section={section} />
        </ScrollReveal>
      ))}
    </div>
  );
}

function SectionCard({ section, large = false }: { section: SiteSection; large?: boolean }) {
  return (
    <Link
      href={section.href}
      className={
        "group relative flex h-full min-h-[9.5rem] flex-col overflow-hidden rounded-2xl p-6 " +
        glass +
        " " +
        glassLift +
        (large ? " min-h-[20rem] justify-end sm:min-h-[22rem] lg:min-h-full" : "")
      }
    >
      <span
        aria-hidden="true"
        className={
          "pointer-events-none absolute -right-2 -top-4 select-none font-jp font-semibold text-hanko/10 transition duration-500 group-hover:text-hanko/15 dark:text-hanko-light/10 dark:group-hover:text-hanko-light/15 " +
          (large ? "text-[8rem] leading-none" : "text-[5.5rem] leading-none")
        }
      >
        {section.glyph}
      </span>
      <div className="relative mt-auto space-y-2">
        <h3
          className={
            "font-serif font-semibold text-ink transition group-hover:text-hanko dark:text-paper-100 dark:group-hover:text-hanko-light " +
            (large ? "text-2xl sm:text-3xl" : "text-xl")
          }
        >
          {section.label}
        </h3>
        <p className={"text-ink-light dark:text-paper-200 " + (large ? "max-w-md text-base" : "text-sm")}>
          {section.description}
        </p>
      </div>
    </Link>
  );
}
