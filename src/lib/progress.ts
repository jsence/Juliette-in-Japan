import { site } from "./site";
import { kanji } from "./data";

/** Whole days elapsed between an ISO date and now (never negative). */
export function daysSince(isoDate: string, now: Date = new Date()): number {
  const start = new Date(isoDate + "T00:00:00");
  const ms = now.getTime() - start.getTime();
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
}

/** Whole days between now and a future ISO date (never negative). */
export function daysUntil(isoDate: string, now: Date = new Date()): number {
  const target = new Date(isoDate + "T00:00:00");
  const ms = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

export interface ProgressStat {
  label: string;
  value: string;
  detail: string;
}

/**
 * Live progress figures for the home page counters.
 * Kanji learned is derived from the data file so it can never drift from reality.
 */
export function getProgressStats(now: Date = new Date()): ProgressStat[] {
  const days = daysSince(site.studyStartDate, now);
  const daysToExam = daysUntil(site.jlptTarget.date, now);
  return [
    {
      label: "Days studying",
      value: days.toLocaleString("en-US"),
      detail: `since ${formatDate(site.studyStartDate)}`,
    },
    {
      label: "Kanji learned",
      value: kanji.length.toLocaleString("en-US"),
      detail: "tracked in the N5 kanji hub",
    },
    {
      label: `JLPT ${site.jlptTarget.level}`,
      value: `${daysToExam.toLocaleString("en-US")} days`,
      detail: `target ${formatDate(site.jlptTarget.date)}`,
    },
  ];
}

/** Format an ISO date as e.g. "6 January 2026" in English. */
export function formatDate(isoDate: string): string {
  const d = new Date(isoDate + "T00:00:00");
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
