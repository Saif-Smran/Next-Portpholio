import { parseJsonSafe } from "../utils";
import { prisma } from "./prisma";

export async function getLatestPosts(limit = 2) {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });

  return posts.map((post) => ({
    ...post,
    tagsParsed: parseJsonSafe<string[]>(post.tags, []),
  }));
}

export async function listPosts(filters?: { tag?: string; search?: string }) {
  const { tag, search } = filters || {};

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { excerpt: { contains: search, mode: "insensitive" } },
              { body: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { publishedAt: "desc" },
  });

  const parsed = posts.map((post) => ({
    ...post,
    tagsParsed: parseJsonSafe<string[]>(post.tags, []),
  }));

  if (tag && tag !== "all") {
    return parsed.filter((p) => p.tagsParsed.includes(tag));
  }

  return parsed;
}

export async function getPostBySlug(slug: string) {
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) return null;

  return {
    ...post,
    tagsParsed: parseJsonSafe<string[]>(post.tags, []),
  };
}
