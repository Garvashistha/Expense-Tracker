import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    base: "/Expense-Tracker/",

    server: {
      host: "0.0.0.0", // Accessible in LAN
      port: 8080,
    },

    plugins: [
      react(),
      ...(isDev ? [componentTagger()] : []), // only in dev mode
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
