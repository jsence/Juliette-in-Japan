/**
 * A still of the typing drill, used as the Kana Recall thumbnail on /games.
 *
 * Built from the game's own card/input styling rather than a screenshot, so it
 * stays in step with the live UI.
 */
export function RecallPreview() {
  return (
    <div
      aria-hidden="true"
      className="relative flex aspect-[16/9] w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border-2 border-ink/15 bg-paper-100 px-4 py-5 shadow-[4px_4px_0_rgba(43,38,32,0.15)] dark:border-paper-100/10 dark:bg-sumi-light dark:shadow-[4px_4px_0_rgba(0,0,0,0.45)]"
    >
      {/* Stacked ghost cards */}
      <div
        className="absolute inset-x-8 top-4 h-16 rounded-lg border-2 border-ink/10 bg-paper-50/70 dark:border-paper-100/10 dark:bg-sumi/70"
        style={{ transform: "translateY(6px) scale(0.97)" }}
      />
      <div
        className="absolute inset-x-6 top-3 h-16 rounded-lg border-2 border-ink/10 bg-paper-50/85 dark:border-paper-100/10 dark:bg-sumi/85"
        style={{ transform: "translateY(3px) scale(0.985)" }}
      />

      <div className="relative z-10 flex h-20 w-full max-w-[8rem] items-center justify-center rounded-lg border-2 border-hanko/35 bg-paper-50 shadow-[3px_3px_0_rgba(43,38,32,0.2)] dark:bg-sumi dark:shadow-[3px_3px_0_rgba(0,0,0,0.4)]">
        <span className="font-jp text-4xl font-semibold text-hanko dark:text-hanko-light">か</span>
      </div>

      <div className="relative z-10 w-full max-w-[10rem] rounded-md border-2 border-ink/20 bg-white/70 px-2 py-1.5 shadow-[2px_2px_0_rgba(43,38,32,0.12)] dark:border-paper-100/15 dark:bg-white/5 dark:shadow-[2px_2px_0_rgba(0,0,0,0.3)]">
        <span className="font-pixel text-[0.5rem] text-ink-muted dark:text-paper-300">ka</span>
        <span
          className="ml-0.5 inline-block h-3 w-0.5 animate-pulse bg-hanko dark:bg-hanko-light"
          aria-hidden="true"
        />
      </div>

      <p className="relative z-10 font-pixel text-[0.45rem] uppercase tracking-wider text-ink-muted dark:text-paper-300">
        12 / 46 left · 0:34
      </p>
    </div>
  );
}
