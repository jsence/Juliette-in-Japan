import Link from "next/link";
import { site } from "@/lib/site";

/** Site footer with sourcing note and key links. */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-paper-300 bg-paper-100 dark:border-sumi-border dark:bg-sumi">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-ink-muted dark:text-paper-300">
        <p className="max-w-2xl">
          {site.name} is a personal learning log. Kanji readings and stroke counts follow{" "}
          <span className="font-medium">KANJIDIC2</span>; word definitions follow{" "}
          <span className="font-medium">JMdict</span>. Example sentences, where present, come from
          established corpora (Tatoeba, NHK Easy). No Japanese prose here is machine-generated.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1">
          <Link href="/about" className="hover:text-hanko dark:hover:text-hanko-light">About</Link>
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-hanko dark:hover:text-hanko-light"
          >
            LinkedIn
          </a>
          <a href={`mailto:${site.links.email}`} className="hover:text-hanko dark:hover:text-hanko-light">
            Contact
          </a>
          <span className="ml-auto">© {year} {site.name}</span>
        </div>
      </div>
    </footer>
  );
}
