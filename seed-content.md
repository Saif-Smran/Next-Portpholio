# Seed content

Source for `prisma/seed.ts`. Taken from the updated GitHub README plus known project work. Items marked **VERIFY** need a check before going public. Items marked **FILL** are missing.

## Profile
- name: A.H.M. Saif Smran
- display name: Saif Smran
- headline: Full-stack developer building toward data science and research
- location: Dhaka, Bangladesh
- email: smrangb@gmail.com
- availability: open, note "Open to remote internships"
- bio (draft, rewrite in your own voice): Final-year CSE student at IUBAT. I build TypeScript applications with Next.js, Express, Prisma and PostgreSQL, with role-based access, Stripe payments and transactional workflows. My thesis is on tracking in high density crowds. Next step: MS in Data Science in Germany or the Netherlands.
- resume file: latest A_H_M_SAIF_SMRAN_Resume (upload via admin, do not hard-code)

## Social links
- GitHub: https://github.com/Saif-Smran
- LinkedIn: https://www.linkedin.com/in/a-h-m-saif-smran
- Email: mailto:smrangb@gmail.com
- Old portfolio (remove after redirect): https://saif-smran-portfolio.netlify.app/

## Skill categories and skills
- Frontend: HTML5, CSS3, JavaScript, TypeScript, React, React Native, Next.js, Tailwind CSS
- Backend: Node.js, Express.js, Django, Django REST Framework, Firebase
- Databases and ORM: PostgreSQL, MongoDB, SQLite, Prisma
- Deployment and tools: Railway, Vercel, Expo, Docker, Git, GitHub, VS Code
- Languages: Python, JavaScript, TypeScript, C, C++
- AI / ML (add as you earn it): YOLO-family detectors, PyTorch (FILL level honestly), pandas, scikit-learn (FILL)
- Featured (home strip): TypeScript, Next.js, React, Node.js, Express, Prisma, PostgreSQL, Django, Tailwind CSS, Python

## Projects

### 1. UrbanMatch (slug: urbanmatch) featured
- tagline: Housing and roommate management platform
- summary: Tenants find rooms, owners manage properties, admins moderate listings.
- live: https://b7a7.vercel.app/
- repos: Frontend https://github.com/Saif-Smran/Assignment-B7A7-Housing-Roommate-Management-Frontend, Backend https://github.com/Saif-Smran/Assignment-B7A6-Housing-Roommate-Management-backend
- role: Solo full-stack developer (VERIFY), teamSize 1
- features:
  1. Next.js 16 frontend with 25 routes, 3 role-based dashboards, server-side route protection
  2. Express 5 + Prisma + PostgreSQL REST API, 9 modules, Zod validation
  3. Double-booking prevented with atomic transactions in the room application workflow
  4. Stripe Checkout with webhook-confirmed payments and a daily Vercel Cron cleanup job
  5. Google OAuth 2.0 sign-in and JWT-based role access control
- stack: Next.js, React, TypeScript, Express, Prisma, PostgreSQL, Stripe, TanStack Query, Zod, Tailwind CSS
- case study hard problem to write up: race condition on room applications and how the transaction fixes it

### 2. GearUp (slug: gearup) featured
- tagline: Sports and outdoor gear rental marketplace
- summary: Connects gear customers, providers and admins with a full rental order lifecycle.
- live: https://b7a5-ten.vercel.app/
- repos: Frontend https://github.com/Saif-Smran/Assignment-B7A5-GearUp-Frontend, Backend https://github.com/Saif-Smran/Assignment-B7A4-GearUp
- features:
  1. 27 REST endpoints (Express 5, Prisma, PostgreSQL), JWT access and refresh tokens, 3 roles
  2. Atomic multi-item rental orders with Prisma $transaction, availability checks, stock updates
  3. Stripe Checkout with signature-verified webhooks driving a 6-state order lifecycle
  4. Next.js frontend: catalog with filters, cart, provider and admin dashboards
- stack: Next.js, TypeScript, Express, Prisma, PostgreSQL, Stripe, JWT, Tailwind CSS

### 3. Student Financial Tracker (slug: student-financial-tracker) featured
- tagline: Monthly allowance tracker for students, on web and mobile
- summary: Three-layer monorepo: Django REST backend, React Native (Expo) app, Next.js web app.
- status: in_progress (web analytics, budgets, settings pages pending) (VERIFY current state)
- stack: Django, DRF, PostgreSQL, React Native, Expo, Next.js, TypeScript
- decision to write up: PostgreSQL over MongoDB for financial data integrity
- deployment plan: Railway (API + DB), Vercel (web), Expo EAS (mobile). Add live link when deployed

### 4. PetConnect (slug: petconnect)
- tagline: Pet adoption and care platform
- live: https://pet-connect-6d036.web.app/
- repos: Client https://github.com/Saif-Smran/PetConnect-Client, Server https://github.com/Saif-Smran/PetConnect-Server
- features: 15+ reusable React components, 8+ REST endpoints, role-based access for 3 user types with protected routes, Stripe payments
- stack: React, Node.js, MongoDB, Express, JWT, Stripe
- **VERIFY or drop**: "100% test coverage", "reduced response time by 300ms"

### 5. Ha-Meem Attendance and Shift Management (slug: attendance-shift-system)
- kind: client, capstone
- role: Team lead and backend developer, teamSize 4
- summary: Attendance and shift system for a garment manufacturer, with a gate kiosk page.
- stack: Node.js, Express, React, Vite
- facts: 11 finalized business rules (late threshold, tiffin break, general and night shifts, Ramadan adjustments, 12-hour guard blocks, max 14 continuous roster days), payroll out of scope
- repo/live: FILL
- **Get written permission before naming the client**

### 6. Zero-Waste Pantry Manager (slug: zero-waste-pantry-manager)
- kind: academic, teamSize 3
- role: Backend core and database
- stack: Django REST Framework, PostgreSQL, React, Vite, Tailwind CSS, Axios
- repo: https://github.com/Saif-Smran/Zero-Waste-Pantry-Manager-

## Research
- slug: tracking-high-density-crowd
- title: Tracking in High Density Crowd
- status: in_progress, venue ICCIT 2027, venueStatus target
- team: two people
- abstract (draft): Multi-object tracking degrades in dense crowds and small, aerial-view objects, where optical flow becomes unreliable. This work studies an adaptive memory (LSTM/GRU) in place of a fixed 12-frame window in a flow-guided, uncertainty-aware tracker, evaluated on VisDrone.
- methods: YOLOv8/YOLO11 detection, SAHI slicing, flow-guided tracking, recurrent memory
- dataset: VisDrone
- supervisor: FILL
- repo/notebook: FILL (a working demo notebook is worth more than prose here)

## Education
- IUBAT, Dhaka: BSc in Computer Science and Engineering, 2023 to expected 2027 (README says 2027, VERIFY against credit plan)
- GPA: README says 3.8/4.0 (VERIFY, set showGpa true only if correct)
- coursework: Data Structures, Algorithms, Web Development, Statistics, Machine Learning, NLP, Computer Vision (VERIFY each is a course you completed)

## Experience (timeline entries)
- Team lead, capstone client project (attendance system), 4-person team
- Team lead on client-facing academic projects
- Peer tutor: tutored four classmates in a prior semester
- Practicum (6 credits): FILL when started
- Languages: Bengali (native), English (fluent)

## Certifications
- FILL (add Next Level Web Development course and reward courses only after completion and with credential URLs)

## Blog starter posts (write 3 short ones, 400 to 700 words)
1. How I stopped double-booking with Prisma transactions
2. Verifying Stripe webhooks and modeling a 6-state order lifecycle
3. Starting crowd tracking research with no background: what I did in month one

## Now page (draft)
- Building: this portfolio
- Researching: crowd tracking on VisDrone with SAHI and recurrent memory
- Preparing: MS Data Science applications (Germany, Netherlands)
- Learning: Python for data science, ML fundamentals
