export type Niche =
  | "corporate"
  | "actor"
  | "linkedin"
  | "modeling"
  | "realtor"

export type FormStep = 1 | 2 | 3 | 4 | 5

export type HeadshotType =
  | "LinkedIn"
  | "Website & Business Card"
  | "Modeling Digital"
  | "Children Portfolio"

export type DeliveryTimeline = "24-48 Hours" | "1 Week" | "2-3 Weeks"

export type BudgetRange =
  | "$200-500"
  | "$500-1000"
  | "$1k-2k (teams)"
  | "$2k-4k (large teams)"

export interface AttributionData {
  gclid?: string
  gbraid?: string
  wbraid?: string
  fbclid?: string
  msclkid?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  landing_page?: string
  referrer?: string
  first_ts?: string
  user_agent?: string
}

export interface LeadFormData {
  niche: Niche
  headshotType: HeadshotType
  /** Step 2: yes/no — does the lead want to shoot within the next 2-4 weeks? */
  urgentBooking: boolean
  deliveryTimeline: DeliveryTimeline
  /** Step 4 is multi-select; always at least one entry. */
  budgetRanges: BudgetRange[]
  firstName: string
  lastName: string
  email: string
  phone: string
}

export interface LeadPayload extends LeadFormData {
  attribution: AttributionData
  /** Stable ID used for Meta CAPI / GTM dedup */
  event_id: string
  /** Page locale / origin info */
  page_url?: string
}
