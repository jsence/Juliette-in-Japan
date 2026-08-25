"use client";

import Link from "next/link";

import { ProgressBar } from "@/components/ProgressBar";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useModuleCounts, type ModuleKey } from "@/lib/moduleProgress";
import { glass } from "@/lib/ui";

interface ModuleTotals {
  kana: number;
  kanji: number;
  grammar: number;
  vocabulary: number;
}

const MODULES: { key: ModuleKey; label: string; href: string }[] = [
  { key: "kana", label: "Kana", href: "/language/kana" },
  { key: "kanji", label: "Kanji", href: "/language/kanji" },
  { key: "grammar", label: "Grammar", href: "/language/grammar" },
  { key: "vocabulary", label: "Vocabulary", href: "/language/vocabulary" },
];

/** Horizontal N5 module progress strip for the homepage. */
export function HomeStudyStrip({ totals }: { totals: ModuleTotals }) {
  const { counts, ready } = useModuleCounts();

  return (
    <ScrollReveal as="section" aria-labelledby="studying-heading">
      <div className={"rounded-2xl px-5 py-6 sm:px-8 " + glass}>
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
          <h2
            id="studying-heading"
            className="font-serif text-xl font-semibold text-ink dark:text-paper-100 sm:text-2xl"
          >
            Currently studying
          </h2>
          <Link
            href="/language"
            className="text-sm font-medium text-hanko hover:underline dark:text-hanko-light"
          >
            All modules →
          </Link>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {MODULES.map((m) => {
            const done = ready ? counts[m.key] : 0;
            const total = totals[m.key];
            return (
              <Link
                key={m.key}
                href={m.href}
                className="min-w-[10.5rem] flex-1 shrink-0 rounded-lg p-1 transition hover:bg-white/30 dark:hover:bg-white/5"
              >
                <ProgressBar value={done} max={total} label={m.label} />
              </Link>
            );
          })}
        </div>
      </div>
    </ScrollReveal>
  );
}
