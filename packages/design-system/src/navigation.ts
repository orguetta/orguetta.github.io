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

/** Primary navigation, in the order every guetta.tech site shows it. */
export const PRIMARY_NAV = [
  { label: "Writing", href: NAV.posts },
  { label: "Tools", href: NAV.tools },
  { label: "Resume", href: NAV.resume },
  { label: "About", href: NAV.about },
  { label: "Now", href: NAV.now },
] as const;

/** Profiles elsewhere. Also used for schema.org `sameAs`. */
export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/orguetta" },
  { label: "LinkedIn", href: "https://linkedin.com/in/orguetta" },
  { label: "X", href: "https://x.com/Guetta_Or" },
  { label: "YouTube", href: "https://www.youtube.com/@or_guetta" },
  { label: "Instagram", href: "https://www.instagram.com/orguetta/" },
  { label: "Facebook", href: "https://www.facebook.com/or1guetta/" },
] as const;

/**
 * Turn an absolute guetta.tech URL into a site-relative path when it points
 * at the site being rendered, so links stay local in dev and previews.
 * `www.` is ignored when comparing hosts.
 */
export function localizeHref(href: string, site?: URL | string): string {
  if (!site) return href;
  try {
    const target = new URL(href);
    const current = new URL(site);
    const bare = (host: string) => host.replace(/^www\./, "");
    if (bare(target.host) !== bare(current.host)) return href;
    return `${target.pathname}${target.search}${target.hash}` || "/";
  } catch {
    return href;
  }
}
