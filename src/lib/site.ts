/** Global, human-edited site configuration and honest progress figures. */

export interface NavItem {
  href: string;
  label: string;
  /** Optional Japanese glyph used as a small decorative label. */
  glyph?: string;
}

export const site = {
  name: "Juliette in Japan",
  /** Short neutral tagline. */
  tagline: "A documentation site on the Japanese language, culture, and working life.",
  /** Descriptive lines shown on the home page. */
  pitch: [
    "A documentation site covering the Japanese language, Japanese culture and history, and working life in Japan.",
    "The N5 study material — kana, kanji, grammar organised by function, vocabulary and flashcard drills — is built from open, human-verified data sources.",
    "Kanji readings follow KANJIDIC2 and word definitions follow JMdict; example sentences come only from established corpora.",
  ],
  links: {
    linkedin: "https://www.linkedin.com/in/juliette",
    email: "juliette@example.com",
    cv: "/cv/juliette-cv.pdf",
  },
} as const;

export const nav: NavItem[] = [
  { href: "/", label: "Home", glyph: "家" },
  { href: "/language", label: "Language", glyph: "語" },
  { href: "/language/n5", label: "N5", glyph: "五" },
  { href: "/culture", label: "Culture", glyph: "文" },
  { href: "/work", label: "Work", glyph: "働" },
  { href: "/journal", label: "Journal", glyph: "記" },
  { href: "/about", label: "About", glyph: "私" },
];

/** Sub-navigation for the N5 study hub. */
export const n5Nav: NavItem[] = [
  { href: "/language/n5/lessons", label: "Lessons", glyph: "課" },
  { href: "/language/n5/kana", label: "Kana", glyph: "か" },
  { href: "/language/n5/kanji", label: "Kanji", glyph: "字" },
  { href: "/language/n5/vocabulary", label: "Vocabulary", glyph: "語" },
  { href: "/language/n5/grammar", label: "Grammar", glyph: "文" },
  { href: "/language/n5/review", label: "Review", glyph: "復" },
];
