"use client";

import { useModuleProgress, type ModuleKey } from "@/lib/moduleProgress";

interface LearnedToggleProps {
  module: ModuleKey;
  itemId: string;
  /** Accessible label describing the item, e.g. "kanji 日". */
  label: string;
  /** "pill" shows text; "dot" is a compact icon-only control. */
  variant?: "pill" | "dot";
}

/** A small toggle recording whether an item has been learned (localStorage). */
export function LearnedToggle({ module, itemId, label, variant = "pill" }: LearnedToggleProps) {
  const { isLearned, toggle, ready } = useModuleProgress(module);
  const learned = ready && isLearned(itemId);

  const common =
    "transition focus:outline-none focus-visible:ring-2 focus-visible:ring-hanko disabled:opacity-50";

  if (variant === "dot") {
    return (
      <button
        type="button"
        disabled={!ready}
        aria-pressed={learned}
        aria-label={learned ? `Mark ${label} not learned` : `Mark ${label} learned`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggle(itemId);
        }}
        title={learned ? "Learned" : "Mark learned"}
        className={
          common +
          " flex h-5 w-5 items-center justify-center rounded-full border text-[0.7rem] " +
          (learned
            ? "border-hanko bg-hanko text-paper-50"
            : "border-ink-muted/40 text-transparent hover:border-hanko hover:text-hanko/40 dark:border-paper-300/40")
        }
      >
        ✓
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={!ready}
      aria-pressed={learned}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(itemId);
      }}
      className={
        common +
        " inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium " +
        (learned
          ? "bg-hanko text-paper-50 hover:bg-hanko-dark"
          : "border border-ink-muted/40 text-ink-muted hover:border-hanko hover:text-hanko dark:border-paper-300/40 dark:text-paper-300")
      }
    >
      <span aria-hidden="true">{learned ? "✓" : "＋"}</span>
      {learned ? "Learned" : "Mark learned"}
    </button>
  );
}
