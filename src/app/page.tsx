import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Code2,
  Download,
  FolderGit2,
  Layers,
  Sparkles,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  getFeaturedProjects,
  getFeaturedSkills,
  getLatestPosts,
  getPrimaryResearch,
  getProfile,
  getProjectsCount,
  getSkillsCount,
} from "@/lib/db";
import { formatDate } from "@/lib/utils";

export default async function HomePage() {
  const [
    profile,
    projects,
    skills,
    research,
    posts,
    projectsCount,
    skillsCount,
  ] = await Promise.all([
    getProfile(),
    getFeaturedProjects(3),
    getFeaturedSkills(10),
    getPrimaryResearch(),
    getLatestPosts(2),
    getProjectsCount(),
    getSkillsCount(),
  ]);

  const availabilityText =
    profile?.availability === "open"
      ? profile.availabilityNote || "Open to remote internships"
      : "Currently limited";

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "A.H.M. Saif Smran",
    jobTitle: "Full-stack Developer",
    url: process.env.SITE_URL || "http://localhost:3000",
    sameAs: [
      "https://github.com/Saif-Smran",
      "https://www.linkedin.com/in/a-h-m-saif-smran",
    ],
    knowsAbout: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Computer Vision",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "IUBAT",
    },
  };

  return (
    <div className="space-y-24 md:space-y-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      {/* 1. HERO SECTION & TERMINAL CARD */}
      <section className="pt-4 md:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="accent" className="py-1 px-3 text-xs">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse inline-block" />
                {availabilityText}
              </Badge>
              <span className="text-xs font-mono text-[var(--muted)]">
                Dhaka, Bangladesh · UTC+6
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text)] leading-[1.08]">
                A.H.M. Saif Smran
              </h1>
              <p className="font-mono text-sm md:text-base text-[var(--accent)] font-medium">
                Full-stack developer. Building toward data science and research.
              </p>
            </div>

            <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed max-w-xl">
              {profile?.bio ||
                "Final-year CSE student at IUBAT. I build TypeScript applications with Next.js, Express, Prisma, and PostgreSQL, with role-based access, Stripe payments, and transactional workflows. My thesis is on tracking in high density crowds."}
            </p>

            {/* Currently line pulled from now */}
            <div className="p-3 rounded-lg border border-[var(--border)] bg-[var(--surface-2)]/40 font-mono text-xs flex items-center gap-2 max-w-xl">
              <span className="text-[var(--accent)] font-bold">currently:</span>
              <span className="text-[var(--muted)] truncate">
                Crowd tracking research on VisDrone · Final-year thesis
              </span>
              <Link
                href="/now"
                className="ml-auto text-[var(--accent-2)] hover:underline flex items-center gap-0.5 shrink-0"
              >
                /now <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button asChild size="lg" variant="primary">
                <Link href="/projects" className="gap-2">
                  View Projects <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  className="gap-2"
                  rel="noopener"
                >
                  <Download className="w-4 h-4 text-[var(--accent)]" /> Download
                  CV
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column: Terminal Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-lg overflow-hidden font-mono text-xs hover-card">
              {/* Window bar */}
              <div className="px-4 py-2.5 border-b border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block" />
                </div>
                <span className="text-[11px] text-[var(--muted)]">
                  saif@developer:~
                </span>
                <Terminal className="w-3.5 h-3.5 text-[var(--muted)]" />
              </div>

              {/* Terminal content */}
              <div className="p-5 space-y-3.5 text-[12px]">
                <div className="text-[var(--muted)]">
                  <span className="text-[var(--accent)]">$</span> cat
                  identity.json
                </div>

                <div className="space-y-2 border-l-2 border-[var(--border)] pl-3 text-[var(--text)]">
                  <div className="flex justify-between">
                    <span className="text-[var(--muted)]">role:</span>
                    <span className="font-semibold text-[var(--text)]">
                      Full-stack Developer
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--muted)]">direction:</span>
                    <span className="text-[var(--accent)]">
                      Data Science & Research
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--muted)]">core_stack:</span>
                    <span className="text-[var(--accent-2)]">
                      Next.js · Prisma · Postgres
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--muted)]">location:</span>
                    <span>Dhaka, Bangladesh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--muted)]">education:</span>
                    <span>BSc CSE, IUBAT (2027)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--muted)]">thesis:</span>
                    <span>High Density Crowd Tracking</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--muted)]">seeking:</span>
                    <span className="text-[var(--success)] font-medium">
                      Remote Internship
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between text-[11px]">
                  <span className="text-[var(--muted)]">branch: main</span>
                  <span className="text-[var(--accent)] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />{" "}
                    live
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROOF STRIP (Accurate counts from DB) */}
      <section className="border-y border-[var(--border)] py-8 bg-[var(--surface)]/40 -mx-5 md:-mx-8 px-5 md:px-8">
        <div className="max-w-[1120px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 font-mono">
          <div className="space-y-1">
            <div className="font-heading text-3xl md:text-4xl font-bold text-[var(--text)]">
              {projectsCount || 6}
            </div>
            <div className="text-xs text-[var(--muted)] uppercase tracking-wider">
              Projects Shipped
            </div>
          </div>
          <div className="space-y-1">
            <div className="font-heading text-3xl md:text-4xl font-bold text-[var(--accent)]">
              {skillsCount || 24}+
            </div>
            <div className="text-xs text-[var(--muted)] uppercase tracking-wider">
              Technologies
            </div>
          </div>
          <div className="space-y-1">
            <div className="font-heading text-3xl md:text-4xl font-bold text-[var(--accent-2)]">
              3+
            </div>
            <div className="text-xs text-[var(--muted)] uppercase tracking-wider">
              Years Coding
            </div>
          </div>
          <div className="space-y-1">
            <div className="font-heading text-3xl md:text-4xl font-bold text-[var(--text)]">
              25+
            </div>
            <div className="text-xs text-[var(--muted)] uppercase tracking-wider">
              GitHub Repos
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROJECTS (Max 3) */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <SectionHeading
            badge="Selected Work"
            title="Featured Engineering Projects"
            description="Production web applications and platforms with transactional workflows, authentication, and payment integrations."
            className="mb-0"
          />
          <Button
            asChild
            variant="outline"
            size="sm"
            className="shrink-0 self-start md:self-auto"
          >
            <Link href="/projects" className="gap-1.5">
              All Projects ({projectsCount}){" "}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* 4. RESEARCH TEASER CARD */}
      {research && (
        <section className="space-y-6">
          <SectionHeading
            badge="Academic Research"
            title="Thesis & Applied Vision"
            description="Investigating dense crowd dynamics and small-target multi-object tracking."
            className="mb-0"
          />

          <Card className="p-6 md:p-8 bg-[var(--surface)] border-[var(--border)] hover:border-[var(--accent)]/40 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="warn" className="text-xs">
                    In Progress
                  </Badge>
                  <span className="text-xs font-mono text-[var(--muted)]">
                    Target Venue: {research.venue} ({research.venueStatus})
                  </span>
                  <span className="text-xs font-mono text-[var(--border)]">
                    ·
                  </span>
                  <span className="text-xs font-mono text-[var(--muted)]">
                    Benchmark: VisDrone
                  </span>
                </div>

                <h3 className="font-heading text-xl md:text-2xl font-bold text-[var(--text)]">
                  {research.title}
                </h3>

                <p className="text-sm text-[var(--muted)] leading-relaxed max-w-2xl">
                  {research.abstract}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  <Chip>YOLOv8 / YOLO11</Chip>
                  <Chip>SAHI Patch Slicing</Chip>
                  <Chip>Flow-guided Association</Chip>
                  <Chip>Recurrent Memory (GRU)</Chip>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[var(--border)] lg:pl-6">
                <div className="font-mono text-xs text-[var(--muted)] space-y-1">
                  <div>Team size: 2 researchers</div>
                  <div>Institution: IUBAT</div>
                  <div>Focus: MOTA / IDF1 Optimization</div>
                </div>

                <Button
                  asChild
                  variant="primary"
                  size="default"
                  className="mt-2"
                >
                  <Link href="/research" className="gap-2">
                    Read Thesis Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* 5. SKILLS STRIP (Top 10 featured) */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <SectionHeading
            badge="Stack & Tools"
            title="Core Technologies"
            description="Key languages, frameworks, databases, and libraries I use daily."
            className="mb-0"
          />
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="shrink-0 self-start md:self-auto font-mono text-xs"
          >
            <Link href="/skills" className="gap-1 text-[var(--accent)]">
              View all categorized skills <ArrowRight className="w-3 h-3" />
            </Link>
          </Button>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs font-mono flex items-center gap-2 hover:border-[var(--accent)]/40 hover:-translate-y-0.5 transition-all"
            >
              <Code2 className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span className="font-medium text-[var(--text)]">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. LATEST POSTS */}
      {posts.length > 0 && (
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <SectionHeading
              badge="Engineering Notes"
              title="Recent Build Logs"
              description="Practical writeups on architectural decisions, race conditions, and research."
              className="mb-0"
            />
            <Button
              asChild
              variant="outline"
              size="sm"
              className="shrink-0 self-start md:self-auto"
            >
              <Link href="/blog" className="gap-1.5">
                All Logs <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="p-6 flex flex-col justify-between hover:border-[var(--accent)]/40 hover:-translate-y-1 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--muted)]">
                    <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="font-heading text-lg font-bold text-[var(--text)] hover:text-[var(--accent)] transition-colors">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-sm text-[var(--muted)] line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[var(--border)] flex items-center justify-between font-mono text-xs">
                  <div className="flex gap-1.5">
                    {post.tagsParsed.slice(0, 3).map((t) => (
                      <span key={t} className="text-[var(--accent-2)]">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-[var(--accent)] hover:underline inline-flex items-center gap-1"
                  >
                    Read <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* 7. CONTACT CTA */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]/60 p-8 md:p-12 text-center max-w-3xl mx-auto space-y-6">
        <Badge variant="accent" className="mx-auto text-xs py-1 px-3">
          Let&apos;s Connect
        </Badge>
        <div className="space-y-3">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--text)]">
            Interested in working together or discussing research?
          </h2>
          <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed max-w-xl mx-auto">
            I am currently open to remote internship roles, freelance
            collaborations, and discussions regarding data science and computer
            vision.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Button asChild size="lg" variant="primary">
            <Link href="/contact" className="gap-2">
              Send a Message <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <a href="mailto:smrangb@gmail.com">
              Direct Email (smrangb@gmail.com)
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
