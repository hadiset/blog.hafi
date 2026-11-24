// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://hadiset.com', 
  base: '/',
  // Inline CSS into each page: removes the render-blocking stylesheet request (PSI mobile).
  build: {
    inlineStylesheets: 'always',
  },
  integrations: [    
    mdx(),
    sitemap()
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: 'catppuccin-mocha',
      wrap: true
    }
  }
});
