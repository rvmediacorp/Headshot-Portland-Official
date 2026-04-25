import { after, NextResponse, type NextRequest } from "next/server"
import { z } from "zod"
import { createHash } from "node:crypto"
import { rateLimit } from "@/lib/rate-limit"
import { submitBloomLead } from "@/lib/bloom"

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

/** Parse a JSON-object env var safely; returns {} if unset or invalid. */
function parseJsonMapEnv(envName: string): Record<string, string> {
  const raw = process.env[envName]
  if (!raw) return {}
  try {
    const parsed: unknown = JSON.parse(raw)
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      const out: Record<string, string> = {}
      for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
        if (typeof v === "string" && v.length > 0) out[k] = v
      }
      return out
    }
  } catch {
    // eslint-disable-next-line no-console
    console.warn(`[lead] Ignoring invalid JSON in ${envName}`)
  }
  return {}
}

// ─────────────────────────────────────────────────────────────────────────────
// GoHighLevel config — discovered via the v2 API at plan time. Override any of
// these by setting the corresponding env vars in Vercel.
// ─────────────────────────────────────────────────────────────────────────────

const GHL_CUSTOM_FIELD_IDS_DEFAULT = {
  // "Type of Headshots?"
  headshotType: "e9ek5b3pn5thh1TOXSrV",
  // "Get headshots in the next two weeks?"
  urgentBooking: "f9CcjdOaeJvCIS50krF9",
  // "How soon do you need your headshots?"
  deliveryTimeline: "5o5ZxKYU0emSU1hi1WrV",
  // "Budget Range?"
  budgetRanges: "X0TBXiBJ9JTOOkJ9L3xH",
} as const

const GHL_PIPELINE_ID_DEFAULT = "9gatPe7jbrGjLEhUVPI0" // Headshot Portland pipeline
const GHL_PIPELINE_STAGE_ID_DEFAULT = "b9eebb85-a806-487c-a270-94fe20e673a7" // New Lead

// ─────────────────────────────────────────────────────────────────────────────
// HubSpot config — discovered via the HubSpot CRM v3 API at plan time. Override
// via the corresponding env vars below.
// ─────────────────────────────────────────────────────────────────────────────

const HUBSPOT_DEAL_PIPELINE_ID_DEFAULT = "default" // "Aggregate Pipeline"
const HUBSPOT_DEAL_STAGE_ID_DEFAULT = "197430075" // "New Lead" (first stage)

/** Maps our LeadPayload fields → HubSpot contact property internal names. */
const HUBSPOT_PROPERTY_MAP_DEFAULT: Record<string, string> = {
  headshotType: "type_of_headshots",
  urgentBooking: "headshots_2_4_weeks",
  deliveryTimeline: "how_soon_do_you_need_your_headshots_after_our_session",
  budgetRanges: "budget_range",
  gclid: "gclid",
  fbclid: "fbclid",
  utm_source: "utm_source",
  utm_medium: "utm_medium",
  utm_campaign: "utm_campaign",
  utm_term: "utm_term",
  utm_content: "utm_content",
  landing_page: "landing_page_url",
  user_agent: "user_agent",
  ip: "ip_address",
  niche: "lead_source_detail", // niche has no dedicated property; surface via lead_source_detail
}

const HUBSPOT_PORTAL_ID_DEFAULT = "46471266"

// ─────────────────────────────────────────────────────────────────────────────
// BlueBubbles config — recipient list resolved at plan time via the
// `/api/v1/chat/query` endpoint. Each entry is a BlueBubbles chat GUID suitable
// for the `chatGuid` field on `/api/v1/message/text`. Override via the
// BLUEBUBBLES_RECIPIENTS env var (CSV of chat GUIDs).
// ─────────────────────────────────────────────────────────────────────────────

const BLUEBUBBLES_RECIPIENTS_DEFAULT = [
  "any;+;f054201be3994519bb7e2c8a6004362e", // "Headshot/Photobooth Crew" group chat
  "any;-;+15098407925", // Nathan personal
  "any;-;+15033137121", // Nathan work
  "any;-;+15033510058", // Megan
  "any;-;+15092502208", // Micah
  "any;-;+916291503714", // Sam
  "any;-;+919699026500", // Sia
  "any;-;+639054104952", // Ralph
] as const

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

interface GhlResult {
  contact: boolean
  opportunity: boolean
  contactId?: string
}

async function sendGoHighLevel(
  lead: Lead,
  ip: string
): Promise<GhlResult> {
  const token = process.env.GHL_API_TOKEN
  const locationId = process.env.GHL_LOCATION_ID

  if (!token || !locationId) {
    warnMissing(
      !token ? "GHL_API_TOKEN" : "GHL_LOCATION_ID",
      "GoHighLevel"
    )
    return { contact: false, opportunity: false }
  }

  const fieldIds = {
    ...GHL_CUSTOM_FIELD_IDS_DEFAULT,
    ...parseJsonMapEnv("GHL_CUSTOM_FIELD_MAP"),
  }
  const pipelineId = process.env.GHL_PIPELINE_ID ?? GHL_PIPELINE_ID_DEFAULT
  const pipelineStageId =
    process.env.GHL_PIPELINE_STAGE_ID ?? GHL_PIPELINE_STAGE_ID_DEFAULT

  const extraTags =
    (process.env.GHL_DEFAULT_TAGS ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean) ?? []

  const normalizedPhone = normalizePhone(lead.phone)

  const customFields = [
    { id: fieldIds.headshotType, field_value: lead.headshotType },
    {
      id: fieldIds.urgentBooking,
      field_value: lead.urgentBooking ? "Yes" : "No",
    },
    { id: fieldIds.deliveryTimeline, field_value: lead.deliveryTimeline },
    {
      id: fieldIds.budgetRanges,
      field_value: lead.budgetRanges.join(", "),
    },
  ].filter(
    (c) => typeof c.id === "string" && c.id.length > 0 && c.field_value !== ""
  )

  const attributionSource: Record<string, string> = {}
  const a = lead.attribution
  if (lead.page_url) attributionSource.url = lead.page_url
  if (a.referrer) attributionSource.referrer = a.referrer
  if (a.utm_campaign) attributionSource.campaign = a.utm_campaign
  if (a.utm_source) attributionSource.utmSource = a.utm_source
  if (a.utm_medium) attributionSource.utmMedium = a.utm_medium
  if (a.utm_content) attributionSource.utmContent = a.utm_content
  if (a.utm_term) attributionSource.keyword = a.utm_term
  if (a.gclid) attributionSource.gclid = a.gclid
  if (a.fbclid) attributionSource.fbclid = a.fbclid
  if (a.msclkid) attributionSource.msclkid = a.msclkid
  if (a.user_agent) attributionSource.userAgent = a.user_agent
  if (ip) attributionSource.ip = ip
  attributionSource.sessionSource = "Paid Landing Page"

  const upsertBody: Record<string, unknown> = {
    locationId,
    firstName: lead.firstName,
    lastName: lead.lastName,
    email: lead.email,
    phone: normalizedPhone,
    source: `Paid Landing Page - ${lead.niche}`,
    tags: ["paid-lead", lead.niche, ...extraTags],
    attributionSource,
    customFields,
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    Version: "2021-07-28",
    "Content-Type": "application/json",
    Accept: "application/json",
  }

  let contactId: string | null = null
  try {
    const res = await fetch(
      "https://services.leadconnectorhq.com/contacts/upsert",
      { method: "POST", headers, body: JSON.stringify(upsertBody) }
    )
    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.error(
        "[lead] GHL contact upsert non-2xx",
        res.status,
        await res.text()
      )
      return { contact: false, opportunity: false }
    }
    const data = (await res.json()) as {
      contact?: { id?: string }
      id?: string
    }
    contactId = data.contact?.id ?? data.id ?? null
    if (!contactId) {
      // eslint-disable-next-line no-console
      console.error("[lead] GHL upsert response missing contact id", data)
      return { contact: false, opportunity: false }
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[lead] GHL contact upsert threw", err)
    return { contact: false, opportunity: false }
  }

  // Contact is captured; opportunity is best-effort from here.
  const opportunityBody = {
    locationId,
    pipelineId,
    pipelineStageId,
    name: `${lead.firstName} ${lead.lastName} — ${lead.niche}`,
    status: "open",
    contactId,
    source: `Paid Landing Page - ${lead.niche}`,
    monetaryValue: 0,
  }

  try {
    const res = await fetch(
      "https://services.leadconnectorhq.com/opportunities/",
      { method: "POST", headers, body: JSON.stringify(opportunityBody) }
    )
    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.error(
        "[lead] GHL opportunity create non-2xx",
        res.status,
        await res.text()
      )
      return { contact: true, opportunity: false, contactId }
    }
    return { contact: true, opportunity: true, contactId }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[lead] GHL opportunity create threw", err)
    return { contact: true, opportunity: false, contactId }
  }
}

interface HubSpotResult {
  contact: boolean
  deal: boolean
  contactId?: string
}

async function sendHubSpot(
  lead: Lead,
  ip: string
): Promise<HubSpotResult> {
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN
  if (!token) {
    warnMissing("HUBSPOT_PRIVATE_APP_TOKEN", "HubSpot")
    return { contact: false, deal: false }
  }

  const propMap = {
    ...HUBSPOT_PROPERTY_MAP_DEFAULT,
    ...parseJsonMapEnv("HUBSPOT_PROPERTY_MAP"),
  }
  const dealPipeline =
    process.env.HUBSPOT_DEAL_PIPELINE_ID ?? HUBSPOT_DEAL_PIPELINE_ID_DEFAULT
  const dealStage =
    process.env.HUBSPOT_DEAL_STAGE_ID ?? HUBSPOT_DEAL_STAGE_ID_DEFAULT
  const defaultOwnerId = process.env.HUBSPOT_DEFAULT_OWNER_ID

  const normalizedPhone = normalizePhone(lead.phone)

  // Build the contact properties payload, writing optional fields only when a
  // property name + value are both present so HubSpot doesn't reject unknown
  // or empty properties.
  const props: Record<string, string> = {
    email: lead.email,
    firstname: lead.firstName,
    lastname: lead.lastName,
    phone: normalizedPhone,
    lifecyclestage: "lead",
    hs_lead_status: "NEW",
    hs_analytics_source: "PAID_SEARCH",
  }
  const setMapped = (key: string, value: string | undefined): void => {
    const internal = propMap[key]
    if (!internal) return
    if (value === undefined || value === null || value === "") return
    props[internal] = value
  }
  setMapped("headshotType", lead.headshotType)
  setMapped("urgentBooking", lead.urgentBooking ? "Yes" : "No")
  setMapped("deliveryTimeline", lead.deliveryTimeline)
  setMapped("budgetRanges", lead.budgetRanges.join(", "))
  setMapped("niche", `Paid Landing Page - ${lead.niche}`)
  setMapped("gclid", lead.attribution.gclid)
  setMapped("fbclid", lead.attribution.fbclid)
  setMapped("utm_source", lead.attribution.utm_source)
  setMapped("utm_medium", lead.attribution.utm_medium)
  setMapped("utm_campaign", lead.attribution.utm_campaign)
  setMapped("utm_term", lead.attribution.utm_term)
  setMapped("utm_content", lead.attribution.utm_content)
  setMapped("landing_page", lead.attribution.landing_page ?? lead.page_url)
  setMapped("user_agent", lead.attribution.user_agent)
  setMapped("ip", ip)

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  }

  let contactId: string | null = null
  try {
    const res = await fetch(
      "https://api.hubapi.com/crm/v3/objects/contacts/batch/upsert",
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          inputs: [
            { idProperty: "email", id: lead.email, properties: props },
          ],
        }),
      }
    )
    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.error(
        "[lead] HubSpot contact upsert non-2xx",
        res.status,
        await res.text()
      )
      return { contact: false, deal: false }
    }
    const data = (await res.json()) as {
      results?: Array<{ id?: string }>
    }
    contactId = data.results?.[0]?.id ?? null
    if (!contactId) {
      // eslint-disable-next-line no-console
      console.error("[lead] HubSpot upsert response missing contact id", data)
      return { contact: false, deal: false }
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[lead] HubSpot contact upsert threw", err)
    return { contact: false, deal: false }
  }

  const dealProperties: Record<string, string> = {
    dealname: `${lead.firstName} ${lead.lastName} — ${lead.niche}`,
    pipeline: dealPipeline,
    dealstage: dealStage,
  }
  if (defaultOwnerId) dealProperties.hubspot_owner_id = defaultOwnerId

  const dealBody = {
    properties: dealProperties,
    associations: [
      {
        to: { id: contactId },
        types: [
          {
            associationCategory: "HUBSPOT_DEFINED",
            associationTypeId: 3, // deal → contact (primary)
          },
        ],
      },
    ],
  }

  try {
    const res = await fetch("https://api.hubapi.com/crm/v3/objects/deals", {
      method: "POST",
      headers,
      body: JSON.stringify(dealBody),
    })
    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.error(
        "[lead] HubSpot deal create non-2xx",
        res.status,
        await res.text()
      )
      return { contact: true, deal: false, contactId }
    }
    return { contact: true, deal: true, contactId }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[lead] HubSpot deal create threw", err)
    return { contact: true, deal: false, contactId }
  }
}

interface BlueBubblesContext {
  ghlContactId?: string
  hubspotContactId?: string
  bloomSubmitted?: boolean
}

interface BlueBubblesResult {
  attempted: number
  succeeded: number
}

/**
 * Format the iMessage body for a lead notification. Plain text, newline-delimited.
 * Fits comfortably in a single iMessage while staying readable on a phone lock screen.
 */
function formatLeadMessage(
  lead: Lead,
  ctx: BlueBubblesContext
): string {
  const lines: string[] = [
    `New lead: ${lead.firstName} ${lead.lastName} (${lead.niche})`,
    `Phone: ${normalizePhone(lead.phone)}`,
    `Email: ${lead.email}`,
    "",
    `Headshot type: ${lead.headshotType}`,
    `Urgent (2-4wk): ${lead.urgentBooking ? "Yes" : "No"}`,
    `Timeline: ${lead.deliveryTimeline}`,
    `Budget: ${lead.budgetRanges.join(", ")}`,
  ]

  const a = lead.attribution
  const src = [a.utm_source, a.utm_medium, a.utm_campaign]
    .filter((v): v is string => typeof v === "string" && v.length > 0)
    .join(" / ")
  const attributionBits: string[] = []
  if (src) attributionBits.push(`Source: ${src}`)
  if (a.landing_page) attributionBits.push(`Landing: ${a.landing_page}`)
  if (a.gclid) attributionBits.push(`gclid: ${a.gclid}`)
  if (attributionBits.length > 0) {
    lines.push("", ...attributionBits)
  }

  const crmLinks: string[] = []
  const locationId = process.env.GHL_LOCATION_ID
  if (ctx.ghlContactId && locationId) {
    crmLinks.push(
      `GHL: https://app.gohighlevel.com/v2/location/${locationId}/contacts/detail/${ctx.ghlContactId}`
    )
  }
  if (ctx.hubspotContactId) {
    const portal = process.env.HUBSPOT_PORTAL_ID ?? HUBSPOT_PORTAL_ID_DEFAULT
    crmLinks.push(
      `HubSpot: https://app.hubspot.com/contacts/${portal}/record/0-1/${ctx.hubspotContactId}`
    )
  }
  if (ctx.bloomSubmitted) {
    // Bloom's per-lead portal URL uses an auth-only ID that isn't returned by
    // the public submission API, so we link to the inbox and rely on the
    // recipient finding the lead by name. See README-paid-pages.md.
    crmLinks.push("Bloom: https://app.bloom.io/portal/leads")
  }
  if (crmLinks.length > 0) {
    lines.push("", ...crmLinks)
  }

  return lines.join("\n")
}

/**
 * Send an iMessage notification for the lead to each configured BlueBubbles chat.
 *
 * Zrok WAF quirk: public zrok shares reject POSTs with `application/json` bodies
 * at the AWS ELB layer. We use `application/x-www-form-urlencoded` instead, which
 * passes the WAF and is equally well-supported by the BlueBubbles REST API.
 */
async function sendBlueBubbles(
  lead: Lead,
  ctx: BlueBubblesContext
): Promise<BlueBubblesResult> {
  const serverUrlRaw = process.env.BLUEBUBBLES_SERVER_URL
  const password = process.env.BLUEBUBBLES_PASSWORD

  if (!serverUrlRaw || !password) {
    warnMissing(
      !serverUrlRaw ? "BLUEBUBBLES_SERVER_URL" : "BLUEBUBBLES_PASSWORD",
      "BlueBubbles"
    )
    return { attempted: 0, succeeded: 0 }
  }

  const serverUrl = serverUrlRaw.replace(/\/+$/, "")

  const recipientsEnv = process.env.BLUEBUBBLES_RECIPIENTS
  const recipients =
    recipientsEnv
      ?.split(",")
      .map((r) => r.trim())
      .filter(Boolean) ?? [...BLUEBUBBLES_RECIPIENTS_DEFAULT]

  if (recipients.length === 0) {
    // eslint-disable-next-line no-console
    console.warn("[lead] BlueBubbles skipped — no recipients configured")
    return { attempted: 0, succeeded: 0 }
  }

  const message = formatLeadMessage(lead, ctx)
  const endpoint = `${serverUrl}/api/v1/message/text?password=${encodeURIComponent(
    password
  )}`

  const results = await Promise.allSettled(
    recipients.map(async (chatGuid, i) => {
      const body = new URLSearchParams({
        chatGuid,
        message,
        method: "apple-script",
        tempGuid: `lead-${lead.event_id}-${i}`,
      })
      const ctrl = new AbortController()
      const timeout = setTimeout(() => ctrl.abort(), 10_000)
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
          body: body.toString(),
          signal: ctrl.signal,
        })
        if (!res.ok) {
          // eslint-disable-next-line no-console
          console.error(
            "[lead] BlueBubbles send non-2xx",
            chatGuid,
            res.status,
            await res.text()
          )
          throw new Error(`non-2xx ${res.status}`)
        }
        return chatGuid
      } finally {
        clearTimeout(timeout)
      }
    })
  )

  const succeeded = results.filter((r) => r.status === "fulfilled").length
  for (const r of results) {
    if (r.status === "rejected") {
      // eslint-disable-next-line no-console
      console.error("[lead] BlueBubbles recipient failed", r.reason)
    }
  }
  // eslint-disable-next-line no-console
  console.log(
    `[lead] BlueBubbles ${succeeded}/${recipients.length} succeeded`
  )

  return { attempted: recipients.length, succeeded }
}

interface BloomResult {
  submitted: boolean
  answerGroupId?: string
}

/**
 * Submit the lead to Bloom.io — the backend CRM for the photography studio.
 *
 * Bloom's public API has no auth and no upsert; every SUBMIT creates a new
 * answer group. A mid-sequence failure leaves an orphaned (non-finalized)
 * answer group in Bloom that's invisible in the inbox, so cleanup isn't
 * needed. We enforce a single 15s AbortController across all 7 Bloom calls
 * (typical completion ~1.2s) so a slow Bloom moment can't stall the handler.
 */
async function sendBloom(lead: Lead): Promise<BloomResult> {
  if (process.env.BLOOM_DISABLED === "true") {
    warnMissing("BLOOM_DISABLED!=true", "Bloom")
    return { submitted: false }
  }

  const ctrl = new AbortController()
  const timeout = setTimeout(() => ctrl.abort(), 15_000)
  try {
    const { answerGroupId } = await submitBloomLead(
      {
        headshotType: lead.headshotType,
        needIn2to4Wks: lead.urgentBooking,
        turnaround: lead.deliveryTimeline,
        budget: [...lead.budgetRanges],
        contact: {
          firstName: lead.firstName,
          lastName: lead.lastName,
          email: lead.email,
          phone: normalizePhone(lead.phone),
        },
      },
      {
        questionnaireId: process.env.BLOOM_QUESTIONNAIRE_ID,
        signal: ctrl.signal,
      }
    )
    return { submitted: true, answerGroupId }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[lead] Bloom submission failed", err)
    return { submitted: false }
  } finally {
    clearTimeout(timeout)
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

  const [emailOk, googleOk, metaOk, ghlRes, hubspotRes, bloomRes] =
    await Promise.all([
      sendEmail(lead),
      sendGoogleAdsEnhancedConversion(lead),
      sendMetaCAPI(lead, ip, userAgent),
      sendGoHighLevel(lead, ip),
      sendHubSpot(lead, ip),
      sendBloom(lead),
    ])

  // Fire the iMessage crew notification in the background so the user-facing
  // response stays fast. `after()` lets the serverless function keep running
  // after the HTTP response has been flushed.
  after(async () => {
    try {
      await sendBlueBubbles(lead, {
        ghlContactId: ghlRes.contactId,
        hubspotContactId: hubspotRes.contactId,
        bloomSubmitted: bloomRes.submitted,
      })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[lead] BlueBubbles after() threw", err)
    }
  })

  const channels = {
    email: emailOk,
    googleAds: googleOk,
    meta: metaOk,
    ghl: ghlRes,
    hubspot: hubspotRes,
    bloom: bloomRes,
  }

  // If email succeeded, treat the lead as captured — pixel forwarding and CRM
  // failures are recoverable (the lead is safely in our inbox).
  if (emailOk) {
    return NextResponse.json({ ok: true, channels }, { status: 200 })
  }

  // No email destination configured (dev) but validation passed and at least
  // one downstream destination succeeded — still surface success so the user
  // gets their confirmation in dev environments.
  if (
    googleOk ||
    metaOk ||
    ghlRes.contact ||
    hubspotRes.contact ||
    bloomRes.submitted
  ) {
    return NextResponse.json(
      {
        ok: true,
        channels,
        warning:
          "Email delivery skipped — RESEND_API_KEY / NOTIFICATION_EMAIL not configured.",
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
        channels,
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
