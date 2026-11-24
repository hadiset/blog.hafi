# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio and blog of Hadi Setiawan (https://hadiset.com), aimed mainly at recruiters. Built with Astro 7, Tailwind CSS v4 (via `@tailwindcss/vite`), and MDX. There is no UI framework (React/Vue/Svelte): components are `.astro` files, and interactivity is vanilla JS in `<script>` tags.

**Before changing any UI or copy, read `docs/design-guide.md`.** It holds the agreed design system (terminal style, Catppuccin Mocha/Latte, JetBrains Mono + DM Sans) and the copy rules (English, professional and to the point, official experience numbers, no phone number on the site).

## Commands

- `npm run dev`: dev server at `localhost:4321`
- `npm run build`: static build to `./dist/`
- `npm run preview`: serve the built site
- `npm run check`: `astro check` (type checking for `.astro`/TS files). There is no test suite or linter.

Deployment: every push to `main` builds and deploys to GitHub Pages through `.github/workflows/deploy.yml` (`withastro/action`). `public/CNAME` sets the custom domain.

## Architecture

**Theming.** `src/styles/global.css` defines the Catppuccin palette as CSS variables: Mocha on `:root`, Latte under `[data-theme=light]`. It exposes them as Tailwind colors named `ctp-*` (`bg-ctp-base`, `text-ctp-mauve`, and so on). Use these tokens, not Tailwind's built-in colors, so both themes keep working. Dark is the default. A script in the `<head>` of `BaseLayout.astro` applies the theme before paint, and it only switches to light when `localStorage.theme === "light"`. The toggle is in `components/layout/Navigation.astro`. There are `dark:` and `light:` custom variants, but the tokens usually make them unnecessary.

**Terminal components.** `components/terminal/TerminalWindow.astro` is a card with window chrome. `components/terminal/Prompt.astro` renders a section heading written as a shell command (`$ ls ./skills`).

**Data.** Profile facts and homepage copy (highlights, achievements, skills, links) live in `src/data/profile.ts`. The list of showcase projects lives in `src/data/showcase.ts`, which the homepage and `/showcase` both use. The CV download is `public/cv-hadi-setiawan.pdf`.

**Blog content.** Posts are Markdown/MDX files in `src/content/blog/`, loaded by the `blog` collection in `src/content.config.ts`. That file holds the schema for frontmatter: required fields are `title`, `author`, `publish_date` (a date), `category`, `tags`, and `description` (at most 160 characters). Post images are stored in `public/images/` and referenced by absolute path. The post URL is `/blog/<entry id>`, and the entry id comes from the filename. Each page that lists posts, including `pages/rss.xml.js`, filters `!data.draft` itself.

**Blog index.** `pages/blog/index.astro` renders the first 10 posts on the server. It also serializes all post data into the page, and client-side JS handles category filtering and "load more". Its `createPostElement()` duplicates the markup of `components/blog/BlogCard.astro`, so change both together.

**Layouts.** `BaseLayout.astro` is the site shell (nav, footer, SEO/OG meta, theme bootstrap). `BlogLayout.astro` wraps a post and computes read time from the raw body. `SlicingLayout.astro` is used by the individual showcase pages (`pages/showcase/porto-1.astro`, `smg-wo.astro`). Those pages are standalone design-to-code recreations of client landing pages. They import their own stylesheet (`porto1.css`, `smgwo.css`), each with its own `@import "tailwindcss"` and `@theme`, and they are exempt from the site design guide.

**`plan/`.** This folder holds task briefs, mostly in Indonesian, for the showcase pages. Read the relevant brief before working on a showcase task, and only change what the brief describes.
