import Link from "next/link";

import { ScrollReveal } from "@/components/ScrollReveal";
import { kana, kanji, grammar, vocabulary } from "@/lib/data";
import { glass, glassLift } from "@/lib/ui";

/** Counts are read from the typed data modules, so they are fixed at build time. */
const ITEMS = [
  { label: "Kana", unit: "characters", glyph: "あ", href: "/language/kana", count: kana.length },
  { label: "Kanji", unit: "cards", glyph: "漢", href: "/language/kanji", count: kanji.length },
  { label: "Grammar", unit: "points", glyph: "文", href: "/language/grammar", count: grammar.length },
  {
    label: "Vocabulary",
    unit: "words",
    glyph: "語",
    href: "/language/vocabulary",
    count: vocabulary.length,
  },
];

/** How much material the site holds, per language module. */
export function SiteVolumeStrip() {
  return (
    <ScrollReveal as="section" aria-labelledby="volume-heading">
      <div className={"rounded-2xl px-5 py-6 sm:px-8 " + glass}>
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
          <h2
            id="volume-heading"
            className="font-serif text-xl font-semibold text-ink dark:text-paper-100 sm:text-2xl"
          >
            What&apos;s in the site
          </h2>
          <Link
            href="/language"
            className="text-sm font-medium text-hanko hover:underline dark:text-hanko-light"
          >
            All modules →
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={
                  "group relative flex h-full flex-col overflow-hidden rounded-xl px-4 py-4 " +
                  glass +
                  " " +
                  glassLift
                }
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-1 -top-3 select-none font-jp text-[3.5rem] font-semibold leading-none text-hanko/10 transition duration-500 group-hover:text-hanko/15 dark:text-hanko-light/10 dark:group-hover:text-hanko-light/15"
                >
                  {item.glyph}
                </span>
                <span className="relative font-serif text-3xl font-semibold tabular-nums text-ink dark:text-paper-100 sm:text-4xl">
                  {item.count}
                </span>
                <span className="relative mt-1 font-medium text-ink-light transition group-hover:text-hanko dark:text-paper-200 dark:group-hover:text-hanko-light">
                  {item.label}
                </span>
                <span className="relative text-xs text-ink-muted dark:text-paper-300">
                  {item.unit}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </ScrollReveal>
  );
}
