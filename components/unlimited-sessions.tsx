"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import ExactMasonryGrid from "./exact-masonry-grid"
import { useIsMobile } from "@/hooks/use-is-mobile"

export default function UnlimitedSessions() {
  const isMobile = useIsMobile()
  const [isVisible, setIsVisible] = useState(false)
  const underlineRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )

    if (underlineRef.current) {
      observer.observe(underlineRef.current)
    }

    return () => {
      if (underlineRef.current) {
        observer.disconnect()
      }
    }
  }, [])

  return (
    <div className="w-full px-[10px] my-[10px]">
      <section
        className="w-full relative overflow-hidden rounded-[10px] bg-[#0F0E0F]"
        style={{
          display: "flex",
          padding: "116px 0px",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div className="max-w-6xl mx-auto w-full px-4 md:px-8 lg:px-16">
          {/* Section Heading - Desktop and Mobile have different orders */}
          <div className="text-center mb-8 md:mb-12">
            {isMobile ? (
              <>
                <h2 className="text-[#2A8CAA] font-bodoniModa text-4xl md:text-5xl lg:text-6xl mb-2 italic">
                  Why unlimited?
                </h2>
                <p className="text-white font-bodoniModa text-xl md:text-2xl uppercase tracking-wider">
                  UNLIMITED SESSIONS
                </p>
              </>
            ) : (
              <>
                <p className="text-white font-bodoniModa text-xl md:text-2xl uppercase tracking-wider mb-2">
                  UNLIMITED SESSIONS
                </p>
                <h2 className="text-[#2A8CAA] font-bodoniModa text-4xl md:text-5xl lg:text-6xl italic">
                  Why unlimited?
                </h2>
              </>
            )}
          </div>

          {/* Subheading with underline */}
          <div className="text-center mb-6">
            <p className="text-white text-lg md:text-xl">
              Because we want you to be{" "}
              <span className="relative inline-block">
                yourself
                <svg
                  ref={underlineRef}
                  className="absolute bottom-[-6px] left-0 w-full"
                  height="5"
                  width="100%"
                  viewBox="0 0 100 5"
                  preserveAspectRatio="none"
                  style={{ overflow: "visible" }}
                >
                  <defs>
                    <linearGradient id="underlineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2A8CAA" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#2A8CAA" stopOpacity="1" />
                      <stop offset="100%" stopColor="#2A8CAA" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,2.5 C15,4.5 30,0.5 50,2.5 C70,4.5 85,0.5 100,2.5"
                    stroke="url(#underlineGradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: isVisible ? "0" : "200",
                      strokeDashoffset: isVisible ? "0" : "200",
                      transition: "stroke-dashoffset 1.8s ease-out",
                    }}
                  />
                </svg>
              </span>
              .
            </p>
          </div>

          {/* Description */}
          <div className="text-center mb-12 md:mb-16">
            <p className="text-white text-base md:text-lg max-w-3xl mx-auto">
              Unlimited sessions mean we capture all your expressions, outfits & moods. It's all included! Capture
              photos for different purposes. Get it all done in one visit.
            </p>
          </div>
        </div>

        {/* Photo Grid - Using Exact Masonry Grid */}
        <div className="relative mb-12 w-full">
          <div className="max-w-5xl mx-auto">
            <ExactMasonryGrid useOriginalHeight={true} />
          </div>

          {/* Black fade gradient overlay */}
          <div
            className="absolute left-0 right-0 bottom-0 w-full"
            style={{
              height: "350px",
              background:
                "linear-gradient(to top, #0F0E0F 0%, rgba(15, 14, 15, 0.9) 25%, rgba(15, 14, 15, 0.7) 50%, rgba(15, 14, 15, 0.4) 75%, rgba(15, 14, 15, 0) 100%)",
              zIndex: 10,
              pointerEvents: "none", // Ensures clicks pass through to elements below
            }}
          ></div>

          {/* Google Rating and CTA Buttons positioned at the bottom of the grid */}
          <div className="absolute bottom-0 left-0 right-0 z-30">
            <div className="max-w-5xl mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-center py-4">
                {/* Google Rating */}
                <div className="flex items-center mb-4 md:mb-0">
                  <Image src="/images/google-logo-new.png" alt="Google logo" width={36} height={36} className="mr-3" loading="eager" />
                  <div>
                    <p className="text-white text-base font-medium">Google Rating</p>
                    <div className="flex items-center">
                      <p className="text-[#FFC107] text-2xl font-bold mr-2">4.8</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-[#FFC107] text-lg">
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className={`flex ${isMobile ? "flex-col w-full" : "flex-row"} gap-4`}>
                  <Link
                    href="https://ww3.headshotportland.com/instant-quote"
                    className="bg-[#2A8CAA] text-white text-center py-3 px-8 rounded-full whitespace-nowrap"
                  >
                    <span className="text-base font-bold">GET A FREE QUOTE</span>
                  </Link>

                  <Link
                    href="https://ww3.headshotportland.com/instant"
                    className="border border-[#2A8CAA] text-white text-center py-3 px-8 rounded-full whitespace-nowrap"
                  >
                    <span className="text-base font-bold">BOOK NOW</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Blue horizontal line with proper border radius */}
          <div className="absolute bottom-0 left-0 right-0 z-20">
            <div className="max-w-5xl mx-auto">
              <div
                className="w-full h-[3px] bg-[#2A8CAA]"
                style={{
                  borderRadius: "0px 0px 12px 12px",
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
