import { heroui } from "@heroui/react"; // 注意这里是 @heroui/react，而不是 @heroui/theme
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./app/**/*.{js,jsx,ts,tsx}",
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
  plugins: [heroui()], // 插件调用
};

export default config;
