"use client";

import { useState } from "react";
import type { Kana, KanaScript } from "@/types/content";
import { KanaTable } from "./KanaTable";

interface KanaGroupData {
  group: string;
  label: string;
  items: Kana[];
}

interface KanaExplorerProps {
  hiragana: KanaGroupData[];
  katakana: KanaGroupData[];
}

/** Tabbed explorer switching between the hiragana and katakana tables. */
export function KanaExplorer({ hiragana, katakana }: KanaExplorerProps) {
  const [script, setScript] = useState<KanaScript>("hiragana");
  const groups = script === "hiragana" ? hiragana : katakana;

  const tabClass = (active: boolean) =>
    "rounded-md px-4 py-2 text-sm font-medium transition " +
    (active
      ? "bg-hanko text-paper-50"
      : "border border-white/50 bg-white/30 text-ink-light backdrop-blur hover:bg-white/50 dark:border-white/10 dark:bg-white/5 dark:text-paper-200 dark:hover:bg-white/10");

  return (
    <div className="space-y-6">
      <div role="tablist" aria-label="Kana script" className="flex gap-2">
        <button
          type="button"
          role="tab"
          aria-selected={script === "hiragana"}
          className={tabClass(script === "hiragana")}
          onClick={() => setScript("hiragana")}
        >
          ひらがな Hiragana
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={script === "katakana"}
          className={tabClass(script === "katakana")}
          onClick={() => setScript("katakana")}
        >
          カタカナ Katakana
        </button>
      </div>
      <div role="tabpanel">
        <KanaTable groups={groups} />
      </div>
    </div>
  );
}
