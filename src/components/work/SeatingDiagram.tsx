/** Simple 上座 / 下座 seating diagram for a typical meeting room. */
export function SeatingDiagram() {
  return (
    <figure className="rounded-xl border border-paper-300 bg-paper-50/90 p-5 backdrop-blur-sm dark:border-sumi-border dark:bg-sumi-light/90">
      <figcaption className="font-serif text-lg font-semibold text-ink dark:text-paper-100">
        Where to sit: <span className="font-jp">上座</span> (honour seat) vs{" "}
        <span className="font-jp">下座</span> (lower seat)
      </figcaption>
      <p className="mt-2 text-sm text-ink-light dark:text-paper-200">
        Farthest from the door is usually 上座 — reserved for the most senior person or the guest of honour.
        Near the door is 下座 — where juniors sit and where you sit if you are unsure.
      </p>
      <svg
        viewBox="0 0 360 220"
        className="mt-4 w-full max-w-md text-ink dark:text-paper-100"
        role="img"
        aria-label="Room diagram: door on the right, table in the centre, kamiza at the far left, shimoza near the door"
      >
        <rect x="20" y="40" width="220" height="120" rx="8" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.25" />
        <text x="130" y="105" textAnchor="middle" className="fill-current text-[13px] font-sans">
          Table
        </text>
        <rect x="268" y="78" width="72" height="44" rx="4" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeOpacity="0.35" />
        <text x="304" y="96" textAnchor="middle" className="fill-current text-[11px] font-sans">
          Door
        </text>
        <text x="304" y="112" textAnchor="middle" className="fill-current text-[10px] font-sans opacity-70">
          入口
        </text>
        <circle cx="48" cy="100" r="22" fill="#b3352b" fillOpacity="0.2" stroke="#b3352b" strokeWidth="2" />
        <text x="48" y="96" textAnchor="middle" className="fill-[#8f2820] text-[11px] font-sans font-semibold dark:fill-[#c85b50]">
          上座
        </text>
        <text x="48" y="110" textAnchor="middle" className="fill-[#8f2820] text-[9px] font-sans dark:fill-[#c85b50]">
          kamiza
        </text>
        <circle cx="210" cy="100" r="22" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.35" />
        <text x="210" y="96" textAnchor="middle" className="fill-current text-[11px] font-sans">
          下座
        </text>
        <text x="210" y="110" textAnchor="middle" className="fill-current text-[9px] font-sans opacity-70">
          shimoza
        </text>
        <path d="M 130 170 L 130 188" stroke="currentColor" strokeOpacity="0.4" markerEnd="url(#arrow)" />
        <text x="130" y="208" textAnchor="middle" className="fill-current text-[10px] font-sans opacity-80">
          farthest from door = senior / guest
        </text>
      </svg>
    </figure>
  );
}
