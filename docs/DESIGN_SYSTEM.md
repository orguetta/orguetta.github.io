# Design System — Or Guetta

> Version: 3.0  
> Last Updated: 2026-08-21

This document defines a unified design system for both websites:

- `www.guetta.tech` = Clean, short landing page focused on CTA
- `or.guetta.tech` = Deep content hub (Posts, Resume, Tools, Knowledge Base)

Goal: **feel like one website**, even though there are two projects and two different hosts.

---

## 1) Brand DNA

### Brand Name

- **Or Guetta**

### Core Identity

- Cybersecurity & Cloud Security Engineer
- NetScaler / ADC / WAF specialist
- Minimalist operator
- Digital Nomad + CrossFit mindset (discipline, consistency, pragmatism)

### Brand Principles

1. **Clarity over Noise** — every screen should be understandable within 3–5 seconds.
2. **Defensive by Design** — convey trust, stability, and professional accountability.
3. **Practical Depth** — fewer buzzwords, more playbooks/checklists/real configs.

### Voice & Tone

- Professional, sharp, and approachable.
- Short and direct; no unnecessary hype.
- Explain complex topics clearly without over-simplifying.

---

## 2) Site Architecture Roles

### `www.guetta.tech` (Landing)

- Short hero + value proposition
- CTA to Blog/Resume/Contact
- No content overload

### `or.guetta.tech` (Content Hub)

- Posts / Tags / Search / Resume / Tools / About / Now
- Deep professional content and long-form articles

### Navigation Behavior

- On `www`: links to `or` for Blog + Resume
- On `or`: link back to `www` as Home/Landing

---

## 3) Design Tokens (Source of Truth)

> Monochrome OKLCH palette. Border-driven elevation. No colored accent.

### Color Tokens

| Token         | Light              | Dark               | Usage               |
| :------------ | :----------------- | :----------------- | :------------------ |
| `--surface-1` | `oklch(1 0 0)`     | `oklch(0.145 0 0)` | Page background     |
| `--surface-2` | `oklch(0.97 0 0)`  | `oklch(0.205 0 0)` | Cards/Panels        |
| `--surface-3` | `oklch(0.922 0 0)` | `oklch(0.269 0 0)` | Elevated surfaces   |
| `--text-1`    | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` | Primary text        |
| `--text-2`    | `oklch(0.556 0 0)` | `oklch(0.708 0 0)` | Secondary text      |
| `--text-3`    | `oklch(0.708 0 0)` | `oklch(0.556 0 0)` | Muted text          |
| `--primary`   | `oklch(0.205 0 0)` | `oklch(0.985 0 0)` | Brand anchor        |
| `--accent`    | `oklch(0.556 0 0)` | `oklch(0.708 0 0)` | Accent (monochrome) |
| `--border`    | `oklch(0.922 0 0)` | `oklch(0.269 0 0)` | Borders/dividers    |

### Semantic Tokens

| Token       | Light                        | Dark | Purpose               |
| :---------- | :--------------------------- | :--- | :-------------------- |
| `--success` | `oklch(0.6 0.17 162.48)`     | same | Positive status       |
| `--warning` | `oklch(0.769 0.188 70.08)`   | same | Warning state         |
| `--danger`  | `oklch(0.577 0.245 27.325)`  | same | Risk/error state      |
| `--info`    | `oklch(0.488 0.243 264.376)` | same | Informational notices |

### Typography Tokens

| Role    | Token            | Font                            |
| :------ | :--------------- | :------------------------------ |
| Heading | `--font-heading` | Geist (self-hosted, weight 300) |
| Body    | `--font-body`    | Geist (self-hosted, variable)   |
| Code    | `--font-mono`    | Geist Mono (self-hosted)        |

### Spacing, Radius, Motion

| Token             | Value                  |
| :---------------- | :--------------------- |
| `--space-1`       | `0.25rem`              |
| `--space-2`       | `0.5rem`               |
| `--space-3`       | `0.75rem`              |
| `--space-4`       | `1rem`                 |
| `--space-5`       | `1.5rem`               |
| `--space-6`       | `2rem`                 |
| `--radius-sm`     | `calc(0.625rem - 4px)` |
| `--radius-md`     | `calc(0.625rem - 2px)` |
| `--radius-lg`     | `0.625rem`             |
| `--radius-xl`     | `calc(0.625rem + 4px)` |
| `--duration-fast` | `300ms`                |
| `--duration-base` | `500ms`                |
| `--shadow-sm`     | `none`                 |
| `--shadow-md`     | `none`                 |

Motion rule: subtle only. No heavy animations. `prefers-reduced-motion` fully supported.

---

## 4) Theming Rules (Light/Dark)

1. Light and Dark must maintain proper contrast (at least WCAG AA).
2. All colors are achromatic (OKLCH chroma = 0) except semantic tokens.
3. Dark mode should not become "neon"; keep a low-noise professional UI.
4. Focus states must always be visible (keyboard-first support).
5. Dark mode toggled via `data-theme` attribute on `<html>`.

---

## 5) Component System

### Design Language

- **Border-driven elevation**: cards and surfaces use 1px borders, no shadows
- **Hover feedback**: border-color change (not color fill or lift)
- **Buttons**: primary (filled text-1), secondary (bordered), ghost (text only)
- **Tags/chips**: transparent bg + 1px border, hover border-color change

### Core UI Components

1. **Header**
   - Same logo/name across both websites
   - Short, clear, low-noise navigation

2. **Footer**
   - Unified social links
   - Unified copy tone
   - privacy/security links

3. **Buttons**
   - Primary: text-1 background + surface-1 text
   - Secondary: border only, hover border-color change
   - Ghost: text color change only

4. **Cards**
   - Transparent background + 1px border
   - Hover: border-color darkens (no shadow, no lift)

5. **Code Blocks**
   - Geist Mono
   - copy button
   - filename meta where applicable

### Domain-Specific Content Blocks (for `or`)

- **Risk → Control block**
- **Hardening Checklist**
- **CLI/Config snippet block**
- **Key Takeaways box** (up to 5 points)

---

## 6) Content Design Rules

Every technical article should follow this structure when possible:

1. Problem
2. Why it matters
3. Minimal secure setup
4. Hardening checklist
5. Common mistakes
6. Final recommendation

### Writing Rules

- Short paragraphs
- Scannable headings
- More real examples, less theory
- practical + operator-friendly tone

---

## 7) Cross-Site Consistency Checklist

### Shared (must match)

- Brand name usage
- Color tokens (monochrome OKLCH)
- Typography stack (Geist)
- Favicon/logo style
- CTA/button styles
- Social links
- OG visual style

### Different by intent

- `www`: short, conversion-oriented
- `or`: deep technical reading experience

---

## 8) SEO & Metadata Rules

1. Canonical is required for every page.
2. Blog and resume content remain canonical on `or.guetta.tech`.
3. `www` should not host duplicate Posts/Resume pages.
4. OG titles: consistent naming pattern
   - `Post Title | Or Guetta`
5. Meta descriptions should be practical, not overly promotional.

---

## 9) Accessibility Baseline

- Contrast AA minimum
- Visible focus ring (1px solid text-3)
- Full keyboard navigation
- `prefers-reduced-motion` respected
- Semantic HTML in every foundational component

---

## 10) Infrastructure Pages Policy

### Required on both domains

- Privacy
- Security disclosure path (`/security` or `/.well-known/security.txt`)
- Robots

### Required on content domain (`or`) only

- RSS
- Search/Tags/Posts archive
- Resume/Tools/About/Now

---

## 11) Implementation Plan (Practical)

### Phase 1 — Foundation (high priority)

- Freeze token naming + values
- Align header/footer visuals across both projects
- Align button and card styles

### Phase 2 — Navigation & Routing

- `www` CTAs to `or` (Blog + Resume)
- Keep user journey simple and obvious

### Phase 3 — Content UX

- add technical content blocks in `or`
- enforce article structure and checklist style

### Phase 4 — Polish

- OG consistency
- accessibility audit
- typography rhythm tuning

---

## 12) Quick Link Strategy

- Main Brand Entry: [https://www.guetta.tech](https://www.guetta.tech)
- Technical Hub: [https://or.guetta.tech](https://or.guetta.tech)

---

## Lifestyle Line

Minimalist. Practical. Resilient.  
The same consistent professional tone across technology, security, lifestyle, and training.
