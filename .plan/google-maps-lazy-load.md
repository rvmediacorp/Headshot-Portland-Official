---
type: task
people: []
tags:
  - performance
  - google-maps
  - optimization
  - lazy-loading
status: active
created_date: '2026-03-20'
description: Replace Google Maps iframe with static image and click-to-load functionality to eliminate 409 KiB JS and 180ms main thread latency from initial page load
---
# Google Maps — Static Image → Click to Load

**Date:** 2026-03-20
**Target:** Remove 409 KiB JS + 180ms main thread from initial page load

---

## Current State

The VisitUs section at the bottom of the homepage loads a full Google Maps iframe:
- **File:** `components/visit-us-section.tsx` (lines 142-154)
- **iframe src:** `https://www.google.com/maps/embed?pb=...`
- **Cost:** 409 KiB JS (12+ scripts), 180ms main thread, 339ms on desktop
- **Already has:** `loading="lazy"` — but browser still loads it before user scrolls there

## Plan

### Step 1: Generate static map image

Use Google Maps Static API to get a screenshot of the map location:
```
https://maps.googleapis.com/maps/api/staticmap?center=45.5192,-122.6821&zoom=16&size=800x400&markers=color:red|45.5192,-122.6821&key=AIzaSyCmL18misQw9KdwqGaw3zHkitj8vG6QF2Y
```

Save as `/public/images/map-static.webp` (compress to ~20KB).

Alternatively: take a screenshot of the current map and save as WebP.

### Step 2: Replace iframe with static image + button

```tsx
// Before (current):
<iframe src="https://www.google.com/maps/embed?..." loading="lazy" />

// After:
<div className="relative cursor-pointer group" onClick={loadMap}>
  <img
    src="/images/map-static.webp"
    alt="Map showing Headshot Portland at 750 SW 9th Ave, Portland, OR 97205"
    className="w-full h-full object-cover rounded-md"
    loading="lazy"
  />
  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors rounded-md">
    <button className="bg-white text-black font-bold py-3 px-6 rounded-full shadow-lg">
      View Interactive Map
    </button>
  </div>
</div>
```

### Step 3: Load iframe on click

When user clicks, replace the static image with the full iframe:

```tsx
const [showMap, setShowMap] = useState(false)

{showMap ? (
  <iframe src="https://www.google.com/maps/embed?..." width="100%" height="100%" />
) : (
  <div onClick={() => setShowMap(true)}>
    <img src="/images/map-static.webp" ... />
    <button>View Interactive Map</button>
  </div>
)}
```

### Step 4: Keep visit-us-section as server component if possible

The click handler needs `useState` → requires `"use client"`. But visit-us-section was already removed from client. Options:
- Make a small `InteractiveMap` client component (just the map area)
- Keep the rest of the section as server component

## Expected Impact

| Metric | Before | After |
| --- | --- | --- |
| Maps JS loaded | 409 KiB (always) | 0 KiB (until click) |
| Main thread time | 180ms (mobile), 339ms (desktop) | 0ms |
| Desktop TBT | ~110ms | ~60ms (Maps was biggest contributor) |
| Desktop Performance | 95 | 97-99 |
| Static image size | N/A | ~20 KiB (one-time) |

## Files to Change

1. `components/visit-us-section.tsx` — replace iframe with static image + InteractiveMap
2. `components/interactive-map.tsx` — new tiny client component for click-to-load
3. `public/images/map-static.webp` — static map screenshot

## Risk

- Low — map still works, just requires one click to become interactive
- Users who need directions can still click the address link (goes to Google Maps directly)
- The "Click here to get directions" link already exists and works without the iframe
