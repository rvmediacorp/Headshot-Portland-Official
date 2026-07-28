import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // `unoptimized: true` used to live here "for Vercel Blob CDN compatibility".
    // The real requirement was remotePatterns — without it, next/image rejects
    // absolute URLs with a 400. Disabling optimization satisfied that, but at the
    // cost of shipping every image at full source resolution: an 800x1200 hero
    // portrait (110 KB) was being served into a 198x248 grid cell. Google Ads
    // rates this page's landing page experience "Below average", which suppresses
    // Quality Score on every keyword pointing at it.
    //
    // Allow-listing the remote hosts instead lets the optimizer resize and serve
    // modern formats, while still rejecting hosts we don't control.
    //
    // Do NOT re-add `unoptimized: true` to fix a broken remote image — add its
    // host below instead.
    remotePatterns: [
      // Both Vercel Blob buckets (images on /headshots, /for-teams, reviews).
      { protocol: "https", hostname: "**.public.blob.vercel-storage.com", pathname: "/**" },
      // Google account avatars on the review cards.
      { protocol: "https", hostname: "lh3.googleusercontent.com", pathname: "/**" },
    ],
  },
  logging: {
    browserToTerminal: true,
  },
  turbopack: {
    root: __dirname,
  },
  experimental: {
    prefetchInlining: true,
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ]
  },
}

export default nextConfig
