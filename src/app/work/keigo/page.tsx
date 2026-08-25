import type { Metadata } from "next";

import { StubPage } from "@/components/StubPage";

export const metadata: Metadata = {
  title: "Keigo",
  description: "Polite, humble and respectful language in professional settings in Japan.",
};

export default function KeigoPage() {
  return (
    <StubPage
      title="Keigo"
      glyph="敬"
      sectionHref="/work"
      sectionLabel="Work"
      intro={
        <p>
          An introduction to <span className="font-jp">keigo</span> (敬語) — the three registers of
          polite, humble and respectful language used in business and formal settings.
        </p>
      }
    />
  );
}
