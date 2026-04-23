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

> The handler returns success if email delivery worked; ad-platform failures
> are logged but never break the user experience. In dev mode, all
> integrations may be missing — the form will still confirm to the user and
> the missing env names are logged.

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
