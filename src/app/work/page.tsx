import type { Metadata } from "next";

import { SectionIndex } from "@/components/SectionIndex";
import { getSection } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "How Japanese workplaces operate, from hierarchy and meetings to keigo and communication norms.",
};

const section = getSection("work")!;

export default function WorkPage() {
  return (
    <SectionIndex
      section={section}
      intro={
        <p>
          Notes on working life in Japan: organisational hierarchy, meeting culture, business{" "}
          <span className="font-jp">keigo</span> and the unwritten rules of professional
          communication.
        </p>
      }
    />
  );
}
