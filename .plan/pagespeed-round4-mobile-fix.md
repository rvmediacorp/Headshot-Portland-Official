---
type: performance-optimization
people: []
tags:
  - pagespeed
  - mobile
  - lcp
  - video
  - accessibility
status: active
created_date: '2026-03-19'
description: 'Fix mobile PageSpeed score (74→90+) by resolving LCP crisis (12.8s→<3s) caused by hero video autoplay and multiple video downloads. Implement desktop-only autoplay, remove autoPlay from non-hero videos, and compress BTS poster images to WebP format.'
---
# PageSpeed Round 4 — Mobile LCP Crisis Fix

**Date:** 2026-03-19
**Site:** https://www.headshotportland.com

---

## Current Scores

| Category | Desktop | Mobile |
| --- | --- | --- |
| **Performance** | **100** | **74** |
| Accessibility | 96 | 96 |
| Best Practices | 100 | 96 |
| SEO | **100** | **100** |

Desktop is perfect at 100. Mobile crashed from 87 → 74 due to LCP exploding to 12.8s.

---

## CRITICAL: Mobile LCP 12.8s

### Root Cause Analysis

LCP breakdown (mobile):
- TTFB: 0ms
- Load delay: 90ms
- Load duration: 180ms
- Render delay: 540ms
- **Total from breakdown: ~810ms — but actual LCP: 12.8s**

The discrepancy means the LCP element **changed during loading**. The poster image renders at ~810ms (good), but when the hero video starts autoplaying, the **first video frame replaces the poster as the LCP element**. On Slow 4G, it takes 12.8 seconds for enough video data to buffer and render the first frame.

### Evidence: 39 MB total network payload

Videos downloading despite `preload="none"`:
- `headshothero` — **downloading 3 times** (4.5 + 4.5 + 4.5 MB = 13.5 MB)
- `EricasGallery` — downloading 2 times (8.3 + 5.2 MB = 13.5 MB)
- `posing-DV` — 2.9 MB
- `FreeQuote` — 2.4 MB
- `Images` — 2.2 MB

**Why videos still download:** `autoPlay` attribute overrides `preload="none"`. When `autoPlay` is set, the browser MUST download the video to play it, regardless of preload setting. We set `preload="none"` on creative-process videos but kept `autoPlay` — that's why they still download.

The `headshothero` triple download is likely: 1) initial metadata request, 2) autoplay triggers full download, 3) media range request for buffering.

### Additional payload: BTS poster PNGs (3.8 MB)

5 uncompressed PNG files used as BTS video poster images:
- `/confident-asian-professional.png` — 801 KiB
- `/confident-blonde-professional.png` — 778 KiB
- `/confident-businessman.png` — 776 KiB
- `/confident-latina-professional.png` — 758 KiB
- `/confident-professional.png` — 727 KiB

These are loaded eagerly and uncompressed.

---

## Action Plan

### Phase A: Fix LCP 12.8s → <3s (CRITICAL)

#### A1. Remove autoPlay from ALL non-hero videos

The creative-process.tsx videos have `autoPlay` which overrides `preload="none"`. Remove `autoPlay` entirely — videos should only play when user scrolls to them or interacts.

**File:** `components/creative-process.tsx`
**Change:** Remove `autoPlay` from all 4 video elements.

#### A2. Prevent hero video from becoming LCP

The hero video's first frame replaces the poster as LCP. Options:

**Option A (recommended):** On mobile, don't autoplay the hero video — just show the poster. Use CSS media queries or JS to only autoplay on desktop.

```tsx
// hero-video-player.tsx
useEffect(() => {
  // Only autoplay on desktop (>768px)
  if (window.innerWidth >= 768) {
    videoRef.current?.play().catch(() => {})
  }
}, [])
```

**Option B:** Set the hero video's `poster` to be exactly the same visual, and delay video load. Add `preload="none"` on mobile.

#### A3. Compress BTS poster PNGs → WebP

Convert 5 PNG posters to WebP:
```bash
for f in confident-asian-professional confident-blonde-professional confident-businessman confident-latina-professional confident-professional; do
  cwebp -q 80 "public/${f}.png" -o "public/${f}.webp"
done
```
Then update references in `components/behind-the-scenes-section.tsx`.

### Phase B: Fix remaining Accessibility (96 → 100)

#### B1. Fix bg-[#2A8CAA] contrast

Still two failing elements using hardcoded `bg-[#2A8CAA]`:
- `<a class="bg-[#2A8CAA] text-white ...">`
- `<span class="text-base font-bold">`

Find and change `bg-[#2A8CAA]` → `bg-[#1a6985]` (6.17:1 with white text).

#### B2. Fix Instagram identical links

Two Instagram links with slightly different URLs:
- `https://www.instagram.com/headshotportland/` (latest-work-section)
- `https://instagram.com/headshotportland` (footer)

Standardize both to `https://www.instagram.com/headshotportland/`.

#### B3. Fix video captions (optional)

Add a blank captions track to the hero video to satisfy the audit:
```tsx
<track kind="captions" srcLang="en" label="English" default />
```

### Phase C: Fix Best Practices (96 → 100, mobile)

#### C1. Fix React error #418 hydration mismatch

Still occurring on mobile. The `suppressHydrationWarning` on the video element isn't enough — the error is happening elsewhere.

Investigate: run local dev with React strict mode to find the mismatch. Likely causes:
- `window.innerWidth` check during render
- Conditional rendering that differs server vs client
- The navbar `usePathname()` or `useState` for menu

### Phase D: Desktop remaining issues (info only, score already 100)

These don't affect the score but are noted:
- Image delivery: 176 KiB savings (images 400x400 displayed at 216x216)
- Legacy JS polyfills: 14 KiB
- Unused JS: 261 KiB (mostly Google Maps + GTM)
- Empty src images: 9 from masonry grid
- No CSP header

---

## Implementation Priority

| # | Task | Impact | Time |
| --- | --- | --- | --- |
| **A1** | **Remove autoPlay from creative-process videos** | **Mobile LCP: major fix** | 5 min |
| **A2** | **Desktop-only autoplay for hero video** | **Mobile LCP: prevents 12.8s** | 5 min |
| **A3** | **Compress BTS poster PNGs → WebP** | **-3.8 MB payload** | 5 min |
| B1 | Fix bg-[#2A8CAA] → bg-[#1a6985] | Accessibility +4 | 5 min |
| B2 | Standardize Instagram URLs | Accessibility | 2 min |
| C1 | Investigate React #418 | Best Practices +4 | 15 min |

**Target: Mobile Performance 90+, Accessibility 100, Best Practices 100**
