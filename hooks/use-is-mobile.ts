"use client"

import { useState, useEffect } from "react"

function getIsMobile() {
  if (typeof window === "undefined") return false
  return window.innerWidth < 768
}

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(getIsMobile)

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handler)
    return () => window.removeEventListener("resize", handler)
  }, [])

  return isMobile
}
