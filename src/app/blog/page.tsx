import { ArrowRight, Calendar, Search } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import { listPosts } from "@/lib/db";
import { formatDate } from "@/lib/utils";

interface BlogPageProps {
  searchParams: Promise<{
    tag?: string;
    q?: string;
  }>;
}

import type { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const tag = resolvedParams.tag;
  const q = resolvedParams.q;

  let title = "Blog & Engineering Build Logs | A.H.M. Saif Smran";
  let description =
    "In-depth technical writeups on architectural decisions, race conditions, PostgreSQL migrations, Stripe payments, and computer vision research.";

  if (tag && tag !== "all") {
    title = `${tag} Articles & Engineering Logs | Saif Smran`;
    description = `Technical articles, design patterns, and case studies focused on ${tag} by A.H.M. Saif Smran.`;
  } else if (q) {
    title = `Search: "${q}" in Blog | Saif Smran`;
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "/blog",
      type: "website",
      images: [
        {
          url: "/profile-pic.png",
          alt: "A.H.M. Saif Smran Blog & Build Logs",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/profile-pic.png"],
    },
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedParams = await searchParams;
  const currentTag = resolvedParams.tag || "all";
  const searchQuery = resolvedParams.q || "";

  const posts = await listPosts({
    tag: currentTag,
    search: searchQuery,
  });

  const popularTags = [
    "all",
    "Prisma",
    "PostgreSQL",
    "Stripe",
    "Next.js",
    "Architecture",
    "Computer Vision",
    "Research",
  ];

  return (
    <div className="space-y-10 max-w-4xl">
      <SectionHeading
        badge="Build Logs"
        title="Engineering Notes & Architecture"
        description="Concise articles documenting non-obvious engineering solutions, transactional workflows, and research progress."
      />

      {/* Filter and Search Bar */}
      <div className="space-y-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 font-mono">
        <form method="GET" action="/blog" className="relative">
          <input type="hidden" name="tag" value={currentTag} />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
          <input
            type="text"
            name="q"
            defaultValue={searchQuery}
            placeholder="Search articles..."
            className="w-full h-10 pl-10 pr-4 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-sans text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)]"
          />
        </form>

        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[var(--border)]">
          <span className="text-xs text-[var(--muted)] mr-1">Tags:</span>
          {popularTags.map((t) => {
            const isActive = currentTag.toLowerCase() === t.toLowerCase();
            const queryObj: Record<string, string> = {};
            if (t !== "all") queryObj.tag = t;
            if (searchQuery) queryObj.q = searchQuery;

            const href =
              Object.keys(queryObj).length > 0
                ? `/blog?${new URLSearchParams(queryObj).toString()}`
                : "/blog";

            return (
              <Link key={t} href={href}>
                <Chip active={isActive} className="text-xs">
                  {t === "all" ? "All Tags" : `#${t}`}
                </Chip>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Posts List */}
      {posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="p-6 md:p-8 flex flex-col justify-between hover:border-[var(--accent)]/40 hover:-translate-y-1 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--muted)]">
                  <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>{formatDate(post.publishedAt)}</span>
                  <span className="text-[var(--border)]">·</span>
                  <span>5 min read</span>
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h2 className="font-heading text-xl md:text-2xl font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[var(--border)] flex items-center justify-between font-mono text-xs">
                <div className="flex flex-wrap gap-1.5">
                  {post.tagsParsed.map((tag) => (
                    <span key={tag} className="text-[var(--accent-2)]">
                      #{tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-[var(--accent)] hover:underline inline-flex items-center gap-1 shrink-0"
                >
                  Read Post <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No articles found"
          description="Try clearing your search query or choosing another tag filter."
        />
      )}
    </div>
  );
}
