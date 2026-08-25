/** Global, human-edited site configuration and honest progress figures. */

export interface NavItem {
  href: string;
  label: string;
  /** Optional Japanese glyph used as a small decorative label. */
  glyph?: string;
}

export const site = {
  name: "Juliette in Japan",
  /** Three-line pitch shown on the home page. */
  pitch: [
    "A working log of one honest attempt to reach Japan — not a polished course.",
    "I curate resources I actually use, track real progress, and study N5 from open, human-verified data.",
    "No invented Japanese. Every reading, definition and grammar note comes from sources I can point to.",
  ],
  /** The day the study log began (ISO date). */
  studyStartDate: "2026-01-06",
  /** JLPT target: level and sitting date (ISO date). */
  jlptTarget: {
    level: "N5",
    date: "2026-12-06",
  },
  /** Honestly self-assessed current level. */
  currentLevel: "Upper beginner — comfortable with kana, building N5 grammar and kanji.",
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
  { href: "/language/n5/kana", label: "Kana", glyph: "か" },
  { href: "/language/n5/kanji", label: "Kanji", glyph: "字" },
  { href: "/language/n5/vocabulary", label: "Vocabulary", glyph: "語" },
  { href: "/language/n5/grammar", label: "Grammar", glyph: "文" },
  { href: "/language/n5/review", label: "Review", glyph: "復" },
];
