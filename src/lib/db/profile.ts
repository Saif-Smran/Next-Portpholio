import { prisma } from "./prisma";

export async function getProfile() {
  try {
    return await prisma.profile.findFirst({
      where: { id: 1 },
    });
  } catch (_error) {
    console.warn(
      "getProfile: database unreachable, using fallback profile data",
    );
    return {
      id: 1,
      name: "A.H.M. Saif Smran",
      email: "smrangb@gmail.com",
      headline: "Full-stack Developer · Computer vision researcher",
      bio: "Final-year CSE student at IUBAT. I build TypeScript applications with Next.js, Express, Prisma, and PostgreSQL. My thesis is on tracking in high density crowds.",
      location: "Dhaka, Bangladesh",
      availability: "open",
      availabilityNote: "available for remote internships",
      resumeUrl: "/resume.pdf",
      avatarUrl: "/profile-pic.png",
      nowText:
        "Final-year thesis on Crowd Tracking using YOLO and recurrent memory architectures.",
      updatedAt: new Date(),
    };
  }
}

export async function getSocialLinks() {
  try {
    return await prisma.socialLink.findMany({
      orderBy: { sortOrder: "asc" },
    });
  } catch (_error) {
    console.warn(
      "getSocialLinks: database unreachable, using fallback social links",
    );
    return [
      {
        id: 1,
        platform: "github",
        label: "GitHub",
        url: "https://github.com/Saif-Smran",
        sortOrder: 0,
      },
      {
        id: 2,
        platform: "linkedin",
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/a-h-m-saif-smran",
        sortOrder: 1,
      },
      {
        id: 3,
        platform: "facebook",
        label: "Facebook",
        url: "https://www.facebook.com/saif.smran.1",
        sortOrder: 2,
      },
      {
        id: 4,
        platform: "whatsapp",
        label: "WhatsApp",
        url: "https://wa.me/8801521468295",
        sortOrder: 3,
      },
      {
        id: 5,
        platform: "email",
        label: "Email",
        url: "mailto:smrangb@gmail.com",
        sortOrder: 4,
      },
    ];
  }
}
