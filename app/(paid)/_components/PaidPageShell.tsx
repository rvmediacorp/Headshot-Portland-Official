import Script from "next/script"
import HeroWithInlineForm from "./HeroWithInlineForm"
import StickyHeader from "./StickyHeader"
import Testimonials from "./Testimonials"
import WhyNathan from "./WhyNathan"
import LogoBar from "./LogoBar"
import StickyMobileCTA from "./StickyMobileCTA"
import Footer from "./Footer"
import QuoteForm from "./QuoteForm"
import TrustBar from "./TrustBar"
import { HERO_IMAGES } from "@/lib/hero-images"
import type { Niche } from "@/types/lead"

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://headshotportland.com"

interface PaidPageShellProps {
  niche: Niche
  headline: string
  subhead: string
  /** Path of this page (e.g. "/corporate-headshots"). Used for canonical service JSON-LD + footer link filtering. */
  path: string
  /** Human-readable name of the niche service, used in JSON-LD `name`. */
  serviceName: string
  /** Description of the niche service, used in JSON-LD `description`. */
  serviceDescription: string
}

/**
 * Reusable page composition for all 5 niche routes. Each `page.tsx` only
 * supplies niche-specific copy + metadata. The hero, form, sections, and
 * tracking are identical across pages.
 */
export default function PaidPageShell({
  niche,
  headline,
  subhead,
  path,
  serviceName,
  serviceDescription,
}: PaidPageShellProps) {
  const images = HERO_IMAGES[niche]
  const url = `${SITE_URL}${path}`

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: serviceDescription,
    serviceType: serviceName,
    url,
    areaServed: [
      "Portland, OR",
      "Vancouver, WA",
      "Beaverton, OR",
      "Lake Oswego, OR",
      "Hillsboro, OR",
      "Camas, WA",
    ],
    provider: {
      "@type": "PhotographyBusiness",
      name: "Headshot Portland",
      url: SITE_URL,
      telephone: "+1-503-313-7121",
      address: {
        "@type": "PostalAddress",
        streetAddress: "805 SW Broadway",
        addressLocality: "Portland",
        addressRegion: "OR",
        postalCode: "97205",
        addressCountry: "US",
      },
    },
  }

  return (
    <>
      <Script
        id={`service-jsonld-${niche}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(serviceJsonLd)}
      </Script>

      <StickyHeader />
      <HeroWithInlineForm
        niche={niche}
        headline={headline}
        subhead={subhead}
        images={images}
      />
      <Testimonials />
      <WhyNathan />
      <div className="w-full px-[10px] my-[10px]">
        <section className="w-full rounded-[10px] border-[1.5px] border-[#C8C8C8] bg-[#FDF0E1] py-12 sm:py-20">
          <div className="mx-auto max-w-xl px-5 sm:px-8">
            <div className="text-center mb-8">
              <h2
                data-display
                className="text-balance text-3xl font-semibold leading-tight text-[#111] sm:text-4xl"
              >
                Get your custom quote
              </h2>
              <p className="mt-2 text-[15px] text-[#444]">
                Select an option below to get started. We reply within 1 business hour.
              </p>
            </div>
            <QuoteForm niche={niche} variant="on-light" />
            <div className="mt-3">
              <TrustBar />
            </div>
          </div>
        </section>
      </div>
      <LogoBar />
      <Footer currentPath={path} />
      <StickyMobileCTA />
    </>
  )
}
