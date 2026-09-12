interface RubyTermProps {
  kanji: string;
  reading: string;
  romaji?: string;
  className?: string;
}

/** Japanese term with furigana and optional romaji gloss. */
export function RubyTerm({ kanji, reading, romaji, className }: RubyTermProps) {
  return (
    <span className={className}>
      <ruby className="font-jp text-ink dark:text-paper-100">
        {kanji}
        <rt className="font-sans text-[0.55em] font-normal text-ink-muted dark:text-paper-300">
          {reading}
        </rt>
      </ruby>
      {romaji && (
        <span className="ml-2 font-sans text-sm text-ink-muted dark:text-paper-300">({romaji})</span>
      )}
    </span>
  );
}
