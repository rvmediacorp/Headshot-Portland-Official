---
type: performance-audit
people: []
tags:
  - performance
  - optimization
  - mobile
  - web-vitals
  - pagespeed
status: active
created_date: '2026-03-19'
description: 'PageSpeed Insights audit for headshotportland.com. Mobile performance 65/100 with critical LCP of 8.8s. Root cause: JS hydration blocks poster image paint (1.67s). Includes detailed breakdown of all opportunities, diagnostics, and prioritized action plan targeting performance 85+'
---
# PageSpeed Optimization — Round 2 (Real PageSpeed Insights + Chrome DevTools)

**Date:** 2026-03-19
**Site:** https://www.headshotportland.com
**Sources:** Google PageSpeed Insights (Slow 4G, Moto G Power) + Chrome DevTools MCP trace

---

## Scores (Mobile)

| Category | Score |
| --- | --- |
| **Performance** | **65** |
| Accessibility | 96 |
| Best Practices | 91 |
| SEO | 91 |

## Core Web Vitals (Mobile)

| Metric | Value | Target | Status |
| --- | --- | --- | --- |
| **FCP** | **3.3s** | <1.8s | FAIL |
| **LCP** | **8.8s** | <2.5s | FAIL |
| TBT | 70ms | <200ms | PASS |
| **SI** | **5.5s** | <3.4s | FAIL |
| CLS | 0 | <0.1 | PASS |

## Desktop (Chrome DevTools Trace)

| Metric | Value | Status |
| --- | --- | --- |
| LCP | 136ms | Excellent |
| CLS | 0.00 | Excellent |
| TTFB | 10ms | Excellent |

Desktop has zero issues. All problems are mobile-only.

---

## LCP Breakdown (8.8s — Critical)

| Phase | Duration | % | Root Cause |
| --- | --- | --- | --- |
| TTFB | 0ms | 0% | — |
| Resource load delay | 350ms | 4% | — |
| Resource load duration | 470ms | 5% | Slow 4G download |
| **Element render delay** | **1,670ms** | **19%** | JS hydration blocks poster paint |

**LCP Element:** `<video poster="/modern-photography-studio.webp">`

**LCP Discovery checks:**
- `fetchpriority=high`: **FAILED** (not applied)
- Lazy load: PASSED (not lazy)
- Discoverable in HTML: PASSED

**Why render delay is 1,670ms:** Hero is a `"use client"` component. The entire hero (video + 18 grid images + headings + CTAs) must hydrate before the poster image paints. On Slow 4G with Moto G Power (4x CPU throttle), this takes 1.67 seconds.

---

## All Issues (by PageSpeed category)

### OPPORTUNITIES (with est. savings)

#### 1. Render-blocking CSS — 150ms savings
- `0_-b6ffu3v2a0.css` — 17.2 KiB, 340ms load
- Single CSS file blocks FCP

#### 2. Improve image delivery — 159 KiB savings
All HeroGrid18 images served at **400x400** but displayed at **135x135** on mobile:
- `austyn-portland-headshots.webp` — 26.5 KiB → 23.5 KiB savings (displayed 135x135)
- `angela-headshot-photo.webp` — 23.5 KiB → 21.7 KiB savings
- `woman-white-top-headshot-portraits.webp` — 12.4 KiB → 11.0 KiB savings
- + 8 more HeroGrid18 images with same issue
- Before/after images: 600x600 displayed at 372x372
- Google logo: 253x253 displayed at 36x36
- `megan-headshot.webp`: 605x755 displayed at 493x465

**Root cause:** `images: { unoptimized: true }` in next.config.mjs. Next.js cannot generate responsive srcset.

#### 3. Legacy JavaScript — 14 KiB savings
Polyfills for modern APIs in `0a3pg.k92a8rq.js`:
- Array.prototype.at, flat, flatMap
- Object.fromEntries, hasOwn
- String.prototype.trimStart, trimEnd

These are unnecessary for modern browsers.

#### 4. Preconnect to Google Maps — 300ms savings
```html
<link rel="preconnect" href="https://maps.googleapis.com" />
```

#### 5. Cache efficiency — 17 KiB savings
- Google Maps static image: 1 day cache (39 KiB) — third-party, can't control
- Google Maps API JS: 30 min cache — third-party, can't control

### DIAGNOSTICS

#### 6. Reduce unused JavaScript — 260 KiB savings
| Source | Transfer | Wasted |
| --- | --- | --- |
| Google Maps (6 files) | 346 KiB | 187 KiB |
| Google Tag Manager | 128 KiB | 50 KiB |
| 1st party `0a3pg.k92a8rq.js` | 70 KiB | 23 KiB |
| **Total** | | **260 KiB** |

#### 7. Minimize main-thread work — 2.7s total
| Category | Time |
| --- | --- |
| Other | 1,584ms |
| Script Evaluation | 565ms |
| Script Parsing & Compilation | 217ms |
| Style & Layout | 156ms |
| Garbage Collection | 101ms |
| Rendering | 41ms |
| Parse HTML & CSS | 29ms |

#### 8. Images without explicit width/height (CLS risk)
Company logos using `style="max-height: 40px"` instead of `width`/`height` attributes:
- `/images/intel-logo-new.png`
- `/images/amazon-logo-new.png`
- `/images/wework-logo-new.svg`
- `/images/nike-logo-new.svg`
- `/images/remax-logo-new.svg`

Also 9 images with **empty `src=""`** and no dimensions (from latest-work or gallery section loading lazily).

#### 9. Reduce unused CSS — 13 KiB savings
- `0_-b6ffu3v2a0.css`: 16.3 KiB total, 13.1 KiB unused

#### 10. Enormous network payloads — 262 MB total
**11 videos from Vercel Blob Storage autoplay/download on page load:**
- 3x `ericabts-*.mp4` — ~11 MB each
- 3x `EricaBTS*.mp4` — ~10 MB each
- 3x `ScottBTS*.mp4` — ~10 MB each
- `headshothero-*.mp4` — ~17 MB
- `posing-*.mp4`, `FreeQuote-*.mp4`, `Images-*.mp4` — ~5-9 MB each

Total video payload: **~250 MB**

#### 11. Long main-thread tasks — 7 found
| Source | Start | Duration |
| --- | --- | --- |
| `0a3pg.k92a8rq.js` (1st party) | 7,076ms | 193ms |
| `headshotportland.com` | 1,072ms | 82ms |
| `0a3pg.k92a8rq.js` (1st party) | 6,751ms | 57ms |
| GTM | 7,158ms | 54ms |
| GTM | 7,223ms | 122ms |
| Unattributable | 1,723ms | 65ms |
| Google Maps `main.js` | 4,222ms | 57ms |

#### 12. React hydration error #418
Console error: `Minified React error #418` — server/client HTML mismatch. This is a hydration error where the server-rendered HTML doesn't match what React renders on the client. Likely caused by:
- Browser-specific API usage in render (window check)
- Date/time rendering differences
- Or the `<video>` element rendering differently server vs client

### SECURITY (Best Practices)

#### 13. No CSP header (High severity)
No Content-Security-Policy found in enforcement mode.

#### 14. No COOP header (High severity)
No Cross-Origin-Opener-Policy header.

#### 15. HSTS missing directives (Medium)
Missing `includeSubDomains` and `preload` on HSTS header.

### ACCESSIBILITY

#### 16. Color contrast insufficient
Low-contrast text found — specific elements not detailed in PDF.

#### 17. Video captions missing
`<video>` elements don't have `<track kind="captions">`.

### SEO

#### 18. Non-descriptive "SEE MORE" links — 6 links
| Link Destination | Text |
| --- | --- |
| `/galleries/scott-schoettgen` | SEE MORE |
| `/gallery/ampf-company-headshots-camas` | SEE MORE |
| `/gallery/cameron-hansen-law---headshot` | SEE MORE |
| (same 3 links repeated for mobile/desktop) | SEE MORE |

---

## Action Plan (Prioritized by Score Impact)

### Phase A: Fix LCP 8.8s → target <3s (Performance 65 → 80+)

#### A1. Split hero into server component + tiny client video player
**Impact:** Eliminates 1,670ms render delay
**Files:** `components/hero.tsx` → split into `components/hero.tsx` (RSC) + `components/hero-video-player.tsx` (client)

The hero only needs `"use client"` for one `useEffect` (video `.play()`). Move 99% of the hero to a server component so it renders instantly without waiting for JS hydration.

#### A2. Add `fetchpriority="high"` to video poster + preload
**Impact:** Fixes failed LCP discovery check
**Files:** `components/hero-video-player.tsx`, `app/layout.tsx`

```tsx
// hero-video-player.tsx
<video fetchPriority="high" poster="/modern-photography-studio.webp" ...>

// layout.tsx — add to <head>
<link rel="preload" href="/modern-photography-studio.webp" as="image" fetchPriority="high" />
```

#### A3. Add preconnect for Google Maps
**Impact:** 300ms savings on Maps load
**File:** `app/layout.tsx`

```tsx
<link rel="preconnect" href="https://maps.googleapis.com" />
<link rel="preconnect" href="https://maps.gstatic.com" crossOrigin="anonymous" />
```

#### A4. Lazy-load Google Maps embed
**Impact:** Removes 409 KiB + 209ms main thread from initial load
**File:** `components/visit-us-section.tsx`

Load the Google Maps iframe only when it scrolls into view using `loading="lazy"` on the iframe, or wrap it in an IntersectionObserver.

#### A5. Lazy-load behind-the-scenes videos
**Impact:** Removes ~250 MB from initial page load
**File:** `components/behind-the-scenes-section.tsx`

Videos should only load when scrolled into view. Add `preload="none"` and use IntersectionObserver to switch to `preload="metadata"` when visible.

### Phase B: Fix images (Performance + image delivery)

#### B1. Test `unoptimized: false` in next.config.mjs
**Impact:** Enables responsive srcset (400x400 → 135x135 on mobile = huge savings), fetchpriority, sizes
**File:** `next.config.mjs`

```js
images: {
  // unoptimized: true,  // Remove this
}
```

If this breaks, fallback: manually resize hero grid images to 200x200 (from 400x400).

#### B2. Add width/height to company logos
**Impact:** Fixes CLS diagnostic
**File:** `components/who-we-work-with-section.tsx` (or wherever logos are)

```tsx
<img alt="Intel logo" width={40} height={40} loading="lazy" src="/images/intel-logo-new.png" />
```

#### B3. Fix empty-src images
**Impact:** Fixes "images without dimensions" diagnostic
Find and fix images with `src=""` — likely in gallery/latest-work section where images load dynamically.

### Phase C: Fix JS bloat

#### C1. GTM → `lazyOnload`
**Impact:** Defers 128 KiB + 122ms main thread to after page load
**File:** `app/layout.tsx`

```tsx
<Script src="https://www.googletagmanager.com/gtag/js?id=AW-847156852" strategy="lazyOnload" />
```

#### C2. Fix React hydration error #418
**Impact:** Fixes console error, improves Best Practices score
**Root cause:** Server/client HTML mismatch. Need to investigate — likely `<video>` element or browser-specific rendering.

#### C3. Remove duplicate font preload
**File:** `app/layout.tsx`
Remove manual `<link rel="preload" href="/fonts/LTCBodoni175Pro-Regular.woff2">` — Next.js localFont() already handles it.

### Phase D: Security headers (Best Practices)

#### D1. Add CSP header
**File:** `next.config.mjs` headers

#### D2. Add COOP header
```js
{ key: "Cross-Origin-Opener-Policy", value: "same-origin" }
```

#### D3. Strengthen HSTS
```js
{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }
```

### Phase E: Accessibility + SEO

#### E1. Fix color contrast
Audit text colors — likely `text-gray-500` or `text-[#247ba0]` on dark backgrounds.

#### E2. Add video captions track
```tsx
<video>
  <track kind="captions" src="/captions/hero.vtt" srclang="en" label="English" />
</video>
```

#### E3. Fix "SEE MORE" links
Add descriptive aria-labels:
```tsx
<Link href="..." aria-label="See more photos from Scott Schoettgen's session">SEE MORE</Link>
```

---

## Implementation Priority

| # | Task | Est. Score Impact | Time |
| --- | --- | --- | --- |
| **A1** | **Split hero RSC + client video** | **+10-15 perf** | 20 min |
| **A2** | **fetchpriority + preload poster** | **+3-5 perf** | 5 min |
| **A5** | **Lazy-load BTS videos (250MB)** | **+5-10 perf** | 15 min |
| **A4** | **Lazy-load Google Maps** | **+3-5 perf** | 10 min |
| A3 | Preconnect Google Maps | +1-2 perf | 2 min |
| B1 | Test unoptimized: false | +3-5 perf | 10 min |
| C1 | GTM lazyOnload | +1-2 perf | 2 min |
| B2 | Logo width/height | +1 perf | 5 min |
| C2 | Fix React #418 error | +5 best practices | 15 min |
| D1-D3 | Security headers | +5 best practices | 5 min |
| E1 | Color contrast | +4 accessibility | 15 min |
| E3 | SEE MORE aria-labels | +5 SEO | 5 min |
| C3 | Remove dup font preload | minor | 2 min |

**Target after all phases: Performance 85+, Accessibility 100, Best Practices 95+, SEO 100**
