import { Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { LoginForm } from "./login-form";

export const metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center font-mono">
      <Card className="w-full max-w-md p-8 space-y-6 bg-[var(--surface)] border-[var(--border)] shadow-xl">
        <div className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-[var(--text)]">
            Admin Portal
          </h1>
          <p className="text-xs text-[var(--muted)]">
            Sign in to manage portfolio content, projects, and messages.
          </p>
        </div>

        <LoginForm />
      </Card>
    </div>
  );
}
