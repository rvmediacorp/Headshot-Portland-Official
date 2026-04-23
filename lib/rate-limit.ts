/**
 * Tiny in-memory token-bucket rate limiter keyed by IP.
 *
 * NOTE: In-memory state lives per-instance and resets on cold start. For
 *       production-grade limits, swap this for Upstash Redis (or Vercel KV).
 *       This implementation is just enough to dampen scripted abuse.
 */

interface Bucket {
  tokens: number
  last: number
}

const MAX_ENTRIES = 5_000

const buckets = new Map<string, Bucket>()

interface CheckOptions {
  /** Maximum tokens (= max requests) the bucket can hold. */
  capacity: number
  /** Tokens added per second. */
  refillPerSecond: number
}

export interface RateLimitResult {
  ok: boolean
  retryAfterSeconds: number
  remaining: number
}

export function rateLimit(
  key: string,
  { capacity, refillPerSecond }: CheckOptions
): RateLimitResult {
  const now = Date.now()
  let bucket = buckets.get(key)

  if (!bucket) {
    bucket = { tokens: capacity, last: now }
    buckets.set(key, bucket)
  } else {
    const elapsedSec = (now - bucket.last) / 1000
    bucket.tokens = Math.min(
      capacity,
      bucket.tokens + elapsedSec * refillPerSecond
    )
    bucket.last = now
  }

  if (buckets.size > MAX_ENTRIES) {
    const oldestKey = buckets.keys().next().value
    if (oldestKey !== undefined) buckets.delete(oldestKey)
  }

  if (bucket.tokens >= 1) {
    bucket.tokens -= 1
    return {
      ok: true,
      retryAfterSeconds: 0,
      remaining: Math.floor(bucket.tokens),
    }
  }

  const retryAfterSeconds = Math.ceil(
    (1 - bucket.tokens) / refillPerSecond
  )
  return { ok: false, retryAfterSeconds, remaining: 0 }
}
