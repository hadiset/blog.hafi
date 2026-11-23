# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal blog and portfolio for Hafi (https://hadiset.com), built with Astro 7, Tailwind CSS v4 (via `@tailwindcss/vite`), and MDX. No UI framework (React/Vue/Svelte): components are `.astro` files, and interactivity is vanilla JS in `<script>` tags. Content and UI text are mixed English/Indonesian; dates are formatted with the `id-ID` locale (`src/utils/helpers.ts`).

## Commands

- `npm run dev`: dev server at `localhost:4321`
- `npm run build`: static build to `./dist/`
- `npm run preview`: serve the built site
- `npm run check`: `astro check` (type checking for `.astro`/TS files). There is no test suite or linter.

Deployment: every push to `main` builds and deploys to GitHub Pages through `.github/workflows/deploy.yml` (`withastro/action`). `public/CNAME` sets the custom domain.

## Architecture

**Blog content.** Posts are Markdown/MDX files in `src/content/blog/`, loaded by the `blog` collection in `src/content.config.ts`. That file holds the schema for frontmatter: required fields are `title`, `author`, `publish_date` (a date), `category`, `tags`, and `description` (at most 160 characters). Optional fields are `image`, `imageAlt`, `draft`, and `featured`. Post images are stored in `public/images/` and referenced by absolute path, for example `/images/foo.webp`. The post URL is the entry `id`, which comes from the filename.

**Drafts.** Each page that reads the collection (`pages/blog/index.astro`, `pages/blog/[blog].astro`, `pages/category/[category].astro`, `pages/tag/[tag].astro`, `pages/rss.xml.js`) applies the `!data.draft` filter itself. A new page that lists posts needs the same filter.

**Blog index.** `pages/blog/index.astro` renders the first 10 posts on the server. It also serializes all post data into the page, and client-side JS uses that data for category filtering and the "load more" button.

**Layouts.**
- `BaseLayout.astro`: the main site shell (header, nav, footer, SEO/OG meta). It also runs the dark-mode bootstrap script, which reads `localStorage.theme` and the system preference and then sets `data-theme`. The toggle is in `components/layout/Navigation.astro`. Tailwind's `dark:` variant is redefined to key off `[data-theme=dark]` instead of the media query.
- `BlogLayout.astro`: the post page wrapper. It receives frontmatter and the raw body so it can compute read time.
- `SlicingLayout.astro`: used by `pages/showcase/*`. These pages are standalone "slicing" portfolio pieces (design-to-code recreations of landing pages) that take Figma/designer credits as props.

**Styling.** `src/styles/global.css` is the blog's Tailwind entry point. It defines the font theme (Crimson Text, DM Sans, Playfair Display, Roboto Mono) and the typography plugin. Each showcase page imports its own stylesheet (`porto1.css`, `smgwo.css`), which has its own `@import "tailwindcss"`, `@source` list, and `@theme` palette, so changes to a showcase page's styling stay out of the blog's theme. Showcase images live in `src/assets/Prtfl*/` and are rendered with `astro:assets` `<Image>`.

**`plan/`.** This folder holds task briefs, mostly written in Indonesian, for work on the showcase pages. For example, `task-*.md` covers Baskara Wedding Organizer landing-page improvements. Read the relevant brief before working on a showcase task, and only change what the brief describes.
