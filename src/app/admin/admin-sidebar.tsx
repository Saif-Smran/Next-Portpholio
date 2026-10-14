"use client";

import {
  ExternalLink,
  FolderGit2,
  Home,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  PenSquare,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { cn } from "@/lib/utils";
import { logoutAdminAction } from "./actions";

interface AdminSidebarProps {
  email: string;
}

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderGit2 },
  { href: "/admin/posts", label: "Blog Posts", icon: PenSquare },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/profile", label: "Profile & Now", icon: User },
];

export function AdminSidebar({ email }: AdminSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Close on route change
  React.useEffect(() => {
    setMobileOpen(false);
  }, []);

  const navContent = (
    <div className="flex flex-col h-full justify-between">
      {/* Top Header & Brand */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
          <Link
            href="/admin"
            className="flex items-center gap-2.5 font-mono text-sm font-bold tracking-tight text-[var(--text)] group"
          >
            <div className="w-8 h-8 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] group-hover:border-[var(--accent)] group-hover:shadow-sm group-hover:shadow-[var(--accent)]/20 transition-all">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="leading-tight group-hover:text-[var(--accent)] transition-colors">
                saif<span className="text-[var(--accent)]">.dev</span>
              </span>
              <span className="text-[10px] text-[var(--muted)] font-normal uppercase tracking-wider">
                Admin Console
              </span>
            </div>
          </Link>

          {/* Mobile close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]"
            aria-label="Close admin menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card */}
        <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/60 flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-[var(--border)] shrink-0">
            <Image
              src="/profile-pic.png"
              alt="Admin"
              width={36}
              height={36}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold text-[var(--text)] truncate">
              A.H.M. Saif Smran
            </div>
            <div className="text-[11px] font-mono text-[var(--muted)] truncate">
              {email}
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <div className="space-y-1">
          <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-wider text-[var(--muted)] font-bold">
            Navigation
          </div>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-mono transition-all relative group",
                  isActive
                    ? "bg-[var(--surface-2)] text-[var(--accent)] font-semibold border border-[var(--accent)]/30 shadow-sm shadow-[var(--accent)]/10"
                    : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]/50",
                )}
              >
                <Icon
                  className={cn(
                    "w-4 h-4 transition-colors",
                    isActive
                      ? "text-[var(--accent)]"
                      : "text-[var(--muted)] group-hover:text-[var(--text)]",
                  )}
                />
                <span className="flex-1">{item.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Footer Actions */}
      <div className="pt-4 border-t border-[var(--border)] space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]/60 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Home className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </span>
          <ExternalLink className="w-3 h-3 text-[var(--muted)]" />
        </Link>

        <form action={logoutAdminAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono text-[var(--danger)] hover:bg-[var(--danger)]/10 transition-colors cursor-pointer text-left font-medium"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Session</span>
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 mb-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
        <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--text)]">
          <ShieldCheck className="w-4 h-4 text-[var(--accent)]" />
          <span>Admin Console</span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text)]"
          aria-label="Open admin sidebar"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative w-72 max-w-[80vw] h-full bg-[var(--surface)] border-r border-[var(--border)] p-5 z-10 animate-in slide-in-from-left duration-200">
            {navContent}
          </aside>
        </div>
      )}

      {/* Desktop Fixed Sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm sticky top-24 h-[calc(100vh-8rem)]">
        {navContent}
      </aside>
    </>
  );
}
