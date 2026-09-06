import Link from "next/link";

/**
 * A compact invitation to the game, sitting above the kana charts.
 *
 * The pixel hearts and the hard-edged button shadow are borrowed from the
 * game's own HUD, so the banner reads as a game rather than as one more study
 * card in the stack.
 */
export function KanaBattleCta() {
  return (
    <section
      aria-label="Practise with Kana Battle"
      className="flex flex-col gap-3 rounded-lg border border-white/50 bg-white/40 px-4 py-3 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:gap-6 dark:border-white/10 dark:bg-white/5"
    >
      {/* Top-aligned, so the hearts sit against the first line rather than
          floating beside the middle of wrapped copy on a narrow screen. */}
      <div className="flex items-start gap-3">
        <PixelHearts />
        <p className="text-sm text-ink-light dark:text-paper-200">
          Know these by sight?{" "}
          <span className="font-semibold text-ink dark:text-paper-100">Kana Battle</span> drills
          whichever rows you pick against a timer.
        </p>
      </div>
      <Link
        href="/games/kana-battle"
        className="group inline-flex shrink-0 items-center gap-2 self-start rounded-md bg-hanko px-4 py-2 text-sm font-medium text-paper-50 shadow-[2px_2px_0_rgba(43,38,32,0.35)] transition-colors hover:bg-hanko-dark sm:self-auto dark:shadow-[2px_2px_0_rgba(0,0,0,0.5)]"
      >
        Play Kana Battle
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-300 group-hover:translate-x-0.5"
        >
          →
        </span>
      </Link>
    </section>
  );
}

/** Three hit points, on the same 7×6 pixel grid as the game's heart bar. */
function PixelHearts() {
  return (
    <svg
      viewBox="0 0 25 6"
      className="mt-0.5 h-4 w-[4.2rem] shrink-0 [image-rendering:pixelated]"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      {[0, 9, 18].map((x) => (
        <path
          key={x}
          transform={`translate(${x} 0)`}
          d="M1 0h2v1H1zM4 0h2v1H4zM0 1h7v2H0zM1 3h5v1H1zM2 4h3v1H2zM3 5h1v1H3z"
          className="fill-hanko dark:fill-hanko-light"
        />
      ))}
    </svg>
  );
}
