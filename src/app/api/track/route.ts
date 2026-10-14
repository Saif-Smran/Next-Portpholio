import crypto from "node:crypto";
import { type NextRequest, NextResponse } from "next/server";
import { recordPageView } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { path, referrer } = body;

    if (!path || typeof path !== "string") {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    // Extract IP and UA for daily-salted anonymous visitor hashing
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";
    const ua = req.headers.get("user-agent") || "";
    const dateSalt = new Date().toISOString().slice(0, 10); // changes every day

    const visitorHash = crypto
      .createHash("sha256")
      .update(`${ip}_${ua}_${dateSalt}`)
      .digest("hex")
      .slice(0, 24);

    let referrerHost: string | null = null;
    if (referrer) {
      try {
        const url = new URL(referrer);
        referrerHost = url.hostname;
      } catch {
        referrerHost = null;
      }
    }

    await recordPageView({
      path,
      referrerHost,
      visitorHash,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Analytics tracking error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
