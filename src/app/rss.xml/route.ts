import { listPosts } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const baseUrl = process.env.SITE_URL || "http://localhost:3000";
  let posts: any[] = [];
  try {
    posts = await listPosts();
  } catch (err) {
    console.error("RSS query warning:", err);
  }

  const itemsXml = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${post.publishedAt ? new Date(post.publishedAt).toUTCString() : new Date().toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>A.H.M. Saif Smran | Engineering Blog</title>
    <link>${baseUrl}</link>
    <description>Articles and build logs on full-stack web development and computer vision research.</description>
    <language>en</language>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
