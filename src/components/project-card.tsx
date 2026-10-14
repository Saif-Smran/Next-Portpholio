import { ArrowUpRight, Folder } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GithubIcon } from "./icons";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Chip } from "./ui/chip";

interface ProjectCardProps {
  project: {
    slug: string;
    title: string;
    tagline: string;
    summary: string;
    coverImage: string | null;
    liveUrl: string | null;
    repoUrl: string | null;
    kind: string;
    status: string;
    skills?: Array<{
      skill: {
        name: string;
      };
    }>;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const stack = project.skills?.map((s) => s.skill.name).slice(0, 4) || [];

  return (
    <Card className="flex flex-col justify-between overflow-hidden group hover:border-[var(--accent)]/40 hover:-translate-y-1 transition-all duration-200">
      <div>
        {/* Cover image or fallback */}
        <Link
          href={`/projects/${project.slug}`}
          className="block relative aspect-video w-full overflow-hidden bg-[var(--surface-2)]"
          style={{ position: "relative" }}
        >
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[var(--muted)]">
              <Folder className="w-12 h-12 opacity-30" />
            </div>
          )}
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge
              variant="default"
              className="bg-[var(--bage)]/70 backdrop-blur-md text-[var(--bageText)] border-white/10 uppercase text-[10px]"
            >
              {project.kind}
            </Badge>
            {project.status === "in_progress" && (
              <Badge
                variant="warn"
                className="bg-amber-950/80 backdrop-blur-md border-amber-500/30 text-[10px]"
              >
                In Progress
              </Badge>
            )}
          </div>
        </Link>

        {/* Card Content */}
        <div className="p-5 md:p-6 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <Link href={`/projects/${project.slug}`}>
              <h3 className="font-heading text-lg font-bold group-hover:text-[var(--accent)] transition-colors flex items-center gap-1.5">
                {project.title}
                <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[var(--accent)]" />
              </h3>
            </Link>
          </div>

          <p className="text-xs font-mono text-[var(--accent-2)]">
            {project.tagline}
          </p>

          <p className="text-sm text-[var(--muted)] line-clamp-2 leading-relaxed">
            {project.summary}
          </p>

          {/* Tech Stack Chips */}
          {stack.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {stack.map((item) => (
                <Chip key={item} className="text-[11px] py-0.5 px-2">
                  {item}
                </Chip>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Links */}
      <div className="px-5 md:px-6 py-3 border-t border-[var(--border)] bg-[var(--surface-2)]/40 flex items-center justify-between text-xs font-mono">
        <Link
          href={`/projects/${project.slug}`}
          className="text-[var(--accent)] hover:underline inline-flex items-center gap-1"
        >
          Case Study <ArrowUpRight className="w-3 h-3" />
        </Link>

        <div className="flex items-center gap-3">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--muted)] hover:text-[var(--text)] transition-colors inline-flex items-center gap-1"
              title="GitHub Repository"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--muted)] hover:text-[var(--text)] transition-colors inline-flex items-center gap-1"
              title="Live Demo"
            >
              <ArrowUpRight className="w-3.5 h-3.5" /> Live
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
