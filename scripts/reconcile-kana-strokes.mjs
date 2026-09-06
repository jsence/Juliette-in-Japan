/**
 * Reconcile the `strokes` field in data/kana.json with the KanjiVG stroke data
 * in public/strokes, so the number shown on a card matches the number of
 * strokes the detail panel actually animates.
 *
 *   node scripts/reconcile-kana-strokes.mjs [--check]
 *
 * A contracted kana such as きゃ is written as two glyphs, so its count is the
 * sum of its parts. Run with --check in CI to fail instead of rewriting.
 *
 * Only the numeric value is rewritten; the file's one-entry-per-line formatting
 * is left untouched.
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DATA = path.join(process.cwd(), "data", "kana.json");
const STROKES = path.join(process.cwd(), "public", "strokes");

const checkOnly = process.argv.includes("--check");

function fileId(char) {
  return char.codePointAt(0).toString(16).padStart(5, "0");
}

async function strokeCount(char) {
  let total = 0;
  for (const part of char) {
    const raw = await readFile(path.join(STROKES, `${fileId(part)}.json`), "utf8");
    total += JSON.parse(raw).strokes.length;
  }
  return total;
}

async function run() {
  const source = await readFile(DATA, "utf8");
  const entries = JSON.parse(source);

  const changes = [];
  for (const entry of entries) {
    const actual = await strokeCount(entry.char);
    if (actual !== entry.strokes) changes.push({ char: entry.char, from: entry.strokes, to: actual });
  }

  if (changes.length === 0) {
    console.log(`All ${entries.length} kana stroke counts match KanjiVG.`);
    return;
  }

  console.log(`${changes.length} of ${entries.length} kana disagree with KanjiVG:`);
  for (const c of changes) console.log(`  ${c.char}  ${c.from} → ${c.to}`);

  if (checkOnly) {
    console.error("\n--check specified: not rewriting.");
    process.exit(1);
  }

  // Rewrite only the numeric value on each affected line so the file's
  // formatting survives untouched.
  const lines = source.split("\n");
  for (const change of changes) {
    const index = lines.findIndex((line) => line.includes(`"char": "${change.char}"`));
    if (index === -1) throw new Error(`could not locate line for ${change.char}`);
    const updated = lines[index].replace(
      /"strokes":\s*\d+/,
      `"strokes": ${change.to}`
    );
    if (updated === lines[index]) throw new Error(`could not update strokes for ${change.char}`);
    lines[index] = updated;
  }

  await writeFile(DATA, lines.join("\n"));
  console.log(`\nUpdated ${changes.length} entries in data/kana.json.`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
