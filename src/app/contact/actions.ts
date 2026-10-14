"use server";

import crypto from "node:crypto";
import { headers } from "next/headers";
import { createMessage } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";
import { contactMessageSchema } from "@/lib/validators";

export interface ContactFormState {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

export async function submitContactMessage(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    subject: formData.get("subject") as string,
    body: formData.get("body") as string,
    website: formData.get("website") as string, // Honeypot field
  };

  // 1. Zod Validation
  const validated = contactMessageSchema.safeParse(rawData);
  if (!validated.success) {
    return {
      success: false,
      message: "Please review the fields below.",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  // 2. Honeypot check: If the hidden 'website' field is populated, silently fail or reject
  if (rawData.website && rawData.website.trim().length > 0) {
    return {
      success: true,
      message: "Your message has been sent successfully.",
    };
  }

  // 3. IP Rate Limiting (5 per hour per IP hash)
  const headerStore = await headers();
  const clientIp =
    headerStore.get("x-forwarded-for")?.split(",")[0].trim() ||
    headerStore.get("x-real-ip") ||
    "127.0.0.1";

  const ipHash = crypto
    .createHash("sha256")
    .update(clientIp)
    .digest("hex")
    .slice(0, 16);
  const rateLimit = checkRateLimit(`contact_${ipHash}`, 5, 60 * 60 * 1000); // 5 per hour

  if (!rateLimit.allowed) {
    return {
      success: false,
      message:
        "Rate limit exceeded: You can only send 5 messages per hour. Please email directly at smrangb@gmail.com.",
    };
  }

  try {
    // 4. Save to Message table in PostgreSQL
    await createMessage({
      name: validated.data.name,
      email: validated.data.email,
      subject: validated.data.subject,
      body: validated.data.body,
      ipHash,
    });

    // 5. Optional SMTP Email notification (never blocks database saving)
    if (
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    ) {
      // Background SMTP notification hook if configured
    }

    return {
      success: true,
      message:
        "Thank you! Your message has been safely received. I will reply to your email shortly.",
    };
  } catch (err: any) {
    console.error("Contact submit error:", err);
    return {
      success: false,
      message:
        "An unexpected database error occurred while saving your message. Please reach out to smrangb@gmail.com directly.",
    };
  }
}
