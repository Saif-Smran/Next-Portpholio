import { Archive, Check, Reply, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { listMessages } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { deleteMessageAction, updateMessageStatusAction } from "../actions";

export const metadata = {
  title: "Messages | Admin",
  robots: { index: false, follow: false },
};

export default async function AdminMessagesPage() {
  const messages = await listMessages();

  return (
    <div className="space-y-6 font-mono text-xs">
      <div>
        <h1 className="font-heading text-xl font-bold text-[var(--text)]">
          Contact Messages ({messages.length})
        </h1>
        <p className="text-[var(--muted)]">
          Inquiries and feedback submitted via the public contact form.
        </p>
      </div>

      {messages.length > 0 ? (
        <div className="space-y-4">
          {messages.map((msg) => (
            <Card
              key={msg.id}
              className="p-6 space-y-4 border-[var(--border)] bg-[var(--surface)]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border)] pb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-heading font-bold text-sm text-[var(--text)]">
                    {msg.name}
                  </span>
                  <span className="text-[var(--muted)]">({msg.email})</span>
                  <Badge
                    variant={
                      msg.status === "UNREAD"
                        ? "accent"
                        : msg.status === "READ"
                          ? "secondary"
                          : "outline"
                    }
                    className="text-[10px]"
                  >
                    {msg.status}
                  </Badge>
                </div>

                <div className="text-[11px] text-[var(--muted)]">
                  {formatDate(msg.createdAt)} · IP Hash: {msg.ipHash || "N/A"}
                </div>
              </div>

              <div className="text-xs font-mono text-[var(--accent-2)] font-semibold">
                Subject: {msg.subject}
              </div>

              <p className="font-sans text-sm text-[var(--text)]/90 leading-relaxed bg-[var(--surface-2)] p-4 rounded-lg border border-[var(--border)]">
                {msg.body}
              </p>

              {/* Action buttons: reply mailto, mark read, archive, delete */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <Button asChild variant="outline" size="sm">
                  <a
                    href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                    className="gap-1.5"
                  >
                    <Reply className="w-3.5 h-3.5 text-[var(--accent)]" /> Reply
                    via Email
                  </a>
                </Button>

                <div className="flex items-center gap-2">
                  {msg.status !== "READ" && (
                    <form
                      action={async () => {
                        "use server";
                        await updateMessageStatusAction(msg.id, "READ");
                      }}
                    >
                      <Button
                        type="submit"
                        variant="ghost"
                        size="sm"
                        className="gap-1"
                      >
                        <Check className="w-3.5 h-3.5 text-[var(--success)]" />{" "}
                        Mark Read
                      </Button>
                    </form>
                  )}

                  {msg.status !== "ARCHIVED" && (
                    <form
                      action={async () => {
                        "use server";
                        await updateMessageStatusAction(msg.id, "ARCHIVED");
                      }}
                    >
                      <Button
                        type="submit"
                        variant="ghost"
                        size="sm"
                        className="gap-1 text-[var(--muted)]"
                      >
                        <Archive className="w-3.5 h-3.5" /> Archive
                      </Button>
                    </form>
                  )}

                  <form
                    action={async () => {
                      "use server";
                      await deleteMessageAction(msg.id);
                    }}
                  >
                    <Button
                      type="submit"
                      variant="ghost"
                      size="sm"
                      className="gap-1 text-[var(--danger)]"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </Button>
                  </form>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center text-[var(--muted)]">
          No contact submissions found in the database.
        </Card>
      )}
    </div>
  );
}
