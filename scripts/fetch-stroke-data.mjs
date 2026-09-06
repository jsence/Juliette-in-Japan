/**
 * Fetch stroke-order data from KanjiVG (CC BY-SA 3.0) for every character the
 * site teaches, and write one small JSON file per character.
 *
 *   node scripts/fetch-stroke-data.mjs
 *
 * Output: public/strokes/<codepoint>.json — { char, viewBox, strokes, numbers }
 *
 * Only single-codepoint characters have a KanjiVG glyph. Contracted kana such as
 * きゃ are written as two glyphs, so the UI composes them from their parts and
 * this script fetches those parts individually.
 *
 * Source: https://github.com/KanjiVG/kanjivg — attribution lives in
 * /project/sources. Re-run to refresh; the output is committed so builds and
 * page loads never depend on the network.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import kana from "../data/kana.json" with { type: "json" };
import kanji from "../data/kanji.json" with { type: "json" };

const OUT_DIR = path.join(process.cwd(), "public", "strokes");
const BASE = "https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji";
const CONCURRENCY = 8;

/** KanjiVG names files by zero-padded lowercase hex codepoint, e.g. 03042.svg. */
function fileId(char) {
  return char.codePointAt(0).toString(16).padStart(5, "0");
}

/** Every distinct single codepoint used by the kana and kanji data. */
function targetCharacters() {
  const chars = new Set();
  for (const entry of [...kana, ...kanji]) {
    for (const cp of entry.char) chars.add(cp);
  }
  return [...chars];
}

async function fetchWithRetry(url, attempts = 4) {
  let lastError;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (err) {
      lastError = err;
      await new Promise((r) => setTimeout(r, 2 ** i * 500));
    }
  }
  throw new Error(`failed to fetch ${url}: ${lastError?.message}`);
}

/**
 * Pull the stroke paths and the stroke-number label positions out of a KanjiVG
 * SVG. The files are machine-generated with a stable shape, so the markup is
 * matched directly rather than through a full XML parser.
 */
function parseKanjiVG(svg) {
  const viewBox = svg.match(/<svg[^>]*viewBox="([^"]+)"/)?.[1] ?? "0 0 109 109";

  const pathBlock = svg.split("StrokeNumbers")[0];
  const strokes = [...pathBlock.matchAll(/<path[^>]*\sd="([^"]+)"/g)].map((m) => m[1]);

  const numberBlock = svg.split("StrokeNumbers")[1] ?? "";
  const numbers = [...numberBlock.matchAll(/matrix\(1 0 0 1 ([\d.-]+) ([\d.-]+)\)/g)].map((m) => [
    Number(m[1]),
    Number(m[2]),
  ]);

  return { viewBox, strokes, numbers };
}

async function run() {
  await mkdir(OUT_DIR, { recursive: true });
  const chars = targetCharacters();
  console.log(`Fetching stroke data for ${chars.length} characters…`);

  const missing = [];
  let written = 0;

  const queue = [...chars];
  async function worker() {
    for (;;) {
      const char = queue.shift();
      if (!char) return;
      const id = fileId(char);
      const svg = await fetchWithRetry(`${BASE}/${id}.svg`);
      if (!svg) {
        missing.push(char);
        continue;
      }
      const { viewBox, strokes, numbers } = parseKanjiVG(svg);
      if (strokes.length === 0) {
        missing.push(char);
        continue;
      }
      await writeFile(
        path.join(OUT_DIR, `${id}.json`),
        JSON.stringify({ char, viewBox, strokes, numbers })
      );
      written++;
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  console.log(`Wrote ${written} files to public/strokes.`);
  if (missing.length) console.log(`No KanjiVG glyph for: ${missing.join(" ")}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
