"use client";

import { Command } from "cmdk";
import {
  BookOpen,
  Briefcase,
  Clock,
  Copy,
  Download,
  FileText,
  FolderGit2,
  Home,
  Mail,
  PenSquare,
  Search,
  Sun,
  User,
  Wrench,
} from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Dialog, DialogContent } from "./ui/dialog";

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("smrangb@gmail.com");
    alert("Email copied to clipboard: smrangb@gmail.com");
  };

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden md:inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono text-[var(--muted)] hover:text-[var(--text)] bg-[var(--surface-2)] border border-[var(--border)] rounded-md transition-all hover:border-[var(--accent)]/40 cursor-pointer"
        aria-label="Open command palette"
      >
        <Search className="w-3 h-3 text-[var(--accent)]" />
        <span>Search</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border border-[var(--border)] bg-[var(--surface)] px-1.5 font-mono text-[10px] font-medium text-[var(--muted)]">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 overflow-hidden bg-[var(--surface)] border-[var(--border)] max-w-xl">
          <Command className="flex h-full w-full flex-col overflow-hidden rounded-xl bg-[var(--surface)] text-[var(--text)]">
            <div className="flex items-center border-b border-[var(--border)] px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 text-[var(--muted)]" />
              <Command.Input
                placeholder="Type a command or search..."
                className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm font-sans outline-none placeholder:text-[var(--muted)] disabled:cursor-not-allowed disabled:opacity-50 text-[var(--text)]"
              />
            </div>
            <Command.List className="max-h-[320px] overflow-y-auto p-2 font-mono text-xs">
              <Command.Empty className="py-6 text-center text-sm text-[var(--muted)]">
                No matching results found.
              </Command.Empty>

              <Command.Group
                heading="Pages"
                className="px-2 py-1.5 text-[10px] uppercase font-bold text-[var(--muted)]"
              >
                <Command.Item
                  onSelect={() => runCommand(() => router.push("/"))}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-xs text-[var(--text)] hover:bg-[var(--surface-2)] hover:text-[var(--accent)] cursor-pointer"
                >
                  <Home className="h-4 w-4" /> Home
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => router.push("/projects"))}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-xs text-[var(--text)] hover:bg-[var(--surface-2)] hover:text-[var(--accent)] cursor-pointer"
                >
                  <FolderGit2 className="h-4 w-4" /> Projects
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => router.push("/research"))}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-xs text-[var(--text)] hover:bg-[var(--surface-2)] hover:text-[var(--accent)] cursor-pointer"
                >
                  <BookOpen className="h-4 w-4" /> Research (Thesis)
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => router.push("/about"))}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-xs text-[var(--text)] hover:bg-[var(--surface-2)] hover:text-[var(--accent)] cursor-pointer"
                >
                  <User className="h-4 w-4" /> About & Education
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => router.push("/skills"))}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-xs text-[var(--text)] hover:bg-[var(--surface-2)] hover:text-[var(--accent)] cursor-pointer"
                >
                  <Wrench className="h-4 w-4" /> Skills
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => router.push("/experience"))}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-xs text-[var(--text)] hover:bg-[var(--surface-2)] hover:text-[var(--accent)] cursor-pointer"
                >
                  <Briefcase className="h-4 w-4" /> Experience & Timeline
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => router.push("/blog"))}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-xs text-[var(--text)] hover:bg-[var(--surface-2)] hover:text-[var(--accent)] cursor-pointer"
                >
                  <PenSquare className="h-4 w-4" /> Blog & Build Logs
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => router.push("/now"))}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-xs text-[var(--text)] hover:bg-[var(--surface-2)] hover:text-[var(--accent)] cursor-pointer"
                >
                  <Clock className="h-4 w-4" /> Now (What I am doing)
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => router.push("/contact"))}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-xs text-[var(--text)] hover:bg-[var(--surface-2)] hover:text-[var(--accent)] cursor-pointer"
                >
                  <Mail className="h-4 w-4" /> Contact
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => router.push("/resume"))}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-xs text-[var(--text)] hover:bg-[var(--surface-2)] hover:text-[var(--accent)] cursor-pointer"
                >
                  <FileText className="h-4 w-4" /> Resume / CV
                </Command.Item>
              </Command.Group>

              <Command.Group
                heading="Projects"
                className="px-2 py-1.5 text-[10px] uppercase font-bold text-[var(--muted)]"
              >
                <Command.Item
                  onSelect={() =>
                    runCommand(() => router.push("/projects/urbanmatch"))
                  }
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-xs text-[var(--text)] hover:bg-[var(--surface-2)] hover:text-[var(--accent)] cursor-pointer"
                >
                  <FolderGit2 className="h-4 w-4 text-[var(--accent)]" />{" "}
                  UrbanMatch (Housing & Roommates)
                </Command.Item>
                <Command.Item
                  onSelect={() =>
                    runCommand(() => router.push("/projects/gearup"))
                  }
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-xs text-[var(--text)] hover:bg-[var(--surface-2)] hover:text-[var(--accent)] cursor-pointer"
                >
                  <FolderGit2 className="h-4 w-4 text-[var(--accent)]" /> GearUp
                  (Sports Gear Rental)
                </Command.Item>
                <Command.Item
                  onSelect={() =>
                    runCommand(() =>
                      router.push("/projects/student-financial-tracker"),
                    )
                  }
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-xs text-[var(--text)] hover:bg-[var(--surface-2)] hover:text-[var(--accent)] cursor-pointer"
                >
                  <FolderGit2 className="h-4 w-4 text-[var(--accent)]" />{" "}
                  Student Financial Tracker
                </Command.Item>
              </Command.Group>

              <Command.Group
                heading="Actions"
                className="px-2 py-1.5 text-[10px] uppercase font-bold text-[var(--muted)]"
              >
                <Command.Item
                  onSelect={() =>
                    runCommand(() => window.open("/resume.pdf", "_blank"))
                  }
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-xs text-[var(--text)] hover:bg-[var(--surface-2)] hover:text-[var(--accent)] cursor-pointer"
                >
                  <Download className="h-4 w-4 text-[var(--accent)]" /> Download
                  CV (PDF)
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(copyEmail)}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-xs text-[var(--text)] hover:bg-[var(--surface-2)] hover:text-[var(--accent)] cursor-pointer"
                >
                  <Copy className="h-4 w-4 text-[var(--accent-2)]" /> Copy Email
                  (smrangb@gmail.com)
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(toggleTheme)}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-xs text-[var(--text)] hover:bg-[var(--surface-2)] hover:text-[var(--accent)] cursor-pointer"
                >
                  <Sun className="h-4 w-4 text-[var(--warn)]" /> Toggle Dark /
                  Light Theme
                </Command.Item>
              </Command.Group>
            </Command.List>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
