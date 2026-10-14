import { Search } from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import { getGroupedSkills, listProjects } from "@/lib/db";

interface ProjectsPageProps {
  searchParams: Promise<{
    stack?: string;
    kind?: string;
    q?: string;
  }>;
}

export const metadata = {
  title: "Projects",
  description:
    "Full-stack web applications, platforms, and research prototypes built with Next.js, Express, and PostgreSQL.",
};

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const resolvedParams = await searchParams;
  const currentStack = resolvedParams.stack || "all";
  const currentKind = resolvedParams.kind || "all";
  const searchQuery = resolvedParams.q || "";

  const [projects, categories] = await Promise.all([
    listProjects({
      stack: currentStack,
      kind: currentKind,
      search: searchQuery,
      publishedOnly: true,
    }),
    getGroupedSkills(),
  ]);

  // Extract all unique stack skills
  const allSkills = categories.flatMap((c) => c.skills.map((s) => s.name));
  const popularStacks = [
    "all",
    "Next.js",
    "React",
    "TypeScript",
    "PostgreSQL",
    "Prisma",
    "Express.js",
    "Django",
    "Python",
  ];

  const kinds = [
    { id: "all", label: "All Kinds" },
    { id: "web", label: "Web Applications" },
    { id: "mobile", label: "Mobile" },
    { id: "client", label: "Client / Capstone" },
    { id: "academic", label: "Academic" },
  ];

  return (
    <div className="space-y-10">
      <SectionHeading
        badge="Portfolio"
        title="Engineering Projects & Case Studies"
        description="Filterable index of shipped full-stack platforms, client projects, and software architectures."
      />

      {/* Filter and Search Bar (Server-rendered via URL search params) */}
      <div className="space-y-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
        {/* Search input form */}
        <form method="GET" action="/projects" className="relative flex-1">
          <input type="hidden" name="stack" value={currentStack} />
          <input type="hidden" name="kind" value={currentKind} />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
          <input
            type="text"
            name="q"
            defaultValue={searchQuery}
            placeholder="Search by title, tagline, or problem statement..."
            className="w-full h-10 pl-10 pr-4 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-sans text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
        </form>

        {/* Kind Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[var(--border)]">
          <span className="text-xs font-mono text-[var(--muted)] mr-1">
            Kind:
          </span>
          {kinds.map((k) => {
            const isActive = currentKind === k.id;
            const queryObj: Record<string, string> = {};
            if (k.id !== "all") queryObj.kind = k.id;
            if (currentStack !== "all") queryObj.stack = currentStack;
            if (searchQuery) queryObj.q = searchQuery;

            const href =
              Object.keys(queryObj).length > 0
                ? `/projects?${new URLSearchParams(queryObj).toString()}`
                : "/projects";

            return (
              <Link key={k.id} href={href}>
                <Chip active={isActive} className="text-xs">
                  {k.label}
                </Chip>
              </Link>
            );
          })}
        </div>

        {/* Tech Stack Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[var(--border)]">
          <span className="text-xs font-mono text-[var(--muted)] mr-1">
            Stack:
          </span>
          {popularStacks.map((s) => {
            const isActive = currentStack.toLowerCase() === s.toLowerCase();
            const queryObj: Record<string, string> = {};
            if (currentKind !== "all") queryObj.kind = currentKind;
            if (s !== "all") queryObj.stack = s;
            if (searchQuery) queryObj.q = searchQuery;

            const href =
              Object.keys(queryObj).length > 0
                ? `/projects?${new URLSearchParams(queryObj).toString()}`
                : "/projects";

            return (
              <Link key={s} href={href}>
                <Chip active={isActive} className="text-xs">
                  {s === "all" ? "All Stacks" : s}
                </Chip>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No projects match your filter"
          description="Try selecting a different technology stack, category, or clear your search term."
          action={
            <Button asChild variant="outline">
              <Link href="/projects">Reset all filters</Link>
            </Button>
          }
        />
      )}
    </div>
  );
}
