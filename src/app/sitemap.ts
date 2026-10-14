import type { MetadataRoute } from "next";
import { listPosts, listProjects } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.SITE_URL || "http://localhost:3000";

  let projects: any[] = [];
  let posts: any[] = [];

  try {
    const [fetchedProjects, fetchedPosts] = await Promise.all([
      listProjects({ publishedOnly: true }),
      listPosts(),
    ]);
    projects = fetchedProjects;
    posts = fetchedPosts;
  } catch (err) {
    console.error("Sitemap warning: database query skipped:", err);
  }

  const staticRoutes = [
    "",
    "/projects",
    "/research",
    "/about",
    "/skills",
    "/experience",
    "/blog",
    "/now",
    "/contact",
    "/resume",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const postRoutes = posts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: p.publishedAt || p.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
