import type { Metadata } from "next";

import { PageHeader } from "@/components/PageHeader";
import { ResourceLink } from "@/components/ResourceLink";
import { ScrollReveal } from "@/components/ScrollReveal";
import { LanguageSubNav } from "@/components/LanguageSubNav";
import { resources } from "@/lib/data";

export const metadata: Metadata = {
  title: "Resources",
  description: "Curated textbooks, apps and reference sites for N5-level Japanese study.",
};

export default function ResourcesPage() {
  return (
    <div className="space-y-10">
      <LanguageSubNav />
      <PageHeader
        title="Resources"
        glyph="資"
        intro={
          <p>
            Established, widely used resources for studying at the N5 level. These are external
            tools and references — the study material on this site is built from open data files
            and is not affiliated with any of them.
          </p>
        }
      />

      <section className="space-y-4">
        <ScrollReveal>
          <h2 className="font-serif text-2xl font-semibold text-ink dark:text-paper-100">
            Recommended resources
          </h2>
        </ScrollReveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {resources.map((resource, i) => (
            <ScrollReveal key={resource.name} index={i}>
              <ResourceLink resource={resource} />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
