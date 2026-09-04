/**
 * Layered pixel scenery: sky, distant pagoda silhouette, hills and ground.
 * Layers shift at different rates via `depth` for a light parallax feel.
 */
export function BattleBackdrop({ depth = 0 }: { depth?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f6dfc4] via-[#f3d3b3] to-[#e9c9a6] dark:from-[#2a2740] dark:via-[#332c3c] dark:to-[#3a3130]" />

      {/* Sun disc */}
      <div
        className="absolute right-[14%] top-[12%] h-16 w-16 rounded-full bg-[#e8a76b]/50 blur-[2px] dark:bg-[#c85b50]/30"
        style={{ transform: `translateX(${depth * -4}px)` }}
      />

      {/* Far hills */}
      <div
        className="absolute inset-x-0 bottom-[26%] h-24"
        style={{ transform: `translateX(${depth * -6}px)` }}
      >
        <svg viewBox="0 0 160 40" preserveAspectRatio="none" className="h-full w-full">
          <path
            d="M0 40 L0 26 L18 14 L34 26 L52 10 L74 28 L96 16 L118 30 L140 18 L160 30 L160 40 Z"
            className="fill-[#c9a582]/60 dark:fill-[#3f3a4a]/70"
          />
        </svg>
      </div>

      {/* Pagoda silhouette — kept between the duellists so neither covers it */}
      <div
        className="absolute bottom-[24%] left-1/2 h-[38%] w-16 -translate-x-1/2 sm:w-20"
        style={{ transform: `translateX(calc(-50% + ${depth * -10}px))` }}
      >
        <svg viewBox="0 0 48 56" className="h-full w-full" shapeRendering="crispEdges">
          <g className="fill-[#8a6a4f]/55 dark:fill-[#2b2536]/85">
            {/* three tiers, widening toward the base */}
            <rect x="22" y="0" width="4" height="5" />
            <rect x="10" y="5" width="28" height="3" />
            <rect x="16" y="8" width="16" height="7" />
            <rect x="7" y="15" width="34" height="3" />
            <rect x="13" y="18" width="22" height="8" />
            <rect x="4" y="26" width="40" height="3" />
            <rect x="10" y="29" width="28" height="10" />
            <rect x="1" y="39" width="46" height="3" />
            <rect x="8" y="42" width="32" height="14" />
          </g>
        </svg>
      </div>

      {/* Tree line */}
      <div
        className="absolute inset-x-0 bottom-[24%] h-10"
        style={{ transform: `translateX(${depth * -16}px)` }}
      >
        <svg viewBox="0 0 200 20" preserveAspectRatio="none" className="h-full w-full">
          <path
            d="M0 20 L0 12 L8 6 L16 12 L26 4 L36 12 L48 8 L60 14 L72 6 L84 13 L96 7 L110 14 L124 8 L138 13 L152 6 L166 12 L180 8 L194 13 L200 10 L200 20 Z"
            className="fill-[#6f7a54]/60 dark:fill-[#242a25]/80"
          />
        </svg>
      </div>

      {/* Ground */}
      <div className="absolute inset-x-0 bottom-0 h-[24%] bg-[#b98f66] dark:bg-[#2a241f]" />
      <div className="absolute inset-x-0 bottom-[24%] h-1 bg-[#8f6b48] dark:bg-[#3a322a]" />
      {/* Ground speckle for a dirt texture */}
      <div
        className="absolute inset-x-0 bottom-0 h-[24%] opacity-40 dark:opacity-25"
        style={{
          transform: `translateX(${depth * -24}px)`,
          backgroundImage:
            "radial-gradient(#8f6b48 1px, transparent 1px), radial-gradient(#a37c56 1px, transparent 1px)",
          backgroundSize: "18px 18px, 26px 26px",
          backgroundPosition: "0 0, 9px 13px",
        }}
      />
    </div>
  );
}
