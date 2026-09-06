/**
 * The catalogue of playable games.
 *
 * This is the single source of truth: the Games section in site.ts builds its
 * dropdown from this list, so the nav and the /games index cannot disagree
 * about which games exist. Do not import site.ts from here — the dependency
 * runs the other way.
 */

export interface Game {
  href: string;
  title: string;
  /** Japanese glyph used as the game's seal. */
  glyph: string;
  /** One-line pitch, shown on the card and in the nav dropdown. */
  description: string;
  /** What a round actually involves, as short factual lines. */
  facts: string[];
}

export const games: Game[] = [
  {
    href: "/games/kana-battle",
    title: "Kana Battle",
    glyph: "戦",
    description: "A pixel-art duel: match the romaji to the right kana before the timer runs out.",
    facts: [
      "Choose which gojūon rows to face, including dakuten and yōon",
      "Two to four answer choices, on a clock from 5s down to 1.5s",
      "Anything you miss can go straight to the flashcard deck",
    ],
  },
];
