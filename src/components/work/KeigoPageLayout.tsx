import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import type { WorkPageContent } from "@/types/work";
import { DoDont } from "./DoDont";
import { KeigoEmailExample } from "./KeigoEmailExample";
import { KeigoVerbTable } from "./KeigoVerbTable";
import { RegisterLegend } from "./RegisterTag";
import { WorkPhraseTable } from "./WorkPhraseTable";
import { WorkSubNav } from "./WorkSubNav";
import { WorkTldr } from "./WorkTldr";

interface KeigoPageLayoutProps {
  page: WorkPageContent;
}

export function KeigoPageLayout({ page }: KeigoPageLayoutProps) {
  const keigo = page.keigo;
  if (!keigo) {
    throw new Error("Keigo page requires keigo.verbRows and keigo.emailExample");
  }

  return (
    <div className="space-y-10">
      <WorkSubNav />
      <PageHeader
        title={page.title}
        glyph={page.glyph}
        intro={
          <div className="space-y-2">
            {page.introLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        }
      />

      <ScrollReveal>
        <WorkTldr items={page.tldr} />
      </ScrollReveal>

      <RegisterLegend />

      <ScrollReveal>
        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-semibold text-ink dark:text-paper-100">
            Verb forms at a glance
          </h2>
          <p className="max-w-prose text-sm text-ink-light dark:text-paper-200">
            Pick the column that matches who is acting. Respectful forms lift the other person; humble forms
            lower your side.
          </p>
          <KeigoVerbTable rows={keigo.verbRows} />
        </section>
      </ScrollReveal>

      {page.phraseSections?.map((section, si) => (
        <section key={section.title} className="space-y-4">
          <ScrollReveal index={si}>
            <h2 className="font-serif text-2xl font-semibold text-ink dark:text-paper-100">
              {section.title}
            </h2>
          </ScrollReveal>
          <WorkPhraseTable phrases={section.phrases} />
        </section>
      ))}

      <ScrollReveal>
        <KeigoEmailExample example={keigo.emailExample} />
      </ScrollReveal>

      <ScrollReveal>
        <DoDont block={page.doDont} />
      </ScrollReveal>

      <ScrollReveal>
        <aside className="rounded-lg border border-paper-300 bg-paper-100 p-5 text-sm dark:border-sumi-border dark:bg-sumi-light">
          <h2 className="font-serif text-lg font-semibold text-ink dark:text-paper-100">Sources</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-ink-light dark:text-paper-200">
            {page.sources.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </aside>
      </ScrollReveal>
    </div>
  );
}
