/** Global, human-edited site configuration. */

export interface NavItem {
  href: string;
  label: string;
  /** Optional Japanese glyph used as a small decorative label. */
  glyph?: string;
}

export interface SubPage {
  href: string;
  label: string;
  description: string;
  glyph?: string;
}

export interface SiteSection {
  id: string;
  href: string;
  label: string;
  glyph: string;
  description: string;
  subPages: SubPage[];
}

export const site = {
  name: "Juliette in Japan",
  /** Short neutral tagline — one sentence for the homepage hero. */
  tagline:
    "A documentation site on the Japanese language, culture, and working life in Japan.",
  links: {
    linkedin: "https://www.linkedin.com/in/juliette",
    email: "juliette@example.com",
    cv: "/cv/juliette-cv.pdf",
  },
} as const;

export const sections: SiteSection[] = [
  {
    id: "language",
    href: "/language",
    label: "Language",
    glyph: "語",
    description:
      "The Japanese writing systems, grammar and vocabulary, with spaced-repetition drills and curated study resources.",
    subPages: [
      {
        href: "/language/kana",
        label: "Kana",
        glyph: "か",
        description: "Hiragana and katakana with stroke counts and the modified sounds (dakuten, yōon).",
      },
      {
        href: "/language/kana/game",
        label: "Kana Battle",
        glyph: "戦",
        description: "A pixel-art duel: match the romaji to the right kana before the timer runs out.",
      },
      {
        href: "/language/kanji",
        label: "Kanji",
        glyph: "字",
        description: "Character cards with meanings, on'yomi and kun'yomi readings, and common words.",
      },
      {
        href: "/language/grammar",
        label: "Grammar",
        glyph: "文",
        description: "N5 grammar organised by function across 11 categories, each point with a construction formula.",
      },
      {
        href: "/language/vocabulary",
        label: "Vocabulary",
        glyph: "語",
        description: "Words grouped by theme, with readings and definitions.",
      },
      {
        href: "/language/drills",
        label: "Drills",
        glyph: "練",
        description: "SM-2 spaced-repetition flashcards with four study modes and deck selection.",
      },
      {
        href: "/language/resources",
        label: "Resources",
        glyph: "資",
        description: "Curated textbooks, apps and reference sites for N5-level study.",
      },
    ],
  },
  {
    id: "culture",
    href: "/culture",
    label: "Culture",
    glyph: "文",
    description: "History, beliefs, seasonal customs and the arts that shape everyday life in Japan.",
    subPages: [
      {
        href: "/culture/history",
        label: "History",
        glyph: "史",
        description: "Key periods and events that shape modern Japan.",
      },
      {
        href: "/culture/beliefs",
        label: "Beliefs",
        glyph: "信",
        description: "Shinto, Buddhism and everyday spiritual practice.",
      },
      {
        href: "/culture/seasons",
        label: "Seasons",
        glyph: "季",
        description: "The traditional calendar, festivals and seasonal customs.",
      },
      {
        href: "/culture/arts",
        label: "Arts",
        glyph: "芸",
        description: "Literature, visual arts, crafts and performance traditions.",
      },
    ],
  },
  {
    id: "life",
    href: "/life",
    label: "Life in Japan",
    glyph: "生",
    description: "Regions, food and the routines of daily life across the archipelago.",
    subPages: [
      {
        href: "/life/regions",
        label: "Regions",
        glyph: "地",
        description: "Prefectures, cities and regional character across the archipelago.",
      },
      {
        href: "/life/food",
        label: "Food",
        glyph: "食",
        description: "Cuisine, dining customs and the role of food in daily life.",
      },
      {
        href: "/life/daily-life",
        label: "Daily life",
        glyph: "日",
        description: "Housing, transport, shopping and social routines.",
      },
    ],
  },
  {
    id: "work",
    href: "/work",
    label: "Work",
    glyph: "働",
    description: "How Japanese workplaces operate, from hierarchy and meetings to keigo and communication norms.",
    subPages: [
      {
        href: "/work/hierarchy",
        label: "Hierarchy",
        glyph: "位",
        description: "Rank, seniority and how authority works in Japanese organisations.",
      },
      {
        href: "/work/meetings",
        label: "Meetings",
        glyph: "会",
        description: "How meetings are run, from preparation to follow-up.",
      },
      {
        href: "/work/keigo",
        label: "Keigo",
        glyph: "敬",
        description: "Polite, humble and respectful language in professional settings.",
      },
      {
        href: "/work/communication-codes",
        label: "Communication codes",
        glyph: "伝",
        description: "Indirect speech, reading between the lines and written norms.",
      },
    ],
  },
  {
    id: "project",
    href: "/project",
    label: "Project",
    glyph: "計",
    description: "Why this site exists and how it is built.",
    subPages: [
      {
        href: "/project/why-japan",
        label: "Why Japan",
        glyph: "日",
        description: "The motivation and goals behind this documentation project.",
      },
      {
        href: "/project/how-its-built",
        label: "How it's built",
        glyph: "構",
        description: "The technical stack, data sources and site architecture.",
      },
      {
        href: "/project/sources",
        label: "Sources",
        glyph: "源",
        description: "Open data references for kanji, vocabulary and example sentences.",
      },
    ],
  },
];

export const nav: NavItem[] = [
  { href: "/", label: "Home", glyph: "家" },
  ...sections.map((s) => ({ href: s.href, label: s.label, glyph: s.glyph })),
];

/** Sub-navigation for the Language section. */
export const languageNav: NavItem[] = sections
  .find((s) => s.id === "language")!
  .subPages.map((p) => ({ href: p.href, label: p.label, glyph: p.glyph }));

export function getSection(id: string): SiteSection | undefined {
  return sections.find((s) => s.id === id);
}

export function getSectionByHref(href: string): SiteSection | undefined {
  return sections.find((s) => href === s.href || href.startsWith(s.href + "/"));
}
