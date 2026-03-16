"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import ExactMasonryGrid from "./exact-masonry-grid"

export default function ExactMasonryGridWithResponsive() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Add event listener
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (isMobile) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {/* Top row */}
        <div className="aspect-square rounded-[12px] overflow-hidden bg-white relative">
          <Image
            src="/images/headshot-1.webp"
            alt="Professional headshot of man in dark clothing"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="aspect-square rounded-[12px] overflow-hidden bg-white relative">
          <Image
            src="/images/headshot-4.webp"
            alt="Professional headshot of woman with blonde hair"
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Middle row - large image */}
        <div className="col-span-2 aspect-[3/4] rounded-[12px] overflow-hidden my-4 bg-white relative">
          <Image
            src="/images/headshot-5.webp"
            alt="Professional headshot of woman with curly hair"
            fill
            className="object-cover object-top"
          />
        </div>

        {/* Bottom row */}
        <div className="aspect-square rounded-[12px] overflow-hidden bg-white relative">
          <Image
            src="/images/headshot-2.webp"
            alt="Professional headshot of man with beard in suit"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="aspect-square rounded-[12px] overflow-hidden bg-white relative">
          <Image
            src="/images/headshot-7.webp"
            alt="Professional headshot of bald man with mustache in suit"
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Bottom row 2 */}
        <div className="aspect-square rounded-[12px] overflow-hidden mt-4 bg-white relative">
          <Image
            src="/images/headshot-9.webp"
            alt="Professional headshot of woman with brown hair in blazer"
            fill
            className="object-cover object-top"
          />
        </div>
        <div className="aspect-square rounded-[12px] overflow-hidden mt-4 bg-white relative">
          <Image
            src="/images/headshot-3.webp"
            alt="Professional headshot of Asian man in denim shirt"
            fill
            className="object-cover object-top"
          />
        </div>
      </div>
    )
  }

  return <ExactMasonryGrid useOriginalHeight={true} />
}
