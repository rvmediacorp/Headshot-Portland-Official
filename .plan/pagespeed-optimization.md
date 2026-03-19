---
type: project
people: []
tags:
  - pagespeed
  - performance
  - optimization
  - next.js
  - core-web-vitals
status: active
created_date: '2026-03-19'
description: 'Performance optimization plan for headshotportland.com targeting mobile PageSpeed improvement from ~40-50 to 80+ and desktop to 90+. Four-phase implementation plan addressing critical issues: hero image prioritization (18→3), image optimization, bundle reduction (unused dependenc'
---
# pagespeed-optimization

**Site:** [https://www.headshotportland.com](https://www.headshotportland.com)
**Project:** hsp-clean → v0-headshot-portland-figma (Vercel)
**Created:** 2026-03-19
**Goal:** Improve mobile performance score from \~40-50 to 80+ and desktop to 90+

---

## Current Issues (by severity)

### CRITICAL — Direct PageSpeed Score Impact

| # | Issue | File(s) | Impact |
| --- | --- | --- | --- |
| 1 | 18 hero grid images ALL marked `priority={true}` | `components/hero.tsx:109-292` | Forces browser to download all 18 simultaneously — destroys LCP |
| 2 | Image optimization disabled (`unoptimized: true`) | `next.config.mjs:7` | No responsive sizing, no auto-compression, no srcset generation |
| 3 | 69 components use `"use client"` unnecessarily | All components/ | Massive hydration JS — entire app is client-rendered |
| 4 | Hero video `preload="auto"` | `components/hero.tsx:40` | Forces full video download on page load, competes with LCP |
| 5 | No dynamic imports / code splitting | All pages | Every component loads upfront on every route |

### HIGH — Measurable Performance Drag

| # | Issue | File(s) | Impact |
| --- | --- | --- | --- |
| 6 | No `sizes` attribute on images | Most image components | Browser downloads full-res images even on mobile |
| 7 | 26 unused Radix UI packages in dependencies | `package.json:13-39` | Bundle bloat — recharts, embla-carousel, react-resizable-panels also unused |
| 8 | Poster image is PNG not WebP | `components/hero.tsx:41` `/modern-photography-studio.png` | Unoptimized fallback for hero video |
| 9 | No cache-control headers | `next.config.mjs` | Images/assets not cache-optimized |
| 10 | Duplicate Playfair Display font declaration | `components/hero.tsx:10-13` vs `app/fonts.ts` | Redundant CSS, extra font request |

### MEDIUM — CLS and Polish

| # | Issue | File(s) | Impact |
| --- | --- | --- | --- |
| 11 | Hero grid images can reflow (no skeleton/placeholder) | `components/hero.tsx` | CLS when images load at different rates |
| 12 | Before/After section mixed aspect ratios | `components/before-after-section.tsx:34-103` | Layout shift between mobile/desktop |
| 13 | Behind-the-scenes videos no explicit height | `components/behind-the-scenes-section.tsx:111-120` | CLS when video plays |
| 14 | Heading negative margin (`-5px`) with web font | `components/hero.tsx:312` | CLS when Bodoni Moda loads |
| 15 | 20+ images over 100KB | `public/images/` (grad-07, model-30, etc.) | Slow gallery page loads |

---

## Optimization Plan (Ordered by Impact)

### Phase 0: Upgrade to Next.js 16.2 (Est. +5-10 points — free gains)

**Released:** March 18, 2026 (yesterday)
**Current version:** 16.1.6 (hsp-clean) / 16.1.6 (hsp-official)

Next.js 16.2 ships significant performance improvements that directly benefit this site:

#### 0.1 Upgrade Next.js to 16.2

```bash
bun add next@16.2.0 react@latest react-dom@latest
```

**Performance gains we get for free:**

| Feature | Improvement | Impact on HSP |
| --- | --- | --- |
| **Faster RSC rendering** | 25-60% faster server render (React `JSON.parse` reviver fix) | Faster TTFB and FCP on all pages — static pages regenerate faster |
| **Turbopack tree shaking of dynamic imports** | Unused exports removed from `import()` | Directly benefits Phase 2.2 dynamic imports — smaller chunks |
| **200+ Turbopack bug fixes** | Build stability, memory, hashing | More reliable builds, potentially smaller output |
| **`prefetchInlining` (experimental)** | Bundles all route segments into single prefetch request | Reduces prefetch waterfall when navigating between pages |

#### 0.2 Enable `prefetchInlining` (experimental)

**File:** `next.config.mjs`
**Change:** Reduces prefetch requests from N (one per segment) to 1 per link:

```javascript
const nextConfig = {
  experimental: {
    prefetchInlining: true,
  },
  // ...existing config
}
```

**Why:** This site has shallow route trees (no nested layouts beyond root), so the duplication trade-off is minimal and the single-request prefetch is a net win for navigation speed.

#### 0.3 Consider `experimental.useLightningcss`

**File:** `next.config.mjs`
**Change:** Replace PostCSS CSS minification with Rust-based Lightning CSS:

```javascript
const nextConfig = {
  experimental: {
    useLightningcss: true,
  },
  // ...existing config
}
```

**Why:** Faster CSS processing and potentially smaller CSS output. Lightning CSS handles autoprefixing natively, which could allow removing the `autoprefixer` dependency.
**Risk:** May change CSS output slightly — test all pages visually before deploying. Tailwind v3 uses PostCSS heavily, so verify compatibility.

#### 0.4 Upgrade command and verification

```bash
# In hsp-clean directory
cd /Volumes/untitledcompanies/creative/sam/web-projects/hsp-clean

# Upgrade
bun add next@16.2.0

# Verify build passes
bun run build

# Test locally
bun dev
# Check: homepage, about, headshots, contact at 375px and 1440px

# Deploy preview
vercel deploy . -y --no-wait --scope rvmediacorps-projects
```

---

### Phase 1: Quick Wins (Est. +15-25 points mobile)

These are config/attribute changes — no component restructuring needed.

#### 1.1 Fix hero image priorities

**File:** `components/hero.tsx`
**Change:** Remove `priority={true}` from all but the first 3 images (row 1, cols 1-3 — always visible on mobile). The rest get default lazy loading.

```tsx--solarized
// First 3: keep priority
<Image src="..." priority />

// Remaining 15: remove priority (lazy load by default)
<Image src="..." />
```

#### 1.2 Change hero video preload

**File:** `components/hero.tsx:40`
**Change:** `preload="auto"` → `preload="metadata"`

```tsx
<video preload="metadata" autoPlay muted loop playsInline poster="...">
```

#### 1.3 Convert poster image to WebP

**Action:** Compress `/public/modern-photography-studio.png` → `.webp`

```bash
cwebp -q 80 public/modern-photography-studio.png -o public/modern-photography-studio.webp
```

Update reference in `components/hero.tsx:41`.

#### 1.4 Add `sizes` attribute to hero grid images

**File:** `components/hero.tsx`
**Change:** Add responsive sizes to each `<Image>`:

```tsx
<Image
  src="..."
  width={200}
  height={200}
  sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 16vw"
/>
```

#### 1.5 Remove duplicate Playfair Display import

**File:** `components/hero.tsx:6,10-13`
**Change:** Remove `import { Playfair_Display } from "next/font/google"` and the font instantiation. Use the global font class from `app/fonts.ts` instead.

#### 1.6 Add cache-control headers

**File:** `next.config.mjs`
**Change:** Add immutable cache headers for static assets:

```javascript
async headers() {
  return [
    {
      source: '/images/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
    {
      source: '/_next/static/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
    // ...existing security headers
  ]
}
```

---

### Phase 2: Bundle Optimization (Est. +10-15 points mobile)

#### 2.1 Remove unused dependencies

**File:** `package.json`
**Remove:** Audit and remove unused packages:

- `recharts` — not used on any page
- `embla-carousel-react` — not used
- `react-resizable-panels` — not used
- Unused Radix UI packages (audit each: `@radix-ui/react-accordion`, `@radix-ui/react-alert-dialog`, etc.)

```bash
# Audit each package
grep -r "from.*@radix-ui/react-accordion" components/ app/ --include="*.tsx" --include="*.ts"
# If no results → safe to remove
```

#### 2.2 Add dynamic imports for below-fold sections

**File:** `app/page.tsx` (homepage)
**Change:** Dynamically import heavy sections that are below the fold:

```tsx
import dynamic from "next/dynamic"

// Keep static: Navbar, Hero (above fold)
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"

// Lazy load everything below fold
const QuotesSection = dynamic(() => import("@/components/quotes-section"))
const CreativeProcess = dynamic(() => import("@/components/creative-process"))
const BeforeAfterSection = dynamic(() => import("@/components/before-after-section"))
const UnlimitedSessions = dynamic(() => import("@/components/unlimited-sessions"))
const HighEndRetouchingSection = dynamic(() => import("@/components/before-after-slider-comp"))
const SimpleAndFunExperience = dynamic(() => import("@/components/simple-and-fun-experience"))
const ProudlyOwnedSection = dynamic(() => import("@/components/proudly-owned-section"))
const ClientTestimonialsSection = dynamic(() => import("@/components/client-testimonials-section"))
const BehindTheScenesSection = dynamic(() => import("@/components/behind-the-scenes-section"))
const WhoWeWorkWithSection = dynamic(() => import("@/components/who-we-work-with-section"))
const LatestWorkSection = dynamic(() => import("@/components/latest-work-section"))
const VisitUsSection = dynamic(() => import("@/components/visit-us-section"))
const Footer = dynamic(() => import("@/components/footer"))
```

Apply same pattern to all page routes (`/about`, `/headshots`, `/contact`, etc.).

#### 2.3 Convert static components to Server Components

**Priority candidates** (components with zero interactivity):

- `components/quotes-section.tsx` — static text
- `components/visit-us-section.tsx` — static content
- `components/footer.tsx` — static links
- `components/who-we-work-with-section.tsx` — static grid
- `components/latest-work-section.tsx` — static images
- `components/google-analytics.tsx` — must stay client (uses window)

**Change:** Remove `"use client"` directive from components that don't use hooks, event handlers, or browser APIs.

---

### Phase 3: Image Optimization (Est. +5-10 points mobile)

#### 3.1 Re-enable Next.js image optimization (if possible)

**File:** `next.config.mjs`
**Investigation:** Test if `unoptimized: false` works with current WebP images hosted in `/public/`. Since images are local (not Blob CDN URLs), optimization should work.

```javascript
images: {
  unoptimized: false, // Let Next.js optimize
  formats: ['image/webp'],
}
```

**Risk:** May break if any images reference Vercel Blob CDN URLs directly. Test thoroughly.
**Fallback:** If can't re-enable, add `sizes` attributes everywhere (Phase 1.4).

#### 3.2 Compress large gallery images

**Target:** All images >120KB in `public/images/`

```bash
# Find and recompress
for f in $(find public/images -name "*.webp" -size +120k); do
  ffmpeg -i "$f" -vf scale=800:-1 /tmp/tmp.png && cwebp -q 78 /tmp/tmp.png -o "$f"
done
```

**Files:** grad-07 (195K), grad-10 (191K), headshot-portland-cheryl (169K), model-69/30/17 (140-148K), \~15 more

#### 3.3 Add placeholder/blur for hero grid

**File:** `components/hero.tsx`
**Change:** Add `placeholder="blur"` with base64 blur data URL for the 3 priority images, preventing CLS:

```tsx
<Image
  src="/images/HeroGrid18/angela-headshot-photo.webp"
  priority
  placeholder="blur"
  blurDataURL="data:image/webp;base64,..."
/>
```

---

### Phase 4: CLS Fixes (Est. +5 points)

#### 4.1 Set explicit heights on hero grid container

**File:** `components/hero.tsx`
**Change:** Add min-height to grid container to reserve space:

```tsx
<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-1 md:gap-2 min-h-[300px] sm:min-h-[400px] md:min-h-[250px]">
```

#### 4.2 Fix heading negative margin

**File:** `components/hero.tsx:312`
**Change:** Remove `marginBottom: "-5px"` and use proper spacing.

#### 4.3 Add explicit dimensions to video containers

**File:** `components/behind-the-scenes-section.tsx`
**Change:** Add `aspect-video` class to video wrapper divs.

---

## Implementation Order

| Step | Phase | Task | Est. Time |
| --- | --- | --- | --- |
| 1 | **0.1** | **Upgrade Next.js 16.1.6 → 16.2** | 10 min |
| 2 | 0.2 | Enable `prefetchInlining` experimental flag | 2 min |
| 3 | 0.3 | Test `useLightningcss` experimental flag | 10 min |
| 4 | 1.1 | Fix hero image priorities (18→3) | 10 min |
| 5 | 1.2 | Video preload auto→metadata | 2 min |
| 6 | 1.3 | Poster PNG→WebP | 5 min |
| 7 | 1.4 | Add sizes to hero images | 10 min |
| 8 | 1.5 | Remove duplicate Playfair import | 5 min |
| 9 | 1.6 | Cache-control headers | 5 min |
| 10 | 2.1 | Remove unused deps | 15 min |
| 11 | 2.2 | Dynamic imports on all pages (tree shaking improved in 16.2) | 20 min |
| 12 | 2.3 | Convert \~10 components to RSC (faster rendering in 16.2) | 30 min |
| 13 | 3.2 | Compress large images | 10 min |
| 14 | 3.3 | Blur placeholders for hero | 15 min |
| 15 | 4.1-4.3 | CLS fixes | 15 min |
| 16 | 3.1 | Test re-enabling image optimization | 20 min |

---

## Metrics to Track

After each phase, run PageSpeed Insights and record:

- **Performance score** (mobile / desktop)
- **LCP** (target: <2.5s)
- **TBT** (target: <200ms)
- **CLS** (target: <0.1)
- **FCP** (target: <1.8s)
- **SI** (target: <3.4s)

---

## Notes

- **Next.js 16.2 released March 18, 2026** — upgrade is the first step. The 25-60% faster RSC rendering and Turbopack tree shaking of dynamic imports directly amplify Phases 2.2 and 2.3.
- `next.config.mjs` has `unoptimized: true` — CLAUDE.md says "required for Vercel Blob CDN compatibility" but most images are now local WebP files, not Blob CDN URLs. Worth testing if this can be re-enabled.
- Do NOT touch conversion tracking (Google Ads `AW-847156852`) or CTA button functionality during optimization.
- Test mobile (375px) after every change — majority of traffic is mobile.
- All work targets `hsp-clean` — the live site connected to `v0-headshot-portland-figma` on Vercel.