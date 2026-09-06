/**
 * Add the classical (Kangxi) radical to each entry in data/kanji.json, from
 * KANJIDIC2 via the jmdict-simplified JSON distribution.
 *
 *   node scripts/build-kanji-radicals.mjs [--check]
 *
 * KANJIDIC2 records the radical as a number, so the glyph is derived from the
 * Unicode Kangxi Radicals block (radical n is U+2EFF + n) and then normalised to
 * the ordinary CJK ideograph with NFKC — ⽇ becomes 日 — rather than typing a
 * lookup table by hand.
 *
 * The download is cached in .cache/. Output is committed so builds never depend
 * on the network.
 */
import { mkdir, readdir, readFile, writeFile, stat } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { execFile } from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";

const CACHE = path.join(process.cwd(), ".cache");
const DATA = path.join(process.cwd(), "data", "kanji.json");
const REPO = "scriptin/jmdict-simplified";

const checkOnly = process.argv.includes("--check");

async function exists(file) {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
}

async function loadKanjidic() {
  await mkdir(CACHE, { recursive: true });
  const marker = path.join(CACHE, "kanjidic2-en.json");
  if (await exists(marker)) {
    console.log("Using cached KANJIDIC2 from .cache/");
    return JSON.parse(await readFile(marker, "utf8"));
  }

  const release = await (await fetch(`https://api.github.com/repos/${REPO}/releases/latest`)).json();
  const asset = release.assets.find((a) => /^kanjidic2-en-.*\.json\.tgz$/.test(a.name));
  if (!asset) throw new Error("no kanjidic2-en asset in the latest release");

  console.log(`Downloading ${asset.name}…`);
  const res = await fetch(asset.browser_download_url);
  if (!res.ok) throw new Error(`HTTP ${res.status} downloading ${asset.name}`);

  const tgz = path.join(CACHE, asset.name);
  await pipeline(res.body, createWriteStream(tgz));
  await promisify(execFile)("tar", ["xzf", tgz, "-C", CACHE]);

  const unpacked = (await readdir(CACHE)).find((f) => /^kanjidic2-en-.*\.json$/.test(f));
  if (!unpacked) throw new Error("could not find the unpacked KANJIDIC2 JSON");
  const json = await readFile(path.join(CACHE, unpacked), "utf8");
  await writeFile(marker, json);
  return JSON.parse(json);
}

/** Kangxi radical number → the ordinary CJK ideograph for that radical. */
function radicalGlyph(number) {
  return String.fromCodePoint(0x2eff + number).normalize("NFKC");
}

async function run() {
  const kanjidic = await loadKanjidic();
  console.log(`KANJIDIC2 ${kanjidic.version} (${kanjidic.dictDate}) — ${kanjidic.characters.length} characters`);

  const source = await readFile(DATA, "utf8");
  const entries = JSON.parse(source);

  const resolved = [];
  for (const entry of entries) {
    const record = kanjidic.characters.find((c) => c.literal === entry.char);
    if (!record) throw new Error(`${entry.char} is not in KANJIDIC2`);

    const classical = record.radicals.find((r) => r.type === "classical");
    if (!classical) throw new Error(`${entry.char} has no classical radical in KANJIDIC2`);

    const radical = { char: radicalGlyph(classical.value), number: classical.value };

    // Cross-check the stroke count we publish while we have the source open.
    const strokes = record.misc.strokeCounts[0];
    if (strokes !== entry.strokes) {
      console.warn(`  ! ${entry.char}: strokes ${entry.strokes} in data, ${strokes} in KANJIDIC2`);
    }

    resolved.push({ char: entry.char, radical });
  }

  const changed = resolved.filter(({ char, radical }) => {
    const current = entries.find((e) => e.char === char).radical;
    return current?.char !== radical.char || current?.number !== radical.number;
  });

  console.log(`\nRadicals: ${resolved.map((r) => r.char + "→" + r.radical.char + r.radical.number).join("  ")}`);

  if (changed.length === 0) {
    console.log("\ndata/kanji.json already carries these radicals.");
    return;
  }
  if (checkOnly) {
    console.error(`\n--check specified: ${changed.length} entries would change.`);
    process.exit(1);
  }

  // `radical` is inserted after `strokes` to keep the field order readable.
  for (const entry of entries) {
    const { radical } = resolved.find((r) => r.char === entry.char);
    const rebuilt = {};
    for (const [key, value] of Object.entries(entry)) {
      if (key === "radical") continue;
      rebuilt[key] = value;
      if (key === "strokes") rebuilt.radical = radical;
    }
    Object.assign(entry, {});
    entries[entries.indexOf(entry)] = rebuilt;
  }

  await writeFile(DATA, JSON.stringify(entries, null, 2) + "\n");
  console.log(`\nUpdated ${changed.length} entries in data/kanji.json.`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
