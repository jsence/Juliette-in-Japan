import type { Metadata } from "next";

import { PageHeader } from "@/components/PageHeader";
import { KanaExplorer } from "@/components/KanaExplorer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { LanguageSubNav } from "@/components/LanguageSubNav";
import { getKanaByScript } from "@/lib/data";
import { glass } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Kana — hiragana & katakana",
  description:
    "The two N5 syllabaries: hiragana and katakana, with stroke counts, dakuten/handakuten, yōon, sokuon and long vowels.",
};

export default function KanaPage() {
  const hiragana = getKanaByScript("hiragana");
  const katakana = getKanaByScript("katakana");

  return (
    <div className="space-y-10">
      <LanguageSubNav />
      <PageHeader
        title="Kana"
        glyph="か"
        intro={
          <p>
            Japanese has two syllabaries. <strong>Hiragana</strong> (ひらがな) writes native words
            and grammar; <strong>katakana</strong> (カタカナ) writes loanwords, names and emphasis.
            Both encode the same set of sounds. Learn to read these fluently before anything else —
            everything downstream assumes it.
          </p>
        }
      />

      <ScrollReveal as="section" className="grid gap-4 sm:grid-cols-2">
        <div className={"rounded-lg p-4 " + glass}>
          <h2 className="font-serif text-lg font-semibold text-ink dark:text-paper-100">
            On stroke order
          </h2>
          <p className="mt-1 text-sm text-ink-light dark:text-paper-200">
            The stroke counts below follow standard handwriting forms. The general rules: write
            top-to-bottom and left-to-right, horizontal strokes before vertical ones that cross
            them, and enclosing shapes before what they contain. Correct order makes your writing
            legible and — later — makes kanji far easier.
          </p>
        </div>
        <div className={"rounded-lg p-4 " + glass}>
          <h2 className="font-serif text-lg font-semibold text-ink dark:text-paper-100">
            How this table is grouped
          </h2>
          <p className="mt-1 text-sm text-ink-light dark:text-paper-200">
            Rows follow the traditional <span className="font-jp">gojūon</span> ordering (a-i-u-e-o
            across the vowel columns), then the voiced and semi-voiced series, and finally the
            contracted <span className="font-jp">yōon</span> sounds. Switch scripts with the tabs.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal as="section">
        <KanaExplorer hiragana={hiragana} katakana={katakana} />
      </ScrollReveal>

      <ScrollReveal as="section" className="space-y-6">
        <h2 className="font-serif text-2xl font-semibold text-ink dark:text-paper-100">
          The modifications that trip everyone up
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className={"rounded-lg p-4 " + glass}>
            <h3 className="font-serif text-lg font-semibold text-ink dark:text-paper-100">
              Dakuten <span className="font-jp text-hanko dark:text-hanko-light">゛</span>
            </h3>
            <p className="mt-1 text-sm text-ink-light dark:text-paper-200">
              Two small strokes voice a consonant: <span className="font-jp">か</span> (ka) →{" "}
              <span className="font-jp">が</span> (ga), <span className="font-jp">さ</span> (sa) →{" "}
              <span className="font-jp">ざ</span> (za), <span className="font-jp">は</span> (ha) →{" "}
              <span className="font-jp">ば</span> (ba). The k/s/t/h rows gain g/z/d/b sounds.
            </p>
          </div>

          <div className={"rounded-lg p-4 " + glass}>
            <h3 className="font-serif text-lg font-semibold text-ink dark:text-paper-100">
              Handakuten <span className="font-jp text-hanko dark:text-hanko-light">゜</span>
            </h3>
            <p className="mt-1 text-sm text-ink-light dark:text-paper-200">
              A small circle turns the <span className="font-jp">は</span>-row into a p-sound:{" "}
              <span className="font-jp">は</span> (ha) → <span className="font-jp">ぱ</span> (pa),{" "}
              <span className="font-jp">ひ</span> (hi) → <span className="font-jp">ぴ</span> (pi).
              It applies only to that row.
            </p>
          </div>

          <div className={"rounded-lg p-4 " + glass}>
            <h3 className="font-serif text-lg font-semibold text-ink dark:text-paper-100">
              Yōon <span className="font-jp text-hanko dark:text-hanko-light">ゃゅょ</span>
            </h3>
            <p className="mt-1 text-sm text-ink-light dark:text-paper-200">
              A small <span className="font-jp">や</span>/<span className="font-jp">ゆ</span>/
              <span className="font-jp">よ</span> after an i-column kana forms a single contracted
              syllable: <span className="font-jp">き</span> + <span className="font-jp">ゃ</span> ={" "}
              <span className="font-jp">きゃ</span> (kya). Note it&apos;s one beat, not two.
            </p>
          </div>

          <div className={"rounded-lg p-4 " + glass}>
            <h3 className="font-serif text-lg font-semibold text-ink dark:text-paper-100">
              Sokuon <span className="font-jp text-hanko dark:text-hanko-light">っ</span>
            </h3>
            <p className="mt-1 text-sm text-ink-light dark:text-paper-200">
              A small <span className="font-jp">つ</span> doubles the following consonant and adds a
              short pause: <span className="font-jp">がっこう</span> (gakkō, &ldquo;school&rdquo;).
              In katakana it&apos;s a small <span className="font-jp">ッ</span>.
            </p>
          </div>

          <div className={"rounded-lg p-4 md:col-span-2 " + glass}>
            <h3 className="font-serif text-lg font-semibold text-ink dark:text-paper-100">
              Long vowels <span className="font-jp text-hanko dark:text-hanko-light">ー</span>
            </h3>
            <p className="mt-1 text-sm text-ink-light dark:text-paper-200">
              Vowels can be held for two beats. In hiragana this is written by adding a vowel kana
              (<span className="font-jp">おかあさん</span>, okāsan), and the o-sound long vowel is
              usually written with <span className="font-jp">う</span> (
              <span className="font-jp">とうきょう</span>, Tōkyō). In katakana a long vowel is marked
              with a bar: <span className="font-jp">コーヒー</span> (kōhī, &ldquo;coffee&rdquo;).
              Length changes meaning, so it matters.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
