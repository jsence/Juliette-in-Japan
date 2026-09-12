import type { WorkTermRow } from "@/types/work";
import { RubyLine } from "./RubyLine";

interface WorkTermTableProps {
  rows: WorkTermRow[];
  caption?: string;
}

/** Front-loaded Japanese term rows — never buried in English prose. */
export function WorkTermTable({ rows, caption }: WorkTermTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-paper-300 dark:border-sumi-border">
      <table className="w-full min-w-[28rem] text-left text-sm">
        {caption ? (
          <caption className="caption-bottom px-4 py-2 text-left text-xs text-ink-muted dark:text-paper-300">
            {caption}
          </caption>
        ) : null}
        <thead className="border-b border-paper-300 bg-paper-100 text-xs uppercase tracking-wide text-ink-muted dark:border-sumi-border dark:bg-sumi dark:text-paper-300">
          <tr>
            <th className="px-3 py-2 font-semibold">Japanese</th>
            <th className="px-3 py-2 font-semibold">Romaji</th>
            <th className="px-3 py-2 font-semibold">Meaning</th>
            <th className="hidden px-3 py-2 font-semibold md:table-cell">Usage</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-paper-200 dark:divide-sumi-border">
          {rows.map((row) => (
            <tr key={row.id} className="bg-paper-50 dark:bg-sumi-light">
              <td className="px-3 py-3 align-top">
                <RubyLine text={row.japanese} ruby={row.ruby} className="font-jp text-xl text-ink dark:text-paper-100" />
              </td>
              <td className="px-3 py-3 align-top font-mono text-xs text-ink-muted dark:text-paper-300">
                {row.romaji}
              </td>
              <td className="px-3 py-3 align-top text-ink-light dark:text-paper-200">{row.meaning}</td>
              <td className="hidden px-3 py-3 align-top text-xs text-ink-muted dark:text-paper-300 md:table-cell">
                {row.usage ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
