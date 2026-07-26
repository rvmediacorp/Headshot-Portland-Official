"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, Suspense } from "react"

function GoogleAnalyticsInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Only track home page, headshots page, and thank you page
    if (pathname === "/" || pathname === "/headshots" || pathname === "/thank-you") {
      const url = pathname + searchParams.toString()

      // Track page view
      window.gtag?.("event", "page_view", {
        page_path: url,
      })

      // The /thank-you conversion previously fired here AND from an inline
      // script in app/thank-you/page.tsx — the same send_to twice, with no
      // transaction_id to dedupe on. Google Tag Manager now owns conversion
      // tags; do not re-add a hardcoded gtag conversion here.
    }
  }, [pathname, searchParams])

  return null
}

export default function GoogleAnalytics() {
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsInner />
    </Suspense>
  )
}
