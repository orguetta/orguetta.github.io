export function GET() {
  const data = {
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills: [
      {
        name: "webmcp-navigation",
        type: "skill-md",
        description:
          "Allows agents to navigate and query Or Guetta's professional portfolio site.",
        url: "https://guetta.tech/.well-known/agent-skills/webmcp-navigation.md",
        digest:
          "sha256:273f359ea82cd84ca667e82f5d08088fb33133d679def3aa51cbfe62e7aac7e1",
      },
    ],
  };

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
