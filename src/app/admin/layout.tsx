import {
  ExternalLink,
  FolderGit2,
  LayoutDashboard,
  LogOut,
  Mail,
  PenSquare,
  ShieldCheck,
  User,
} from "lucide-react";
import Link from "next/link";
import { getAdminSession } from "@/lib/auth";
import { logoutAdminAction } from "./actions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  // If not logged in and not on login page, let middleware handle redirect
  if (!session) {
    return <>{children}</>;
  }

  const adminNav = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/projects", label: "Projects", icon: FolderGit2 },
    { href: "/admin/posts", label: "Blog Posts", icon: PenSquare },
    { href: "/admin/messages", label: "Messages", icon: Mail },
    { href: "/admin/profile", label: "Profile & Now", icon: User },
  ];

  return (
    <div className="space-y-6">
      {/* Top Admin Banner */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-2 text-[var(--accent)]">
          <ShieldCheck className="w-4 h-4" />
          <span className="font-bold">Admin Workspace</span>
          <span className="text-[var(--muted)]">({session.email})</span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="text-[var(--muted)] hover:text-[var(--text)] inline-flex items-center gap-1"
          >
            Live Site <ExternalLink className="w-3 h-3" />
          </Link>

          <form action={logoutAdminAction}>
            <button
              type="submit"
              className="text-[var(--danger)] hover:underline inline-flex items-center gap-1 cursor-pointer font-bold"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </form>
        </div>
      </div>

      {/* Main Admin Body: Nav Tabs + Content */}
      <div className="space-y-6">
        <nav className="flex flex-wrap gap-2 border-b border-[var(--border)] pb-3 font-mono text-xs">
          {adminNav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="px-3.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all flex items-center gap-2 text-[var(--text)]"
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div>{children}</div>
      </div>
    </div>
  );
}
