# Copilot usage notes for this repo

## Stack & Architecture

- **Framework**: Astro 5 SSG with SSR disabled (static site only)
- **Styling**: Tailwind CSS 4 via `@tailwindcss/vite` plugin (no config file; use `@apply` in CSS or utility classes)
- **Search**: Pagefind static search (requires full build to index content)
- **OG Images**: Dynamic generation via satori + @resvg/resvg-js (`src/utils/og-templates/*.js`)
- **Analytics**: Umami integration (`@yeskunall/astro-umami`)
- **Content focus**: Cybersecurity, NetScaler, application security how-to articles

## Content Model & Publishing

**Location**: `src/data/blog/**/*.md` (defined in `src/content.config.ts`)

**Frontmatter schema** (required fields):

- `title`: String
- `description`: String (used for SEO meta, RSS, card snippets)
- `pubDatetime`: Date

**Optional frontmatter**:

- `modDatetime`: Date | null
- `tags`: string[] (default: `["others"]`, auto-slugified)
- `ogImage`: Image | string (falls back to dynamic generation if `SITE.dynamicOgImage` is true)
- `draft`: boolean (excludes post from production)
- `featured`: boolean
- `hideEditPost`: boolean (hides "Edit page" link for this post)
- `timezone`: string (IANA format; defaults to `SITE.timezone`)
- `canonicalURL`: string
- `author`: string (defaults to `SITE.author`)

**Publishing rules**:

1. Posts in `_`-prefixed folders are ignored by the content loader
2. `draft: true` posts are excluded via `postFilter` utility
3. Scheduled posts only appear after `pubDatetime - SITE.scheduledPostMargin` (15 minutes), except in dev mode (`import.meta.env.DEV`)
4. Keep `pubDatetime` accurate for scheduling; don't use future dates unless intentional

## Routing & URL Generation

- **URL structure**: `/posts/<slug-path>/` derived from nested folders + file name
- **`getPath` utility** (`src/utils/getPath.ts`): Converts file paths to URLs by:
  1. Removing `src/data/blog` prefix
  2. Filtering out `_`-prefixed directories
  3. Slugifying each path segment
  4. Appending the post `id` (file name without extension)
- **Example**: `src/data/blog/security/2025-netscaler-hardening.md` → `/posts/security/2025-netscaler-hardening/`
- **Index pagination**: `src/pages/posts/[...page].astro` (page size: `SITE.postPerPage`)
- **Individual posts**: `src/pages/posts/[...slug]/index.astro` → renders via `PostDetails.astro` layout

## Layouts & Components

- **`Layout.astro`**: Root wrapper with SEO meta tags, Google verification, social sharing meta
- **`PostDetails.astro`**: Post-specific layout with prev/next links, edit button, tags, scroll progress bar, heading anchors, copy-to-clipboard on code blocks
- **`Main.astro`**: Standard page shell (used by most static pages)
- **Shared components**: `src/components/` (Card, Pagination, Tag, Datetime, ShareLinks, Socials, etc.)

## SEO & Open Graph Images

- **Site config**: `src/config.ts` exports `SITE` object with metadata, author, timezone, `dynamicOgImage` toggle, edit URL template
- **Site-wide OG**: `src/pages/og.png.ts` generates default OG image using `siteOgImage()` template
- **Per-post OGs**: Generated at `/posts/.../index.png` when:
  - `SITE.dynamicOgImage` is true
  - Post has no explicit `ogImage` in frontmatter
  - Uses `postOgImage(post)` template (`src/utils/og-templates/post.js`)
- **OG generation flow**: satori (JSX → SVG) → @resvg/resvg-js (SVG → PNG Blob)

## Search Implementation

- **UI**: Pagefind UI in `src/pages/search.astro`
- **Dev caveat**: Search requires at least one full `pnpm run build` to populate `dist/pagefind`; the build script copies `dist/pagefind` → `public/pagefind` for static hosting
- **Indexing**: Pagefind automatically indexes all HTML in `dist/` during build

## Styling & Code Highlighting

- **Tailwind 4**: No config file; use `@layer` directives in `src/styles/global.css` and `typography.css`
- **Theme toggle**: Controlled by `public/toggle-theme.js`; respects `SITE.lightAndDarkMode` and `SITE.dir` (ltr/rtl)
- **Shiki transformers** (configured in `astro.config.ts`):
  - `transformerFileName` (custom, `src/utils/transformers/fileName.js`): Adds filename badges to code blocks via `file="filename"` meta
  - `transformerNotationHighlight`, `transformerNotationWordHighlight`, `transformerNotationDiff`: Enables `// [!code highlight]`, `// [!code ++]`, etc.
- **Code fence convention**: Add `file="path/to/file.ext"` in code fence meta to show filename badge; keep fences clean for proper highlighting

## Utilities & Helpers

**Core helpers** (in `src/utils/`):

- `getSortedPosts`: Sort by `pubDatetime` descending, then `modDatetime`
- `postFilter`: Filters drafts and respects `scheduledPostMargin`
- `getPostsByTag`: Returns posts for a specific tag
- `slugify`: Converts strings to URL-safe slugs (used by `getPath`, tags, etc.)
- `generateOgImages`: Wrapper for OG image generation (see `generateOgImageForPost`, `generateOgImageForSite`)
- `loadGoogleFont`: Fetches Google Fonts for OG image rendering (satori requirement)

**Slugification rules**:

- Use provided `slugify` utilities instead of reimplementing
- Tags are auto-slugified when displayed/filtered
- Path segments are slugified by `getPath`

## Environment & Analytics

**Public env vars** (declared in `astro.config.ts` env schema):

- `PUBLIC_GOOGLE_SITE_VERIFICATION`: Google Search Console verification
- `PUBLIC_UMAMI_WEBSITE_ID`: Umami analytics site ID
- `PUBLIC_UMAMI_URL`: Umami tracker endpoint

**Umami config** (in `astro.config.ts`):

- ID: `0e73fa08-4ca0-4e4e-9e70-a0f39bea1081`
- Endpoint: `https://umami.guetta.tech`
- Script name: `script.js` (served from `public/script.js`)

## Scripts & Workflows

**Package manager**: pnpm (see `package.json`)

**Common commands**:

- `pnpm run dev`: Start dev server
- `pnpm run build`: Full build pipeline (TypeScript check → Astro build → Pagefind indexing → copy Pagefind bundle to `public/`)
- `pnpm run preview`: Preview production build
- `pnpm run lint`: ESLint check (rules in `eslint.config.js`; enforces `no-console`)
- `pnpm run format`: Prettier format (with Astro + Tailwind plugins)
- `pnpm run format:check`: Check formatting without writing

**TypeScript paths**: `@/*` → `./src/*` (see `tsconfig.json`)

## Content Authoring Best Practices

1. **SEO**: Use descriptive `description` (appears in meta tags, RSS, search snippets)
2. **Tags**: Prefer concise, lowercase tags (they're auto-slugified); default is `["others"]`
3. **Headings**: Include `h2`+ headings to enable auto-linked anchors and scroll progress
4. **Edit links**: Set `hideEditPost: true` to hide "Edit page" link per post; update `SITE.editPost.url` in `src/config.ts` if repo structure changes
5. **Scheduling**: Set realistic `pubDatetime` for scheduled publishing; posts appear 15 minutes before `pubDatetime` in dev mode

## Deployment & Hosting

- **Target**: GitHub Pages (or any static host)
- **Static assets**: `public/` directory (includes `public/pagefind/` after build)
- **No SSR**: Avoid server-only APIs (Astro endpoints must return static responses)
- **Build output**: `dist/` (fully static HTML, CSS, JS, images)

## Known Gotchas

1. **Pagefind in dev**: Search won't work until you run at least one full `pnpm run build`
2. **Tailwind 4**: No config file; use `@layer` and utility classes only
3. **Code fences**: Don't add extra syntax to code blocks; Shiki transformers handle highlighting via meta attributes
4. **Draft filtering**: `postFilter` utility is used in multiple places; don't reimplement draft logic
5. **ESLint**: `no-console` rule enforced; use conditional logging in dev only

---

_For questions or missing context, specify which area needs expansion (e.g., OG templates, custom transformers, tag system architecture)._
