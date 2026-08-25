"use client";

import Link from "next/link";

import { ProgressBar } from "./ProgressBar";
import { useModuleCounts, type ModuleKey } from "@/lib/moduleProgress";
import { glass } from "@/lib/ui";

interface ModuleTotals {
  kana: number;
  kanji: number;
  grammar: number;
  vocabulary: number;
}

const MODULES: { key: ModuleKey; label: string; href: string }[] = [
  { key: "kana", label: "Kana", href: "/language/n5/kana" },
  { key: "kanji", label: "Kanji", href: "/language/n5/kanji" },
  { key: "grammar", label: "Grammar", href: "/language/n5/grammar" },
  { key: "vocabulary", label: "Vocabulary", href: "/language/n5/vocabulary" },
];

/**
 * Per-module completion bars for the N5 hub. Totals come from the typed data;
 * learned counts come from localStorage. This is the only place progress is
 * shown — there are no global counters.
 */
export function ModuleProgress({ totals }: { totals: ModuleTotals }) {
  const { counts, ready } = useModuleCounts();

  return (
    <div className={"rounded-xl p-5 " + glass}>
      <h2 className="font-serif text-lg font-semibold text-ink dark:text-paper-100">
        Module progress
      </h2>
      <p className="mt-1 text-sm text-ink-muted dark:text-paper-300">
        Mark items as learned on each module page; your progress is stored in this browser.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {MODULES.map((m) => {
          const done = ready ? counts[m.key] : 0;
          const total = totals[m.key];
          return (
            <Link key={m.key} href={m.href} className="block rounded-lg p-1 transition hover:bg-white/30 dark:hover:bg-white/5">
              <ProgressBar value={done} max={total} label={m.label} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
