"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Only track home page and headshots page
    if (pathname === "/" || pathname === "/headshots") {
      const url = pathname + searchParams.toString()

      // Track page view
      window.gtag?.("event", "page_view", {
        page_path: url,
      })

      console.log(`Tracked page view: ${url}`)
    }
  }, [pathname, searchParams])

  return null
}
