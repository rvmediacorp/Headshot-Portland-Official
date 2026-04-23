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
      className={`sticky top-0 z-30 w-full transition-all duration-200 ${
        scrolled
          ? "border-b border-black/5 bg-white/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-[72px] sm:px-8">
        <Link
          href="/"
          aria-label="Headshot Portland — home"
          className="focus-ring -ml-1 inline-flex items-center rounded-md p-1"
        >
          <Image
            src="/images/logos/headshot_portland_black.svg"
            alt="Headshot Portland"
            width={153}
            height={52}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Trust nudge — desktop only, links to reviews */}
          <a
            href="https://www.google.com/maps/place/Headshot+Portland"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm text-[#444] hover:bg-black/5 md:inline-flex"
          >
            <span aria-hidden className="text-[#FFB300]">
              ★
            </span>
            <span className="font-medium text-[#111]">4.9</span>
            <span className="text-[#666]">·</span>
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
