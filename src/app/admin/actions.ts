"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearAdminSession,
  setAdminSession,
  verifyAdminPassword,
} from "@/lib/auth";
import { prisma } from "@/lib/db";
import { checkRateLimit, resetRateLimit } from "@/lib/rate-limit";

export async function loginAdminAction(_prevState: any, formData: FormData) {
  const rawEmail = (formData.get("email") as string) || "";
  const password = (formData.get("password") as string) || "";
  const email = rawEmail.trim().toLowerCase();

  // Rate limit admin login (5 attempts per 15 minutes in prod, 50 in dev)
  const rateLimit = checkRateLimit(`login_${email}`, 5, 15 * 60 * 1000);
  if (!rateLimit.allowed) {
    return { error: "Too many failed login attempts. Please wait 15 minutes." };
  }

  const configuredEmail = (process.env.ADMIN_EMAIL || "smrangb@gmail.com")
    .trim()
    .toLowerCase();
  if (email !== configuredEmail) {
    return { error: "Invalid admin credentials." };
  }

  const isValid = await verifyAdminPassword(password);
  if (!isValid) {
    return { error: "Invalid admin credentials." };
  }

  resetRateLimit(`login_${email}`);
  await setAdminSession(email);
  redirect("/admin");
}

export async function logoutAdminAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function toggleProjectPublishAction(
  id: number,
  currentPublished: boolean,
) {
  await prisma.project.update({
    where: { id },
    data: { published: !currentPublished },
  });
  revalidatePath("/projects");
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function deleteProjectAction(id: number) {
  await prisma.project.delete({
    where: { id },
  });
  revalidatePath("/projects");
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function saveProjectAction(formData: FormData) {
  const id = formData.get("id") ? Number(formData.get("id")) : null;
  const slug = formData.get("slug") as string;
  const title = formData.get("title") as string;
  const tagline = formData.get("tagline") as string;
  const summary = formData.get("summary") as string;
  const problem = formData.get("problem") as string;
  const solution = formData.get("solution") as string;
  const body = formData.get("body") as string;
  const role = formData.get("role") as string;
  const teamSize = Number(formData.get("teamSize") || 1);
  const liveUrl = (formData.get("liveUrl") as string) || null;
  const repoUrl = (formData.get("repoUrl") as string) || null;
  const repoUrl2 = (formData.get("repoUrl2") as string) || null;
  const coverImage = (formData.get("coverImage") as string) || null;
  const kind = (formData.get("kind") as string) || "web";
  const status = (formData.get("status") as string) || "shipped";
  const featured = formData.get("featured") === "on";
  const published = formData.get("published") === "on";
  const sortOrder = Number(formData.get("sortOrder") || 0);

  const data = {
    slug,
    title,
    tagline,
    summary,
    problem,
    solution,
    body,
    role,
    teamSize,
    liveUrl,
    repoUrl,
    repoUrl2,
    coverImage,
    kind,
    status,
    featured,
    published,
    sortOrder,
  };

  if (id) {
    await prisma.project.update({
      where: { id },
      data,
    });
  } else {
    await prisma.project.create({
      data,
    });
  }

  revalidatePath("/projects");
  revalidatePath(`/projects/${slug}`);
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function savePostAction(formData: FormData) {
  const id = formData.get("id") ? Number(formData.get("id")) : null;
  const slug = formData.get("slug") as string;
  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const body = formData.get("body") as string;
  const coverImage = (formData.get("coverImage") as string) || null;
  const published = formData.get("published") === "on";
  const tagsRaw = (formData.get("tags") as string) || "";
  const tags = JSON.stringify(
    tagsRaw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
  );

  const data = {
    slug,
    title,
    excerpt,
    body,
    coverImage,
    published,
    tags,
    publishedAt: published ? new Date() : null,
  };

  if (id) {
    await prisma.post.update({
      where: { id },
      data,
    });
  } else {
    await prisma.post.create({
      data,
    });
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");
  redirect("/admin/posts");
}

export async function deletePostAction(id: number) {
  await prisma.post.delete({
    where: { id },
  });
  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath("/admin/posts");
}

export async function updateMessageStatusAction(
  id: number,
  status: "UNREAD" | "READ" | "ARCHIVED",
) {
  await prisma.message.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function deleteMessageAction(id: number) {
  await prisma.message.delete({
    where: { id },
  });
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function updateProfileAction(formData: FormData) {
  const name = formData.get("name") as string;
  const headline = formData.get("headline") as string;
  const bio = formData.get("bio") as string;
  const location = formData.get("location") as string;
  const email = formData.get("email") as string;
  const availability = formData.get("availability") as string;
  const availabilityNote = formData.get("availabilityNote") as string;
  const nowText = formData.get("nowText") as string;

  await prisma.profile.update({
    where: { id: 1 },
    data: {
      name,
      headline,
      bio,
      location,
      email,
      availability,
      availabilityNote,
      nowText,
    },
  });

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/now");
  revalidatePath("/admin/profile");
  redirect("/admin");
}
