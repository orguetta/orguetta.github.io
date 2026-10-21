# Design System: Guetta

One visual language for guetta.tech (the profile) and or.guetta.tech (the writing). A reader who moves between them should feel they are still on one site.

## Creative North Star: "Signal on Paper"

An engineer's notebook: warm paper, ink, and one colour that means "look here". The work is the point, so the chrome stays quiet. Security is the subject, so the page stays precise: exact type, exact spacing, nothing decorative. There are no gradients, no shadows, no glow and no illustrations. Depth comes from rules and whitespace.

## Who it has to show

Someone who finds Or through a search, a shared link or a LinkedIn profile should, within one screen, learn:

1. Name and role: **Or Guetta, security engineer**.
2. What he works on: **secure access (NetScaler, SSO, PKI, IAM) and the cloud controls around it**.
3. Where to read him: the writing, the tools, the resume.
4. How to reach him.

Copy follows the resume. Do not claim a role, employer, date or certification that the resume does not state.

## Colors

- **Paper** (`--surface-1`, warm off-white): the page field.
- **Paper 2 / 3** (`--surface-2`, `--surface-3`): tiles, code blocks, hover fills.
- **Ink** (`--text-1`): headings and body emphasis.
- **Ink 2 / 3** (`--text-2`, `--text-3`): secondary text and mono labels. `--text-3` must stay at 4.5:1 on paper for mono labels.
- **Signal** (`--signal`, green-teal): the only accent. Use it for the availability dot, link hover, focus ring and the active nav item. Never for large fills.
- **Border** (`--border`): hairline rules between list items and sections.

Dark mode inverts the paper and keeps the same signal hue, lifted for contrast.

## Typography

- **Geist** for everything the reader reads. Headings are 600 weight with -0.03em tracking and 1.05 line height.
- **Geist Mono** for labels, dates, tags and metadata. Uppercase, 0.75rem, 0.1em tracking.
- Body is 1rem to 1.125rem at 1.65 line height, in `--text-2`. Ink is reserved for headings and emphasis.

## Layout

- One column, 56rem maximum (`--content-width`). Prose narrows to 42rem.
- Sections are separated by a hairline rule and a generous top margin, not by background colour changes.
- Lists are rows separated by hairlines. Tags are small, square-cornered, and use `--border`.
- Corners are 2 to 6px. Pills are not used.

## Navigation (shared on both sites)

Wordmark on the left, then: **Writing · Tools · Resume · About · Now · Contact**. The same order and labels appear on every guetta.tech site, because every site renders the same `SiteHeader` and `SiteFooter` components from this package. The footer repeats the links, the profiles, and the security and privacy pages. Destinations come from `packages/design-system/src/navigation.ts`, which is the only place URLs are defined. How a new site adopts all of this is in [README.md](./README.md).

## Motion

Brief and physical. Content fades up once as it enters. Hover changes colour or underline, never size. Everything respects `prefers-reduced-motion`, and content is visible without script.

## Do

- Use the tokens. Do not hardcode colours or fonts in an app.
- Keep one signal use per view where possible.
- Write short, specific sentences. Name the product (NetScaler, Cloudflare WAF) instead of a category.

## Don't

- Don't add shadows, gradients, glassmorphism, pills, or decorative icons.
- Don't use a second accent colour.
- Don't invent case studies, testimonials, clients or metrics.
- Don't publish contact details beyond the ones in `BRAND` in `navigation.ts`.
