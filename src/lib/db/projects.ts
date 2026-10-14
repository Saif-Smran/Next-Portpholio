import { prisma } from "./prisma";

export async function getFeaturedProjects(limit = 3) {
  return prisma.project.findMany({
    where: {
      published: true,
      featured: true,
    },
    orderBy: { sortOrder: "asc" },
    take: limit,
    include: {
      skills: {
        include: {
          skill: true,
        },
      },
      media: {
        orderBy: { sortOrder: "asc" },
      },
    },
  });
}

export async function listProjects(filters?: {
  stack?: string;
  kind?: string;
  search?: string;
  publishedOnly?: boolean;
}) {
  const { stack, kind, search, publishedOnly = true } = filters || {};

  return prisma.project.findMany({
    where: {
      ...(publishedOnly ? { published: true } : {}),
      ...(kind && kind !== "all" ? { kind } : {}),
      ...(stack && stack !== "all"
        ? {
            skills: {
              some: {
                skill: {
                  name: {
                    equals: stack,
                    mode: "insensitive",
                  },
                },
              },
            },
          }
        : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { tagline: { contains: search, mode: "insensitive" } },
              { summary: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { sortOrder: "asc" },
    include: {
      skills: {
        include: {
          skill: true,
        },
      },
      media: {
        orderBy: { sortOrder: "asc" },
      },
    },
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
    include: {
      skills: {
        include: {
          skill: true,
        },
      },
      media: {
        orderBy: { sortOrder: "asc" },
      },
      testimonials: {
        where: { approved: true },
        orderBy: { sortOrder: "asc" },
      },
    },
  });
}

export async function getAdjacentProjects(
  currentId: number,
  sortOrder: number,
) {
  const [prev, next] = await Promise.all([
    prisma.project.findFirst({
      where: {
        published: true,
        sortOrder: { lt: sortOrder },
        id: { not: currentId },
      },
      orderBy: { sortOrder: "desc" },
      select: { slug: true, title: true, tagline: true },
    }),
    prisma.project.findFirst({
      where: {
        published: true,
        sortOrder: { gt: sortOrder },
        id: { not: currentId },
      },
      orderBy: { sortOrder: "asc" },
      select: { slug: true, title: true, tagline: true },
    }),
  ]);

  return { prev, next };
}

export async function getProjectsCount() {
  return prisma.project.count({
    where: { published: true },
  });
}
