import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding portfolio data into PostgreSQL...');

  // 1. Profile (Singleton id = 1)
  const profile = await prisma.profile.upsert({
    where: { id: 1 },
    update: {
      name: 'A.H.M. Saif Smran',
      headline: 'Full-stack developer building toward data science and research',
      bio: 'Final-year CSE student at IUBAT. I build TypeScript applications with Next.js, Express, Prisma, and PostgreSQL, with role-based access, Stripe payments, and transactional workflows. My thesis is on tracking in high density crowds. Next step: MS in Data Science in Germany or the Netherlands.',
      location: 'Dhaka, Bangladesh',
      email: 'smrangb@gmail.com',
      availability: 'open',
      availabilityNote: 'Open to remote internships',
      resumeUrl: '/resume.pdf',
      nowText: `### What I'm focused on this month

- **Building**: This portfolio v2 with Next.js, Tailwind CSS, Prisma, and PostgreSQL.
- **Researching**: Crowd tracking on VisDrone with SAHI and recurrent memory (LSTM/GRU).
- **Preparing**: MS in Data Science applications (Germany, Netherlands) for upcoming intakes.
- **Learning**: Deep learning fundamentals, advanced PyTorch architectures, and production ML pipelines.
`,
    },
    create: {
      id: 1,
      name: 'A.H.M. Saif Smran',
      headline: 'Full-stack developer building toward data science and research',
      bio: 'Final-year CSE student at IUBAT. I build TypeScript applications with Next.js, Express, Prisma, and PostgreSQL, with role-based access, Stripe payments, and transactional workflows. My thesis is on tracking in high density crowds. Next step: MS in Data Science in Germany or the Netherlands.',
      location: 'Dhaka, Bangladesh',
      email: 'smrangb@gmail.com',
      availability: 'open',
      availabilityNote: 'Open to remote internships',
      resumeUrl: '/resume.pdf',
      nowText: `### What I'm focused on this month

- **Building**: This portfolio v2 with Next.js, Tailwind CSS, Prisma, and PostgreSQL.
- **Researching**: Crowd tracking on VisDrone with SAHI and recurrent memory (LSTM/GRU).
- **Preparing**: MS in Data Science applications (Germany, Netherlands) for upcoming intakes.
- **Learning**: Deep learning fundamentals, advanced PyTorch architectures, and production ML pipelines.
`,
    },
  });

  // 2. Social Links
  const socialLinks = [
    { platform: 'github', label: 'GitHub', url: 'https://github.com/Saif-Smran', sortOrder: 0 },
    { platform: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/a-h-m-saif-smran', sortOrder: 1 },
    { platform: 'email', label: 'Email', url: 'mailto:smrangb@gmail.com', sortOrder: 2 },
  ];

  await prisma.socialLink.deleteMany();
  for (const link of socialLinks) {
    await prisma.socialLink.create({ data: link });
  }

  // 3. Skill Categories and Skills
  const skillCategories = [
    {
      name: 'Frontend',
      sortOrder: 0,
      skills: [
        { name: 'TypeScript', level: 5, featured: true },
        { name: 'React', level: 5, featured: true },
        { name: 'Next.js', level: 5, featured: true },
        { name: 'Tailwind CSS', level: 5, featured: true },
        { name: 'JavaScript', level: 5, featured: false },
        { name: 'HTML5 / CSS3', level: 5, featured: false },
        { name: 'React Native', level: 3, featured: false },
      ],
    },
    {
      name: 'Backend',
      sortOrder: 1,
      skills: [
        { name: 'Node.js', level: 5, featured: true },
        { name: 'Express.js', level: 5, featured: true },
        { name: 'Django', level: 4, featured: true },
        { name: 'Django REST Framework', level: 4, featured: false },
        { name: 'Firebase', level: 3, featured: false },
      ],
    },
    {
      name: 'Databases & ORM',
      sortOrder: 2,
      skills: [
        { name: 'PostgreSQL', level: 4, featured: true },
        { name: 'Prisma', level: 5, featured: true },
        { name: 'MongoDB', level: 4, featured: false },
        { name: 'SQLite', level: 4, featured: false },
      ],
    },
    {
      name: 'Languages',
      sortOrder: 3,
      skills: [
        { name: 'Python', level: 4, featured: true },
        { name: 'C / C++', level: 3, featured: false },
      ],
    },
    {
      name: 'AI / ML',
      sortOrder: 4,
      skills: [
        { name: 'YOLO-family Detectors', level: 3, featured: false },
        { name: 'PyTorch', level: 3, featured: false },
        { name: 'pandas & NumPy', level: 3, featured: false },
        { name: 'scikit-learn', level: 3, featured: false },
      ],
    },
    {
      name: 'Deployment & Tools',
      sortOrder: 5,
      skills: [
        { name: 'Railway', level: 4, featured: false },
        { name: 'Vercel', level: 5, featured: false },
        { name: 'Docker', level: 3, featured: false },
        { name: 'Git & GitHub', level: 5, featured: false },
      ],
    },
  ];

  const skillMap: Record<string, number> = {};

  for (const cat of skillCategories) {
    const categoryRecord = await prisma.skillCategory.upsert({
      where: { name: cat.name },
      update: { sortOrder: cat.sortOrder },
      create: { name: cat.name, sortOrder: cat.sortOrder },
    });

    for (const s of cat.skills) {
      const skillRecord = await prisma.skill.upsert({
        where: { name: s.name },
        update: {
          level: s.level,
          featured: s.featured,
          categoryId: categoryRecord.id,
        },
        create: {
          name: s.name,
          level: s.level,
          featured: s.featured,
          categoryId: categoryRecord.id,
        },
      });
      skillMap[s.name] = skillRecord.id;
    }
  }

  // 4. Projects
  const projectsData = [
    {
      slug: 'urbanmatch',
      title: 'UrbanMatch',
      tagline: 'Housing and roommate management platform',
      summary: 'Full-stack platform enabling tenants to search and apply for rooms, property owners to list and manage real estate, and platform admins to oversee listings with role-based dashboards.',
      role: 'Solo Full-stack Developer',
      teamSize: 1,
      liveUrl: 'https://b7a7.vercel.app/',
      repoUrl: 'https://github.com/Saif-Smran/Assignment-B7A7-Housing-Roommate-Management-Frontend',
      repoUrl2: 'https://github.com/Saif-Smran/Assignment-B7A6-Housing-Roommate-Management-backend',
      coverImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      featured: true,
      kind: 'web',
      status: 'shipped',
      sortOrder: 0,
      published: true,
      skills: ['Next.js', 'React', 'TypeScript', 'Express.js', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
      problem: `In dense urban centers like Dhaka, room-hunting is plagued by fragmented Facebook groups, fraudulent listings, and double-booking race conditions when multiple applicants apply for the same available vacancy simultaneously.`,
      solution: `UrbanMatch solves this with an integrated 3-role portal (Tenant, Landlord, Admin) featuring server-side route protection, atomic database booking reservations, and automated payment escrow via Stripe webhooks.`,
      body: `## Key Engineering Highlights

1. **Frontend Architecture**: Built on Next.js 16 with 25 routes, 3 role-isolated dashboards, server-side auth guards, and TanStack Query caching for fast client updates.
2. **Backend Architecture**: Express 5 REST API partitioned into 9 clean domain modules with full Zod input validation and centralized error handling.
3. **Atomic Booking Transactions**: Eliminated room reservation race conditions using Prisma's \`$transaction\` with explicit row locking and state checks.
4. **Stripe Checkout & Webhooks**: Automated payment confirmation through cryptographically verified webhooks with idempotency keys and automated invoice generation.
5. **Session Security**: Google OAuth 2.0 integration paired with encrypted JWT access tokens in httpOnly cookies.

### Hard Problem Solved: Preventing Double-Booking Race Conditions

When multiple tenants submit an application for the final room vacancy simultaneously, concurrent HTTP requests can read the room status as "AVAILABLE" before the first write commits. 

**The Solution:**
We wrapped the room application inside an isolated atomic transaction:
\`\`\`ts
await prisma.$transaction(async (tx) => {
  const room = await tx.room.findUnique({
    where: { id: roomId },
  });
  if (room.status !== 'AVAILABLE') {
    throw new Error('Room is no longer available');
  }
  await tx.room.update({
    where: { id: roomId },
    data: { status: 'PENDING_APPROVAL' },
  });
  return tx.application.create({
    data: { roomId, tenantId, status: 'SUBMITTED' },
  });
});
\`\`\`
`,
    },
    {
      slug: 'gearup',
      title: 'GearUp',
      tagline: 'Sports and outdoor gear rental marketplace',
      summary: 'Marketplace connecting sports enthusiasts and gear rental providers with an automated 6-state rental lifecycle, inventory tracking, and Stripe Checkout verification.',
      role: 'Solo Full-stack Developer',
      teamSize: 1,
      liveUrl: 'https://b7a5-ten.vercel.app/',
      repoUrl: 'https://github.com/Saif-Smran/Assignment-B7A5-GearUp-Frontend',
      repoUrl2: 'https://github.com/Saif-Smran/Assignment-B7A4-GearUp',
      coverImage: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1200&q=80',
      featured: true,
      kind: 'web',
      status: 'shipped',
      sortOrder: 1,
      published: true,
      skills: ['Next.js', 'TypeScript', 'Express.js', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
      problem: `Renting specialized sports gear is difficult due to conflicting scheduling, inaccurate real-time stock levels, and non-refundable deposits without state machine guarantees.`,
      solution: `Designed a transactional multi-item rental marketplace featuring 27 REST endpoints, strict stock validation, and a verifiable 6-state order lifecycle.`,
      body: `## Key Engineering Highlights

1. **27 REST Endpoints**: Express 5 API with JWT access and refresh token rotation, supporting Customer, Provider, and Admin roles.
2. **Atomic Multi-Item Checkout**: Prisma transactions to verify date availability and deduct gear stock atomically.
3. **6-State Rental Lifecycle**: Formally verified state progression (\`PENDING\` → \`CONFIRMED\` → \`PICKED_UP\` → \`RETURNED\` → \`COMPLETED\` / \`CANCELLED\`).
4. **Stripe Webhook Verification**: Cryptographic signature validation ensuring transactions are only confirmed upon real funds settlement.
`,
    },
    {
      slug: 'student-financial-tracker',
      title: 'Student Financial Tracker',
      tagline: 'Monthly allowance and expense tracker for students',
      summary: 'Cross-platform financial planner with a Django REST backend, React Native (Expo) mobile app, and Next.js web application for budget analytics.',
      role: 'Full-stack Developer',
      teamSize: 1,
      liveUrl: '',
      repoUrl: 'https://github.com/Saif-Smran',
      coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
      featured: true,
      kind: 'mobile',
      status: 'in_progress',
      sortOrder: 2,
      published: true,
      skills: ['Django', 'Django REST Framework', 'PostgreSQL', 'React Native', 'Next.js', 'TypeScript'],
      problem: `Students living away from home struggle to balance stipend allowances across semesters without simple multi-device budgeting tools.`,
      solution: `A clean 3-layer architecture: Django REST Framework API with PostgreSQL ensuring transactional financial ledger integrity, alongside React Native and Next.js clients.`,
      body: `## Engineering Architecture

- **Database Decision**: Chose PostgreSQL over MongoDB due to ACID requirements on balance deductions and monthly budget rollovers.
- **API**: Django REST Framework with Token authentication and serialized analytics endpoints.
- **Clients**: React Native with Expo for mobile expense capture on the go, plus Next.js dashboard for charts and report generation.
`,
    },
    {
      slug: 'petconnect',
      title: 'PetConnect',
      tagline: 'Pet adoption and care matching platform',
      summary: 'Full-stack adoption portal featuring 15+ reusable React components, role-based workflows for adopters and shelters, and Stripe donation payments.',
      role: 'Full-stack Developer',
      teamSize: 1,
      liveUrl: 'https://pet-connect-6d036.web.app/',
      repoUrl: 'https://github.com/Saif-Smran/PetConnect-Client',
      repoUrl2: 'https://github.com/Saif-Smran/PetConnect-Server',
      coverImage: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=80',
      featured: false,
      kind: 'web',
      status: 'shipped',
      sortOrder: 3,
      published: true,
      skills: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
      problem: `Animal rescue organizations lack unified platforms to vet adopter applications and collect donations securely.`,
      solution: `Built an adoption system with structured application vetting, image galleries, and Stripe payment integration.`,
      body: `## Highlights

- 15+ reusable React components with clean state management.
- 8+ REST endpoints with JWT authorization.
- Stripe payment processing for adoption fees and donations.
`,
    },
    {
      slug: 'attendance-shift-system',
      title: 'Garment Manufacturer Attendance & Shift Management',
      tagline: 'Enterprise gate kiosk and shift management system',
      summary: 'Industrial attendance system for garment manufacturing with 11 complex operational shift rules, kiosk clock-in, and overtime tracking.',
      role: 'Team Lead and Backend Developer',
      teamSize: 4,
      liveUrl: '',
      repoUrl: '',
      coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
      featured: false,
      kind: 'client',
      status: 'shipped',
      sortOrder: 4,
      published: true,
      skills: ['Node.js', 'Express.js', 'React', 'PostgreSQL', 'Tailwind CSS'],
      problem: `High-volume factory operations required automated gate kiosks enforcing 11 strict labor and shift rules without payroll discrepancies.`,
      solution: `Architected backend algorithms managing late thresholds, tiffin breaks, night shifts, Ramadan roster adjustments, and 12-hour guard blocks.`,
      body: `## Core Business Rules Implemented

- **11 Finalized Shift Rules**: Configurable tolerance windows, split shifts, night-shift allowances, and Ramadan scheduling adjustments.
- **Roster Safety Limit**: Hard limit preventing scheduling workers for more than 14 consecutive days without mandatory rest.
- **Gate Kiosk Mode**: High-throughput barcode/RFID clock-in interface designed for terminal touchscreens.
`,
    },
    {
      slug: 'zero-waste-pantry-manager',
      title: 'Zero-Waste Pantry Manager',
      tagline: 'Smart inventory and perishable food waste reduction app',
      summary: 'Collaborative pantry tracker helping households prevent grocery waste with expiration forecasting and automated recipe suggestions.',
      role: 'Backend Core and Database Architect',
      teamSize: 3,
      liveUrl: '',
      repoUrl: 'https://github.com/Saif-Smran/Zero-Waste-Pantry-Manager-',
      coverImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
      featured: false,
      kind: 'academic',
      status: 'shipped',
      sortOrder: 5,
      published: true,
      skills: ['Django REST Framework', 'PostgreSQL', 'React', 'Tailwind CSS', 'Python'],
      problem: `Household food waste often occurs because perishables are forgotten before their expiration date.`,
      solution: `Designed a relational PostgreSQL schema tracking food batch lifespans with automated email alerts and meal plan matching.`,
      body: `## Architecture

- Django REST Framework backend with relational batch tracking.
- Automated shelf-life notification engine.
`,
    },
  ];

  for (const p of projectsData) {
    const { skills, ...projectFields } = p;
    const projectRecord = await prisma.project.upsert({
      where: { slug: projectFields.slug },
      update: projectFields,
      create: projectFields,
    });

    // Link skills
    await prisma.projectSkill.deleteMany({
      where: { projectId: projectRecord.id },
    });

    for (const skillName of skills) {
      const skillId = skillMap[skillName];
      if (skillId) {
        await prisma.projectSkill.create({
          data: {
            projectId: projectRecord.id,
            skillId,
          },
        });
      }
    }
  }

  // 5. Research
  await prisma.research.upsert({
    where: { slug: 'tracking-high-density-crowd' },
    update: {
      title: 'Tracking in High Density Crowd',
      abstract: 'Multi-object tracking degrades significantly in dense crowds and small, aerial-view targets where optical flow estimation encounters high ambiguity. This work explores adaptive recurrent memory (LSTM/GRU) replacing fixed 12-frame sliding windows within an uncertainty-aware tracker evaluated on the VisDrone benchmark.',
      status: 'in_progress',
      venue: 'ICCIT 2027',
      venueStatus: 'target',
      body: `## Thesis Overview

Multi-Object Tracking (MOT) in dense human gatherings (pilgrimages, sporting events, transit hubs) faces severe occlusion, scale variation, and motion blur. Traditional methods rely on short temporal windows (e.g., 10-15 frames), which fail when individuals are occluded for extended durations.

### Methodology

1. **Detection Stage**: Utilizing YOLOv8 and YOLO11 detectors combined with Slicing Aided Hyper Inference (SAHI) to accurately detect small-scale persons in high-resolution drone imagery.
2. **Motion Association**: Flow-guided feature aggregation augmented with recurrent gating (GRU) to retain identity state vectors during occlusions.
3. **Dataset**: Benchmark evaluations on **VisDrone-MOT** and dense pedestrian subsets.

### Target Objectives

- Quantify MOTA and IDF1 improvements on small, dense targets compared to standard ByteTrack / OC-SORT baselines.
- Maintain real-time or near-real-time throughput (>20 FPS) on embedded / edge hardware.
`,
      published: true,
    },
    create: {
      slug: 'tracking-high-density-crowd',
      title: 'Tracking in High Density Crowd',
      abstract: 'Multi-object tracking degrades significantly in dense crowds and small, aerial-view targets where optical flow estimation encounters high ambiguity. This work explores adaptive recurrent memory (LSTM/GRU) replacing fixed 12-frame sliding windows within an uncertainty-aware tracker evaluated on the VisDrone benchmark.',
      status: 'in_progress',
      venue: 'ICCIT 2027',
      venueStatus: 'target',
      body: `## Thesis Overview

Multi-Object Tracking (MOT) in dense human gatherings (pilgrimages, sporting events, transit hubs) faces severe occlusion, scale variation, and motion blur. Traditional methods rely on short temporal windows (e.g., 10-15 frames), which fail when individuals are occluded for extended durations.

### Methodology

1. **Detection Stage**: Utilizing YOLOv8 and YOLO11 detectors combined with Slicing Aided Hyper Inference (SAHI) to accurately detect small-scale persons in high-resolution drone imagery.
2. **Motion Association**: Flow-guided feature aggregation augmented with recurrent gating (GRU) to retain identity state vectors during occlusions.
3. **Dataset**: Benchmark evaluations on **VisDrone-MOT** and dense pedestrian subsets.

### Target Objectives

- Quantify MOTA and IDF1 improvements on small, dense targets compared to standard ByteTrack / OC-SORT baselines.
- Maintain real-time or near-real-time throughput (>20 FPS) on embedded / edge hardware.
`,
      published: true,
    },
  });

  // 6. Education
  await prisma.education.deleteMany();
  await prisma.education.create({
    data: {
      school: 'International University of Business Agriculture and Technology (IUBAT)',
      degree: 'Bachelor of Science',
      field: 'Computer Science and Engineering',
      startYear: 2023,
      endYear: 2027,
      gpa: '3.8 / 4.0',
      showGpa: true,
      coursework: JSON.stringify([
        'Data Structures & Algorithms',
        'Object-Oriented Programming',
        'Database Management Systems',
        'Web Engineering',
        'Probability & Statistics',
        'Machine Learning Fundamentals',
        'Computer Vision',
        'Natural Language Processing',
      ]),
      notes: 'Final-year student specializing in software engineering and applied computer vision research.',
      sortOrder: 0,
    },
  });

  // 7. Experience
  await prisma.experience.deleteMany();
  await prisma.experience.createMany({
    data: [
      {
        title: 'Team Lead & Backend Architect',
        org: 'Garment Manufacturer Attendance & Shift Project',
        location: 'Dhaka, Bangladesh',
        startDate: new Date('2024-05-01'),
        endDate: new Date('2024-11-30'),
        description: 'Led a 4-person team developing an enterprise attendance kiosk and shift scheduler with 11 finalized factory business rules, late tolerances, night shifts, and Ramadan adjustments.',
        kind: 'project',
        sortOrder: 0,
        published: true,
      },
      {
        title: 'Team Lead (Client-Facing Academic Projects)',
        org: 'IUBAT Engineering Practicums',
        location: 'Dhaka, Bangladesh',
        startDate: new Date('2023-09-01'),
        endDate: null,
        description: 'Guided multi-student engineering teams through requirements gathering, system architecture diagrams, sprint planning, and code reviews.',
        kind: 'leadership',
        sortOrder: 1,
        published: true,
      },
      {
        title: 'Peer Tutor (Computer Science)',
        org: 'Department of CSE, IUBAT',
        location: 'Dhaka, Bangladesh',
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-06-30'),
        description: 'Conducted weekly problem-solving and lab mentoring sessions for junior students in C, Data Structures, and relational SQL queries.',
        kind: 'teaching',
        sortOrder: 2,
        published: true,
      },
    ],
  });

  // 8. Starter Blog Posts
  const blogPosts = [
    {
      slug: 'stopping-double-booking-prisma-transactions',
      title: 'How I Stopped Double-Booking with Prisma Transactions',
      excerpt: 'Race conditions in reservation systems can cause multiple users to claim the same room or inventory slot. Here is how I eliminated concurrency issues using database transactions.',
      publishedAt: new Date('2025-01-10'),
      published: true,
      tags: JSON.stringify(['Prisma', 'PostgreSQL', 'Backend', 'Architecture']),
      body: `When building **UrbanMatch**, our room booking platform, the most critical engineering requirement was eliminating room application race conditions.

### The Problem

Imagine two students looking at the final available room in an apartment. If both click "Apply" at 10:04:02.100 AM:
1. Request A queries the room: \`status === 'AVAILABLE'\`.
2. Request B queries the room: \`status === 'AVAILABLE'\`.
3. Request A writes an application and updates room to \`PENDING\`.
4. Request B writes an application and also assumes it got the spot.

Result: Two conflicting bookings for one room.

### The Solution: Interactive Transactions

With Prisma's interactive \`$transaction\` API over PostgreSQL, all reads and writes within the callback occur inside a single ACID transaction block:

\`\`\`ts
export async function applyForRoom(roomId: number, tenantId: number) {
  return await prisma.$transaction(async (tx) => {
    // 1. Fetch current status inside the transaction
    const room = await tx.room.findUnique({
      where: { id: roomId },
    });

    if (!room || room.status !== 'AVAILABLE') {
      throw new Error('This room is no longer open for new applications.');
    }

    // 2. Lock the room status
    await tx.room.update({
      where: { id: roomId },
      data: { status: 'PENDING_APPROVAL' },
    });

    // 3. Create the application record
    return await tx.application.create({
      data: {
        roomId,
        tenantId,
        status: 'SUBMITTED',
      },
    });
  });
}
\`\`\`

If another request enters between step 1 and step 2, it receives an error because the status change commits atomically.
`,
    },
    {
      slug: 'stripe-webhooks-order-lifecycle',
      title: 'Verifying Stripe Webhooks & Modeling a 6-State Order Lifecycle',
      excerpt: 'Never trust client-side checkout redirects for order fulfillment. Here is how we implemented cryptographic webhook verification with an explicit 6-state rental lifecycle.',
      publishedAt: new Date('2025-02-15'),
      published: true,
      tags: JSON.stringify(['Stripe', 'Security', 'Next.js', 'State Machines']),
      body: `In **GearUp**, our outdoor sports rental marketplace, ensuring payments are genuinely settled before reserving high-value equipment required avoiding common client-side confirmation traps.

### Why Client Callbacks Are Untrustworthy

Redirecting a user back to \`/checkout/success?session_id=...\` does not mean money has been transferred:
- The user might close their browser mid-redirect.
- Attackers could craft GET requests with arbitrary session IDs.
- Network latency could delay bank authorization.

### Cryptographic Webhook Verification

We listen to Stripe's \`checkout.session.completed\` event via a dedicated route handler:

\`\`\`ts
import { headers } from 'next/headers';
import Stripe from 'stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature');

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return new Response(\`Webhook Error: \${err.message}\`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    await fulfillOrder(session.metadata?.orderId);
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
\`\`\`

### The 6-State Order Machine

Every rental order progresses strictly through:
1. \`PENDING_PAYMENT\`
2. \`CONFIRMED\`
3. \`READY_FOR_PICKUP\`
4. \`PICKED_UP\`
5. \`RETURNED\`
6. \`COMPLETED\` (or \`CANCELLED\`)

State transitions are checked against an allowed transitions table in code, preventing illegal leaps like moving from \`PENDING\` directly to \`RETURNED\`.
`,
    },
    {
      slug: 'starting-crowd-tracking-research',
      title: 'Starting Crowd Tracking Research: What I Did in Month One',
      excerpt: 'Transitioning from full-stack web engineering into computer vision research. Lessons learned analyzing VisDrone and exploring SAHI with YOLO detectors.',
      publishedAt: new Date('2025-03-01'),
      published: true,
      tags: JSON.stringify(['Computer Vision', 'Deep Learning', 'PyTorch', 'Research']),
      body: `Stepping into research on **Tracking in High Density Crowd** felt intimidating initially. Here is what my research partner and I focused on during our first month.

### 1. Understanding the Benchmark (VisDrone)

Aerial drone footage introduces challenges that standard tracking benchmarks like MOT17 do not possess:
- Extreme scale variation (people can be 10x10 pixels).
- Steep viewing angles where heads overlap with torsos.
- Camera platform jitter and parallax motion.

### 2. Slicing Aided Hyper Inference (SAHI)

Standard detectors resize 4K frames down to 640x640, which completely pulverizes tiny pedestrian bounding boxes. **SAHI** slices high-resolution images into overlapping patches, runs inference on each patch, and merges predictions with Non-Maximum Suppression (NMS).

### 3. Current Focus: Recurrent Association

Standard ByteTrack associates detections based on spatial Kalman Filters. In dense crowds, bounding box IoU becomes ambiguous. We are evaluating replacing simple linear motion predictors with a recurrent memory cell (GRU) conditioned on flow vectors to maintain identity persistence through occlusion.
`,
    },
  ];

  for (const post of blogPosts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
