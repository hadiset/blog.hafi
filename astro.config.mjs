// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.hafi.click', 
  base: '/',
  vite: {
    plugins: [tailwindcss()],
  },
});
