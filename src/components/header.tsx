"use client";

import { Menu, Terminal, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { cn } from "@/lib/utils";
import { CommandPalette } from "./command-palette";
import { ThemeToggle } from "./theme-toggle";

const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md">
      <div className="max-w-[1120px] mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo wordmark */}
        <Link
          href="/"
          className="group flex items-center gap-2 font-mono text-sm font-bold tracking-tight text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded"
        >
          <div className="w-7 h-7 rounded-md bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">
            <Terminal className="w-4 h-4" />
          </div>
          <span className="group-hover:text-[var(--accent)] transition-colors">
            saif<span className="text-[var(--accent)]">.dev</span>
          </span>
        </Link>

        {/* Center / Right: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 font-mono text-xs">
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 rounded-md transition-colors relative focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]",
                  isActive
                    ? "text-[var(--accent)] font-semibold bg-[var(--surface-2)]"
                    : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right tools: Command palette trigger + Theme toggle + Mobile hamburger */}
        <div className="flex items-center gap-2">
          <CommandPalette />
          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[var(--muted)] hover:text-[var(--text)] rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--border)] bg-[var(--bg)] px-5 py-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1 font-mono text-sm">
            <Link
              href="/"
              className={cn(
                "px-3 py-2 rounded-md transition-colors",
                pathname === "/"
                  ? "text-[var(--accent)] bg-[var(--surface-2)] font-semibold"
                  : "text-[var(--muted)] hover:text-[var(--text)]",
              )}
            >
              Home
            </Link>
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-md transition-colors",
                    isActive
                      ? "text-[var(--accent)] bg-[var(--surface-2)] font-semibold"
                      : "text-[var(--muted)] hover:text-[var(--text)]",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
            <span className="text-xs font-mono text-[var(--muted)]">
              Quick search
            </span>
            <CommandPalette />
          </div>
        </div>
      )}
    </header>
  );
}
