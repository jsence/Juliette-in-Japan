/**
 * Hepburn transliteration of a kana reading.
 *
 * The mapping stays 1:1 with the kana so the output always tells the reader
 * exactly which characters are in the word — which is the point on a site whose
 * job is teaching kana. Two consequences worth knowing:
 *
 *  - The katakana long mark ー becomes a macron (コーヒー → kōhī), because it
 *    unambiguously lengthens the previous vowel.
 *  - Hiragana vowel sequences are written out literally (とうきょう → toukyou,
 *    おもう → omou). Japanese orthography does not say whether おう is a long ō
 *    or a genuine o + u, and guessing would produce wrong readings for verbs
 *    such as 思う.
 */

const BASE = {
  あ: "a", い: "i", う: "u", え: "e", お: "o",
  か: "ka", き: "ki", く: "ku", け: "ke", こ: "ko",
  が: "ga", ぎ: "gi", ぐ: "gu", げ: "ge", ご: "go",
  さ: "sa", し: "shi", す: "su", せ: "se", そ: "so",
  ざ: "za", じ: "ji", ず: "zu", ぜ: "ze", ぞ: "zo",
  た: "ta", ち: "chi", つ: "tsu", て: "te", と: "to",
  だ: "da", ぢ: "ji", づ: "zu", で: "de", ど: "do",
  な: "na", に: "ni", ぬ: "nu", ね: "ne", の: "no",
  は: "ha", ひ: "hi", ふ: "fu", へ: "he", ほ: "ho",
  ば: "ba", び: "bi", ぶ: "bu", べ: "be", ぼ: "bo",
  ぱ: "pa", ぴ: "pi", ぷ: "pu", ぺ: "pe", ぽ: "po",
  ま: "ma", み: "mi", む: "mu", め: "me", も: "mo",
  や: "ya", ゆ: "yu", よ: "yo",
  ら: "ra", り: "ri", る: "ru", れ: "re", ろ: "ro",
  わ: "wa", ゐ: "wi", ゑ: "we", を: "wo",
  ん: "n",
  ゔ: "vu",
};

/** Small kana that combine with the preceding character. */
const SMALL_VOWEL = { ゃ: "ya", ゅ: "yu", ょ: "yo", ぁ: "a", ぃ: "i", ぅ: "u", ぇ: "e", ぉ: "o", ゎ: "wa" };

const VOWELS = new Set(["a", "i", "u", "e", "o"]);
const MACRON = { a: "ā", i: "ī", u: "ū", e: "ē", o: "ō" };

/** Katakana share the hiragana table once shifted down into the hiragana block. */
function toHiragana(text) {
  return text.replace(/[\u30A1-\u30F6]/g, (c) => String.fromCodePoint(c.codePointAt(0) - 0x60));
}

/** Merge a base syllable with a following small kana, e.g. き + ゃ → kya. */
function combine(base, small) {
  const glide = SMALL_VOWEL[small];
  if (!glide) return null;
  const vowel = glide.at(-1);

  // sha / cha / ja keep their digraph and simply take the new vowel.
  if (/(sh|ch|j)i$/.test(base)) return base.slice(0, -1) + vowel;

  // ki → kya: an i-column syllable turns into a y-glide.
  if (glide.startsWith("y") && base.endsWith("i")) return base.slice(0, -1) + glide;

  // Loanword clusters such as ファ (fu + ぁ) or ティ (te + ぃ).
  return base.slice(0, -1) + vowel;
}

/**
 * Convert a kana reading to Hepburn romaji. Returns null when the input holds
 * anything that is not kana, so callers can skip rather than emit a guess.
 */
export function romajiFromKana(reading) {
  const chars = [...toHiragana(reading)];
  const out = [];
  let geminate = false;

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];

    if (char === "っ") {
      geminate = true;
      continue;
    }

    // ー lengthens whatever vowel the previous syllable ended on.
    if (char === "ー") {
      const previous = out.at(-1);
      const vowel = previous?.at(-1);
      if (previous && vowel && VOWELS.has(vowel)) out[out.length - 1] = previous.slice(0, -1) + MACRON[vowel];
      continue;
    }

    let syllable = BASE[char];
    if (!syllable) return null;

    const merged = combine(syllable, chars[i + 1]);
    if (merged) {
      syllable = merged;
      i++;
    }

    if (geminate) {
      // Hepburn writes っち as tch, otherwise the consonant simply doubles.
      syllable = syllable.startsWith("ch") ? "t" + syllable : syllable[0] + syllable;
      geminate = false;
    }

    // n before a vowel or y needs an apostrophe: しんいち → shin'ichi.
    if (out.at(-1) === "n" && (VOWELS.has(syllable[0]) || syllable[0] === "y")) {
      out[out.length - 1] = "n'";
    }

    out.push(syllable);
  }

  // A trailing っ has no consonant to double; treat it as a glottal stop.
  return geminate ? out.join("") + "-" : out.join("");
}
