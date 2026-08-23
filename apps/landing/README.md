# guetta.tech

Personal website and writing hub for Or Guetta. Built with [Astro](https://astro.build) and deployed on [Cloudflare Workers](https://workers.cloudflare.com).

## Features

- Minimalist, token-driven design system
- High performance static + edge deployment
- Markdown & MDX blog support
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

- `npm install` — installs dependencies
- `npm run dev` — starts the local dev server at `localhost:4321`
- `npm run build` — builds the production site to `./dist/`
- `npm run preview` — previews the build locally before deploying
- `npm run deploy` — deploys the production site to Cloudflare Workers
