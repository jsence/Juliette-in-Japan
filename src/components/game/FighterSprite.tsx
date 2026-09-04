"use client";

import { useEffect, useState } from "react";

export type Fighter = "samurai" | "ninja";
export type FighterPose = "idle" | "attack" | "hit";

interface FighterSpriteProps {
  fighter: Fighter;
  pose: FighterPose;
  className?: string;
}

/** Sprite files are optional; missing ones fall back to an SVG silhouette. */
const SPRITE_SRC: Record<Fighter, Partial<Record<FighterPose, string>>> = {
  samurai: {
    idle: "/game/sprites/samurai-idle.png",
    attack: "/game/sprites/samurai-attack.png",
  },
  ninja: {
    idle: "/game/sprites/ninja-idle.png",
    attack: "/game/sprites/ninja-attack.png",
    hit: "/game/sprites/ninja-hit.png",
  },
};

function spriteFor(fighter: Fighter, pose: FighterPose): string {
  const poses = SPRITE_SRC[fighter];
  return poses[pose] ?? poses.idle!;
}

/**
 * Module-level probe cache: each sprite path is checked once per page load, so
 * remounting between rounds does not re-request art that is known to be absent.
 */
const probeCache = new Map<string, boolean>();

/**
 * A duellist. Renders the PNG sprite when present in /public/game/sprites and
 * otherwise draws a chunky silhouette so the game is playable without art.
 */
export function FighterSprite({ fighter, pose, className = "" }: FighterSpriteProps) {
  const src = spriteFor(fighter, pose);
  const [, force] = useState(0);

  // Probe the file once per source so a missing sprite swaps to the fallback
  // without flashing a broken-image icon.
  useEffect(() => {
    if (probeCache.has(src)) return;
    let active = true;
    const img = new window.Image();
    const settle = (ok: boolean) => {
      probeCache.set(src, ok);
      if (active) force((n) => n + 1);
    };
    img.onload = () => settle(true);
    img.onerror = () => settle(false);
    img.src = src;
    return () => {
      active = false;
    };
  }, [src]);

  const status = probeCache.get(src);

  if (status === true) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className={"h-full w-full object-contain [image-rendering:pixelated] " + className}
      />
    );
  }

  return (
    <SilhouetteSprite
      fighter={fighter}
      pose={pose}
      className={className}
      // While probing, keep the silhouette invisible-but-sized to avoid a jump.
      hidden={status === undefined}
    />
  );
}

interface SilhouetteProps {
  fighter: Fighter;
  pose: FighterPose;
  className?: string;
  hidden?: boolean;
}

/**
 * Blocky placeholder art drawn on a 16×20 pixel grid, so it reads as pixel art
 * rather than a smooth vector shape.
 */
function SilhouetteSprite({ fighter, pose, className = "", hidden }: SilhouetteProps) {
  const samurai = fighter === "samurai";
  const body = samurai ? "#3f4a63" : "#33302c";
  const bodyDark = samurai ? "#2b3348" : "#1f1d1a";
  const skin = "#e8c49a";
  const accent = samurai ? "#b3352b" : "#4a5d7a";
  const blade = "#d8d3c8";

  const attacking = pose === "attack";
  const hitPose = pose === "hit";

  return (
    <svg
      viewBox="0 0 16 20"
      className={
        "h-full w-full [image-rendering:pixelated] " +
        (hidden ? "opacity-0 " : "") +
        className
      }
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      {/* head */}
      <rect x="6" y="2" width="4" height="3" fill={skin} />
      {/* helmet / hood */}
      <rect x="5" y="1" width="6" height="2" fill={bodyDark} />
      {samurai ? (
        <rect x="7" y="0" width="2" height="1" fill={accent} />
      ) : (
        <rect x="5" y="3" width="6" height="1" fill={bodyDark} />
      )}
      {/* eyes */}
      <rect x="6" y="3" width="1" height="1" fill={hitPose ? "#b3352b" : "#20201c"} />
      <rect x="9" y="3" width="1" height="1" fill={hitPose ? "#b3352b" : "#20201c"} />

      {/* torso */}
      <rect x="5" y="5" width="6" height="6" fill={body} />
      <rect x="5" y="5" width="6" height="1" fill={accent} />
      {/* belt */}
      <rect x="5" y="10" width="6" height="1" fill={accent} />

      {/* legs */}
      <rect x="5" y="11" width="2" height="6" fill={bodyDark} />
      <rect x="9" y="11" width="2" height="6" fill={bodyDark} />
      {/* feet */}
      <rect x="4" y="17" width="3" height="2" fill={body} />
      <rect x="9" y="17" width="3" height="2" fill={body} />

      {/* arms + weapon: extended when attacking */}
      {attacking ? (
        <>
          <rect x={samurai ? 11 : 2} y="6" width="3" height="2" fill={skin} />
          {samurai ? (
            <rect x="13" y="2" width="1" height="7" fill={blade} />
          ) : (
            <rect x="1" y="4" width="1" height="5" fill={blade} />
          )}
        </>
      ) : (
        <>
          <rect x={samurai ? 11 : 3} y="6" width="2" height="4" fill={skin} />
          {samurai ? (
            <rect x="12" y="4" width="1" height="6" fill={blade} />
          ) : (
            <rect x="3" y="4" width="1" height="4" fill={blade} />
          )}
        </>
      )}
    </svg>
  );
}
