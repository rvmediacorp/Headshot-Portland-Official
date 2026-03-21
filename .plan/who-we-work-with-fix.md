---
type: bug-fix
people: []
tags:
  - rendering
  - chromium
  - images
  - performance
  - css
status: completed
created_date: '2026-03-20'
description: 'Fix rendering issues in who-we-work-with section: prevent images from appearing one-by-one, eliminate black void, and optimize image decoding strategy in components/who-we-work-with-section.tsx.'
---
# Fix: Who We Work With Section — Rendering Issues

**Date:** 2026-03-16
**File:** `components/who-we-work-with-section.tsx`
**Status:** Done

---

## Problem Summary

The "Who We Work With" section shows a large black void and images appear one-by-one when scrolled into view in Chromium-based browsers. Three separate issues compound each other.

---

## Root Causes

### 1. `decoding="async"` on all 24 `<img>` tags
**What it does:** Tells the browser to decode images off the main thread at its own pace, without blocking rendering.
**Effect:** Each of the 24 images decodes independently on its own timeline. They appear one by one as each decode job finishes — the grid never "snaps in" as a whole.
**Files affected:** Both desktop grid and mobile grid inside `who-we-work-with-section.tsx`.

### 2. Chromium tile-based deferred rasterization
**What it does:** Chromium divides the entire page into GPU tiles (~256×256px). Tiles far outside the viewport are NOT rasterized until the user scrolls within ~1–2 viewport heights of them.
**Effect:** `loading="eager"` only controls network fetching — images are downloaded but not painted. Since this section is the 9th section on the page (far below the fold), its tiles are blank until scroll. As Chromium rasterizes tiles top-to-bottom when the section enters view, it produces the "wipe down" effect.
**Note:** This is a browser-level behaviour, not something the component controls directly. The mitigation is to pre-paint via CSS rather than relying on the browser rasterizer.

### 3. No background color on the image grid container
**What it does:** The `<section>` and grid `<div>` have no background color set.
**Effect:** When tiles are deferred (Problem 2), the black `<body>` background bleeds through the unpainted area. This is the large black void visible in the screenshot — it is not an empty section, it is the section's bounding box showing the body background.

### 4. `will-change: transform` added to outer wrapper (counterproductive)
**What it does:** Promotes the element to its own GPU compositing layer immediately.
**Effect:** Allocating a large compositor layer for an off-screen section with 24 images can make the "pop-in" sharper in some Chromium versions rather than smoother. Should be removed.

---

## Fix Plan

### Step 1 — Remove `will-change: transform` from the outer wrapper
The `style={{ willChange: "transform" }}` added to the outer `<div>` is counterproductive and should be reverted.

### Step 2 — Change `decoding="async"` → `decoding="sync"` on all grid images
`decoding="sync"` forces the browser to decode all images synchronously before the next paint. All 24 images will be ready together, so the grid snaps in as one unit instead of one-by-one.
Apply to both the desktop grid (24 items) and the mobile grid (8 items).

### Step 3 — Add `fetchpriority="high"` to grid images
Signals to the browser that these images are high priority for both network fetch and decode scheduling. Chromium respects this in the resource loading pipeline.

### Step 4 — Add a background color to the image grid container
Add `bg-gray-900` (or a dark neutral) to the desktop and mobile grid wrapper `<div>`. This ensures that while tiles are being rasterized, the user sees a dark placeholder rather than the body's pure black background bleeding through. The transition from placeholder to loaded image will be invisible since the colours are nearly identical.

### Step 5 — Add `min-height` to the grid containers
Without an explicit height, the browser may not reserve space for the section during initial layout, which can cause the tile rasterization to be deferred longer. Adding `min-height` (e.g., the known height of two rows of square images at 1/12th of viewport width each) ensures the layout engine reserves the correct paint area early.

---

## Files to Change

| File | Changes |
|---|---|
| `components/who-we-work-with-section.tsx` | Remove `will-change`, change `decoding`, add `fetchpriority`, add `bg-gray-900` to grid divs, add `min-height` |

No other files need to change. The `overflow-hidden` move from the last fix (outer `<section>` → inner layout divs) is correct and stays.

---

## What This Does NOT Fix

Chromium's tile rasterization deferral is a browser-level behaviour and cannot be fully overridden from application code. The above steps reduce the visual impact (no more black void, no more one-by-one) but the very first scroll-into-view may still have a ~1 frame delay on very slow machines. That is acceptable and normal for any section this far down a long page.

---

## Testing Checklist

- [ ] Chrome: scroll to section — images appear as one complete grid, no one-by-one
- [ ] Chrome: scroll away and back — no wipe/reveal animation
- [ ] Chrome: section not in view — no black void visible above/below
- [ ] Safari: no regression
- [ ] Mobile (375px): mobile grid behaves the same way
- [ ] `bun run build` passes with no errors
