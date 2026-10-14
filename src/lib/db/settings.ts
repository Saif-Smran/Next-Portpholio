import { parseJsonSafe } from "../utils";
import { prisma } from "./prisma";

export async function getSetting<T>(key: string, fallback: T): Promise<T> {
  const row = await prisma.setting.findUnique({
    where: { key },
  });
  if (!row) return fallback;
  return parseJsonSafe<T>(row.value, fallback);
}

export async function setSetting<T>(key: string, value: T) {
  return prisma.setting.upsert({
    where: { key },
    update: {
      value: JSON.stringify(value),
    },
    create: {
      key,
      value: JSON.stringify(value),
    },
  });
}
