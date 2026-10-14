# Portfolio v2: Requirements

Owner: A.H.M. Saif Smran (Hosain). Replaces https://saif-smran-portfolio.netlify.app/
How to use: give an AI this file + `prisma/schema.prisma` + `seed-content.md`, then follow `build-prompts.md` one phase per conversation.

---

## 1. Goals and audiences

One site, three audiences. Every page must serve at least one.

| Audience | What they decide | What they must find in under 60 seconds |
|---|---|---|
| Remote internship recruiters / hiring managers | Interview or not | Role, stack, 3 shipped projects with live links, contact |
| MS admissions committees (TU Munich, LMU, TU Berlin, KIT, TU Delft, UvA, TU/e) | Is this person research-capable | Thesis (crowd tracking), grades, coursework, GitHub, CV download |
| Freelance / client leads | Can they deliver | Case studies, process, contact form |

Success metrics (checked after launch):
- Lighthouse: Performance, Accessibility, SEO, Best Practices all 95+ on mobile
- LCP under 2.0 s on throttled 4G
- Contact form works end to end and lands in the DB
- CV PDF downloadable in one click from every page

Non-goals: blog platform with comments, e-commerce, multi-user accounts, i18n (English only for v1).

---

## 2. Tech stack (fixed, do not substitute)

- Next.js (latest stable, App Router), TypeScript strict
- Tailwind CSS (v4 if the AI setup supports it cleanly, else v3.4). No component library except `lucide-react` icons and optionally `shadcn/ui` primitives for dialog and command palette
- Database: SQLite file via Prisma ORM (`prisma/schema.prisma` provided). DB file path from env `DATABASE_URL="file:./dev.db"`
- Validation: Zod on every server action and API route
- Auth (admin only): single admin, bcrypt password hash in env, signed JWT in httpOnly cookie via `jose`. No third-party auth
- Motion: `motion` (Framer Motion) sparingly, plus CSS for simple things
- Email: Nodemailer (SMTP) or Resend. Optional. If email fails, the message is still saved in the DB
- Markdown: `next-mdx-remote` or `react-markdown` for case study and post bodies stored in the DB
- Package manager: pnpm

### Hosting decision (important)

SQLite is a file. Serverless hosts (Vercel, Netlify) have read-only or ephemeral disks, so writes (contact form, admin edits, page views) will be lost there.
Chosen approach: **deploy on Railway (already used) with a persistent Volume mounted at `/data`**, `DATABASE_URL="file:/data/portfolio.db"`. Single instance only.
Fallback if staying on Vercel: keep SQLite read-only (committed seed DB, admin edits done locally and redeployed) and send contact form to email/webhook instead of the DB.
Backups: nightly copy of the DB file to a second location (cron script or Railway volume snapshot). Never commit the production DB.

---

## 3. Site map and page requirements

Public routes:

| Route | Purpose | Data source |
|---|---|---|
| `/` | Home: hero, 3 featured projects, skills strip, thesis teaser, latest posts, CTA | Profile, Project(featured), Skill, Research, Post |
| `/projects` | Filterable grid (tag, stack, type) + search | Project, Skill |
| `/projects/[slug]` | Case study page | Project, ProjectMedia, ProjectSkill |
| `/research` | Thesis and academic work, coursework, reading list | Research, Education |
| `/about` | Story, education timeline, languages, interests | Profile, Education, Experience |
| `/skills` | Grouped skills with level and "used in" project links | SkillCategory, Skill |
| `/experience` | Timeline: client projects, leadership, tutoring, certifications | Experience, Certification |
| `/blog` and `/blog/[slug]` | Short build logs and learning notes | Post |
| `/now` | What I am working on this month (editable in admin) | Profile.nowText |
| `/contact` | Form + email + social links + availability status | Message, Profile |
| `/resume` | Embedded PDF viewer + download button | Profile.resumeUrl |
| `/uses` (optional) | Tools and setup | Setting |
| `/404`, `/500` | On-brand error pages | none |

Admin routes (`/admin/*`, noindex, behind login):
`/admin/login`, `/admin` (dashboard: unread messages, views, last edits), and CRUD pages for Profile, Projects, Media, Skills, Experience, Education, Certifications, Research, Posts, Messages, Testimonials, Settings. Drag to reorder where `sortOrder` exists. Markdown editor with live preview. Image upload to `/public/uploads` (or `/data/uploads` in production, served via a route handler).

### Page details

**Home**
1. Hero: name, one line positioning ("Full-stack developer. Building toward data science and research."), availability badge (from Profile), two buttons: View projects, Download CV. A small live "currently" line pulled from `/now`
2. Featured projects: UrbanMatch, GearUp, Student Financial Tracker (admin-controlled via `featured` flag, max 3)
3. Proof strip: counts computed from DB (projects shipped, technologies, GitHub repos, years coding). Only show numbers that are true
4. Research teaser: thesis title, status badge, link to `/research`
5. Skills strip: top 10 by `featured`
6. Latest 2 posts
7. Contact CTA

**Project case study** (this is the page that wins interviews, spend the most effort here)
Sections in order: title + one-liner, role and team size, timeline, live link / GitHub buttons, problem, solution, key features (numbered), architecture diagram (image or Mermaid), database design snippet (ERD image), hard problems and how they were solved (e.g. atomic transactions to stop double-booking, webhook-confirmed Stripe payments), tech stack chips, results (only verifiable ones), what I would do next, screenshots gallery, next/previous project.

**Research**
Thesis card: "Tracking in High Density Crowd", status (in progress), supervisor (fill in), team of two, planned venue ICCIT 2027 (show only as "target"), approach summary, datasets (VisDrone), methods (YOLO-family detectors, SAHI, tracking with flow-guided memory), links (repo, notebook). Also: relevant coursework (statistics, ML, NLP, computer vision), and a "reading list" table. Never state "published" until it is.

**Experience**
Include: Ha-Meem Group attendance system (capstone client project, team lead and backend, 4-person team), team lead on academic client projects, tutoring four classmates, practicum (add when started). Get client permission before naming Ha-Meem publicly. If not granted, show "Garment manufacturer, Dhaka".

**Contact**
Fields: name, email, subject (select: Internship, Freelance, Research, Other), message, hidden honeypot. Server action validates with Zod, rate-limits by IP hash (5 per hour), saves to `Message`, optionally emails. Success and error states. Do not publish the phone number on the page; email and LinkedIn only.

---

## 4. Functional requirements

Numbered so prompts and tests can reference them.

- FR-1: All public content is read from SQLite, not hard-coded
- FR-2: Admin can create, edit, delete, reorder, publish/unpublish every content type
- FR-3: Draft vs published state on Project, Post, Research
- FR-4: Slugs auto-generated from title, unique, editable
- FR-5: Project filter by tag and stack with URL query params (shareable, no client-only state)
- FR-6: Full-text-ish search over projects and posts (SQLite `LIKE` or FTS5 virtual table)
- FR-7: Dark and light themes, system default, manual toggle, no flash on load
- FR-8: Command palette (Ctrl/Cmd+K) to jump to any page, project, or action (Download CV, Copy email, Toggle theme)
- FR-9: Contact form saves messages; admin sees unread count; mark read, archive, delete, reply link (mailto)
- FR-10: Privacy-friendly analytics: store path, referrer host, country-less, daily-salted hashed visitor id in `PageView`; dashboard shows 30-day views and top pages. No cookies, so no consent banner
- FR-11: GitHub integration: server-side fetch of pinned repos and contribution count from the GitHub API, cached into the DB (`Setting` key `github_cache`) for 6 hours. Failure falls back to cached data
- FR-12: Sitemap, robots, RSS for blog, Open Graph images generated per page with `next/og`
- FR-13: CV download route `/resume.pdf` redirects to the current file; admin can upload a new one
- FR-14: JSON-LD `Person` schema on home, `Article` on posts, `CreativeWork` on projects
- FR-15: Seed script loads everything from `seed-content.md` content so the site is populated on day one

## 5. Non-functional requirements

- Performance: server components by default, client components only for theme toggle, palette, filters, forms, gallery. `next/image` everywhere. Fonts via `next/font`. No layout shift
- Accessibility: WCAG 2.1 AA, visible focus, keyboard-complete, `prefers-reduced-motion` respected, alt text required on uploads (admin form enforces it)
- Security: Zod on all inputs, parameterized queries (Prisma), CSRF-safe server actions, httpOnly + SameSite=Lax + Secure cookies, login rate limit, security headers (CSP, X-Frame-Options, Referrer-Policy), upload type and size checks (images only, 5 MB), no secrets in repo
- SEO: unique title and description per page, canonical URLs, semantic HTML, one `h1` per page
- Quality: ESLint, Prettier, `tsc --noEmit` clean, a few Playwright smoke tests (home loads, project page loads, contact form submits, admin login works)
- Responsive: 360 px up to 1920 px, designed mobile-first

---

## 6. Design

### 6.1 Direction

Name: "Quiet terminal". A calm, high-contrast, developer-native look. Dark first, with a clean light mode. Signature moves (pick these, skip generic gradient blobs and glassmorphism cards):
1. **Command palette** as the primary power-user navigation
2. **Build-log timeline** on About and Experience (monospace dates, commit-style entries)
3. **Case studies that show the engineering** (diagrams, schema, trade-offs), not just screenshots
4. **Status line** in the footer like a code editor (branch-style: `● available for internships · Dhaka · UTC+6`)
5. One restrained motion idea: text reveals line by line on the hero, everything else is subtle fade/translate on scroll

Avoid: stock illustrations, emoji headings, 3D hero scenes, skill percentage bars, "passionate developer" copy.

### 6.2 Color tokens (CSS variables, mapped in Tailwind)

Dark:
- `--bg` #0A0B0D, `--surface` #111318, `--surface-2` #181B22, `--border` #242833
- `--text` #E8EAED, `--muted` #8B93A1
- `--accent` #B6F24A (acid lime, used for links, focus ring, badges, one CTA per view)
- `--accent-2` #7C9CFF (secondary, charts and tags)
- `--danger` #FF6B6B, `--success` #4ADE80, `--warn` #FBBF24

Light:
- `--bg` #FAFAF7, `--surface` #FFFFFF, `--surface-2` #F1F2EE, `--border` #E2E4DD
- `--text` #14161A, `--muted` #5B6270
- `--accent` #3F6B00 (darker lime for contrast on white), `--accent-2` #3B5BDB

Check every text/background pair for 4.5:1 contrast before shipping.

### 6.3 Typography

- Headings: Bricolage Grotesque (600/700), tight tracking
- Body: Geist Sans (400/500)
- Code, dates, labels, stat numbers: Geist Mono
- Scale: 12, 14, 16, 18, 20, 24, 32, 44, 64 px. Hero `h1` clamps 40 to 72 px. Body line height 1.65, max line length 70ch

### 6.4 Layout and spacing

- 12-column grid, container max 1120 px, side padding 20 px mobile / 32 px desktop
- Spacing scale of 4 px multiples; section vertical padding 96 px desktop / 64 px mobile
- Cards: 12 px radius, 1 px border, no heavy shadows; hover lifts border color to accent at 40% and translates up 2 px
- Header: sticky, blurred bg at 80% opacity, logo wordmark left (`saif.dev` or "Saif Smran"), nav center-right, theme toggle and `⌘K` hint button right. Mobile: full-screen menu
- Footer: status line, sitemap links, social links, copyright

### 6.5 Components to build (in `components/`)

`Button` (primary, ghost, link), `Badge`, `Chip`, `Card`, `SectionHeading`, `ProjectCard`, `ProjectFilter`, `Timeline`, `TimelineItem`, `SkillGroup`, `StatTile`, `ThemeToggle`, `CommandPalette`, `ContactForm`, `MarkdownBody`, `Gallery` (lightbox), `CodeBlock`, `Toast`, `EmptyState`, `Pagination`, admin: `DataTable`, `FormField`, `MarkdownEditor`, `ImageUploader`, `SortableList`, `ConfirmDialog`.

### 6.6 Motion rules

Durations 150 to 400 ms, ease-out. Hero line reveal 600 ms total. Scroll reveals once only. Disable all under `prefers-reduced-motion`.

### 6.7 Wireframe notes

- Home hero: left aligned text block (7 cols), right column holds a compact "terminal card" listing `role`, `stack`, `location`, `status` as key/value lines (static, not a fake typing animation)
- Projects grid: 2 columns desktop, 1 mobile; card shows cover image (16:9), title, one-liner, 3 stack chips, links
- Case study: sticky table of contents on the left (desktop), content 720 px wide

---

## 7. Database

Engine: SQLite, ORM: Prisma. Full schema in `prisma/schema.prisma`. Summary:

| Table | Purpose | Key fields |
|---|---|---|
| AdminUser | Single admin login | email, passwordHash |
| Profile | Singleton row with identity and hero data | name, headline, bio, location, email, availability, resumeUrl, nowText, avatarUrl |
| SocialLink | Links in header/footer/contact | platform, url, sortOrder |
| SkillCategory | Frontend, Backend, Databases, DevOps, Languages, AI/ML | name, sortOrder |
| Skill | Individual skills | name, level (1-5), featured, iconKey, categoryId |
| Project | Case studies | slug, title, tagline, summary, problem, solution, body (markdown), role, teamSize, startDate, endDate, liveUrl, repoUrl, repoUrl2, coverImage, featured, status, sortOrder, published |
| ProjectSkill | Many-to-many Project to Skill | projectId, skillId |
| ProjectMedia | Screenshots, diagrams | projectId, url, alt, kind (screenshot/diagram/erd), sortOrder |
| Experience | Roles, client work, leadership | title, org, location, startDate, endDate, description (markdown), kind |
| Education | Degrees | school, degree, field, startYear, endYear, gpa, coursework (JSON string), notes |
| Certification | Certificates and courses | title, issuer, issuedAt, credentialUrl |
| Research | Thesis and papers | slug, title, abstract, status, venue, venueStatus, supervisor, repoUrl, paperUrl, body, published |
| Post | Blog | slug, title, excerpt, body, coverImage, tags (JSON string), published, publishedAt |
| Testimonial | Teammate/client quotes (only with permission) | author, role, quote, projectId? |
| Message | Contact submissions | name, email, subject, body, status (UNREAD/READ/ARCHIVED), ipHash, createdAt |
| PageView | Anonymous analytics | path, referrerHost, visitorHash, createdAt |
| Setting | Key/value store (github cache, feature flags) | key, value (JSON string), updatedAt |

Rules:
- SQLite has no enums in Prisma by default for older versions; use `String` fields with Zod-enforced allowed values (comments in schema list them)
- Arrays are stored as JSON strings and parsed in the data layer (`lib/db/*.ts`)
- Indexes: `Project(slug)`, `Project(published, featured, sortOrder)`, `Post(slug)`, `Post(published, publishedAt)`, `Message(status, createdAt)`, `PageView(path, createdAt)`
- Dates in UTC, shown in Asia/Dhaka only where it matters (status line)
- Migrations: `prisma migrate dev` locally, `prisma migrate deploy` in production start script
- Seed: `prisma/seed.ts` reads content defined in `seed-content.md` and is idempotent (upsert by slug/key)
- Data access only through `lib/db/` functions; no Prisma calls inside components
- Enable WAL mode on start (`PRAGMA journal_mode=WAL;`) for better concurrent read performance

---

## 8. Folder structure

```
portfolio/
  app/
    (public)/
      page.tsx
      projects/page.tsx
      projects/[slug]/page.tsx
      research/page.tsx
      about/page.tsx
      skills/page.tsx
      experience/page.tsx
      blog/page.tsx
      blog/[slug]/page.tsx
      now/page.tsx
      contact/page.tsx
      resume/page.tsx
    admin/
      login/page.tsx
      (protected)/layout.tsx
      (protected)/page.tsx
      (protected)/projects/...
      (protected)/posts/...
      (protected)/messages/...
      ... one folder per content type
    api/
      og/route.tsx
      uploads/[...path]/route.ts
      track/route.ts
    resume.pdf/route.ts
    sitemap.ts
    robots.ts
    rss.xml/route.ts
    layout.tsx
    not-found.tsx
  components/ (see 6.5)
  lib/
    db/ (prisma client + query functions per model)
    auth.ts
    validators.ts (Zod schemas)
    github.ts
    rate-limit.ts
    utils.ts
  prisma/
    schema.prisma
    seed.ts
    migrations/
  public/ (fonts if self-hosted, icons, og fallback)
  tests/ (playwright)
  .env.example
  README.md
```

---

## 9. Environment variables

```
DATABASE_URL="file:./dev.db"
ADMIN_EMAIL=
ADMIN_PASSWORD_HASH=       # bcrypt hash, generated with a script in /scripts
JWT_SECRET=                # 32+ random bytes
SITE_URL=http://localhost:3000
GITHUB_USERNAME=Saif-Smran
GITHUB_TOKEN=              # optional, raises API rate limit
SMTP_HOST= SMTP_USER= SMTP_PASS= CONTACT_TO_EMAIL=   # optional
```

---

## 10. Content rules (read before writing any copy)

- Only claim what you can defend in an interview. Remove or verify these README claims before they go on the site: "100% test coverage" (PetConnect) and "reduced response time by 300ms" (need the before/after measurement or drop it)
- Quantities that are provable from the repo are good: 25 routes, 3 role dashboards, 9 API modules, 27 endpoints, 6-state order lifecycle
- Positioning: full-stack developer today, data science and research direction next. The thesis and Python/ML work must be visible, not hidden under web projects
- Seeking: remote internship now, MS (Data Science) in Germany/Netherlands later. The site should not say "MS applicant" on the home hero; put it on `/research` and `/about` in one factual line
- GPA shown only if you want it shown; README says 3.8/4.0, confirm it matches the official transcript
- Full copy and project data: see `seed-content.md`

---

## 11. Deployment and operations

- Railway service from GitHub repo, Volume at `/data`, start command: `pnpm prisma migrate deploy && pnpm start`
- Custom domain optional (budget: a `.dev` or `.me` domain costs roughly 1,500 to 2,500 BDT/year; skip until the site is done)
- Redirect old Netlify site to the new domain once live (or leave a "moved" notice)
- Update GitHub README, LinkedIn, resume, and thesis page links to the new URL
- Monitoring: uptime check (free tier of UptimeRobot), error logging to console + Railway logs

---

## 12. Milestones and acceptance criteria

| Phase | Deliverable | Done when |
|---|---|---|
| 0 | Repo, Next.js, Tailwind, Prisma + SQLite, tokens, fonts, layout shell | `pnpm dev` shows header/footer, theme toggle works, DB migrates |
| 1 | Schema, seed, data layer | Seed runs twice without duplicates, queries typed |
| 2 | Public pages (Home, Projects, Case study, About, Skills, Experience) | All render from DB, responsive at 360/768/1280 |
| 3 | Research, Blog, Now, Resume, Contact (form saves) | Contact submission appears in DB, rate limit works |
| 4 | Command palette, search, filters, OG images, SEO files | FR-5, FR-6, FR-8, FR-12 pass |
| 5 | Admin auth + CRUD for all content | Can edit a project in admin and see it live without redeploy |
| 6 | Analytics, GitHub integration, uploads | FR-10, FR-11 pass |
| 7 | Polish, a11y, Lighthouse, Playwright smoke tests | All targets in section 1 met |
| 8 | Deploy to Railway with volume, backups, domain | Live URL, admin edit persists across redeploy |

Definition of done for every phase: `tsc --noEmit`, `eslint`, and `pnpm build` pass; no TODO left in code; README section updated.

---

## 13. Decisions still open (fill before Phase 5)

- Domain name
- Thesis supervisor name and whether to show it
- Whether Ha-Meem Group can be named
- Which testimonials, if any, you have written permission to publish
- Final headshot (optional; none is better than a bad one)
