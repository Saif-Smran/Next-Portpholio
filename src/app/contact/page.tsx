import { ArrowUpRight, Clock, Mail, MapPin, ShieldCheck } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "./contact-form";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with A.H.M. Saif Smran regarding remote internships, engineering roles, and research collaborations.",
};

export default function ContactPage() {
  return (
    <div className="space-y-12 max-w-4xl">
      <SectionHeading
        badge="Get In Touch"
        title="Contact & Collaboration"
        description="Whether you have an internship opening, freelance proposal, or research idea, feel free to drop a message."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Direct Links & Info (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 space-y-5 bg-[var(--surface)] border-[var(--border)] font-mono text-xs">
            <div className="space-y-2">
              <Badge variant="accent" className="text-[10px]">
                Availability Status
              </Badge>
              <div className="font-heading text-base font-bold text-[var(--text)]">
                Open to Remote Internships
              </div>
              <p className="font-sans text-xs text-[var(--muted)] leading-relaxed">
                Available for full-time or part-time developer internships and
                contract engagements.
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-[var(--border)]">
              <div className="flex items-center gap-2.5 text-[var(--muted)]">
                <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span>Dhaka, Bangladesh · UTC+6</span>
              </div>
              <div className="flex items-center gap-2.5 text-[var(--muted)]">
                <Clock className="w-4 h-4 text-[var(--accent-2)] shrink-0" />
                <span>Response time: Within 24 hours</span>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-[var(--border)]">
              <span className="text-[var(--text)] font-semibold block">
                Direct Channels:
              </span>
              <ul className="space-y-2">
                <li>
                  <a
                    href="mailto:smrangb@gmail.com"
                    className="text-[var(--accent)] hover:underline inline-flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" /> smrangb@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/a-h-m-saif-smran"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--accent-2)] hover:underline inline-flex items-center gap-1.5"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" /> LinkedIn Profile{" "}
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Saif-Smran"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--text)] hover:underline inline-flex items-center gap-1.5"
                  >
                    <GithubIcon className="w-3.5 h-3.5" /> GitHub Profile{" "}
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="pt-2 text-[11px] text-[var(--muted)]/80 flex items-center gap-1.5 border-t border-[var(--border)]">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--success)]" />
              <span>
                Submissions are stored directly in PostgreSQL with cryptographic
                rate limiting.
              </span>
            </div>
          </Card>
        </div>

        {/* Right Column: Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <Card className="p-6 md:p-8 bg-[var(--surface)] border-[var(--border)]">
            <ContactForm />
          </Card>
        </div>
      </div>
    </div>
  );
}
