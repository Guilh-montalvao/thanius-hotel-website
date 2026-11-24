import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { cal: "#F6EFE4", areia: "#EADFCB", terra: "#B8481F", azul: "#2F3F73", madeira: "#5A3420", tinta: "#1F1A16" },
      fontFamily: { display: ["var(--font-display)", "serif"], sans: ["var(--font-body)", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
} satisfies Config;
