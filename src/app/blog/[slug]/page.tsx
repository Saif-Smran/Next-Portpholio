import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownBody } from "@/components/markdown-body";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { getPostBySlug } from "@/lib/db";
import { formatDate } from "@/lib/utils";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt?.toISOString(),
      authors: ["A.H.M. Saif Smran"],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Article JSON-LD Schema (FR-14)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt?.toISOString(),
    author: {
      "@type": "Person",
      name: "A.H.M. Saif Smran",
      url: "https://github.com/Saif-Smran",
    },
    publisher: {
      "@type": "Person",
      name: "A.H.M. Saif Smran",
    },
  };

  return (
    <article className="max-w-3xl mx-auto space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Back button */}
      <div>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="font-mono text-xs text-[var(--muted)] hover:text-[var(--text)]"
        >
          <Link href="/blog" className="gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to blog index
          </Link>
        </Button>
      </div>

      {/* Post Header */}
      <header className="space-y-4 border-b border-[var(--border)] pb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--muted)]">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[var(--accent-2)]" />
            <span>5 min read</span>
          </div>
          <span>·</span>
          <span>By Saif Smran</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text)] leading-tight">
          {post.title}
        </h1>

        <p className="text-base md:text-lg text-[var(--muted)] leading-relaxed">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {post.tagsParsed.map((tag) => (
            <Chip key={tag} className="text-xs">
              #{tag}
            </Chip>
          ))}
        </div>
      </header>

      {/* Post Body (Markdown) */}
      <div className="pt-2">
        <MarkdownBody content={post.body} />
      </div>

      {/* Post Footer */}
      <footer className="pt-10 border-t border-[var(--border)] font-mono text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[var(--muted)]">
          Found an error or have feedback? Let me know via the contact form.
        </span>
        <Button asChild variant="secondary" size="sm">
          <Link href="/contact">Get in Touch</Link>
        </Button>
      </footer>
    </article>
  );
}
