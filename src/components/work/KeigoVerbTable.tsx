import type { KeigoVerbRow } from "@/types/work";
import { RubyLine } from "./RubyLine";

function VerbCell({ cell }: { cell: KeigoVerbRow["plain"] }) {
  return (
    <RubyLine text={cell.text} ruby={cell.ruby} className="font-jp text-base text-ink dark:text-paper-100" />
  );
}

interface KeigoVerbTableProps {
  rows: KeigoVerbRow[];
}

export function KeigoVerbTable({ rows }: KeigoVerbTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-paper-300 dark:border-sumi-border">
      <table className="w-full min-w-[42rem] text-left text-sm">
        <thead className="border-b border-paper-300 bg-paper-100 text-xs dark:border-sumi-border dark:bg-sumi">
          <tr className="text-ink-muted dark:text-paper-300">
            <th className="px-2 py-2 font-semibold">Verb</th>
            <th className="px-2 py-2 font-semibold">Plain</th>
            <th className="px-2 py-2 font-semibold">
              <RubyLine text="丁寧語" ruby={[{ text: "丁寧", reading: "ていねい" }]} className="font-jp text-xs" />
            </th>
            <th className="px-2 py-2 font-semibold">
              <span className="block font-sans text-[10px] font-normal normal-case text-ink-muted dark:text-paper-400">
                Their action
              </span>
              <RubyLine text="尊敬語" ruby={[{ text: "尊敬", reading: "そんけい" }]} className="font-jp text-xs" />
            </th>
            <th className="px-2 py-2 font-semibold">
              <span className="block font-sans text-[10px] font-normal normal-case text-ink-muted dark:text-paper-400">
                My action
              </span>
              <RubyLine text="謙譲語" ruby={[{ text: "謙譲", reading: "けんじょう" }]} className="font-jp text-xs" />
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-paper-200 dark:divide-sumi-border">
          {rows.map((row) => (
            <tr key={row.id} className="bg-paper-50 dark:bg-sumi-light">
              <td className="px-2 py-2 align-top font-medium">
                <RubyLine
                  text={row.label}
                  ruby={row.labelRuby}
                  className="font-jp text-base text-hanko dark:text-hanko-light"
                />
              </td>
              <td className="px-2 py-2 align-top">
                <VerbCell cell={row.plain} />
              </td>
              <td className="px-2 py-2 align-top">
                <VerbCell cell={row.teineigo} />
              </td>
              <td className="px-2 py-2 align-top">
                <VerbCell cell={row.sonkeigo} />
              </td>
              <td className="px-2 py-2 align-top">
                <VerbCell cell={row.kenjougo} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
