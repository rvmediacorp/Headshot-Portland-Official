"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Instagram, Facebook, Star } from "lucide-react"
import { useCallback } from "react"
import styles from "./model.module.css"
import GoogleAnalytics from "@/components/google-analytics"
import VisitUsSection from "@/components/visit-us-section"

// Static gallery data — outside component to avoid recreation on every render
const galleryItems = [
    { id: 1, type: "image", src: "/images/model-gallery/model-01.webp", alt: "Model portfolio photography example" },
    { id: 2, type: "image", src: "/images/model-gallery/model-02.webp", alt: "Model portfolio photography example" },
    { id: 3, type: "image", src: "/images/model-gallery/model-03.webp", alt: "Model portfolio photography example" },
    {
      id: 4,
      type: "video",
      src: "https://rvideo.b-cdn.net/headshot-website-videos/headshot-photographer-portland-oregon.mp4",
      poster: "/images/headshots-gallery/erica-headshot-portland-sm.webp",
      name: "Erica Carnrite",
      title: "VP Head of Data, Medtronic.",
      quote: "I needed new professional headshots and Nathan's work is absolute fantastic! The shoot was fun, relaxed, and Nathan captured my vision, he is a fantastic photographer!",
    },
    { id: 5, type: "image", src: "/images/model-gallery/model-04.webp", alt: "Model portfolio photography example" },
    { id: 6, type: "image", src: "/images/model-gallery/model-05.webp", alt: "Model portfolio photography example" },
    { id: 7, type: "image", src: "/images/model-gallery/model-06.webp", alt: "Model portfolio photography example" },
    { id: 8, type: "image", src: "/images/model-gallery/model-07.webp", alt: "Model portfolio photography example" },
    { id: 9, type: "image", src: "/images/model-gallery/model-08.webp", alt: "Model portfolio photography example" },
    { id: 10, type: "image", src: "/images/model-gallery/model-09.webp", alt: "Model portfolio photography example" },
    { id: 11, type: "image", src: "/images/model-gallery/model-10.webp", alt: "Model portfolio photography example" },
    { id: 12, type: "image", src: "/images/model-gallery/model-11.webp", alt: "Model portfolio photography example" },
    { id: 13, type: "image", src: "/images/model-gallery/model-12.webp", alt: "Model portfolio photography example" },
    { id: 14, type: "image", src: "/images/model-gallery/model-13.webp", alt: "Model portfolio photography example" },
    {
      id: 15,
      type: "testimonial",
      name: "Jaden Alexzandra Kaz",
      title: "Model Portfolio Client",
      quote: "I needed to have the best pictures and I needed them in a timely manner. Nathan listened to everything I specifically wanted and got it all done efficiently. I don't have any complaints and recommend him to everyone.",
      avatar: "https://lh3.googleusercontent.com/a-/ALV-UjU0e3_GIHITqUe3SAaLfruFLV2Yzq6cUWpbl25lzdqc9rUiW9iN=w72-h72-p-rp-mo-ba2-br100",
    },
    {
      id: 16,
      type: "cta",
      title: "Get Free Quote",
      text: "Click here to get a quick and easy quote for your model portfolio session",
      url: "https://ww3.headshotportland.com/instant-quote",
      color: "blue",
    },
    { id: 17, type: "image", src: "/images/model-gallery/model-14.webp", alt: "Model portfolio photography example" },
    { id: 18, type: "image", src: "/images/model-gallery/model-15.webp", alt: "Model portfolio photography example" },
    { id: 19, type: "image", src: "/images/model-gallery/model-16.webp", alt: "Model portfolio photography example" },
    { id: 20, type: "image", src: "/images/model-gallery/model-17.webp", alt: "Model portfolio photography example" },
    { id: 21, type: "image", src: "/images/model-gallery/model-18.webp", alt: "Model portfolio photography example" },
    { id: 22, type: "image", src: "/images/model-gallery/model-19.webp", alt: "Model portfolio photography example" },
    { id: 23, type: "image", src: "/images/model-gallery/model-20.webp", alt: "Model portfolio photography example" },
    { id: 24, type: "image", src: "/images/model-gallery/model-21.webp", alt: "Model portfolio photography example" },
    { id: 25, type: "image", src: "/images/model-gallery/model-22.webp", alt: "Model portfolio photography example" },
    { id: 26, type: "image", src: "/images/model-gallery/model-23.webp", alt: "Model portfolio photography example" },
    {
      id: 27,
      type: "video",
      src: "https://rvideo.b-cdn.net/headshot-website-videos/emily%20walton%20headshot%20testimonial.mp4",
      poster: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/emily-walton-portland-headshot-thumbnail.jpg-JONRXlFgbv3F8tWYI2x6C8z5QcXeU9.jpeg",
      name: "Emily Walton",
      title: "Marketing Specialist, Creative Solutions",
      quote: "I needed new professional headshots and Nathan's work is absolute fantastic! The shoot was fun, relaxed, and Nathan captured my vision, he is a fantastic photographer!",
    },
    { id: 28, type: "image", src: "/images/model-gallery/model-24.webp", alt: "Model portfolio photography example" },
    { id: 29, type: "image", src: "/images/model-gallery/model-25.webp", alt: "Model portfolio photography example" },
    { id: 30, type: "image", src: "/images/model-gallery/model-26.webp", alt: "Model portfolio photography example" },
    { id: 31, type: "image", src: "/images/model-gallery/model-27.webp", alt: "Model portfolio photography example" },
    { id: 32, type: "image", src: "/images/model-gallery/model-28.webp", alt: "Model portfolio photography example" },
    { id: 33, type: "image", src: "/images/model-gallery/model-29.webp", alt: "Model portfolio photography example" },
    { id: 34, type: "image", src: "/images/model-gallery/model-30.webp", alt: "Model portfolio photography example" },
    { id: 35, type: "image", src: "/images/model-gallery/model-31.webp", alt: "Model portfolio photography example" },
    { id: 36, type: "image", src: "/images/model-gallery/model-32.webp", alt: "Model portfolio photography example" },
    { id: 37, type: "image", src: "/images/model-gallery/model-33.webp", alt: "Model portfolio photography example" },
    {
      id: 38,
      type: "cta",
      title: "Book Your Session",
      text: "Ready to schedule? Book your model portfolio session directly on our calendar",
      url: "https://ww3.headshotportland.com/instant",
      color: "green",
    },
    { id: 39, type: "image", src: "/images/model-gallery/model-34.webp", alt: "Model portfolio photography example" },
    { id: 40, type: "image", src: "/images/model-gallery/model-35.webp", alt: "Model portfolio photography example" },
    { id: 41, type: "image", src: "/images/model-gallery/model-36.webp", alt: "Model portfolio photography example" },
    { id: 42, type: "image", src: "/images/model-gallery/model-37.webp", alt: "Model portfolio photography example" },
    { id: 43, type: "image", src: "/images/model-gallery/model-38.webp", alt: "Model portfolio photography example" },
    { id: 44, type: "image", src: "/images/model-gallery/model-39.webp", alt: "Model portfolio photography example" },
    { id: 45, type: "image", src: "/images/model-gallery/model-40.webp", alt: "Model portfolio photography example" },
    { id: 46, type: "image", src: "/images/model-gallery/model-41.webp", alt: "Model portfolio photography example" },
    { id: 47, type: "image", src: "/images/model-gallery/model-42.webp", alt: "Model portfolio photography example" },
    { id: 48, type: "image", src: "/images/model-gallery/model-43.webp", alt: "Model portfolio photography example" },
    {
      id: 49,
      type: "video",
      src: "https://rvideo.b-cdn.net/headshot-website-videos/mark%20headshot%20testimonial.mp4",
      poster: "/images/headshots-gallery/headshot-portland-mark.webp",
      name: "Mark Johnson",
      title: "Business Development Manager",
      quote: "I needed new professional headshots and Nathan's work is absolute fantastic! The shoot was fun, relaxed, and Nathan captured my vision, he is a fantastic photographer!",
    },
    { id: 50, type: "image", src: "/images/model-gallery/model-44.webp", alt: "Model portfolio photography example" },
    { id: 51, type: "image", src: "/images/model-gallery/model-45.webp", alt: "Model portfolio photography example" },
    { id: 52, type: "image", src: "/images/model-gallery/model-46.webp", alt: "Model portfolio photography example" },
    { id: 53, type: "image", src: "/images/model-gallery/model-47.webp", alt: "Model portfolio photography example" },
    { id: 54, type: "image", src: "/images/model-gallery/model-48.webp", alt: "Model portfolio photography example" },
    { id: 55, type: "image", src: "/images/model-gallery/model-49.webp", alt: "Model portfolio photography example" },
    { id: 56, type: "image", src: "/images/model-gallery/model-50.webp", alt: "Model portfolio photography example" },
    { id: 57, type: "image", src: "/images/model-gallery/model-51.webp", alt: "Model portfolio photography example" },
    { id: 58, type: "image", src: "/images/model-gallery/model-52.webp", alt: "Model portfolio photography example" },
    { id: 59, type: "image", src: "/images/model-gallery/model-53.webp", alt: "Model portfolio photography example" },
    { id: 60, type: "image", src: "/images/model-gallery/model-54.webp", alt: "Model portfolio photography example" },
    { id: 61, type: "image", src: "/images/model-gallery/model-55.webp", alt: "Model portfolio photography example" },
    { id: 62, type: "image", src: "/images/model-gallery/model-56.webp", alt: "Model portfolio photography example" },
    { id: 63, type: "image", src: "/images/model-gallery/model-57.webp", alt: "Model portfolio photography example" },
    { id: 64, type: "image", src: "/images/model-gallery/model-58.webp", alt: "Model portfolio photography example" },
    { id: 65, type: "image", src: "/images/model-gallery/model-59.webp", alt: "Model portfolio photography example" },
    { id: 66, type: "image", src: "/images/model-gallery/model-60.webp", alt: "Model portfolio photography example" },
    { id: 67, type: "image", src: "/images/model-gallery/model-61.webp", alt: "Model portfolio photography example" },
    { id: 68, type: "image", src: "/images/model-gallery/model-62.webp", alt: "Model portfolio photography example" },
    { id: 69, type: "image", src: "/images/model-gallery/model-63.webp", alt: "Model portfolio photography example" },
    { id: 70, type: "image", src: "/images/model-gallery/model-64.webp", alt: "Model portfolio photography example" },
    { id: 71, type: "image", src: "/images/model-gallery/model-65.webp", alt: "Model portfolio photography example" },
    { id: 72, type: "image", src: "/images/model-gallery/model-66.webp", alt: "Model portfolio photography example" },
    { id: 73, type: "image", src: "/images/model-gallery/model-67.webp", alt: "Model portfolio photography example" },
    { id: 74, type: "image", src: "/images/model-gallery/model-68.webp", alt: "Model portfolio photography example" },
    { id: 75, type: "image", src: "/images/model-gallery/model-69.webp", alt: "Model portfolio photography example" },
    { id: 76, type: "image", src: "/images/model-gallery/model-70.webp", alt: "Model portfolio photography example" },
    { id: 77, type: "image", src: "/images/model-gallery/model-71.webp", alt: "Model portfolio photography example" },
    { id: 78, type: "image", src: "/images/model-gallery/model-72.webp", alt: "Model portfolio photography example" },
    { id: 79, type: "image", src: "/images/model-gallery/model-73.webp", alt: "Model portfolio photography example" },
    { id: 80, type: "image", src: "/images/model-gallery/model-74.webp", alt: "Model portfolio photography example" },
    { id: 81, type: "image", src: "/images/model-gallery/model-75.webp", alt: "Model portfolio photography example" },
    { id: 82, type: "image", src: "/images/model-gallery/model-76.webp", alt: "Model portfolio photography example" },
    { id: 83, type: "image", src: "/images/model-gallery/model-77.webp", alt: "Model portfolio photography example" },
    { id: 84, type: "image", src: "/images/model-gallery/model-78.webp", alt: "Model portfolio photography example" },
    { id: 85, type: "image", src: "/images/model-gallery/model-79.webp", alt: "Model portfolio photography example" },
    { id: 86, type: "image", src: "/images/model-gallery/model-80.webp", alt: "Model portfolio photography example" },
]

export default function ModelPage() {
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

  return (
    <main className={styles.container}>
      <GoogleAnalytics />
      {/* Header and Hero Section */}
      <div className="w-full px-[10px] my-[10px]">
        <section
          className="w-full rounded-[10px] bg-[#247BA0] px-5 md:px-16"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >

          {/* Hero Section */}
          <div className="w-full text-white py-16 md:py-24">
            <div className="container mx-auto text-center">
              <h1 className="font-bodoniModa text-4xl md:text-5xl lg:text-6xl mb-6 tracking-wide">
                MODEL PORTFOLIO GALLERY
              </h1>
              <p className="font-playfair text-xl md:text-2xl mb-12">Professional model portfolios that get you noticed</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="https://ww3.headshotportland.com/instant-quote"
                  className="bg-white text-[#247BA0] px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                >
                  <span className="font-bold">GET FREE QUOTE</span>
                  <div className="bg-[#247BA0] rounded-full p-1">
                    <ArrowUpRight className="h-4 w-4 text-white" />
                  </div>
                </Link>
                <Link
                  href="https://ww3.headshotportland.com/instant"
                  className="border border-white text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
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
                      // eslint-disable-next-line @next/next/no-img-element
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
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden shrink-0 hidden sm:block">
                              {item.id === 13 && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src="/images/profile-photos/tom-danowski-headshot.webp"
                                  alt="Tom Danowski"
                                  className="w-full h-full object-cover"
                                />
                              )}
                              {item.id !== 13 && item.avatar && (
                                // eslint-disable-next-line @next/next/no-img-element
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
                          {/* eslint-disable-next-line @next/next/no-img-element */}
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
                              shoot. He has a great eye for lighting and poses that flatter everyone. I&apos;m thrilled with
                              my new headshots!
                            </p>
                          </div>
                        ) : item.id === 8 ? (
                          <div className="bg-[#1C1B1C] p-4 rounded-b-lg">
                            <p className="text-white text-sm">
                              <strong>Working with Nathan was fantastic!</strong> He guided me through the whole process
                              and made it fun. The photos turned out better than I expected, and I&apos;ve already received
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

      <VisitUsSection />

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
                <p className="uppercase text-sm font-medium">Portland&apos;s top full-service</p>
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
                className="border border-[#247BA0] text-[#247BA0] px-6 py-3 rounded-full hover:bg-[#247BA0]/10 transition-colors uppercase"
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
