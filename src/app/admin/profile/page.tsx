import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getProfile } from "@/lib/db";
import { updateProfileAction } from "../actions";

export const metadata = {
  title: "Edit Profile & Now | Admin",
  robots: { index: false, follow: false },
};

export default async function AdminProfilePage() {
  const profile = await getProfile();

  return (
    <div className="space-y-6 font-mono text-xs max-w-4xl">
      <div>
        <h1 className="font-heading text-xl font-bold text-[var(--text)]">
          Profile & /now Page Settings
        </h1>
        <p className="text-[var(--muted)]">
          Update personal positioning, bio, availability status, and monthly
          focus.
        </p>
      </div>

      <Card className="p-6 md:p-8 bg-[var(--surface)] border-[var(--border)]">
        <form action={updateProfileAction} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="profile-name"
                className="text-[var(--text)] font-semibold block"
              >
                Full Name
              </label>
              <input
                id="profile-name"
                type="text"
                name="name"
                defaultValue={profile?.name || "A.H.M. Saif Smran"}
                required
                className="w-full h-10 px-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-sans text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="profile-email"
                className="text-[var(--text)] font-semibold block"
              >
                Email Address
              </label>
              <input
                id="profile-email"
                type="email"
                name="email"
                defaultValue={profile?.email || "smrangb@gmail.com"}
                required
                className="w-full h-10 px-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-sans text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="profile-headline"
              className="text-[var(--text)] font-semibold block"
            >
              Headline / One-Liner
            </label>
            <input
              id="profile-headline"
              type="text"
              name="headline"
              defaultValue={
                profile?.headline ||
                "Full-stack developer building toward data science and research"
              }
              required
              className="w-full h-10 px-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-sans text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="profile-location"
                className="text-[var(--text)] font-semibold block"
              >
                Location
              </label>
              <input
                id="profile-location"
                type="text"
                name="location"
                defaultValue={profile?.location || "Dhaka, Bangladesh"}
                required
                className="w-full h-10 px-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-sans text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="profile-availability"
                className="text-[var(--text)] font-semibold block"
              >
                Availability Status
              </label>
              <select
                id="profile-availability"
                name="availability"
                defaultValue={profile?.availability || "open"}
                className="w-full h-10 px-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-sans text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
              >
                <option value="open">Open (Available)</option>
                <option value="limited">Limited Availability</option>
                <option value="closed">Closed to New Roles</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="profile-note"
                className="text-[var(--text)] font-semibold block"
              >
                Availability Note
              </label>
              <input
                id="profile-note"
                type="text"
                name="availabilityNote"
                defaultValue={
                  profile?.availabilityNote || "Open to remote internships"
                }
                className="w-full h-10 px-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-sans text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="profile-bio"
              className="text-[var(--text)] font-semibold block"
            >
              Bio (Markdown / Prose)
            </label>
            <textarea
              id="profile-bio"
              name="bio"
              rows={4}
              defaultValue={profile?.bio || ""}
              className="w-full p-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-sans text-[var(--text)] focus:outline-none focus:border-[var(--accent)] leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="profile-now"
              className="text-[var(--text)] font-semibold block"
            >
              /now Text (Markdown - Content displayed on /now page)
            </label>
            <textarea
              id="profile-now"
              name="nowText"
              rows={8}
              defaultValue={profile?.nowText || ""}
              placeholder="What you are building, researching, and learning this month..."
              className="w-full p-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-mono text-[var(--text)] focus:outline-none focus:border-[var(--accent)] leading-relaxed"
            />
          </div>

          <Button type="submit" variant="primary" size="lg" className="gap-2">
            <Save className="w-4 h-4" /> Save Profile Settings
          </Button>
        </form>
      </Card>
    </div>
  );
}
