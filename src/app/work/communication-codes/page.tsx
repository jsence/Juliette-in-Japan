import type { Metadata } from "next";

import { Mdx } from "@/components/Mdx";
import { ScrollReveal } from "@/components/ScrollReveal";
import { StubPage } from "@/components/StubPage";
import { getPost } from "@/lib/posts";
import { glass } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Communication codes",
  description: "Indirect speech, reading between the lines and written norms in Japanese workplaces.",
};

export default function CommunicationCodesPage() {
  const jobPosting = getPost("work", "reading-a-job-posting");

  return (
    <StubPage
      title="Communication codes"
      glyph="伝"
      sectionHref="/work"
      sectionLabel="Work"
      intro={
        <p>
          The unwritten rules of professional communication — indirect refusals,{" "}
          <span className="font-jp">空気</span> (reading the room) and what job postings actually
          mean.
        </p>
      }
    >
      {jobPosting ? (
        <ScrollReveal as="article" className={"rounded-xl p-6 " + glass}>
          <h2 className="font-serif text-xl font-semibold text-ink dark:text-paper-100">
            {jobPosting.title}
          </h2>
          <div className="mt-4">
            <Mdx source={jobPosting.content} />
          </div>
        </ScrollReveal>
      ) : undefined}
    </StubPage>
  );
}
