import type { WorkEmailExample } from "@/types/work";
import { RubyLine } from "./RubyLine";

interface KeigoEmailExampleProps {
  example: WorkEmailExample;
}

export function KeigoEmailExample({ example }: KeigoEmailExampleProps) {
  return (
    <section className="space-y-4" aria-labelledby="keigo-email-example">
      <h2 id="keigo-email-example" className="font-serif text-2xl font-semibold text-ink dark:text-paper-100">
        Annotated client email
      </h2>
      <p className="max-w-prose text-sm text-ink-light dark:text-paper-200">
        Fixed formulas in order — swap only the name and topic slots. Numbers match the callouts below.
      </p>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(14rem,18rem)]">
        <div className="rounded-xl border border-paper-300 bg-paper-50 p-5 font-mono text-sm shadow-sm dark:border-sumi-border dark:bg-sumi-light">
          <p className="text-xs font-sans text-ink-muted dark:text-paper-300">件名</p>
          <p className="mt-1 font-sans font-medium text-ink dark:text-paper-100">{example.subject}</p>
          <div className="mt-4 space-y-3 border-t border-paper-200 pt-4 dark:border-sumi-border">
            {example.bodyLines.map((line, i) => {
              if (!line.text) {
                return <div key={i} className="h-3" aria-hidden />;
              }
              return (
              <p key={i} className="flex flex-wrap items-start gap-2 font-sans text-ink dark:text-paper-100">
                {line.callout != null ? (
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hanko text-xs font-bold text-paper-50 dark:bg-hanko-light dark:text-sumi">
                    {line.callout}
                  </span>
                ) : (
                  <span className="w-6 shrink-0" aria-hidden />
                )}
                <RubyLine text={line.text} ruby={line.ruby} className="font-jp text-base leading-relaxed" />
              </p>
              );
            })}
          </div>
        </div>
        <ol className="space-y-3 text-sm">
          {example.callouts.map((c) => (
            <li
              key={c.id}
              className="rounded-lg border border-paper-300 bg-paper-100/80 p-3 dark:border-sumi-border dark:bg-sumi/80"
            >
              <span className="font-semibold text-hanko dark:text-hanko-light">{c.id}. </span>
              <span className="font-medium text-ink dark:text-paper-100">{c.title}</span>
              <p className="mt-1 text-ink-light dark:text-paper-200">{c.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
