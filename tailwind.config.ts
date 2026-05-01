import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dracula: {
          bg: "var(--dracula-bg)",
          fg: "var(--dracula-fg)",
          selection: "var(--dracula-selection)",
          comment: "var(--dracula-comment)",
          cyan: "var(--dracula-cyan)",
          green: "var(--dracula-green)",
          orange: "var(--dracula-orange)",
          pink: "var(--dracula-pink)",
          purple: "var(--dracula-purple)",
          red: "var(--dracula-red)",
          yellow: "var(--dracula-yellow)",
          card: "var(--dracula-card)",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "expand-line": "expandLine 1s ease-out forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        expandLine: {
          "0%": { width: "0", opacity: "0" },
          "100%": { width: "100%", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
