# @guetta/design-system

The single source of design for every site on `guetta.tech` and its subdomains. The visual rules are in [DESIGN.md](./DESIGN.md); this package is how those rules reach code.

| Site           | App            | Status          |
| -------------- | -------------- | --------------- |
| guetta.tech    | `apps/landing` | uses the system |
| or.guetta.tech | `apps/content` | uses the system |

## What it provides

| Export                        | What it is                                                                                                                                                                         |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tokens.css`                  | Colours (light and dark), type stacks, spacing, radius, motion, layout widths                                                                                                      |
| `fonts.css`                   | Geist and Geist Mono font faces                                                                                                                                                    |
| `base.css`                    | Element defaults (body, headings, links, focus, selection) and shared `g-` classes: `g-container`, `g-label`, `g-tag`, `g-button`, `g-button--quiet`, `g-icon-button`, `g-sr-only` |
| `navigation`                  | `BRAND`, `DOMAINS`, `NAV`, `PRIMARY_NAV`, `SOCIALS`, `localizeHref()`                                                                                                              |
| `components/ThemeHead.astro`  | Theme before first paint, theme-color, and the toggle wiring                                                                                                                       |
| `components/SiteHeader.astro` | Shared header: wordmark, primary nav, contact, theme toggle, `actions` slot                                                                                                        |
| `components/SiteFooter.astro` | Shared footer: site links, profiles, contact, privacy, security                                                                                                                    |

## Adding a new guetta.tech site

1. Create it under `apps/<name>` so it joins the pnpm workspace, and add the dependency:

   ```json
   "dependencies": { "@guetta/design-system": "workspace:*" }
   ```

2. Set `site` in the Astro config to the site's real URL (for example `https://lab.guetta.tech`). `SiteHeader` and `SiteFooter` use it to keep links to the same site relative.

3. In the root layout, import the styles in this order and use the shared components:

   ```astro
   ---
   import "@guetta/design-system/tokens.css";
   import "@guetta/design-system/fonts.css";
   import "./styles/app.css"; // if it imports "tailwindcss", keep it before base.css
   import "@guetta/design-system/base.css";
   import ThemeHead from "@guetta/design-system/components/ThemeHead.astro";
   import SiteHeader from "@guetta/design-system/components/SiteHeader.astro";
   import SiteFooter from "@guetta/design-system/components/SiteFooter.astro";
   ---

   <html lang="en">
     <head>
       <meta charset="utf-8" />
       <meta name="viewport" content="width=device-width,initial-scale=1" />
       <ThemeHead />
     </head>
     <body>
       <SiteHeader />
       <main id="main-content" class="g-container">
         <slot />
       </main>
       <SiteFooter />
     </body>
   </html>
   ```

4. If the site should appear in the navigation, add its URL to `DOMAINS` and `NAV` in `src/navigation.ts`, and to `PRIMARY_NAV` if it belongs in the header. Every site picks the change up on its next build.

5. Build with only tokens and `g-` classes. If something new is needed by more than one site (a card, a callout), add it here rather than in the app.

## Rules

- Never hardcode a colour, font or radius in an app. Use the tokens.
- Never write a separate header, footer or theme toggle in an app. Use the shared components and their slots.
- Contact details come only from `BRAND`; profiles only from `SOCIALS`.
- Changing anything here changes every site. Build all apps after a change: `pnpm -r build`.

## Sites outside this repository

Prefer adding the site to `apps/`. If a site has to live elsewhere (a third-party tool on a subdomain, for example), copy `tokens.css`, `fonts.css` and `base.css` with the font files, follow DESIGN.md by hand, and note in the table above that it is a copy.
