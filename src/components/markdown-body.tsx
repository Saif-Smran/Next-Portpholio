import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface MarkdownBodyProps {
  content: string;
  className?: string;
}

export function MarkdownBody({ content, className }: MarkdownBodyProps) {
  return (
    <div
      className={cn(
        "prose prose-invert max-w-none text-[var(--text)] leading-relaxed space-y-4 font-sans text-sm md:text-base",
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h1
              className="font-heading text-2xl md:text-3xl font-bold mt-8 mb-4 tracking-tight text-[var(--text)]"
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              className="font-heading text-xl md:text-2xl font-semibold mt-6 mb-3 tracking-tight text-[var(--text)] border-b border-[var(--border)] pb-2"
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              className="font-heading text-lg md:text-xl font-semibold mt-5 mb-2 text-[var(--text)]"
              {...props}
            />
          ),
          p: ({ node, ...props }) => (
            <p
              className="text-[var(--text)]/90 leading-relaxed mb-4"
              {...props}
            />
          ),
          ul: ({ node, ...props }) => (
            <ul
              className="list-disc pl-5 space-y-1.5 mb-4 text-[var(--text)]/90"
              {...props}
            />
          ),
          ol: ({ node, ...props }) => (
            <ol
              className="list-decimal pl-5 space-y-1.5 mb-4 text-[var(--text)]/90"
              {...props}
            />
          ),
          li: ({ node, ...props }) => (
            <li className="leading-relaxed" {...props} />
          ),
          code: ({ node, inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || "");
            if (inline) {
              return (
                <code
                  className="rounded bg-[var(--surface-2)] px-1.5 py-0.5 font-mono text-xs text-[var(--accent)] border border-[var(--border)]"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <div className="relative my-4 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] overflow-hidden font-mono text-xs">
                {match && (
                  <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-[11px] text-[var(--muted)]">
                    <span>{match[1]}</span>
                    <span className="text-[10px]">utf-8</span>
                  </div>
                )}
                <pre className="p-4 overflow-x-auto text-[var(--text)] leading-relaxed">
                  <code {...props}>{children}</code>
                </pre>
              </div>
            );
          },
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-2 border-[var(--accent)] pl-4 py-1 italic text-[var(--muted)] bg-[var(--surface-2)]/30 rounded-r my-4"
              {...props}
            />
          ),
          a: ({ node, ...props }) => (
            <a
              className="text-[var(--accent)] hover:underline underline-offset-4 font-medium"
              target="_blank"
              rel="noreferrer"
              {...props}
            />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4 border border-[var(--border)] rounded-lg">
              <table
                className="w-full text-left font-mono text-xs"
                {...props}
              />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th
              className="bg-[var(--surface-2)] px-4 py-2 border-b border-[var(--border)] font-semibold text-[var(--text)]"
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td
              className="px-4 py-2 border-b border-[var(--border)] text-[var(--muted)]"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
