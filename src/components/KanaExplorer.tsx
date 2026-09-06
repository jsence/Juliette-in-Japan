"use client";

import { useState } from "react";
import type { Kana, KanaScript } from "@/types/content";
import { tab, tabActive, tabBar, tabIdle } from "@/lib/ui";
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

  // Same strip as the Language sub-nav, so the page shows one tab style.
  const tabClass = (active: boolean) => tab + " " + (active ? tabActive : tabIdle);

  return (
    <div className="space-y-6">
      <div role="tablist" aria-label="Kana script" className={tabBar + " gap-1"}>
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
