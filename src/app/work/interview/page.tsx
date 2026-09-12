import type { Metadata } from "next";

import { WorkPageLayout } from "@/components/work/WorkPageLayout";
import { requireWorkPage } from "@/lib/work";

const SLUG = "interview";
const page = requireWorkPage(SLUG);

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function WorkInterviewPage() {
  return <WorkPageLayout page={page} />;
}
