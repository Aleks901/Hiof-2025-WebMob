import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { redwood } from "rwsdk/vite";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  environments: {
    ssr: {},
  },
  plugins: [
    tailwindcss(),
    cloudflare({
      viteEnvironment: { name: "worker" },
    }),
    redwood(),
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
});
