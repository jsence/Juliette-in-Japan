import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import Link from "next/link";

import { KanaRecall } from "@/components/game/KanaRecall";
import { PageHeader } from "@/components/PageHeader";

const pixel = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kana Recall",
  description:
    "Type the romaji for each kana as it appears — a typing recall drill with flip-to-reveal and flashcard export.",
};

export default function KanaRecallPage() {
  return (
    <div className={pixel.variable + " space-y-8"}>
      <PageHeader
        title="Kana Recall"
        glyph="憶"
        intro={
          <p>
            One card at a time: type the romaji reading from memory. Flip only when you are stuck —
            that counts as a miss, but a typo does not. Kana come from the{" "}
            <Link href="/language/kana" className="text-hanko hover:underline dark:text-hanko-light">
              kana reference
            </Link>
            , and anything you flipped can go straight to the flashcard deck.
          </p>
        }
      />
      <KanaRecall />
      <p className="text-sm text-ink-muted dark:text-paper-300">
        <Link href="/games" className="text-hanko hover:underline dark:text-hanko-light">
          ← Back to Games
        </Link>
      </p>
    </div>
  );
}
