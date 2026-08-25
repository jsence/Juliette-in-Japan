interface ProgressBarProps {
  /** Current value. */
  value: number;
  /** Maximum value (defaults to 100). */
  max?: number;
  label?: string;
  /** Show the "value / max" figure at the end of the label row. */
  showCount?: boolean;
}

/** A small, accessible progress bar with the travel-journal ink/hanko palette. */
export function ProgressBar({ value, max = 100, label, showCount = true }: ProgressBarProps) {
  const safeMax = max <= 0 ? 1 : max;
  const pct = Math.min(100, Math.max(0, (value / safeMax) * 100));

  return (
    <div className="w-full">
      {(label || showCount) && (
        <div className="mb-1 flex items-baseline justify-between text-sm">
          {label && <span className="font-medium text-ink-light dark:text-paper-200">{label}</span>}
          {showCount && (
            <span className="tabular-nums text-ink-muted dark:text-paper-300">
              {value} / {max}
            </span>
          )}
        </div>
      )}
      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-paper-300/60 dark:bg-sumi-border"
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "progress"}
      >
        <div
          className="h-full rounded-full bg-hanko transition-[width] duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
