import type { Kana } from "@/types/content";

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
                className="flex flex-col items-center rounded-lg border border-paper-300 bg-paper-50 p-3 text-center shadow-sm dark:border-sumi-border dark:bg-sumi-light"
              >
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
