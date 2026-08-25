import type { ReactNode } from "react";

interface SourceNoteProps {
  children: ReactNode;
}

/** A muted, bordered callout for sourcing / scope disclaimers. */
export function SourceNote({ children }: SourceNoteProps) {
  return (
    <aside className="rounded-lg border border-white/40 border-l-4 border-l-hanko bg-white/55 p-4 text-sm text-ink-light shadow-glass backdrop-blur-md dark:border-white/10 dark:border-l-hanko dark:bg-black/30 dark:text-paper-200 dark:shadow-glass-dark">
      <p className="mb-1 font-semibold text-hanko dark:text-hanko-light">On sources &amp; scope</p>
      {children}
    </aside>
  );
}
