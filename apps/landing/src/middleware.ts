import { defineMiddleware } from "astro:middleware";

function htmlToMarkdown(html: string): string {
  // Extract main content between <main> and </main> if present, otherwise body
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  let content = mainMatch ? mainMatch[1] : html;

  // Clean up styles and scripts
  content = content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
  content = content.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");

  // Convert headings
  content = content.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "\n# $1\n");
  content = content.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "\n## $1\n");
  content = content.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "\n### $1\n");

  // Bold & Italic
  content = content.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, "**$1**");
  content = content.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, "**$1**");
  content = content.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, "*$1*");
  content = content.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, "*$1*");

  // Inline code
  content = content.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, "`$1`");

  // Links: <a href="url">text</a> -> [text](url)
  content = content.replace(
    /<a\s+[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi,
    "[$2]($1)",
  );

  // Lists and list items
  content = content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "- $1\n");
  content = content.replace(/<\/ul>/gi, "\n");
  content = content.replace(/<\/ol>/gi, "\n");

  // Replace common container/spacing tags with newlines
  content = content.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "\n$1\n");
  content = content.replace(/<div[^>]*>([\s\S]*?)<\/div>/gi, "\n$1\n");
  content = content.replace(/<section[^>]*>([\s\S]*?)<\/section>/gi, "\n$1\n");

  // Strip all other HTML tags
  content = content.replace(/<\/?[a-z0-9]+[^>]*>/gi, "");

  // Convert HTML entities
  content = content.replace(/&bull;/g, "•");
  content = content.replace(/&ndash;/g, "–");
  content = content.replace(/&mdash;/g, "—");
  content = content.replace(/&middot;/g, "·");
  content = content.replace(/&amp;/g, "&");
  content = content.replace(/&lt;/g, "<");
  content = content.replace(/&gt;/g, ">");
  content = content.replace(/&quot;/g, '"');
  content = content.replace(/&#39;/g, "'");

  // Split, trim lines, and rejoin
  let lines = content.split("\n").map((line) => line.trim());

  // Reconstruct clean lines
  let result = "";
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line) {
      result += line + "\n";
    } else {
      // Add a single empty line between content blocks if we have content
      if (result && !result.endsWith("\n\n")) {
        result += "\n";
      }
    }
  }

  return result.trim();
}

export const onRequest = defineMiddleware(async (context, next) => {
  const acceptHeader = context.request.headers.get("accept") || "";
  const wantsMarkdown = acceptHeader.includes("text/markdown");

  const response = await next();

  // If the request is for an HTML page
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("text/html")) {
    if (wantsMarkdown) {
      const html = await response.text();
      const markdown = htmlToMarkdown(html);
      const approxTokens = Math.ceil(markdown.length / 4);

      return new Response(markdown, {
        status: response.status,
        statusText: response.statusText,
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "x-markdown-tokens": approxTokens.toString(),
          "Cache-Control": "public, max-age=0, must-revalidate",
        },
      });
    } else {
      // Add Link headers for discoverability on standard HTML pages
      response.headers.set(
        "Link",
        '</.well-known/api-catalog>; rel="api-catalog", </auth.md>; rel="registration", </.well-known/agent-skills/index.json>; rel="agent-skills"',
      );
    }
  }

  return response;
});
