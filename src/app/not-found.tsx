import { ArrowLeft, Home, Terminal } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6 font-mono">
      <div className="w-16 h-16 rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center text-[var(--danger)]">
        <Terminal className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <div className="text-xs uppercase tracking-widest text-[var(--danger)] font-bold">
          404 · Page Not Found
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-[var(--text)]">
          Resource Does Not Exist
        </h1>
        <p className="font-sans text-sm md:text-base text-[var(--muted)] max-w-md mx-auto leading-relaxed">
          The requested path or slug could not be located in this portfolio. It
          may have been moved, renamed, or deleted.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Button asChild variant="primary">
          <Link href="/" className="gap-2">
            <Home className="w-4 h-4" /> Return Home
          </Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/projects" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Browse Projects
          </Link>
        </Button>
      </div>
    </div>
  );
}
