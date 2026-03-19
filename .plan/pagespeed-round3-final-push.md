---
type: performance-optimization
people: []
tags:
  - pagespeed
  - performance
  - optimization
  - accessibility
  - seo
status: active
created_date: '2026-03-19'
description: 'PageSpeed optimization round 3 for headshotportland.com targeting 90+ scores. Critical issues: Desktop TBT 330ms (Google Maps), Mobile LCP 3.3s (video hydration), oversized images (176 KiB), unused JS (261 KiB). Includes accessibility contrast fixes, SEO link descriptions, and Re'
---
# pagespeed-round3-final-push

**Date:** 2026-03-19
**Site:** [https://www.headshotportland.com](https://www.headshotportland.com)
**Source:** Google PageSpeed Insights reports (desktop + mobile), post-deployment

---

## Progress Since Round 1

| Metric | Round 1 (Mobile) | Round 3 (Mobile) | Change |
| --- | --- | --- | --- |
| **Performance** | 65 | **87** | **+22** |
| **FCP** | 3.3s | **0.9s** | **-2.4s** |
| **LCP** | 8.8s | **3.3s** | **-5.5s** |
| **TBT** | 70ms | 210ms | +140ms |
| **SI** | 5.5s | **4.0s** | **-1.5s** |
| CLS | 0 | 0 | — |
| Accessibility | 96 | 96 | — |
| Best Practices | 91 | **96** | +5 |
| SEO | 91 | 91 | — |

| Metric | Desktop |
| --- | --- |
| **Performance** | **85** |
| FCP | 0.3s |
| LCP | 0.8s |
| **TBT** | **330ms** (problem) |
| SI | 0.9s |
| CLS | 0 |
| Accessibility | 96 |
| Best Practices | **100** |
| SEO | 91 |

---

## Remaining Issues (Both Reports)

### CRITICAL — Performance Score Blockers

#### 1. Desktop TBT: 330ms (target <200ms)

Main-thread work breakdown (desktop):

| Category | Time |
| --- | --- |
| Script Evaluation | 818ms |
| Other | 751ms |
| Style & Layout | 366ms |
| Script Parsing & Compilation | 317ms |
| Rendering | 133ms |
| GC | 119ms |

**8 long tasks found (desktop):**

- Google Maps `main.js` — 303ms at 1,174ms
- `headshotportland.com` — 284ms at 487ms
- Google Maps `places.js` — 151ms at 1,783ms
- `0a3pg.k92a8rq.js` — 130ms at 930ms
- Google Maps `init_embed.js` — 101ms at 1,023ms
- GTM — 96ms, 76ms

**Root cause:** Google Maps loads 373 KiB of JS (main thread 419ms) eagerly because the VisitUs section iframe loads immediately.

#### 2. Mobile LCP: 3.3s (target <2.5s)

LCP breakdown (mobile):

| Phase | Duration |
| --- | --- |
| TTFB | 0ms |
| Load delay | 440ms |
| Load duration | 560ms |
| **Render delay** | **740ms** |

Still 740ms render delay. The hero RSC split helped (was 1,670ms) but hydration of the video player + other client components still contributes.

#### 3. Images oversized — 176 KiB savings (desktop), 159 KiB (mobile)

All 18 HeroGrid18 images served at **400x400** but displayed at:

- **135x135** on mobile (3x oversized)
- **216x216** on desktop (1.85x oversized)

**Root cause:** `images: { unoptimized: true }` in next.config.mjs prevents srcset generation.

#### 4. Videos still downloading — 35 MB (mobile), 25 MB (desktop)

Despite `preload="none"` on BTS videos, the page still transfers:

- `EricasGallery` — 8.2 MB + 5.2 MB (duplicate requests)
- `headshothero` — 4.5 MB + 4.5 MB (duplicate)
- `posing` — 2.9 MB
- `FreeQuote` — 2.4 MB
- `Images` — 2.2 MB

The `headshothero` video is the hero background — it MUST load. But the gallery/posing/FreeQuote videos are from other sections and should not load until scrolled into view. The BTS videos seem to have stopped (not in the list), but other videos still loading.

#### 5. Unused JavaScript — 261 KiB savings

| Source | Transfer | Wasted |
| --- | --- | --- |
| Google Maps (6 files) | 346 KiB | 184-187 KiB |
| GTM | 128 KiB | 51 KiB |
| 1st party `0a3pg.k92a8rq.js` | 70 KiB | 23-27 KiB |

#### 6. Render-blocking CSS — 160ms (mobile), 0ms (desktop)

`0_-b6ffu3v2a0.css` — 17.2 KiB, blocks first paint on mobile (170ms load).

### HIGH — Accessibility & SEO

#### 7. Color contrast failures (Accessibility 96)

Failing elements on BOTH mobile and desktop:

- `GET FREE QUOTE` `<span>` — white on teal insufficient ratio
- `GET FREE QUOTE` CTA button — cta-primary class
- `GET A FREE QUOTE` — bg-teal-blue text-white
- `GET A FREE QUOTE` `<span class="text-base font-bold">`
- `GET A FREE QUOTE` — bg-[#2A8CAA] text-white
- `"Included with every purchased digital image."` — text-[#4A8EAA] on white
- `HIGH-END RETOUCHING` section container
- `COMPANIES NATHAN HAS WORKED WITH` link
- `Proudly owned & operated...` section
- `JULY 2024` / `AUGUST 2024` / `JANUARY 2025` date labels — text-[#247BA0] on bg-[#1C1B1C]
- All `SEE MORE` spans
- All "Latest Work" cards
- `Instagram` link
- `OUR LATEST WORK` section container

#### 8. `role="img"` invalid on `<video>` (Accessibility)

```html
<video ... role="img">
```

`role="img"` is not a valid ARIA role for `<video>` elements. Remove it.

#### 9. Identical Instagram links with different destinations

- Link 1: `href="https://www.instagram.com/nathanreimchevu/"` (in latest-work-section)
- Link 2: `href="https://instagram.com/headshotportland"` (in footer)
Both say "Instagram" but go to different URLs. Fix: make destinations match or differentiate the link text.

#### 10. SEE MORE links still non-descriptive — 6 links

Our `aria-label` fix didn't resolve this. PageSpeed checks the **visible text**, not aria-label. The `<span>SEE MORE</span>` is still the link text seen by crawlers.

**Fix:** Change visible text to include the project name, or use visually-hidden text.

#### 11. React error #418 — hydration mismatch (Best Practices)

Still occurring. Console error: `Minified React error #418` (server/client HTML mismatch). Likely caused by the `<video>` element rendering differently server vs client, or the `autoPlay` attribute serialization.

#### 12. Images without width/height — 14 elements

5 company logos (Intel, Amazon, WeWork, Nike, RE/MAX) use `style="max-height:40px"` instead of `width`/`height` attributes.

9 images with **empty** **`src=""`** and no dimensions — from a gallery/masonry grid component.

#### 13. Unused CSS — 13 KiB

`0_-b6ffu3v2a0.css`: 16.3 KiB total, 13.1 KiB unused.

#### 14. No CSP header (both reports)

No Content-Security-Policy found in enforcement mode. Severity: High.

---

## Action Plan

### Phase A: Performance 87→90+ (mobile), 85→90+ (desktop)

#### A1. Lazy-load Google Maps iframe

**Impact:** Removes 373 KiB JS + 419ms main thread (desktop's biggest TBT contributor)
**File:** `components/visit-us-section.tsx`

The Google Maps embed loads eagerly. Wrap it with `loading="lazy"` on the iframe, or better: render a static map image placeholder and only load the full embed on interaction.

```tsx
// Option 1: lazy iframe
<iframe loading="lazy" src="https://www.google.com/maps/embed?..." />

// Option 2: static image → interactive on click (best for performance)
```

#### A2. Lazy-load remaining non-hero videos

**Impact:** Saves \~10-15 MB on mobile
**Files:** Check `components/simple-and-fun-experience.tsx`, `components/creative-process.tsx`, or wherever `gallery.jpeg`, `posing-DV`, `FreeQuote`, `Images` videos are used.

Add `preload="none"` to ALL video elements except the hero. Videos should only start loading when scrolled into view.

#### A3. Test `unoptimized: false` — responsive images

**Impact:** 159-176 KiB image savings, proper srcset
**File:** `next.config.mjs`

```javascript
images: {
  // Remove unoptimized: true
},
```

This enables Vercel Image Optimization which auto-generates responsive srcset. Images will be served at the correct display size instead of always 400x400.

**Risk:** May break images loaded from Vercel Blob CDN URLs (external domains). If needed, add `remotePatterns`:

```javascript
images: {
  remotePatterns: [
    { hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com' },
  ],
},
```

#### A4. Fix React error #418 — hydration mismatch

**Impact:** Fixes console error, improves Best Practices
**File:** `components/hero-video-player.tsx`

Remove `role="img"` from video (it's invalid ARIA). Also check if `autoPlay` attribute causes server/client mismatch — the server renders `autoplay=""` but the client may render `autoPlay`. Suppress hydration warning on the video element:

```tsx
<video
  ref={videoRef}
  suppressHydrationWarning
  className="absolute inset-0 w-full h-full object-cover"
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
  poster={poster}
  fetchPriority="high"
  aria-label="Background video showing headshot photography studio sessions"
>
```

### Phase B: Accessibility 96→100

#### B1. Fix color contrast — all failing elements

The main offenders are teal-on-dark and teal-on-white combinations:

| Color | Issue | Fix |
| --- | --- | --- |
| `text-brand-teal` on white bg (navbar active) | Low contrast | Darken teal to #1a6985 or similar |
| `#247BA0` on `#1C1B1C` (date labels) | Low contrast | Lighten to #3a9dc4 or use white |
| `#4A8EAA` on white (retouching subtext) | Low contrast | Darken to #2a7090 |
| `#2A8CAA` bg with white text | Low contrast | Darken bg to #1a6985 |
| CTA buttons (cta-primary) | White on teal | Check globals.css for cta-primary color, ensure 4.5:1 ratio |

#### B2. Fix identical Instagram links

**File:** `components/latest-work-section.tsx` + `components/footer.tsx`

Make both point to the same URL, or differentiate:

```tsx
// In latest-work-section.tsx
<Link href="https://www.instagram.com/headshotportland">
  Follow us on Instagram
</Link>

// In footer.tsx — already points to headshotportland
```

#### B3. Remove `role="img"` from video

**File:** `components/hero-video-player.tsx`
Remove `role="img"` — it's not a valid ARIA role for `<video>`.

### Phase C: SEO 91→100

#### C1. Fix "SEE MORE" visible text

**File:** `components/latest-work-section.tsx`

The `aria-label` we added isn't enough — PageSpeed checks visible text. Options:

```tsx
// Option 1: Include project name in visible text
<Link href="...">
  <span className="mr-2">SEE MORE: {project.title}</span>
  <ArrowRight size={16} />
</Link>

// Option 2: Add visually-hidden text
<Link href="...">
  <span className="mr-2">SEE MORE</span>
  <span className="sr-only"> photos from {project.title}</span>
  <ArrowRight size={16} />
</Link>
```

Option 2 is cleaner — keeps visual design, adds screenreader text.

### Phase D: Remaining cleanup

#### D1. Add width/height to company logos

**File:** Component that renders Intel/Amazon/Nike/WeWork/RE/MAX logos with `style="max-height:40px"`

These are NOT in `who-we-work-with-section.tsx` (which uses LogoImage). Find the component that uses raw `<img>` with `style="max-height:40px"`.

#### D2. Fix empty-src images

Find the component rendering `<img src="" alt="Professional headshot of..." loading="lazy">` — 9 images with empty src. Likely a gallery component where image URLs aren't loaded yet.

#### D3. Inline critical CSS (optional)

The 17.2 KiB CSS blocks first paint on mobile (170ms). Could inline above-fold critical CSS and defer the rest. Low priority since FCP is already 0.9s.

---

## Implementation Priority

| # | Task | Score Impact | Time |
| --- | --- | --- | --- |
| **A1** | **Lazy-load Google Maps** | Desktop TBT 330→<200ms, Perf +5 | 15 min |
| **A2** | **Lazy-load remaining videos** | Perf +2-3 | 10 min |
| **A3** | **Test unoptimized: false** | Perf +3-5 (image delivery) | 10 min |
| **A4** | Fix hydration #418 + remove role="img" | Best Practices +2 | 5 min |
| **B1** | Fix color contrast (all elements) | Accessibility +4 | 20 min |
| **B2** | Fix Instagram link mismatch | Accessibility +1 | 2 min |
| **C1** | Fix SEE MORE with sr-only text | SEO +9 | 5 min |
| **D1** | Add width/height to logos | Minor CLS fix | 5 min |
| **D2** | Fix empty-src images | Minor | 10 min |

**Target: Performance 90+ (both), Accessibility 100, Best Practices 100, SEO 100**