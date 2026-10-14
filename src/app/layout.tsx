import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  title: {
    default: "A.H.M. Saif Smran | Full-stack Developer",
    template: "%s | Saif Smran",
  },
  description:
    "Full-stack developer building robust TypeScript applications with Next.js, Express, Prisma, and PostgreSQL. Researching crowd tracking with computer vision.",
  keywords: [
    "Saif Smran",
    "Full-stack Developer",
    "Next.js",
    "TypeScript",
    "Prisma",
    "PostgreSQL",
    "Computer Vision",
    "Dhaka",
  ],
  authors: [
    { name: "A.H.M. Saif Smran", url: "https://github.com/Saif-Smran" },
  ],
  creator: "A.H.M. Saif Smran",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "A.H.M. Saif Smran | Full-stack Developer",
    description:
      "Full-stack developer building robust TypeScript applications. Researching crowd tracking with computer vision.",
    siteName: "Saif Smran Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "A.H.M. Saif Smran | Full-stack Developer",
    description:
      "Full-stack developer building robust TypeScript applications.",
  },
  icons: {
    icon: [
      { url: "/icon.svg?v=2", type: "image/svg+xml" },
      { url: "/icon-32.png?v=2", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico?v=2", sizes: "any" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: "/apple-icon.png?v=2",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolageGrotesque.variable} ${geistSans.variable} ${geistMono.variable} dark`}
      data-theme="dark"
    >
      <head>
        <link rel="icon" href="/icon.svg?v=2" type="image/svg+xml" />
        <link
          rel="icon"
          href="/icon-32.png?v=2"
          type="image/png"
          sizes="32x32"
        />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
        <link rel="apple-touch-icon" href="/apple-icon.png?v=2" />
        {/* Zero-flash theme initialization script (defaults to dark theme) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const storedTheme = localStorage.getItem('theme');
                const theme = storedTheme || 'dark';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)] font-sans antialiased selection:bg-[var(--accent)] selection:text-[#0A0B0D]">
        <AnalyticsTracker />
        <Header />
        <main className="flex-1 w-full max-w-7xl mx-auto px-5 md:px-8 py-8 md:py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
