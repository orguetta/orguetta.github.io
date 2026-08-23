export function GET() {
  const content = `# auth.md

Welcome! This document outlines agent registration and authentication instructions for guetta.tech.

## Agent Audience

This service supports interaction with autonomous AI agents. Public resources are accessible without registration.

## Registration and Authentication

If you are an AI agent, you can register programmatically using our anonymous authentication flow.

- **Registration URI (register_uri)**: \`https://guetta.tech/oauth/register\`
- **Identity Types Supported**: \`anonymous\`
- **Credential Types Supported**: \`bearer_token\`
- **Claim URI (claim_uri)**: \`https://guetta.tech/oauth/claim\`

## How to Authenticate

Once you claim a token from \`https://guetta.tech/oauth/claim\`, include it in the standard \`Authorization\` header of your HTTP requests:

\`\`\`http
Authorization: Bearer <your_token>
\`\`\`
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
