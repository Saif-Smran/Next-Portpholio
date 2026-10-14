import { ProjectForm } from "../project-form";

export const metadata = {
  title: "New Project | Admin",
  robots: { index: false, follow: false },
};

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-xl font-bold text-[var(--text)]">
          Create New Project
        </h1>
        <p className="font-mono text-xs text-[var(--muted)]">
          Add a new case study to the portfolio.
        </p>
      </div>

      <ProjectForm />
    </div>
  );
}
