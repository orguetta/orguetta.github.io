export function GET() {
  const data = { error: "oauth_not_supported" };

  return new Response(JSON.stringify(data, null, 2), {
    status: 404,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}
