# Juliette in Japan

A personal, travel-journal-style site documenting the journey toward working in Japan.
It is **not** an AI-generated Japanese course: it curates verified resources, tracks real
progress, and hosts N5 study material built from open, human-verified data sources.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **MDX**, and
**Framer Motion**, ready to deploy on **Vercel**. Site language: English.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint (next lint)
npm run typecheck  # tsc --noEmit
```

## Project structure

```
data/                 Typed JSON content (kana, kanji, vocabulary, grammar, resources)
content/              MDX posts with frontmatter
  journal/            Dated personal entries
  culture/            "What I learned this week" notes
  work/               Working-in-Japan notes
src/
  app/                App Router routes
    page.tsx                      Home (/)
    language/                     Learning tracker (/language)
      n5/                         N5 hub (/language/n5)
        lessons/  lessons/[lesson]        Guided lesson path (localStorage progress)
        kana/  kanji/  vocabulary/        Reference tables & cards
        grammar/                          Category index
          [category]/                     Category listing
          [category]/[point]/             Full grammar point page
        review/                           SM-2 flashcards (4 modes)
    culture/  work/  journal/     MDX collections + [slug] detail pages
    about/                        About + CV / contact
  components/          Small, reusable UI (KanjiCard, VocabTable, GrammarPoint,
                       GrammarCard, Formula, Ruby, GrammarExamples, AddToFlashcards,
                       ReviewDeck, LessonList, LessonDrill, FlashcardBadge, …)
  lib/                data loaders, site config, SRS (SM-2), flashcard/lesson stores
  types/              Shared content types
mdx-components.tsx    Required by @next/mdx (App Router)
```

## Content & data model

All study content lives as **typed JSON in `/data`** and is rendered by shared components —
nothing is hardcoded in JSX. This keeps the material something the author controls and can
extend without touching UI code.

Editorial rules baked into the data and types:

- **Kanji** readings and stroke counts follow **KANJIDIC2**.
- **Vocabulary** definitions follow **JMdict**.
- **Example sentences** must come from established corpora (**Tatoeba**, **NHK Easy**).
  Entries keep `exampleSentences: []` empty rather than inventing sentences.
- Since the 2010 revision the JLPT no longer publishes official vocabulary or kanji lists,
  so the N5 scope shown is a **community-consensus estimate** (noted on `/language/n5`).

Long-form posts (`/journal`, `/culture`, `/work`) are **MDX** files in `content/` with
frontmatter: `title`, `date`, `tags`, `summary`.

### The N5 learning section

- **Grammar is organised by function, not alphabetically**, across 11 categories: basic sentence,
  particles, adjectives, verb forms, existence, questions, requests & suggestions, desire &
  ability, connecting ideas, comparison, and time & frequency. The routing mirrors this:
  `/language/n5/grammar` (category index) → `/…/[category]` (listing) → `/…/[category]/[point]`
  (detail). Each `grammarPoints` entry in `data/grammar.json` carries a `category`, a visual
  `formula`, a one-line `meaning`, an authored `explanation`, `mistakes`, `related` ids, `tags`,
  and furigana-ready `examples` (segments + romaji + English, corpus-sourced only).
- **Lessons** (`data/lessons.json`) form a guided path of ~20 numbered lessons. Each references
  grammar/vocabulary/kanji by id and ends in a multiple-choice drill. Completion is tracked in
  `localStorage`.
- **Flashcards** (`/language/n5/review`) use an **SM-2** spaced-repetition scheduler with per-card
  intervals in `localStorage`. Four study modes — JP→EN recognition, EN→JP recall, kanji reading,
  and cloze on grammar examples — plus deck selection by category/tag/"due today", a session
  summary listing missed cards, a daily streak, and a cards-due badge in the nav.

> Sourcing note: example sentences are only ever drawn from open corpora (Tatoeba / NHK Easy),
> never generated. The reference grammar points ship with real, simple Tatoeba-style sentences;
> other points intentionally keep `examples: []` empty until they are reconciled against a corpus
> export (at which point `sourceId`s should be filled in).

## Reference implementations

The task was scaffolded with two fully-built reference pages that the rest of the site
follows:

- **`/`** — home: three-line pitch, live progress counters (days studying, kanji learned,
  JLPT target countdown), latest journal entries, and section links.
- **`/language/n5/kana`** — the complete hiragana & katakana tables (stroke counts,
  dakuten/handakuten, yōon) plus notes on stroke order, sokuon and long vowels.
- **`/language/n5/grammar`** (category index) and **`/language/n5/grammar/basics/desu`** (a full
  grammar point page) — the reference implementations for the reworked grammar section.

The remaining sections are implemented and wired to the data/components, with starter data
sets that can be grown toward the full N5 scope (~110 kanji, ~700 words, ~60 grammar points).

## Design

Warm paper background with a faint fibre texture, ink-like dark text, and restrained red
seal (*hanko*) accents. Elegant serif headings (Noto Serif), clean sans body (Inter), and
Japanese glyphs (Noto Serif JP) used as decoration. Scroll-reveal animations are gentle and
respect `prefers-reduced-motion`. Dates are shown throughout as proof of consistency, and
furigana use `<ruby>` tags for accessibility. A `dark` class theme is included.

## Deploying to Vercel

Import the repository into Vercel; the framework preset is **Next.js** and no extra
configuration is required. Replace the placeholder links in `src/lib/site.ts`
(LinkedIn, email, CV path) and add a CV file at `public/cv/juliette-cv.pdf`.
