export function GET() {
  const data = {
    issuer: "https://guetta.tech",
    authorization_endpoint: "https://guetta.tech/oauth/authorize",
    token_endpoint: "https://guetta.tech/oauth/token",
    jwks_uri: "https://guetta.tech/oauth/jwks",
    grant_types_supported: ["client_credentials", "authorization_code"],
    response_types_supported: ["code"],
    agent_auth: {
      skill: "https://guetta.tech/.well-known/agent-skills/agent-auth",
      register_uri: "https://guetta.tech/oauth/register",
      identity_types_supported: ["anonymous"],
      anonymous: {
        credential_types_supported: ["bearer_token"],
        claim_uri: "https://guetta.tech/oauth/claim",
      },
    },
  };

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
