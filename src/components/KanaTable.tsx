import type { Kana } from "@/types/content";
import { LearnedToggle } from "./LearnedToggle";
import { glass } from "@/lib/ui";

interface KanaTableGroup {
  group: string;
  label: string;
  items: Kana[];
}

interface KanaTableProps {
  groups: KanaTableGroup[];
}

/** Renders grouped kana as labelled rows of cards, with reading and strokes. */
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
              <li
                key={`${k.script}-${k.char}`}
                className={"relative flex flex-col items-center rounded-lg p-3 text-center " + glass}
              >
                <div className="absolute right-1.5 top-1.5">
                  <LearnedToggle
                    module="kana"
                    itemId={`${k.script}:${k.char}`}
                    label={`${k.script} ${k.char}`}
                    variant="dot"
                  />
                </div>
                <span className="font-jp text-3xl leading-none text-ink dark:text-paper-100">
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
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
