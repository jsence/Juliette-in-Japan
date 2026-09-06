import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import Link from "next/link";

import { KanaBattle } from "@/components/game/KanaBattle";
import { PageHeader } from "@/components/PageHeader";

/**
 * The pixel face is loaded here rather than in the root layout so it only
 * ships on the game route.
 */
const pixel = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kana Battle",
  description:
    "A pixel-art hiragana duel: match the romaji to the right kana before the timer runs out.",
};

export default function KanaBattlePage() {
  return (
    <div className={pixel.variable + " space-y-8"}>
      <PageHeader
        title="Kana Battle"
        glyph="戦"
        intro={
          <p>
            A timed hiragana duel: match the romaji above the ninja before the timer drains. Kana
            come from the{" "}
            <Link href="/language/kana" className="text-hanko hover:underline dark:text-hanko-light">
              kana reference
            </Link>
            , and anything you miss can go straight to the flashcard deck.
          </p>
        }
      />
      <KanaBattle />
      <p className="text-sm text-ink-muted dark:text-paper-300">
        <Link href="/games" className="text-hanko hover:underline dark:text-hanko-light">
          ← Back to Games
        </Link>
      </p>
    </div>
  );
}
