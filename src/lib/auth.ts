import bcrypt from "bcryptjs";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "fallback-secret-for-development-at-least-32-characters-long";
const secretKey = new TextEncoder().encode(JWT_SECRET);
const COOKIE_NAME = "portfolio_admin_token";

export interface AdminSession {
  email: string;
  role: "admin";
  iat: number;
  exp: number;
}

export async function createSessionToken(email: string): Promise<string> {
  return new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

export async function verifySessionToken(
  token: string,
): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as unknown as AdminSession;
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function setAdminSession(email: string) {
  const token = await createSessionToken(email);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const plainPassword = process.env.ADMIN_PASSWORD;
  if (plainPassword && password === plainPassword) {
    return true;
  }

  const storedHash = process.env.ADMIN_PASSWORD_HASH;
  if (!storedHash) return false;
  return bcrypt.compare(password, storedHash);
}
