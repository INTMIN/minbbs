import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, PluginOption } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  plugins: [reactRouter(), tsconfigPaths() as PluginOption, tailwindcss()],
  server: {
    hmr: true,
  },
});
