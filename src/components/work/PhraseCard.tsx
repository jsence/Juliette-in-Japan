"use client";

import { useCallback, useState } from "react";

import type { WorkPhrase } from "@/types/work";
import { RegisterTag } from "./RegisterTag";
import { RubyLine } from "./RubyLine";

interface PhraseCardProps {
  phrase: WorkPhrase;
}

/** Compact phrase card: Japanese first, then reading, meaning, register, usage. */
export function PhraseCard({ phrase }: PhraseCardProps) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    const block = [
      phrase.japanese,
      phrase.romaji,
      phrase.english,
      phrase.register,
      phrase.usage,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(block);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }, [phrase]);

  return (
    <article className="flex flex-col rounded-lg border border-paper-300 bg-paper-50/90 p-3 shadow-sm backdrop-blur-sm dark:border-sumi-border dark:bg-sumi-light/90">
      <div className="flex items-start justify-between gap-2">
        <RubyLine
          text={phrase.japanese}
          ruby={phrase.ruby}
          className="font-jp text-xl leading-snug text-ink dark:text-paper-100"
        />
        <button
          type="button"
          onClick={copy}
          className="shrink-0 rounded border border-paper-300 px-1.5 py-0.5 text-[10px] font-medium text-ink-light transition hover:bg-paper-200 dark:border-sumi-border dark:text-paper-200 dark:hover:bg-sumi-border"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="mt-1 font-mono text-xs text-ink-muted dark:text-paper-300">{phrase.romaji}</p>
      <p className="mt-1.5 text-sm leading-snug text-ink-light dark:text-paper-200">{phrase.english}</p>
      <div className="mt-2">
        <RegisterTag register={phrase.register} />
      </div>
      <p className="mt-2 text-xs leading-snug text-ink-muted dark:text-paper-300">{phrase.usage}</p>
    </article>
  );
}
