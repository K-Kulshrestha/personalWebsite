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
        paper: "rgb(var(--paper) / <alpha-value>)",
        "paper-2": "rgb(var(--paper-2) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        "ink-soft": "rgb(var(--ink-soft) / <alpha-value>)",
        pencil: "rgb(var(--pencil) / <alpha-value>)",
        hat: "rgb(var(--hat) / <alpha-value>)",
        "hat-deep": "rgb(var(--hat-deep) / <alpha-value>)",
        sticky: "rgb(var(--sticky) / <alpha-value>)",
        "sticky-blue": "rgb(var(--sticky-blue) / <alpha-value>)",
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
