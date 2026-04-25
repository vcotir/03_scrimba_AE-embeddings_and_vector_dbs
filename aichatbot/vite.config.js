import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/": {
        target: "http://localhost:3000", // Your Express port
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
