# Kana Battle sprites

Drop pixel-art PNGs in this folder to replace the built-in SVG silhouettes.
The game probes each file at runtime and falls back automatically when one is
missing, so partial sets are fine.

| File                 | Used for                          |
| -------------------- | --------------------------------- |
| `samurai-idle.png`   | Player, resting stance            |
| `samurai-attack.png` | Player, on a correct answer       |
| `ninja-idle.png`     | Enemy, resting stance             |
| `ninja-attack.png`   | Enemy, on a wrong answer/timeout  |
| `ninja-hit.png`      | Enemy, damage flash               |

Guidelines:

- Transparent background, square-ish canvas (the game scales to fit).
- Small source resolution (32×32 to 64×64) — rendering uses
  `image-rendering: pixelated`, so upscaling stays crisp.
- Both fighters face the centre: samurai faces right, ninja faces left.
