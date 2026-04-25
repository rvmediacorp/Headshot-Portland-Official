"use client"

import { useEffect, useState } from "react"
import { Phone } from "lucide-react"
import { track } from "@/lib/analytics"

/**
 * Mobile-only sticky bottom bar. Only shows after the user has scrolled past
 * the inline form so it never covers the form's submit button.
 */
export default function StickyMobileCTA() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let ticking = false
    const update = () => {
      // Find the inline quote form on the page; hide the bar while it's still
      // visible so the sticky bar can't sit on top of the submit button.
      const form = document.querySelector("form[aria-labelledby^=':']")
      let hideBecauseFormVisible = false
      if (form) {
        const rect = form.getBoundingClientRect()
        const viewportH = window.innerHeight
        // Form bottom is still inside the viewport (with a small buffer).
        hideBecauseFormVisible = rect.bottom > viewportH - 24
      }
      const pastEnoughScroll = window.scrollY > 400
      setShow(pastEnoughScroll && !hideBecauseFormVisible)
      ticking = false
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 lg:hidden transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-hidden={!show}
    >
      <div className="mx-3 mb-3 flex items-center gap-2 rounded-2xl bg-black/90 p-2 ring-1 ring-white/15 backdrop-blur">
        <a
          href="/google-quote-request"
          onClick={() => track("sticky_cta_click", { destination: "google-quote-request" })}
          tabIndex={show ? 0 : -1}
          className="focus-ring btn-brand inline-flex flex-1 items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold"
        >
          Get my quote
        </a>
        <a
          href="tel:+15033137121"
          tabIndex={show ? 0 : -1}
          aria-label="Call 503.313.7121"
          onClick={() => track("phone_click", { from: "sticky_mobile" })}
          className="focus-ring inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 text-white hover:bg-white/10"
        >
          <Phone className="h-5 w-5" aria-hidden />
        </a>
      </div>
    </div>
  )
}
