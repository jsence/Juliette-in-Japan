import type { WorkPageContent } from "@/types/work";
import { notFound } from "next/navigation";

import { colleaguesPage } from "./colleagues";
import { firstDaysPage } from "./first-days";
import { interviewPage } from "./interview";
import { keigoPage } from "./keigo";
import { meetingsPage } from "./meetings";
import { socialPage } from "./social";
import { unwrittenRulesPage } from "./unwritten-rules";

const pages: Record<string, WorkPageContent> = {
  "first-days": firstDaysPage,
  colleagues: colleaguesPage,
  keigo: keigoPage,
  meetings: meetingsPage,
  "unwritten-rules": unwrittenRulesPage,
  social: socialPage,
  interview: interviewPage,
};

export function getWorkPage(slug: string): WorkPageContent | undefined {
  return pages[slug];
}

export function requireWorkPage(slug: string): WorkPageContent {
  const page = pages[slug];
  if (!page) notFound();
  return page;
}

export const workPageList: WorkPageContent[] = [
  firstDaysPage,
  colleaguesPage,
  keigoPage,
  meetingsPage,
  unwrittenRulesPage,
  socialPage,
  interviewPage,
];
