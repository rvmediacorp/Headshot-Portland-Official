"use client"

import Link from "next/link"
import { useIsMobile } from "@/hooks/use-is-mobile"

export default function AboutHero() {
  const isMobile = useIsMobile()

  return (
    <div className="w-full px-[10px] my-[10px]">
      <section
        className="w-full rounded-[10px] bg-brand-teal"
        style={{
          display: "flex",
          padding: isMobile ? "80px 20px 80px" : "116px 64px 116px",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <h1 className="text-white font-bodoniModa uppercase tracking-wider text-2xl md:text-3xl mb-4">
            ABOUT HEADSHOT PORTLAND
          </h1>

          {/* Tagline */}
          <p className="text-white/60 text-base md:text-lg mb-10 max-w-2xl mx-auto">
            Your best headshot ever is a true studio story
          </p>

          {/* CTA Buttons */}
          <div className={`flex ${isMobile ? "flex-col w-full" : "flex-row"} gap-4 justify-center`}>
            <Link
              href="https://ww3.headshotportland.com/instant-quote"
              className="bg-brand-teal-hover text-white text-center py-3 px-8 rounded-full whitespace-nowrap hover:bg-brand-teal-deep transition-colors"
            >
              <span className="text-base font-bold">GET A FREE QUOTE</span>
            </Link>

            <Link
              href="https://ww3.headshotportland.com/instant"
              className="border border-white text-white text-center py-3 px-8 rounded-full whitespace-nowrap hover:bg-white/10 transition-colors"
            >
              <span className="text-base font-bold">BOOK NOW</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
