"use client"

import { useState, useEffect } from "react"

export function useIsMobile(): boolean {
  // Always initialize false to match server render — prevents React #418
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    handler() // Set real value after hydration
    window.addEventListener("resize", handler)
    return () => window.removeEventListener("resize", handler)
  }, [])

  return isMobile
}
