"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import type { StudyCard, StudyMode, CardFace } from "@/types/content";
import { Ruby } from "./Ruby";
import { ProgressBar } from "./ProgressBar";
import {
  buildCards,
  grammarPointCard,
  schedule,
  isDue,
  todayIso,
  GRADES,
  type GradeKey,
} from "@/lib/srs";
import { GRAMMAR_CATEGORIES, grammar } from "@/lib/data";
import {
  readSchedule,
  saveCardState,
  readStarred,
  recordStudyToday,
  resetSchedule,
} from "@/lib/flashcardStore";

const SESSION_SIZE = 20;

const MODE_LABELS: Record<StudyMode, string> = {
  recognition: "JP → EN (recognition)",
  recall: "EN → JP (recall)",
  "kanji-reading": "Kanji reading",
  cloze: "Cloze (fill the blank)",
};

const DECK_LABELS: Record<string, string> = {
  ...Object.fromEntries(GRAMMAR_CATEGORIES.map((c) => [c.slug, c.label])),
  kanji: "Kanji",
  numbers: "Numbers",
  time: "Time",
  family: "Family",
  food: "Food & drink",
  transport: "Transport",
  verbs: "Core verbs",
  adjectives: "Adjectives",
  places: "Places",
  people: "People",
  everyday: "Everyday",
};

const deckLabel = (deck: string) => DECK_LABELS[deck] ?? deck;

const GRADE_STYLES: Record<GradeKey, string> = {
  again: "border-hanko text-hanko hover:bg-hanko/10",
  hard: "border-amber-500 text-amber-700 hover:bg-amber-500/10 dark:text-amber-300",
  good: "border-emerald-600 text-emerald-700 hover:bg-emerald-600/10 dark:text-emerald-300",
  easy: "bg-emerald-600 text-paper-50 border-emerald-600 hover:bg-emerald-700",
};

type Phase = "setup" | "studying" | "summary";
type DeckSelection = "all" | "due" | "starred" | string;

interface Result {
  card: StudyCard;
  correct: boolean;
}

export function ReviewDeck() {
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<StudyMode>("recognition");
  const [deck, setDeck] = useState<DeckSelection>("due");
  const [phase, setPhase] = useState<Phase>("setup");

  const [session, setSession] = useState<StudyCard[]>([]);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [streakRecorded, setStreakRecorded] = useState(false);

  useEffect(() => setReady(true), []);

  /** Cards available for the current mode + deck selection. */
  const pool = useMemo(() => {
    if (!ready) return [] as StudyCard[];

    if (deck === "starred") {
      const starred = readStarred();
      return starred
        .map((id) => grammar.find((p) => p.id === id))
        .filter((p): p is NonNullable<typeof p> => Boolean(p))
        .map((p) => grammarPointCard(p));
    }

    let cards = buildCards(mode);
    if (deck === "due") {
      const store = readSchedule();
      const today = todayIso();
      cards = cards.filter((c) => isDue(store[c.id], today));
    } else if (deck !== "all") {
      cards = cards.filter((c) => c.deck === deck || c.tags.includes(deck));
    }
    return cards;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, mode, deck, phase]);

  /** Deck options that actually contain cards in the current mode. */
  const deckOptions = useMemo(() => {
    const decks = new Set<string>();
    for (const c of buildCards(mode)) decks.add(c.deck);
    return [...decks];
  }, [mode]);

  const startSession = useCallback(
    (cards: StudyCard[]) => {
      const store = readSchedule();
      const today = todayIso();
      const ordered = [...cards].sort((a, b) => {
        const da = store[a.id]?.due ?? "0000-00-00";
        const db = store[b.id]?.due ?? "0000-00-00";
        return da.localeCompare(db);
      });
      setSession(ordered.slice(0, SESSION_SIZE));
      setIndex(0);
      setRevealed(false);
      setResults([]);
      setStreakRecorded(false);
      setPhase("studying");
    },
    []
  );

  const grade = useCallback(
    (key: GradeKey) => {
      const card = session[index];
      if (!card) return;
      const quality = GRADES[key];
      const store = readSchedule();
      const next = schedule(store[card.id], quality);
      saveCardState(card.id, next);

      if (!streakRecorded) {
        recordStudyToday();
        setStreakRecorded(true);
      }

      setResults((r) => [...r, { card, correct: quality >= 3 }]);

      if (index + 1 >= session.length) {
        setPhase("summary");
      } else {
        setIndex((i) => i + 1);
        setRevealed(false);
      }
    },
    [session, index, streakRecorded]
  );

  if (!ready) {
    return <p className="text-ink-muted dark:text-paper-300">Loading your deck…</p>;
  }

  /* ------------------------------- setup -------------------------------- */
  if (phase === "setup") {
    return (
      <div className="space-y-8">
        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold uppercase tracking-wide text-ink-muted dark:text-paper-300">
            Study mode
          </legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {(Object.keys(MODE_LABELS) as StudyMode[]).map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={mode === m}
                onClick={() => setMode(m)}
                className={
                  "rounded-lg border px-4 py-3 text-left text-sm font-medium transition " +
                  (mode === m
                    ? "border-hanko bg-hanko/10 text-hanko dark:text-hanko-light"
                    : "border-paper-300 text-ink-light hover:bg-paper-200 dark:border-sumi-border dark:text-paper-200 dark:hover:bg-sumi-light")
                }
              >
                {MODE_LABELS[m]}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold uppercase tracking-wide text-ink-muted dark:text-paper-300">
            Deck
          </legend>
          <div className="flex flex-wrap gap-2">
            {(["due", "all", "starred"] as DeckSelection[]).map((d) => (
              <button
                key={d}
                type="button"
                aria-pressed={deck === d}
                onClick={() => setDeck(d)}
                className={
                  "rounded-full px-3 py-1.5 text-sm font-medium transition " +
                  (deck === d
                    ? "bg-hanko text-paper-50"
                    : "border border-paper-300 text-ink-light hover:bg-paper-200 dark:border-sumi-border dark:text-paper-200 dark:hover:bg-sumi-light")
                }
              >
                {d === "due" ? "Due today" : d === "all" ? "All" : "Starred"}
              </button>
            ))}
            <select
              value={deckOptions.includes(deck) ? deck : ""}
              onChange={(e) => e.target.value && setDeck(e.target.value)}
              aria-label="Choose a deck by category or theme"
              className="rounded-full border border-paper-300 bg-paper-50 px-3 py-1.5 text-sm text-ink-light dark:border-sumi-border dark:bg-sumi-light dark:text-paper-200"
            >
              <option value="">By category / tag…</option>
              {deckOptions.map((d) => (
                <option key={d} value={d}>
                  {deckLabel(d)}
                </option>
              ))}
            </select>
          </div>
        </fieldset>

        <div className="rounded-lg border border-paper-300 bg-paper-50 p-5 dark:border-sumi-border dark:bg-sumi-light">
          <p className="text-sm text-ink-light dark:text-paper-200">
            <span className="font-semibold text-ink dark:text-paper-100">{pool.length}</span> card
            {pool.length === 1 ? "" : "s"} in{" "}
            <span className="font-medium">
              {deck === "due" ? "Due today" : deck === "all" ? "All" : deck === "starred" ? "Starred" : deckLabel(deck)}
            </span>{" "}
            · this session will show up to {SESSION_SIZE}.
          </p>
          <button
            type="button"
            disabled={pool.length === 0}
            onClick={() => startSession(pool)}
            className="mt-3 rounded-md bg-hanko px-5 py-2.5 font-medium text-paper-50 transition hover:bg-hanko-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pool.length === 0 ? "Nothing to study here" : "Start session"}
          </button>
        </div>

        <div>
          <button
            type="button"
            onClick={() => {
              if (confirm("Reset all spaced-repetition progress? This cannot be undone.")) {
                resetSchedule();
              }
            }}
            className="text-xs text-ink-muted underline-offset-2 hover:text-hanko hover:underline dark:text-paper-300 dark:hover:text-hanko-light"
          >
            Reset SRS progress
          </button>
        </div>
      </div>
    );
  }

  /* ------------------------------ summary ------------------------------- */
  if (phase === "summary") {
    const correct = results.filter((r) => r.correct).length;
    const missed = results.filter((r) => !r.correct);
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-paper-300 bg-paper-50 p-6 text-center dark:border-sumi-border dark:bg-sumi-light">
          <h2 className="font-serif text-2xl font-bold text-ink dark:text-paper-100">Session complete</h2>
          <p className="mt-2 text-4xl font-bold text-hanko dark:text-hanko-light">
            {correct} / {results.length}
          </p>
          <p className="mt-1 text-sm text-ink-muted dark:text-paper-300">answered correctly</p>
          <div className="mx-auto mt-4 max-w-sm">
            <ProgressBar value={correct} max={results.length} showCount={false} label="Accuracy" />
          </div>
        </div>

        {missed.length > 0 && (
          <div className="rounded-lg border border-paper-300 bg-paper-50 p-5 dark:border-sumi-border dark:bg-sumi-light">
            <h3 className="font-serif text-lg font-semibold text-ink dark:text-paper-100">
              Cards to revisit ({missed.length})
            </h3>
            <ul className="mt-3 divide-y divide-paper-200 dark:divide-sumi-border">
              {missed.map((r, i) => (
                <li key={i} className="flex items-center justify-between gap-3 py-2 text-sm">
                  <span className="text-ink dark:text-paper-100">
                    <FaceInline face={r.card.front} />
                  </span>
                  <span className="text-ink-muted dark:text-paper-300">
                    <FaceInline face={r.card.back} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          {missed.length > 0 && (
            <button
              type="button"
              onClick={() => startSession(missed.map((r) => r.card))}
              className="rounded-md bg-hanko px-5 py-2.5 font-medium text-paper-50 transition hover:bg-hanko-dark"
            >
              Study missed again
            </button>
          )}
          <button
            type="button"
            onClick={() => setPhase("setup")}
            className="rounded-md border border-paper-300 px-5 py-2.5 font-medium text-ink transition hover:bg-paper-200 dark:border-sumi-border dark:text-paper-100 dark:hover:bg-sumi-light"
          >
            New session
          </button>
        </div>
      </div>
    );
  }

  /* ------------------------------ studying ------------------------------ */
  const card = session[index];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-ink-muted dark:text-paper-300">
        <span>
          {MODE_LABELS[card.mode]} · {deckLabel(card.deck)}
        </span>
        <span>
          {index + 1} / {session.length}
        </span>
      </div>
      <ProgressBar value={index} max={session.length} showCount={false} label="" />

      <div className="mx-auto w-full max-w-xl">
        <div className="flex min-h-[14rem] flex-col items-center justify-center rounded-xl border border-paper-300 bg-paper-50 p-8 text-center shadow-sm dark:border-sumi-border dark:bg-sumi-light">
          <CardFaceView face={card.front} big />
          {revealed && (
            <>
              <hr className="my-5 w-16 border-paper-300 dark:border-sumi-border" />
              <CardFaceView face={card.back} />
            </>
          )}
        </div>

        {!revealed ? (
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="mt-4 w-full rounded-md bg-hanko px-5 py-3 font-medium text-paper-50 transition hover:bg-hanko-dark"
          >
            Reveal answer
          </button>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(Object.keys(GRADES) as GradeKey[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => grade(key)}
                className={"rounded-md border px-3 py-2.5 text-sm font-medium capitalize transition " + GRADE_STYLES[key]}
              >
                {key}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={() => setPhase("setup")}
          className="text-xs text-ink-muted underline-offset-2 hover:text-hanko hover:underline dark:text-paper-300 dark:hover:text-hanko-light"
        >
          End session
        </button>
      </div>
    </div>
  );
}

function CardFaceView({ face, big = false }: { face: CardFace; big?: boolean }) {
  return (
    <div>
      {face.segments ? (
        <Ruby
          segments={face.segments}
          className={big ? "text-4xl text-ink dark:text-paper-100" : "text-2xl text-ink dark:text-paper-100"}
        />
      ) : (
        <p className={(big ? "text-3xl" : "text-2xl") + " font-serif text-ink dark:text-paper-100"}>
          {face.text}
        </p>
      )}
      {face.sub && <p className="mt-2 text-sm text-ink-muted dark:text-paper-300">{face.sub}</p>}
    </div>
  );
}

function FaceInline({ face }: { face: CardFace }) {
  if (face.segments) return <Ruby segments={face.segments} />;
  return <span>{face.text}</span>;
}
