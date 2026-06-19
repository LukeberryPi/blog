# Luke Berry's blog

A personal website and blog built with [Astro](https://astro.build/), [React](https://react.dev/) islands, and [Tailwind CSS](https://tailwindcss.com/). Articles are authored as markdown in `src/articles/` and rendered via Astro content collections.

## Getting started

Install dependencies and run the development server with [Bun](https://bun.sh/):

```bash
bun install
bun run dev
```

Open [http://localhost:4321](http://localhost:4321) to see the result.

## Scripts

- `bun run dev` - start the dev server
- `bun run build` - build the static site to `dist/`
- `bun run preview` - preview the production build locally
- `bun run start` - serve the production build on `$PORT` (used in deployment)

## Writing articles

Add a markdown file to `src/articles/` with frontmatter:

```md
---
title: "My article"
date: "2026-01-01"
tags: ["technology"]
location: "London, United Kingdom"
---
```

## Deployment

Deployed on [Railway](https://railway.com/) using the configuration in `railway.json`: it builds with `bun run build` and serves the static output with `astro preview`.
