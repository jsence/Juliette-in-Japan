import { CharacterBrowser } from "@/components/character/CharacterBrowser";
import { KanjiCard } from "@/components/KanjiCard";
import { LanguageSubNav } from "@/components/LanguageSubNav";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { buildKanjiDetail } from "@/lib/characters";
import { kanji } from "@/lib/data";

/**
 * The kanji index. Shared by /language/kanji and /language/kanji/[char]; the
 * second passes `initialChar` so a direct link opens with that character's panel
 * showing over the grid.
 */
export function KanjiIndex({ initialChar }: { initialChar?: string }) {
  const details = kanji.map(buildKanjiDetail);

  return (
    <div className="space-y-8">
      <LanguageSubNav />
      <PageHeader
        title="Kanji"
        glyph="字"
        intro={
          <p>
            Each card shows the character, its meanings, readings and stroke count, plus two or
            three common words. Readings and stroke counts follow KANJIDIC2. This set is growing
            toward the community-estimated N5 scope of roughly 100&ndash;110 kanji.
          </p>
        }
      />

      <p className="text-sm text-ink-muted dark:text-paper-300">
        Select any character for its stroke order, radical and example words. Inside the panel, ←
        and → move between characters.
      </p>

      <CharacterBrowser
        kind="kanji"
        basePath="/language/kanji"
        details={details}
        initialChar={initialChar}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {kanji.map((k, i) => (
            <ScrollReveal key={k.char} index={i}>
              <KanjiCard kanji={k} />
            </ScrollReveal>
          ))}
        </div>
      </CharacterBrowser>
    </div>
  );
}
