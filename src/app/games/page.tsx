import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import type { ReactNode } from "react";

import { BattlePreview } from "@/components/game/BattlePreview";
import { GameCard } from "@/components/game/GameCard";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { games } from "@/lib/games";

/** Loaded here, not in the root layout, so the pixel face ships only with the games. */
const pixel = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Games",
  description:
    "Timed practice games for the Japanese material on this site, starting with Kana Battle — a pixel-art hiragana duel.",
};

/** Thumbnail art per game, kept out of the catalogue so it stays plain data. */
const previews: Record<string, ReactNode> = {
  "/games/kana-battle": <BattlePreview />,
};

export default function GamesPage() {
  return (
    <div className={pixel.variable + " space-y-8"}>
      <PageHeader
        title="Games"
        glyph="遊"
        intro={
          <p>
            Reading a table teaches you the shapes; recalling them under a clock is what makes them
            stick. These are small, self-contained drills built on the same data as the rest of the
            site — no separate word lists to fall out of step.
          </p>
        }
      />

      <div className="space-y-6">
        {games.map((game, i) => (
          <ScrollReveal key={game.href} index={i}>
            <GameCard game={game} preview={previews[game.href]} />
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <p className="text-sm text-ink-muted dark:text-paper-300">
          More will appear here as they are built — kanji and vocabulary are the obvious next
          candidates.
        </p>
      </ScrollReveal>
    </div>
  );
}
