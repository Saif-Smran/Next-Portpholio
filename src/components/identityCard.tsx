import { Terminal } from "lucide-react";

export function IdentityCard() {
  return (
    <div className="mt-12 max-w-3xl mx-auto">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl shadow-black/20 overflow-hidden font-mono text-xs glow-card">
        {/* Window bar */}
        <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-sm shadow-[#FF5F56]/40 inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-sm shadow-[#FFBD2E]/40 inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] shadow-sm shadow-[#27C93F]/40 inline-block" />
          </div>
          <span className="text-[11px] text-[var(--muted)] font-semibold">
            saif@developer:~
          </span>
          <Terminal className="w-4 h-4 text-[var(--accent)]" />
        </div>

        {/* Terminal content with rich syntax highlighting */}
        <div className="p-5 space-y-4 text-[12px] bg-[var(--surface)]">
          <div className="text-[var(--muted)] flex items-center gap-2">
            <span className="text-[var(--accent)] font-bold">$</span>
            <span className="text-sky-400">cat</span>
            <span className="text-amber-400">identity.json</span>
          </div>

          <div className="space-y-2 border-l-2 border-[var(--accent)]/40 pl-3.5 text-[var(--text)]">
            <div className="flex justify-between items-center">
              <span className="text-sky-400 font-medium">"role":</span>
              <span className="font-semibold text-emerald-400">
                "Full-stack Developer"
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sky-400 font-medium">"direction":</span>
              <span className="text-[var(--accent)] font-semibold">
                "Data Science & Research"
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sky-400 font-medium">"core_stack":</span>
              <span className="text-[var(--accent-2)]">
                "Next.js · Prisma · Postgres"
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sky-400 font-medium">"location":</span>
              <span className="text-[var(--text)]">"Dhaka, Bangladesh"</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sky-400 font-medium">"education":</span>
              <span className="text-indigo-400 font-medium">
                "BSc CSE, IUBAT (2027)"
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sky-400 font-medium">"thesis":</span>
              <span className="text-amber-300 font-medium">
                "Crowd Tracking (VisDrone)"
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sky-400 font-medium">"seeking":</span>
              <span className="text-[var(--success)] font-bold bg-[var(--success)]/10 px-2 py-0.5 rounded border border-[var(--success)]/30">
                "Remote Internship"
              </span>
            </div>
          </div>

          <div className="pt-2.5 border-t border-[var(--border)] flex items-center justify-between text-[11px]">
            <span className="text-[var(--muted)] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-violet-400 inline-block" />
              git:(<span className="text-violet-400">main</span>)
            </span>
            <span className="text-[var(--accent)] flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />{" "}
              ready for deploy
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
