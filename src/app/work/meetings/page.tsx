import type { Metadata } from "next";

import { SeatingDiagram } from "@/components/work/SeatingDiagram";
import { WorkPageLayout } from "@/components/work/WorkPageLayout";
import { requireWorkPage } from "@/lib/work";

const SLUG = "meetings";
const page = requireWorkPage(SLUG);

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function WorkMeetingsPage() {
  return (
    <WorkPageLayout
      page={page}
      extra={
        <section className="space-y-3">
          <SeatingDiagram />
        </section>
      }
    />
  );
}
