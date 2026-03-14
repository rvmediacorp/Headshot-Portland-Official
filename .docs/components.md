# Components

## Layout

| Component | File | Notes |
|---|---|---|
| Navbar | `components/navbar.tsx` | Desktop links + mobile hamburger. Logo via `<LogoImage />`. |
| Footer | `components/footer.tsx` | Desktop/mobile variants. Contact, social links, hours. |
| ThemeProvider | `components/theme-provider.tsx` | Wraps `next-themes`. Provides dark/light mode context. |

## Home page sections

| Component | File | Notes |
|---|---|---|
| Hero | `components/hero.tsx` | Video background + 18-image grid. Primary "Get Free Quote" + "Book Now" CTAs. |
| QuotesSection | `components/quotes-section.tsx` | Two Q&A blocks, marquee text animation, single CTA. |
| CreativeProcess | `components/creative-process.tsx` | 4-step grid. Each step has a video with fallback image. |
| BeforeAfterSection | `components/before-after-section.tsx` | Before/after pairs with testimonial overlays. |
| UnlimitedSessions | `components/unlimited-sessions.tsx` | Masonry photo grid + Google 4.8-star rating badge. |
| SimpleAndFunExperience | `components/simple-and-fun-experience.tsx` | Dark-bg 4-feature grid. |
| ProudlyOwnedSection | `components/proudly-owned-section.tsx` | Nathan bio + Amazon/Nike/Intel/WeWork/RE-MAX logos. |
| ClientTestimonialsSection | `components/client-testimonials-section.tsx` | 6 static testimonial cards. |
| BehindTheScenesSection | `components/behind-the-scenes-section.tsx` | 6 video testimonials. Toggle muted state on click. |
| WhoWeWorkWithSection | `components/who-we-work-with-section.tsx` | 24 client headshots (from `wwwwgrid/`) + 8 logos. |
| LatestWorkSection | `components/latest-work-section.tsx` | 3 portfolio projects linking to external gallery URLs. |
| VisitUsSection | `components/visit-us-section.tsx` | Address, hours, parking info, Google Maps `<iframe>`. |

## Utility components

| Component | File | Notes |
|---|---|---|
| GoogleAnalytics | `components/google-analytics.tsx` | Fires `page_view` events. Used in root layout. |
| ExactMasonryGrid | `components/exact-masonry-grid.tsx` | Desktop masonry layout for headshots gallery. |
| ExactMasonryGridMobile | `components/exact-masonry-grid-mobile.tsx` | Mobile variant of masonry grid. |
| MasonryGrid | `components/masonry-grid.tsx` | Alternative masonry implementation. |
| ImageWithFallback | `components/image-with-fallback.tsx` | Wraps `next/image`, swaps to fallback src on error. |
| LogoImage | `components/logo-image.tsx` | Renders the studio logo (`/public/images/logo.png`). |

## shadcn/ui

All files under `components/ui/` are shadcn-generated from Radix UI primitives. Do not edit them manually — re-generate via `pnpm dlx shadcn@latest add <component>`.
