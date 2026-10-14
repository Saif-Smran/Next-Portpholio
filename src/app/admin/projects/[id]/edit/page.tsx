import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ProjectForm } from "../../project-form";

interface EditProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata = {
  title: "Edit Project | Admin",
  robots: { index: false, follow: false },
};

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id: Number(id) },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-xl font-bold text-[var(--text)]">
          Edit Project: {project.title}
        </h1>
        <p className="font-mono text-xs text-[var(--muted)]">
          Update case study details, architecture, and deployment links.
        </p>
      </div>

      <ProjectForm initialData={project} />
    </div>
  );
}
