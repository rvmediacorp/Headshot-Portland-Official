"use client"

import Image from "next/image"
import Link from "next/link"
import { Phone } from "lucide-react"
import { useEffect, useState } from "react"
import { track } from "@/lib/analytics"

const REVIEW_COUNT = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_COUNT ?? "119"

export default function StickyHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full text-[#111] transition-colors duration-200 ${
        scrolled ? "border-b border-black/10 bg-[#FAFAF7]/85 backdrop-blur-md" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between gap-3 px-5 py-6 md:px-16">
        <Link
          href="/"
          aria-label="Headshot Portland — home"
          className="focus-ring -ml-1 inline-flex items-center rounded-md p-1"
        >
          <Image
            src="/images/logos/headshot_portland_black.svg"
            alt="Headshot Portland"
            width={96}
            height={32}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Trust nudge — desktop only, links to reviews */}
          <a
            href="https://maps.app.goo.gl/xRqN4nmhtpQkNQXa7"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring hidden min-h-[44px] items-center gap-1.5 rounded-full border border-black/15 bg-white/40 px-4 py-2 text-sm text-[#444] backdrop-blur-sm transition-colors hover:border-black/25 hover:bg-white/70 md:inline-flex"
          >
            <span aria-hidden className="text-[#FFB300]">
              ★
            </span>
            <span className="font-medium text-[#111]">4.9</span>
            <span className="text-[#999]">·</span>
            <span>{REVIEW_COUNT}+ reviews</span>
          </a>

          <a
            href="tel:+15033137121"
            onClick={() => track("phone_click", { from: "sticky_header" })}
            className="focus-ring btn-brand inline-flex min-h-[44px] items-center gap-2 rounded-full px-7 py-2 text-sm font-semibold sm:px-5"
          >
            <Phone className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">503.313.7121</span>
            <span className="sm:hidden">Call us</span>
          </a>
        </div>
      </div>
    </header>
  )
}
