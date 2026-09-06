"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import type { Kana } from "@/types/content";
import { CORRECT_FLASH_MS, matchesRomaji } from "@/lib/kanaRecall";

/** Outcome of a finished recall run. */
export interface RecallRunStats {
  elapsedMs: number;
  total: number;
  /** Cards the player typed through (always equals total when the deck is done). */
  completed: number;
  /** Cards answered without ever flipping — the only true "recall" score. */
  recalledWithoutFlip: number;
  /** Cards the player flipped to peek; typos are deliberately excluded. */
  flipped: Kana[];
}

interface RecallArenaProps {
  deck: Kana[];
  onComplete: (stats: RecallRunStats) => void;
  onQuit: () => void;
}

type Phase = "input" | "correct";

function formatElapsed(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

export function RecallArena({ deck, onComplete, onQuit }: RecallArenaProps) {
  const reduceMotion = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const startRef = useRef(performance.now());
  const flippedRef = useRef<Set<string>>(new Set());
  const flippedListRef = useRef<Kana[]>([]);

  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("input");
  const [flipped, setFlipped] = useState(false);
  const [value, setValue] = useState("");
  const [elapsedMs, setElapsedMs] = useState(0);
  const [shake, setShake] = useState(false);
  const [flashCorrect, setFlashCorrect] = useState(false);
  const [showReading, setShowReading] = useState(false);

  const current = deck[index];
  const remaining = deck.length - index;
  const total = deck.length;

  /* --------------------------- session timer ---------------------------- */

  useEffect(() => {
    const tick = () => setElapsedMs(performance.now() - startRef.current);
    tick();
    const id = window.setInterval(tick, 250);
    return () => clearInterval(id);
  }, []);

  /* --------------------------- autofocus input -------------------------- */

  useEffect(() => {
    if (phase === "input") inputRef.current?.focus({ preventScroll: true });
  }, [phase, index]);

  /* --------------------------- mark as flipped ---------------------------- */

  const markFlipped = useCallback(() => {
    if (!current) return;
    if (!flippedRef.current.has(current.char)) {
      flippedRef.current.add(current.char);
      flippedListRef.current.push(current);
    }
    setFlipped(true);
  }, [current]);

  const toggleFlip = useCallback(() => {
    if (phase !== "input" || !current) return;
    if (flipped) setFlipped(false);
    else markFlipped();
  }, [phase, current, flipped, markFlipped]);

  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
  }, []);

  /* --------------------------- answer handling ---------------------------- */

  const advance = useCallback(() => {
    const next = index + 1;
    if (next >= deck.length) {
      onComplete({
        elapsedMs: performance.now() - startRef.current,
        total: deck.length,
        completed: deck.length,
        recalledWithoutFlip: deck.length - flippedListRef.current.length,
        flipped: [...flippedListRef.current],
      });
      return;
    }
    setIndex(next);
    setPhase("input");
    setFlipped(false);
    setValue("");
    setShowReading(false);
    setFlashCorrect(false);
  }, [index, deck.length, onComplete]);

  const submit = useCallback(() => {
    if (phase !== "input" || !current) return;
    if (!matchesRomaji(value, current)) {
      setShake(true);
      setValue("");
      window.setTimeout(() => setShake(false), reduceMotion ? 0 : 400);
      return;
    }

    setPhase("correct");
    setShowReading(true);
    setFlashCorrect(true);
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(advance, CORRECT_FLASH_MS);
  }, [phase, current, value, advance, reduceMotion]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  };

  const confirmQuit = () => {
    if (window.confirm("Quit this session? Progress will be lost.")) onQuit();
  };

  if (!current) {
    return (
      <p className="text-ink-muted dark:text-paper-300">Nothing in the deck — go back and adjust your selection.</p>
    );
  }

  const stackDepth = Math.min(remaining - 1, 3);

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-6">
      {/* HUD */}
      <div className="flex items-center justify-between gap-4 font-pixel text-[0.5rem] uppercase tracking-wider text-ink-muted dark:text-paper-300 sm:text-[0.625rem]">
        <span aria-live="off">Time {formatElapsed(elapsedMs)}</span>
        <span aria-live="polite">
          {remaining} / {total} left
        </span>
      </div>

      {/* Card stack */}
      <div className="relative mx-auto w-full max-w-xs sm:max-w-sm" style={{ perspective: "900px" }}>
        {/* Ghost cards behind the active one */}
        {stackDepth > 0 &&
          Array.from({ length: stackDepth }, (_, i) => (
            <div
              key={i}
              aria-hidden="true"
              className="absolute inset-x-0 top-0 rounded-xl border-2 border-ink/10 bg-paper-100/80 dark:border-paper-100/10 dark:bg-sumi-light/80"
              style={{
                height: "11rem",
                transform: `translateY(${(i + 1) * 5}px) scale(${1 - (i + 1) * 0.025})`,
                zIndex: 10 - i,
                opacity: 0.55 - i * 0.12,
              }}
            />
          ))}

        <div
          className={
            "relative cursor-pointer " +
            (reduceMotion ? "" : "transition-transform duration-500 ease-out ") +
            (!reduceMotion && flipped ? "[transform:rotateY(180deg)]" : "")
          }
          style={{ transformStyle: "preserve-3d", zIndex: 20 }}
          onClick={phase === "input" ? toggleFlip : undefined}
          role="button"
          tabIndex={-1}
          aria-label={flipped ? "Hide reading" : "Show reading"}
        >
          {/* Front — kana */}
          <div
            className={
              "relative flex min-h-[11rem] flex-col items-center justify-center rounded-xl border-2 bg-paper-50 px-6 py-8 shadow-[4px_4px_0_rgba(43,38,32,0.2)] transition-colors dark:bg-sumi-light dark:shadow-[4px_4px_0_rgba(0,0,0,0.45)] " +
              (flashCorrect
                ? reduceMotion
                  ? "border-emerald-600 bg-emerald-600/10"
                  : "animate-correct-flash"
                : "border-hanko/35 dark:border-hanko-light/35") +
              (reduceMotion && flipped ? " hidden" : "")
            }
            style={reduceMotion ? undefined : { backfaceVisibility: "hidden" }}
          >
            <p className="font-jp text-7xl font-semibold text-hanko dark:text-hanko-light sm:text-8xl">
              {current.char}
            </p>
            {showReading && phase === "correct" && (
              <p className="mt-3 font-pixel text-sm text-emerald-700 dark:text-emerald-400">
                {current.romaji}
              </p>
            )}
          </div>

          {/* Back — romaji (visible when flipped) */}
          <div
            className={
              (reduceMotion ? "relative" : "absolute inset-0") +
              " flex min-h-[11rem] flex-col items-center justify-center rounded-xl border-2 border-ai/40 bg-paper-100 px-6 py-8 shadow-[4px_4px_0_rgba(43,38,32,0.2)] dark:bg-sumi dark:shadow-[4px_4px_0_rgba(0,0,0,0.45)] " +
              (reduceMotion && !flipped ? "hidden" : "")
            }
            style={
              reduceMotion
                ? undefined
                : { backfaceVisibility: "hidden", transform: "rotateY(180deg)" }
            }
            aria-hidden={!flipped}
          >
            <p className="font-pixel text-2xl text-ink dark:text-paper-100 sm:text-3xl">
              {current.romaji}
            </p>
            <p className="mt-2 text-xs text-ink-muted dark:text-paper-300">Type it to continue</p>
          </div>
        </div>
      </div>

      {/* Input + flip */}
      <div className="space-y-3">
        <label htmlFor="recall-input" className="sr-only">
          Type the romaji reading for {current.char}
        </label>
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
          disabled={phase !== "input"}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="type romaji…"
          className={
            "w-full rounded-lg border-2 border-ink/25 bg-white/60 px-4 py-3 font-pixel text-base text-ink shadow-[2px_2px_0_rgba(43,38,32,0.15)] outline-none transition placeholder:text-ink-muted/50 focus:border-hanko focus:ring-2 focus:ring-hanko/30 disabled:opacity-60 dark:border-paper-100/20 dark:bg-white/5 dark:text-paper-100 dark:shadow-[2px_2px_0_rgba(0,0,0,0.35)] dark:placeholder:text-paper-300/40 " +
            (shake && !reduceMotion ? "animate-input-shake border-hanko bg-hanko/5" : "") +
            (shake && reduceMotion ? " border-hanko bg-hanko/10" : "")
          }
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={toggleFlip}
            disabled={phase !== "input"}
            className="rounded-md border border-ink/20 px-3 py-1.5 font-pixel text-[0.625rem] text-ink-light transition hover:bg-ink/5 disabled:opacity-50 dark:border-paper-100/20 dark:text-paper-200 dark:hover:bg-white/5"
          >
            {flipped ? "Hide answer" : "Flip card"}
          </button>
          <button
            type="button"
            onClick={confirmQuit}
            className="rounded-md border border-ink/20 px-3 py-1.5 text-xs font-medium text-ink-muted transition hover:bg-ink/5 dark:border-paper-100/20 dark:text-paper-300 dark:hover:bg-white/5"
          >
            Quit
          </button>
        </div>

        <p className="text-center text-xs text-ink-muted dark:text-paper-300">
          Press <kbd className="font-pixel text-[0.625rem]">Enter</kbd> to submit · flip counts as a
          miss, typos do not
        </p>
      </div>
    </div>
  );
}
