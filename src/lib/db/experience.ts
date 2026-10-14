import { prisma } from "./prisma";

export async function listExperiences() {
  return prisma.experience.findMany({
    where: { published: true },
    orderBy: { startDate: "desc" },
  });
}

export async function listCertifications() {
  return prisma.certification.findMany({
    orderBy: { sortOrder: "asc" },
  });
}
