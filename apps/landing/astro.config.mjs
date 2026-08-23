// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";
import umami from "@yeskunall/astro-umami";

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: "https://guetta.tech",
  integrations: [
    sitemap(),
    umami({
      id: "dc55a6e7-af95-461b-96ee-0db172b4c30b",
      hostUrl: "https://umami.guetta.tech",
      endpointUrl: "https://umami.guetta.tech",
      doNotTrack: true,
    }),
  ],
  adapter: cloudflare({
    imageService: "compile",
  }),
});
