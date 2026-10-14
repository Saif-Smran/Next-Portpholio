import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link" | "danger";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    const variantStyles = {
      primary:
        "bg-[var(--accent)] text-[#0A0B0D] font-semibold hover:opacity-90 shadow-sm border border-transparent focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
      secondary:
        "bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)] hover:bg-[var(--surface)] hover:border-[var(--accent)]/40",
      outline:
        "border border-[var(--border)] bg-transparent text-[var(--text)] hover:bg-[var(--surface-2)] hover:border-[var(--accent)]/50",
      ghost:
        "bg-transparent text-[var(--text)] hover:bg-[var(--surface-2)] hover:text-[var(--accent)]",
      link: "text-[var(--accent)] underline-offset-4 hover:underline p-0 h-auto bg-transparent",
      danger: "bg-[var(--danger)] text-white hover:opacity-90 font-medium",
    };

    const sizeStyles = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-12 rounded-lg px-6 text-base font-medium",
      icon: "h-9 w-9 p-0",
    };

    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-mono text-sm transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
