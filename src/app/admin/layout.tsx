import { getAdminSession } from "@/lib/auth";
import { AdminSidebar } from "./admin-sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  // If not logged in and not on login page, let proxy/middleware handle redirect
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
      {/* Left Sidebar */}
      <AdminSidebar email={session.email} />

      {/* Main Admin Content View */}
      <main className="flex-1 w-full min-w-0">{children}</main>
    </div>
  );
}
