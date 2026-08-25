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
      },
      animation: {
        "seal-in": "seal-in 0.5s ease-out both",
      },
    },
  },
  plugins: [typography],
};

export default config;
