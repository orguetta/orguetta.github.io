export const SITE = {
  website: "https://or.guetta.tech/", // replace this with your deployed domain
  author: "Or Guetta",
  profile: "https://guetta.tech/",
  desc: "Cybersecurity and infrastructure engineering hub. Deep dives into NetScaler, ADC hardening, WAF architecture, and defensive security systems.",
  title: "Or Guetta",
  ogImage: "orguetta-cybersecurity-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 5,
  postPerPage: 10,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Edit page",
    url: "https://github.com/orguetta/orguetta.github.io/edit/main/apps/content/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Jerusalem", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
