"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { CharacterDetail } from "./CharacterDetail";
import { CharacterDialog } from "./CharacterDialog";
import { characterHref } from "@/lib/characterPaths";
import type { CharacterDetail as Detail } from "@/types/content";

interface CharacterBrowserProps {
  kind: "kana" | "kanji";
  /** Index route the cards live on, e.g. "/language/kana". */
  basePath: string;
  /** Every character in the order the index shows them, for arrow navigation. */
  details: Detail[];
  /** Character to open on mount, set by the per-character route. */
  initialChar?: string;
  /** The server-rendered cards. Any element with `data-char` opens the panel. */
  children: React.ReactNode;
}

/**
 * Turns the server-rendered character cards into an overlay experience.
 *
 * The cards stay real links to /language/<kind>/<char>, so they are crawlable and
 * work without JavaScript, middle-click and modifier-click behave normally, and a
 * direct visit renders the index with the panel already open. A plain click is
 * intercepted to open the panel and sync the address bar instead of navigating,
 * which keeps arrow-key stepping instant.
 */
export function CharacterBrowser({
  kind,
  basePath,
  details,
  initialChar,
  children,
}: CharacterBrowserProps) {
  const indexByChar = useMemo(
    () => new Map(details.map((detail, index) => [detail.char, index])),
    [details]
  );

  const [openIndex, setOpenIndex] = useState<number | null>(
    initialChar === undefined ? null : indexByChar.get(initialChar) ?? null
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const cardFor = useCallback((char: string) => {
    const cards = containerRef.current?.querySelectorAll<HTMLElement>("[data-char]") ?? [];
    return [...cards].find((card) => card.dataset.char === char) ?? null;
  }, []);

  const show = useCallback(
    (char: string, history: "push" | "replace") => {
      const index = indexByChar.get(char);
      if (index === undefined) return;
      setOpenIndex(index);
      const url = characterHref(kind, char);
      if (history === "push") window.history.pushState(null, "", url);
      else window.history.replaceState(null, "", url);
    },
    [indexByChar, kind]
  );

  const close = useCallback(() => {
    setOpenIndex(null);
    window.history.pushState(null, "", basePath);
  }, [basePath]);

  // A direct visit lands on the character route; keep that URL rather than
  // pushing a duplicate entry, so Back leaves the site as the reader expects.
  useEffect(() => {
    const onPopState = () => {
      const segment = decodeURIComponent(window.location.pathname.split("/").pop() ?? "");
      const index = indexByChar.get(segment);
      setOpenIndex(index === undefined ? null : index);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [indexByChar]);

  const onContainerClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const card = (event.target as HTMLElement).closest<HTMLElement>("[data-char]");
      const char = card?.dataset.char;
      if (!char || !indexByChar.has(char)) return;

      event.preventDefault();
      show(char, "push");
    },
    [indexByChar, show]
  );

  const open = openIndex === null ? null : details[openIndex];

  return (
    <>
      <div ref={containerRef} onClick={onContainerClick}>
        {children}
      </div>

      {open && (
        <CharacterDialog
          label={`${open.char} — character detail`}
          onClose={close}
          onPrevious={
            openIndex! > 0 ? () => show(details[openIndex! - 1].char, "replace") : undefined
          }
          onNext={
            openIndex! < details.length - 1
              ? () => show(details[openIndex! + 1].char, "replace")
              : undefined
          }
          getReturnFocus={() => cardFor(open.char)}
        >
          <CharacterDetail
            detail={open}
            onSelectCharacter={(char) => show(char, "replace")}
          />
        </CharacterDialog>
      )}
    </>
  );
}
