"use client"

import { useEffect, useRef, useState, useCallback } from "react"

export default function HeroVideoPlayer({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isReady, setIsReady] = useState(false)
  const [posterLoaded, setPosterLoaded] = useState(false)

  const handlePosterLoad = useCallback(() => {
    setPosterLoaded(true)
  }, [])

  useEffect(() => {
    if (!posterLoaded) return
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      setIsReady(true)
      video.play().catch(() => {})
    }

    video.addEventListener("canplay", handleCanPlay)

    // Only load video after poster has painted + a delay
    // On mobile this prevents bandwidth competition with LCP
    const isMobile = window.innerWidth < 768
    const delay = isMobile ? 4000 : 1000

    const timer = setTimeout(() => {
      video.src = src
      video.load()
    }, delay)

    return () => {
      video.removeEventListener("canplay", handleCanPlay)
      clearTimeout(timer)
    }
  }, [posterLoaded, src])

  return (
    <>
      {!isReady && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          onLoad={handlePosterLoad}
        />
      )}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isReady ? "opacity-100" : "opacity-0"}`}
        muted
        loop
        playsInline
        preload="none"
        aria-label="Background video showing headshot photography studio sessions"
      />
    </>
  )
}
