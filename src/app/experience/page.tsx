import { ArrowUpRight, Award, Briefcase, GitCommit } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { listCertifications, listExperiences } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Experience & Build Log",
  description:
    "Chronological timeline of client projects, engineering leadership, and peer mentoring.",
};

export default async function ExperiencePage() {
  const [experiences, certifications] = await Promise.all([
    listExperiences(),
    listCertifications(),
  ]);

  return (
    <div className="space-y-16 max-w-4xl">
      <SectionHeading
        badge="Career & Leadership"
        title="Engineering Experience & Build Log"
        description="Structured as a developer commit log. Milestones spanning client development, engineering team leadership, and academic mentoring."
      />

      {/* Build-Log Timeline */}
      <section className="space-y-8">
        <div className="relative border-l border-[var(--border)] ml-3 pl-6 md:pl-8 space-y-12 font-mono">
          {experiences.map((exp) => {
            const startDateStr = formatDate(exp.startDate);
            const endDateStr = exp.endDate
              ? formatDate(exp.endDate)
              : "Present";

            return (
              <div key={exp.id} className="relative group">
                {/* Commit Dot */}
                <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-[var(--surface)] border-2 border-[var(--accent)] group-hover:bg-[var(--accent)] transition-colors shadow-sm" />

                <Card className="p-6 md:p-8 space-y-4 hover:border-[var(--accent)]/40 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-[var(--border)] pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="accent"
                          className="text-[10px] uppercase"
                        >
                          {exp.kind}
                        </Badge>
                        <span className="text-xs text-[var(--muted)]">
                          {startDateStr} – {endDateStr}
                        </span>
                      </div>
                      <h3 className="font-heading text-lg md:text-xl font-bold text-[var(--text)]">
                        {exp.title}
                      </h3>
                      <div className="text-xs font-mono text-[var(--accent-2)]">
                        {exp.org} {exp.location && `· ${exp.location}`}
                      </div>
                    </div>
                  </div>

                  <p className="font-sans text-sm text-[var(--text)]/90 leading-relaxed">
                    {exp.description}
                  </p>
                </Card>
              </div>
            );
          })}
        </div>
      </section>

      {/* Certifications (if present) */}
      {certifications.length > 0 && (
        <section className="space-y-6 pt-4">
          <h2 className="font-heading text-xl font-bold text-[var(--text)] flex items-center gap-2">
            <Award className="w-5 h-5 text-[var(--accent)]" /> Verified
            Certifications
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            {certifications.map((cert) => (
              <Card key={cert.id} className="p-4 flex flex-col justify-between">
                <div>
                  <h4 className="font-heading font-bold text-sm text-[var(--text)]">
                    {cert.title}
                  </h4>
                  <div className="text-[var(--muted)]">{cert.issuer}</div>
                </div>

                {cert.credentialUrl && (
                  <div className="pt-3 mt-3 border-t border-[var(--border)]">
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--accent)] hover:underline inline-flex items-center gap-1"
                    >
                      Verify Credential <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
