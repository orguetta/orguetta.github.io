# guetta-web

Unified monorepo for the Or Guetta web presence. Two independently
deployable Astro applications, one shared design system.

| Site                    | URL                    | App            | Hosting                            |
| ----------------------- | ---------------------- | -------------- | ---------------------------------- |
| Professional landing    | https://guetta.tech    | `apps/landing` | Cloudflare Workers (`guetta-tech`) |
| Writing & knowledge hub | https://or.guetta.tech | `apps/content` | GitHub Pages (custom domain)       |

## Structure

```text
guetta-web/
├── apps/
│   ├── landing/        # guetta.tech — Astro 7, server output on Workers
│   └── content/        # or.guetta.tech — Astro 7, static on GitHub Pages
├── packages/
│   └── design-system/  # DESIGN.md, tokens, base styles, header, footer,
│                       # theme and navigation shared by every site
├── .github/            # CI workflow, Dependabot, PR template, Copilot notes
├── .vscode/            # editor settings, dev-server launchers, post snippets
├── CLAUDE.md           # rules for agents working in this repo
└── .pages.yml          # Pages CMS config for posts, about and now
```

Each app has its own README with its structure and commands. New
guetta.tech sites go in `apps/` (see the design-system README).

## Commands

```sh
pnpm install            # from repository root
pnpm dev:landing        # landing dev server
pnpm dev:content        # content dev server
pnpm build              # build both applications
pnpm check              # typecheck/build checks for all packages
pnpm lint               # eslint (root config)
pnpm format             # prettier (root config)
```

## Deployment

A single workflow (`.github/workflows/deploy.yml`):

- Pull requests run quality gates only.
- Pushes to `main` deploy the content hub to GitHub Pages and the
  landing Worker to Cloudflare. Deployments require the
  `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets.

## Migration provenance

This repository continues `orguetta/orguetta.github.io` in place;
its full git history is preserved.

| Source                        | Last migrated commit                                  |
| ----------------------------- | ----------------------------------------------------- |
| `orguetta/orguetta.github.io` | `908f421` (Auto-generate resume PDF)                  |
| `orguetta/www-guetta-tech`    | `63a317f` (feat: add resume generation functionality) |

The landing application was imported as a working-tree copy; its
history remains available in the source repository, which is retained
(read-only) after cutover.

## Design system

`packages/design-system/DESIGN.md` is the visual specification for
every guetta.tech site. `packages/design-system/README.md` lists what
the package provides and how a new site adopts it.
