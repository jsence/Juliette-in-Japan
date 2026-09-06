/**
 * Build data/example-words.json: a few verified example words for every kana and
 * kanji the site teaches, keyed by character.
 *
 *   node scripts/build-example-words.mjs
 *
 * Words come only from JMdict (via the jmdict-simplified JSON distribution,
 * common-words edition). Nothing is generated: if no suitable common word
 * contains a character, that character gets an empty list and the UI shows an
 * empty state.
 *
 * The download is cached in .cache/ so re-runs are fast. The output is committed
 * so builds never depend on the network.
 */
import { mkdir, readdir, readFile, writeFile, stat } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { execFile } from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";

import { romajiFromKana } from "./lib/romaji.mjs";
import kana from "../data/kana.json" with { type: "json" };
import kanjiData from "../data/kanji.json" with { type: "json" };
import vocabulary from "../data/vocabulary.json" with { type: "json" };

const CACHE = path.join(process.cwd(), ".cache");
const OUT = path.join(process.cwd(), "data", "example-words.json");
const REPO = "scriptin/jmdict-simplified";
const MAX_WORDS = 5;

/** Kanji spellings flagged as irregular, rare, phonetic-only or search-only. */
const EXCLUDED_KANJI_TAGS = new Set(["iK", "io", "oK", "rK", "sK", "ateji"]);

/**
 * Kana readings flagged as irregular, outdated, rare or search-only. `gikun` is
 * deliberately allowed: it marks a jukujikun such as きょう for 今日, which is
 * the everyday reading, and excluding it leaves the rare こんにち instead.
 */
const EXCLUDED_KANA_TAGS = new Set(["ik", "ok", "rk", "sk"]);

/**
 * Parts of speech that make a poor headword example — particles, auxiliaries and
 * affixes only make sense inside a larger phrase. They are ranked last rather
 * than dropped, so a rare character can still show something.
 */
const WEAK_POS = new Set(["aux", "aux-v", "aux-adj", "prt", "suf", "pref", "n-pref", "n-suf", "cop", "unc"]);

/** Senses we never want to teach from. */
const EXCLUDED_MISC = new Set([
  "arch", "obs", "rare", "dated", "hist", "vulg", "derog", "sens",
  "sl", "net-sl", "joc", "poet", "person", "place", "quote", "proverb",
]);

async function exists(file) {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
}

/** Download and unpack the common-words English JMdict release, with caching. */
async function loadJmdict() {
  await mkdir(CACHE, { recursive: true });
  const marker = path.join(CACHE, "jmdict-eng-common.json");
  if (await exists(marker)) {
    console.log("Using cached JMdict from .cache/");
    return JSON.parse(await readFile(marker, "utf8"));
  }

  const release = await (await fetch(`https://api.github.com/repos/${REPO}/releases/latest`)).json();
  const asset = release.assets.find((a) => /^jmdict-eng-common-.*\.json\.tgz$/.test(a.name));
  if (!asset) throw new Error("no jmdict-eng-common asset in the latest release");

  console.log(`Downloading ${asset.name}…`);
  const res = await fetch(asset.browser_download_url);
  if (!res.ok) throw new Error(`HTTP ${res.status} downloading ${asset.name}`);

  const tgz = path.join(CACHE, asset.name);
  await pipeline(res.body, createWriteStream(tgz));
  // The archive holds a single JSON file; unpack it with tar rather than adding
  // an npm dependency just for this script.
  await promisify(execFile)("tar", ["xzf", tgz, "-C", CACHE]);

  const unpacked = (await readdir(CACHE)).find((f) => /^jmdict-eng-common-.*\.json$/.test(f));
  if (!unpacked) throw new Error("could not find the unpacked JMdict JSON");
  const json = await readFile(path.join(CACHE, unpacked), "utf8");
  await writeFile(marker, json);
  return JSON.parse(json);
}

/**
 * Reduce a JMdict entry to the single written form, reading, romaji and meaning
 * we want to show, or null when the entry is unusable.
 */
function toCandidate(entry) {
  const senses = entry.sense.filter(
    (s) => !s.misc.some((m) => EXCLUDED_MISC.has(m)) && s.gloss.some((g) => g.lang === "eng")
  );
  if (senses.length === 0) return null;

  // Multi-word expressions are phrases, not example words, and romanising them
  // would need word boundaries the data does not carry.
  if (senses[0].partOfSpeech.includes("exp")) return null;

  // を/ヲ only ever appears as the object particle, pronounced "o" rather than
  // "wo". Rather than print a misleading reading, skip such entries — which
  // leaves を itself with an empty state, the honest result for a particle.
  if (/[をヲ]/.test(entry.kana[0]?.text ?? "")) return null;

  const usable = (forms, excluded) =>
    forms.filter((f) => f.common && !f.tags.some((t) => excluded.has(t)));
  const kanjiForms = usable(entry.kanji, EXCLUDED_KANJI_TAGS);
  const kanaForms = usable(entry.kana, EXCLUDED_KANA_TAGS);
  if (kanaForms.length === 0) return null;

  const usuallyKana = senses[0].misc.includes("uk");
  const useKanji = kanjiForms.length > 0 && !usuallyKana;
  const word = useKanji ? kanjiForms[0].text : kanaForms[0].text;

  // Pick a reading that actually applies to the written form we chose.
  const reading = useKanji
    ? (kanaForms.find((k) => k.appliesToKanji.includes("*") || k.appliesToKanji.includes(word)) ?? kanaForms[0]).text
    : word;

  const romaji = romajiFromKana(reading);
  if (!romaji) return null;

  const meaning = senses[0].gloss
    .filter((g) => g.lang === "eng")
    .slice(0, 2)
    .map((g) => g.text)
    .join(", ");
  if (!meaning) return null;

  const weakPos = senses[0].partOfSpeech.every((p) => WEAK_POS.has(p)) ? 1 : 0;

  return { id: entry.id, word, reading, romaji, meaning, weakPos };
}

async function run() {
  const jmdict = await loadJmdict();
  console.log(`JMdict ${jmdict.version} (${jmdict.dictDate}) — ${jmdict.words.length} common entries`);

  const candidates = jmdict.words.map(toCandidate).filter(Boolean);
  console.log(`${candidates.length} usable candidate words`);

  // Words the site already teaches are the best examples, so they rank first.
  const curated = new Set([
    ...vocabulary.map((v) => v.word),
    ...kanjiData.flatMap((k) => k.words.map((w) => w.word)),
  ]);

  const targets = [...kana.map((k) => k.char), ...kanjiData.map((k) => k.char)];
  const result = {};
  let empty = 0;

  for (const char of targets) {
    const isKanji = !/[\u3040-\u30ff]/.test(char);
    const matches = [];

    for (const c of candidates) {
      // A kana example is only useful if it shows more than the character itself.
      if (!isKanji && [...c.word].length < 2) continue;

      const inWord = c.word.includes(char);
      // Falling back to the reading still shows the character, because the word
      // is rendered with furigana above it.
      const inReading = !inWord && c.reading.includes(char);
      if (!inWord && !inReading) continue;

      matches.push({
        ...c,
        tier: inWord ? 0 : 1,
        curated: curated.has(c.word) ? 0 : 1,
        length: [...c.word].length,
      });
    }

    matches.sort(
      (a, b) =>
        a.tier - b.tier ||
        a.weakPos - b.weakPos ||
        a.curated - b.curated ||
        a.length - b.length ||
        Number(a.id) - Number(b.id)
    );

    const seen = new Set();
    const picked = [];
    for (const m of matches) {
      if (seen.has(m.word)) continue;
      seen.add(m.word);
      picked.push({ word: m.word, reading: m.reading, romaji: m.romaji, meaning: m.meaning });
      if (picked.length === MAX_WORDS) break;
    }

    result[char] = picked;
    if (picked.length === 0) empty++;
  }

  await writeFile(OUT, JSON.stringify(result, null, 2) + "\n");

  const counts = Object.values(result).map((v) => v.length);
  console.log(`\nWrote ${Object.keys(result).length} characters to data/example-words.json`);
  console.log(`  with ${MAX_WORDS} words: ${counts.filter((n) => n === MAX_WORDS).length}`);
  console.log(`  with 1–4 words:  ${counts.filter((n) => n > 0 && n < MAX_WORDS).length}`);
  console.log(`  with none:       ${empty}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
