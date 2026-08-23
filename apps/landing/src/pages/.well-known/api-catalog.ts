export function GET() {
  const data = {
    linkset: [
      {
        anchor: "https://guetta.tech/",
        "service-doc": [
          {
            href: "https://guetta.tech/security",
            type: "text/html",
          },
        ],
        "api-catalog": [
          {
            href: "https://guetta.tech/.well-known/api-catalog",
          },
        ],
        status: [
          {
            href: "https://guetta.tech/robots.txt",
          },
        ],
      },
    ],
  };

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      "Content-Type": "application/linkset+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
