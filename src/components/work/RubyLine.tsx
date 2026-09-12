import type { ReactNode } from "react";

interface RubyLineProps {
  text: string;
  ruby?: { text: string; reading: string }[];
  className?: string;
}

/** Japanese line with optional furigana segments. */
export function RubyLine({ text, ruby, className = "font-jp text-ink dark:text-paper-100" }: RubyLineProps) {
  if (!ruby?.length) {
    return <span className={className}>{text}</span>;
  }

  const parts: ReactNode[] = [];
  let cursor = 0;
  for (const seg of ruby) {
    const idx = text.indexOf(seg.text, cursor);
    if (idx === -1) continue;
    if (idx > cursor) {
      parts.push(<span key={`${seg.text}-pre-${idx}`}>{text.slice(cursor, idx)}</span>);
    }
    parts.push(
      <ruby key={`${seg.text}-${idx}`}>
        {seg.text}
        <rt className="font-sans text-[0.45em] font-normal text-ink-muted dark:text-paper-300">
          {seg.reading}
        </rt>
      </ruby>,
    );
    cursor = idx + seg.text.length;
  }
  if (cursor < text.length) {
    parts.push(<span key="tail">{text.slice(cursor)}</span>);
  }

  return <span className={className}>{parts}</span>;
}
