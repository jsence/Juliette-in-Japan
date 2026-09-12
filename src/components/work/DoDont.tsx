import type { WorkDoDont } from "@/types/work";

interface DoDontProps {
  block: WorkDoDont;
}

/** Contrasting Do / Don't columns in glass-style cards. */
export function DoDont({ block }: DoDontProps) {
  return (
    <section aria-labelledby="work-dodont-heading" className="space-y-3">
      <h2 id="work-dodont-heading" className="font-serif text-2xl font-semibold text-ink dark:text-paper-100">
        Do / Don&apos;t
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-hanko/25 bg-paper-50/85 p-5 shadow-sm backdrop-blur-sm dark:border-hanko-light/30 dark:bg-sumi-light/85">
          <h3 className="font-serif text-lg font-semibold text-hanko dark:text-hanko-light">Do</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-ink-light dark:text-paper-200">
            {block.do.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-ink/15 bg-paper-100/80 p-5 shadow-sm backdrop-blur-sm dark:border-paper-100/15 dark:bg-sumi/80">
          <h3 className="font-serif text-lg font-semibold text-ink dark:text-paper-100">Don&apos;t</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-ink-light dark:text-paper-200">
            {block.dont.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
