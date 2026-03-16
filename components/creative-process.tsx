"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function CreativeProcess() {
  const [videoError, setVideoError] = useState(false)
  const [video2Error, setVideo2Error] = useState(false)

  return (
    <div className="w-full px-[10px] my-[10px]">
      <section
        className="w-full rounded-[10px] bg-white"
        style={{
          display: "flex",
          padding: "116px 10px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "66px",
        }}
      >
        <div className="w-full max-w-6xl mx-auto">
          {/* Header with title and button */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 md:mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 md:mb-0 font-bodoniModa italic">
              <span className="text-black">Our </span>
              <span className="text-teal-blue">Creative Process</span>
            </h2>
            <Link href="/faq" className="flex items-center group focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none rounded">
              <span className="font-inter font-bold mr-2 border-b border-black text-black" style={{ fontSize: "16px" }}>
                EXPLORE COMMON QUESTIONS
              </span>
              <span className="bg-black rounded-full w-10 h-10 flex items-center justify-center" aria-hidden="true">
                <ArrowUpRight size={20} className="text-white" aria-hidden="true" />
              </span>
            </Link>
          </div>

          {/* Process Steps Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Step 1 */}
            <div className="bg-[#e2eff4] rounded-lg overflow-hidden relative flex flex-col h-full">
              <div className="p-6 md:p-8 flex-1 min-h-[180px]">
                <span className="text-teal-blue font-bodoniModa italic text-7xl md:text-8xl lg:text-9xl">1</span>
                <p className="text-black font-inter text-sm mt-4">
                  CLICK <span className="font-bold italic">&ldquo;GET FREE QUOTE&rdquo;</span> OR{" "}
                  <span className="font-bold italic">&ldquo;BOOK NOW&rdquo;</span> FROM ANYWHERE ON THE PAGE. CUSTOMIZE YOUR
                  SESSION, SCHEDULE YOUR SESSION, AND THEN YOU&apos;RE BOOKED! YOU&apos;LL RECEIVE AN EMAIL CONFIRMATION WITH
                  INFORMATION ON HOW TO REACH US, RESCHEDULE IF NEEDED, AND EVEN CANCEL SHOULD YOU HAVE TO.
                </p>
              </div>
              <div className="h-48 md:h-56 lg:h-64 mx-6 md:mx-8 mb-6 md:mb-8 rounded overflow-hidden relative">
                <video
                  className="w-full h-full object-cover rounded"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster="/images/gallery.jpeg"
                  onError={(e) => {
                    console.error("Video failed to load:", e)
                  }}
                >
                  <source
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FreeQuoteVid-ZxqKD59Mg2TDb5YkPvOLVe254OiWbr.mp4"
                    type="video/mp4"
                  />

                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-teal-blue"></div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#f0f0f0] rounded-lg overflow-hidden flex flex-col h-full">
              <div className="p-6 md:p-8 flex-1 min-h-[180px]">
                <span className="text-black font-bodoniModa italic text-7xl md:text-8xl lg:text-9xl">2</span>
                <p className="text-black font-inter text-sm mt-4">
                  ONCE YOU ARRIVE AT THE STUDIO, <span className="font-bold">WE&apos;LL WORK OUR MAGIC</span>. WE SPECIALIZE
                  IN <span className="font-bold">POSING & EXPRESSION COACHING</span>—AND WILL GUIDE YOU THOUGHT OUT THE
                  SESSION TO ENSURE WE CAPTURE YOUR BEST SMILES AND POSES ON CAMERA.
                </p>
              </div>
              <div className="h-48 md:h-56 lg:h-64 mx-6 md:mx-8 mb-6 md:mb-8 rounded overflow-hidden relative">
                {!video2Error ? (
                  <video
                    className="w-full h-full object-cover rounded"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster="/images/gallery.jpeg"
                    onError={() => setVideo2Error(true)}
                  >
                    <source
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/posing-DVtao2rZVTGCE0xaa7vQlezNpVpvxP.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  /* Fallback if video fails to load */
                  <div className="w-full h-full bg-[#dadada] rounded"></div>
                )}
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#f0f0f0] rounded-lg overflow-hidden flex flex-col h-full">
              <div className="p-6 md:p-8 flex-1 min-h-[180px]">
                <span className="text-black font-bodoniModa italic text-7xl md:text-8xl lg:text-9xl">3</span>
                <p className="text-black font-inter text-sm mt-4">
                  CHECK OUT YOUR PHOTOS ON THE SPOT—WE&apos;LL TAKE AS MANY AS YOU&apos;D LIKE UNTIL YOU&apos;RE HAPPY WITH YOUR
                  PHOTOS: <span className="font-bold">UNLIMITED PHOTOS AND NO TIME LIMIT</span> ON YOUR SESSION. WE&apos;LL
                  HELP YOU SELECT YOUR FAVORITE PHOTOS, WHICH WILL BE DELIVERED{" "}
                  <span className="font-bold">JUST 24-48 HOURS LATER</span>.
                </p>
              </div>
              <div className="h-48 md:h-56 lg:h-64 mx-6 md:mx-8 mb-6 md:mb-8 rounded overflow-hidden relative">
                <video
                  className="w-full h-full object-cover rounded"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster="/images/gallery.jpeg"
                  onError={(e) => {
                    console.error("Video failed to load:", e)
                  }}
                >
                  <source
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Images%20-nkHOqGrFlkSZVMHJXsgfOx6U7XkdMD.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Step 4 - Now with MP4 video */}
            <div className="bg-[#f0f0f0] rounded-lg overflow-hidden flex flex-col h-full">
              <div className="p-6 md:p-8 flex-1 min-h-[180px]">
                <span className="text-black font-bodoniModa italic text-7xl md:text-8xl lg:text-9xl">4</span>
                <p className="text-black font-inter text-sm mt-4">
                  <span className="font-bold">WITHIN 48 HOURS</span>, YOU&apos;LL BE ABLE TO DOWNLOAD, SAVE AND REVIEW THE
                  IMAGES AND USE THEM FOR SOCIAL MEDIA, WEB, PROMOTION, MARKETING, PRINT, AND MORE!
                </p>
              </div>
              <div className="h-48 md:h-56 lg:h-64 mx-6 md:mx-8 mb-6 md:mb-8 rounded overflow-hidden relative">
                {/* MP4 Video */}
                {!videoError ? (
                  <video
                    className="w-full h-full object-cover rounded"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster="/images/gallery.jpeg"
                    onError={() => setVideoError(true)}
                  >
                    <source
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/EricasGalleryBest1-WQn3tFv86mOGLqXayUDOVrCF6Z2Qld.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  /* Fallback image if video fails to load */
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/gallery.jpeg"
                      alt="Gallery of professional headshots showing final delivered images"
                      fill
                      className="object-cover rounded"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading="eager"
                    />
                    {/* Video play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded">
                      <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-black"
                        >
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
