import Link from "next/link";
import { Hanko } from "@/components/Hanko";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <Hanko size="lg">迷</Hanko>
      <h1 className="font-serif text-3xl font-bold text-ink dark:text-paper-100">Lost the path</h1>
      <p className="max-w-md text-ink-light dark:text-paper-200">
        This page doesn&apos;t exist (yet). Like a lot of this journey, it&apos;s a work in progress.
      </p>
      <Link
        href="/"
        className="rounded-md bg-hanko px-5 py-2.5 font-medium text-paper-50 transition hover:bg-hanko-dark"
      >
        Back home
      </Link>
    </div>
  );
}
