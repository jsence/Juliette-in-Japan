import { BattleBackdrop } from "./BattleBackdrop";
import { FighterSprite } from "./FighterSprite";
import { HeartBar } from "./HeartBar";

/**
 * A still of the duel, used as the Kana Battle thumbnail on /games.
 *
 * Built from the game's own backdrop and sprites rather than a screenshot, so
 * it cannot fall out of date — and it will pick up real pixel art by itself
 * once sprites land in /public/game/sprites.
 *
 * Purely decorative: the card beside it carries the meaning in text.
 */
export function BattlePreview() {
  return (
    <div
      aria-hidden="true"
      className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-ink/15 shadow-glass dark:border-paper-100/10 dark:shadow-glass-dark"
    >
      <BattleBackdrop depth={2} />

      <div className="absolute inset-x-2 top-2 z-20 flex origin-top items-start justify-between scale-[0.85]">
        <HeartBar hp={3} max={3} label="Samurai" />
        <HeartBar hp={1} max={3} label="Ninja" align="right" />
      </div>

      {/* Romaji prompt, as the ninja poses it in play */}
      <div className="absolute right-[4%] top-[28%] z-20 w-[38%] max-w-[9rem]">
        <div className="relative rounded-lg border-2 border-ink/70 bg-paper-50 px-2 py-1.5 text-center shadow-[3px_3px_0_rgba(43,38,32,0.35)] dark:border-paper-100/60 dark:bg-sumi-light">
          <p className="font-pixel text-sm leading-none text-ink dark:text-paper-100">ka</p>
          <span
            className="absolute -bottom-2 right-6 h-0 w-0 border-x-8 border-t-8 border-x-transparent border-t-ink/70 dark:border-t-paper-100/60"
          />
        </div>
      </div>

      {/* The moment a correct answer lands: samurai lunging, ninja reeling */}
      <div className="absolute bottom-[18%] left-[14%] z-10 h-[46%] w-[22%]">
        <FighterSprite fighter="samurai" pose="attack" />
      </div>
      <div className="absolute bottom-[18%] right-[12%] z-10 h-[46%] w-[22%]">
        <FighterSprite fighter="ninja" pose="hit" />
      </div>
    </div>
  );
}
