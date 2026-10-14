import { Edit, ExternalLink, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { deletePostAction } from "../actions";

export const metadata = {
  title: "Manage Blog Posts | Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-xl font-bold text-[var(--text)]">
            Blog Posts Management
          </h1>
          <p className="text-[var(--muted)]">
            Create and edit engineering writeups and build logs.
          </p>
        </div>

        <Button asChild variant="primary" size="sm">
          <Link href="/admin/posts/new" className="gap-1.5">
            <Plus className="w-4 h-4" /> New Post
          </Link>
        </Button>
      </div>

      <Card className="overflow-hidden border-[var(--border)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--surface-2)] text-[var(--text)]">
                <th className="p-3 font-bold">Title & Slug</th>
                <th className="p-3 font-bold">Published</th>
                <th className="p-3 font-bold">Date</th>
                <th className="p-3 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {posts.map((post) => (
                <tr
                  key={post.id}
                  className="hover:bg-[var(--surface-2)]/40 transition-colors"
                >
                  <td className="p-3">
                    <div className="font-heading font-bold text-sm text-[var(--text)]">
                      {post.title}
                    </div>
                    <div className="text-[11px] text-[var(--muted)]">
                      /blog/{post.slug}
                    </div>
                  </td>
                  <td className="p-3">
                    <Badge
                      variant={post.published ? "success" : "warn"}
                      className="text-[10px]"
                    >
                      {post.published ? "Published" : "Draft"}
                    </Badge>
                  </td>
                  <td className="p-3 text-[var(--muted)]">
                    {formatDate(post.publishedAt || post.createdAt)}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {post.published && (
                        <Button
                          asChild
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-[var(--muted)]"
                        >
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            title="View live"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </Button>
                      )}
                      <Button
                        asChild
                        variant="secondary"
                        size="icon"
                        className="h-7 w-7"
                      >
                        <Link
                          href={`/admin/posts/${post.id}/edit`}
                          title="Edit post"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                      </Button>
                      <form
                        action={async () => {
                          "use server";
                          await deletePostAction(post.id);
                        }}
                      >
                        <button
                          type="submit"
                          className="h-7 w-7 rounded-md flex items-center justify-center text-[var(--danger)] hover:bg-[var(--danger)]/10 cursor-pointer"
                          title="Delete post"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
