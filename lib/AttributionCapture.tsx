"use client"

import { useEffect } from "react"

const PARAM_KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const

const FIRST_VISIT_KEYS = ["landing_page", "referrer", "first_ts"] as const

const NINETY_DAYS_SECONDS = 60 * 60 * 24 * 90

function setCookie(name: string, value: string, maxAgeSeconds: number): void {
  if (typeof document === "undefined") return
  const secure = location.protocol === "https:" ? "; Secure" : ""
  document.cookie = `attr_${name}=${encodeURIComponent(value)}; Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax${secure}`
}

function setStorage(name: string, value: string): void {
  try {
    localStorage.setItem(`attr_${name}`, value)
  } catch {
    // localStorage may be disabled (private mode); cookie is the fallback
  }
}

function readStorage(name: string): string | null {
  try {
    return localStorage.getItem(`attr_${name}`)
  } catch {
    return null
  }
}

/**
 * Reads marketing attribution params from the current URL and persists them
 * to first-party cookies + localStorage. Click IDs and UTMs are overwritten on
 * each visit; landing_page/referrer/first_ts are recorded only on the first
 * visit so we don't lose the original entry context.
 */
export default function AttributionCapture(): null {
  useEffect(() => {
    if (typeof window === "undefined") return

    const url = new URL(window.location.href)
    const params = url.searchParams

    for (const key of PARAM_KEYS) {
      const value = params.get(key)
      if (value && value.length < 256) {
        setCookie(key, value, NINETY_DAYS_SECONDS)
        setStorage(key, value)
      }
    }

    if (!readStorage("first_ts")) {
      const landing = `${url.pathname}${url.search}`
      const referrer = document.referrer || ""
      const ts = new Date().toISOString()

      setCookie("landing_page", landing, NINETY_DAYS_SECONDS)
      setStorage("landing_page", landing)
      setCookie("referrer", referrer, NINETY_DAYS_SECONDS)
      setStorage("referrer", referrer)
      setCookie("first_ts", ts, NINETY_DAYS_SECONDS)
      setStorage("first_ts", ts)
    }
  }, [])

  return null
}

/**
 * Read all persisted `attr_*` values from cookies (with localStorage fallback).
 * Called from the form's submit handler.
 */
export function readAttribution(): Record<string, string> {
  const out: Record<string, string> = {}
  if (typeof document === "undefined") return out

  const cookieMap = new Map<string, string>()
  for (const segment of document.cookie.split(";")) {
    const [rawKey, ...rest] = segment.trim().split("=")
    if (!rawKey || !rawKey.startsWith("attr_")) continue
    cookieMap.set(rawKey.slice(5), decodeURIComponent(rest.join("=") || ""))
  }

  for (const key of [...PARAM_KEYS, ...FIRST_VISIT_KEYS]) {
    const value = cookieMap.get(key) ?? readStorage(key) ?? ""
    if (value) out[key] = value
  }

  return out
}
