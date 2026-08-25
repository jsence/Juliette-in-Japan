/**
 * Shared UI class fragments.
 *
 * Glassmorphism sits *on top of* the warm paper texture (see globals.css): the
 * surfaces are semi-transparent so the paper grain and warm palette show
 * through, with backdrop blur, a thin light border and a soft layered shadow.
 * Colours are chosen so ink/paper text stays WCAG AA over the blurred surface.
 */

/** Base glass surface for cards and panels. */
export const glass =
  "backdrop-blur-md bg-white/55 dark:bg-black/30 border border-white/40 dark:border-white/10 shadow-glass dark:shadow-glass-dark";

/** Slightly more opaque glass for surfaces that carry a lot of body text. */
export const glassStrong =
  "backdrop-blur-md bg-white/70 dark:bg-black/40 border border-white/50 dark:border-white/10 shadow-glass dark:shadow-glass-dark";

/** Glass treatment for the sticky navigation / header bar. */
export const glassNav =
  "backdrop-blur-md bg-white/60 dark:bg-black/35 border-b border-white/40 dark:border-white/10";

/** Interactive glass card (adds hover affordance); compose with `glass`. */
export const glassHover =
  "transition duration-300 hover:bg-white/70 hover:border-hanko/40 hover:shadow-glass hover:-translate-y-1 dark:hover:bg-black/40 dark:hover:border-hanko-light/30";

/** Lift effect for homepage section cards. */
export const glassLift =
  "transition duration-300 ease-out hover:-translate-y-1.5 hover:shadow-glass dark:hover:shadow-glass-dark";
