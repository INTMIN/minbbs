import { heroui } from "@heroui/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  // darkMode: "class", // 或 "media"
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
  },
  plugins: [heroui()], // ✅ 必须是数组
};

export default config;
