import { prisma } from "./prisma";

export async function createMessage(data: {
  name: string;
  email: string;
  subject: string;
  body: string;
  ipHash?: string;
}) {
  return prisma.message.create({
    data: {
      name: data.name,
      email: data.email,
      subject: data.subject,
      body: data.body,
      ipHash: data.ipHash,
      status: "UNREAD",
    },
  });
}

export async function listMessages(status?: string) {
  return prisma.message.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
  });
}

export async function updateMessageStatus(
  id: number,
  status: "UNREAD" | "READ" | "ARCHIVED",
) {
  return prisma.message.update({
    where: { id },
    data: { status },
  });
}

export async function deleteMessage(id: number) {
  return prisma.message.delete({
    where: { id },
  });
}

export async function getUnreadMessagesCount() {
  return prisma.message.count({
    where: { status: "UNREAD" },
  });
}
