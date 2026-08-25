import type { ReactNode } from "react";

interface SourceNoteProps {
  children: ReactNode;
}

/** A muted, bordered callout for sourcing / scope disclaimers. */
export function SourceNote({ children }: SourceNoteProps) {
  return (
    <aside className="rounded-lg border-l-4 border-hanko bg-paper-100 p-4 text-sm text-ink-light dark:bg-sumi-light dark:text-paper-200">
      <p className="mb-1 font-semibold text-hanko dark:text-hanko-light">On sources &amp; scope</p>
      {children}
    </aside>
  );
}
