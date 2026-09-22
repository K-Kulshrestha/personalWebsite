import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        // landscape phones & short windows get the compact compositions
        short: { raw: "(max-height: 520px)" },
      },
      colors: {
        paper: "var(--paper)",
        "paper-2": "var(--paper-2)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        pencil: "var(--pencil)",
        hat: "var(--hat)",
        "hat-deep": "var(--hat-deep)",
        sticky: "var(--sticky)",
        "sticky-blue": "var(--sticky-blue)",
        marker: "var(--marker)",
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
        hand: ["Caveat", "cursive"],
        serif: ["Newsreader", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
