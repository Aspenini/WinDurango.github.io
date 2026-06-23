import { svelte } from "@sveltejs/vite-plugin-svelte";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

// GitHub Pages serves project sites from a sub-path (e.g. /WinDurango.github.io/)
// and user/org sites from the root. The deploy workflow passes BASE_PATH so assets
// resolve correctly in both cases; local builds default to "/".
const raw = (process.env.BASE_PATH ?? "").replace(/^\/+|\/+$/g, "");
const base = raw ? `/${raw}/` : "/";

export default defineConfig({
  base,
  plugins: [svelte()],
  resolve: {
    alias: {
      "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@styles": fileURLToPath(new URL("./src/styles", import.meta.url))
    }
  },
  server: {
    host: "127.0.0.1",
    port: 4321
  },
  preview: {
    host: "127.0.0.1",
    port: 4321
  }
});
