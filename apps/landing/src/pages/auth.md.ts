export function GET() {
  const content = `# Authentication status

guetta.tech does not currently provide an OAuth, OpenID Connect, bearer-token registration, or anonymous token-claim service.

The public website, API catalog, and agent-skill discovery documents are available without authentication. No registration endpoint should be inferred from this document.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
