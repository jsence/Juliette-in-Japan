import { getProgressStats } from "@/lib/progress";
import { ScrollReveal } from "./ScrollReveal";

/** The three headline progress counters shown on the home page. */
export function ProgressCounters() {
  const stats = getProgressStats();
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat, i) => (
        <ScrollReveal
          key={stat.label}
          index={i}
          className="rounded-xl border border-paper-300 bg-paper-50 p-5 text-center shadow-sm dark:border-sumi-border dark:bg-sumi-light"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-ink-muted dark:text-paper-300">
            {stat.label}
          </p>
          <p className="mt-1 font-serif text-3xl font-bold text-hanko dark:text-hanko-light">
            {stat.value}
          </p>
          <p className="mt-1 text-xs text-ink-muted dark:text-paper-300">{stat.detail}</p>
        </ScrollReveal>
      ))}
    </div>
  );
}
