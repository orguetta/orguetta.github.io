# guetta.tech

Professional landing site for Or Guetta. Built with [Astro](https://astro.build) and deployed on [Cloudflare Workers](https://workers.cloudflare.com). Long-form writing is published separately at [or.guetta.tech](https://or.guetta.tech).

## Features

- Minimalist, token-driven design system
- High performance static + edge deployment
- Resume generated from Markdown
- Cloudflare Workers deployment

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

/
├── public/
├── src/
│ ├── components/
│ ├── content/
│ ├── layouts/
│ ├── pages/
│ └── styles/
└── package.json

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

- `pnpm install` — installs workspace dependencies
- `pnpm dev:landing` — starts the local development server
- `pnpm build:landing` — generates the resume PDF and builds the Worker
- `pnpm --filter landing check` — builds, type-checks, and runs a Wrangler dry-run
- `pnpm --filter landing preview` — previews the Worker locally
- `pnpm --filter landing deploy` — deploys the production Worker
