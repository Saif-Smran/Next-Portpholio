import { NextResponse } from 'next/server';
import { getProfile } from '@/lib/db';

export async function GET() {
  const profile = await getProfile();
  
  // Prioritize RESUME_LINK from environment variables, fallback to DB profile or default
  const envResumeLink = process.env.RESUME_LINK || process.env.RESUME_URL;
  let targetUrl = envResumeLink || profile?.resumeUrl || 'https://raw.githubusercontent.com/Saif-Smran/Saif-Smran/main/resume.pdf';

  // If it's a Google Drive link, redirect user to the link
  return NextResponse.redirect(targetUrl, 307);
}
