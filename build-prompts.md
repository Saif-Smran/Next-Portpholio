# Build prompts

Rule: one phase per new conversation. Start every conversation by attaching `requirements.md`, `prisma/schema.prisma`, and `seed-content.md`. At the end of each phase, commit, then paste "Phase N done, repo state:" plus the output of `tree -L 3 -I node_modules` into the next conversation.

Standing instructions to paste at the top of every phase:

> Follow requirements.md exactly. Do not substitute libraries, rename tables, or change the design tokens. If something is ambiguous, state your assumption in one line and continue. Explain why each non-obvious piece of code works or would break, not just what it does. At the end, list files created or changed and the commands to verify.

---

## Phase 0: Setup
> Phase 0. Create the Next.js (App Router, TypeScript strict, Tailwind) project with pnpm. Install Prisma with SQLite, Zod, lucide-react, motion. Configure Tailwind with the color tokens, fonts (Bricolage Grotesque, Geist Sans, Geist Mono via next/font) and spacing from section 6. Build layout shell: sticky header, footer status line, theme toggle with no flash on load (system default, stored preference), container, and base Button/Badge/Chip/Card components. Add .env.example, ESLint, Prettier, and a README with run instructions.

## Phase 1: Database and data layer
> Phase 1. Place prisma/schema.prisma, run the first migration, enable WAL mode on the Prisma client init. Write prisma/seed.ts that loads everything from seed-content.md idempotently (upsert by slug or key). Create lib/db/ with typed query functions per model (getFeaturedProjects, getProjectBySlug, listProjects with filters, etc.). Parse JSON-string fields inside this layer. Write a script to generate an admin bcrypt hash.

## Phase 2: Core public pages
> Phase 2. Build Home, Projects (filter by tag and stack via URL search params, server-rendered), Project case study (sticky TOC, markdown body, gallery with lightbox, next/prev), About, Skills, Experience (build-log timeline). All data from lib/db. Server components by default. Responsive at 360, 768, 1280. Include loading and empty states.

## Phase 3: Remaining pages and contact
> Phase 3. Build Research, Blog list and post, Now, Resume (PDF embed + download via /resume.pdf route), Contact. Contact uses a server action with Zod validation, honeypot, IP-hash rate limit (5/hour, stored in DB or in-memory map), saves to Message, optional SMTP email that never blocks saving. Add 404 page.

## Phase 4: Palette, search, SEO
> Phase 4. Add the Ctrl/Cmd+K command palette (pages, projects, actions: download CV, copy email, toggle theme). Add SQLite search over projects and posts (FTS5 or LIKE, your call, justify). Add sitemap.ts, robots.ts, RSS, per-page metadata, JSON-LD, and OG image route with next/og.

## Phase 5: Admin
> Phase 5. Build admin auth: single admin, bcrypt hash from env, jose JWT in httpOnly Secure SameSite=Lax cookie, middleware protecting /admin/*, login rate limit. Then CRUD for every content type with Zod validation, publish toggle, drag reorder (sortOrder), markdown editor with live preview, image upload with type/size checks and required alt text. Revalidate affected public paths after each write.

## Phase 6: Analytics, GitHub, uploads
> Phase 6. Add privacy-friendly page-view tracking (hashed visitor id with daily salt, no cookies) and an admin dashboard with 30-day views, top pages, referrers, unread messages. Add GitHub API integration cached in Setting for 6 hours with stale fallback. Serve uploads from a configurable directory via route handler.

## Phase 7: Polish and tests
> Phase 7. Run an accessibility pass (focus, contrast, reduced motion, landmarks), fix Lighthouse issues to reach 95+ on all four categories, add security headers and CSP, add Playwright smoke tests (home, project page, contact submit, admin login and edit). Report before/after Lighthouse numbers.

## Phase 8: Deploy
> Phase 8. Prepare Railway deployment: Dockerfile or Nixpacks config, Volume at /data, DATABASE_URL pointing to it, start script running prisma migrate deploy, a backup script copying the SQLite file nightly, health check route. Give a step-by-step deploy checklist and a rollback plan.

---

## When the AI drifts
- It added a library not in the stack: "Remove it, use the stack in section 2."
- It hard-coded content: "FR-1: read from SQLite. Move this to the seed and query it."
- It made the design generic: "Re-read section 6.1. Remove gradients and glass cards, use the tokens."
- A phase got too big: stop, commit what works, continue in a new conversation.
