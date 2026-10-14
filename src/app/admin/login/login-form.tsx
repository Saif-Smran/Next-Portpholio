"use client";

import { AlertCircle, ArrowRight, Lock, Mail } from "lucide-react";
import * as React from "react";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { loginAdminAction } from "../actions";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAdminAction, null);

  return (
    <form action={formAction} className="space-y-4 text-xs font-mono">
      {state?.error && (
        <div className="p-3 rounded-lg border border-[var(--danger)]/30 bg-[var(--danger)]/10 text-[var(--danger)] flex items-center gap-2 font-sans text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <div className="space-y-1.5">
        <label htmlFor="admin-email" className="text-[var(--text)] font-semibold block">
          Admin Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
          <input
            id="admin-email"
            type="email"
            name="email"
            autoComplete="username"
            required
            defaultValue="smrangb@gmail.com"
            className="w-full h-10 pl-9 pr-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-sans text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="admin-password" className="text-[var(--text)] font-semibold block">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
          <input
            id="admin-password"
            type="password"
            name="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
            className="w-full h-10 pl-9 pr-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-sans text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
          />
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isPending}
        className="w-full mt-2"
      >
        {isPending ? "Authenticating..." : "Authenticate Session"}{" "}
        <ArrowRight className="w-4 h-4 ml-1" />
      </Button>

      <div className="text-[11px] text-[var(--muted)] text-center pt-2">
        Single admin authentication via signed JWT cookie (jose).
      </div>
    </form>
  );
}
