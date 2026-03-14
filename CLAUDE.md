## Task Completion Requirements

- `pnpm lint` and `pnpm build` must pass before considering tasks completed.
- Never commit `.env` files or hardcoded API keys.
- Always test mobile layout (< 768px) and desktop (≥ 768px) when touching components.

## Project Snapshot

Headshot Portland is a conversion-focused marketing website for a professional headshot photography studio in Portland, OR. The goal of every page is to generate quote requests or direct bookings.

This is a production site. Prefer stability over cleverness.

## Core Priorities

1. Conversion first — CTAs, thank-you page tracking, and quote flow must always work.
2. Mobile fidelity — majority of traffic is mobile; every section must look correct at 375px.
3. Brand consistency — Bodoni/Playfair headings, teal accent `#2A8CAA`, dark backgrounds.

If a tradeoff is required, choose conversion integrity and visual fidelity over technical elegance.

## Key URLs

- Live booking: `https://ww3.headshotportland.com`
- Google Ads account: `AW-847156852`
- Thank-you conversion label: `DiA7CM_nqYEDEPSs-pMD`
- Video CDN: `rvideo.b-cdn.net`
- Image CDN: `hebbkx1anhila5yf.public.blob.vercel-storage.com`

## Important Notes

- `next.config.mjs` disables image optimization (`unoptimized: true`) — required for Vercel Blob CDN compatibility. Do not remove this.
- ESLint and TypeScript errors are suppressed during builds. Fix warnings in code; do not rely on suppression as a crutch.
- The only external booking integration is a direct URL link — there is no API.
- `app/headshots/page.tsx` manually lists all 63 gallery image paths — update this list when adding/removing images.

## Stack

- Next.js 16 App Router, React 19, TypeScript 5
- Tailwind CSS 3 with custom design tokens (see `tailwind.config.ts`)
- shadcn/ui (Radix UI primitives) for base components
- Google Tag Manager + Google Ads for analytics and conversion tracking

## See Also

- `.docs/architecture.md` — page and component structure
- `.docs/analytics.md` — tracking setup and conversion events
- `.docs/components.md` — custom component reference
- `.docs/encyclopedia.md` — project-specific terms
