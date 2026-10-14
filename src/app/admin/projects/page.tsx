import { Edit, ExternalLink, Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { listProjects } from "@/lib/db";
import { deleteProjectAction, toggleProjectPublishAction } from "../actions";

export const metadata = {
  title: "Manage Projects | Admin",
  robots: { index: false, follow: false },
};

export default async function AdminProjectsPage() {
  const projects = await listProjects({ publishedOnly: false });

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-xl font-bold text-[var(--text)]">
            Projects Management
          </h1>
          <p className="text-[var(--muted)]">
            Manage projects, reorder, and toggle public visibility.
          </p>
        </div>

        <Button asChild variant="primary" size="sm">
          <Link href="/admin/projects/new" className="gap-1.5">
            <Plus className="w-4 h-4" /> New Project
          </Link>
        </Button>
      </div>

      <Card className="overflow-hidden border-[var(--border)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--surface-2)] text-[var(--text)]">
                <th className="p-3 font-bold">Order</th>
                <th className="p-3 font-bold">Title & Slug</th>
                <th className="p-3 font-bold">Kind</th>
                <th className="p-3 font-bold">Status</th>
                <th className="p-3 font-bold">Visibility</th>
                <th className="p-3 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {projects.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-[var(--surface-2)]/40 transition-colors"
                >
                  <td className="p-3 font-bold text-[var(--accent)]">
                    #{p.sortOrder}
                  </td>
                  <td className="p-3">
                    <div className="font-heading font-bold text-sm text-[var(--text)]">
                      {p.title}
                    </div>
                    <div className="text-[11px] text-[var(--muted)]">
                      /{p.slug}{" "}
                      {p.featured && (
                        <span className="text-[var(--warn)]">★ Featured</span>
                      )}
                    </div>
                  </td>
                  <td className="p-3 uppercase text-[10px]">
                    <Badge variant="outline">{p.kind}</Badge>
                  </td>
                  <td className="p-3">
                    <Badge
                      variant={p.status === "shipped" ? "success" : "warn"}
                      className="text-[10px]"
                    >
                      {p.status}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <form
                      action={async () => {
                        "use server";
                        await toggleProjectPublishAction(p.id, p.published);
                      }}
                    >
                      <button
                        type="submit"
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                          p.published
                            ? "bg-[var(--success)]/15 text-[var(--success)] hover:bg-[var(--success)]/25"
                            : "bg-[var(--danger)]/15 text-[var(--danger)] hover:bg-[var(--danger)]/25"
                        }`}
                      >
                        {p.published ? (
                          <Eye className="w-3 h-3" />
                        ) : (
                          <EyeOff className="w-3 h-3" />
                        )}
                        {p.published ? "Published" : "Draft"}
                      </button>
                    </form>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-[var(--muted)] hover:text-[var(--text)]"
                      >
                        <Link
                          href={`/projects/${p.slug}`}
                          target="_blank"
                          title="View live"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="secondary"
                        size="icon"
                        className="h-7 w-7"
                      >
                        <Link
                          href={`/admin/projects/${p.id}/edit`}
                          title="Edit project"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                      </Button>
                      <form
                        action={async () => {
                          "use server";
                          await deleteProjectAction(p.id);
                        }}
                      >
                        <button
                          type="submit"
                          className="h-7 w-7 rounded-md flex items-center justify-center text-[var(--danger)] hover:bg-[var(--danger)]/10 cursor-pointer"
                          title="Delete project"
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
