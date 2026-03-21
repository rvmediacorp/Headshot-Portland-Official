"use client"

import { useState } from "react"
import Image from "next/image"
import { useIsMobile } from "@/hooks/use-is-mobile"
import LazyVideo from "./lazy-video"

// Static data — defined outside component to avoid recreation on every render
const btsTestimonials = [
  {
    id: 1,
    name: "DUOLC EGNARO",
    title: "HR Manager, Thorn",
    image: "/images/bts-poster-1.webp",
    video: "https://uzg4tlsilgmbv9ew.public.blob.vercel-storage.com/ericabts-gdapab2Ib1OQ9NlnLYLVszr9iEZTtJ.mp4",
    text: "Simply an amazing experience. We got headshots for all 42 employees and everyone was impressed with their pictures. Easy, professional and efficient. Thank you!",
  },
  {
    id: 2,
    name: "SARA BRIDGES",
    title: "Real Estate Broker, Redfin",
    image: "/images/bts-poster-2.webp",
    video: "https://uzg4tlsilgmbv9ew.public.blob.vercel-storage.com/scottbts-fIkLZ2za3VT0gcgSeVpt4BwNT5gRYr.mp4",
    text: "Nathan did an amazing job! Lots of photos to choose from, gave artistic direction and helped us pick the best photos! 5star",
  },
  {
    id: 3,
    name: "MICHAEL CHEN",
    title: "Software Engineer, Tech Co.",
    image: "/images/bts-poster-3.webp",
    video: "https://uzg4tlsilgmbv9ew.public.blob.vercel-storage.com/ericabts2-hkzrTaQYgVchDgIKhJja9Em9YVCRLn.mp4",
    text: "Headshot Portland is one of the best photography companies I have ever done business with! Nathan and his team are incredibly helpful, and always on point with providing value. They work hard and it shows!",
  },
  {
    id: 4,
    name: "Daniel Mikhaylenko",
    title: "Quality Assurance, Bloom.io",
    image: "/images/bts-poster-4.webp",
    video: "https://uzg4tlsilgmbv9ew.public.blob.vercel-storage.com/scottbts2-zKAjN5TyX4qDPDKsLLa5DPTuXh8ITQ.mp4",
    text: "100% would recommend to anyone. They were able to work around my schedule and provide me quality headshots for LinkedIn quickly and professionally.",
  },
  {
    id: 5,
    name: "Trenten Cassity",
    title: "Sales, Nationwide Solar",
    image: "/images/bts-poster-5.webp",
    video: "https://uzg4tlsilgmbv9ew.public.blob.vercel-storage.com/scottbts3-1hRD912oKWNcGjO4gnnTQJEmmBOdkE.mp4",
    text: "Great experience working with Nathan; he is the man to go to for headshots and portraits in Portland. He took care of me and will definitely take good care of you!",
  },
  {
    id: 6,
    name: "Nicholas Long",
    title: "Concept Creation Manager, Nike",
    image: "/images/bts-poster-6.webp",
    video: "https://uzg4tlsilgmbv9ew.public.blob.vercel-storage.com/ericabts3-W0kvL0UA4QvygUUQmz6BaW3tixRedn.mp4",
    text: "Fast, professional, and friendly. First impressions are everything, and I needed a headshot for my LinkedIn -- Nathan's work lets me put my best food forward. Highly recommend. Thank you, Nathan!",
  },
]

export default function BehindTheScenesSection() {
  const isMobile = useIsMobile()
  const [playingVideo, setPlayingVideo] = useState<number | null>(1)

  const handleVideoPlay = (id: number) => {
    if (playingVideo === id) {
      setPlayingVideo(null)
      const videoElement = document.getElementById(`video-${id}`) as HTMLVideoElement
      const desktopVideoElement = document.getElementById(`video-desktop-${id}`) as HTMLVideoElement
      if (videoElement) {
        videoElement.pause()
        videoElement.muted = true
      }
      if (desktopVideoElement) {
        desktopVideoElement.pause()
        desktopVideoElement.muted = true
      }
    } else {
      setPlayingVideo(id)
      const videoElement = document.getElementById(`video-${id}`) as HTMLVideoElement
      const desktopVideoElement = document.getElementById(`video-desktop-${id}`) as HTMLVideoElement
      if (videoElement) {
        videoElement.muted = false
        videoElement.play()
      }
      if (desktopVideoElement) {
        desktopVideoElement.muted = false
        desktopVideoElement.play()
      }
    }
  }


  return (
    <div className="w-full px-[10px] my-[10px]">
      <section
        className="w-full rounded-[10px] bg-[#FDF0E1]"
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
          <h2 className="font-bodoniModa text-4xl md:text-5xl lg:text-6xl mb-12 md:mb-16">
            <span className="text-[#247BA0]">See</span> <span className="text-black">Behind the Scenes</span>
          </h2>

          {/* BTS Grid - Mobile Layout */}
          <div className="md:hidden space-y-6">
            {btsTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="rounded-[16px] overflow-hidden border border-[#1D1C1D] transition-colors duration-300 group bg-[#FDF0E1] hover:bg-[#1D1C1D]"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "16px",
                  gap: "16px",
                }}
              >
                <div className="flex mb-4">
                  <span className="text-black group-hover:text-white text-6xl font-serif">&ldquo;</span>
                </div>
                <p className="text-black group-hover:text-white text-base mb-6">{testimonial.text}</p>
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    {testimonial.id === 1 ? (
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tom%20d%20review-59oHDkOtVfdFAuaxUtUBy8psOUZcM7.png"
                        alt="Tom Danowski"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    ) : testimonial.id === 2 ? (
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/barbara%20review-Ydx55Ef2INh3EUP6Np934hwYcHhIDY.png"
                        alt="Barbara Potter"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    ) : testimonial.id === 3 ? (
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/brandon%20review%20-a87qNCLI52zoayZbu1XtdfOtME84qk.png"
                        alt="Brandon Stoehr"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    ) : testimonial.id === 4 ? (
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dan%20review-rhk0ofjtSwvFr1c8glfx5S84b7kY83.png"
                        alt="Daniel Mikhaylenko"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    ) : testimonial.id === 5 ? (
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/trenten%20review%20-J8CQDQdwzE1bKtWyMcu9reiKRy0pR8.png"
                        alt="Trenten Cassity"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    ) : testimonial.id === 6 ? (
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/93150990e95fda9dd00a0d503c66b57e-sm-Oqd1kagALN2reIS6ZotUXJlW3KEX4t.jpeg"
                        alt="Nicholas Long"
                        width={40}
                        height={40}
                        className="object-cover object-center w-full h-full"
                        style={{ objectPosition: "0 10%" }}
                      />
                    ) : (
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="text-black group-hover:text-white font-bodoniModa italic text-xl">
                      {testimonial.id === 1
                        ? "Tom Danowski"
                        : testimonial.id === 2
                          ? "Barbara Potter"
                          : testimonial.id === 3
                            ? "Brandon Stoehr"
                            : testimonial.name}
                    </h3>
                    <p className="text-black group-hover:text-white text-sm">
                      {testimonial.id === 1
                        ? "Marketing, Ziply Fiber"
                        : testimonial.id === 2
                          ? "Mother Of Client"
                          : testimonial.id === 3
                            ? "DJ, Julius The PRofit"
                            : testimonial.title}
                    </p>
                  </div>
                </div>
                <div className="mt-auto rounded-lg overflow-hidden">
                  <div className="aspect-[9/16] relative">
                    {testimonial.video ? (
                      <LazyVideo
                        src={testimonial.video}
                        poster={testimonial.image || "/placeholder.svg"}
                        className="w-full h-full"
                      />
                    ) : (
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={`Behind the scenes with ${testimonial.name}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* BTS Grid - Desktop Layout with video on left */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6">
            {btsTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="rounded-[16px] overflow-hidden border border-[#1D1C1D] transition-colors duration-300 group cursor-pointer bg-[#FDF0E1] hover:bg-[#1D1C1D]"
                style={{
                  display: "flex",
                  height: "440px",
                  padding: "16px",
                  alignItems: "center",
                  gap: "16px",
                  flex: "1 0 0",
                }}
              >
                {/* Left side - Video */}
                <div className="w-[40%] h-full relative rounded-lg overflow-hidden">
                  <div className="aspect-[9/16] h-full relative">
                    {testimonial.video ? (
                      <LazyVideo
                        src={testimonial.video}
                        poster={testimonial.image || "/placeholder.svg"}
                        className="w-full h-full"
                      />
                    ) : (
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={`Behind the scenes with ${testimonial.name}`}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>

                {/* Right side - Text content */}
                <div className="w-[60%] p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex mb-4">
                      <span className="text-black group-hover:text-white text-6xl font-serif">&ldquo;</span>
                    </div>
                    {testimonial.id === 1 ? (
                      <p className="text-black group-hover:text-white text-base">
                        Got to work with Nathan last week on some head shots and I absolutely loved how they turned out
                        Highly recommended. He also shoots with the camera tether to the computer so we can review The
                        photos together in real time which is amazing
                      </p>
                    ) : testimonial.id === 3 ? (
                      <p className="text-black group-hover:text-white text-base">
                        Headshot Portland is one of the best photography companies I have ever done business with!
                        Nathan and his team are incredibly helpful, and always on point with providing value. They work
                        hard and it shows!
                      </p>
                    ) : testimonial.id === 4 ? (
                      <p className="text-black group-hover:text-white text-base">
                        100% would recommend to anyone. They were able to work around my schedule and provide me quality
                        headshots for LinkedIn quickly and professionally.
                      </p>
                    ) : (
                      <p className="text-black group-hover:text-white text-base">{testimonial.text}</p>
                    )}
                  </div>
                  <div className="flex items-center mt-6">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      {testimonial.id === 2 ? (
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/barbara%20review-Ydx55Ef2INh3EUP6Np934hwYcHhIDY.png"
                          alt="Barbara Potter"
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      ) : testimonial.id === 3 ? (
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/brandon%20review%20-a87qNCLI52zoayZbu1XtdfOtME84qk.png"
                          alt="Brandon Stoehr"
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      ) : testimonial.id === 4 ? (
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dan%20review-rhk0ofjtSwvFr1c8glfx5S84b7kY83.png"
                          alt="Daniel Mikhaylenko"
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      ) : testimonial.id === 5 ? (
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/trenten%20review%20-J8CQDQdwzE1bKtWyMcu9reiKRy0pR8.png"
                          alt="Trenten Cassity"
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      ) : testimonial.id === 6 ? (
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/93150990e95fda9dd00a0d503c66b57e-sm-Oqd1kagALN2reIS6ZotUXJlW3KEX4t.jpeg"
                          alt="Nicholas Long"
                          width={40}
                          height={40}
                          className="object-cover w-full h-full"
                          style={{ objectPosition: "0 10%" }}
                        />
                      ) : (
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tom%20d%20review-59oHDkOtVfdFAuaxUtUBy8psOUZcM7.png"
                          alt="Tom Danowski"
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="text-black group-hover:text-white font-bodoniModa italic text-xl">
                        {testimonial.id === 2
                          ? "Barbara Potter"
                          : testimonial.id === 3
                            ? "Brandon Stoehr"
                            : testimonial.id === 4
                              ? "Daniel Mikhaylenko"
                              : testimonial.id === 5
                                ? "Trenten Cassity"
                                : testimonial.id === 6
                                  ? "Nicholas Long"
                                  : "Tom Danowski"}
                      </h3>
                      <p className="text-black group-hover:text-white text-sm">
                        {testimonial.id === 2
                          ? "Mother Of Client"
                          : testimonial.id === 3
                            ? "DJ, Julius The PRofit"
                            : testimonial.id === 4
                              ? "Quality Assurance, Bloom.io"
                              : testimonial.id === 5
                                ? "Sales, Nationwide Solar"
                                : testimonial.id === 6
                                  ? "Concept Creation Manager, Nike"
                                  : "Marketing, Ziply Fiber"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
