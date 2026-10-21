# guetta.tech monorepo

- `apps/landing`: guetta.tech, the profile site (Astro on Cloudflare Workers).
- `apps/content`: or.guetta.tech, the writing hub (Astro on GitHub Pages).
- `packages/design-system`: the shared design for both, and for any future guetta.tech site.

## Design is shared

Every site on guetta.tech and its subdomains must look like one site.

- Read `packages/design-system/DESIGN.md` before any visual change.
- Use the shared `tokens.css`, `fonts.css`, `base.css`, `ThemeHead`, `SiteHeader` and `SiteFooter`. Do not write a site-specific header, footer, theme toggle, colour, font or radius.
- Navigation URLs, contact details and social profiles live only in `packages/design-system/src/navigation.ts`.
- A new guetta.tech site goes in `apps/` and follows "Adding a new guetta.tech site" in `packages/design-system/README.md`.
- After changing the design system, build both apps.

## Content

Copy about Or follows `apps/landing/src/content/resume.md`. Do not invent roles, dates, clients, metrics or post titles; link only to posts that are published (`draft: false`).
