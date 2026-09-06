"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import type { Kana } from "@/types/content";
import { matchesRomaji } from "@/lib/kanaRecall";

/** Outcome of a finished recall run. */
export interface RecallRunStats {
  elapsedMs: number;
  total: number;
  completed: number;
  recalledWithoutFlip: number;
  flipped: Kana[];
}

interface RecallArenaProps {
  deck: Kana[];
  onComplete: (stats: RecallRunStats) => void;
  onQuit: () => void;
}

type Phase = "input" | "correct" | "exit" | "enter";

const CARD_EXIT_MS = 300;
const CARD_ENTER_MS = 320;
const CORRECT_STAMP_MS = 180;

function formatElapsed(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
}

/** Continuous progress bar showing cards cleared through the deck. */
function DeckProgress({ cleared, total }: { cleared: number; total: number }) {
  const remaining = total - cleared;
  const pct = total > 0 ? (cleared / total) * 100 : 0;

  return (
    <div className="flex min-w-0 flex-1 items-center gap-2">
      <div
        className="h-2.5 min-w-0 flex-1 overflow-hidden rounded-sm border border-ink/20 bg-ink/5 dark:border-paper-100/20 dark:bg-paper-100/5"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={remaining}
        aria-label={`${remaining} of ${total} cards remaining`}
      >
        <div
          className="h-full bg-hanko/75 transition-[width] duration-300 ease-out dark:bg-hanko-light/75"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="shrink-0 font-pixel text-[0.5rem] tabular-nums text-ink-muted dark:text-paper-300 sm:text-[0.625rem]">
        {remaining}/{total}
      </span>
    </div>
  );
}

export function RecallArena({ deck, onComplete, onQuit }: RecallArenaProps) {
  const reduceMotion = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const mirrorRef = useRef<HTMLSpanElement>(null);
  const startRef = useRef(performance.now());
  const flippedRef = useRef<Set<string>>(new Set());
  const flippedListRef = useRef<Kana[]>([]);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const phaseRef = useRef<Phase>("input");
  const submitRef = useRef<() => void>(() => {});

  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("input");
  const [flipped, setFlipped] = useState(false);
  const [value, setValue] = useState("");
  const [elapsedMs, setElapsedMs] = useState(0);
  const [shake, setShake] = useState(false);
  const [flashCorrect, setFlashCorrect] = useState(false);
  const [stageFlash, setStageFlash] = useState(false);
  const [showReading, setShowReading] = useState(false);
  const [streak, setStreak] = useState(0);
  const [streakPop, setStreakPop] = useState(false);
  const [cursorLeft, setCursorLeft] = useState(0);

  const current = deck[index];
  const remaining = deck.length - index;
  const total = deck.length;
  const stackDepth = Math.min(remaining - 1, 3);
  const inputLocked = phase !== "input";

  phaseRef.current = phase;

  const focusInput = useCallback(() => {
    requestAnimationFrame(() => {
      inputRef.current?.focus({ preventScroll: true });
    });
  }, []);

  const clearTransitionTimer = useCallback(() => {
    if (transitionTimer.current) {
      clearTimeout(transitionTimer.current);
      transitionTimer.current = null;
    }
  }, []);

  const resetCardFeedback = useCallback(() => {
    setShowReading(false);
    setFlashCorrect(false);
    setStageFlash(false);
  }, []);

  const finishRun = useCallback(() => {
    onComplete({
      elapsedMs: performance.now() - startRef.current,
      total: deck.length,
      completed: deck.length,
      recalledWithoutFlip: deck.length - flippedListRef.current.length,
      flipped: [...flippedListRef.current],
    });
  }, [deck.length, onComplete]);

  const goToNextCard = useCallback(
    (animated: boolean) => {
      const next = index + 1;
      if (next >= deck.length) {
        finishRun();
        return;
      }

      setIndex(next);
      setFlipped(false);
      setValue("");
      resetCardFeedback();

      if (animated && !reduceMotion) {
        setPhase("enter");
        transitionTimer.current = setTimeout(() => {
          setPhase("input");
          focusInput();
        }, CARD_ENTER_MS);
      } else {
        setPhase("input");
        focusInput();
      }
    },
    [index, deck.length, finishRun, focusInput, reduceMotion, resetCardFeedback],
  );

  /* --------------------------- session timer ---------------------------- */

  useEffect(() => {
    const tick = () => setElapsedMs(performance.now() - startRef.current);
    tick();
    const id = window.setInterval(tick, 250);
    return () => clearInterval(id);
  }, []);

  useEffect(() => clearTransitionTimer, [clearTransitionTimer]);

  /* --------------------------- keep input focused ----------------------- */

  useEffect(() => {
    focusInput();
  }, [focusInput]);

  useEffect(() => {
    focusInput();
  }, [index, flipped, phase, focusInput]);

  useEffect(() => {
    const onDocKeyDown = (e: KeyboardEvent) => {
      if (phaseRef.current !== "input") return;
      const input = inputRef.current;
      if (!input) return;

      if (e.key === "Enter") {
        if (document.activeElement !== input) {
          e.preventDefault();
          input.focus({ preventScroll: true });
          submitRef.current();
        }
        return;
      }

      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key.length !== 1) return;
      if (document.activeElement === input) return;

      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      e.preventDefault();
      input.focus({ preventScroll: true });
      setValue((prev) => prev + e.key);
    };

    document.addEventListener("keydown", onDocKeyDown);
    return () => document.removeEventListener("keydown", onDocKeyDown);
  }, []);

  /* ------------------------ terminal cursor position -------------------- */

  useEffect(() => {
    setCursorLeft(mirrorRef.current?.offsetWidth ?? 0);
  }, [value]);

  /* --------------------------- mark as flipped ---------------------------- */

  const markFlipped = useCallback(() => {
    if (!current) return;
    if (!flippedRef.current.has(current.char)) {
      flippedRef.current.add(current.char);
      flippedListRef.current.push(current);
    }
    setStreak(0);
    setFlipped(true);
  }, [current]);

  const toggleFlip = useCallback(() => {
    if (phase !== "input" || !current) return;
    if (flipped) setFlipped(false);
    else markFlipped();
    focusInput();
  }, [phase, current, flipped, markFlipped, focusInput]);

  /* --------------------------- answer handling ---------------------------- */

  const submit = useCallback(() => {
    if (phase !== "input" || !current) return;
    if (!matchesRomaji(value, current)) {
      setShake(true);
      setValue("");
      setStreak(0);
      window.setTimeout(() => {
        setShake(false);
        focusInput();
      }, reduceMotion ? 0 : 400);
      return;
    }

    const nextStreak = streak + 1;
    setStreak(nextStreak);
    if (nextStreak % 5 === 0) {
      setStreakPop(true);
      window.setTimeout(() => setStreakPop(false), reduceMotion ? 0 : 400);
    }

    setShowReading(true);
    setFlashCorrect(true);
    setStageFlash(true);
    setPhase("correct");
    clearTransitionTimer();

    const startExit = () => {
      if (reduceMotion) {
        goToNextCard(false);
        return;
      }
      setPhase("exit");
      transitionTimer.current = setTimeout(() => {
        goToNextCard(true);
      }, CARD_EXIT_MS);
    };

    if (reduceMotion) {
      startExit();
    } else {
      transitionTimer.current = setTimeout(startExit, CORRECT_STAMP_MS);
    }
  }, [
    phase,
    current,
    value,
    streak,
    reduceMotion,
    focusInput,
    clearTransitionTimer,
    goToNextCard,
  ]);

  submitRef.current = submit;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  };

  const confirmQuit = () => {
    if (window.confirm("Quit this session? Progress will be lost.")) onQuit();
    else focusInput();
  };

  if (!current) {
    return (
      <p className="text-ink-muted dark:text-paper-300">
        Nothing in the deck — go back and adjust your selection.
      </p>
    );
  }

  const cardAnimating = phase === "exit" && !reduceMotion;
  const cardEntering = phase === "enter" && !reduceMotion;
  const cardFlip = flipped && phase === "input" && !reduceMotion;

  return (
    <div className="mx-auto w-full max-w-[28rem]">
      <div className="relative flex flex-col items-center gap-6">
        {stageFlash && (
          <div
            aria-hidden="true"
            className={
              "pointer-events-none absolute inset-0 bg-hanko/10 dark:bg-hanko-light/10 " +
              (reduceMotion ? "opacity-50" : "animate-stage-flash")
            }
          />
        )}

        {/* HUD — timer, progress, streak on one line */}
        <div className="relative flex w-full flex-nowrap items-center gap-3">
          <div
            className="shrink-0 rounded border-2 border-ink/20 bg-paper-50 px-2.5 py-1 dark:border-paper-100/20 dark:bg-sumi-light"
            aria-live="off"
          >
            <span className="font-pixel text-[0.65rem] tabular-nums tracking-wide text-ink dark:text-paper-100 sm:text-xs">
              {formatElapsed(elapsedMs)}
            </span>
          </div>

          <DeckProgress cleared={index} total={total} />

          <div
            className={
              "flex shrink-0 items-center gap-1 rounded border border-ink/15 bg-paper-100/80 px-2 py-1 dark:border-paper-100/15 dark:bg-sumi-light/80 " +
              (streakPop && !reduceMotion ? "animate-streak-pop" : "")
            }
            aria-live="polite"
          >
            <span className="font-pixel text-[0.45rem] uppercase text-ink-muted dark:text-paper-300">
              Streak
            </span>
            <span
              className={
                "font-pixel text-xs tabular-nums " +
                (streak >= 5 ? "text-hanko dark:text-hanko-light" : "text-ink dark:text-paper-100")
              }
            >
              {streak}
              {streak >= 5 && streak % 5 === 0 ? " ✦" : ""}
            </span>
          </div>
        </div>

        {/* Card stack — fixed slot prevents layout shift between cards */}
        <div className="recall-card-slot relative w-full">
          <div className="absolute inset-0">
            {stackDepth > 0 &&
              Array.from({ length: stackDepth }, (_, i) => {
                const depth = stackDepth - i;
                const rot = (i % 2 === 0 ? 1 : -1) * (2 + i * 1.5);
                return (
                  <div
                    key={`${index}-stack-${i}`}
                    aria-hidden="true"
                    className="recall-stack-card absolute inset-0 rounded-lg"
                    style={{
                      transform: `translate(${depth * 6}px, ${depth * 5}px) rotate(${rot}deg) scale(${1 - depth * 0.016})`,
                      zIndex: 5 + i,
                      opacity: 0.92 - i * 0.12,
                      transition: reduceMotion
                        ? undefined
                        : "transform 0.32s cubic-bezier(0.33, 1, 0.68, 1), opacity 0.32s ease-out",
                    }}
                  />
                );
              })}

            <div
              className={
                "absolute inset-0 " +
                (cardAnimating ? "animate-card-exit" : cardEntering ? "animate-card-enter" : "")
              }
              style={{ zIndex: 20 }}
            >
              <div className="recall-card relative h-full w-full rounded-lg bg-paper-50 dark:bg-sumi-light">
                {reduceMotion ? (
                  <div
                    className="h-full w-full cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFlip();
                    }}
                    role="button"
                    tabIndex={-1}
                    aria-label={flipped ? "Hide reading" : "Show reading"}
                  >
                    {!flipped ? (
                      <div
                        className={
                          "recall-card-face absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-[4px] transition-colors " +
                          (flashCorrect ? "bg-hanko/15 dark:bg-hanko-light/15" : "")
                        }
                      >
                        <div className="flex h-[62%] w-full items-center justify-center">
                          <p className="recall-kana-char font-jp font-semibold text-hanko dark:text-hanko-light">
                            {current.char}
                          </p>
                        </div>
                        {showReading && (phase === "correct" || phase === "exit") && (
                          <p className="absolute bottom-[14%] font-pixel text-xs uppercase tracking-wide text-hanko dark:text-hanko-light">
                            {current.romaji}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div
                        className="recall-card-back absolute inset-0 flex flex-col items-center justify-center rounded-[4px]"
                        aria-hidden={false}
                      >
                        <p className="font-pixel text-[clamp(1.25rem,7vw,1.75rem)] uppercase tracking-wider text-hanko dark:text-hanko-light">
                          {current.romaji}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    className="recall-card-flip relative h-full w-full cursor-pointer transition-transform duration-[400ms] ease-out"
                    style={{ transform: cardFlip ? "rotateY(180deg)" : "rotateY(0deg)" }}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFlip();
                    }}
                    role="button"
                    tabIndex={-1}
                    aria-label={flipped ? "Hide reading" : "Show reading"}
                  >
                    <div
                      className={
                        "recall-card-face absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-[4px] transition-colors " +
                        (flashCorrect ? "bg-hanko/10 dark:bg-hanko-light/10" : "")
                      }
                    >
                      <div className="flex h-[62%] w-full items-center justify-center">
                        <p className="recall-kana-char font-jp font-semibold text-hanko dark:text-hanko-light">
                          {current.char}
                        </p>
                      </div>
                      {showReading && (phase === "correct" || phase === "exit") && (
                        <p
                          className={
                            "absolute bottom-[14%] font-pixel text-xs uppercase tracking-wide text-hanko dark:text-hanko-light animate-romaji-stamp"
                          }
                        >
                          {current.romaji}
                        </p>
                      )}
                    </div>

                    <div
                      className="recall-card-back absolute inset-0 flex flex-col items-center justify-center rounded-[4px]"
                      aria-hidden={!flipped}
                    >
                      <p className="font-pixel text-[clamp(1.25rem,7vw,1.75rem)] uppercase tracking-wider text-hanko dark:text-hanko-light">
                        {current.romaji}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Input + actions */}
        <div className="w-full space-y-3">
          <label htmlFor="recall-input" className="sr-only">
            Type the romaji reading for {current.char}
          </label>

          <div className="relative">
            <span
              ref={mirrorRef}
              aria-hidden="true"
              className="pointer-events-none invisible absolute left-4 top-1/2 -translate-y-1/2 whitespace-pre font-pixel text-base"
            >
              {value || ""}
            </span>
            <input
              id="recall-input"
              ref={inputRef}
              type="text"
              inputMode="text"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="go"
              value={value}
              readOnly={inputLocked}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              className={
                "recall-input w-full rounded-md border-[3px] border-ink bg-paper-50 px-4 py-2.5 font-pixel text-base text-ink outline-none transition dark:border-paper-100/30 dark:bg-sumi-light dark:text-paper-100 " +
                (inputLocked ? "opacity-75" : "") +
                (shake && !reduceMotion ? "animate-input-shake border-hanko bg-hanko/5" : "") +
                (shake && reduceMotion ? " border-hanko bg-hanko/10" : "")
              }
            />
            {!inputLocked && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 h-[1.1em] w-2 -translate-y-1/2 bg-hanko animate-cursor-blink dark:bg-hanko-light"
                style={{ left: `${16 + cursorLeft}px` }}
              />
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={toggleFlip}
              disabled={inputLocked}
              className="flex-1 rounded-md border-2 border-ink/25 bg-paper-50 px-3 py-2 font-pixel text-[0.5rem] uppercase tracking-wide text-ink-light transition hover:bg-paper-200 disabled:opacity-40 dark:border-paper-100/25 dark:bg-sumi-light dark:text-paper-200 dark:hover:bg-sumi-border sm:text-[0.625rem]"
            >
              {flipped ? "Hide" : "Flip"}
            </button>

            <button
              type="button"
              onClick={confirmQuit}
              className="flex-1 rounded-md border-2 border-ink/20 bg-paper-100/80 px-3 py-2 font-pixel text-[0.5rem] uppercase tracking-wide text-ink-muted transition hover:bg-paper-200 dark:border-paper-100/20 dark:bg-sumi-light/80 dark:text-paper-300 dark:hover:bg-sumi-border sm:text-[0.625rem]"
            >
              Quit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
