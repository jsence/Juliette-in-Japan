import type { WorkPhrase } from "@/types/work";
import { RubyLine } from "./RubyLine";

/** @deprecated Prefer RubyLine — kept for any legacy imports. */
export function PhraseRuby({ phrase }: { phrase: WorkPhrase }) {
  return (
    <RubyLine
      text={phrase.japanese}
      ruby={phrase.ruby}
      className="font-jp text-lg text-ink dark:text-paper-100"
    />
  );
}
