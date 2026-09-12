import type { WorkPhrase } from "@/types/work";
import { audienceForTable, RegisterTag } from "./RegisterTag";
import { RubyLine } from "./RubyLine";

interface WorkPhraseTableProps {
  phrases: WorkPhrase[];
}

export function WorkPhraseTable({ phrases }: WorkPhraseTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-paper-300 dark:border-sumi-border">
      <table className="w-full min-w-[36rem] text-left text-sm">
        <thead className="border-b border-paper-300 bg-paper-100 text-xs uppercase tracking-wide text-ink-muted dark:border-sumi-border dark:bg-sumi dark:text-paper-300">
          <tr>
            <th className="px-3 py-2 font-semibold">Japanese</th>
            <th className="px-3 py-2 font-semibold">Romaji</th>
            <th className="px-3 py-2 font-semibold">English</th>
            <th className="px-3 py-2 font-semibold">Register</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-paper-200 dark:divide-sumi-border">
          {phrases.map((phrase) => (
            <tr key={phrase.id} className="bg-paper-50 dark:bg-sumi-light">
              <td className="px-3 py-3 align-top">
                <RubyLine
                  text={phrase.japanese}
                  ruby={phrase.ruby}
                  className="font-jp text-lg leading-relaxed text-ink dark:text-paper-100"
                />
                <p className="mt-2 text-xs text-ink-muted dark:text-paper-300">{phrase.usage}</p>
              </td>
              <td className="px-3 py-3 align-top font-mono text-xs text-ink-muted dark:text-paper-300">
                {phrase.romaji}
              </td>
              <td className="px-3 py-3 align-top text-ink-light dark:text-paper-200">{phrase.english}</td>
              <td className="px-3 py-3 align-top">
                <RegisterTag register={phrase.register} />
                <p className="mt-2 text-xs text-ink-muted dark:text-paper-300">
                  {audienceForTable(phrase.register)}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
