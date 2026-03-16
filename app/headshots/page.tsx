"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Instagram, Facebook, Star } from "lucide-react"
import { useState, useCallback, useEffect } from "react"
import styles from "./headshots.module.css"
import GoogleAnalytics from "@/components/google-analytics"

export default function HeadshotsPage() {
  // Gallery items array
  const galleryItems = [
    {
      id: 1,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-AB8I9699.webp",
      alt: "Professional headshot of woman with brown hair in black blazer",
    },
    {
      id: 2,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-angela-headshot.webp",
      alt: "Professional headshot of woman in blue floral patterned top",
    },
    {
      id: 3,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-angel.webp",
      alt: "Professional headshot of man in dark suit with pink shirt",
    },
    {
      id: 4,
      type: "video",
      src: "https://rvideo.b-cdn.net/headshot-website-videos/headshot-photographer-portland-oregon.mp4",
      poster: "/images/headshots-gallery/erica-headshot-portland-sm.webp",
      name: "Erica Carnrite",
      title: "VP Head of Data, Medtronic.",
      quote:
        "I needed new professional headshots and Nathan's work is absolute fantastic! The shoot was fun, relaxed, and Nathan captured my vision, he is a fantastic photographer!",
    },
    {
      id: 5,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-megan-headshot.webp",
      alt: "Professional headshot of woman with long brown hair in blue patterned shirt",
    },
    {
      id: 6,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-AB8I0521.webp",
      alt: "Professional headshot of man with gray hair in blue plaid blazer",
    },
    {
      id: 7,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-amy.webp",
      alt: "Professional headshot of Asian woman in white button-up shirt",
    },
    {
      id: 8,
      type: "video",
      src: "https://rvideo.b-cdn.net/headshot-website-videos/mark%20headshot%20testimonial.mp4",
      poster: "/images/headshots-gallery/headshot-portland-mark.webp",
      name: "Mark Johnson",
      title: "Business Development Manager",
      quote:
        "I needed new professional headshots and Nathan's work is absolute fantastic! The shoot was fun, relaxed, and Nathan captured my vision, he is a fantastic photographer!",
    },
    {
      id: 9,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-andy.webp",
      alt: "Professional headshot of man with glasses in white lab coat",
    },
    {
      id: 10,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-abby.webp",
      alt: "Professional headshot of woman with reddish-brown hair in purple turtleneck",
    },
    {
      id: 11,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-austyn.webp",
      alt: "Professional headshot of man with mustache and beard in floral shirt",
    },
    {
      id: 12,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-apple-headshot-photographer.webp",
      alt: "Professional headshot of man with styled hair and beard in patterned shirt",
    },
    {
      id: 13,
      type: "testimonial",
      name: "Tom Danowski",
      title: "VP Content Marketing, Ziply Fiber",
      quote:
        "Nathan did an amazing job with my headshot studio shoot. Lots of photos to choose from, gave artistic direction and helped us pick the best photos for the new website! 5stars! Thank You!",
      avatar: "/images/profile-photos/tom-danowski-headshot.webp",
    },
    {
      id: 14,
      type: "cta",
      title: "Get Free Quote",
      text: "Click here to get a quick and easy quote for your professional headshots",
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
      src: "/images/headshots-gallery/headshot-portland-bay-area-headshot.webp",
      alt: "Professional headshot of man with reddish-blonde beard in light blue shirt against gray background",
    },
    {
      id: 17,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-cheryl.webp",
      alt: "Professional headshot of woman with black hair in white and black tweed jacket with pearl jewelry",
    },
    {
      id: 18,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-chris.webp",
      alt: "Professional headshot of bald man in gray suit jacket with white shirt",
    },
    {
      id: 19,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-colby-columbia.webp",
      alt: "Professional headshot of man with glasses and mustache in navy suit with white shirt",
    },
    {
      id: 20,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-colby-5.webp",
      alt: "Professional headshot of man with beard smiling in black denim jacket",
    },
    {
      id: 21,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-colby-6.webp",
      alt: "Professional headshot of man with beard laughing in black denim jacket",
    },
    {
      id: 22,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-eddie.webp",
      alt: "Professional headshot of man with glasses in navy suit with blue shirt and striped tie",
    },
    {
      id: 23,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-emily.webp",
      alt: "Professional headshot of woman with dark curly hair in light blue button-up shirt",
    },
    {
      id: 24,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-erica-retouch-1.webp",
      alt: "Professional headshot of woman with brown hair in black top smiling broadly",
    },
    {
      id: 25,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-erica-retouch-2.webp",
      alt: "Professional headshot of woman with brown hair in navy blue top with subtle smile",
    },
    {
      id: 26,
      type: "cta",
      title: "Book Your Session",
      text: "Ready to schedule? Book your headshot session directly on our calendar",
      url: "https://ww3.headshotportland.com/instant",
      color: "green",
    },
    // New headshots to add to the gallery
    {
      id: 27,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-Jennifer%20Holland%20Headshot1603.jpg-oj8l6VjnXcMn4pJxFUZPCYgqwoPkuW.jpeg",
      alt: "Professional headshot of woman with long reddish-brown hair in black top against gray background",
    },
    {
      id: 28,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-headshot%20portland.jpg-OLy9UizNOYMq7ffxYsoAQqTn3uxQPg.jpeg",
      alt: "Professional headshot of woman with short platinum blonde hair, red lipstick and black top against white background",
    },
    {
      id: 29,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-headshots-9-10-4434-Edit-4.jpg-VfhTTfPWIXTtmUuYaSQyKizrOxo3e5.jpeg",
      alt: "Professional headshot of young man with dark hair and beard in dark suit and white shirt",
    },
    {
      id: 30,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-Erik-Schmidt-Heashot1006.jpg-kIstIf2CUh3V5OW77PGtJYY7yw893u.jpeg",
      alt: "Professional headshot of man with reddish-brown hair and beard in dark collared shirt against gray background",
    },
    {
      id: 31,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-headshot%20portraits.jpg-EYxzW63wFHLHDPnQmWWjvzDR2xYMxS.jpeg",
      alt: "Professional headshot of man with styled brown hair and beard in black shirt against gray background",
    },
    {
      id: 32,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-Headshots%202043.jpg-uIrJm7mQ8krG9jSoueIPYoRYXNOS1c.jpeg",
      alt: "Professional headshot of woman with curly blonde hair in black textured top against dark background",
    },
    {
      id: 33,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-headshots%20san%20francisco.jpg-w4a6ADfi9RnNJ8gVUxfWI3kJTLAxbA.jpeg",
      alt: "Professional headshot of woman with shoulder-length brown hair in navy blue top against white background",
    },
    {
      id: 34,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-headshots-9-10-4381-Edit.jpg-vqGj0JT0clawZHe8HkIdkTNV0s2kHF.jpeg",
      alt: "Professional headshot of young man in dark suit and white shirt against outdoor greenery background",
    },
    {
      id: 35,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-Headshots_Denver-2-2.jpg-RINlybQu2VErsPgCg0R2n1BEgTWi0M.jpeg",
      alt: "Professional headshot of woman with short curly dark hair in green cardigan over blue top against dark background",
    },
    {
      id: 36,
      type: "cta",
      title: "Team Headshots",
      text: "Need headshots for your entire team? Get special group pricing",
      url: "https://ww3.headshotportland.com/for-teams",
      color: "teal",
    },
    {
      id: 37,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-headshots-9-10-4255-Edit.jpg-0fPtuGrKv2vzRyXz8pOxzVTMrMQb6B.jpeg",
      alt: "Professional headshot of man with light brown hair, beard and glasses in navy suit and white shirt against gray background",
    },
    {
      id: 38,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-leon-headshot-2856-Edit.jpg-aesjTh1P7FyuHYXoT6KlcFSj9YPcZy.jpeg",
      alt: "Professional headshot of a young man with short dark hair in a black suit and white shirt against a gray background",
    },
    {
      id: 39,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-john-headshot-2419-Edit-3.jpg-wVJ7CKpv1l0u9wRRjyPAG3i7LkFIzx.jpeg",
      alt: "Professional headshot of a smiling man with dark hair in a navy suit and white shirt against a gray background",
    },
    {
      id: 40,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-levi-headshot-after-.jpg-cTb4gUcvf7mAecKvV8euBv2YBV2Buf.jpeg",
      alt: "Professional headshot of a young man with styled brown hair and beard in a black shirt against a dark gray background",
    },
    {
      id: 41,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-Jexport-7480.jpg-zWnWvMo61fi9Vu74fa3nn9xSgv5QYb.jpeg",
      alt: "Professional headshot of a woman with shoulder-length blonde hair in a black top with arms crossed against a white background",
    },
    {
      id: 42,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-Mercer-1651-Edit-Edit-2.jpg-PCr9neQkpktFpcvCLdgtiwpFWrRzIt.jpeg",
      alt: "Professional headshot of a woman with short curly hair and glasses wearing a striped shirt and mustard-colored jacket against a dark gray background",
    },
    {
      id: 43,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-Mercer-609-Edit-2.jpg-MlgFZVxLbUhzGcxLsGMaMJQjNA8M2m.jpeg",
      alt: "Professional headshot of a smiling man with beard and short hair in a navy suit and blue shirt against a dark gray background",
    },
    {
      id: 44,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-liveperson-.jpg-L3ZrEViXCqYTEWgDbGokC1vO0Qt66a.jpeg",
      alt: "Professional headshot of a man with glasses and beard in a navy button-up shirt against a white background",
    },
    {
      id: 45,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-kittleson%20headshot%20sam-headshot-5605-Edit.jpg-5DE1LYIiKEcpFzMbsrm5hReHyaRmTR.jpeg",
      alt: "Professional headshot of a man with long curly blonde hair in a plaid button-up shirt against a gray background",
    },
    {
      id: 46,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-joel-soltman-headshot1344.jpg-sIU0wYHhvfILlNIUDwmjHwqPzIxSvU.jpeg",
      alt: "Professional headshot of a man with glasses and mustache in a navy patterned suit jacket and white shirt against a light gray background",
    },
    {
      id: 47,
      type: "testimonial",
      name: "Trenten Cassity",
      title: "Regional Sales, Nationwide Solar",
      quote:
        "Great experince working with Nathan, he is the man to go to for headshots and portraits in Portland! He took care of me, made me look great and I'll be back agai!",
      avatar: "/images/profile-photos/trenten-profile-photo.webp",
    },
    {
      id: 48,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-Mercer-1308-Edit-2.jpg-1vLmNLR3dcwIp8SOnUadgKNP6CDmjI.jpeg",
      alt: "Professional headshot of an older man with gray hair, glasses, wearing a patterned suit jacket and white shirt against a dark background",
    },
    {
      id: 49,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-micah%20headshot-.jpg-s7z4RXsifnjN81rquKNKykvlH1zHpf.jpeg",
      alt: "Professional headshot of young man with dark hair in a black button-up shirt against a white background",
    },
    {
      id: 50,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-nten-13511.jpg-N7ZKSFTpHDJYQK3L2MVqi2tuMXBzWt.jpeg",
      alt: "Professional headshot of woman wearing a tan hijab and black button-up shirt against a gray background",
    },
    {
      id: 51,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-Mikayla%20Montoya%20Headshot-4152-Edit.jpg-bk3KnsPcsE8mEkXcSlIiPCZTXFAy1O.jpeg",
      alt: "Professional headshot of young woman with dark hair in a burgundy sleeveless turtleneck top against a gray background",
    },
    {
      id: 52,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-Tom%20Fisher-698-Edit.jpg-yrZnS6IWAbUpl77BnAe3VtymuSsGq9.jpeg",
      alt: "Professional headshot of bald man with a big smile wearing a navy patterned suit jacket and white shirt against a gray background",
    },
    {
      id: 53,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-Philip--4.jpg-mboJB3gaHc72ZEDCqonf0MkMqmXWBb.jpeg",
      alt: "Professional headshot of middle-aged man with brown hair in a black button-up shirt against a white background",
    },
    {
      id: 54,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-Philip--2.jpg-QKkvSjBrxm4ixXoruraLxx6B49c4d9.jpeg",
      alt: "Professional headshot of man with brown hair in a black button-up shirt against a light blue background",
    },
    {
      id: 55,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-Non%20Profit%20Headshot%20Photographer.jpg-yYBiijYHCif85zoiRaG2E6XiHwWmxL.jpeg",
      alt: "Professional headshot of woman wearing a tan hijab and black button-up shirt against a neutral background",
    },
    {
      id: 56,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-scott-headshot-2191-Edit.jpg-AJMZ5ybNJLx0CMFV05lR86Jr6ggnRt.jpeg",
      alt: "Professional headshot of man with brown hair and beard in a black shirt against a gray background",
    },
    {
      id: 57,
      type: "cta",
      title: "Contact Us",
      text: "Have questions? Reach out to our team for personalized assistance",
      url: "https://ww3.headshotportland.com/contact",
      color: "purple",
    },
    {
      id: 58,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-scott-headshot-2762-Edit.jpg-9SplBI4EjSTyMtVxVGU7j6r0XaZ9TS.jpeg",
      alt: "Professional headshot of man with brown hair and beard in a blue linen shirt against a gray background",
    },
    {
      id: 59,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-sahil-headshot-5085-Edit.jpg-w8naFiXKKl6QKdLC8tnEFeaPvtxKDH.jpeg",
      alt: "Professional headshot of young woman wearing a light gray hijab, white shirt and black blazer against a light gray background",
    },
    {
      id: 60,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-vestas-1.webp",
      alt: "Professional headshot of young man with brown hair and beard wearing a navy blue suit and light blue shirt against a gray background",
    },
    {
      id: 61,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-womens.webp",
      alt: "Professional headshot of woman with blonde wavy hair wearing glasses and a green top against a gray background",
    },
    {
      id: 62,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-vestas-2.webp",
      alt: "Professional headshot of woman with short dark hair wearing a white and black plaid button-up shirt against a gray background",
    },
    {
      id: 63,
      type: "image",
      src: "/images/headshots-gallery/headshot-portland-vestas-3.webp",
      alt: "Professional headshot of woman with long blonde hair wearing a navy blazer with a patterned blouse against a gray background",
    },
  ]

  // State for tracking loaded images
  const [loadedCount, setLoadedCount] = useState(0)
  const [allLoaded, setAllLoaded] = useState(false)

  // Count total images and videos that need to load
  const totalItems = galleryItems.filter(
    (item) => item.type === "image" || (item.type === "video" && item.poster),
  ).length

  // Handle image load
  const handleImageLoad = useCallback(() => {
    setLoadedCount((prev) => {
      const newCount = prev + 1
      if (newCount >= totalItems) {
        setAllLoaded(true)
      }
      return newCount
    })
  }, [totalItems])

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
      // For mobile Safari, we need to ensure video is visible first
      if (thumbnailEl) {
        thumbnailEl.style.display = "none"
      }

      if (videoEl.muted) {
        // First click: Keep playing but unmute
        videoEl.muted = false
        // Force play for mobile Safari
        videoEl.play().catch((error) => {
          console.error("Error playing video:", error)
          // Keep muted if unmuting fails (common on mobile)
          videoEl.muted = true
          videoEl.play().catch((err) => console.error("Still can't play:", err))
        })
      } else if (videoEl.paused) {
        // If paused, play and unmute
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
            // Try playing muted as fallback
            videoEl.muted = true
            videoEl.play().catch((err) => console.error("Still can't play:", err))
          })
      } else {
        // Already playing and unmuted, so pause
        videoEl.pause()
        videoEl.muted = true
        // Show thumbnail when video is paused
        if (thumbnailEl) {
          thumbnailEl.style.display = "block"
        }
      }
    }
  }, [])

  // Add this after the other useEffect hooks
  useEffect(() => {
    // Force autoplay for all videos on mobile Safari
    const videoElements = document.querySelectorAll("video")
    videoElements.forEach((video) => {
      video.muted = true
      video.setAttribute("playsinline", "")
      video.setAttribute("muted", "")

      // For iOS Safari specifically
      video.playsInline = true

      // Try to play the video
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Autoplay prevented:", error)
        })
      }
    })
  }, [allLoaded]) // Run when all images are loaded

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
                PROFESSIONAL HEADSHOT GALLERY
              </h1>
              <p className="font-playfair text-xl md:text-2xl mb-12">Your best headshot ever is a few clicks away</p>
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

            {/* Loading indicator */}
            {!allLoaded && (
              <div className="text-center mb-8">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#247BA0] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-2 text-gray-400">
                  Loading gallery... ({loadedCount}/{totalItems})
                </p>
              </div>
            )}

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
                        width={800}
                        height={800}
                        loading="lazy"
                        className={styles.masonryImage}
                        onLoad={handleImageLoad}
                        onError={handleImageLoad}
                      />
                    )}

                    {item.type === "testimonial" && (
                      <div className={styles.testimonialItem}>
                        <div className="flex mb-3 sm:mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-[#FFA500] fill-[#FFA500]" aria-hidden="true" />
                          ))}
                          <span className="sr-only">5 out of 5 stars</span>
                        </div>
                        <div className="mb-3 sm:mb-4">
                          <div className="flex items-start gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden flex-shrink-0 hidden sm:block">
                              {item.id === 47 && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src="/images/profile-photos/trenten-profile-photo.webp"
                                  alt="Trenten Cassity"
                                  className="w-full h-full object-cover"
                                  onLoad={handleImageLoad}
                                  onError={handleImageLoad}
                                />
                              )}
                              {item.id !== 47 && item.id === 13 && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src="/images/profile-photos/tom-danowski-headshot.webp"
                                  alt="Tom Danowski"
                                  className="w-full h-full object-cover"
                                  onLoad={handleImageLoad}
                                  onError={handleImageLoad}
                                />
                              )}
                              {item.id !== 47 && item.id !== 13 && item.avatar && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={getImageSrc(item.avatar) || "/placeholder.svg"}
                                  alt={`${item.name} avatar`}
                                  className="w-full h-full object-cover"
                                  onLoad={handleImageLoad}
                                  onError={handleImageLoad}
                                />
                              )}
                              {item.id !== 47 && item.id !== 13 && !item.avatar && (
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
                        <div
                          className={styles.videoTestimonialItem}
                          role="button"
                          tabIndex={0}
                          aria-label="Play video testimonial"
                          onClick={() => handleVideoPlay(item.id)}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleVideoPlay(item.id) } }}
                        >
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
                              // Force play on mobile Safari
                              const video = e.currentTarget
                              video.muted = true
                              video.play().catch((err) => {
                                console.log("Autoplay prevented:", err)
                                // Show thumbnail as fallback
                                const thumbnailEl = document.getElementById(`thumbnail-${item.id}`)
                                if (thumbnailEl) thumbnailEl.style.display = "block"
                              })
                              handleImageLoad()
                            }}
                            onError={handleImageLoad}
                          />

                          {/* Thumbnail image */}
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            id={`thumbnail-${item.id}`}
                            src={getImageSrc(item.poster) || "/placeholder.svg"}
                            alt={`${item.name} video testimonial`}
                            className={`${styles.videoThumbnail} hidden`}
                            onLoad={handleImageLoad}
                            onError={handleImageLoad}
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
              <Link href="#" className="text-white hover:text-[#247BA0] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none rounded" aria-label="Instagram">
                <Instagram className="h-6 w-6" aria-hidden="true" />
              </Link>
              <Link href="#" className="text-white hover:text-[#247BA0] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none rounded" aria-label="Facebook">
                <Facebook className="h-6 w-6" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-6 text-sm text-gray-400">
                <p>805 SW Broadway | PORTLAND, OR 97205</p>
                <span className="hidden lg:inline-block">•</span>
                <p>STUDIO HOURS | 8 AM—10 PM DAILY</p>
                <span className="hidden lg:inline-block">•</span>
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
