import {
  ArrowRight,
  Compass,
  Eye,
  FolderGit2,
  Mail,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  getAnalyticsSummary,
  getProjectsCount,
  getUnreadMessagesCount,
  listMessages,
} from "@/lib/db";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const [unreadCount, projectsCount, analytics, recentMessages] =
    await Promise.all([
      getUnreadMessagesCount(),
      getProjectsCount(),
      getAnalyticsSummary(30),
      listMessages(),
    ]);

  return (
    <div className="space-y-8 font-mono">
      {/* 1. Stat Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-[var(--muted)]">
            <span>Unread Inquiries</span>
            <Mail className="w-4 h-4 text-[var(--accent)]" />
          </div>
          <div className="font-heading text-3xl font-bold text-[var(--text)]">
            {unreadCount}
          </div>
          <div className="text-[11px] text-[var(--accent-2)]">
            <Link href="/admin/messages" className="hover:underline">
              View inbox →
            </Link>
          </div>
        </Card>

        <Card className="p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-[var(--muted)]">
            <span>Published Projects</span>
            <FolderGit2 className="w-4 h-4 text-[var(--accent-2)]" />
          </div>
          <div className="font-heading text-3xl font-bold text-[var(--text)]">
            {projectsCount}
          </div>
          <div className="text-[11px] text-[var(--accent)]">
            <Link href="/admin/projects" className="hover:underline">
              Manage projects →
            </Link>
          </div>
        </Card>

        <Card className="p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-[var(--muted)]">
            <span>30-Day Views</span>
            <Eye className="w-4 h-4 text-[var(--success)]" />
          </div>
          <div className="font-heading text-3xl font-bold text-[var(--text)]">
            {analytics.totalViews}
          </div>
          <div className="text-[11px] text-[var(--muted)]">
            Anonymous visits
          </div>
        </Card>

        <Card className="p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-[var(--muted)]">
            <span>Unique Visitors</span>
            <Users className="w-4 h-4 text-[var(--warn)]" />
          </div>
          <div className="font-heading text-3xl font-bold text-[var(--text)]">
            {analytics.uniqueVisitors}
          </div>
          <div className="text-[11px] text-[var(--muted)]">
            Daily-salted hashes
          </div>
        </Card>
      </div>

      {/* 2. Top Pages & Referrers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <h2 className="font-heading text-base font-bold text-[var(--text)] flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[var(--accent)]" /> Top Viewed
            Paths (30 Days)
          </h2>
          {analytics.topPages.length > 0 ? (
            <div className="space-y-2 text-xs">
              {analytics.topPages.map((p) => (
                <div
                  key={p.path}
                  className="flex items-center justify-between p-2 rounded-lg bg-[var(--surface-2)]"
                >
                  <span className="text-[var(--text)] truncate max-w-[280px]">
                    {p.path}
                  </span>
                  <Badge variant="accent" className="text-[10px]">
                    {p.count} views
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[var(--muted)]">
              No page views recorded yet.
            </p>
          )}
        </Card>

        <Card className="p-6 space-y-4">
          <h2 className="font-heading text-base font-bold text-[var(--text)] flex items-center gap-2">
            <Compass className="w-4 h-4 text-[var(--accent-2)]" /> Top Referrers
          </h2>
          {analytics.topReferrers.length > 0 ? (
            <div className="space-y-2 text-xs">
              {analytics.topReferrers.map((r) => (
                <div
                  key={r.host}
                  className="flex items-center justify-between p-2 rounded-lg bg-[var(--surface-2)]"
                >
                  <span className="text-[var(--text)] truncate max-w-[280px]">
                    {r.host}
                  </span>
                  <Badge variant="secondary" className="text-[10px]">
                    {r.count} visits
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[var(--muted)]">
              No external referrers logged yet.
            </p>
          )}
        </Card>
      </div>

      {/* 3. Recent Messages Preview */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <h2 className="font-heading text-base font-bold text-[var(--text)] flex items-center gap-2">
            <Mail className="w-4 h-4 text-[var(--warn)]" /> Recent Submissions
          </h2>
          <Button asChild variant="ghost" size="sm" className="text-xs">
            <Link href="/admin/messages" className="gap-1 text-[var(--accent)]">
              All messages <ArrowRight className="w-3 h-3" />
            </Link>
          </Button>
        </div>

        {recentMessages.length > 0 ? (
          <div className="divide-y divide-[var(--border)] text-xs">
            {recentMessages.slice(0, 3).map((msg) => (
              <div
                key={msg.id}
                className="py-3 flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[var(--text)]">
                      {msg.name}
                    </span>
                    <span className="text-[var(--muted)]">({msg.email})</span>
                    <Badge
                      variant={msg.status === "UNREAD" ? "accent" : "secondary"}
                      className="text-[10px]"
                    >
                      {msg.status}
                    </Badge>
                  </div>
                  <div className="text-[var(--accent-2)]">
                    Subject: {msg.subject}
                  </div>
                  <p className="font-sans text-xs text-[var(--muted)] line-clamp-1">
                    {msg.body}
                  </p>
                </div>
                <span className="text-[10px] text-[var(--muted)] shrink-0">
                  {formatDate(msg.createdAt)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[var(--muted)]">
            No messages received yet.
          </p>
        )}
      </Card>
    </div>
  );
}
