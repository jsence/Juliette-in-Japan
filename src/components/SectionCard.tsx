import Link from "next/link";
import { Hanko } from "./Hanko";

interface SectionCardProps {
  href: string;
  title: string;
  description: string;
  glyph: string;
}

/** A linked card pointing to a top-level section of the site. */
export function SectionCard({ href, title, description, glyph }: SectionCardProps) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-4 rounded-xl border border-paper-300 bg-paper-50 p-5 shadow-sm transition hover:border-hanko/50 hover:shadow-md dark:border-sumi-border dark:bg-sumi-light"
    >
      <Hanko size="md" className="transition group-hover:animate-seal-in">
        {glyph}
      </Hanko>
      <div>
        <h3 className="font-serif text-lg font-semibold text-ink group-hover:text-hanko dark:text-paper-100 dark:group-hover:text-hanko-light">
          {title}
        </h3>
        <p className="mt-1 text-sm text-ink-light dark:text-paper-200">{description}</p>
      </div>
    </Link>
  );
}
