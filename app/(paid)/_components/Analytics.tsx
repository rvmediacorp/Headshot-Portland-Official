"use client"

import { useEffect } from "react"

/**
 * Tiny client component that ensures `window.dataLayer` is initialised before
 * any tracked event fires. GTM itself is loaded by the layout via <Script />.
 */
export default function Analytics(): null {
  useEffect(() => {
    window.dataLayer = window.dataLayer || []
  }, [])
  return null
}
