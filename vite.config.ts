// vite.config.ts
import path from "path";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { defineConfig } from "vite";
import { inspectAttr } from 'kimi-plugin-inspect-react';

export default defineConfig({
  base: './',
  plugins: [
    inspectAttr(),
    react(),
    basicSsl(), // Enables HTTPS with trusted self-signed certificate
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});