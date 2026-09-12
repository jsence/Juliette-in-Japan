"use client";

import { useCallback, useState } from "react";

import type { WorkPhrase } from "@/types/work";
import { PhraseRuby } from "./PhraseRuby";

interface PhraseCardProps {
  phrase: WorkPhrase;
}

/** Ready-to-use phrase with register, usage note, and copy-to-clipboard. */
export function PhraseCard({ phrase }: PhraseCardProps) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    const block = [phrase.japanese, phrase.romaji, phrase.english, `Register: ${phrase.register}`, phrase.usage].join(
      "\n",
    );
    try {
      await navigator.clipboard.writeText(block);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }, [phrase]);

  return (
    <article className="rounded-xl border border-paper-300 bg-paper-50/90 p-4 shadow-sm backdrop-blur-sm dark:border-sumi-border dark:bg-sumi-light/90">
      <div className="flex items-start justify-between gap-3">
        <PhraseRuby phrase={phrase} />
        <button
          type="button"
          onClick={copy}
          className="shrink-0 rounded-md border border-paper-300 px-2 py-1 text-xs font-medium text-ink-light transition hover:bg-paper-200 dark:border-sumi-border dark:text-paper-200 dark:hover:bg-sumi-border"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="mt-2 font-mono text-sm text-ink-muted dark:text-paper-300">{phrase.romaji}</p>
      <p className="mt-1 text-sm text-ink-light dark:text-paper-200">{phrase.english}</p>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-hanko dark:text-hanko-light">
        {phrase.register}
      </p>
      <p className="mt-1 text-sm text-ink-light dark:text-paper-200">{phrase.usage}</p>
    </article>
  );
}
