import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getGroupedSkills, SKILL_LEVEL_LABELS } from "@/lib/db";

export async function generateMetadata(): Promise<Metadata> {
  const categories = await getGroupedSkills();
  const topSkills = categories
    .flatMap((c) => c.skills.filter((s) => s.featured).map((s) => s.name))
    .slice(0, 8)
    .join(", ");

  const title = "Skills & Tech Stack | A.H.M. Saif Smran";
  const description = `Categorized engineering skills with proficiency levels: ${topSkills}, and linked project implementations.`;

  return {
    title,
    description,
    keywords: [
      "TypeScript",
      "Next.js",
      "React",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Computer Vision",
      "Python",
      "Saif Smran",
    ],
    openGraph: {
      title,
      description,
      url: "/skills",
      type: "website",
      images: [
        {
          url: "/profile-pic.png",
          alt: "A.H.M. Saif Smran Tech Stack",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/profile-pic.png"],
    },
  };
}

export default async function SkillsPage() {
  const categories = await getGroupedSkills();

  return (
    <div className="space-y-12 max-w-4xl">
      <SectionHeading
        badge="Proficiency & Tooling"
        title="Technical Skills & Competencies"
        description="Structured by domain with honest proficiency levels (Learning, Working, Proficient, Strong, Expert) and references to verified project implementations."
      />

      <div className="space-y-10">
        {categories.map((cat) => (
          <section key={cat.id} className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[var(--border)] pb-2">
              <h2 className="font-heading text-xl font-bold text-[var(--text)]">
                {cat.name}
              </h2>
              <span className="font-mono text-xs text-[var(--muted)]">
                ({cat.skills.length} technologies)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {cat.skills.map((skill) => {
                const levelLabel =
                  SKILL_LEVEL_LABELS[skill.level] || "Proficient";
                const projects = skill.projects.map((p) => p.project);

                return (
                  <Card
                    key={skill.id}
                    className="p-4 flex flex-col justify-between hover:border-[var(--accent)]/40 hover:-translate-y-1 transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-1">
                        <span className="font-heading font-bold text-sm text-[var(--text)]">
                          {skill.name}
                        </span>
                        <Badge
                          variant={skill.level >= 4 ? "accent" : "secondary"}
                          className="text-[10px] font-mono shrink-0"
                        >
                          {levelLabel}
                        </Badge>
                      </div>

                      {skill.featured && (
                        <div className="text-[10px] font-mono text-[var(--accent-2)]">
                          ★ Core Production Stack
                        </div>
                      )}
                    </div>

                    {/* Linked Projects */}
                    {projects.length > 0 ? (
                      <div className="pt-3 mt-3 border-t border-[var(--border)] font-mono text-[11px] space-y-1">
                        <span className="text-[var(--muted)] block text-[10px]">
                          Used in:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {projects.map((p) => (
                            <Link
                              key={p.slug}
                              href={`/projects/${p.slug}`}
                              className="text-[var(--accent)] hover:underline inline-flex items-center gap-0.5"
                            >
                              {p.title} <ArrowUpRight className="w-2.5 h-2.5" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="pt-3 mt-3 border-t border-[var(--border)] text-[10px] font-mono text-[var(--muted)]/60">
                        General Engineering & Tooling
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
