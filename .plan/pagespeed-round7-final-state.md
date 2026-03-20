---
type: performance report
people: []
tags:
  - pagespeed
  - performance
  - optimization
  - web vitals
status: completed
created_date: '2026-03-20'
description: Final PageSpeed optimization report for headshotportland.com after 7 rounds of improvements. Achieved 95 (desktop) and 97 (mobile) scores. Mobile performance improved from 65→97; LCP reduced from 8.8s→2.4s. All audit categories 95+. Remaining gaps due to third-party scripts (Goog
---
# PageSpeed Final State — Round 7

**Date:** 2026-03-20
**Site:** https://www.headshotportland.com

---

## Final Scores

| | Desktop | Mobile |
| --- | --- | --- |
| **Performance** | **95** | **97** |
| **Accessibility** | **100** | **100** |
| **Best Practices** | **100** | **100** |
| **SEO** | **100** | **100** |

## Journey (Mobile Performance)

| Round | Score | LCP | Key Fix |
| --- | --- | --- | --- |
| Round 1 | 65 | 8.8s | Baseline — no SSR, videos autoplay |
| Round 2 | 87 | 3.3s | Suspense fix (SSR restored), hero RSC split |
| Round 3 | 87 | 3.3s | Contrast, SEO, video lazy-load |
| Round 4 | 74 | 12.8s | Killed autoplay (regression — video frame as LCP) |
| Round 5 | 79 | 5.5s | Progressive video, poster as LCP |
| Round 6 | 81 | 5.0s | Poster compressed, hydration fix |
| Round 7 | **97** | **2.4s** | Scroll-only video on mobile |

## What's Preventing 100

### Desktop: Performance 95

| Metric | Value | Target | Gap |
| --- | --- | --- | --- |
| FCP | 0.3s | <1.8s | ✅ |
| LCP | 1.3s | <2.5s | ✅ |
| **TBT** | **110ms** | <200ms | ✅ but high |
| SI | 0.9s | <3.4s | ✅ |
| CLS | 0 | <0.1 | ✅ |

All metrics pass green thresholds. Score is 95 due to:
1. **LCP render delay: 720ms** — React hydration on desktop (video loads at 2s)
2. **TBT: 110ms** — 6 long tasks from Maps (167ms), GTM (132ms), 1st party (127ms)
3. **Scores vary ±3 points between runs** due to network conditions

### Mobile: Performance 97

| Metric | Value | Target | Gap |
| --- | --- | --- | --- |
| FCP | 0.9s | <1.8s | ✅ |
| LCP | 2.4s | <2.5s | ✅ (barely) |
| TBT | 20ms | <200ms | ✅ |
| SI | 2.7s | <3.4s | ✅ |
| CLS | 0 | <0.1 | ✅ |

All metrics green. Score is 97 due to:
1. **LCP 2.4s** — barely under 2.5s threshold. Load duration 560ms (poster on Slow 4G)
2. **Image delivery** — 11 KiB savings (2 images 216→135)

## Remaining Issues (All Unscored/Third-Party)

These don't affect scores but are flagged:

| Issue | Type | Can Fix? |
| --- | --- | --- |
| Legacy JS polyfills 14 KiB | Turbopack framework | No — Turbopack ignores browserslist |
| Unused JS 284 KiB (Maps 185K, GTM 50K) | Third-party | No — can't control Maps/GTM |
| Unused CSS 12 KiB | Framework CSS | Low value — Next.js Tailwind output |
| Network 5.7 MB (hero video 4.5MB) | Expected | Only loads on desktop after 2s |
| Video captions | Accessibility (unscored) | Optional — decorative video |
| No CSP header | Trust (unscored) | Could add but complex with inline scripts |
| Image delivery 11 KiB | Minor | Would need removing `unoptimized: true` |

## What Would Get Us to 100

### Desktop → 100
Would need TBT <50ms, which requires:
- Removing Google Maps entirely (saves 167ms task) — **not acceptable**
- Removing GTM/Google Ads (saves 132ms task) — **not acceptable**
- Or server-rendering the Maps section statically — complex

### Mobile → 100
Already at 97. To hit 100:
- LCP needs to drop from 2.4s to ~1.5s — requires faster CDN or inlined poster
- Or just run PageSpeed a few more times — scores vary ±3 points

## Conclusion

We've reached the practical ceiling. The remaining 3-5 points are:
- Third-party scripts (Google Maps, GTM) — can't remove, business-critical
- React/Next.js framework overhead — can't eliminate
- Network variability — Slow 4G tests vary

**From 65 → 97 on mobile is a +32 point improvement.** All four categories are 95+ with three at 100.
