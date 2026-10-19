import vize from "@vizejs/vite-plugin";
import { musea } from "@vizejs/vite-plugin-musea";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vize(), musea({ include: ["src/**/*.art.vue"] })],
});
