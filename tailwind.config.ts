import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm paper background tones
        paper: {
          DEFAULT: "#f4ece0",
          50: "#faf6ee",
          100: "#f4ece0",
          200: "#e9dcc7",
          300: "#dcc9ab",
        },
        // Ink-like dark text
        ink: {
          DEFAULT: "#2b2620",
          light: "#4a4238",
          muted: "#6f6656",
        },
        // Red seal / hanko accent
        hanko: {
          DEFAULT: "#b3352b",
          dark: "#8f2820",
          light: "#c85b50",
        },
        // Muted indigo (藍) for secondary accents
        ai: {
          DEFAULT: "#4a5d7a",
          muted: "#5c6f8c",
          light: "#7a8fad",
        },
        // Dark mode surfaces
        sumi: {
          DEFAULT: "#1c1a17",
          light: "#26231e",
          border: "#3a352d",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        jp: ["var(--font-jp)", "var(--font-serif)", "serif"],
        // Game UI only — loaded on the Kana Battle route.
        pixel: ["var(--font-pixel)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "paper-texture":
          "radial-gradient(circle at 25% 15%, rgba(179,53,43,0.03) 0%, transparent 40%), radial-gradient(circle at 80% 60%, rgba(43,38,32,0.04) 0%, transparent 45%)",
      },
      boxShadow: {
        // Soft, layered shadow for glass surfaces (light)
        glass: "0 1px 2px rgba(43,38,32,0.06), 0 12px 28px -14px rgba(43,38,32,0.30)",
        // Deeper layered shadow for glass surfaces (dark)
        "glass-dark": "0 1px 2px rgba(0,0,0,0.45), 0 14px 34px -14px rgba(0,0,0,0.65)",
      },
      keyframes: {
        "seal-in": {
          "0%": { opacity: "0", transform: "scale(1.4) rotate(-8deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(0deg)" },
        },
        "hit-flash": {
          "0%, 100%": { filter: "none" },
          "25%, 75%": { filter: "brightness(2.4) saturate(0.2)" },
        },
        "victory-flash": {
          "0%, 100%": { filter: "none" },
          "40%": { filter: "brightness(1.35)" },
        },
        "screen-shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-5px)" },
          "45%": { transform: "translateX(4px)" },
          "70%": { transform: "translateX(-2px)" },
        },
      },
      animation: {
        "seal-in": "seal-in 0.5s ease-out both",
        "hit-flash": "hit-flash 0.45s steps(2, end) 1",
        "victory-flash": "victory-flash 0.9s ease-out 1",
        "screen-shake": "screen-shake 0.35s ease-out 1",
      },
    },
  },
  plugins: [typography],
};

export default config;
