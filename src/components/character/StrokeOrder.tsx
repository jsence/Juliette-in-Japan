"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { strokeDataUrls } from "@/lib/characterPaths";
import type { StrokeData } from "@/types/content";

/** Milliseconds spent drawing one unit of path length. */
const MS_PER_UNIT = 7;
/** Shortest time any single stroke takes, so tiny marks stay visible. */
const MIN_STROKE_MS = 220;
/** Pause between consecutive strokes. */
const GAP_MS = 120;

const BOX = "h-28 w-28 rounded-lg border border-white/50 bg-white/60 dark:border-white/10 dark:bg-white/5 sm:h-32 sm:w-32";

interface ScheduledStroke {
  /** Index of the glyph this stroke belongs to (contracted kana have two). */
  glyph: number;
  /** Index within that glyph. */
  index: number;
  length: number;
  startsAt: number;
  endsAt: number;
}

/**
 * Animated stroke-order diagram built from KanjiVG outlines (CC BY-SA 3.0).
 *
 * Rests on a static numbered diagram and draws the strokes in order when played,
 * so the information is there whether or not anything moves. A contracted kana
 * such as きゃ is two glyphs, drawn one after the other.
 */
export function StrokeOrder({ char }: { char: string }) {
  const reduceMotion = useReducedMotion();
  const urls = useMemo(() => strokeDataUrls(char), [char]);

  const [glyphs, setGlyphs] = useState<StrokeData[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);

  const pathRefs = useRef<(SVGPathElement | null)[][]>([]);
  const frameRef = useRef<number>();

  useEffect(() => {
    const controller = new AbortController();
    pathRefs.current = [];
    setGlyphs(null);
    setFailed(false);
    setPlaying(false);

    Promise.all(
      urls.map(async (url) => {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
        return (await res.json()) as StrokeData;
      })
    )
      .then(setGlyphs)
      .catch((err) => {
        if (err?.name !== "AbortError") setFailed(true);
      });

    return () => controller.abort();
  }, [urls]);

  const stop = useCallback(() => {
    if (frameRef.current !== undefined) cancelAnimationFrame(frameRef.current);
    frameRef.current = undefined;
  }, []);

  useEffect(() => () => stop(), [stop]);

  /** Put every stroke back to fully drawn — the static diagram. */
  useEffect(() => {
    if (playing) return;
    for (const glyph of pathRefs.current) {
      for (const path of glyph ?? []) {
        if (path) path.style.strokeDashoffset = "0";
      }
    }
  }, [glyphs, playing]);

  const play = useCallback(() => {
    if (!glyphs) return;
    stop();

    // Path length is only knowable from the live DOM, so the timeline is built
    // at play time rather than baked into the data.
    const timeline: ScheduledStroke[] = [];
    let cursor = 0;
    glyphs.forEach((glyph, g) => {
      glyph.strokes.forEach((_, index) => {
        const length = pathRefs.current[g]?.[index]?.getTotalLength() ?? 100;
        const duration = Math.max(MIN_STROKE_MS, length * MS_PER_UNIT);
        timeline.push({ glyph: g, index, length, startsAt: cursor, endsAt: cursor + duration });
        cursor += duration + GAP_MS;
      });
    });

    for (const stroke of timeline) {
      const path = pathRefs.current[stroke.glyph]?.[stroke.index];
      if (path) path.style.strokeDashoffset = String(stroke.length);
    }
    setPlaying(true);

    const startedAt = performance.now();
    const step = (now: number) => {
      const elapsed = now - startedAt;
      for (const stroke of timeline) {
        const path = pathRefs.current[stroke.glyph]?.[stroke.index];
        if (!path) continue;
        const span = stroke.endsAt - stroke.startsAt;
        const progress = Math.min(1, Math.max(0, (elapsed - stroke.startsAt) / span));
        path.style.strokeDashoffset = String(stroke.length * (1 - progress));
      }
      if (elapsed < cursor) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        frameRef.current = undefined;
        setPlaying(false);
      }
    };
    frameRef.current = requestAnimationFrame(step);
  }, [glyphs, stop]);

  if (failed) {
    return (
      <p className="text-sm text-ink-muted dark:text-paper-300">
        Stroke-order data is unavailable for this character.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-start gap-3">
        {glyphs === null
          ? urls.map((url) => <div key={url} className={BOX} aria-hidden="true" />)
          : glyphs.map((glyph, g) => (
              <div key={`${glyph.char}-${g}`} className="flex flex-col items-center gap-1">
                <svg
                  viewBox={glyph.viewBox}
                  className={BOX}
                  role="img"
                  aria-label={`Stroke order for ${glyph.char}: ${glyph.strokes.length} strokes`}
                >
                  <g stroke="currentColor" className="text-ink-muted/25 dark:text-paper-300/20">
                    <line x1="54.5" y1="0" x2="54.5" y2="109" strokeDasharray="4 5" strokeWidth="1" />
                    <line x1="0" y1="54.5" x2="109" y2="54.5" strokeDasharray="4 5" strokeWidth="1" />
                  </g>

                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-ink dark:text-paper-100"
                  >
                    {glyph.strokes.map((d, index) => (
                      <path
                        key={index}
                        d={d}
                        ref={(element) => {
                          pathRefs.current[g] ??= [];
                          pathRefs.current[g][index] = element;
                          if (element) {
                            const length = element.getTotalLength();
                            element.style.strokeDasharray = `${length} ${length}`;
                          }
                        }}
                      />
                    ))}
                  </g>

                  {!playing && (
                    <g className="fill-hanko dark:fill-hanko-light" fontSize="9" fontWeight="600">
                      {glyph.numbers.map(([x, y], index) => (
                        <text key={index} x={x} y={y}>
                          {index + 1}
                        </text>
                      ))}
                    </g>
                  )}
                </svg>
                {glyphs.length > 1 && (
                  <span className="font-jp text-sm text-ink-muted dark:text-paper-300">{glyph.char}</span>
                )}
              </div>
            ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <button
          type="button"
          onClick={play}
          disabled={!glyphs}
          className="inline-flex items-center gap-2 rounded-md border border-hanko px-3 py-1.5 text-sm font-medium text-hanko transition hover:bg-hanko/10 disabled:opacity-50 dark:text-hanko-light dark:hover:bg-hanko/20"
        >
          <span aria-hidden="true">▶</span>
          {playing ? "Replay" : "Play strokes"}
        </button>
        <p className="text-xs text-ink-muted dark:text-paper-300">
          {reduceMotion
            ? "Numbered writing order; press play to animate."
            : "Numbers show the writing order."}{" "}
          Strokes from{" "}
          <Link
            href="/project/sources"
            className="underline decoration-ink-muted/40 underline-offset-2 hover:text-hanko hover:decoration-hanko dark:hover:text-hanko-light"
          >
            KanjiVG
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
