interface HeartBarProps {
  hp: number;
  max: number;
  label: string;
  /** Right-align the hearts (used for the enemy side). */
  align?: "left" | "right";
}

/** Hit points drawn as chunky pixel hearts. */
export function HeartBar({ hp, max, label, align = "left" }: HeartBarProps) {
  return (
    <div
      className={"flex flex-col gap-1 " + (align === "right" ? "items-end" : "items-start")}
      role="status"
      aria-label={`${label}: ${hp} of ${max} hit points`}
    >
      <span className="font-pixel text-[0.5rem] uppercase tracking-wider text-ink-light dark:text-paper-200 sm:text-[0.625rem]">
        {label}
      </span>
      <div className="flex gap-1" aria-hidden="true">
        {Array.from({ length: max }, (_, i) => (
          <PixelHeart key={i} filled={i < hp} />
        ))}
      </div>
    </div>
  );
}

function PixelHeart({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 7 6"
      className={
        "h-4 w-4 transition-transform duration-300 sm:h-5 sm:w-5 " +
        (filled ? "scale-100" : "scale-90")
      }
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {/* 7x6 pixel heart */}
      <path
        d="M1 0h2v1H1zM4 0h2v1H4zM0 1h7v2H0zM1 3h5v1H1zM2 4h3v1H2zM3 5h1v1H3z"
        fill={filled ? "#b3352b" : "currentColor"}
        className={filled ? "" : "text-ink/15 dark:text-paper-100/15"}
      />
    </svg>
  );
}
