import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Prevent bundling issues with react-leaflet
      external: ["react-leaflet"]
    }
  },
  server: {
    proxy: {
      // Optional: proxy for Celestrak TLE fetch in dev
      "/celestrak": {
        target: "https://celestrak.org",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/celestrak/, "")
      }
    }
  }
});
