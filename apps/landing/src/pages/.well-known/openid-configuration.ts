export function GET() {
  const data = {
    issuer: "https://guetta.tech",
    authorization_endpoint: "https://guetta.tech/oauth/authorize",
    token_endpoint: "https://guetta.tech/oauth/token",
    userinfo_endpoint: "https://guetta.tech/oauth/userinfo",
    jwks_uri: "https://guetta.tech/oauth/jwks",
    response_types_supported: ["code", "token", "id_token"],
    subject_types_supported: ["public"],
    id_token_signing_alg_values_supported: ["RS256"],
  };

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
