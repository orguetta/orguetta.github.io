# Copilot Instructions for guetta.tech

## Project Overview

Professional landing site built with **Astro 7** and deployed to **Cloudflare Workers**. Long-form writing lives in the separate `apps/content` application.

## Architecture

### Tech Stack

- **Framework**: Astro 7 with the SSR adapter (`@astrojs/cloudflare`)
- **Deployment**: Cloudflare Workers via Wrangler
- **Content**: Resume Markdown loaded directly by `src/pages/resume.astro`
- **Styling**: Shared design-system tokens and local CSS

### Key Files

- [astro.config.mjs](../astro.config.mjs): Cloudflare adapter with `imageService: "compile"` and sitemap
- [wrangler.json](../wrangler.json): Routes for both apex and www domains, observability enabled
- [src/consts.ts](../src/consts.ts): Site-wide constants (`SITE_TITLE`, `SITE_DESCRIPTION`)
- [src/content/resume.md](../src/content/resume.md): canonical resume content

There are no Astro content collections in the landing application.

## Development Workflow

### Commands (pnpm workspace scripts)

- `pnpm dev:landing` - Local development server
- `pnpm build:landing` - Resume PDF generation and production build
- `pnpm --filter landing preview` - Build + Wrangler local preview
- `pnpm --filter landing check` - Build + TypeScript + Wrangler dry-run
- `pnpm --filter landing deploy` - Deploy to Cloudflare Workers
- `pnpm --filter landing cf-typegen` - Generate Worker types

### Testing Before Deploy

Run `pnpm --filter landing check` and a local preview before deployment. The generated Wrangler configuration is `dist/server/wrangler.json`.

## Styling Conventions

### CSS Architecture

- **Global**: [src/styles/global.css](../src/styles/global.css) defines CSS variables, imported in [src/components/BaseHead.astro](../src/components/BaseHead.astro)
- **Color Palette**: defined by shared tokens in `packages/design-system`
- **Typography**: locally hosted Geist and Geist Mono
- **Spacing**: `--space-xs` to `--space-xl` (0.5rem to 8rem)
- **Dark Mode**: shared token overrides follow the configured theme

### Component Styling

- Scoped `<style>` blocks in `.astro` components
- Animations: Use `.fade-in` with `.delay-1`, `.delay-2` classes (see [src/pages/index.astro](../src/pages/index.astro))

## Astro Patterns

### Layouts

**BaseLayout.astro** is the page wrapper with shared metadata, header, and footer.

### Data Flow

- Site constants from [src/consts.ts](../src/consts.ts) imported directly
- Resume Markdown is loaded directly with `import.meta.glob`.

### Image Handling

Using `imageService: "compile"` in Cloudflare adapter (not Cloudflare's CDN image service). Images in [public/](../public/) folder served statically.

## Project-Specific Conventions

### File Naming

- Astro components: PascalCase (e.g., `BaseHead.astro`, `FormattedDate.astro`)
- Pages: kebab-case for multi-word routes (e.g., `privacy.astro`)

### Deployment Targets

Cloudflare accepts both hosts and redirects the apex host to the canonical **www.guetta.tech** domain. Test both hosts after deployment.

## Integration Points

### External Services

- **Cloudflare Observability**: Upload source maps enabled for debugging

### Cloudflare Worker Context

- Compatibility date: 2026-08-20
- `nodejs_compat` flag enabled
- Assets binding available as `ASSETS` in Worker runtime
- Platform proxy enabled in dev mode for testing Worker APIs

## Common Tasks

### Updating Styles

- Global variables: Edit [src/styles/global.css](../src/styles/global.css)
- Component-specific: Add scoped `<style>` in `.astro` file
- Typography uses the shared local fonts; avoid adding remote font imports

### Dependency Updates

Run `pnpm outdated -r` before suggesting updates. Validate with `pnpm check`, `pnpm lint`, and `pnpm format:check` after upgrading.
