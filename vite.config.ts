import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import serveResumePlugin from "./convert-resume-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [serveResumePlugin(), tailwindcss(), react()],
  server: {
    allowedHosts: ["www.alexgap.ca", "alexgap.ca"],
  },
});
