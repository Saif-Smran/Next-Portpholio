// In-memory token bucket / sliding window rate limiter
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const memoryStore = new Map<string, RateLimitRecord>();

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { allowed: boolean; remaining: number } {
  // Relax rate limit in development for smoother local admin workflows
  const effectiveLimit =
    process.env.NODE_ENV !== "production" ? Math.max(limit, 50) : limit;

  const now = Date.now();
  const record = memoryStore.get(key);

  if (!record || now > record.resetAt) {
    memoryStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: effectiveLimit - 1 };
  }

  if (record.count >= effectiveLimit) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: effectiveLimit - record.count };
}

export function resetRateLimit(key: string) {
  memoryStore.delete(key);
}
