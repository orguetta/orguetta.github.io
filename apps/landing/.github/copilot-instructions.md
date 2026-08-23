# Copilot Instructions for guetta.tech

## Project Overview

Personal website and blog built with **Astro 5** (static site generator) deployed to **Cloudflare Workers** (not Cloudflare Pages despite README). Uses content collections for markdown blog posts with minimalist design principles.

## Architecture

### Tech Stack

- **Framework**: Astro 5 with SSR adapter (`@astrojs/cloudflare`)
- **Deployment**: Cloudflare Workers via Wrangler
- **Content**: Type-safe content collections using Astro's glob loader
- **Analytics**: Umami (self-hosted at `umami.guetta.tech`)
- **Styling**: Custom CSS with CSS variables, no framework

### Key Files

- [astro.config.mjs](../astro.config.mjs): Cloudflare adapter with `imageService: "compile"`, sitemap, and Umami integration
- [wrangler.json](../wrangler.json): Routes for both apex and www domains, observability enabled
- [src/consts.ts](../src/consts.ts): Site-wide constants (`SITE_TITLE`, `SITE_DESCRIPTION`)
- [src/content.config.ts](../src/content.config.ts): Content collection schema (blog posts use `pubDate`, `updatedDate`, `heroImage`, `category`)

### Content Collections Pattern

Blog posts in [src/content/blog/](../src/content/blog/) use the glob loader pattern:

```typescript
loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" });
```

- Frontmatter schema enforces `title`, `description`, `pubDate` (coerced to Date)
- Optional: `updatedDate`, `heroImage`, `category`
- Dynamic routes via [src/pages/blog/[...slug].astro](../src/pages/blog/%5B...slug%5D.astro) with `getStaticPaths()`

## Development Workflow

### Commands (npm scripts)

- `npm run dev` - Local dev server (port 4321)
- `npm run build` - Build for production to `./dist/`
- `npm run preview` - Build + Wrangler local preview (tests Worker compatibility)
- `npm run check` - Full validation: build + TypeScript + Wrangler dry-run
- `npm run deploy` - Deploy to Cloudflare Workers
- `npm run cf-typegen` - Generate Worker types from Wrangler config

### Testing Before Deploy

Always run `npm run preview` (not just `build`) to catch Worker-specific issues. The Cloudflare adapter outputs to `dist/_worker.js/index.js` (see [wrangler.json](../wrangler.json) `main` field).

## Styling Conventions

### CSS Architecture

- **Global**: [src/styles/global.css](../src/styles/global.css) defines CSS variables, imported in [src/components/BaseHead.astro](../src/components/BaseHead.astro)
- **Color Palette**: `--color-primary` (#1B2B4D), `--color-secondary` (#7B8A4B), light bg (#FAFAF0)
- **Typography**: Montserrat (headings), Inter (body), Fira Code (mono) loaded from Google Fonts
- **Spacing**: `--space-xs` to `--space-xl` (0.5rem to 8rem)
- **Dark Mode**: `.dark` class override defined but not implemented yet

### Component Styling

- Scoped `<style>` blocks in `.astro` components
- `:global()` selector for styling slotted content (see [src/layouts/BlogPost.astro](../src/layouts/BlogPost.astro) `.prose :global(h2)`)
- Animations: Use `.fade-in` with `.delay-1`, `.delay-2` classes (see [src/pages/index.astro](../src/pages/index.astro))

## Astro Patterns

### Layouts

Two primary layouts in [src/layouts/](../src/layouts/):

1. **BaseLayout.astro**: Page wrapper with Header/Footer
2. **BlogPost.astro**: Extends BaseLayout, adds article structure with FormattedDate component

### Data Flow

- Site constants from [src/consts.ts](../src/consts.ts) imported directly
- Blog collection: `await getCollection("blog")` then sort by `pubDate.valueOf()`
- Render content with `await render(post)` pattern in dynamic routes

### Image Handling

Using `imageService: "compile"` in Cloudflare adapter (not Cloudflare's CDN image service). Images in [public/](../public/) folder served statically.

## Project-Specific Conventions

### File Naming

- Astro components: PascalCase (e.g., `BaseHead.astro`, `FormattedDate.astro`)
- Pages: kebab-case for multi-word routes (e.g., `privacy.astro`)
- Dynamic routes: Astro bracket syntax `[...slug].astro`

### Content Requirements

Blog posts must include in frontmatter:

- `title`, `description`: strings
- `pubDate`: ISO date string (auto-coerced)
- Optional but recommended: `heroImage`, `category`

### Deployment Targets

Site runs on **both** `guetta.tech` and `www.guetta.tech` (see [wrangler.json](../wrangler.json) routes). Test both domains after deployment.

## Integration Points

### External Services

- **Umami Analytics**: ID `dc55a6e7-af95-461b-96ee-0db172b4c30b`, `doNotTrack: true` enabled
- **Cloudflare Observability**: Upload source maps enabled for debugging
- **RSS Feed**: Generated at [src/pages/rss.xml.js](../src/pages/rss.xml.js)

### Cloudflare Worker Context

- Compatibility date: 2025-12-17
- `nodejs_compat` flag enabled
- Assets binding available as `ASSETS` in Worker runtime
- Platform proxy enabled in dev mode for testing Worker APIs

## Common Tasks

### Adding a New Blog Post

1. Create `.md`/`.mdx` in [src/content/blog/](../src/content/blog/)
2. Add required frontmatter (title, description, pubDate)
3. File name becomes the slug (e.g., `my-post.md` → `/blog/my-post`)
4. Run `npm run dev` to preview

### Updating Styles

- Global variables: Edit [src/styles/global.css](../src/styles/global.css)
- Component-specific: Add scoped `<style>` in `.astro` file
- Typography uses existing Google Fonts - avoid adding new font imports

### Dependency Updates

Recent outdated packages (as of Jan 2026):

- `@astrojs/rss`, `@astrojs/sitemap` (minor versions behind)
- `astro` (5.16.2 → 5.16.12 patch available)
- `wrangler` (4.51.0 → 4.59.3 minor update)

Run `npm outdated` before suggesting updates. Test with `npm run check` after upgrading.
