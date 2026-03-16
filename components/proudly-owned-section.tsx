"use client"

import Image from "next/image"
import Link from "next/link"
import { useIsMobile } from "@/hooks/use-is-mobile"

export default function ProudlyOwnedSection() {
  const isMobile = useIsMobile()

  return (
    <div className="w-full px-[10px] my-[10px]">
      <section
        className="w-full rounded-[10px] bg-[#0F0E0F]"
        style={{
          display: "flex",
          padding: isMobile ? "116px 10px" : "116px 64px",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div
            className={`flex ${isMobile ? "flex-col" : "flex-row"} rounded-2xl overflow-hidden bg-[#fdf0e1] shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.3)] transform hover:-translate-y-1`}
          >
            {/* Left side - Portrait Image */}
            <div className={`w-full ${isMobile ? "h-[400px]" : "md:w-[35%]"} relative`}>
              <div className="h-full relative">
                <Image
                  src="/images/nathan-profile.webp"
                  alt="Portrait of Nathan Reimche-Vu"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 768px) 100vw, 35vw"
                />
              </div>
            </div>

            {/* Right side - Content */}
            <div className={`w-full ${isMobile ? "" : "md:w-[65%]"} p-8 md:p-10 lg:p-14 flex flex-col justify-center`}>
              {/* Heading */}
              <h2 className="font-bodoniModa text-black text-3xl md:text-4xl lg:text-5xl mb-6">
                Proudly owned &<br className={isMobile ? "hidden" : "hidden md:block"} />
                operated by photographer,
                <div className="text-[#247BA0] mt-2">Nathan Reimche-Vu</div>
              </h2>

              {/* Description */}
              <p className="text-gray-700 text-base md:text-lg mb-8 max-w-2xl">
                With over a decade of photography experience, Nathan knows a few things about making people look good.
                He brings his award-winning style and fun-loving personality to every session.
              </p>

              {/* Companies Nathan Has Worked With Link */}
              <Link
                href="/about-nathan"
                className="text-[#247BA0] font-bold text-base md:text-lg inline-block border-b border-[#247BA0] pb-0.5 mb-12"
              >
                COMPANIES NATHAN HAS WORKED WITH
              </Link>

              {/* Client Logos Section - Redesigned for better mobile display */}
              <div className={`grid ${isMobile ? "grid-cols-2 gap-6" : "grid-cols-5 gap-4"} w-full`}>
                {/* Amazon Logo */}
                <div className="flex items-center justify-center">
                  <img
                    src="/images/amazon-logo-new.png"
                    alt="Amazon logo"
                    style={{ maxHeight: "40px", maxWidth: "100%" }}
                    loading="eager"
                  />
                </div>

                {/* Intel Logo */}
                <div className="flex items-center justify-center">
                  <img
                    src="/images/intel-logo-new.png"
                    alt="Intel logo"
                    style={{ maxHeight: "40px", maxWidth: "100%" }}
                    loading="eager"
                  />
                </div>

                {/* RE/MAX Logo */}
                <div className={`flex items-center justify-center ${isMobile ? "col-span-2" : ""}`}>
                  <img
                    src="/images/remax-logo-new.svg"
                    alt="RE/MAX logo"
                    style={{ maxHeight: "40px", maxWidth: "100%" }}
                    loading="eager"
                  />
                </div>

                {/* WeWork Logo */}
                <div className={`flex items-center justify-center ${isMobile ? "col-span-1" : ""}`}>
                  <img
                    src="/images/wework-logo-new.svg"
                    alt="WeWork logo"
                    style={{ maxHeight: "40px", maxWidth: "100%" }}
                    loading="eager"
                  />
                </div>

                {/* Nike Logo */}
                <div className={`flex items-center justify-center ${isMobile ? "col-span-1" : ""}`}>
                  <img
                    src="/images/nike-logo-new.svg"
                    alt="Nike logo"
                    style={{ maxHeight: "40px", maxWidth: "100%" }}
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
