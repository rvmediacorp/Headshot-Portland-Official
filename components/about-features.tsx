"use client"

import { useState, useEffect } from "react"

const features = [
  {
    title: "PROFESSIONAL TALENT",
    description:
      "We're professional photographers, not someone with an iPhone, an AI filter, or fake studio. We offer real, stylistic, on-brand, what-you-truly-look-like headshots.",
  },
  {
    title: "CONVENIENT LOCATION",
    description:
      "Located in the heart of Downtown Portland, our studio is easily accessible by car, bus, streetcar, and MAX. Just steps from Pioneer Courthouse Square and Pioneer Place Mall.",
  },
  {
    title: "QUICK & EASY",
    description:
      "Book online in seconds! No lengthy consultations. Just show up, we'll guide you through your session, and deliver your photos within 24-48 hours.",
  },
  {
    title: "STATE-OF-THE-ART",
    description:
      "Our studio features top-of-the-line industry-leading studio lighting, high-end cameras, and professional editing software to ensure your headshots look their absolute best.",
  },
]

export default function AboutFeatures() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div className="w-full px-[10px] my-[10px]">
      <section
        className="w-full rounded-[10px] bg-[#0F0E0F]"
        style={{
          display: "flex",
          padding: isMobile ? "80px 20px" : "116px 64px",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div className="max-w-5xl mx-auto w-full">
          {/* Section Heading */}
          <h2 className="font-bodoniModa italic text-[#247BA0] text-4xl md:text-5xl lg:text-7xl text-center mb-16 md:mb-24">
            A photography experience
            <br />
            that&apos;s simple & fun.
          </h2>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16 md:gap-y-24">
            {features.map((feature) => (
              <div key={feature.title}>
                <h3 className="font-bodoniModa italic text-[#247BA0] text-2xl md:text-3xl mb-4">
                  {feature.title}
                </h3>
                <p className="text-white/60 text-base md:text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
