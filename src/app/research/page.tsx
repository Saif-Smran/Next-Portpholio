import { BookOpen, CheckCircle2, FileText } from "lucide-react";
import type { Metadata } from "next";
import { MarkdownBody } from "@/components/markdown-body";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { SectionHeading } from "@/components/ui/section-heading";
import { getPrimaryResearch, listEducation } from "@/lib/db";

export async function generateMetadata(): Promise<Metadata> {
  const research = await getPrimaryResearch();
  const title = research?.title
    ? `${research.title} | Research & Thesis`
    : "Research & Thesis | A.H.M. Saif Smran";
  const description =
    research?.abstract ||
    "Undergraduate thesis on Tracking in High Density Crowd, computer vision benchmarks, and reading list by A.H.M. Saif Smran.";

  return {
    title,
    description,
    keywords: [
      "Computer Vision",
      "Crowd Tracking",
      "VisDrone",
      "Undergraduate Thesis",
      "Deep Learning",
      "Saif Smran",
    ],
    openGraph: {
      title,
      description,
      url: "/research",
      type: "article",
      images: [
        {
          url: "/profile-pic.png",
          alt: "Computer Vision Research - A.H.M. Saif Smran",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/profile-pic.png"],
    },
  };
}

export default async function ResearchPage() {
  const [research, educationList] = await Promise.all([
    getPrimaryResearch(),
    listEducation(),
  ]);

  const readingList = [
    {
      title:
        "ByteTrack: Multi-Object Tracking by Associating Every Detection Box",
      authors: "Zhang et al.",
      venue: "ECCV 2022",
      focus: "High-performance association for low-confidence detections",
    },
    {
      title:
        "Observation-Centric SORT: Rethinking SORT for Robust Multi-Object Tracking",
      authors: "Cao et al.",
      venue: "CVPR 2023",
      focus:
        "Handling non-linear motion and camera jitter with adaptive smoothing",
    },
    {
      title:
        "Slicing Aided Hyper Inference and Fine-Tuning for Small Object Detection",
      authors: "Akyon et al.",
      venue: "IEEE ICIP 2022",
      focus: "Overcoming resolution loss in aerial and small target detection",
    },
    {
      title: "Vision Meets Drones: A Challenge (VisDrone Benchmark)",
      authors: "Zhu et al.",
      venue: "IEEE TPAMI 2021",
      focus: "Benchmark dataset containing complex pedestrian scenes from UAVs",
    },
  ];

  return (
    <div className="space-y-16 max-w-4xl">
      <SectionHeading
        badge="Academic Work"
        title="Computer Vision Research & Thesis"
        description="Undergraduate research investigating robust Multi-Object Tracking (MOT) in extreme density crowd scenarios and aerial drone surveillance."
      />

      {/* 1. Main Thesis Card */}
      {research && (
        <Card className="p-6 md:p-8 space-y-6 border-[var(--border)] bg-[var(--surface)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <Badge variant="warn">In Progress</Badge>
              <span className="text-[var(--text)] font-semibold">
                Target: {research.venue} ({research.venueStatus})
              </span>
              <span className="text-[var(--muted)]">· Team of two</span>
            </div>

            <div className="text-xs font-mono text-[var(--accent)]">
              Institution: IUBAT
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--text)]">
              {research.title}
            </h2>
            <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed">
              {research.abstract}
            </p>
          </div>

          {/* Key methods chips */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--border)]">
            <Chip active>YOLOv8 & YOLO11</Chip>
            <Chip active>SAHI (Slicing Aided Hyper Inference)</Chip>
            <Chip active>VisDrone-MOT Benchmark</Chip>
            <Chip active>Recurrent Memory (GRU)</Chip>
            <Chip active>Optical Flow Filtering</Chip>
          </div>

          {/* Deep Dive Body */}
          {research.body && (
            <div className="pt-4 border-t border-[var(--border)]">
              <MarkdownBody content={research.body} />
            </div>
          )}
        </Card>
      )}

      {/* 2. Coursework */}
      {educationList[0]?.courseworkParsed && (
        <section className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-[var(--text)] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[var(--accent)]" /> Relevant
            Academic Coursework
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            {educationList[0].courseworkParsed.map((course) => (
              <div
                key={course}
                className="p-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] flex items-center gap-2 text-[var(--text)]"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                <span>{course}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Research Reading List */}
      <section className="space-y-4">
        <h2 className="font-heading text-xl font-bold text-[var(--text)] flex items-center gap-2">
          <FileText className="w-5 h-5 text-[var(--accent-2)]" /> Literature &
          Reading List
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Core foundations examined for tracking algorithms, scale adaptation,
          and association matrices.
        </p>

        <div className="overflow-x-auto border border-[var(--border)] rounded-xl bg-[var(--surface)] font-mono text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--surface-2)] text-[var(--text)]">
                <th className="p-3.5 font-bold">Paper Title</th>
                <th className="p-3.5 font-bold">Venue</th>
                <th className="p-3.5 font-bold">Key Contribution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {readingList.map((item) => (
                <tr
                  key={item.title}
                  className="hover:bg-[var(--surface-2)]/50 transition-colors"
                >
                  <td className="p-3.5 font-sans font-medium text-[var(--text)]">
                    {item.title}
                    <div className="text-[11px] font-mono text-[var(--muted)] pt-0.5">
                      {item.authors}
                    </div>
                  </td>
                  <td className="p-3.5 whitespace-nowrap text-[var(--accent)]">
                    {item.venue}
                  </td>
                  <td className="p-3.5 text-[var(--muted)] font-sans text-xs">
                    {item.focus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
