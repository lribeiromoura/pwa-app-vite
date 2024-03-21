import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import Router from "vite-plugin-router";

export default defineConfig({
  plugins: [
    react(),
    Router(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
        type: "module",
      },
      workbox: {
        globPatterns: ["**/*"],
      },
      includeAssets: ["**/*"],
      manifest: {
        icons: [
          {
            src: "/image-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/image-256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "/image-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
