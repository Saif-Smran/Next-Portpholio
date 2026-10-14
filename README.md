# A.H.M. Saif Smran | Portfolio v2

Modern developer portfolio and academic research showcase built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, **Prisma ORM**, and **Prisma PostgreSQL**.

Designed with the **"Quiet Terminal"** aesthetic: high-contrast dark mode, custom shadcn/ui primitives, Bricolage Grotesque and Geist typography, and developer-centric engineering case studies.

---

## ⚡ Tech Stack

- **Framework**: Next.js 16 (App Router, Server Components by default)
- **Language**: TypeScript Strict Mode
- **Styling**: Tailwind CSS (CSS variables, Quiet Terminal design tokens)
- **UI Primitives**: shadcn/ui primitives (`cmdk`, Radix UI Dialog, Slot, Lucide Icons)
- **Database & ORM**: PostgreSQL via Prisma ORM
- **Validation**: Zod (all Server Actions and mutations)
- **Admin Auth**: Single admin JWT in httpOnly Secure SameSite=Lax cookie via `jose`, bcrypt password verification
- **Analytics**: Privacy-friendly anonymous page-view tracking (daily-salted SHA-256 visitor hash, zero cookies)
- **Markdown**: `react-markdown` + `remark-gfm` for case study deep-dives and build logs

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
bun install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Ensure your `DATABASE_URL` (PostgreSQL / Prisma Postgres) is configured:
```env
DATABASE_URL="postgres://username:password@pooled.db.prisma.io:5432/postgres?sslmode=require"
ADMIN_EMAIL="smrangb@gmail.com"
ADMIN_PASSWORD_HASH="$2b$10$4okVLlAw./DcVs8FWVIjGuf7fQJ8eua79d8VaR3binElcHu4RyGD6" # password: admin123
JWT_SECRET="1c6d7d87d04ac6cf2be0639543e6fabfbe70b7cd7970f8aa6fb249fec1e98e1a"
SITE_URL="http://localhost:3000"
```

### 3. Sync Database & Seed Data
Push the schema to PostgreSQL and run the idempotent seed script:
```bash
bunx prisma db push
bun prisma/seed.ts
```

### 4. Start Development Server
```bash
bun run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧭 Site Structure

| Route | Description |
|---|---|
| `/` | Home: Hero, Terminal identity card, Proof metrics, Featured projects, Research teaser, Latest logs |
| `/projects` | Filterable project catalog with live stack/kind query parameters and search |
| `/projects/[slug]` | Case study: Sticky TOC, problem/solution, architecture deep-dive, code snippets, next/prev |
| `/research` | Academic thesis (*Tracking in High Density Crowd*), VisDrone benchmark, coursework, reading list |
| `/about` | Background story, IUBAT education, commit-style milestone timeline, spoken languages |
| `/skills` | Categorized tech stack with word proficiency levels and linked project implementations |
| `/experience` | Chronological build log: client projects (Ha-Meem attendance), leadership, peer tutoring |
| `/blog` & `/blog/[slug]` | Engineering build logs and architectural writeups |
| `/now` | Current monthly focus and active research updates |
| `/resume` & `/resume.pdf` | Printable CV layout and direct PDF route handler |
| `/contact` | Form with Zod validation, honeypot detection, IP rate limiting, and DB persistence |
| `/admin/*` | Protected admin management for projects, posts, messages, and analytics |
| `/api/og` | Dynamic Open Graph image generation with `next/og` |
| `/api/health` | Service and database health check route |
| `/sitemap.xml` & `/rss.xml` | SEO sitemap and RSS feed |

---

## 🔐 Admin Portal

- **URL**: `/admin/login`
- **Default Email**: `smrangb@gmail.com`
- **Default Password**: `admin123`
- To generate a new bcrypt password hash:
  ```bash
  node scripts/generate-password-hash.mjs <your-new-password>
  ```

---

## 📦 Deployment (Railway / Docker)

A multi-stage `Dockerfile` is included in the repository.

1. Connect your GitHub repository to **Railway**.
2. Add your environment variables (`DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, `JWT_SECRET`, `SITE_URL`).
3. Deploy! The container runs `bunx prisma db push && bun run start`.
