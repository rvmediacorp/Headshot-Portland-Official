"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function LatestWorkSection() {
  // Latest work data
  const latestWork = [
    {
      id: 1,
      title: "SCOTT S. MODEL HEADSHOTS",
      date: "JULY 2024",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/scott-headshot-2762-Edit.jpg-M177oNqrB9AnJrABF7eO0cFI2jjdpl.jpeg",
      link: "/portfolio/scott-thorne",
    },
    {
      id: 2,
      title: "AMPF COMPANY HEADSHOTS & BRANDING",
      date: "AUGUST 2024",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/09.10.24-ampf-branding0399.jpg-usr0323YT4ZLYMikVQhPrVkiviMtUI.jpeg",
      link: "/portfolio/ampf-branding",
    },
    {
      id: 3,
      title: "CAMERON HANSEN LAW HEADSHOTS",
      date: "JANUARY 2025",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cameron-headshot0916%202.jpg-BjeNsId3lmDyjwFANUVLPz4qtX1Abe.jpeg",
      link: "/portfolio/cameron-hansen",
    },
  ]

  return (
    <div className="w-full px-[10px] my-[10px]">
      <section
        className="w-full rounded-[10px] bg-[#0F0E0F]"
        style={{
          display: "flex",
          padding: "116px 10px",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Section Heading */}
          <h2 className="font-bodoniModa italic text-[#5AAFCC] text-4xl md:text-5xl lg:text-6xl mb-12 md:mb-16 text-center">
            OUR LATEST WORK
          </h2>

          {/* Latest Work Grid - Desktop */}
          <div className="hidden md:grid grid-cols-3 gap-8 mb-12">
            {latestWork.map((project) => (
              <div key={project.id} className="rounded-lg overflow-hidden bg-[#1C1B1C]">
                <div className="relative aspect-square">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={
                      project.id === 1
                        ? "Professional headshot of Scott Thorne in a blue linen shirt with a friendly smile"
                        : project.id === 2
                          ? "Professional photo of AMPF team members in a business meeting around a conference table with laptops"
                          : "Professional headshot of Cameron Hansen in a dark suit with glasses and a patterned tie"
                    }
                    fill
                    className={`object-cover ${project.id === 1 ? "object-[center_30%]" : ""}`}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <p className="text-[#5AAFCC] text-sm mb-2">{project.date}</p>
                  <h3 className="font-bodoniModa italic text-white text-2xl mb-4">{project.title}</h3>
                  <Link
                    href={
                      project.id === 2
                        ? "https://ww3.headshotportland.com/gallery/ampf-company-headshots-camas"
                        : project.id === 3
                          ? "https://ww3.headshotportland.com/gallery/cameron-hansen-law---headshot"
                          : project.id === 1
                            ? "https://ww3.headshotportland.com/galleries/scott-schoettgen"
                            : "https://ww3.headshotportland.com/gallery/jennifer-dolan---individual-session"
                    }
                    className="inline-flex items-center text-[#5AAFCC] border border-[#5AAFCC] rounded-full px-4 py-2"
                    aria-label={`See more photos from ${project.title}`}
                  >
                    <span className="mr-2">SEE MORE</span>
                    <span className="sr-only"> photos from {project.title}</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Latest Work Grid - Mobile */}
          <div className="md:hidden space-y-6 mb-12">
            {latestWork.map((project) => (
              <div key={project.id} className="rounded-lg overflow-hidden bg-[#1C1B1C]">
                <div className="relative aspect-square">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={
                      project.id === 1
                        ? "Professional headshot of Scott Thorne in a blue linen shirt with a friendly smile"
                        : project.id === 2
                          ? "Professional photo of AMPF team members in a business meeting around a conference table with laptops"
                          : "Professional headshot of Cameron Hansen in a dark suit with glasses and a patterned tie"
                    }
                    fill
                    className={`object-cover ${project.id === 1 ? "object-[center_30%]" : ""}`}
                    sizes="100vw"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[#5AAFCC] text-xs mb-1">{project.date}</p>
                  <h3 className="font-bodoniModa italic text-white text-xl mb-3">{project.title}</h3>
                  <Link
                    href={
                      project.id === 2
                        ? "https://ww3.headshotportland.com/gallery/ampf-company-headshots-camas"
                        : project.id === 1
                          ? "https://ww3.headshotportland.com/galleries/scott-schoettgen"
                          : project.id === 3
                            ? "https://ww3.headshotportland.com/gallery/cameron-hansen-law---headshot"
                            : project.link
                    }
                    className="inline-flex items-center text-[#5AAFCC] border border-[#5AAFCC] rounded-full px-3 py-1.5 text-sm"
                    aria-label={`See more photos from ${project.title}`}
                  >
                    <span className="mr-1">SEE MORE</span>
                    <span className="sr-only"> photos from {project.title}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* View Gallery Button */}
          <div className="flex justify-center mb-8">
            <Link href="/gallery" className="bg-[#1e7a96] text-white font-bold py-3 px-8 rounded-full text-center">
              VIEW GALLERY
            </Link>
          </div>

          {/* Instagram Link */}
          <div className="text-center text-white">
            <p>
              Follow us on{" "}
              <Link
                href="https://www.instagram.com/headshotportland/"
                className="text-[#5AAFCC] underline decoration-[#5AAFCC]"
              >
                Instagram
              </Link>{" "}
              to see more
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
