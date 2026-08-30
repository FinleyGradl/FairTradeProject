// path: src/lib/rate-limit.ts
//
// Minimal in-memory rate limiter for the auth endpoints (register, login,
// forgot-password, resend-verification, reset-password). Deliberately not a
// dependency — no Redis/Upstash required, which matters given the app runs
// as a single Node/Docker container on a Raspberry Pi (see README).
//
// Trade-off: state lives in process memory, so it (a) does NOT work across
// multiple instances/replicas, and (b) resets on every deploy/restart. If
// the app ever moves to a multi-instance setup (e.g. horizontally scaled
// behind a load balancer), swap the Map below for a shared store (Redis,
// Upstash Ratelimit, etc.) — the rateLimit() call sites don't need to
// change, only this file.
//
// Uses a fixed-window counter per key. Good enough for "slow down brute
// force / mass account enumeration", not meant to be cryptographically
// precise.

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

// Periodically drop expired buckets so this doesn't grow forever on a
// long-running process. Cheap: just iterates the map.
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let cleanupTimer: ReturnType<typeof setInterval> | null = null;
function ensureCleanupTimer() {
  if (cleanupTimer || typeof setInterval === "undefined") return;
  cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(key);
    }
  }, CLEANUP_INTERVAL_MS);
  // Don't keep the Node process alive just for this timer.
  cleanupTimer.unref?.();
}

export interface RateLimitResult {
  success: boolean;
  /** Requests remaining in the current window (0 once blocked). */
  remaining: number;
  /** Unix ms timestamp when the window resets. */
  resetAt: number;
}

/**
 * Fixed-window rate limit check. Call once per request; each call counts
 * against the limit, even if you don't end up using the result (so don't
 * call it speculatively).
 *
 * @param key        Unique identifier for the thing being limited, e.g.
 *                    `login:${ip}` or `forgot-password:${ip}:${email}`.
 *                    Namespace it per-route so different endpoints don't
 *                    share a budget.
 * @param limit       Max requests allowed within `windowMs`.
 * @param windowMs    Window size in milliseconds.
 */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  ensureCleanupTimer();

  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { success: true, remaining: limit - 1, resetAt };
  }

  if (existing.count >= limit) {
    return { success: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return { success: true, remaining: limit - existing.count, resetAt: existing.resetAt };
}

/**
 * Best-effort client IP from standard proxy headers. The app sits behind a
 * reverse proxy in production (see README / Docker setup), so `x-forwarded-for`
 * is what's actually populated — `request.ip` isn't reliable in Next.js
 * route handlers.
 */
export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    // May contain a chain "client, proxy1, proxy2" — the first entry is
    // the original client.
    return forwardedFor.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

/** Standard 429 JSON response for a blocked request. */
export function rateLimitResponse(result: RateLimitResult) {
  const retryAfterSeconds = Math.max(1, Math.ceil((result.resetAt - Date.now()) / 1000));
  return new Response(
    JSON.stringify({
      error: "Zu viele Versuche. Bitte warte einen Moment und versuch es erneut.",
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(retryAfterSeconds),
      },
    }
  );
}