import type * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "accent" | "secondary" | "outline" | "success" | "warn";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantStyles = {
    default: "bg-[var(--surface-2)] text-[var(--text)] border-[var(--border)]",
    accent:
      "bg-[var(--accent)]/15 text-[var(--accent)] border-[var(--accent)]/30 font-medium",
    secondary: "bg-[var(--surface)] text-[var(--muted)] border-[var(--border)]",
    outline: "border-[var(--border)] text-[var(--text)] bg-transparent",
    success:
      "bg-[var(--success)]/15 text-[var(--success)] border-[var(--success)]/30",
    warn: "bg-[var(--warn)]/15 text-[var(--warn)] border-[var(--warn)]/30",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-mono font-medium transition-colors",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
