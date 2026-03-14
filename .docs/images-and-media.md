# Images and media

## Image sources

| Location | Usage |
|---|---|
| `public/images/HeroGrid18/` | 18 hero section headshots (`hero.tsx`) |
| `public/images/headshots-gallery/` | 63 portfolio gallery images (`app/headshots/page.tsx`) |
| `public/images/wwwwgrid/` | 24 client headshots + 8 company logos (`who-we-work-with-section.tsx`) |
| `public/images/logos/` | Brand logo variants |
| `public/images/profile photos/` | Nathan's profile photo |
| Vercel Blob CDN | Some images loaded via external URL |

## Adding gallery images

Gallery images are **manually listed** in `app/headshots/page.tsx`. When adding new images:

1. Drop the file into `public/images/headshots-gallery/`
2. Add the path string to the images array in `app/headshots/page.tsx`

There is no automatic discovery — the list must be updated by hand.

## Video sources

| CDN | URL pattern | Used in |
|---|---|---|
| BunnyCDN | `rvideo.b-cdn.net/...` | Behind-the-scenes testimonials, creative process |
| Vercel Blob | `hebbkx1anhila5yf.public.blob.vercel-storage.com/...` | Hero background video |

All `<video>` elements include `playsInline` and `muted` for autoplay on mobile Safari.

## Image optimization

Next.js image optimization is **disabled** (`next.config.mjs`: `images: { unoptimized: true }`). This is intentional — the Vercel Blob CDN handles its own optimization. Do not re-enable without testing CDN image URLs.

## Fonts

- **LTC Bodoni 175 Pro**: local woff2 at `public/fonts/LTCBodoni175Pro-Regular.woff2`
- **Bodoni Moda**, **Playfair Display**, **Inter**: loaded from Google Fonts in `app/fonts.ts`

Font family names for Tailwind: `font-bodoni`, `font-libreBodoni`, `font-bodoniModa`, `font-playfair`, `font-inter`.
