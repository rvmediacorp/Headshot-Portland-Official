# Encyclopedia

A glossary of terms used in this codebase.

## Business terms

### CTA (Call to Action)
A button or link prompting the user to take a conversion action. The two primary CTAs are **"Get Free Quote"** and **"Book Now"**. "Get Free Quote" links to the quote form; "Book Now" links directly to `ww3.headshotportland.com`.

### Conversion
A completed quote form submission. Tracked via Google Ads on the `/thank-you` page. The goal of most design decisions.

### Session
In the business context (not code): a photography session — a booking slot at the studio. "Unlimited sessions" in the UI means unlimited retake opportunities during one booking.

### Nathan
Nathan Reimche-Vu, founder and photographer. Referenced in `ProudlyOwnedSection`. Profile image at `public/images/profile photos/`.

## UI / layout terms

### Hero
The first visible section on the home page. Contains a looping background video, a grid of 18 headshot images, headline text, and the primary CTAs.

### Masonry grid
A layout where items fill columns top-to-bottom rather than row-by-row, producing a Pinterest-style appearance. Used in `UnlimitedSessions` and the headshots gallery. Implemented in `exact-masonry-grid.tsx`.

### Before/After
Section showing raw vs. retouched headshots side-by-side. Demonstrates the studio's retouching quality.

### wwwwgrid
The folder name (`public/images/wwwwgrid/`) containing the 24 client headshots and 8 company logos used in `WhoWeWorkWithSection`. The name stands for "Who We Work With" grid.

## Technical terms

### CDN
Two CDNs are in use:
- **Vercel Blob** (`hebbkx1anhila5yf.public.blob.vercel-storage.com`) — images
- **BunnyCDN** (`rvideo.b-cdn.net`) — videos

### Unoptimized images
`next.config.mjs` sets `images: { unoptimized: true }`. This disables Next.js automatic image optimization so that external CDN URLs pass through unchanged.

### Design tokens
Custom Tailwind values defined in `tailwind.config.ts`:
- `teal-blue`: `#2A8CAA` — primary brand accent
- `dark-bg`: `#000000` — section backgrounds
- `bodoni`, `libreBodoni`, `bodoniModa`, `playfair` — font family names

### Intersection Observer
Used in several section components to trigger CSS animations when a section scrolls into the viewport. Pattern: `useEffect` + `IntersectionObserver` + a state flag that adds an animation class.

### Fallback image
When a video or image fails to load, `ImageWithFallback` or an `onError` handler swaps in a static placeholder. Most video elements include a `poster` attribute as a fallback.

## Practical shortcuts

- "section component" = one of the 13 files in `components/` named after a home page section
- "gallery page" = `app/headshots/page.tsx`
- "quote flow" = form → `/thank-you` → Google Ads conversion
- "mobile" = viewport < 768px (`md` breakpoint)
