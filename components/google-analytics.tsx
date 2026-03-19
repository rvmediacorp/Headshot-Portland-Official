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

      // Track conversion if it's the thank you page
      if (pathname === "/thank-you") {
        window.gtag?.("event", "conversion", {
          send_to: "AW-847156852/DiA7CM_nqYEDEPSs-pMD",
        })
      }
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
