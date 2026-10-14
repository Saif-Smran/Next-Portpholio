"use client";

import { ArrowLeft, Eye, Save } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { MarkdownBody } from "@/components/markdown-body";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { saveProjectAction } from "../actions";

interface ProjectFormProps {
  initialData?: {
    id?: number;
    slug?: string;
    title?: string;
    tagline?: string;
    summary?: string;
    problem?: string | null;
    solution?: string | null;
    body?: string | null;
    role?: string | null;
    teamSize?: number;
    liveUrl?: string | null;
    repoUrl?: string | null;
    repoUrl2?: string | null;
    coverImage?: string | null;
    kind?: string;
    status?: string;
    featured?: boolean;
    published?: boolean;
    sortOrder?: number;
  };
}

export function ProjectForm({ initialData }: ProjectFormProps) {
  const [markdownBody, setMarkdownBody] = React.useState(
    initialData?.body || "",
  );
  const [showPreview, setShowPreview] = React.useState(false);

  return (
    <form
      action={saveProjectAction}
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
          <Link href="/admin/projects" className="gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to projects
          </Link>
        </Button>

        <Button
          type="submit"
          variant="primary"
          size="default"
          className="gap-2"
        >
          <Save className="w-4 h-4" /> Save Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[var(--text)] font-semibold block">
            Project Title *
          </label>
          <input
            type="text"
            name="title"
            required
            defaultValue={initialData?.title || ""}
            placeholder="e.g. UrbanMatch"
            className="w-full h-10 px-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-sans text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[var(--text)] font-semibold block">
            URL Slug *
          </label>
          <input
            type="text"
            name="slug"
            required
            defaultValue={initialData?.slug || ""}
            placeholder="e.g. urbanmatch"
            className="w-full h-10 px-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-mono text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[var(--text)] font-semibold block">
          Tagline / One-liner *
        </label>
        <input
          type="text"
          name="tagline"
          required
          defaultValue={initialData?.tagline || ""}
          placeholder="e.g. Housing and roommate management platform"
          className="w-full h-10 px-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-sans text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-[var(--text)] font-semibold block">
          Summary (2-3 sentences for cards) *
        </label>
        <textarea
          name="summary"
          required
          rows={3}
          defaultValue={initialData?.summary || ""}
          className="w-full p-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-sans text-[var(--text)] focus:outline-none focus:border-[var(--accent)] leading-relaxed"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label className="text-[var(--text)] font-semibold block">Role</label>
          <input
            type="text"
            name="role"
            defaultValue={initialData?.role || "Solo Full-stack Developer"}
            className="w-full h-10 px-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-sans text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[var(--text)] font-semibold block">
            Team Size
          </label>
          <input
            type="number"
            name="teamSize"
            defaultValue={initialData?.teamSize || 1}
            min={1}
            className="w-full h-10 px-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-mono text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[var(--text)] font-semibold block">
            Sort Order
          </label>
          <input
            type="number"
            name="sortOrder"
            defaultValue={initialData?.sortOrder || 0}
            className="w-full h-10 px-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-mono text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label className="text-[var(--text)] font-semibold block">
            Live URL
          </label>
          <input
            type="url"
            name="liveUrl"
            defaultValue={initialData?.liveUrl || ""}
            placeholder="https://..."
            className="w-full h-10 px-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-sans text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[var(--text)] font-semibold block">
            GitHub Repo
          </label>
          <input
            type="url"
            name="repoUrl"
            defaultValue={initialData?.repoUrl || ""}
            placeholder="https://github.com/..."
            className="w-full h-10 px-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-sans text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[var(--text)] font-semibold block">
            Secondary Repo
          </label>
          <input
            type="url"
            name="repoUrl2"
            defaultValue={initialData?.repoUrl2 || ""}
            placeholder="https://github.com/..."
            className="w-full h-10 px-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-sans text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label className="text-[var(--text)] font-semibold block">
            Cover Image URL
          </label>
          <input
            type="text"
            name="coverImage"
            defaultValue={initialData?.coverImage || ""}
            placeholder="https://images.unsplash.com/..."
            className="w-full h-10 px-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-sans text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[var(--text)] font-semibold block">Kind</label>
          <select
            name="kind"
            defaultValue={initialData?.kind || "web"}
            className="w-full h-10 px-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-sans text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
          >
            <option value="web">Web Application</option>
            <option value="mobile">Mobile Application</option>
            <option value="research">Research Prototype</option>
            <option value="client">Client / Capstone</option>
            <option value="academic">Academic</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[var(--text)] font-semibold block">
            Status
          </label>
          <select
            name="status"
            defaultValue={initialData?.status || "shipped"}
            className="w-full h-10 px-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-sans text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
          >
            <option value="shipped">Shipped</option>
            <option value="in_progress">In Progress</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <div className="flex gap-6 py-2 border-y border-[var(--border)]">
        <label className="flex items-center gap-2 cursor-pointer text-sm font-sans text-[var(--text)]">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={initialData?.featured}
            className="w-4 h-4 accent-[var(--accent)] rounded"
          />
          <span>Feature on Home page</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-sm font-sans text-[var(--text)]">
          <input
            type="checkbox"
            name="published"
            defaultChecked={initialData?.published ?? true}
            className="w-4 h-4 accent-[var(--accent)] rounded"
          />
          <span>Publicly Published</span>
        </label>
      </div>

      <div className="space-y-1.5">
        <label className="text-[var(--text)] font-semibold block">
          Problem Statement (Markdown)
        </label>
        <textarea
          name="problem"
          rows={3}
          defaultValue={initialData?.problem || ""}
          placeholder="Describe the architectural challenge or user pain point..."
          className="w-full p-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-sans text-[var(--text)] focus:outline-none focus:border-[var(--accent)] leading-relaxed"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-[var(--text)] font-semibold block">
          Engineered Solution (Markdown)
        </label>
        <textarea
          name="solution"
          rows={3}
          defaultValue={initialData?.solution || ""}
          placeholder="Describe how the solution was designed..."
          className="w-full p-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-sans text-[var(--text)] focus:outline-none focus:border-[var(--accent)] leading-relaxed"
        />
      </div>

      {/* Markdown Body with Live Preview */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-[var(--text)] font-semibold block">
            Case Study Body (Markdown, Architecture, Code)
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
            name="body"
            rows={12}
            value={markdownBody}
            onChange={(e) => setMarkdownBody(e.target.value)}
            placeholder="Write architecture diagrams, numbered key features, code snippets, and results..."
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
        Save and Publish Project
      </Button>
    </form>
  );
}
