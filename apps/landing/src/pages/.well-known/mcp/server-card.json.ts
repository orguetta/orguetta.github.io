export function GET() {
  const data = {
    serverInfo: {
      name: "guetta-tech-mcp",
      version: "1.0.0",
    },
    endpoint: "https://guetta.tech/mcp",
    capabilities: {
      tools: {},
      resources: {},
      prompts: {},
    },
  };

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
