import type { Config } from "tailwindcss";

export default {
  // v4 no requiere content, pero puedes dejarlo si quieres limitar scan:
  content: ["./src/**/*.{ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
} satisfies Config;
