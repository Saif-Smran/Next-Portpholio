"use client";

import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import * as React from "react";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { type ContactFormState, submitContactMessage } from "./actions";

const initialState: ContactFormState = {
  success: false,
};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactMessage,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-5 font-mono text-xs">
      {state.message && (
        <div
          className={`p-4 rounded-xl border flex items-start gap-3 ${
            state.success
              ? "border-[var(--success)]/30 bg-[var(--success)]/10 text-[var(--success)]"
              : "border-[var(--danger)]/30 bg-[var(--danger)]/10 text-[var(--danger)]"
          }`}
        >
          {state.success ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          <span className="font-sans text-sm leading-relaxed">
            {state.message}
          </span>
        </div>
      )}

      {/* Honeypot field - hidden from human users */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Name & Email grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label
            htmlFor="name"
            className="text-[var(--text)] font-semibold block"
          >
            Your Name <span className="text-[var(--accent)]">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Jane Doe"
            className="w-full h-10 px-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-sans text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
          />
          {state.errors?.name && (
            <p className="text-[var(--danger)] text-[11px]">
              {state.errors.name[0]}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="text-[var(--text)] font-semibold block"
          >
            Your Email <span className="text-[var(--accent)]">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@example.com"
            className="w-full h-10 px-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-sans text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
          />
          {state.errors?.email && (
            <p className="text-[var(--danger)] text-[11px]">
              {state.errors.email[0]}
            </p>
          )}
        </div>
      </div>

      {/* Subject select */}
      <div className="space-y-1.5">
        <label
          htmlFor="subject"
          className="text-[var(--text)] font-semibold block"
        >
          Subject <span className="text-[var(--accent)]">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          defaultValue="internship"
          className="w-full h-10 px-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-sans text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
        >
          <option value="internship">Remote Internship Inquiry</option>
          <option value="freelance">Freelance / Contract Project</option>
          <option value="research">Academic / Research Collaboration</option>
          <option value="other">General Message / Feedback</option>
        </select>
        {state.errors?.subject && (
          <p className="text-[var(--danger)] text-[11px]">
            {state.errors.subject[0]}
          </p>
        )}
      </div>

      {/* Message textarea */}
      <div className="space-y-1.5">
        <label
          htmlFor="body"
          className="text-[var(--text)] font-semibold block"
        >
          Message <span className="text-[var(--accent)]">*</span>
        </label>
        <textarea
          id="body"
          name="body"
          required
          rows={5}
          placeholder="Describe your project, team role, or research discussion..."
          className="w-full p-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm font-sans text-[var(--text)] focus:outline-none focus:border-[var(--accent)] resize-y leading-relaxed"
        />
        {state.errors?.body && (
          <p className="text-[var(--danger)] text-[11px]">
            {state.errors.body[0]}
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        variant="primary"
        disabled={isPending}
        className="w-full sm:w-auto"
      >
        {isPending ? (
          "Submitting message..."
        ) : (
          <>
            Send Message <Send className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
    </form>
  );
}
