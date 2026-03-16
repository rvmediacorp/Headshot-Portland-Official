"use client"

import Image from "next/image"
import { useIsMobile } from "@/hooks/use-is-mobile"

export default function ClientTestimonialsSection() {
  const isMobile = useIsMobile()

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Mitzyn Pierce",
      title: "Director, Community Relations, Seattle Mariners",
      image: "/placeholder.svg?height=400&width=300",
      rating: 5,
      isVideo: true,
      isGoogle: false,
      text: "I needed new professional headshots and Nathan's work is absolute fantastic! The shoot was fun, relaxed, and Nathan captured my vision, he is a fantastic photographer!",
    },
    {
      id: 2,
      name: "Samrat Chowdhury",
      title: "",
      image: "/placeholder.svg?height=400&width=300",
      rating: 5,
      isVideo: false,
      isGoogle: true,
      text: "Best ever experience with photobooth box and love the support as well. Thanks to micah specially and nathan for communication and give me a best experience the holiday event ❤️",
    },
    {
      id: 3,
      name: "Tina Powell",
      title: "",
      image: "/placeholder.svg?height=400&width=300",
      rating: 5,
      isVideo: true,
      isGoogle: false,
      text: "I needed new professional headshots and Nathan's work is absolute fantastic! The shoot was fun, relaxed, and Nathan captured my vision, he is a fantastic photographer!",
    },
    {
      id: 4,
      name: "Mariah West",
      title: "Old West Museum",
      image: "/placeholder.svg?height=400&width=300",
      rating: 5,
      isVideo: true,
      isGoogle: false,
      text: "I needed new professional headshots and Nathan's work is absolute fantastic! The shoot was fun, relaxed, and Nathan captured my vision, he is a fantastic photographer!",
    },
    {
      id: 5,
      name: "Tayler Doffner",
      title: "Event Manager - Event's & Adventures Seattle",
      image: "/placeholder.svg?height=400&width=300",
      rating: 5,
      isVideo: true,
      isGoogle: false,
      text: "I needed new professional headshots and Nathan's work is absolute fantastic! The shoot was fun, relaxed, and Nathan captured my vision, he is a fantastic photographer!",
    },
    {
      id: 6,
      name: "Megan Beaty",
      title: "",
      image: "/placeholder.svg?height=400&width=300",
      rating: 5,
      isVideo: false,
      isGoogle: true,
      text: "Amazing photobooths and attendants! Great communication and attention to detail. Everything went very smooth. Thank you Perfect Booth!",
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
          <h2 className="font-bodoniModa italic text-[#247BA0] text-4xl md:text-5xl lg:text-6xl mb-12 md:mb-16 text-center">
            What Our Clients Say
          </h2>

          {/* Testimonial Masonry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-[#1C1B1C] rounded-lg overflow-hidden">
                {/* Review Header */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-[#FEA500]">
                            ★
                          </span>
                        ))}
                      </div>
                      <h3 className="text-white font-bodoniModa italic text-2xl">
                        {testimonial.id === 1 ? "Tom Danowski" : testimonial.name}
                      </h3>
                      {testimonial.title && <p className="text-white text-sm mt-1">{testimonial.title}</p>}
                    </div>
                    {testimonial.isGoogle && (
                      <Image
                        src="/images/google-logo-new.png"
                        alt="Google icon"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                    )}
                  </div>

                  {/* Review Text */}
                  <p className="text-white">
                    {testimonial.id === 1 ? (
                      <>
                        Nathan did an amazing job! Lots of photos to choose from, gave artistic direction and helped us
                        pick the best photos! 5star
                      </>
                    ) : (
                      <>
                        <span className="font-bold">Got to work with Nathan</span> last week on some head shots and I
                        absolutely loved how they turned out. Highly recommended. He also shoots with the camera tether
                        to the computer so we can review the photos together in real time which is amazing.
                      </>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Video CTA Section - Using inline SVG with mobile/desktop versions */}
          <div className="relative mb-8">
            <div className="relative w-full" style={{ height: isMobile ? "299px" : "168px" }}>
              {/* Desktop SVG - hidden on mobile */}
              {!isMobile && (
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 1261 168"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid meet"
                  className="absolute inset-0 hidden md:block"
                >
                  <g clipPath="url(#clip0_2897_493)">
                    <rect width="1261" height="168" rx="9" fill="white" fillOpacity="0.06" />
                    <circle cx="1110" cy="85" r="395" fill="#247BA0" fillOpacity="0.1" />
                    <circle cx="1110" cy="85" r="312" fill="#247BA0" fillOpacity="0.1" />
                    <circle cx="1110" cy="85" r="233" fill="#247BA0" />
                  </g>
                  <rect x="0.5" y="0.5" width="1260" height="167" rx="8.5" stroke="url(#paint0_linear_2897_493)" />
                  <defs>
                    <linearGradient
                      id="paint0_linear_2897_493"
                      x1="38.9074"
                      y1="-34.4999"
                      x2="248.733"
                      y2="111.033"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#247BA0" />
                      <stop offset="0.5" stopColor="#247BA0" stopOpacity="0" />
                      <stop offset="1" stopColor="#247BA0" stopOpacity="0.06" />
                    </linearGradient>
                    <clipPath id="clip0_2897_493">
                      <rect width="1261" height="168" rx="9" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              )}

              {/* Mobile SVG - hidden on desktop */}
              {isMobile && (
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 326 299"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid meet"
                  className="absolute inset-0 md:hidden"
                >
                  <g clipPath="url(#clip0_2903_737)">
                    <rect width="326" height="299" rx="9" fill="white" fillOpacity="0.06" />
                    <circle cx="163" cy="364" r="357" fill="#247BA0" fillOpacity="0.1" />
                    <circle cx="163" cy="364" r="281.985" fill="#247BA0" fillOpacity="0.1" />
                    <circle cx="163" cy="363.999" r="210.585" fill="#247BA0" />
                  </g>
                  <rect x="0.5" y="0.5" width="325" height="298" rx="8.5" stroke="url(#paint0_linear_2903_737)" />
                  <defs>
                    <linearGradient
                      id="paint0_linear_2903_737"
                      x1="10.0585"
                      y1="-61.4015"
                      x2="89.5918"
                      y2="-53.3886"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#247BA0" />
                      <stop offset="0.5" stopColor="#247BA0" stopOpacity="0" />
                      <stop offset="1" stopColor="#247BA0" stopOpacity="0.06" />
                    </linearGradient>
                    <clipPath id="clip0_2903_737">
                      <rect width="326" height="299" rx="9" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              )}

              {/* Content - Different layouts for mobile and desktop */}
              {isMobile ? (
                <div className="absolute inset-0 flex flex-col items-center justify-between p-6 z-10">
                  <h3 className="font-bodoniModa italic text-[#247BA0] text-2xl text-center mt-6">
                    Watch what clients say
                    <br /> about our experience
                  </h3>
                  <button className="bg-white text-black font-bold py-3 px-10 rounded-full hover:bg-gray-100 transition-colors mb-6 focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none"
                    aria-label="Play client testimonial video"
                    onKeyDown={(e) => e.key === 'Enter' || e.key === ' ' ? e.currentTarget.click() : null}>
                    PLAY VIDEO
                  </button>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between p-6 md:p-8 z-10">
                  <h3 className="font-bodoniModa italic text-[#247BA0] text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-0 ml-6">
                    Watch what clients say
                    <br /> about our experience
                  </h3>
                  <button className="bg-white text-black font-bold py-3 px-10 rounded-full hover:bg-gray-100 transition-colors mr-6 focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none"
                    aria-label="Play client testimonial video"
                    onKeyDown={(e) => e.key === 'Enter' || e.key === ' ' ? e.currentTarget.click() : null}>
                    PLAY VIDEO
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
