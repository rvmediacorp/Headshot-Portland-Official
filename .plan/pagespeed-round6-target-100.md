---
type: performance optimization project
people: []
tags:
  - performance
  - mobile
  - optimization
  - web-vitals
  - accessibility
status: active
created_date: '2026-03-20'
description: 'Achieve 100 PageSpeed scores on both mobile and desktop. Current mobile scores: Performance 91, Accessibility 100, Best Practices 96, SEO 100. Main blockers: LCP 3.2s (target <2.5s) and console errors. Priority actions: compress poster from 32KB→10KB and fix console errors.'
---
# PageSpeed Round 6 — Target 100 on Both

**Date:** 2026-03-20

---

## Current Scores (Mobile — Mar 20, fresh report)

| Category | Score | Target | Gap |
| --- | --- | --- | --- |
| **Performance** | **91** | 100 | -9 |
| Accessibility | **100** | 100 | 0 |
| Best Practices | **96** | 100 | -4 |
| SEO | **100** | 100 | 0 |

## Current Scores (Desktop — Mar 19, OLD report pre-image-resize)

| Category | Score | Target | Gap |
| --- | --- | --- | --- |
| Performance | 97 | 100 | -3 |
| Accessibility | **100** | 100 | 0 |
| Best Practices | **100** | 100 | 0 |
| SEO | **100** | 100 | 0 |

Desktop needs a fresh run — the report is from before image resize deployed.

---

## Progress Journey

| Metric | Round 1 | Round 6 | Change |
| --- | --- | --- | --- |
| Mobile Perf | 65 | **91** | **+26** |
| Mobile LCP | 8.8s | **3.2s** | **-5.6s** |
| Mobile FCP | 3.3s | **0.9s** | **-2.4s** |
| Accessibility | 96 | **100** | **+4** |
| SEO | 91 | **100** | **+9** |

---

## What's Preventing Mobile 100

### Performance 91 → 100

**Mobile metrics (Slow 4G, Moto G Power):**
- FCP: 0.9s — PASS
- LCP: **3.2s** — FAIL (target <2.5s) — **this is the main blocker**
- TBT: 140ms — PASS
- SI: **3.5s** — BARELY FAIL (target <3.4s)
- CLS: 0 — PASS

**LCP 3.2s breakdown:**
- TTFB: 0ms
- Load delay: 380ms — time before poster request starts
- Load duration: 520ms — poster download on Slow 4G (32KB)
- Render delay: 610ms — JS hydration blocks paint

**To get LCP <2.5s we need to cut ~700ms total. Three levers:**

#### 1. Reduce poster image size (520ms → ~200ms)
The poster is 32KB. On Slow 4G (~1.6Mbps), that takes 520ms. If we reduce it to ~10KB, download drops to ~160ms.

**Action:** Compress poster more aggressively or reduce dimensions.
```bash
# Current: 1024x684 at 32KB
# Target: 800x534 at ~10KB
ffmpeg -i public/modern-photography-studio.webp -vf scale=800:-1 /tmp/poster.png
cwebp -q 60 /tmp/poster.png -o public/modern-photography-studio.webp
```

#### 2. Reduce load delay (380ms → ~100ms)
The poster request starts 380ms after navigation. This is because:
- HTML downloads (22KB, ~110ms on Slow 4G)
- CSS downloads (17KB render-blocking, ~100ms)
- Then poster request starts

**Action:** Inline the poster as a base64 data URL in the HTML, or use `<link rel="preload">` (already done). The preload should trigger download in parallel with CSS. Check if it's actually working.

#### 3. Reduce render delay (610ms → ~200ms)
JS hydration blocks the poster paint. Even though the poster is in server HTML, the browser waits for React to hydrate before painting.

**Action:** This is hard to reduce without removing React from the critical path. Options:
- Ensure the poster `<img>` is outside any client component boundary (already done in hero.tsx server component)
- Remove any `"use client"` imports that pull React into the critical path
- Check if `<SpeedInsights />` or `<Analytics />` in layout.tsx cause extra JS

#### 4. Reduce Speed Index (3.5s → <3.4s)
SI is close to passing. Reducing LCP will likely bring SI under 3.4s too.

### Best Practices 96 → 100

#### 1. Browser console errors
Still logging errors. Likely React hydration mismatch (#418) or other JS errors.

**Action:** Investigate what's causing the console error. The `suppressHydrationWarning` on the video should prevent #418. May be a different component.

#### 2. No CSP header
PageSpeed flags "No CSP found in enforcement mode" and "No Trusted Types directive" as High severity, but these are **Unscored** — they don't affect the Best Practices score.

**The actual score deduction is from "Browser errors were logged to the console."** Fix the console error to get 100.

---

## Action Plan

### A1. Compress poster image further (HIGH IMPACT)
**Target:** 32KB → ~10KB
**File:** `public/modern-photography-studio.webp`
**Method:** Reduce to 800px wide, lower quality to q60. This is a background image with dark overlay — lower quality is acceptable.

### A2. Check poster preload is working
**File:** `app/layout.tsx`
Verify the `<link rel="preload" href="/modern-photography-studio.webp">` is actually in the HTML head and the browser uses it. Check for duplicate downloads.

### A3. Fix console errors (BEST PRACTICES)
**Action:** Run `bun dev` and check browser console for errors. Fix whatever is causing the error — likely:
- Hydration mismatch from a component using `window` during render
- Or a missing resource (404)

### A4. Reduce 1st party JS bundle
**Files:** Check what's in `0w~rhw9fm91_n.js` (118.6 KiB, 47.1 KiB unused) and `015p9x3v1s~ki.js` (71.1 KiB, 23.1 KiB unused). These are likely containing unused Radix UI components loaded via shadcn/ui.

### A5. Legacy JS polyfills still present
The `.browserslistrc` we added may not have taken effect — Turbopack might not read it. Need to check if Next.js 16.2 Turbopack respects browserslist.

---

## Priority

| # | Task | Impact on Score | Time |
| --- | --- | --- | --- |
| **A1** | Compress poster 32KB → 10KB | LCP -320ms | 2 min |
| **A3** | Fix console errors | Best Practices +4 | 15 min |
| A2 | Verify preload working | LCP -100ms | 5 min |
| A5 | Check browserslist with Turbopack | 14 KiB JS savings | 10 min |
| A4 | Audit JS bundles | TBT, SI improvement | 20 min |

---

---

## Additional Issues Found (Deep Review)

### 6. TBT regressed: 60ms → 140ms
Our LazyVideo component + dynamic imports added more JS chunks. The longest 1st-party task is now **208ms** at 4,201ms from `0w~rhw9fm91_n.js`. Three 1st-party bundles have significant waste:
- `0w~rhw9fm91_n.js`: 118.6 KiB (47.1 KiB unused)
- `10z85aemjrn8l.js`: 47.5 KiB (24.0 KiB unused)
- `015p9x3v1s~ki.js`: 71.1 KiB (23.1 KiB unused)
Total 1st party waste: **94 KiB** (was 23 KiB before our changes)

**Cause:** Dynamic imports create more chunks, but those chunks still contain unused exports. Also the LazyVideo component adds IntersectionObserver + state management per video instance.

**Action:** Consider reducing LazyVideo instances — instead of one per video (potentially 16+ instances), use a single observer manager.

### 7. Legacy JS polyfills: .browserslistrc NOT working
The 14 KiB of polyfills (Array.at, Object.hasOwn, etc.) are still present. **Turbopack ignores .browserslistrc** — it uses its own browser target configuration.

**Action:** Check if Next.js 16.2 has a `browserslistForSwc` or equivalent config in next.config.mjs. If not, these polyfills come from the React/Next.js runtime and can't be removed.

### 8. HeroGrid18 images: 216x216 → 135x135 on mobile
Two images still flagged: angela (9.8→6.8 KiB savings) and austyn (7.6→4.6 KiB savings). Total: 11 KiB. These are displayed at 135x135 on mobile but served at 216x216.

**Action:** Could resize to 135x135, but that would make them pixelated on desktop (216x216). Can't serve different sizes without `unoptimized: false`. Low priority — only 11 KiB savings.

### 9. Google Fonts CSS requests (desktop only)
Desktop report shows 2 requests to fonts.googleapis.com (5 KiB). These are likely from the Google Maps embed, NOT from our font loading (we use next/font which inlines).

**Not fixable** — comes from Maps iframe.

### 10. Google Maps still loading 409 KiB JS (279ms main thread)
Maps is the biggest 3rd-party contributor. The iframe has `loading="lazy"` but Lighthouse still captures its JS because it loads before the trace ends.

**Action:** Could defer Maps iframe loading even more (only load on user interaction/click), but this changes UX. Low priority since Maps is below the fold.

### 11. Video captions audit (Accessibility — unscored)
Hero video missing `<track kind="captions">`. Currently doesn't affect score (Accessibility is 100) but good practice.

---

## Updated Priority

| # | Task | Impact on Score | Time | Status |
| --- | --- | --- | --- | --- |
| **A1** | **Compress poster 32KB → 10KB** | **Perf +3-5** (LCP) | 2 min | NEW |
| **A3** | **Fix console errors** | **Best Practices +4** | 15 min | NEW |
| A8 | Resize HeroGrid18 to 135px | Perf +1 (11 KiB) | 5 min | OPTIONAL |
| A5 | Check Turbopack browserslist | 14 KiB polyfills | 10 min | INVESTIGATE |
| A6 | Reduce LazyVideo instances | TBT improvement | 20 min | OPTIONAL |
| A10 | Defer Maps further | TBT improvement | 15 min | OPTIONAL |

**A1 + A3 are the only two that matter for scores. Everything else is optimization polish.**

## Notes

- Desktop will likely show 98-100 on a fresh run — the old report was pre-image-resize
- Mobile Accessibility 100 and SEO 100 — locked in
- The LCP target of <2.5s on Slow 4G with Moto G Power is aggressive — poster + CSS download + React hydration makes sub-2.5s very hard
- TBT regression from 60→140ms is concerning but still passing (<200ms threshold)
- If we get poster to 10KB and fix console error: expect Performance ~95-97 and Best Practices 100
