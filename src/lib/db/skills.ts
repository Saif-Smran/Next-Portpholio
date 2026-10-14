import { prisma } from "./prisma";

export const SKILL_LEVEL_LABELS: Record<number, string> = {
  1: "Learning",
  2: "Working",
  3: "Proficient",
  4: "Strong",
  5: "Expert",
};

export async function getFeaturedSkills(limit = 10) {
  return prisma.skill.findMany({
    where: { featured: true },
    orderBy: [{ level: "desc" }, { name: "asc" }],
    take: limit,
  });
}

export async function getGroupedSkills() {
  return prisma.skillCategory.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      skills: {
        orderBy: [{ level: "desc" }, { name: "asc" }],
        include: {
          projects: {
            where: {
              project: { published: true },
            },
            include: {
              project: {
                select: {
                  slug: true,
                  title: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

export async function getSkillsCount() {
  return prisma.skill.count();
}
