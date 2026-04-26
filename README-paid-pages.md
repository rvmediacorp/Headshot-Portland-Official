# Paid landing pages — Headshot Portland

Five Google Ads landing pages live under the `app/(paid)/` route group and
share a single, light-themed layout.

| Route                       | Ad group / niche       |
| --------------------------- | ---------------------- |
| `/corporate-headshots`      | Corporate / executive  |
| `/actor-headshots`          | Actor / theatrical     |
| `/linkedin-headshots`       | LinkedIn / personal    |
| `/modeling-headshots`       | Modeling / portfolio   |
| `/realtor-headshots`        | Realtor / brokers      |

Each page is **statically rendered** (`force-static`, ISR 1h) and emits a
per-niche `Service` JSON-LD plus a shared `PhotographyBusiness` block.

---

## File map

```
app/(paid)/
  layout.tsx                          # light theme, fonts, GTM, Consent Mode v2, JSON-LD
  corporate-headshots/page.tsx        # ~25 lines — props + metadata
  actor-headshots/page.tsx
  linkedin-headshots/page.tsx
  modeling-headshots/page.tsx
  realtor-headshots/page.tsx
  _components/
    PaidPageShell.tsx                 # composes hero + sections + JSON-LD
    HeroWithInlineForm.tsx            # 2x2 / 3x2 grid + overlay + headline + form
    QuoteForm.tsx                     # 4-step inline form, fires GTM events
    TrustBar.tsx
    Testimonials.tsx
    WhyNathan.tsx
    LogoBar.tsx
    StickyHeader.tsx
    StickyMobileCTA.tsx               # mobile-only; auto-hides while form visible
    Footer.tsx
    Analytics.tsx                     # initialises window.dataLayer
app/api/lead/route.ts                 # POST handler — Resend + Google Ads ECL + Meta CAPI
lib/
  analytics.ts                        # `track()` + `newEventId()`
  AttributionCapture.tsx              # gclid/utm capture → cookies + localStorage
  testimonials.ts                     # 3 named testimonials
  hero-images.ts                      # niche → image[] mapping
  rate-limit.ts                       # in-memory token-bucket limiter
types/lead.ts                         # LeadPayload, AttributionData, FormStep, Niche
```

---

## Required placeholders / env vars

Set these in Vercel (Production + Preview) and `.env.local` for dev. Anything
left unset is gracefully skipped (page still renders) — the only required
piece in production is your email destination.

### Public (browser) vars

| Var                                | What it does                              | Example                |
| ---------------------------------- | ----------------------------------------- | ---------------------- |
| `NEXT_PUBLIC_GTM_CONTAINER_ID`     | GTM container loaded from layout          | `GTM-XXXXXXX`          |
| `NEXT_PUBLIC_BRAND_ORANGE_HEX`     | CSS `--brand` accent color                | `#E07A1F`              |
| `NEXT_PUBLIC_GOOGLE_REVIEW_COUNT`  | Number used in trust bar + JSON-LD        | `119`                  |
| `NEXT_PUBLIC_SITE_URL`             | Absolute origin for canonicals + JSON-LD  | `https://headshotportland.com` |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID`       | Google Ads AW ID used by `/call` (defaults to `AW-847156852` from the root layout) | `AW-847156852`         |
| `NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION_LABEL` | Google Ads *Call-Conversion* label fired on `/call` page load (see "Call Now sitelink" section) | `AbCdEfGhIjKlMnOpQ`    |

### Server-only (consumed by `/api/lead`)

| Var                                  | Integration                              |
| ------------------------------------ | ---------------------------------------- |
| `NOTIFICATION_EMAIL`                 | Inbox that receives every lead           |
| `RESEND_API_KEY`                     | Resend transactional email API           |
| `RESEND_FROM_EMAIL` *(optional)*     | Verified sender address                  |
| `GOOGLE_ADS_CUSTOMER_ID`             | Google Ads account (no dashes)           |
| `GOOGLE_ADS_CONVERSION_ACTION_ID`    | Lead conversion action ID                |
| `GOOGLE_ADS_DEVELOPER_TOKEN`         | Google Ads developer token               |
| `GOOGLE_ADS_ACCESS_TOKEN`            | OAuth access token (refresh server-side) |
| `GOOGLE_ADS_LOGIN_CUSTOMER_ID`       | MCC customer ID (omit for non-MCC)       |
| `META_PIXEL_ID`                      | Meta Pixel ID                            |
| `META_CAPI_ACCESS_TOKEN`             | Meta Conversions API token               |
| `META_TEST_EVENT_CODE` *(optional)*  | Use during CAPI testing                  |
| `GHL_API_TOKEN`                      | GoHighLevel Private Integration Token    |
| `GHL_LOCATION_ID`                    | GHL sub-account location ID (`lF0yJJW3c7CnV47qkTck`) |
| `GHL_PIPELINE_ID` *(optional)*       | Override the opportunities pipeline ID (defaults to the "Headshot Portland" pipeline) |
| `GHL_PIPELINE_STAGE_ID` *(optional)* | Override the first-stage ID (defaults to "New Lead") |
| `GHL_CUSTOM_FIELD_MAP` *(optional)*  | JSON object mapping payload fields → GHL custom field IDs to override the built-in defaults |
| `GHL_DEFAULT_TAGS` *(optional)*      | CSV of extra tags applied on every upsert in addition to `paid-lead,<niche>` |
| `HUBSPOT_PRIVATE_APP_TOKEN`          | HubSpot Private App access token         |
| `HUBSPOT_DEAL_PIPELINE_ID` *(optional)* | Override the deal pipeline (defaults to `default` / "Aggregate Pipeline") |
| `HUBSPOT_DEAL_STAGE_ID` *(optional)* | Override the first stage (defaults to `197430075` / "New Lead") |
| `HUBSPOT_DEFAULT_OWNER_ID` *(optional)* | HubSpot user ID to own newly-created deals |
| `HUBSPOT_PROPERTY_MAP` *(optional)*  | JSON overrides for HubSpot contact property internal names |
| `HUBSPOT_PORTAL_ID` *(optional)*     | HubSpot portal ID used when building record URLs in the BlueBubbles notification (defaults to `46471266`) |
| `BLUEBUBBLES_SERVER_URL`             | BlueBubbles server base URL, no trailing slash (e.g. `https://abc123.share.zrok.io`) |
| `BLUEBUBBLES_PASSWORD`               | BlueBubbles server password |
| `BLUEBUBBLES_RECIPIENTS` *(optional)* | CSV override of chat GUIDs / E.164 numbers; defaults to the hardcoded crew list (group chat + 7 individual numbers) |
| `BLOOM_QUESTIONNAIRE_ID` *(optional)* | Override the target Bloom questionnaire (defaults to `3257ko6em9n6g` — "Get instant quote") |
| `BLOOM_DISABLED` *(optional)*        | Set to `true` to skip Bloom entirely. Emergency kill-switch if Bloom's API breaks. |

> The handler returns success if email delivery worked; ad-platform and CRM
> failures are logged but never break the user experience. In dev mode, all
> integrations may be missing — the form will still confirm to the user and
> the missing env names are logged. Each CRM forwarder is fail-soft: a contact
> upsert that succeeds but an opportunity/deal create that fails still
> captures the lead and the channel response surfaces the partial result as
> `{ contact: true, opportunity: false }` for observability. The BlueBubbles
> forwarder runs via Next.js `after()` **after** the HTTP response has been
> flushed, so slow or failing iMessage sends never delay the form confirmation.

---

## CRM routing — GoHighLevel + HubSpot

Every submission is parallel-forwarded to:

1. **GoHighLevel** — `POST /contacts/upsert` (match on email+phone) → then
   `POST /opportunities/` into the first stage of the "Headshot Portland"
   pipeline, associated to the upserted contact. Tags `paid-lead` + niche,
   and all UTM/gclid data is routed into GHL's native Attribution panel via
   the `attributionSource` object.
2. **HubSpot** — `POST /crm/v3/objects/contacts/batch/upsert` (idProperty =
   email) → then `POST /crm/v3/objects/deals` with a `HUBSPOT_DEFINED`
   contact association into the first stage of the default "Aggregate
   Pipeline". New contacts are flagged `lifecyclestage=lead`,
   `hs_lead_status=NEW`, `hs_analytics_source=PAID_SEARCH`.

### GHL custom-field mapping (baked into the route)

Pulled at integration time via `GET /locations/{locationId}/customFields`.
Override via `GHL_CUSTOM_FIELD_MAP` JSON if you rename or add fields.

| Payload field      | GHL field ID              | GHL field label                            |
| ------------------ | ------------------------- | ------------------------------------------ |
| `headshotType`     | `e9ek5b3pn5thh1TOXSrV`    | Type of Headshots?                         |
| `urgentBooking`    | `f9CcjdOaeJvCIS50krF9`    | Get headshots in the next two weeks?       |
| `deliveryTimeline` | `5o5ZxKYU0emSU1hi1WrV`    | How soon do you need your headshots?       |
| `budgetRanges`     | `X0TBXiBJ9JTOOkJ9L3xH`    | Budget Range?                              |

`urgentBooking` is written as `"Yes"`/`"No"`, `budgetRanges` is joined with
`", "`. `niche` is NOT a custom field — it's encoded as a GHL tag instead.

### HubSpot property mapping (baked into the route)

Pulled at integration time via `GET /crm/v3/properties/contacts`. Override via
`HUBSPOT_PROPERTY_MAP` JSON if your property internal names differ.

| Payload field      | HubSpot internal name                                       |
| ------------------ | ----------------------------------------------------------- |
| `headshotType`     | `type_of_headshots`                                         |
| `urgentBooking`    | `headshots_2_4_weeks` (value: `"Yes"` / `"No"`)             |
| `deliveryTimeline` | `how_soon_do_you_need_your_headshots_after_our_session`     |
| `budgetRanges`     | `budget_range` (comma-joined)                               |
| `niche`            | `lead_source_detail` (value: `"Paid Landing Page - <niche>"`) |
| `gclid`            | `gclid`                                                     |
| `fbclid`           | `fbclid`                                                    |
| `utm_*`            | `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` |
| `landing_page`     | `landing_page_url`                                          |
| `user_agent`       | `user_agent`                                                |
| `ip`               | `ip_address`                                                |

### Bloom CRM routing

[Bloom.io](https://bloom.io) is the studio's backend CRM. Every lead is
forwarded to it in parallel with GHL / HubSpot / email via `sendBloom(lead)`
in [app/api/lead/route.ts](app/api/lead/route.ts), which calls into
[lib/bloom.ts](lib/bloom.ts).

**Three-stage submission flow** (seven total HTTP calls, strictly sequential
since Bloom races out-of-order submits):

1. `POST /api/questionnaires/{id}/answer-groups` — Bloom returns a group ID
2. `POST /api/questionnaires/{id}/answers` × 5 — one per question in the
   order `headshotType`, `needIn2to4Wks`, `turnaround`, `budget`, `contact`
3. `POST /api/questionnaires/{id}/answers` with `payload: "SUBMIT"` — finalize

All 7 calls share a single 15-second `AbortController` so a slow Bloom
moment can never stall the API route for more than that. Typical successful
submissions complete in ~1.2s.

**No auth, no CORS, no mapping layer.** Bloom's questionnaire API is public.
We call it server-side from the route handler, so no secrets or tokens are
exposed to the browser. The existing `Lead` enum values in
[types/lead.ts](types/lead.ts) (`HeadshotType`, `DeliveryTimeline`,
`BudgetRange`, and the boolean `urgentBooking`) match Bloom's exact
expected strings verbatim, so there's no UI-to-API mapping layer to
maintain. Phone is normalized to E.164 via `normalizePhone()` for
consistency with GHL and HubSpot.

**`niche` is intentionally dropped.** Bloom's questionnaire has no slot for
niche and rejects extra keys on the personal-info payload with 400. Niche
info is still captured in email subjects, GHL tags (`paid-lead,<niche>`),
HubSpot `lead_source_detail`, and analytics events — just not in Bloom. If
you ever want it in Bloom, add a 6th question in the Bloom UI and wire up
the new `questionId`.

**Schema-drift risk.** If a Bloom admin renames an enum value in the Bloom
UI (e.g. `$500-1000` → `$500–1,000`), submissions will start returning
400. For now we log non-2xx responses server-side via
`[lead] Bloom submission failed`; check Vercel logs if Bloom leads stop
arriving. A nightly canary-lead cron would be the next step if reliability
becomes a concern.

**No delete / no upsert.** Bloom's public API has no way to update or
delete an existing submission. Every SUBMIT creates a fresh record. A
mid-sequence failure leaves an orphaned (non-finalized) answer group that
never appears in the Bloom inbox — no cleanup is needed.

### BlueBubbles crew notification

On every lead, a best-effort iMessage is fan-sent (via `Promise.allSettled`)
to the "Headshot/Photobooth Crew" group chat plus individual numbers for
Nathan, Megan, Micah, Sam, Sia, and Ralph. The message is plain text and
contains the lead's name + contact info, the full form-answer block
(headshot type, urgency, timeline, budget), compact source attribution
(`utm_source/medium/campaign`, `gclid`, landing page), and one-tap links to
the freshly-upserted GHL contact, HubSpot contact, and the Bloom inbox.

The Bloom link points to the inbox (`https://app.bloom.io/portal/leads`)
rather than a specific lead record. Bloom's per-lead portal URL uses an
auth-only ID that isn't returned by the public submission API, so the
notification gives the crew the lead's name/phone/email and one tap into
the Bloom inbox, where they can find the record by name.

Implementation lives inside `sendBlueBubbles(lead, ctx)` in
[app/api/lead/route.ts](app/api/lead/route.ts) and is scheduled via
`after()` from `next/server` — it runs **after** the 200 response has been
flushed to the browser, so iMessage latency never affects the user-facing
form. Each recipient has a 10-second per-request timeout and the failures
are non-fatal (logged and surfaced in Vercel logs only).

**Zrok public-share quirk**: POST requests with `application/json` bodies
are rejected by AWS WAF at the zrok load balancer with a 403. We use
`application/x-www-form-urlencoded` bodies instead, which pass cleanly and
are fully supported by the BlueBubbles REST API. This is documented in the
forwarder's comment header — no action needed unless you switch tunnels.

**URL stability warning**: zrok public shares (`*.share.zrok.io`) can
rotate their subdomain when the tunnel restarts. If your tunnel drops,
every new lead silently fails to text the crew until
`BLUEBUBBLES_SERVER_URL` is updated in Vercel. For production-grade
reliability consider upgrading to a reserved zrok share, or moving to
Cloudflare Tunnel or ngrok with a reserved domain.

Recipient list overrides: set `BLUEBUBBLES_RECIPIENTS` to a comma-separated
list of chat GUIDs (from `POST /api/v1/chat/query`) or E.164 phone
numbers. To refresh the chat list:

```
curl -X POST "$BLUEBUBBLES_SERVER_URL/api/v1/chat/query?password=$BLUEBUBBLES_PASSWORD" \
     | jq -r '.data[] | [.guid, .displayName, (.participants | length)] | @tsv'
```

Group chats show up as `any;+;<guid>`; individual chats as `any;-;<address>`.

### Required HubSpot Private App scopes

On the HubSpot Private App backing `HUBSPOT_PRIVATE_APP_TOKEN`:

- `crm.objects.contacts.read`
- `crm.objects.contacts.write`
- `crm.objects.deals.read`
- `crm.objects.deals.write`
- `crm.schemas.contacts.read`
- `crm.schemas.deals.read`

### Vendor setup / refresh

- **GHL custom field IDs** — refresh via
  `curl -H "Authorization: Bearer $GHL_API_TOKEN" -H "Version: 2021-07-28" \
  https://services.leadconnectorhq.com/locations/$GHL_LOCATION_ID/customFields`
  and paste IDs into `GHL_CUSTOM_FIELD_MAP` or the `GHL_CUSTOM_FIELD_IDS_DEFAULT`
  constant in `app/api/lead/route.ts`.
- **GHL pipeline + stages** — refresh via
  `curl -H "Authorization: Bearer $GHL_API_TOKEN" -H "Version: 2021-07-28" \
  "https://services.leadconnectorhq.com/opportunities/pipelines?locationId=$GHL_LOCATION_ID"`.
- **HubSpot properties** — find internal names at Settings → Data Management
  → Properties → Contact properties → click a property → "Internal name".
- **HubSpot deal pipelines** — Settings → Objects → Deals → Pipelines, or via
  `curl -H "Authorization: Bearer $HUBSPOT_PRIVATE_APP_TOKEN" \
  https://api.hubapi.com/crm/v3/pipelines/deals`.

---

## Call Now sitelink — `/call`

A dedicated route at `/call` targets the Google Ads "Call Now" sitelink.
When a visitor lands there:

1. The page paints immediately (branded UI: logo, 5-star Google rating,
   large brand-colored phone number, big "Tap to Call Now" button, hours +
   studio address). Living inside `app/(paid)/call/page.tsx`, so it shares
   the paid layout's GTM setup and is suppressed from the global Navbar +
   StickyCTA via the respective component `SUPPRESS_PREFIXES` arrays.
2. An inline `<script>` fires three things in order:
   - A `phone_click` event on `window.dataLayer` (for any GTM tag listening
     — existing or new).
   - A Google Ads **call conversion** via `gtag('event','conversion', ...)`
     scoped to `NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION_LABEL`. Skipped
     silently if the label env is unset.
   - A `setTimeout(tel: redirect, 500ms)` — gives the page ~half a second
     to fully paint before the device dialer takes focus, so users never
     see a blank flash.
3. A tappable `<a href="tel:+15033137121">` fallback button is always
   visible so desktop and no-JS visitors (and returning-from-call visitors)
   have a one-tap path to dial.

### Setting up the Google Ads Call Conversion action

1. Google Ads → **Goals → Conversions → New conversion action**
2. Source: **Website**
3. Conversion name: e.g. `Call from Website – /call`
4. Category: **Phone call lead**
5. Value: whatever lead-value you want to assign (the page sends `1.0 USD`;
   you can overwrite in the Google Ads UI or adjust the inline script)
6. Count: **One** (a single conversion per landing)
7. Conversion window: 30-day default
8. Attribution model: data-driven (default)
9. After the action is created, open its **"Tag setup"** view and copy the
   **Conversion label** (the short alphanumeric string after the `/` in
   the `send_to` param, e.g. `AbCdEfGhIjKlMnOpQ`)
10. In Vercel → the project's **Environment Variables** screen, set
    `NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION_LABEL` to that label. Apply to
    Production + Preview. Redeploy (any commit or click "Redeploy").
11. Verify in Google Ads → Conversions → the action should show incoming
    events within ~15 minutes of a real test call-button tap.

> **Why the env var instead of hardcoding?** You can rotate the conversion
> label (e.g. when migrating between Google Ads accounts or test/prod) by
> setting the env var in Vercel without touching code. The label itself is
> low-sensitivity (it's effectively public once your ad runs).

### Using it in your Google Ad

In the Google Ads UI for your "Call Now" sitelink extension, set the
**Sitelink URL** to `https://www.headshotportland.com/call`. That's it —
no URL tracking template changes needed; the page reads `utm_*` and
`gclid` from the ad's final URL via the shared attribution cookie
established by `AttributionCapture`, and the conversion tag fires
independently.

---

## Per-page placeholders

Open Graph images per niche live at `public/og-<niche>.jpg`. Replace before launch:

- `public/og-corporate.jpg` (1200×630)
- `public/og-actor.jpg`
- `public/og-linkedin.jpg`
- `public/og-modeling.jpg`
- `public/og-realtor.jpg`

Hero grid imagery is centralised in `lib/hero-images.ts`. Each niche has 6 image
slots currently pointing at `/placeholder.jpg`. Replace with niche-specific
WebP files (recommended size 1200×1500, ~85% quality):

```ts
// lib/hero-images.ts
corporate: [
  { src: "/images/paid/corporate/exec-suit-1.webp", alt: "..." },
  // ...
]
```

---

## GTM events fired by the form

| Event                  | When                                       | Useful params                                |
| ---------------------- | ------------------------------------------ | -------------------------------------------- |
| `form_start`           | First interaction with step 1              | `niche`, `form_id`                           |
| `form_step_complete`   | Each step advance (steps 1 through 5)      | `step` (1-5), `next_step` (1-5), `niche`     |
| `form_submit`          | User clicks submit (pre-API)               | `niche`, `form_id`                           |
| `generate_lead`        | API confirmed success                      | `value`, `currency`, `event_id`, `attribution` |
| `phone_click`          | Click-to-call (header / sticky / errors)   | `from`                                       |
| `external_cta_click`   | Fallback link clicked after API failure    | `from`, `href`                               |
| `sticky_cta_click`     | Mobile sticky CTA tapped                   | `destination`                                |

The form has 5 steps. Steps 1 (headshot type), 2 (urgent booking yes/no), and
3 (delivery timeline) auto-advance on tap. Step 4 (budget) is **multi-select**
and stays on screen until the user clicks **Next**. Step 5 (contact) submits.

Wire these in GTM:

- `generate_lead` → GA4 conversion + Google Ads conversion action +
  Meta Pixel `Lead` (with the same `event_id` so the server-side CAPI call
  dedups — the API uses the form's `event_id` field).

---

## Go-live checklist

### Code & content
- [ ] Replace every `{{PLACEHOLDER}}` env var listed above
- [ ] Drop real OG images into `public/og-*.jpg`
- [ ] Replace each niche's 6 hero slots in `lib/hero-images.ts` (alt text
      already follows the `"<niche> headshot example — Portland studio"` pattern)
- [ ] Replace testimonial portraits with approved photos (`lib/testimonials.ts`)
- [ ] Verify `NEXT_PUBLIC_SITE_URL` matches the production domain so canonicals
      and JSON-LD URLs resolve to the right origin
- [ ] Confirm `NEXT_PUBLIC_BRAND_ORANGE_HEX` matches the brand sheet —
      verify white text on `--brand` passes 4.5:1 contrast in Lighthouse

### Tracking
- [ ] GTM container ID set; container published with GA4 + Google Ads +
      Meta Pixel tags listening for `generate_lead`
- [ ] Google Ads → Tools → Conversions → enable **Enhanced Conversions for
      Leads** on the conversion action targeted by `GOOGLE_ADS_CONVERSION_ACTION_ID`
- [ ] Meta Events Manager → confirm `Lead` event appearing from both
      browser pixel and CAPI, with matching `event_id` (dedup OK)
- [ ] Consent Mode v2 default is `denied` for ad/analytics storage — verify
      with Tag Assistant before driving paid traffic

### Pages
- [ ] Hit each of the 5 routes on a real iPhone — verify the **headline +
      first form step are above the fold without scrolling**
- [ ] Submit a real test lead per route → confirm email arrives, Google Ads
      diagnostics shows the upload, Meta CAPI test events show the lead
- [ ] Lighthouse mobile run on each route: Performance ≥ 90, A11y ≥ 95,
      SEO 100, LCP < 2.0s, CLS < 0.05
- [ ] Run the form with a screen reader — every step announced, errors
      announced via `aria-live`

### Ads
- [ ] Final URL on each ad group exactly matches its niche route
- [ ] Tracking template (account-level) appends `gclid=<value>` etc. so the
      attribution capture has data to persist
