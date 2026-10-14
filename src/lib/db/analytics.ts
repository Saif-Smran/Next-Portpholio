import { prisma } from "./prisma";

export async function recordPageView(data: {
  path: string;
  referrerHost?: string | null;
  visitorHash: string;
}) {
  return prisma.pageView.create({
    data: {
      path: data.path,
      referrerHost: data.referrerHost,
      visitorHash: data.visitorHash,
    },
  });
}

export async function getAnalyticsSummary(days = 30) {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const views = await prisma.pageView.findMany({
    where: {
      createdAt: { gte: since },
    },
    orderBy: { createdAt: "desc" },
  });

  const totalViews = views.length;
  const uniqueVisitors = new Set(views.map((v) => v.visitorHash)).size;

  // Group by path
  const pathCounts: Record<string, number> = {};
  for (const v of views) {
    pathCounts[v.path] = (pathCounts[v.path] || 0) + 1;
  }
  const topPages = Object.entries(pathCounts)
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Group by referrer
  const refCounts: Record<string, number> = {};
  for (const v of views) {
    const host = v.referrerHost || "Direct";
    refCounts[host] = (refCounts[host] || 0) + 1;
  }
  const topReferrers = Object.entries(refCounts)
    .map(([host, count]) => ({ host, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return {
    totalViews,
    uniqueVisitors,
    topPages,
    topReferrers,
  };
}
