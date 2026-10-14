import { parseJsonSafe } from "../utils";
import { prisma } from "./prisma";

export async function listEducation() {
  const educationList = await prisma.education.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return educationList.map((edu) => ({
    ...edu,
    courseworkParsed: parseJsonSafe<string[]>(edu.coursework, []),
  }));
}
