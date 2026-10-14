import { ArrowUpRight, GitBranch, Mail } from "lucide-react";
import Link from "next/link";
import { getProfile, getSocialLinks } from "@/lib/db";
import { FacebookIcon, GithubIcon, LinkedinIcon, WhatsAppIcon } from "./icons";

export async function Footer() {
  const profile = await getProfile();
  const _socialLinks = await getSocialLinks();

  const availabilityText =
    profile?.availability === "open"
      ? profile.availabilityNote || "available for remote internships"
      : profile?.availability === "limited"
        ? "limited availability"
        : "closed to new roles";

  return (
    <footer className="w-full border-t border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] font-mono text-xs">
      {/* Editor-Style Status Line (Section 6.1 Move #4) */}
      <div className="border-b border-[var(--border)] bg-[var(--surface-2)]/60 px-5 md:px-8 py-2">
        <div className="max-w-[1120px] mx-auto flex flex-wrap items-center justify-between gap-3 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
            </span>
            <span className="text-[var(--text)] font-medium">status:</span>
            <span>{availabilityText}</span>
            <span className="text-[var(--border)]">·</span>
            <span>{profile?.location || "Dhaka, Bangladesh"}</span>
            <span className="text-[var(--border)]">·</span>
            <span>UTC+6</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[var(--muted)]">
              <GitBranch className="w-3 h-3 text-[var(--accent)]" /> main
            </span>
            <span className="text-[var(--border)]">·</span>
            <Link
              href="/resume.pdf"
              className="text-[var(--accent)] hover:underline inline-flex items-center gap-0.5"
              target="_blank"
            >
              resume.pdf <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1120px] mx-auto px-5 md:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <h4 className="font-heading font-semibold text-sm text-[var(--text)]">
            Navigation
          </h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="hover:text-[var(--text)] transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="hover:text-[var(--text)] transition-colors"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/research"
                className="hover:text-[var(--text)] transition-colors"
              >
                Research
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-[var(--text)] transition-colors"
              >
                About
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-heading font-semibold text-sm text-[var(--text)]">
            Content
          </h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/skills"
                className="hover:text-[var(--text)] transition-colors"
              >
                Skills & Stack
              </Link>
            </li>
            <li>
              <Link
                href="/experience"
                className="hover:text-[var(--text)] transition-colors"
              >
                Experience Timeline
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="hover:text-[var(--text)] transition-colors"
              >
                Blog / Build Logs
              </Link>
            </li>
            <li>
              <Link
                href="/now"
                className="hover:text-[var(--text)] transition-colors"
              >
                Now
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-heading font-semibold text-sm text-[var(--text)]">
            Connect
          </h4>
          <ul className="space-y-2">
            <li>
              <a
                href="https://github.com/Saif-Smran"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--text)] transition-colors inline-flex items-center gap-1.5"
              >
                <GithubIcon className="w-3.5 h-3.5 text-[var(--accent)]" />{" "}
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/a-h-m-saif-smran"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--text)] transition-colors inline-flex items-center gap-1.5"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-[var(--accent-2)]" />{" "}
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/saif.smran.1"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--text)] transition-colors inline-flex items-center gap-1.5"
              >
                <FacebookIcon className="w-3.5 h-3.5 text-blue-400" /> Facebook
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/8801521468295"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--text)] transition-colors inline-flex items-center gap-1.5"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />{" "}
                WhatsApp
              </a>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-[var(--text)] transition-colors inline-flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-[var(--warn)]" /> Contact Form
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-heading font-semibold text-sm text-[var(--text)]">
            System
          </h4>
          <p className="text-[11px] leading-relaxed text-[var(--muted)]">
            Built with Next.js App Router, Tailwind CSS, Prisma ORM, and
            PostgreSQL.
          </p>
          <div className="pt-1">
            <Link
              href="/admin/login"
              className="text-[10px] text-[var(--muted)]/60 hover:text-[var(--muted)] transition-colors"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--border)] px-5 md:px-8 py-4">
        <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-[11px]">
          <div>
            © {new Date().getFullYear()} A.H.M. Saif Smran. All rights reserved.
          </div>
          <div className="text-[var(--muted)]/70">
            Quiet Terminal Design · WCAG 2.1 AA Compliant
          </div>
        </div>
      </div>
    </footer>
  );
}
