import type * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps
  extends React.HTMLAttributes<HTMLDivElement> {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  badge,
  title,
  description,
  align = "left",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-2 mb-8",
        align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-3xl",
        className,
      )}
      {...props}
    >
      {badge && (
        <div className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] inline-block" />
          {badge}
        </div>
      )}
      <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-[var(--text)]">
        {title}
      </h2>
      {description && (
        <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
