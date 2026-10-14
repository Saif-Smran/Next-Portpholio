"use client";

import { ArrowLeft, Eye, Save } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { MarkdownBody } from "@/components/markdown-body";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { parseJsonSafe } from "@/lib/utils";
import { savePostAction } from "../actions";

interface PostFormProps {
  initialData?: {
    id?: number;
    slug?: string;
    title?: string;
    excerpt?: string;
    body?: string;
    coverImage?: string | null;
    tags?: string;
    published?: boolean;
  };
}

export function PostForm({ initialData }: PostFormProps) {
  const [markdownBody, setMarkdownBody] = React.useState(
    initialData?.body || "",
  );
  const [showPreview, setShowPreview] = React.useState(false);

  const tagsArray = parseJsonSafe<string[]>(initialData?.tags, []);

  return (
    <form
      action={savePostAction}
      className="space-y-6 font-mono text-xs max-w-4xl"
    >
      {initialData?.id && (
        <input type="hidden" name="id" value={initialData.id} />
      )}

      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-[var(--muted)]"
        >
          <Link href="/admin/posts" className="gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to posts
          </Link>
        </Button>

        <Button
          type="submit"
          variant="primary"
          size="default"
          className="gap-2"
        >
          <Save className="w-4 h-4" /> Save Post
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="post-title" className="text-[var(--text)] font-semibold block">
            Post Title *
          </label>
          <input
            id="post-title"
            type="text"
            name="title"
            required
            defaultValue={initialData?.title || ""}
            placeholder="e.g. How I Stopped Double-Booking with Prisma"
            className="w-full h-10 px-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-sans text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="post-slug" className="text-[var(--text)] font-semibold block">
            URL Slug *
          </label>
          <input
            id="post-slug"
            type="text"
            name="slug"
            required
            defaultValue={initialData?.slug || ""}
            placeholder="e.g. stopping-double-booking-prisma"
            className="w-full h-10 px-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-mono text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="post-excerpt" className="text-[var(--text)] font-semibold block">
          Excerpt (1-2 sentences for preview) *
        </label>
        <textarea
          id="post-excerpt"
          name="excerpt"
          required
          rows={3}
          defaultValue={initialData?.excerpt || ""}
          placeholder="Brief summary of the architectural problem and takeaway..."
          className="w-full p-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-sans text-[var(--text)] focus:outline-none focus:border-[var(--accent)] leading-relaxed"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="post-tags" className="text-[var(--text)] font-semibold block">
            Comma-Separated Tags
          </label>
          <input
            id="post-tags"
            type="text"
            name="tags"
            defaultValue={tagsArray.join(", ")}
            placeholder="Prisma, PostgreSQL, Concurrency, Architecture"
            className="w-full h-10 px-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-sans text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="post-cover" className="text-[var(--text)] font-semibold block">
            Cover Image URL (optional)
          </label>
          <input
            id="post-cover"
            type="text"
            name="coverImage"
            defaultValue={initialData?.coverImage || ""}
            placeholder="https://..."
            className="w-full h-10 px-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-sans text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
          />
        </div>
      </div>

      <div className="py-2 border-y border-[var(--border)]">
        <label htmlFor="post-published" className="flex items-center gap-2 cursor-pointer text-sm font-sans text-[var(--text)]">
          <input
            id="post-published"
            type="checkbox"
            name="published"
            defaultChecked={initialData?.published ?? true}
            className="w-4 h-4 accent-[var(--accent)] rounded"
          />
          <span>Publicly Published</span>
        </label>
      </div>

      {/* Markdown Body with Live Preview */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="post-body" className="text-[var(--text)] font-semibold block">
            Post Body (Markdown) *
          </label>
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="text-[var(--accent)] hover:underline inline-flex items-center gap-1 cursor-pointer font-bold"
          >
            <Eye className="w-3.5 h-3.5" />
            {showPreview ? "Edit Raw Markdown" : "Live Preview"}
          </button>
        </div>

        {showPreview ? (
          <Card className="p-6 bg-[var(--surface)] border-[var(--border)] min-h-[300px]">
            <MarkdownBody content={markdownBody || "*Nothing to preview*"} />
          </Card>
        ) : (
          <textarea
            id="post-body"
            name="body"
            required
            rows={14}
            value={markdownBody}
            onChange={(e) => setMarkdownBody(e.target.value)}
            placeholder="Write markdown article content, headings, code snippets..."
            className="w-full p-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-mono text-[var(--text)] focus:outline-none focus:border-[var(--accent)] leading-relaxed"
          />
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full sm:w-auto"
      >
        Save and Publish Post
      </Button>
    </form>
  );
}
