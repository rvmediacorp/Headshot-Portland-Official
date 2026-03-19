"use client"

import { useEffect, useRef, useState } from "react"

export default function HeroVideoPlayer({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      setIsReady(true)
      video.play().catch(() => {})
    }

    video.addEventListener("canplay", handleCanPlay)

    // Delay video load so it doesn't compete with LCP
    const timer = setTimeout(() => {
      video.preload = "auto"
      video.load()
    }, 2000)

    return () => {
      video.removeEventListener("canplay", handleCanPlay)
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      {/* Poster shown until video is ready — this is the fast LCP element */}
      {!isReady && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <video
        ref={videoRef}
        suppressHydrationWarning
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isReady ? "opacity-100" : "opacity-0"}`}
        muted
        loop
        playsInline
        preload="none"
        aria-label="Background video showing headshot photography studio sessions"
      >
        <source src={src} type="video/mp4" />
      </video>
    </>
  )
}
