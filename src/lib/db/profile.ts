import { prisma } from "./prisma";

export async function getProfile() {
  const profile = await prisma.profile.findFirst({
    where: { id: 1 },
  });
  return profile;
}

export async function getSocialLinks() {
  return prisma.socialLink.findMany({
    orderBy: { sortOrder: "asc" },
  });
}
