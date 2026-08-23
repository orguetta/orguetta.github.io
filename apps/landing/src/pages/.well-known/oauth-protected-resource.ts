export function GET() {
  const data = {
    resource: "https://guetta.tech",
    authorization_servers: ["https://guetta.tech"],
    scopes_supported: ["read", "write"],
    bearer_methods_supported: ["header"],
  };

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
