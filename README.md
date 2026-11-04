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
- `bun run start` - serve the production build locally on `$PORT`
- `bun run deploy` - build and deploy to Cloudflare Workers

## Writing articles

Articles are markdown files in `src/articles/`, and drafts live there too, on `main`. An article with `draft: true` shows up in `bun run dev` with a draft badge, but production builds leave it out, so you can commit and push drafts whenever you like.

- `bun run new "My title"` - start a draft at `src/articles/my-title.md` and open it in VS Code (set `BLOG_EDITOR` to use another app)
- `bun run drafts` - list drafts, their word counts and anything left to fix
- `bun run ship my-title` - publish a draft: sets `date` to today, removes `draft: true`, commits the file and pushes `main`, which deploys it

`ship` also takes part of a slug (`bun run ship raycast`). It stops if the draft still has a `TODO`, `FIXME`, `TK` or an empty link; pass `--force` to ship anyway.

To start drafts from Raycast, add `scripts/raycast` in Raycast under Settings → Extensions → Script Commands → Add Directories.

Frontmatter:

```md
---
title: "My article"
date: "2026-01-01"
tags: ["technology"]
location: "London, United Kingdom"
draft: true
---
```

## Deployment

Hosted on Cloudflare Workers with static assets. `wrangler.jsonc` configures the `lukeberrypi-blog` Worker and both `lukeberrypi.com` and `www.lukeberrypi.com`.

Run `bun run deploy` after `wrangler login` for a manual deployment. Cloudflare Workers Builds uses `bun run build` followed by `npx wrangler@4.153.0 deploy` from the repository root on pushes to `main`.

DNS is hosted by Cloudflare. Existing Zoho mail, DKIM, Bluesky, and domain verification records are preserved. No application secrets or database are required.
