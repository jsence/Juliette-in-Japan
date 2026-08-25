import type { Metadata } from "next";

import { Mdx } from "@/components/Mdx";
import { ScrollReveal } from "@/components/ScrollReveal";
import { StubPage } from "@/components/StubPage";
import { getPost } from "@/lib/posts";
import { glass } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Seasons",
  description: "The traditional calendar, festivals and seasonal customs in Japan.",
};

export default function SeasonsPage() {
  const setsubun = getPost("culture", "setsubun");

  return (
    <StubPage
      title="Seasons"
      glyph="季"
      sectionHref="/culture"
      sectionLabel="Culture"
      intro={
        <p>
          How the Japanese year is organised around seasonal markers — many of which carry their
          own customs, foods and set phrases.
        </p>
      }
    >
      {setsubun ? (
        <ScrollReveal as="article" className={"rounded-xl p-6 " + glass}>
          <h2 className="font-serif text-xl font-semibold text-ink dark:text-paper-100">
            {setsubun.title}
          </h2>
          <div className="mt-4">
            <Mdx source={setsubun.content} />
          </div>
        </ScrollReveal>
      ) : undefined}
    </StubPage>
  );
}
