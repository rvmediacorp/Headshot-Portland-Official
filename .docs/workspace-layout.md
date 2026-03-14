# Workspace layout

```
app/                      Next.js App Router pages and layouts
  layout.tsx              Root layout — fonts, GTM/Google Ads script injection
  page.tsx                Home page — imports and sequences all section components
  fonts.ts                Font definitions (Inter, Bodoni Moda, Playfair, LTC Bodoni 175 Pro)
  globals.css             Tailwind directives + CSS variable palette (light/dark)
  headshots/
    page.tsx              Gallery page — 63 manually-listed images, masonry layout
  thank-you/
    page.tsx              Conversion confirmation — fires Google Ads conversion event

components/               All UI components
  navbar.tsx              Top navigation with hamburger menu
  hero.tsx                Hero section — video background + 18-image headshot grid
  footer.tsx              Footer — contact info, social links, desktop/mobile variants
  google-analytics.tsx    Page view and conversion event tracking
  exact-masonry-grid.tsx  Custom masonry layout used in headshots gallery
  image-with-fallback.tsx next/image wrapper with onerror fallback
  [section].tsx           One file per home page section (see components.md)
  ui/                     shadcn/ui component library (do not edit directly)

hooks/
  use-responsive-scale.ts Returns a 0.6–1.0 scale factor based on viewport width
  use-mobile.tsx          Returns true when viewport < 768px
  use-toast.ts            Toast notification hook (shadcn)

lib/
  utils.ts                cn() — combines clsx + tailwind-merge

public/
  fonts/                  LTCBodoni175Pro-Regular.woff2 (local font)
  images/
    HeroGrid18/           18 hero section headshots
    headshots-gallery/    63 portfolio gallery images
    wwwwgrid/             24 client headshots + 8 company logos
    logos/                Brand logo variants
    profile photos/       Nathan's profile image

styles/
  globals.css             Redundant copy — primary is app/globals.css

tailwind.config.ts        Custom colors, fonts, sidebar tokens, animations
next.config.mjs           Image optimization disabled, lint/TS errors suppressed
components.json           shadcn/ui config (paths, style, icon library)
```
