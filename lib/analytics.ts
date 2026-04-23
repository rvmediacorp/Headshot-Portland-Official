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

/** Generate a stable, low-collision event id for CAPI/Pixel dedup. */
export function newEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}
