import { defineConfig } from "vite";
import del from "rollup-plugin-delete";

export default defineConfig({
  plugins: [
    del({ targets: "dist/*", ignore: ["dist/Asset"], runOnce: true }),
    del({ targets: "dist/*", ignore: ["dist/Asset", "dist/index"], runOnce: true, hook: "buildEnd" }),
  ],
  base: "/Purus-Internship-Game-CutGrass/",
  mode: "development",
  server: {
    host: '0.0.0.0',
    port: 8080,
    watch: {
      usePolling: true,
    }
  },
  build: {
    outDir: "dist",
    assetsDir: "",
    minify: false,
    emptyOutDir: false,
    copyPublicDir: true,
    chunkSizeWarningLimit: 1024 * 2, // 2MB
  },
  publicDir: "Asset"
});