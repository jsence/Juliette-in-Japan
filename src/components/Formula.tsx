interface FormulaProps {
  tokens: string[];
}

/** True if a token contains any Japanese (kana or kanji) characters. */
function hasJapanese(token: string): boolean {
  return /[\u3040-\u30ff\u3400-\u9fff]/.test(token);
}

/**
 * Visual construction formula: tokens rendered as chips joined by "+".
 * Japanese tokens (particles, endings) use the JP font; placeholder tokens
 * ("Noun", "Verb stem") use the serif face so the shape reads clearly.
 */
export function Formula({ tokens }: FormulaProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5" aria-label="Construction formula">
      {tokens.map((token, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-hanko/70 dark:text-hanko-light/70">+</span>}
          <span
            className={
              "rounded-md border px-2.5 py-1 text-sm " +
              (hasJapanese(token)
                ? "border-hanko/40 bg-hanko/5 font-jp text-ink dark:border-hanko-light/40 dark:text-paper-100"
                : "border-white/50 bg-white/40 font-serif italic text-ink-light dark:border-white/10 dark:bg-white/5 dark:text-paper-200")
            }
          >
            {token}
          </span>
        </span>
      ))}
    </div>
  );
}
