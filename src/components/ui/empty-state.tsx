import { Terminal } from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface)]/50",
        className,
      )}
      {...props}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--surface-2)] text-[var(--muted)] mb-4">
        {icon || <Terminal className="h-6 w-6 text-[var(--accent)]" />}
      </div>
      <h3 className="font-heading text-lg font-semibold text-[var(--text)]">
        {title}
      </h3>
      {description && (
        <p className="mt-1 text-sm text-[var(--muted)] max-w-sm">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
