---
type: performance-optimization-task
people: []
tags:
  - performance
  - mobile
  - lcp
  - web-optimization
  - video
status: active
created_date: '2026-03-19'
description: 'Optimize mobile PageSpeed metrics, reducing LCP from 5.5s to <2.5s by deferring video downloads until poster image loads, removing unused preconnects, fixing React hydration errors, and implementing delayed video loading on Slow 4G'
---
# PageSpeed Round 5 — Mobile LCP 5.5s → <2.5s

**Date:** 2026-03-19

## Scores After Round 4

| | Desktop | Mobile |
| --- | --- | --- |
| Performance | 97 | 79 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 96 |
| SEO | 100 | 100 |

## Mobile LCP: 5.5s

LCP element is now the poster `<img>` (correct). On Slow 4G:
- Poster loads at ~1.1s (good)
- But the 2-second video timer kicks in and starts downloading 4.5MB hero video
- This competes with ANY remaining resource downloads and delays rendering

## Fixes

### 1. Video loads only AFTER poster paints (not on timer)
Replace 2s setTimeout with poster img `onLoad` callback. Video only starts loading once the poster has fully painted — zero bandwidth competition.

### 2. Remove unused preconnects
Maps preconnects flagged as "unused" on mobile — Maps iframe is lazy-loaded via dynamic import, so preconnects waste bandwidth during critical path.

### 3. Fix React #418 hydration error
The `<img>` poster element renders on server but is conditionally hidden (`{!isReady && ...}`) on client after hydration. Server renders `<img>`, client removes it when video is ready — this is fine. The error is likely from the video `preload` attribute changing from "none" (server) to "auto" (client useEffect).

Fix: render the video with consistent attributes between server and client.

### 4. Increase video load delay on mobile
On mobile (Slow 4G), even after poster loads, the video shouldn't start immediately — it should wait until user has scrolled or 5+ seconds have passed.
