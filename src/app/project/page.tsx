import type { Metadata } from "next";

import { SectionIndex } from "@/components/SectionIndex";
import { getSection } from "@/lib/site";

export const metadata: Metadata = {
  title: "Project",
  description: "Why this site exists and how it is built.",
};

const section = getSection("project")!;

export default function ProjectPage() {
  return (
    <SectionIndex
      section={section}
      intro={
        <p>
          Background on this documentation project — the motivation behind it and the technical
          choices that shape how it is built and maintained.
        </p>
      }
    />
  );
}
