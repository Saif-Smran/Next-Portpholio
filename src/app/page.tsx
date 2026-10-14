import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Code2,
  Download,
  FolderGit2,
  Layers,
  Mail,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  FacebookIcon,
  GithubIcon,
  LinkedinIcon,
  WhatsAppIcon,
} from "@/components/icons";
// import { IdentityCard } from "@/components/identityCard";
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

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const title = "A.H.M. Saif Smran | Full-stack Developer & Researcher";
  const description =
    profile?.bio ||
    "Full-stack developer building robust TypeScript applications with Next.js, Express, Prisma, and PostgreSQL. Researching crowd tracking with computer vision.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "/",
      type: "website",
      images: [
        {
          url: "/profile-pic.png",
          width: 800,
          height: 800,
          alt: "A.H.M. Saif Smran - Full-stack Developer",
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
      <section className="relative pt-4 md:pt-10">
        {/* Ambient background glows */}
        <div className="absolute -top-16 -left-10 w-72 h-72 md:w-96 md:h-96 bg-[var(--accent)]/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-10 right-0 w-72 h-72 md:w-80 md:h-80 bg-[var(--accent-2)]/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text Column (Takes 6 cols = half width on desktop) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Status Pill & Location */}
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant="accent"
                className="py-1 px-3 text-xs shadow-sm bg-[var(--accent)]/15 border-[var(--accent)]/30 text-[var(--accent)]"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse inline-block mr-1.5" />
                {availabilityText}
              </Badge>
              <div className="text-xs font-mono text-[var(--muted)] flex items-center gap-1.5 bg-[var(--surface-2)]/70 px-2.5 py-1 rounded-full border border-[var(--border)]">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent-2)]" />
                <span>Dhaka, Bangladesh · UTC+6</span>
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text)] leading-[1.08]">
                A.H.M. Saif Smran
              </h1>
              <p className="font-mono text-sm md:text-base text-[var(--accent)] font-medium flex items-center gap-2">
                <span className="inline-block w-2.5 h-0.5 bg-[var(--accent)]" />
                <span>Full-stack developer · Computer vision researcher</span>
              </p>
            </div>

            <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed max-w-xl">
              {profile?.bio ||
                "Final-year CSE student at IUBAT. I build TypeScript applications with Next.js, Express, Prisma, and PostgreSQL, with role-based access, Stripe payments, and transactional workflows. My thesis is on tracking in high density crowds."}
            </p>

            {/* Currently line pulled from now */}
            <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/60 font-mono text-xs flex items-center gap-2 max-w-xl shadow-sm hover:border-[var(--accent)]/40 transition-colors">
              <span className="text-[var(--accent)] font-bold">currently:</span>
              <span className="text-[var(--muted)] truncate">
                Crowd tracking research on VisDrone · Final-year thesis
              </span>
              <Link
                href="/now"
                className="ml-auto text-[var(--accent-2)] hover:underline flex items-center gap-0.5 shrink-0 font-semibold"
              >
                /now <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button
                asChild
                size="lg"
                variant="primary"
                className="shadow-lg shadow-[var(--accent)]/15"
              >
                <Link href="/projects" className="gap-2">
                  View Projects <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="border-[var(--border)] hover:border-[var(--accent)]"
              >
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
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-[var(--muted)] hover:text-[var(--text)]"
              >
                <Link href="/contact" className="gap-1.5">
                  <Mail className="w-4 h-4 text-[var(--accent-2)]" /> Get in
                  Touch
                </Link>
              </Button>
            </div>

            {/* Quick Social & Contact Channels */}
            <div className="pt-2 flex flex-wrap items-center gap-2 font-mono text-xs text-[var(--muted)]">
              <span className="text-[11px] text-[var(--muted)]/70">
                Connect:
              </span>
              <a
                href="https://github.com/Saif-Smran"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--text)] transition-colors inline-flex items-center gap-1.5"
                title="GitHub"
              >
                <GithubIcon className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span className="hidden sm:inline text-[11px]">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/a-h-m-saif-smran"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] hover:border-[var(--accent-2)] hover:text-[var(--text)] transition-colors inline-flex items-center gap-1.5"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-[var(--accent-2)]" />
                <span className="hidden sm:inline text-[11px]">LinkedIn</span>
              </a>
              <a
                href="https://www.facebook.com/saif.smran.1"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] hover:border-blue-400 hover:text-blue-400 transition-colors inline-flex items-center gap-1.5"
                title="Facebook"
              >
                <FacebookIcon className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline text-[11px]">Facebook</span>
              </a>
              <a
                href="https://wa.me/8801521468295"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] hover:border-emerald-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
                title="WhatsApp"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline text-[11px]">WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Profile Image (Takes 6 cols = half width on desktop) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[460px] aspect-square group">
              {/* Vibrant multi-layer ambient glow halos */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[var(--accent)]/30 via-emerald-500/20 to-[var(--accent-2)]/30 blur-2xl opacity-75 group-hover:opacity-100 transition duration-500" />
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[var(--accent)] via-[var(--accent-2)] to-emerald-400 opacity-60 blur-sm" />

              {/* Main image container taking full half width */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-[var(--border)] bg-[var(--surface-2)] shadow-2xl">
                <Image
                  src="/profile-pic.png"
                  alt="A.H.M. Saif Smran"
                  width={500}
                  height={500}
                  priority
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />

                {/* Top-right floating status badge */}
                <div className="absolute top-4 right-4 bg-[var(--surface)]/90 backdrop-blur-md border border-[var(--border)] px-3.5 py-1.5 rounded-full font-mono text-xs flex items-center gap-2 shadow-xl">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--success)] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--success)]" />
                  </span>
                  <span className="text-[var(--text)] font-semibold text-[11px]">
                    Available for work
                  </span>
                </div>

                {/* Bottom glassmorphic identity tag */}
                <div className="absolute bottom-4 inset-x-4 p-3.5 rounded-2xl bg-[var(--surface)]/90 backdrop-blur-md border border-[var(--border)] shadow-xl font-mono text-xs flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-[var(--text)] font-semibold flex items-center gap-1.5">
                      <span className="text-[var(--accent)] font-bold">$</span>{" "}
                      saif@developer:~
                    </div>
                    <div className="text-[11px] text-[var(--muted)]">
                      Full-stack & Computer Vision
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block text-[10px] px-2.5 py-1 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30 font-bold">
                      UTC+6
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Terminal Identity Card (Positioned beneath 50/50 hero) */}
        {/* <IdentityCard /> */}
      </section>

      {/* 2. PROOF STRIP (Accurate counts from DB with vibrant colored cards) */}
      <section className="border-y border-[var(--border)] py-8 bg-[var(--surface-2)]/30 -mx-5 md:-mx-8 px-5 md:px-8">
        <div className="max-w-[1120px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 font-mono">
          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-emerald-500/40 transition-all flex items-center gap-3.5 shadow-sm glow-card">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-[var(--text)]">
                {projectsCount || 6}
              </div>
              <div className="text-[11px] text-[var(--muted)] uppercase tracking-wider">
                Projects Shipped
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-sky-500/40 transition-all flex items-center gap-3.5 shadow-sm glow-card">
            <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-[var(--accent)]">
                {skillsCount || 24}+
              </div>
              <div className="text-[11px] text-[var(--muted)] uppercase tracking-wider">
                Technologies
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-indigo-500/40 transition-all flex items-center gap-3.5 shadow-sm glow-card">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-[var(--accent-2)]">
                3+
              </div>
              <div className="text-[11px] text-[var(--muted)] uppercase tracking-wider">
                Years Coding
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-amber-500/40 transition-all flex items-center gap-3.5 shadow-sm glow-card">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-[var(--text)]">
                25+
              </div>
              <div className="text-[11px] text-[var(--muted)] uppercase tracking-wider">
                GitHub Repos
              </div>
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
