import { PostForm } from "../post-form";

export const metadata = {
  title: "New Post | Admin",
  robots: { index: false, follow: false },
};

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-xl font-bold text-[var(--text)]">
          Create New Blog Post
        </h1>
        <p className="font-mono text-xs text-[var(--muted)]">
          Publish a new engineering article or research log.
        </p>
      </div>

      <PostForm />
    </div>
  );
}
