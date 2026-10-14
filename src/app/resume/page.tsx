import { Download, ExternalLink, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  getGroupedSkills,
  getProfile,
  listEducation,
  listExperiences,
} from "@/lib/db";
import { formatDate } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const title = "Resume & Curriculum Vitae | A.H.M. Saif Smran";
  const description =
    profile?.bio ||
    "Curriculum Vitae and background of A.H.M. Saif Smran. Education at IUBAT, experience, core stack, and downloadable PDF.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "/resume",
      type: "profile",
      images: [
        {
          url: "/profile-pic.png",
          alt: "A.H.M. Saif Smran Curriculum Vitae",
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

export default async function ResumePage() {
  const [profile, educationList, experiences, categories] = await Promise.all([
    getProfile(),
    listEducation(),
    listExperiences(),
    getGroupedSkills(),
  ]);

  const envResumeLink = process.env.RESUME_LINK || process.env.RESUME_URL;
  let embedUrl: string | null = null;
  if (envResumeLink?.includes("drive.google.com")) {
    embedUrl = envResumeLink.replace(/\/view(\?.*)?$/, "/preview");
  }

  return (
    <div className="space-y-10 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <SectionHeading
          badge="Curriculum Vitae"
          title="Resume / Curriculum Vitae"
          description="Detailed breakdown of education, engineering roles, and technical stack. Printable and downloadable as PDF."
          className="mb-0"
        />

        <div className="flex items-center gap-3">
          <Button
            asChild
            size="lg"
            variant="primary"
            className="shrink-0 font-mono text-xs"
          >
            <a
              href="/resume.pdf"
              target="_blank"
              className="gap-2"
              rel="noopener"
            >
              <Download className="w-4 h-4" /> Download Resume
            </a>
          </Button>
          {envResumeLink && (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="shrink-0 font-mono text-xs"
            >
              <a
                href={envResumeLink}
                target="_blank"
                className="gap-2"
                rel="noreferrer"
              >
                <ExternalLink className="w-4 h-4" /> Open Source Link
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Embedded Document Viewer if available */}
      {embedUrl && (
        <Card className="overflow-hidden border-[var(--border)] bg-[var(--surface)] p-2">
          <div className="px-4 py-2 border-b border-[var(--border)] text-xs font-mono text-[var(--muted)] flex items-center justify-between">
            <span>Embedded PDF Document Viewer</span>
            <span className="text-[var(--accent)] font-semibold">
              Live Preview
            </span>
          </div>
          <iframe
            src={embedUrl}
            width="100%"
            height="600"
            className="w-full rounded-b-lg border-0 bg-white"
            title="A.H.M. Saif Smran Resume Preview"
          />
        </Card>
      )}

      {/* Structured CV Document Container */}
      <Card className="p-8 md:p-12 space-y-10 bg-[var(--surface)] border-[var(--border)] shadow-sm">
        {/* CV Header */}
        <div className="border-b border-[var(--border)] pb-6 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-[var(--text)]">
              {profile?.name || "A.H.M. Saif Smran"}
            </h1>
            <Badge
              variant="accent"
              className="self-start sm:self-auto font-mono text-xs"
            >
              Open to Remote Internships
            </Badge>
          </div>

          <p className="font-mono text-sm text-[var(--accent)]">
            {profile?.headline}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--muted)] pt-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> Dhaka, Bangladesh
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" /> smrangb@gmail.com
            </span>
            <span>·</span>
            <a
              href="https://github.com/Saif-Smran"
              target="_blank"
              rel="noreferrer"
              className="text-[var(--accent-2)] hover:underline inline-flex items-center gap-1"
            >
              github.com/Saif-Smran <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Education Section */}
        <div className="space-y-4">
          <h2 className="font-heading text-lg font-bold uppercase tracking-wider text-[var(--accent)] border-b border-[var(--border)] pb-1">
            Education
          </h2>

          <div className="space-y-6">
            {educationList.map((edu) => (
              <div key={edu.id} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <h3 className="font-heading font-bold text-base text-[var(--text)]">
                    {edu.school}
                  </h3>
                  <span className="text-xs font-mono text-[var(--muted)]">
                    {edu.startYear} – {edu.endYear || "Present"}
                  </span>
                </div>
                <div className="text-sm font-mono text-[var(--text)]/90">
                  {edu.degree} in {edu.field}{" "}
                  {edu.showGpa && edu.gpa && `· CGPA: ${edu.gpa}`}
                </div>
                {edu.courseworkParsed.length > 0 && (
                  <p className="text-xs font-mono text-[var(--muted)] leading-relaxed">
                    <strong>Coursework:</strong>{" "}
                    {edu.courseworkParsed.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div className="space-y-4">
          <h2 className="font-heading text-lg font-bold uppercase tracking-wider text-[var(--accent)] border-b border-[var(--border)] pb-1">
            Selected Experience & Leadership
          </h2>

          <div className="space-y-6">
            {experiences.map((exp) => (
              <div key={exp.id} className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <h3 className="font-heading font-bold text-base text-[var(--text)]">
                    {exp.title}
                  </h3>
                  <span className="text-xs font-mono text-[var(--muted)]">
                    {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                  </span>
                </div>
                <div className="text-xs font-mono text-[var(--accent-2)]">
                  {exp.org} {exp.location && `· ${exp.location}`}
                </div>
                <p className="text-sm text-[var(--text)]/90 leading-relaxed font-sans">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Skills Section */}
        <div className="space-y-4">
          <h2 className="font-heading text-lg font-bold uppercase tracking-wider text-[var(--accent)] border-b border-[var(--border)] pb-1">
            Technical Skills
          </h2>

          <div className="space-y-3 font-mono text-xs">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="grid grid-cols-1 sm:grid-cols-4 gap-1"
              >
                <span className="text-[var(--muted)] font-semibold">
                  {cat.name}:
                </span>
                <span className="sm:col-span-3 text-[var(--text)]">
                  {cat.skills.map((s) => s.name).join(", ")}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Thesis & Research Section */}
        <div className="space-y-4 border-t border-[var(--border)] pt-6">
          <h2 className="font-heading text-lg font-bold uppercase tracking-wider text-[var(--accent)] border-b border-[var(--border)] pb-1">
            Academic Research
          </h2>
          <div className="space-y-1">
            <h3 className="font-heading font-bold text-base text-[var(--text)]">
              Tracking in High Density Crowd
            </h3>
            <div className="text-xs font-mono text-[var(--muted)]">
              Target Venue: ICCIT 2027 · Evaluated on VisDrone Benchmark
            </div>
            <p className="text-xs text-[var(--muted)] leading-relaxed pt-1">
              Multi-object tracking addressing severe scale and occlusion
              ambiguity via YOLO detectors, SAHI patch slicing, and recurrent
              motion association.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
