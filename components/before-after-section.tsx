"use client"

import Image from "next/image"
import Link from "next/link"
import { useIsMobile } from "@/hooks/use-is-mobile"

export default function BeforeAfterSection() {
  const isMobile = useIsMobile()

  return (
    <div className="w-full px-[10px] my-[10px]">
      <section
        className="w-full rounded-[10px] bg-[#0F0E0F]"
        style={{
          display: "flex",
          padding: isMobile ? "116px 10px" : "116px 198px",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {/* Section Heading */}
        <h2 className="font-bodoniModa text-white text-center text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6">
          Before & After
        </h2>

        {/* Subheading */}
        <p className="text-white text-center mb-12 md:mb-16 max-w-2xl mx-auto">
          With business interactions almost entirely on screens,{" "}
          <span className="underline font-semibold">first impressions matter</span>.
        </p>

        {/* Before & After Cards - Added max-width to constrain the size */}
        <div className="grid md:grid-cols-2 gap-24 md:gap-8 mb-12 md:mb-16 w-full max-w-4xl mx-auto">
          {/* Card 1 - Megan */}
          <div className="relative bg-[#0F0E0F] rounded-lg overflow-visible flex flex-col items-center">
            {/* Main Image - Added max-width and max-height constraints */}
            <div className="relative aspect-[4/5] md:aspect-square w-full rounded-t-lg overflow-visible">
              <Image
                src="/images/megan-headshot.webp"
                alt="Professional headshot of Megan"
                width={400}
                height={500}
                className="w-full h-full object-cover object-center rounded-t-lg"
                priority={true}
              />

              {/* Before Image Overlay - Positioned to overlap from outside */}
              <div className="absolute top-[-20px] left-[-20px] w-28 h-28 md:w-32 md:h-32 overflow-hidden rounded-md transform -rotate-6 shadow-lg z-10">
                <Image
                  src="/images/megan-selfie.webp"
                  alt="Before selfie of Megan"
                  width={150}
                  height={150}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Testimonial */}
            <div className="p-6 pb-8 bg-black rounded-b-lg w-full h-[150px] md:h-[170px]">
              <p className="text-white text-sm md:text-base mb-4">
                &quot;IT WAS SUCH A FUN AND EASY EXPERIENCE! NATHAN REALLY PUT ME AT EASE AND BROUGHT OUT THE
                BEST.&quot;
              </p>
              <p className="text-gray-400 italic">- MEGAN</p>
            </div>
          </div>

          {/* Card 2 - Jordan */}
          <div className="relative bg-[#0F0E0F] rounded-lg overflow-visible flex flex-col items-center">
            {/* Main Image - Added max-width and max-height constraints */}
            <div className="relative aspect-[4/5] md:aspect-square w-full rounded-t-lg overflow-visible">
              <Image
                src="/images/jordan-headshot.webp"
                alt="Professional headshot of Jordan"
                width={400}
                height={500}
                className="w-full h-full object-cover object-center rounded-t-lg"
              />

              {/* Before Image Overlay - Positioned to overlap from outside */}
              <div className="absolute top-[-20px] left-[-20px] w-28 h-28 md:w-32 md:h-32 overflow-hidden rounded-md transform -rotate-6 shadow-lg z-10">
                <Image
                  src="/images/jordan-selfie.webp"
                  alt="Before selfie of Jordan"
                  width={150}
                  height={150}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Testimonial */}
            <div className="p-6 pb-8 bg-black rounded-b-lg w-full h-[150px] md:h-[170px]">
              <p className="text-white text-sm md:text-base mb-4">
                &quot;MY HEADSHOT IS IMPORTANT BECAUSE IT CONVEYS PROFESSIONALISM TO MY CLIENTELE. THE PROCESS WAS
                SIMPLE AND TOOK LESS TIME THAN I HAD ANTICIPATED.&quot;
              </p>
              <p className="text-gray-400 italic">- JORDAN</p>
            </div>
          </div>
        </div>

        {/* CTA Button - Also constrained with max-width */}
        <div className="w-full max-w-4xl mx-auto">
          <Link
            href="https://ww3.headshotportland.com/instant-quote"
            className="block w-full bg-[#2A8CAA] text-white text-center py-4 md:py-5 rounded-full relative overflow-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `
                linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 1%, transparent 1%, transparent 10%,
                rgba(255,255,255,0.15) 10%, rgba(255,255,255,0.15) 12%, transparent 12%, transparent 20%,
                rgba(255,255,255,0.2) 20%, rgba(255,255,255,0.2) 21%, transparent 21%, transparent 35%,
                rgba(255,255,255,0.12) 35%, rgba(255,255,255,0.12) 38%, transparent 38%, transparent 50%,
                rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.07) 54%, transparent 54%, transparent 70%,
                rgba(255,255,255,0.15) 70%, rgba(255,255,255,0.15) 72%, transparent 72%, transparent 80%,
                rgba(255,255,255,0.1) 80%, rgba(255,255,255,0.1) 84%, transparent 84%, transparent 95%,
                rgba(255,255,255,0.18) 95%, rgba(255,255,255,0.18) 97%, transparent 97%, transparent 100%)
              `,
                borderBottom: "3px solid rgba(255,255,255,0.7)",
              }}
            ></div>
            <div className="relative flex items-center justify-between px-6 md:px-8">
              <span className="text-lg md:text-xl font-bold">GET A FREE QUOTE</span>
              <span className="text-sm md:text-base font-normal flex items-center justify-center">
                <Image
                  src="/images/headshot-portland-logo-white.png"
                  alt="Headshot Portland"
                  width={120}
                  height={40}
                  className="h-8 md:h-10 w-auto object-contain"
                />
              </span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  )
}
