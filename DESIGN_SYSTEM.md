# Design System — Or Guetta

> Version: 2.0  
> Last Updated: 2026-04-04

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

> These colors match what is already defined in `src/styles/global.css` in the main project.

### Color Tokens

| Token         | Light     | Dark      | Usage                      |
| :------------ | :-------- | :-------- | :------------------------- |
| `--surface-1` | `#FAFAF0` | `#121212` | Page background            |
| `--surface-2` | `#F3F2E7` | `#171A20` | Cards/Panels               |
| `--surface-3` | `#ECEBDD` | `#1F2430` | Elevated surfaces          |
| `--text-1`    | `#1F2430` | `#ECEFF6` | Primary text               |
| `--text-2`    | `#4B5260` | `#C5CBDA` | Secondary text             |
| `--text-3`    | `#727A89` | `#99A2B6` | Muted text                 |
| `--primary`   | `#1B2B4D` | `#FAFAF0` | Headings/brand anchors     |
| `--accent`    | `#7B8A4B` | `#7B8A4B` | Links/buttons/active state |
| `--border`    | `#D1D1CA` | `#333333` | Borders/dividers           |

### Semantic Tokens

| Token       | Light     | Dark      | Purpose               |
| :---------- | :-------- | :-------- | :-------------------- |
| `--success` | `#2E7D32` | `#66BB6A` | Positive status       |
| `--warning` | `#B26A00` | `#F2A93B` | Warning state         |
| `--danger`  | `#C62828` | `#EF5350` | Risk/error state      |
| `--info`    | `#1565C0` | `#64B5F6` | Informational notices |

### Typography Tokens

| Role    | Token            | Font       |
| :------ | :--------------- | :--------- |
| Heading | `--font-heading` | Montserrat |
| Body    | `--font-body`    | Inter      |
| Code    | `--font-mono`    | Fira Code  |

### Spacing, Radius, Motion

| Token             | Value      |
| :---------------- | :--------- |
| `--space-1`       | `0.25rem`  |
| `--space-2`       | `0.5rem`   |
| `--space-3`       | `0.75rem`  |
| `--space-4`       | `1rem`     |
| `--space-5`       | `1.5rem`   |
| `--space-6`       | `2rem`     |
| `--radius-sm`     | `0.375rem` |
| `--radius-md`     | `0.625rem` |
| `--radius-lg`     | `0.875rem` |
| `--duration-fast` | `120ms`    |
| `--duration-base` | `200ms`    |

Motion rule: subtle only. No heavy animations.

---

## 4) Theming Rules (Light/Dark)

1. Light and Dark must maintain proper contrast (at least WCAG AA).
2. Accent (`#7B8A4B`) stays fixed to preserve brand recognition.
3. Dark mode should not become "neon"; keep a low-noise professional UI.
4. Focus states must always be visible (keyboard-first support).

---

## 5) Component System

### Core UI Components

1. **Header**
   - Same logo/name across both websites
   - Short, clear, low-noise navigation

2. **Footer**
   - Unified social links
   - Unified copy tone
   - privacy/security links

3. **Buttons**
   - Primary: Accent background + high contrast text
   - Secondary: Outline (accent/border)
   - Ghost: minimal action

4. **Cards**
   - surface-2 + border + subtle hover-lift
   - Consistent use for post/link cards

5. **Code Blocks**
   - Fira Code
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
- Color tokens
- Typography stack
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
- Visible focus ring
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
