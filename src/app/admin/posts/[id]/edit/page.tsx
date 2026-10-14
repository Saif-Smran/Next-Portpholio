import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PostForm } from "../../post-form";

interface EditPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata = {
  title: "Edit Post | Admin",
  robots: { index: false, follow: false },
};

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-xl font-bold text-[var(--text)]">
          Edit Post: {post.title}
        </h1>
        <p className="font-mono text-xs text-[var(--muted)]">
          Update article content, tags, or publishing status.
        </p>
      </div>

      <PostForm initialData={post} />
    </div>
  );
}
