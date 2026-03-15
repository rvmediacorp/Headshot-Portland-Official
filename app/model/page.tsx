"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Instagram, Facebook, Star } from "lucide-react"
import { useState, useCallback, useEffect } from "react"
import styles from "./model.module.css"
import GoogleAnalytics from "@/components/google-analytics"

export default function ModelPage() {
  // Gallery items array — replace these with model portfolio images
  const galleryItems = [
    {
      id: 1,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-AB8I9699-Edit.jpg",
      alt: "Model portfolio photography example",
    },
    {
      id: 2,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-8-27-angela-headshot-3304-Edit-2.jpg",
      alt: "Model portfolio photography example",
    },
    {
      id: 3,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-angel-headshot-session2294.jpg",
      alt: "Model portfolio photography example",
    },
    {
      id: 4,
      type: "video",
      src: "https://rvideo.b-cdn.net/headshot-website-videos/headshot-photographer-portland-oregon.mp4",
      poster: "/images/headshots-gallery/erica-headshot-portland_sm.jpeg",
      name: "Erica Carnrite",
      title: "VP Head of Data, Medtronic.",
      quote:
        "I needed new professional headshots and Nathan's work is absolute fantastic! The shoot was fun, relaxed, and Nathan captured my vision, he is a fantastic photographer!",
    },
    {
      id: 5,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-8-27-megan-headshot-3890-Edit.jpg",
      alt: "Model portfolio photography example",
    },
    {
      id: 6,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-AB8I0521-2-Edit.jpg",
      alt: "Model portfolio photography example",
    },
    {
      id: 7,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-amy-headshot-2033-Edit-3.jpg",
      alt: "Model portfolio photography example",
    },
    {
      id: 8,
      type: "video",
      src: "https://rvideo.b-cdn.net/headshot-website-videos/mark%20headshot%20testimonial.mp4",
      poster: "/images/headshots-gallery/mark-headshot-portland-professional.jpg",
      name: "Mark Johnson",
      title: "Business Development Manager",
      quote:
        "I needed new professional headshots and Nathan's work is absolute fantastic! The shoot was fun, relaxed, and Nathan captured my vision, he is a fantastic photographer!",
    },
    {
      id: 9,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-Andy-headshot-5257-Edit-3.jpg",
      alt: "Model portfolio photography example",
    },
    {
      id: 10,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-abby-931-Edit-Edit-2.jpg",
      alt: "Model portfolio photography example",
    },
    {
      id: 11,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-austyn-lee-headshot-757-Edit-2.jpg",
      alt: "Model portfolio photography example",
    },
    {
      id: 12,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-apple headshot photographer.jpg",
      alt: "Model portfolio photography example",
    },
    {
      id: 13,
      type: "testimonial",
      name: "Tom Danowski",
      title: "VP Content Marketing, Ziply Fiber",
      quote:
        "Nathan did an amazing job with my headshot studio shoot. Lots of photos to choose from, gave artistic direction and helped us pick the best photos for the new website! 5stars! Thank You!",
      avatar: "/images/profile photos/tom-danowski-headshot.jpg",
    },
    {
      id: 14,
      type: "cta",
      title: "Get Free Quote",
      text: "Click here to get a quick and easy quote for your model portfolio session",
      url: "https://ww3.headshotportland.com/instant-quote",
      color: "blue",
    },
    {
      id: 15,
      type: "video",
      src: "https://rvideo.b-cdn.net/headshot-website-videos/emily%20walton%20headshot%20testimonial.mp4",
      poster:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/emily-walton-portland-headshot-thumbnail.jpg-JONRXlFgbv3F8tWYI2x6C8z5QcXeU9.jpeg",
      name: "Emily Walton",
      title: "Marketing Specialist, Creative Solutions",
      quote:
        "I needed new professional headshots and Nathan's work is absolute fantastic! The shoot was fun, relaxed, and Nathan captured my vision, he is a fantastic photographer!",
    },
    {
      id: 16,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-bay area headshot.jpg",
      alt: "Model portfolio photography example",
    },
    {
      id: 17,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-cheryl-233-Edit.jpg",
      alt: "Model portfolio photography example",
    },
    {
      id: 18,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-chris--5.jpg",
      alt: "Model portfolio photography example",
    },
    {
      id: 19,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-Colby columbia wealth3545 1 1.jpg",
      alt: "Model portfolio photography example",
    },
    {
      id: 20,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-colby--5.jpg",
      alt: "Model portfolio photography example",
    },
    {
      id: 21,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-colby--6.jpg",
      alt: "Model portfolio photography example",
    },
    {
      id: 22,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-eddie-headshot3156.jpg",
      alt: "Model portfolio photography example",
    },
    {
      id: 23,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-emily-headshot-04-03-253415.jpg",
      alt: "Model portfolio photography example",
    },
    {
      id: 24,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-erica headshot retouch-12415-2.jpg",
      alt: "Model portfolio photography example",
    },
    {
      id: 25,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-erica headshot retouch-12778-2.jpg",
      alt: "Model portfolio photography example",
    },
    {
      id: 26,
      type: "cta",
      title: "Book Your Session",
      text: "Ready to schedule? Book your model portfolio session directly on our calendar",
      url: "https://ww3.headshotportland.com/instant",
      color: "green",
    },
  ]

  const [allLoaded, setAllLoaded] = useState(false)

  useEffect(() => {
    setAllLoaded(true)
  }, [])

  // Function to handle image errors and provide fallbacks
  const getImageSrc = useCallback((src) => {
    if (!src || typeof src !== "string" || src.includes("undefined")) {
      return "/confident-professional.png"
    }
    return src
  }, [])

  // Handle video playback
  const handleVideoPlay = useCallback((id) => {
    const videoEl = document.getElementById(`video-${id}`) as HTMLVideoElement
    const thumbnailEl = document.getElementById(`thumbnail-${id}`)

    if (videoEl) {
      if (thumbnailEl) {
        thumbnailEl.style.display = "none"
      }

      if (videoEl.muted) {
        videoEl.muted = false
        videoEl.play().catch((error) => {
          console.error("Error playing video:", error)
          videoEl.muted = true
          videoEl.play().catch((err) => console.error("Still can't play:", err))
        })
      } else if (videoEl.paused) {
        videoEl
          .play()
          .then(() => {
            videoEl.muted = false
            if (thumbnailEl) {
              thumbnailEl.style.display = "none"
            }
          })
          .catch((error) => {
            console.error("Error playing video:", error)
            videoEl.muted = true
            videoEl.play().catch((err) => console.error("Still can't play:", err))
          })
      } else {
        videoEl.pause()
        videoEl.muted = true
        if (thumbnailEl) {
          thumbnailEl.style.display = "block"
        }
      }
    }
  }, [])

  // Force autoplay for all videos on mobile Safari
  useEffect(() => {
    const videoElements = document.querySelectorAll("video")
    videoElements.forEach((video) => {
      video.muted = true
      video.setAttribute("playsinline", "")
      video.setAttribute("muted", "")
      video.playsInline = true

      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Autoplay prevented:", error)
        })
      }
    })
  }, [allLoaded])

  return (
    <main className={styles.container}>
      <GoogleAnalytics />
      {/* Header and Hero Section */}
      <div className="w-full px-[10px] my-[10px]">
        <section
          className="w-full rounded-[10px] bg-[#247BA0]"
          style={{
            display: "flex",
            padding: "0px 0px",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {/* Header */}
          <header className="w-full text-white py-6 px-4 md:px-8 lg:px-16">
            <div className="container mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0">
                  <Link href="/" className="block">
                    <div className="w-24 h-8 relative">
                      <Image
                        src="/images/headshotportlandwhitelogo.png"
                        alt="Headshot Portland"
                        fill
                        priority
                        className="object-contain"
                      />
                    </div>
                  </Link>
                </div>
                <nav>
                  <ul className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
                    <li>
                      <Link href="/headshots" className="hover:underline">
                        HEADSHOTS
                      </Link>
                    </li>
                    <li>
                      <Link href="/portraits" className="hover:underline">
                        PORTRAITS
                      </Link>
                    </li>
                    <li>
                      <Link href="/for-teams" className="hover:underline">
                        FOR TEAMS
                      </Link>
                    </li>
                    <li>
                      <Link href="/grad" className="hover:underline">
                        GRAD
                      </Link>
                    </li>
                    <li>
                      <Link href="/model" className="bg-white text-[#247BA0] px-4 py-2 rounded">
                        MODEL
                      </Link>
                    </li>
                    <li>
                      <Link href="/about" className="hover:underline">
                        ABOUT
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="hover:underline">
                        CONTACT
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <div className="w-full text-white py-16 md:py-24 px-4 md:px-8 lg:px-16">
            <div className="container mx-auto text-center">
              <h1 className="font-bodoniModa text-4xl md:text-5xl lg:text-6xl mb-6 tracking-wide">
                MODEL PORTFOLIO GALLERY
              </h1>
              <p className="font-playfair text-xl md:text-2xl mb-12">Professional model portfolios that get you noticed</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="https://ww3.headshotportland.com/instant-quote"
                  className="bg-white text-[#247BA0] px-6 py-3 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                >
                  <span className="font-bold">GET FREE QUOTE</span>
                  <div className="bg-[#247BA0] rounded-full p-1">
                    <ArrowUpRight className="h-4 w-4 text-white" />
                  </div>
                </Link>
                <Link
                  href="https://ww3.headshotportland.com/instant"
                  className="border border-white text-white px-6 py-3 rounded-md flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                >
                  <span className="font-bold">BOOK NOW</span>
                  <div className="bg-white/20 rounded-full p-1">
                    <ArrowUpRight className="h-4 w-4 text-white" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Gallery Section */}
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
          <div className="container mx-auto px-4 max-w-6xl">
            {/* Section Title */}
            <h2 className="text-3xl md:text-4xl font-bodoniModa italic text-[#247BA0] text-center mb-12">
              Our Latest Work
            </h2>

            {/* Masonry Gallery */}
            <div className={styles.masonryContainer}>
              <div className={styles.masonryGrid}>
                {galleryItems.map((item) => (
                  <div key={item.id} className={styles.masonryItem}>
                    {item.type === "image" && (
                      <img
                        src={getImageSrc(item.src) || "/placeholder.svg"}
                        alt={item.alt || "Gallery image"}
                        className={styles.masonryImage}
                      />
                    )}

                    {item.type === "testimonial" && (
                      <div className={styles.testimonialItem}>
                        <div className="flex mb-3 sm:mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-[#FFA500] fill-[#FFA500]" />
                          ))}
                        </div>
                        <div className="mb-3 sm:mb-4">
                          <div className="flex items-start gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden flex-shrink-0 hidden sm:block">
                              {item.id === 13 && (
                                <img
                                  src="/images/profile photos/tom-danowski-headshot.jpg"
                                  alt="Tom Danowski"
                                  className="w-full h-full object-cover"
                                />
                              )}
                              {item.id !== 13 && item.avatar && (
                                <img
                                  src={getImageSrc(item.avatar) || "/placeholder.svg"}
                                  alt={`${item.name} avatar`}
                                  className="w-full h-full object-cover"
                                />
                              )}
                              {item.id !== 13 && !item.avatar && (
                                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                                  <span className="text-xs text-gray-500">Avatar</span>
                                </div>
                              )}
                            </div>
                            <div>
                              <h3 className="text-lg sm:text-xl font-bodoniModa italic text-white">{item.name}</h3>
                              <p className="text-xs sm:text-sm text-gray-400">{item.title}</p>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm sm:text-base text-white">
                          {item.quote ||
                            "I needed new professional headshots and Nathan's work is absolute fantastic! The shoot was fun, relaxed, and Nathan captured my vision, he is a fantastic photographer!"}
                        </p>
                      </div>
                    )}

                    {item.type === "video" && (
                      <div className="flex flex-col">
                        {/* Video container */}
                        <div className={styles.videoTestimonialItem} onClick={() => handleVideoPlay(item.id)}>
                          {/* Video element */}
                          <video
                            id={`video-${item.id}`}
                            src={item.src}
                            className={styles.videoThumbnail}
                            poster={item.poster}
                            preload="metadata"
                            playsInline
                            muted
                            loop
                            autoPlay
                            onLoadedMetadata={(e) => {
                              const video = e.currentTarget
                              video.muted = true
                              video.play().catch((err) => {
                                console.log("Autoplay prevented:", err)
                                const thumbnailEl = document.getElementById(`thumbnail-${item.id}`)
                                if (thumbnailEl) thumbnailEl.style.display = "block"
                              })
                            }}
                          />

                          {/* Thumbnail image */}
                          <img
                            id={`thumbnail-${item.id}`}
                            src={getImageSrc(item.poster) || "/placeholder.svg"}
                            alt={`${item.name} video testimonial`}
                            className={`${styles.videoThumbnail} hidden`}
                          />

                          {/* Gradient overlay */}
                          <div className={styles.videoOverlay}></div>

                          {/* Play button */}
                          <div className={styles.playButton}>
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M8 5V19L19 12L8 5Z" fill="white" />
                            </svg>
                          </div>

                          {/* Content overlay */}
                          <div className={styles.videoContent}>
                            {/* Star rating */}
                            <div className={styles.starRating}>
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                </svg>
                              ))}
                            </div>

                            {/* Name and title */}
                            <h3 className={styles.videoName}>{item.name}</h3>
                            <p className={styles.videoTitle}>{item.title}</p>
                          </div>
                        </div>

                        {/* Testimonial text */}
                        {item.id === 15 ? (
                          <div className="bg-[#1C1B1C] p-4 rounded-b-lg">
                            <p className="text-white text-sm">
                              <strong>The experience was amazing!</strong> Nathan made me feel so comfortable during the
                              shoot. He has a great eye for lighting and poses that flatter everyone. I'm thrilled with
                              my new headshots!
                            </p>
                          </div>
                        ) : item.id === 8 ? (
                          <div className="bg-[#1C1B1C] p-4 rounded-b-lg">
                            <p className="text-white text-sm">
                              <strong>Working with Nathan was fantastic!</strong> He guided me through the whole process
                              and made it fun. The photos turned out better than I expected, and I've already received
                              compliments on my new LinkedIn profile.
                            </p>
                          </div>
                        ) : item.id === 4 ? (
                          <div className="bg-[#1C1B1C] p-4 rounded-b-lg">
                            <p className="text-white text-sm">
                              <strong>As someone who hates being photographed,</strong> I was surprised by how
                              comfortable the session was. Nathan has a talent for bringing out natural expressions and
                              the results speak for themselves. Highly recommended!
                            </p>
                          </div>
                        ) : (
                          <div className="bg-[#1C1B1C] p-4 rounded-b-lg">
                            <p className="text-white text-sm">
                              <strong>The experience was fun and fast!</strong> Even though the first few photos were a
                              little tense, Nathan helped me to relax and get some images that are absolutely fantastic!
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {item.type === "cta" && (
                      <Link
                        href={item.url || "https://ww3.headshotportland.com/instant-quote"}
                        className={`${styles.ctaItem} cursor-pointer hover:bg-[#247BA0]/30 transition-colors`}
                      >
                        <h3 className="text-lg sm:text-xl font-bodoniModa italic text-white">{item.title}</h3>
                        <div className="mt-2 sm:mt-4">
                          <p className="text-xs sm:text-sm text-white mb-3 sm:mb-4 uppercase">{item.text}</p>
                          <div className="flex justify-end">
                            <div
                              className={`bg-[#247BA0] rounded-full p-1.5 sm:p-2 ${
                                item.color === "green"
                                  ? "bg-emerald-600"
                                  : item.color === "teal"
                                    ? "bg-teal-600"
                                    : item.color === "purple"
                                      ? "bg-purple-600"
                                      : "bg-[#247BA0]"
                              }`}
                            >
                              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
            <div className="flex items-center gap-8 mb-6 lg:mb-0">
              <div>
                <Link href="/" className="block">
                  <div className="w-[120px] h-[48px] relative">
                    <Image src="/images/logo.png" alt="Headshot Portland" fill className="object-contain" />
                  </div>
                </Link>
              </div>
              <div className="hidden lg:block h-12 w-px bg-gray-700"></div>
              <div className="text-center lg:text-left">
                <p className="uppercase text-sm font-medium">Portland's top full-service</p>
                <p className="uppercase text-sm font-medium">headshot & portrait</p>
                <p className="uppercase text-sm font-medium">photography studio</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Link href="#" className="text-white hover:text-[#247BA0]">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-white hover:text-[#247BA0]">
                <Facebook className="h-6 w-6" />
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-6 text-sm text-gray-400">
                <p>805 SW Broadway | PORTLAND, OR 97205</p>
                <span className="hidden lg:inline-block">&bull;</span>
                <p>STUDIO HOURS | 8 AM—10 PM DAILY</p>
                <span className="hidden lg:inline-block">&bull;</span>
                <p>24/7 CUSTOMER SERVICE | 503.313.7121</p>
              </div>
              <Link
                href="#"
                className="border border-[#247BA0] text-[#247BA0] px-6 py-3 rounded hover:bg-[#247BA0]/10 transition-colors uppercase"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
