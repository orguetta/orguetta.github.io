/**
 * Guetta Design System — brand and cross-domain navigation contract.
 *
 * Canonical domains:
 *  - guetta.tech      professional landing (apps/landing, Workers)
 *  - or.guetta.tech   writing hub (apps/content, GitHub Pages)
 */

export const BRAND = {
  name: "Or Guetta",
  email: "or@guetta.tech",
  securityEmail: "security@guetta.tech",
} as const;

export const DOMAINS = {
  landing: "https://guetta.tech",
  content: "https://or.guetta.tech",
} as const;

export const NAV = {
  home: DOMAINS.landing,
  resume: `${DOMAINS.landing}/resume`,
  privacy: `${DOMAINS.landing}/privacy`,
  security: `${DOMAINS.landing}/security`,
  posts: `${DOMAINS.content}/posts`,
  tags: `${DOMAINS.content}/tags`,
  archives: `${DOMAINS.content}/archives`,
  search: `${DOMAINS.content}/search`,
  tools: `${DOMAINS.content}/tools`,
  about: `${DOMAINS.content}/about`,
  now: `${DOMAINS.content}/now`,
} as const;
