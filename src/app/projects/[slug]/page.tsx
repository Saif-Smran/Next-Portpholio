import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GithubIcon } from "@/components/icons";
import { MarkdownBody } from "@/components/markdown-body";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { getAdjacentProjects, getProjectBySlug } from "@/lib/db";

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return { title: "Project Not Found | Saif Smran" };

  const stackNames = project.skills.map((s) => s.skill.name);
  const image = project.coverImage || "/profile-pic.png";

  return {
    title: `${project.title} | Case Study`,
    description: project.summary,
    keywords: [
      project.title,
      ...stackNames,
      "Architecture",
      "Software Engineering",
      "Saif Smran",
    ],
    openGraph: {
      title: `${project.title} - Architecture & Engineering Case Study`,
      description: project.summary,
      url: `/projects/${project.slug}`,
      type: "article",
      images: [
        {
          url: image,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Case Study`,
      description: project.summary,
      images: [image],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { prev, next } = await getAdjacentProjects(
    project.id,
    project.sortOrder,
  );
  const stack = project.skills.map((s) => s.skill.name);

  // CreativeWork JSON-LD Schema (FR-14)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.tagline,
    description: project.summary,
    url: `${process.env.SITE_URL || "http://localhost:3000"}/projects/${project.slug}`,
    creator: {
      "@type": "Person",
      name: "A.H.M. Saif Smran",
    },
  };

  return (
    <article className="space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Back button */}
      <div>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="font-mono text-xs text-[var(--muted)] hover:text-[var(--text)]"
        >
          <Link href="/projects" className="gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to all projects
          </Link>
        </Button>
      </div>

      {/* 1. Header & Title & One-liner */}
      <header className="space-y-4 border-b border-[var(--border)] pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent" className="text-xs uppercase font-mono">
            {project.kind}
          </Badge>
          <Badge
            variant={project.status === "shipped" ? "success" : "warn"}
            className="text-xs font-mono"
          >
            {project.status === "shipped"
              ? "Shipped Production"
              : "In Development"}
          </Badge>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text)]">
          {project.title}
        </h1>

        <p className="font-mono text-base md:text-lg text-[var(--accent-2)]">
          {project.tagline}
        </p>

        {/* 2 & 3. Meta strip (Role, Team, Links) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[var(--border)] text-xs font-mono">
          <div>
            <span className="text-[var(--muted)] block">Role</span>
            <span className="text-[var(--text)] font-semibold">
              {project.role || "Full-stack Developer"}
            </span>
          </div>
          <div>
            <span className="text-[var(--muted)] block">Team Size</span>
            <span className="text-[var(--text)] font-semibold">
              {project.teamSize}{" "}
              {project.teamSize === 1 ? "person (Solo)" : "people"}
            </span>
          </div>
          <div>
            <span className="text-[var(--muted)] block">Timeline</span>
            <span className="text-[var(--text)] font-semibold">
              2024 - 2025
            </span>
          </div>
          <div>
            <span className="text-[var(--muted)] block">Code Status</span>
            <span className="text-[var(--success)] font-semibold">Active</span>
          </div>
        </div>

        {/* 4. Action Buttons (Live Link / GitHub Repos) */}
        <div className="flex flex-wrap gap-3 pt-3">
          {project.liveUrl && (
            <Button asChild size="default" variant="primary">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="gap-2"
              >
                Live Deployment <ArrowUpRight className="w-4 h-4" />
              </a>
            </Button>
          )}
          {project.repoUrl && (
            <Button asChild size="default" variant="secondary">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="gap-2"
              >
                <GithubIcon className="w-4 h-4" />{" "}
                {project.repoUrl2 ? "Frontend Repo" : "GitHub Repository"}
              </a>
            </Button>
          )}
          {project.repoUrl2 && (
            <Button asChild size="default" variant="outline">
              <a
                href={project.repoUrl2}
                target="_blank"
                rel="noreferrer"
                className="gap-2"
              >
                <GithubIcon className="w-4 h-4" /> Backend Repo
              </a>
            </Button>
          )}
        </div>
      </header>

      {/* Hero Cover Image */}
      {project.coverImage && (
        <div
          className="relative aspect-video w-full rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--surface-2)]"
          style={{ position: "relative" }}
        >
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1120px) 100vw, 1120px"
          />
        </div>
      )}

      {/* Main Layout: Sticky TOC Left (Desktop), 720px Content Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sticky Table of Contents (Desktop) */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-24 space-y-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs font-mono">
            <div className="font-bold text-[var(--accent)] uppercase tracking-wider text-[11px] pb-1 border-b border-[var(--border)]">
              Table of Contents
            </div>
            <nav className="space-y-2">
              <a
                href="#overview"
                className="block text-[var(--muted)] hover:text-[var(--text)] transition-colors"
              >
                1. Overview & Summary
              </a>
              {project.problem && (
                <a
                  href="#problem"
                  className="block text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                >
                  2. The Core Problem
                </a>
              )}
              {project.solution && (
                <a
                  href="#solution"
                  className="block text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                >
                  3. Architecture & Solution
                </a>
              )}
              {project.body && (
                <a
                  href="#deep-dive"
                  className="block text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                >
                  4. Engineering Deep-Dive
                </a>
              )}
              <a
                href="#tech-stack"
                className="block text-[var(--muted)] hover:text-[var(--text)] transition-colors"
              >
                5. Complete Tech Stack
              </a>
            </nav>
          </div>
        </aside>

        {/* Content Body (max 720px wide) */}
        <div className="lg:col-span-9 max-w-[720px] space-y-12">
          {/* Summary */}
          <section id="overview" className="space-y-4">
            <h2 className="font-heading text-xl md:text-2xl font-bold text-[var(--text)] border-b border-[var(--border)] pb-2">
              Overview
            </h2>
            <p className="text-sm md:text-base text-[var(--text)]/90 leading-relaxed">
              {project.summary}
            </p>
          </section>

          {/* 5. Problem */}
          {project.problem && (
            <section id="problem" className="space-y-4">
              <h2 className="font-heading text-xl md:text-2xl font-bold text-[var(--text)] border-b border-[var(--border)] pb-2">
                The Problem
              </h2>
              <div className="p-5 rounded-xl border border-[var(--danger)]/20 bg-[var(--danger)]/5 text-sm md:text-base leading-relaxed text-[var(--text)]/90">
                {project.problem}
              </div>
            </section>
          )}

          {/* 6. Solution */}
          {project.solution && (
            <section id="solution" className="space-y-4">
              <h2 className="font-heading text-xl md:text-2xl font-bold text-[var(--text)] border-b border-[var(--border)] pb-2">
                The Engineered Solution
              </h2>
              <div className="p-5 rounded-xl border border-[var(--success)]/20 bg-[var(--success)]/5 text-sm md:text-base leading-relaxed text-[var(--text)]/90">
                {project.solution}
              </div>
            </section>
          )}

          {/* 7, 8, 9. Engineering Deep Dive (Markdown Body) */}
          {project.body && (
            <section id="deep-dive" className="space-y-4">
              <MarkdownBody content={project.body} />
            </section>
          )}

          {/* 10. Tech Stack Chips */}
          <section id="tech-stack" className="space-y-4">
            <h2 className="font-heading text-xl md:text-2xl font-bold text-[var(--text)] border-b border-[var(--border)] pb-2">
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-2 pt-1">
              {stack.map((item) => (
                <Chip key={item} className="text-xs py-1 px-3">
                  {item}
                </Chip>
              ))}
            </div>
          </section>

          {/* 14. Next / Previous Project Navigation */}
          <nav className="pt-8 border-t border-[var(--border)] grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            {prev ? (
              <Link
                href={`/projects/${prev.slug}`}
                className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)]/40 transition-all flex flex-col gap-1 group"
              >
                <span className="text-[var(--muted)] flex items-center gap-1 group-hover:text-[var(--accent)]">
                  <ArrowLeft className="w-3.5 h-3.5" /> Previous Project
                </span>
                <span className="font-heading text-sm font-bold text-[var(--text)]">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link
                href={`/projects/${next.slug}`}
                className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)]/40 transition-all flex flex-col gap-1 text-right group"
              >
                <span className="text-[var(--muted)] flex items-center justify-end gap-1 group-hover:text-[var(--accent)]">
                  Next Project <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="font-heading text-sm font-bold text-[var(--text)]">
                  {next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </div>
      </div>
    </article>
  );
}
