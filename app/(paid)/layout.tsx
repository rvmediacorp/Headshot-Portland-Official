import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import { inter, bodoni, playfair, bodoniModa } from "../fonts"
import Script from "next/script"
import AttributionCapture from "@/lib/AttributionCapture"
import Analytics from "./_components/Analytics"

// ─────────────────────────────────────────────────────────────────────────────
// Placeholders — REPLACE ME before launch
// ─────────────────────────────────────────────────────────────────────────────
// TODO: Set in .env.local / Vercel env:
//   NEXT_PUBLIC_GTM_CONTAINER_ID    e.g. "GTM-XXXXXXX"
//   NEXT_PUBLIC_BRAND_COLOR_HEX     e.g. "#1e7a96"  (defaults to teal if unset)
//   NEXT_PUBLIC_GOOGLE_REVIEW_COUNT e.g. "119"
//   NEXT_PUBLIC_SITE_URL            e.g. "https://headshotportland.com"
//
//   Server-only (consumed by /api/lead):
//   NOTIFICATION_EMAIL · RESEND_API_KEY · RESEND_FROM_EMAIL
//   GOOGLE_ADS_CUSTOMER_ID · GOOGLE_ADS_CONVERSION_ACTION_ID
//   GOOGLE_ADS_DEVELOPER_TOKEN · GOOGLE_ADS_ACCESS_TOKEN
//   GOOGLE_ADS_LOGIN_CUSTOMER_ID (optional, for MCC accounts)
//   META_PIXEL_ID · META_CAPI_ACCESS_TOKEN · META_TEST_EVENT_CODE (optional)
// ─────────────────────────────────────────────────────────────────────────────

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://headshotportland.com"
const GOOGLE_REVIEW_COUNT =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEW_COUNT ?? "119"
const BRAND_COLOR = process.env.NEXT_PUBLIC_BRAND_COLOR_HEX ?? "#1e7a96"
const GTM_ID = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID ?? ""

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
}

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "PhotographyBusiness",
  name: "Headshot Portland",
  url: SITE_URL,
  image: `${SITE_URL}/images/logos/headshot_portland.svg`,
  logo: `${SITE_URL}/images/logos/headshot_portland.svg`,
  telephone: "+1-503-313-7121",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "805 SW Broadway",
    addressLocality: "Portland",
    addressRegion: "OR",
    postalCode: "97205",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 45.518,
    longitude: -122.681,
  },
  areaServed: [
    "Portland, OR",
    "Vancouver, WA",
    "Beaverton, OR",
    "Lake Oswego, OR",
    "Hillsboro, OR",
    "Camas, WA",
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "10:00",
      closes: "16:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: GOOGLE_REVIEW_COUNT,
    bestRating: "5",
    worstRating: "1",
    },
  sameAs: [
    "https://www.instagram.com/headshotportland/",
    "https://www.google.com/maps/place/Headshot+Portland",
  ],
  founder: {
    "@type": "Person",
    name: "Nathan Reimche-Vu",
    jobTitle: "Lead Photographer",
  },
}

export default function PaidLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${inter.variable} ${bodoni.variable} ${playfair.variable} ${bodoniModa.variable} paid-root min-h-dvh bg-black text-white antialiased`}
      style={
        {
          ["--brand" as string]: BRAND_COLOR,
          fontFamily: "var(--font-inter), system-ui, sans-serif",
        } as React.CSSProperties
      }
    >
      {/*
        Hard-override the globally dark <body> so overscroll doesn't flash a
        different color. These routes are already dark-themed.
      */}
      <style>{`
        body { background-color: #000 !important; color: #fff !important; }
        .paid-root [data-display] { font-family: var(--font-bodoni-moda), Georgia, serif; }
        .paid-root .btn-brand {
          background-color: var(--brand);
          color: #fff;
        }
        .paid-root .btn-brand:hover { filter: brightness(1.08); }
        .paid-root .focus-ring {
          outline: 2px solid transparent;
          outline-offset: 2px;
        }
        .paid-root .focus-ring:focus-visible {
          outline: 3px solid var(--brand);
          outline-offset: 3px;
          border-radius: 0.5rem;
        }
      `}</style>

      {/* Skip link */}
      <a
        href="#paid-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-[#111] focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Consent Mode v2 — must run before GTM */}
      <Script id="consent-mode-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            functionality_storage: 'granted',
            security_storage: 'granted',
            wait_for_update: 500
          });
          gtag('set', 'ads_data_redaction', true);
          gtag('set', 'url_passthrough', true);
        `}
      </Script>

      {GTM_ID ? (
        <Script id="gtm-loader" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      ) : null}

      {GTM_ID ? (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="gtm-noscript"
          />
        </noscript>
      ) : null}

      <Script
        id="business-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(businessJsonLd)}
      </Script>

      <AttributionCapture />
      <Analytics />

      <main id="paid-main" className="min-h-dvh">
        {children}
      </main>
    </div>
  )
}
