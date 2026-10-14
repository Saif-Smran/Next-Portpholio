import { prisma } from "./prisma";

export async function getPrimaryResearch() {
  return prisma.research.findFirst({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function listResearch() {
  return prisma.research.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getResearchBySlug(slug: string) {
  return prisma.research.findUnique({
    where: { slug },
  });
}
