export function GET() {
  const content = `# WebMCP Navigation Skill

This skill allows agents to navigate and query the professional portfolio site of Or Guetta.

## Usage

Agents can load the page in a WebMCP-enabled browser to automatically discover and interact with the registered tools.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
