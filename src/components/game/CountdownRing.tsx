interface CountdownRingProps {
  /** Remaining fraction of the allowance, 0–1. */
  progress: number;
  /** Milliseconds left, shown in the middle. */
  remainingMs: number;
}

const SIZE = 64;
const STROKE = 6;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Circular timer that visibly drains as the allowance runs out. */
export function CountdownRing({ progress, remainingMs }: CountdownRingProps) {
  const clamped = Math.min(1, Math.max(0, progress));
  const seconds = Math.max(0, remainingMs / 1000);

  // Warm through to the hanko red as time runs out.
  const colour = clamped > 0.5 ? "#4a5d7a" : clamped > 0.25 ? "#c9821f" : "#b3352b";

  return (
    <div
      className="relative shrink-0"
      style={{ width: SIZE, height: SIZE }}
      role="timer"
      aria-label={`${seconds.toFixed(1)} seconds remaining`}
    >
      <svg width={SIZE} height={SIZE} className="-rotate-90" aria-hidden="true">
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE}
          className="stroke-ink/10 dark:stroke-paper-100/15"
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE}
          strokeLinecap="butt"
          stroke={colour}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - clamped)}
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center font-pixel text-[0.625rem] tabular-nums text-ink dark:text-paper-100"
        aria-hidden="true"
      >
        {seconds.toFixed(1)}
      </span>
    </div>
  );
}
