import { SITE_URL } from "../consts";

export function GET() {
  return new Response(
    `User-agent: *\nAllow: /\nSitemap: ${new URL("/sitemap-index.xml", SITE_URL)}\n`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    }
  );
}
