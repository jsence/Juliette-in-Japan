import type { RubySegment } from "@/types/content";

interface RubyProps {
  segments: RubySegment[];
  className?: string;
}

/**
 * Renders Japanese text with furigana using semantic <ruby> tags.
 * Segments with a `reading` become ruby; plain segments render as text.
 */
export function Ruby({ segments, className }: RubyProps) {
  return (
    <span className={"font-jp " + (className ?? "")}>
      {segments.map((seg, i) =>
        seg.r ? (
          <ruby key={i}>
            {seg.t}
            <rt>{seg.r}</rt>
          </ruby>
        ) : (
          <span key={i}>{seg.t}</span>
        )
      )}
    </span>
  );
}
