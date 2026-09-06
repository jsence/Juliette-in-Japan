import Link from "next/link";
import type { ReactNode } from "react";

import { Hanko } from "@/components/Hanko";
import type { Game } from "@/lib/games";
import { glass, glassLift } from "@/lib/ui";

interface GameCardProps {
  game: Game;
  /** Thumbnail art for this game; the glyph stands in when there is none. */
  preview?: ReactNode;
}

/**
 * A game on the /games index: thumbnail, pitch, what a round involves, and the
 * way in. The whole card is the link, so the Play control is styled rather than
 * a second tab stop pointing at the same route.
 */
export function GameCard({ game, preview }: GameCardProps) {
  return (
    <Link
      href={game.href}
      className={
        "group grid gap-5 rounded-2xl p-5 sm:grid-cols-[minmax(0,18rem)_1fr] sm:gap-6 sm:p-6 " +
        glass +
        " " +
        glassLift
      }
    >
      {preview ?? (
        <div
          aria-hidden="true"
          className="flex aspect-[16/9] items-center justify-center rounded-xl bg-hanko/5 font-jp text-6xl text-hanko/30 dark:bg-hanko-light/5 dark:text-hanko-light/30"
        >
          {game.glyph}
        </div>
      )}

      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <Hanko size="sm" className="transition group-hover:animate-seal-in">
            {game.glyph}
          </Hanko>
          <h3 className="font-serif text-xl font-semibold text-ink transition group-hover:text-hanko dark:text-paper-100 dark:group-hover:text-hanko-light">
            {game.title}
          </h3>
        </div>

        <p className="mt-3 text-sm text-ink-light dark:text-paper-200">{game.description}</p>

        <ul className="mt-3 space-y-1.5 text-sm text-ink-muted dark:text-paper-300">
          {game.facts.map((fact) => (
            <li key={fact} className="flex gap-2">
              <span aria-hidden="true" className="text-hanko dark:text-hanko-light">
                ·
              </span>
              {fact}
            </li>
          ))}
        </ul>

        <span className="mt-5 inline-flex items-center gap-2 self-start rounded-md bg-hanko px-5 py-2.5 text-sm font-medium text-paper-50 shadow-glass transition duration-300 group-hover:bg-hanko-dark">
          Play
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
