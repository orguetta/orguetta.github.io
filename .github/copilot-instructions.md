# Copilot instructions

This is a pnpm monorepo for Or Guetta's sites. Read `CLAUDE.md` at the repository root first; it holds the rules every change must follow.

## Layout

- `apps/landing`: guetta.tech, the profile site (Astro on Cloudflare Workers). See `apps/landing/README.md`.
- `apps/content`: or.guetta.tech, the writing hub (Astro on GitHub Pages). See `apps/content/README.md` for the content model, routing, OG images and search.
- `packages/design-system`: shared design for every guetta.tech site. See `packages/design-system/DESIGN.md` and `README.md`.

## Rules

- Every guetta.tech site looks like one site. Use the shared tokens, `base.css`, `ThemeHead`, `SiteHeader` and `SiteFooter`; never add a site-specific header, footer, theme toggle, colour, font or radius.
- URLs, contact details and social profiles come only from `packages/design-system/src/navigation.ts`.
- Copy about Or follows `apps/landing/src/content/resume.md`. Do not invent roles, dates, clients, metrics or post titles.
- Unfinished posts stay in `apps/content/src/data/blog` with `draft: true`.
- Before pushing, run `pnpm lint`, `pnpm format:check` and build both apps.
