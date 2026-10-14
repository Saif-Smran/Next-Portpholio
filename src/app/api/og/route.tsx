import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "A.H.M. Saif Smran";
  const subtitle =
    searchParams.get("subtitle") ||
    "Full-stack developer building toward data science and research";

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        backgroundColor: "#0A0B0D",
        padding: "60px 80px",
        fontFamily: "monospace",
        border: "12px solid #181B22",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            backgroundColor: "#B6F24A",
          }}
        />
        <span
          style={{ color: "#B6F24A", fontSize: "24px", fontWeight: "bold" }}
        >
          saif.dev
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <h1
          style={{
            fontSize: "56px",
            fontWeight: 800,
            color: "#E8EAED",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: "26px",
            color: "#8B93A1",
            margin: 0,
            maxWidth: "900px",
          }}
        >
          {subtitle}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          borderTop: "2px solid #242833",
          paddingTop: "24px",
          color: "#8B93A1",
          fontSize: "20px",
        }}
      >
        <span>
          TypeScript · Next.js · Prisma · PostgreSQL · Computer Vision
        </span>
        <span style={{ color: "#B6F24A" }}>Dhaka, Bangladesh</span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
