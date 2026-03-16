"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useResponsiveScale } from "@/hooks/use-responsive-scale"
import { useIsMobile } from "@/hooks/use-is-mobile"

export default function QuotesSection() {
  const scale = useResponsiveScale()
  const [isVisible, setIsVisible] = useState(false)
  const isMobile = useIsMobile()
  const textSectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    const el = textSectionRef.current
    if (el) {
      observer.observe(el)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  // Add marquee animation to the stylesheet
  useEffect(() => {
    const styleEl = document.createElement("style")
    const keyframes = `
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `
    styleEl.appendChild(document.createTextNode(keyframes))
    document.head.appendChild(styleEl)

    return () => {
      document.head.removeChild(styleEl)
    }
  }, [])

  return (
    <div className="w-full px-[10px] my-[10px]">
      <section
        className="w-full relative overflow-hidden quotes-section rounded-[10px]"
        style={{
          display: "flex",
          padding: isMobile ? "40px 0px 80px" : "60px 0px 116px",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          background: "#0F0E0F",
        }}
      >
        {/* Simplified ellipse positioning without any background */}
        <div
          className="absolute left-0 top-0"
          style={{
            width: "100%",
            height: "100%",
            background: "radial-gradient(circle at 20% 20%, rgba(230, 230, 230, 0.05) 0%, rgba(230, 230, 230, 0) 50%)",
            pointerEvents: "none",
          }}
        ></div>

        <div className="max-w-6xl w-full px-4 md:px-8 lg:px-16 relative z-10">
          {/* First Question Section - info-top-wrapper */}
          <div className="mb-12 md:mb-16 lg:mb-18 relative">
            <div className={`${isMobile ? "" : "grid md:grid-cols-2"} gap-12 md:gap-16 lg:gap-20`}>
              {/* Left column - Question and quotes */}
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-white text-2xl mr-4 leading-none">•</span>
                  <h2
                    className="text-white font-bodoniModa mb-[15px]"
                    style={{
                      fontSize: isMobile ? "36px" : "45px",
                      lineHeight: "90%",
                      fontStyle: "italic",
                    }}
                  >
                    <span style={{ whiteSpace: isMobile ? "normal" : "nowrap" }}>Does this sound like you?</span>
                  </h2>
                </div>
                <div className="space-y-1 ml-8">
                  <p className="text-[#247BA0] font-medium uppercase" style={{ fontSize: isMobile ? "16px" : "20px" }}>
                    &ldquo;BUT I HATE BEING PHOTOGRAPHED.&rdquo;
                  </p>
                  <p className="text-[#247BA0] font-medium uppercase" style={{ fontSize: isMobile ? "16px" : "20px" }}>
                    &ldquo;I NEVER LOOK GOOD IN PHOTOS.&rdquo;
                  </p>
                </div>
              </div>

              {/* Right column - Response text */}
              <div className={`mt-8 md:mt-0 pl-0 md:pl-8 lg:pl-12 ${isMobile ? "ml-8" : ""}`}>
                <p className="text-[#838283] max-w-[700px]" style={{ lineHeight: "170%" }}>
                  <b className="text-white font-medium block md:inline">We hear this all the time,</b> and we get
                  it—being in front of the camera can be... uncomfortable. Our response: &ldquo;Leave it to the pros.&rdquo; We&apos;ll
                  help make the experience comfortable and fun! We specialize in posing and smile coaching—everything
                  from coaching you on the perfect angles, expression and positioning to details like wardrobe and hair.
                </p>
              </div>
            </div>
          </div>

          {/* Marquee section - Fixed to go full width */}
          <div
            className="relative w-full mb-12 md:mb-16 overflow-hidden"
            ref={textSectionRef}
            style={{
              position: "relative",
              left: "50%",
              right: "50%",
              marginLeft: "-50vw",
              marginRight: "-50vw",
              width: "100vw",
            }}
          >
            <div className="flex whitespace-nowrap">
              <div
                className="inline-block whitespace-nowrap"
                style={{
                  animation: "marquee 20s linear infinite",
                }}
              >
                <span
                  className="font-bodoniModa italic uppercase text-white opacity-20 inline-block"
                  style={{ fontSize: "clamp(60px, 10vw, 120px)", lineHeight: "1.1" }}
                >
                  WE LOVE MAKING YOU LOOK GOOD! &nbsp;&nbsp;&nbsp; WE LOVE MAKING YOU LOOK GOOD! &nbsp;&nbsp;&nbsp; WE
                  LOVE MAKING YOU LOOK GOOD! &nbsp;&nbsp;&nbsp;
                </span>
              </div>
              <div
                className="inline-block whitespace-nowrap"
                style={{
                  animation: "marquee 20s linear infinite",
                }}
              >
                <span
                  className="font-bodoniModa italic uppercase text-white opacity-20 inline-block"
                  style={{ fontSize: "clamp(60px, 10vw, 120px)", lineHeight: "1.1" }}
                >
                  WE LOVE MAKING YOU LOOK GOOD! &nbsp;&nbsp;&nbsp; WE LOVE MAKING YOU LOOK GOOD! &nbsp;&nbsp;&nbsp; WE
                  LOVE MAKING YOU LOOK GOOD! &nbsp;&nbsp;&nbsp;
                </span>
              </div>
            </div>
          </div>

          {/* Second Question Section - info-bottom-wrapper */}
          <div className="relative mt-[60px]">
            <div className={`${isMobile ? "" : "grid md:grid-cols-2"} gap-8 md:gap-12 lg:gap-16`}>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-white text-2xl mr-4 leading-none">•</span>
                  <h2
                    className="text-white font-bodoniModa mb-[15px]"
                    style={{
                      fontSize: isMobile ? "36px" : "57px",
                      lineHeight: "90%",
                      fontStyle: "italic",
                    }}
                  >
                    <span style={{ whiteSpace: isMobile ? "normal" : "nowrap" }}>
                      Does your company require a specific &ldquo;look&rdquo;?
                    </span>
                  </h2>
                </div>
                <p
                  className="text-[#247BA0] font-medium uppercase ml-8"
                  style={{ fontSize: isMobile ? "16px" : "20px" }}
                >
                  WE CAN 100% MATCH AN EXISTING COMPANY STYLE AND KEEP THINGS CONSISTENT!
                </p>
              </div>
            </div>
          </div>

          {/* CTA with Line - info-bottom-btn */}
          <div
            className={`${isMobile ? "flex-col items-center" : "flex items-center"} mt-[110px] gap-0 ${isMobile ? "space-x-0" : "space-x-[50px]"}`}
          >
            <Link
              href="https://ww3.headshotportland.com/instant-quote"
              className={`bg-teal-blue text-white font-inter font-bold text-center rounded-full flex-shrink-0 ${isMobile ? "w-full mb-8" : ""}`}
              style={{
                padding: "20px 24px",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              GET A FREE QUOTE
            </Link>
            {!isMobile && <span className="inline-block w-full h-[1px] bg-[#247BA0]"></span>}
          </div>
        </div>
      </section>
    </div>
  )
}
