export const SITE = {
  website: "https://orguetta.github.io/", // replace this with your deployed domain
  author: "Or Guetta",
  profile: "https://orguetta.github.io/",
  desc: "Cybersecurity expert, application security specialist, and digital nomad. I build and break things to make the web more secure.",
  title: "Or Guetta",
  ogImage: "orguetta-cybersecurity-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Edit page",
    url: "https://github.com/orguetta/edit/main/src/data/blog/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Jerusalem", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
