import { HomeHero } from "@/components/home/HomeHero";
import { HomeSectionGrid } from "@/components/home/HomeSectionGrid";
import { HomeStudyStrip } from "@/components/home/HomeStudyStrip";
import { LatestAdditions } from "@/components/home/LatestAdditions";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getLatestPages } from "@/lib/latestPages";
import { kana, kanji, vocabulary, grammar } from "@/lib/data";
import { sections } from "@/lib/site";

export default function HomePage() {
  const latest = getLatestPages(3);

  return (
    <div className="-mt-10 space-y-28 pb-8 pt-0">
      <HomeHero />

      <section aria-labelledby="inside-heading" className="scroll-mt-24 space-y-8">
        <ScrollReveal>
          <h2
            id="inside-heading"
            className="font-serif text-2xl font-semibold text-ink dark:text-paper-100 sm:text-3xl"
          >
            What&apos;s inside
          </h2>
        </ScrollReveal>
        <HomeSectionGrid sections={sections} />
      </section>

      <HomeStudyStrip
        totals={{
          kana: kana.length,
          kanji: kanji.length,
          grammar: grammar.length,
          vocabulary: vocabulary.length,
        }}
      />

      <LatestAdditions pages={latest} />
    </div>
  );
}
