import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const base = process.env.GITHUB_ACTIONS === "true" ? "/goldie-annie/" : "/";

export default defineConfig({
  base,
  plugins: [react()],
});
