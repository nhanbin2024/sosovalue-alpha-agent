import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui"]
      },
      colors: {
        ink: "#060712",
        panel: "#101322",
        panelSoft: "#171b2d",
        line: "rgba(255,255,255,0.10)",
        brand: "#6AE4FF",
        brand2: "#8B5CF6",
        positive: "#34D399",
        warning: "#FBBF24",
        danger: "#FB7185"
      },
      boxShadow: {
        glow: "0 0 45px rgba(106, 228, 255, 0.16)",
        card: "0 24px 80px rgba(0, 0, 0, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
