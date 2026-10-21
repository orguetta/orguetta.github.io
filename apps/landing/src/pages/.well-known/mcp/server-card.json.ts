export function GET() {
  const data = { error: "mcp_server_not_available" };

  return new Response(JSON.stringify(data, null, 2), {
    status: 404,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}
