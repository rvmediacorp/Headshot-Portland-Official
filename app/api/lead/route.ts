import { NextResponse, type NextRequest } from "next/server"
import { z } from "zod"
import { createHash } from "node:crypto"
import { rateLimit } from "@/lib/rate-limit"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// ─────────────────────────────────────────────────────────────────────────────
// Validation
// ─────────────────────────────────────────────────────────────────────────────

const NICHES = ["corporate", "actor", "linkedin", "modeling", "realtor"] as const
const HEADSHOT_TYPES = [
  "LinkedIn",
  "Website & Business Card",
  "Modeling Digital",
  "Children Portfolio",
] as const
const DELIVERY_TIMELINES = ["24-48 Hours", "1 Week", "2-3 Weeks"] as const
const BUDGET_RANGES = [
  "$200-500",
  "$500-1000",
  "$1k-2k (teams)",
  "$2k-4k (large teams)",
] as const

const AttributionSchema = z
  .object({
    gclid: z.string().max(255).optional(),
    gbraid: z.string().max(255).optional(),
    wbraid: z.string().max(255).optional(),
    fbclid: z.string().max(255).optional(),
    msclkid: z.string().max(255).optional(),
    utm_source: z.string().max(255).optional(),
    utm_medium: z.string().max(255).optional(),
    utm_campaign: z.string().max(255).optional(),
    utm_term: z.string().max(255).optional(),
    utm_content: z.string().max(255).optional(),
    landing_page: z.string().max(2048).optional(),
    referrer: z.string().max(2048).optional(),
    first_ts: z.string().max(64).optional(),
    user_agent: z.string().max(512).optional(),
  })
  .partial()

const LeadSchema = z.object({
  niche: z.enum(NICHES),
  headshotType: z.enum(HEADSHOT_TYPES),
  urgentBooking: z.boolean(),
  deliveryTimeline: z.enum(DELIVERY_TIMELINES),
  budgetRanges: z
    .array(z.enum(BUDGET_RANGES))
    .min(1)
    .max(BUDGET_RANGES.length),
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  email: z.string().email().max(254),
  phone: z.string().min(7).max(40),
  attribution: AttributionSchema.default({}),
  event_id: z.string().min(8).max(128),
  page_url: z.string().max(2048).optional(),
})

type Lead = z.infer<typeof LeadSchema>

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function sha256(input: string): string {
  return createHash("sha256").update(input.trim().toLowerCase()).digest("hex")
}

/** Normalize a phone for hashing — strip everything but digits, prefix +1 if 10 digits. */
function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D+/g, "")
  if (digits.length === 10) return `+1${digits}`
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`
  return digits.startsWith("+") ? digits : `+${digits}`
}

function getIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for")
  if (fwd) return fwd.split(",")[0]!.trim()
  return req.headers.get("x-real-ip") ?? "0.0.0.0"
}

function warnMissing(envName: string, integration: string): void {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.warn(
      `[lead] ${integration} skipped — missing ${envName}. Set it in .env.local to enable.`
    )
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Forwarders — each returns true on success, false on failure (never throws)
// ─────────────────────────────────────────────────────────────────────────────

async function sendEmail(lead: Lead): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.NOTIFICATION_EMAIL
  const from =
    process.env.RESEND_FROM_EMAIL ??
    "Headshot Portland Leads <leads@headshotportland.com>"

  if (!apiKey || !to) {
    warnMissing(!apiKey ? "RESEND_API_KEY" : "NOTIFICATION_EMAIL", "Resend email")
    return false
  }

  const fullName = `${lead.firstName} ${lead.lastName}`.trim()
  const subject = `New ${lead.niche} lead — ${fullName}`
  const lines = [
    `Niche: ${lead.niche}`,
    `Headshot type: ${lead.headshotType}`,
    `Wants to book within 2-4 weeks: ${lead.urgentBooking ? "Yes" : "No"}`,
    `Delivery timeline: ${lead.deliveryTimeline}`,
    `Budget range(s): ${lead.budgetRanges.join(", ")}`,
    "",
    `Name: ${fullName}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    "",
    "— Attribution —",
    ...Object.entries(lead.attribution).map(([k, v]) => `${k}: ${v}`),
    "",
    `event_id: ${lead.event_id}`,
    `page_url: ${lead.page_url ?? ""}`,
  ]

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text: lines.join("\n"),
        reply_to: lead.email,
      }),
    })
    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.error("[lead] Resend non-2xx", res.status, await res.text())
      return false
    }
    return true
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[lead] Resend threw", err)
    return false
  }
}

async function sendGoogleAdsEnhancedConversion(lead: Lead): Promise<boolean> {
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID
  const conversionActionId = process.env.GOOGLE_ADS_CONVERSION_ACTION_ID
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN
  const accessToken = process.env.GOOGLE_ADS_ACCESS_TOKEN
  const loginCustomerId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID

  if (!customerId || !conversionActionId || !developerToken || !accessToken) {
    warnMissing(
      "GOOGLE_ADS_* (CUSTOMER_ID, CONVERSION_ACTION_ID, DEVELOPER_TOKEN, ACCESS_TOKEN)",
      "Google Ads Enhanced Conversions for Leads"
    )
    return false
  }

  const hashedEmail = sha256(lead.email)
  const hashedPhone = sha256(normalizePhone(lead.phone))
  const conversionAction = `customers/${customerId}/conversionActions/${conversionActionId}`
  const conversionDateTime = new Date()
    .toISOString()
    .replace("T", " ")
    .replace(/\.\d{3}Z$/, "+00:00")

  const userIdentifiers: Record<string, string>[] = [
    { hashedEmail },
    { hashedPhoneNumber: hashedPhone },
  ]
  if (lead.attribution.gclid) {
    userIdentifiers.push({ gclid: lead.attribution.gclid } as Record<
      string,
      string
    >)
  }

  const body = {
    conversions: [
      {
        conversionAction,
        conversionDateTime,
        userIdentifiers,
        gclid: lead.attribution.gclid,
        gbraid: lead.attribution.gbraid,
        wbraid: lead.attribution.wbraid,
        orderId: lead.event_id,
      },
    ],
    partialFailure: true,
  }

  try {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${accessToken}`,
      "developer-token": developerToken,
      "Content-Type": "application/json",
    }
    if (loginCustomerId) headers["login-customer-id"] = loginCustomerId

    const res = await fetch(
      `https://googleads.googleapis.com/v17/customers/${customerId}:uploadClickConversions`,
      { method: "POST", headers, body: JSON.stringify(body) }
    )
    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.error("[lead] Google Ads non-2xx", res.status, await res.text())
      return false
    }
    return true
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[lead] Google Ads threw", err)
    return false
  }
}

async function sendMetaCAPI(
  lead: Lead,
  ip: string,
  userAgent: string
): Promise<boolean> {
  const pixelId = process.env.META_PIXEL_ID
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN
  const testCode = process.env.META_TEST_EVENT_CODE

  if (!pixelId || !accessToken) {
    warnMissing(
      !pixelId ? "META_PIXEL_ID" : "META_CAPI_ACCESS_TOKEN",
      "Meta Conversions API"
    )
    return false
  }

  const userData: Record<string, unknown> = {
    em: [sha256(lead.email)],
    ph: [sha256(normalizePhone(lead.phone))],
    fn: [sha256(lead.firstName)],
    ln: [sha256(lead.lastName)],
    client_ip_address: ip,
    client_user_agent: userAgent,
  }
  if (lead.attribution.fbclid) {
    userData.fbc = `fb.1.${Date.now()}.${lead.attribution.fbclid}`
  }

  const event = {
    event_name: "Lead",
    event_time: Math.floor(Date.now() / 1000),
    event_id: lead.event_id,
    action_source: "website",
    event_source_url: lead.page_url,
    user_data: userData,
    custom_data: {
      currency: "USD",
      value: 0,
      content_category: lead.niche,
      content_name: `${lead.niche}-headshots-quote`,
    },
  }

  const body: Record<string, unknown> = { data: [event] }
  if (testCode) body.test_event_code = testCode

  try {
    const res = await fetch(
      `https://graph.facebook.com/v20.0/${pixelId}/events?access_token=${encodeURIComponent(
        accessToken
      )}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    )
    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.error("[lead] Meta CAPI non-2xx", res.status, await res.text())
      return false
    }
    return true
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[lead] Meta CAPI threw", err)
    return false
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Handler
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  const ip = getIp(req)
  const userAgent = req.headers.get("user-agent") ?? ""

  const limit = rateLimit(`lead:${ip}`, { capacity: 5, refillPerSecond: 1 / 30 })
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSeconds) },
      }
    )
  }

  let json: unknown
  try {
    json = await req.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 }
    )
  }

  const parsed = LeadSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed.",
        issues: parsed.error.flatten(),
      },
      { status: 422 }
    )
  }

  const lead = parsed.data

  const [emailOk, googleOk, metaOk] = await Promise.all([
    sendEmail(lead),
    sendGoogleAdsEnhancedConversion(lead),
    sendMetaCAPI(lead, ip, userAgent),
  ])

  // If email succeeded, treat the lead as captured — pixel forwarding failures
  // are recoverable (we still have the lead in our inbox).
  if (emailOk) {
    return NextResponse.json(
      { ok: true, channels: { email: emailOk, googleAds: googleOk, meta: metaOk } },
      { status: 200 }
    )
  }

  // No email destination configured (dev) but validation passed and at least
  // one ad-platform upload succeeded — still surface success so the user gets
  // their confirmation in dev environments.
  if (googleOk || metaOk) {
    return NextResponse.json(
      {
        ok: true,
        channels: { email: false, googleAds: googleOk, meta: metaOk },
        warning: "Email delivery skipped — RESEND_API_KEY / NOTIFICATION_EMAIL not configured.",
      },
      { status: 200 }
    )
  }

  // Dev convenience: when no integrations are configured at all we still
  // accept the submission so the funnel can be exercised locally.
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.json(
      {
        ok: true,
        channels: { email: false, googleAds: false, meta: false },
        warning:
          "No lead destinations configured. Lead accepted in dev mode only — check console for which envs are missing.",
      },
      { status: 200 }
    )
  }

  return NextResponse.json(
    { ok: false, error: "Lead capture is temporarily unavailable." },
    { status: 502 }
  )
}
