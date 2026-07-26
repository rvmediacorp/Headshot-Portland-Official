/**
 * Thin client-side analytics helper. Pushes events to the GTM dataLayer.
 *
 * GTM is responsible for forwarding events to GA4, Google Ads, and Meta Pixel.
 * Server-side (Conversions API / Enhanced Conversions for Leads) lives in
 * app/api/lead/route.ts and uses the same `event_id` for dedup.
 */

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

export function track(
  event: string,
  params: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}

/**
 * Normalize an email for Enhanced Conversions matching.
 *
 * Google hashes these client-side before they leave the browser, but it does
 * NOT normalize for you — "Nate@Example.com " and "nate@example.com" hash to
 * different values and are treated as two different people.
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

/**
 * Normalize a phone to E.164 for Enhanced Conversions matching.
 *
 * Deliberately mirrors normalizePhone() in app/api/lead/route.ts. The browser
 * and the server send the same lead to Google via different paths, and they
 * only dedupe into one conversion if both produce identical match keys.
 * If you change one, change the other.
 */
export function normalizePhoneE164(phone: string): string {
  const digits = phone.replace(/\D+/g, "")
  if (digits.length === 10) return `+1${digits}`
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`
  return digits.startsWith("+") ? digits : `+${digits}`
}

/** Generate a stable, low-collision event id for CAPI/Pixel dedup. */
export function newEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}
