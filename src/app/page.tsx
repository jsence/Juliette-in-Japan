import Link from "next/link";

import { ScrollReveal } from "@/components/ScrollReveal";
import { Hanko } from "@/components/Hanko";
import { sections, site } from "@/lib/site";
import { glass, glassHover } from "@/lib/ui";

export default function HomePage() {
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
              href="/language"
              className="rounded-md bg-hanko px-5 py-2.5 font-medium text-paper-50 transition hover:bg-hanko-dark"
            >
              Explore Language
            </Link>
            <Link
              href="/project"
              className={"rounded-md px-5 py-2.5 font-medium text-ink dark:text-paper-100 " + glass + " " + glassHover}
            >
              About this project
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, i) => (
            <ScrollReveal key={section.href} index={i}>
              <Link
                href={section.href}
                className={"group flex h-full flex-col gap-3 rounded-xl p-5 " + glass + " " + glassHover}
              >
                <div className="flex items-center gap-3">
                  <Hanko size="md" className="transition group-hover:animate-seal-in">
                    {section.glyph}
                  </Hanko>
                  <h3 className="font-serif text-lg font-semibold text-ink group-hover:text-hanko dark:text-paper-100 dark:group-hover:text-hanko-light">
                    {section.label}
                  </h3>
                </div>
                <p className="text-sm text-ink-light dark:text-paper-200">{section.description}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
                  {section.subPages.map((page) => (
                    <li
                      key={page.href}
                      className="rounded-full border border-white/50 bg-white/40 px-2 py-0.5 text-xs text-ink-muted dark:border-white/10 dark:bg-white/5 dark:text-paper-300"
                    >
                      {page.label}
                    </li>
                  ))}
                </ul>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
