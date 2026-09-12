import type { ReactNode } from "react";

import type { WorkPhrase } from "@/types/work";

/** Render phrase Japanese line with optional ruby segments. */
export function PhraseRuby({ phrase }: { phrase: WorkPhrase }) {
  if (!phrase.ruby?.length) {
    return <span className="font-jp text-lg text-ink dark:text-paper-100">{phrase.japanese}</span>;
  }

  const parts: ReactNode[] = [];
  let cursor = 0;
  for (const seg of phrase.ruby) {
    const idx = phrase.japanese.indexOf(seg.text, cursor);
    if (idx === -1) continue;
    if (idx > cursor) {
      parts.push(<span key={`${seg.text}-pre-${idx}`}>{phrase.japanese.slice(cursor, idx)}</span>);
    }
    parts.push(
      <ruby key={`${seg.text}-${idx}`}>
        {seg.text}
        <rt className="font-sans text-[0.5em] font-normal text-ink-muted dark:text-paper-300">
          {seg.reading}
        </rt>
      </ruby>,
    );
    cursor = idx + seg.text.length;
  }
  if (cursor < phrase.japanese.length) {
    parts.push(<span key="tail">{phrase.japanese.slice(cursor)}</span>);
  }

  return <span className="font-jp text-lg text-ink dark:text-paper-100">{parts}</span>;
}
