import {
  ArrowRight,
  Compass,
  GitCommit,
  GraduationCap,
  Languages,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { SectionHeading } from "@/components/ui/section-heading";
import { getProfile, listEducation, listExperiences } from "@/lib/db";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const title = "About & Engineering Story | A.H.M. Saif Smran";
  const description =
    profile?.bio ||
    "Background, education at IUBAT, engineering philosophy, and research direction of A.H.M. Saif Smran.";

  return {
    title,
    description,
    keywords: [
      "Saif Smran",
      "About Saif Smran",
      "Software Engineer",
      "IUBAT",
      "TypeScript",
      "Next.js",
      "Computer Vision",
    ],
    openGraph: {
      title,
      description,
      url: "/about",
      type: "profile",
      images: [
        {
          url: "/profile-pic.png",
          width: 800,
          height: 800,
          alt: "A.H.M. Saif Smran Profile",
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

export default async function AboutPage() {
  const [_profile, educationList, experiences] = await Promise.all([
    getProfile(),
    listEducation(),
    listExperiences(),
  ]);

  return (
    <div className="space-y-16 max-w-4xl">
      <SectionHeading
        badge="Background"
        title="Engineering Story & Path"
        description="Full-stack developer building robust distributed web backends and advancing into computer vision research."
      />

      {/* 1. Narrative Bio & Direction with Profile Portrait */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-8 prose prose-invert max-w-none text-[var(--text)]/90 leading-relaxed text-sm md:text-base space-y-4">
            <p>
              I am a final-year Computer Science and Engineering student at the{" "}
              <strong className="text-[var(--text)]">
                International University of Business Agriculture and Technology
                (IUBAT)
              </strong>{" "}
              in Dhaka, Bangladesh.
            </p>

            <p>
              My engineering foundation is built around{" "}
              <strong className="text-[var(--accent)]">
                TypeScript, Next.js, Express, Prisma, and PostgreSQL
              </strong>
              . Over the past three years, I have architected and shipped
              complex full-stack web applications featuring role-based access
              control, cryptographic Stripe payment webhooks, and transactional
              database integrity guarantees to eliminate race conditions.
            </p>

            <p>
              Alongside web engineering, my primary academic focus is applied
              computer vision. My undergraduate thesis investigates{" "}
              <strong className="text-[var(--accent-2)]">
                Multi-Object Tracking in High Density Crowd
              </strong>{" "}
              using YOLO detection families, Slicing Aided Hyper Inference
              (SAHI), and recurrent memory networks on drone aerial benchmarks.
            </p>

            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/60 font-mono text-xs flex items-center gap-3">
              <Compass className="w-4 h-4 text-[var(--accent)] shrink-0" />
              <span>
                <strong>Future Direction:</strong> Preparing applications for
                Master of Science programs in Data Science and Machine Learning
                in Germany and the Netherlands.
              </span>
            </div>
          </div>

          <div className="md:col-span-4 flex justify-center">
            <div className="relative w-full max-w-[280px] aspect-square rounded-2xl overflow-hidden border-2 border-[var(--border)] bg-[var(--surface-2)] shadow-xl glow-card group">
              <div className="absolute -inset-1 bg-gradient-to-tr from-[var(--accent)] via-emerald-400 to-[var(--accent-2)] opacity-40 blur group-hover:opacity-80 transition duration-300" />
              <Image
                src="/profile-pic.png"
                alt="A.H.M. Saif Smran"
                width={300}
                height={300}
                className="w-full h-full object-cover object-top relative z-10 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Education Timeline */}
      <section className="space-y-6">
        <h2 className="font-heading text-2xl font-bold text-[var(--text)] flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-[var(--accent)]" /> Education
        </h2>

        <div className="space-y-6">
          {educationList.map((edu) => (
            <Card key={edu.id} className="p-6 md:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-[var(--border)] pb-4">
                <div>
                  <h3 className="font-heading text-lg md:text-xl font-bold text-[var(--text)]">
                    {edu.school}
                  </h3>
                  <div className="text-sm font-mono text-[var(--accent)]">
                    {edu.degree} in {edu.field}
                  </div>
                </div>

                <div className="text-xs font-mono text-[var(--muted)] sm:text-right">
                  <div>
                    {edu.startYear} – {edu.endYear ? edu.endYear : "Present"}
                  </div>
                  {edu.showGpa && edu.gpa && (
                    <div className="text-[var(--success)] font-semibold">
                      CGPA: {edu.gpa}
                    </div>
                  )}
                </div>
              </div>

              {edu.notes && (
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {edu.notes}
                </p>
              )}

              {/* Coursework */}
              {edu.courseworkParsed.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-mono text-[var(--muted)] uppercase tracking-wider">
                    Completed & Relevant Coursework:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.courseworkParsed.map((course) => (
                      <Chip key={course} className="text-xs">
                        {course}
                      </Chip>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* 3. Build-log Timeline (Commit-style entries from Experience) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-2xl font-bold text-[var(--text)] flex items-center gap-2">
            <GitCommit className="w-6 h-6 text-[var(--accent-2)]" /> Key
            Milestones & Leadership
          </h2>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="font-mono text-xs"
          >
            <Link href="/experience" className="gap-1 text-[var(--accent)]">
              Full Experience Timeline <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>

        <div className="relative border-l border-[var(--border)] ml-3 pl-6 space-y-8 font-mono text-xs">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Commit dot */}
              <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[var(--surface)] border-2 border-[var(--accent)] group-hover:bg-[var(--accent)] transition-colors" />

              <div className="space-y-1">
                <div className="text-[var(--muted)] text-[11px]">
                  commit [{exp.kind.toUpperCase()}] ·{" "}
                  {new Date(exp.startDate).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </div>
                <div className="font-heading text-base font-bold text-[var(--text)]">
                  {exp.title}
                </div>
                <div className="text-[var(--accent-2)]">
                  {exp.org} {exp.location && `· ${exp.location}`}
                </div>
                <p className="font-sans text-sm text-[var(--muted)] leading-relaxed pt-1">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Languages & Interests */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
        <Card className="p-6 space-y-3">
          <div className="flex items-center gap-2 text-sm font-heading font-bold text-[var(--text)]">
            <Languages className="w-4 h-4 text-[var(--accent)]" /> Spoken
            Languages
          </div>
          <ul className="font-mono text-xs text-[var(--muted)] space-y-2">
            <li className="flex justify-between border-b border-[var(--border)] pb-1">
              <span className="text-[var(--text)]">Bengali</span>
              <span className="text-[var(--accent)]">Native proficiency</span>
            </li>
            <li className="flex justify-between border-b border-[var(--border)] pb-1">
              <span className="text-[var(--text)]">English</span>
              <span className="text-[var(--accent-2)]">
                Professional working proficiency
              </span>
            </li>
          </ul>
        </Card>

        <Card className="p-6 space-y-3">
          <div className="flex items-center gap-2 text-sm font-heading font-bold text-[var(--text)]">
            <Compass className="w-4 h-4 text-[var(--warn)]" /> Research &
            Technical Interests
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            <Chip>Computer Vision</Chip>
            <Chip>Object Tracking</Chip>
            <Chip>Distributed Systems</Chip>
            <Chip>Database Concurrency</Chip>
            <Chip>Drone Aerial Imagery</Chip>
            <Chip>Applied Machine Learning</Chip>
          </div>
        </Card>
      </section>
    </div>
  );
}
