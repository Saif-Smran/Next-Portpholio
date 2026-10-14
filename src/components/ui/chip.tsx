import type * as React from "react";
import { cn } from "@/lib/utils";

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  active?: boolean;
}

export function Chip({ className, active, ...props }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono border transition-all cursor-default",
        active
          ? "bg-[var(--accent)]/15 text-[var(--accent)] border-[var(--accent)]/40 font-semibold"
          : "bg-[var(--surface-2)] text-[var(--muted)] border-[var(--border)] hover:border-[var(--accent)]/30 hover:text-[var(--text)]",
        className,
      )}
      {...props}
    />
  );
}
