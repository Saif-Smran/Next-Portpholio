import { ArrowRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { MarkdownBody } from "@/components/markdown-body";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getProfile } from "@/lib/db";

export const metadata = {
  title: "Now",
  description:
    "What A.H.M. Saif Smran is focused on this month. Projects, research, and current reading.",
};

export default async function NowPage() {
  const profile = await getProfile();

  return (
    <div className="space-y-10 max-w-3xl">
      <SectionHeading
        badge="Activity"
        title="What I'm Doing Now"
        description="A public page inspired by Derek Sivers' /now movement. Updated monthly to document current focus, research goals, and active builds."
      />

      <Card className="p-6 md:p-8 space-y-6 bg-[var(--surface)] border-[var(--border)]">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--muted)] border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Last updated: October 2026</span>
          </div>
          <span className="text-[var(--accent)] font-semibold">
            Dhaka, Bangladesh
          </span>
        </div>

        {profile?.nowText ? (
          <MarkdownBody content={profile.nowText} />
        ) : (
          <div className="space-y-4 font-mono text-sm text-[var(--text)]/90">
            <p>
              - <strong>Building:</strong> Modern developer portfolio v2 with
              Next.js, Prisma, and PostgreSQL.
            </p>
            <p>
              - <strong>Researching:</strong> Multi-object crowd tracking on
              VisDrone with SAHI and recurrent memory.
            </p>
            <p>
              - <strong>Preparing:</strong> Master of Science applications for
              German & Dutch universities.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
