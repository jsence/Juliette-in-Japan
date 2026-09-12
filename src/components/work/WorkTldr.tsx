interface WorkTldrProps {
  items: string[];
}

export function WorkTldr({ items }: WorkTldrProps) {
  return (
    <aside className="rounded-xl border-2 border-hanko/30 bg-paper-50 p-5 dark:border-hanko-light/35 dark:bg-sumi-light">
      <h2 className="font-serif text-lg font-semibold text-hanko dark:text-hanko-light">TL;DR</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-ink-light dark:text-paper-200">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}
