"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function GoogleAnalytics() {
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

      console.log(`Tracked page view: ${url}`)
    }
  }, [pathname, searchParams])

  return null
}
