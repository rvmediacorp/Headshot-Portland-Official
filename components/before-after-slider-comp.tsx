"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface BeforeAfterSliderProps {
  beforeImage?: string
  afterImage?: string
  index?: number
}

function BeforeAfterSlider({
  beforeImage = "/placeholder.svg?height=600&width=600",
  afterImage = "/placeholder.svg?height=600&width=600",
  index = 0,
}: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50)
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos(Number(e.target.value))
  }

  // Handle mouse/touch drag events for more intuitive sliding
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault() // Prevent default behavior
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return

    let clientX: number

    if ("touches" in e) {
      clientX = e.touches[0].clientX
    } else {
      clientX = e.clientX
    }

    const containerRect = containerRef.current.getBoundingClientRect()
    const containerWidth = containerRect.width
    const containerLeft = containerRect.left

    let position = ((clientX - containerLeft) / containerWidth) * 100
    position = Math.max(0, Math.min(100, position))

    setSliderPos(position)
  }

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false)
    }

    window.addEventListener("mouseup", handleGlobalMouseUp)
    window.addEventListener("touchend", handleGlobalMouseUp)

    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp)
      window.removeEventListener("touchend", handleGlobalMouseUp)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative aspect-square bg-gray-100 rounded-md overflow-hidden"
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleMouseUp}
      style={{ touchAction: "none" }}
    >
      {/* Before Image (Full width) */}
      <div className="absolute inset-0">
        <Image src={beforeImage || "/placeholder.svg"} alt="Before image" fill className="object-cover" loading="eager" />
      </div>

      {/* After Image (Clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}>
        <Image src={afterImage || "/placeholder.svg"} alt="After image" fill className="object-cover" loading="eager" />
      </div>

      {/* Slider Input */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={handleSliderChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
        aria-label={`Slider control for before and after image comparison ${index + 1}`}
      />

      {/* Slider Line */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-white z-10" style={{ left: `${sliderPos}%` }}></div>

      {/* Slider Button - Larger on mobile for better touch targets */}
      <div
        className="absolute top-1/2 transform -translate-y-1/2 z-20"
        style={{ left: `${sliderPos}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
      >
        <div
          className={`${isMobile ? "w-12 h-12" : "w-10 h-10"} bg-white rounded-full flex items-center justify-center shadow-md -translate-x-1/2`}
        >
          <div className="flex items-center">
            <span className={`text-gray-500 font-bold ${isMobile ? "text-lg" : ""}`}>&lt;</span>
            <span className={`mx-1 text-gray-300 ${isMobile ? "text-lg" : ""}`}>|</span>
            <span className={`text-gray-500 font-bold ${isMobile ? "text-lg" : ""}`}>&gt;</span>
          </div>
        </div>
      </div>

      {/* Before/After Labels - Adjusted for better visibility on mobile */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4 z-10">
        <div
          className={`text-white ${isMobile ? "text-base px-2 py-1 bg-black bg-opacity-50 rounded" : "text-sm"} font-semibold uppercase tracking-wider transition-opacity duration-300`}
          style={{ opacity: sliderPos < 50 ? 0.3 : 1 }}
        >
          Before
        </div>
        <div
          className={`text-white ${isMobile ? "text-base px-2 py-1 bg-black bg-opacity-50 rounded" : "text-sm"} font-semibold uppercase tracking-wider transition-opacity duration-300`}
          style={{ opacity: sliderPos > 50 ? 0.3 : 1 }}
        >
          After
        </div>
      </div>
    </div>
  )
}

export default function HighEndRetouchingSection() {
  return (
    <div className="w-full px-[10px] my-[10px]">
      <section
        className="w-full rounded-[10px] bg-white"
        style={{
          display: "flex",
          padding: "116px 10px",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div className="max-w-6xl mx-auto w-full">
          {/* Section Heading - Responsive adjustments */}
          <div className="text-center mb-8 md:mb-16">
            <h3 className="text-black text-lg md:text-2xl mb-2">HIGH-END RETOUCHING</h3>
            <h2 className="text-4xl md:text-6xl lg:text-7xl mb-8 md:mb-16">
              <span className="text-black font-bodoniModa">THE FINAL </span>
              <span className="text-[#4A8EAA] font-bodoniModa">
                PROFESSIONAL
                <br className="hidden md:block" /> TOUCH
              </span>
            </h2>
          </div>

          {/* Slider Grid - Three columns on all screen sizes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-16">
            <BeforeAfterSlider beforeImage="/images/blackbefore1.jpg" afterImage="/images/blackafter2.jpg" index={0} />
            <BeforeAfterSlider beforeImage="/images/meganbefore1.jpg" afterImage="/images/meganafter2.jpg" index={1} />
            <BeforeAfterSlider beforeImage="/images/levibefore1.jpg" afterImage="/images/leviafter2.jpg" index={2} />
          </div>

          {/* Description Text - Adjusted for better readability on mobile */}
          <div className="text-center max-w-3xl mx-auto px-2">
            <p className="text-gray-800 text-base md:text-lg lg:text-xl">
              Our in-house retouchers give your photos a fresh finish that looks far from filtered or dipped in plastic.{" "}
              <span className="text-[#4A8EAA] font-medium block md:inline mt-2 md:mt-0">
                Included with every purchased digital image.
              </span>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
