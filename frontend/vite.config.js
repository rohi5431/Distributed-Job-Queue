import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwind()],

  server: {
    port: 5190, // 🔥 tumhara frontend port (error me same tha)

    proxy: {
      // 🔥 ALL API CALLS
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },

      // 🔥 OPTIONAL (if needed later)
      "/admin": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
