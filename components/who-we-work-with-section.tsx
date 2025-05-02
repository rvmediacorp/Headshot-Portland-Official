"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import LogoImage from "./logo-image"

export default function WhoWeWorkWithSection() {
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

  // Client headshot images for the grid - now with all 24 unique images
  const clientHeadshots = [
    // First row - first batch of images (0-11)
    {
      id: 1,
      src: "/images/wwwwgrid/intel-headshots-portland.webp",
      alt: "Professional headshot of a young woman with long brown hair wearing a blue patterned blouse",
    },
    {
      id: 2,
      src: "/images/wwwwgrid/kittelson-headshots-portland.webp",
      alt: "Professional headshot of a young man with glasses wearing a navy blue suit with a patterned tie",
    },
    {
      id: 3,
      src: "/images/wwwwgrid/headshot-portland-studio.webp",
      alt: "Professional headshot of a bald man with a mustache and earrings wearing a floral patterned shirt",
    },
    {
      id: 4,
      src: "/images/wwwwgrid/headshot-portraits-erica.webp",
      alt: "Professional headshot of a woman with shoulder-length brown hair wearing a navy blue top",
    },
    {
      id: 5,
      src: "/images/wwwwgrid/headshot-portland-pdx-studio.webp",
      alt: "Professional headshot of a woman with long black and silver hair wearing a black top with white trim",
    },
    {
      id: 6,
      src: "/images/wwwwgrid/executive-portraits-portland.webp",
      alt: "Professional headshot of a man with dark hair wearing a navy blue suit and white shirt",
    },
    {
      id: 7,
      src: "/images/wwwwgrid/doctor-headshots-portland.webp",
      alt: "Professional headshot of a man with dark hair, beard and glasses wearing a white dotted shirt and burgundy tie",
    },
    {
      id: 8,
      src: "/images/wwwwgrid/andrew-portland-headshot.webp",
      alt: "Professional headshot of a middle-aged man with glasses and a beard wearing a black sweater over a navy shirt",
    },
    {
      id: 9,
      src: "/images/wwwwgrid/erik-portland-photographer.webp",
      alt: "Professional headshot of a man with short brown hair and a beard wearing a navy blue suit with a patterned tie",
    },
    {
      id: 10,
      src: "/images/wwwwgrid/dental-headshots-portland.webp",
      alt: "Professional headshot of a young Asian woman with long dark hair wearing a white button-up shirt",
    },
    {
      id: 11,
      src: "/images/wwwwgrid/portland-photo-studio-woman.webp",
      alt: "Professional headshot of a middle-aged woman with shoulder-length gray/brown hair wearing a light blue button-up shirt",
    },
    {
      id: 12,
      src: "/images/wwwwgrid/scott-headshot-2191-Edit-2.webp",
      alt: "Professional headshot of a man with brown hair and beard wearing a black shirt against a dark background",
    },
    // Second row - second batch of images (12-23)
    {
      id: 13,
      src: "/images/wwwwgrid/portland-doctor-headshots.webp",
      alt: "Professional headshot of a woman with black hair wearing a white and black patterned jacket and pearl necklace",
    },
    {
      id: 14,
      src: "/images/wwwwgrid/portland-photo-studios.webp",
      alt: "Professional headshot of a person with short brown hair and glasses wearing a green polo shirt with colorful tattoo",
    },
    {
      id: 15,
      src: "/images/wwwwgrid/sahil-headshot-5085-Edit-2.webp",
      alt: "Professional headshot of a young woman wearing a light gray hijab and black blazer over a white shirt",
    },
    {
      id: 16,
      src: "/images/wwwwgrid/law-headshots-portland.webp",
      alt: "Professional headshot of a man with reddish-blonde hair, beard and glasses wearing a dark suit and gray tie",
    },
    {
      id: 17,
      src: "/images/wwwwgrid/mercer-headshots-pdx.webp",
      alt: "Professional headshot of a middle-aged man with gray hair, glasses wearing a patterned blazer and white shirt",
    },
    {
      id: 18,
      src: "/images/wwwwgrid/non-profit-headshot-portland.webp",
      alt: "Professional headshot of a woman with short dark curly hair wearing a black top and gold earrings",
    },
    {
      id: 19,
      src: "/images/wwwwgrid/mercer-headshot-portland.webp",
      alt: "Professional headshot of a woman with shoulder-length brown wavy hair wearing a white high-neck top",
    },
    {
      id: 20,
      src: "/images/wwwwgrid/office-headshots-portland.webp",
      alt: "Professional headshot of a young woman with shoulder-length dark hair wearing a blue floral patterned top",
    },
    // Final batch of images (20-23)
    {
      id: 21,
      src: "/images/wwwwgrid/valerie-1519-Edit-2.webp",
      alt: "Professional headshot of a woman with short dark hair wearing a black cardigan over a white top with a leaf pendant necklace",
    },
    {
      id: 22,
      src: "/images/wwwwgrid/siddhi-307-Edit-1.webp",
      alt: "Professional headshot of a young woman with long reddish-brown hair wearing a black sleeveless top",
    },
    {
      id: 23,
      src: "/images/wwwwgrid/siddhi-307-Edit.webp",
      alt: "Professional headshot of a young woman with long reddish-brown hair wearing a black sleeveless top, alternate angle",
    },
    {
      id: 24,
      src: "/images/wwwwgrid/tom-fisher-698-Edit-2.webp",
      alt: "Professional headshot of a bald older man with a big smile wearing a navy patterned blazer and white shirt",
    },
  ]

  // Company logos
  const companyLogos = [
    {
      id: 1,
      src: "/images/logos/facebook-logo.svg",
      alt: "Facebook logo",
      width: 190,
      height: 37,
      className: "h-6 md:h-8",
    },
    {
      id: 2,
      src: "/images/amazon-logo-new.png", // Using existing PNG
      alt: "Amazon logo",
      width: 120,
      height: 40,
      className: "h-7 md:h-9",
    },
    {
      id: 3,
      src: "/images/logos/chase-logo.svg",
      alt: "Chase logo",
      width: 179,
      height: 33,
      className: "h-5 md:h-7",
    },
    {
      id: 4,
      src: "/images/logos/microsoft-logo.svg",
      alt: "Microsoft logo",
      width: 120,
      height: 40,
      className: "h-7 md:h-9",
    },
    {
      id: 5,
      src: "/images/logos/intel-logo.svg",
      alt: "Intel logo",
      width: 108,
      height: 42,
      className: "h-7 md:h-9",
    },
    {
      id: 6,
      src: "/images/logos/nike-logo.svg",
      alt: "Nike logo",
      width: 129,
      height: 45,
      className: "h-6 md:h-8",
    },
    {
      id: 7,
      src: "/images/logos/toyota-logo.svg",
      alt: "Toyota logo",
      width: 179,
      height: 50,
      className: "h-7 md:h-9",
    },
    {
      id: 8,
      src: "/images/logos/starbucks-logo.svg",
      alt: "Starbucks logo",
      width: 215,
      height: 19,
      className: "h-4 md:h-6",
    },
  ]

  // Function to safely get an image from the array
  const getHeadshot = (index) => {
    // Ensure index is within bounds
    if (index >= 0 && index < clientHeadshots.length) {
      return clientHeadshots[index]
    }
    // Fallback to first image if index is out of bounds
    return clientHeadshots[0]
  }

  return (
    <div className="w-full px-[10px] my-[10px]">
      <section className="w-full rounded-[10px] overflow-hidden">
        {/* Desktop Layout */}
        <div className="hidden md:block relative">
          {/* Headshot Grid - 12 columns and 2 rows for desktop */}
          <div className="grid grid-cols-12 gap-0">
            {Array.from({ length: 24 }).map((_, index) => {
              const headshot = getHeadshot(index)

              // Special styling for specific images if needed
              const imageStyle = { objectFit: "cover" }

              return (
                <div key={`grid-${index}`} className="aspect-square relative">
                  <Image
                    src={headshot.src || "/placeholder.svg"}
                    alt={headshot.alt}
                    fill
                    className="object-cover"
                    style={imageStyle}
                  />
                </div>
              )
            })}
          </div>

          {/* Gradient overlay for bottom row - adjusted to be shorter */}
          <div
            className="absolute bottom-20 left-0 right-0 h-1/2 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,2.5) 35%, rgba(255,255,255,1) 100%)",
            }}
          ></div>

          {/* White section with title and logos */}
          <div className="bg-white py-16 px-12 relative z-10">
            <div className="flex flex-row">
              {/* Left side - Title (20% width) */}
              <div className="w-1/5">
                <h2 className="font-bodoniModa italic text-black text-5xl leading-tight">
                  Who We
                  <br />
                  Work With
                </h2>
              </div>

              {/* Right side - Logo grid (80% width) */}
              <div className="w-4/5">
                <div className="grid grid-cols-4 gap-x-12 gap-y-10">
                  {companyLogos.map((logo) => (
                    <div key={logo.id} className="flex items-center justify-center h-12">
                      <LogoImage
                        src={logo.src}
                        alt={logo.alt}
                        width={logo.width}
                        height={logo.height}
                        className={logo.className}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden relative">
          {/* Headshot Grid - 2x4 for mobile */}
          <div className="grid grid-cols-2 gap-0">
            {/* Show a diverse mix of images for mobile */}
            {[0, 1, 21, 22, 12, 13, 23, 24].map((index) => {
              const headshot = getHeadshot(index)
              return (
                <div key={`mobile-${index}`} className="aspect-square relative">
                  <Image src={headshot.src || "/placeholder.svg"} alt={headshot.alt} fill className="object-cover" />
                </div>
              )
            })}
          </div>

          {/* Gradient overlay - adjusted to be shorter */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,2.5) 40%, rgba(255,255,255,1) 100%)",
            }}
          ></div>

          {/* White section with title and logos */}
          <div className="bg-white py-12 px-6 relative z-10">
            {/* Title */}
            <h2 className="font-bodoniModa italic text-black text-4xl leading-tight mb-8">
              Who We
              <br />
              Work With
            </h2>

            {/* Logo grid */}
            <div className="grid grid-cols-2 gap-8">
              {companyLogos.map((logo) => (
                <div key={logo.id} className="flex items-center justify-center h-10">
                  <LogoImage
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    className={logo.className}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
