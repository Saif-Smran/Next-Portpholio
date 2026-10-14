import { z } from "zod";

export const contactMessageSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  subject: z.enum(["internship", "freelance", "research", "other"], {
    message: "Please select a valid subject",
  }),
  body: z.string().min(10, "Message must be at least 10 characters").max(3000),
  // Honeypot field (must be empty)
  website: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const projectSchema = z.object({
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  title: z.string().min(2).max(150),
  tagline: z.string().min(5).max(250),
  summary: z.string().min(10),
  problem: z.string().optional().nullable(),
  solution: z.string().optional().nullable(),
  body: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  teamSize: z.coerce.number().int().min(1).default(1),
  liveUrl: z.string().url().optional().or(z.literal("")).nullable(),
  repoUrl: z.string().url().optional().or(z.literal("")).nullable(),
  repoUrl2: z.string().url().optional().or(z.literal("")).nullable(),
  coverImage: z.string().optional().nullable(),
  featured: z.boolean().default(false),
  kind: z
    .enum(["web", "mobile", "research", "client", "academic"])
    .default("web"),
  status: z.enum(["shipped", "in_progress", "archived"]).default("shipped"),
  sortOrder: z.coerce.number().int().default(0),
  published: z.boolean().default(false),
});

export const postSchema = z.object({
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/),
  title: z.string().min(2).max(200),
  excerpt: z.string().min(10).max(500),
  body: z.string().min(20),
  coverImage: z.string().optional().nullable(),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(false),
});

export const profileSchema = z.object({
  name: z.string().min(2),
  headline: z.string().min(5),
  bio: z.string().min(10),
  location: z.string().min(2),
  email: z.string().email(),
  availability: z.enum(["open", "limited", "closed"]).default("open"),
  availabilityNote: z.string().optional().nullable(),
  resumeUrl: z.string().optional().nullable(),
  nowText: z.string().optional().nullable(),
});
