import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // 👇 IMPORTANT: Must match your repo name on GitHub exactly (case-sensitive)
  base: "/Expense-Tracker/",

  server: {
    host: "0.0.0.0", // makes it accessible in LAN (safer than "::")
    port: 8080,
  },

  plugins: [
    react(),
    // Enable lovable-tagger only in development mode
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
