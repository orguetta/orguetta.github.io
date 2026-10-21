export function GET() {
  const data = {
    linkset: [
      {
        anchor: "https://www.guetta.tech/",
        "service-doc": [
          {
            href: "https://www.guetta.tech/security",
            type: "text/html",
          },
        ],
        "api-catalog": [
          {
            href: "https://www.guetta.tech/.well-known/api-catalog",
          },
        ],
        status: [
          {
            href: "https://www.guetta.tech/robots.txt",
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
