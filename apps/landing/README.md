# guetta.tech — `apps/landing`

Or Guetta's profile site: who he is, experience, selected writing and contact. Built with [Astro](https://astro.build) and deployed on [Cloudflare Workers](https://workers.cloudflare.com). Long-form writing lives in `apps/content` (or.guetta.tech).

Design, header, footer and theme come from `packages/design-system`. Keep only page content and landing-specific layout here.

## Structure

```text
apps/landing/
├── public/              # favicon, profile photo, resume.pdf, .well-known files
├── scripts/             # resume PDF generation (Puppeteer)
└── src/
    ├── components/      # BaseHead (meta tags)
    ├── content/         # resume.md, the source for the resume page, PDF and home copy
    ├── layouts/         # BaseLayout (shared header and footer)
    ├── pages/           # home, resume, privacy, security, robots, .well-known endpoints
    ├── styles/          # landing-only styles on top of the design system
    └── middleware.ts    # canonical apex domain
```

## Commands

Run from the repository root:

- `pnpm dev:landing`: start the dev server
- `pnpm build:landing`: generate the resume PDF and build the Worker
- `pnpm --filter landing check`: build, type-check and run a Wrangler dry run
- `pnpm --filter landing preview`: preview the Worker locally
- `pnpm --filter landing deploy`: deploy the production Worker
