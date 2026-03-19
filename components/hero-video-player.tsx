"use client"

import { useEffect, useRef } from "react"

export default function HeroVideoPlayer({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  return (
    <video
      ref={videoRef}
      suppressHydrationWarning
      className="absolute inset-0 w-full h-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      fetchPriority="high"
      aria-label="Background video showing headshot photography studio sessions"
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}
