"use client"

import { useIsMobile } from "@/hooks/use-is-mobile"

export default function SimpleAndFunExperience() {
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
        <div className="max-w-6xl mx-auto w-full">
          {/* Main Heading */}
          <h2
            className="text-center font-bodoniModa italic text-[#247BA0] text-3xl md:text-5xl lg:text-6xl mb-12 md:mb-16 tracking-wide"
            style={{ lineHeight: "1.4" }}
          >
            <span className="block mb-1 md:mb-2">A photography experience</span>
            <span className="block">that&apos;s simple &amp; fun.</span>
          </h2>

          {/* Features Grid */}
          <div className="bg-[#161516] rounded-lg p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
              {/* Feature 1 - Professional Talent */}
              <div className="space-y-4">
                <h3 className="font-bodoniModa italic text-[#247BA0] text-2xl md:text-3xl lg:text-4xl">
                  PROFESSIONAL TALENT
                </h3>
                <p className="text-[#BABABA] text-base md:text-lg">
                  All the best photographers, makeup artists & stylists, all under one roof, who help you look your
                  best.
                </p>
              </div>

              {/* Feature 2 - Convenient Location */}
              <div className="space-y-4">
                <h3 className="font-bodoniModa italic text-[#247BA0] text-2xl md:text-3xl lg:text-4xl">
                  CONVENIENT LOCATION
                </h3>
                <p className="text-[#BABABA] text-base md:text-lg">
                  A photography studio space located on 9th Avenue (and trimet accessible!)
                </p>
              </div>

              {/* Feature 3 - Quick & Easy */}
              <div className="space-y-4">
                <h3 className="font-bodoniModa italic text-[#247BA0] text-2xl md:text-3xl lg:text-4xl">QUICK & EASY</h3>
                <p className="text-[#BABABA] text-base md:text-lg">
                  Our online scheduler makes booking a breeze. Plus, photos in as little as 24 to 48 hours—sometimes
                  even same day!
                </p>
              </div>

              {/* Feature 4 - State-of-the-Art */}
              <div className="space-y-4">
                <h3 className="font-bodoniModa italic text-[#247BA0] text-2xl md:text-3xl lg:text-4xl">
                  STATE-OF-THE-ART
                </h3>
                <p className="text-[#BABABA] text-base md:text-lg">
                  Our commercial photography studio features top-of-the-line features by award-winning photographer,
                  Nathan Reimche-Vu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
