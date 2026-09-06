import type { Kana } from "@/types/content";
import { characterHref } from "@/lib/characterPaths";
import { glass } from "@/lib/ui";

interface KanaTableGroup {
  group: string;
  label: string;
  items: Kana[];
}

interface KanaTableProps {
  groups: KanaTableGroup[];
}

/**
 * Grouped kana as labelled rows of cards, with reading and stroke count.
 *
 * Each card links to the character's own page. Inside a CharacterBrowser a plain
 * click opens the detail panel instead of navigating.
 *
 * These are plain anchors rather than next/link on purpose: a table of 208 cards
 * would have Next prefetch 208 route payloads as the reader scrolls, and the
 * click is intercepted anyway.
 */
export function KanaTable({ groups }: KanaTableProps) {
  return (
    <div className="space-y-6">
      {groups.map((row) => (
        <section key={row.group} aria-label={row.label}>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-hanko dark:text-hanko-light">
            {row.label}
          </h3>
          <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {row.items.map((k) => (
              <li key={`${k.script}-${k.char}`}>
                <a
                  href={characterHref("kana", k.char)}
                  data-char={k.char}
                  className={
                    "group flex h-full flex-col items-center rounded-lg p-3 text-center transition duration-200 hover:-translate-y-0.5 hover:border-hanko/40 hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hanko dark:hover:bg-white/10 " +
                    glass
                  }
                >
                  <span
                    lang="ja"
                    className="font-jp text-3xl leading-none text-ink transition group-hover:text-hanko dark:text-paper-100 dark:group-hover:text-hanko-light"
                  >
                    {k.char}
                  </span>
                  <span className="mt-1 text-sm text-ink-light dark:text-paper-200">{k.romaji}</span>
                  <span className="mt-0.5 text-[0.65rem] text-ink-muted dark:text-paper-300">
                    {k.strokes} {k.strokes === 1 ? "stroke" : "strokes"}
                  </span>
                  {k.note && (
                    <span className="mt-1 text-[0.6rem] leading-tight text-ink-muted dark:text-paper-300">
                      {k.note}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
