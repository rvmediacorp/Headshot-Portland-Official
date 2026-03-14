# Architecture

Headshot Portland is a **Next.js 16 App Router** site. All pages are React Server Components by default; client interactivity is scoped to individual components with `"use client"`.

```
Browser
  └── app/layout.tsx          (fonts, GTM script, metadata)
        ├── app/page.tsx       (home — 14 sections in order)
        ├── app/headshots/     (gallery page)
        └── app/thank-you/     (conversion confirmation)
```

## Home page section order

`app/page.tsx` renders sections in this fixed sequence:

1. `<Navbar />`
2. `<Hero />` — video background, 18-image grid, primary CTA
3. `<QuotesSection />` — Q&A, marquee animation
4. `<CreativeProcess />` — 4-step workflow with videos
5. `<BeforeAfterSection />` — before/after cards
6. `<UnlimitedSessions />` — masonry grid + Google rating
7. *(High-End Retouching)* — inline in page
8. `<SimpleAndFunExperience />` — 4 feature boxes
9. `<ProudlyOwnedSection />` — Nathan bio + client logos
10. `<ClientTestimonialsSection />` — 6 testimonial cards
11. `<BehindTheScenesSection />` — video testimonials
12. `<WhoWeWorkWithSection />` — 24 headshots + 8 logos
13. `<LatestWorkSection />` — 3 portfolio projects
14. `<VisitUsSection />` — address, hours, Google Maps embed
15. `<Footer />`

## Responsiveness pattern

Every component handles its own responsive layout. The breakpoint is `md` (768px):

- Below `md`: stacked single-column layouts, hamburger nav
- At `md` and above: multi-column grids, full nav

Use `useIsMobile()` hook for JS-driven conditional rendering. Prefer Tailwind responsive prefixes (`md:`) for CSS-only differences.

## Data flow

There is no backend. All data is static — hardcoded in component files. No API routes, no database, no server actions.

- Images: served from `/public/images/` or Vercel Blob CDN
- Videos: served from BunnyCDN (`rvideo.b-cdn.net`) or Vercel Blob
- Booking: external redirect to `ww3.headshotportland.com`
- Quote form: redirects to `/thank-you` after submission

## Analytics injection

`app/layout.tsx` injects `gtag.js` (Google Tag Manager). The `<GoogleAnalytics />` component fires page view events. `app/thank-you/page.tsx` fires the conversion event directly via `window.gtag`.
