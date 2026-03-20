"use client"

import { useEffect, useRef, useState } from "react"

export default function LazyVideo({
  src,
  poster,
  className = "",
}: {
  src: string
  poster: string
  className?: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Observe when the video scrolls into view
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "200px" }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  // Load and play video once visible
  useEffect(() => {
    if (!isVisible) return
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      setIsReady(true)
      video.play().catch(() => {})
    }

    video.addEventListener("canplay", handleCanPlay)
    video.src = src
    video.load()

    return () => video.removeEventListener("canplay", handleCanPlay)
  }, [isVisible, src])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Poster shown until video is ready */}
      {!isReady && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover rounded"
        />
      )}
      <video
        ref={videoRef}
        className={`w-full h-full object-cover rounded transition-opacity duration-500 ${isReady ? "opacity-100" : "opacity-0"}`}
        muted
        loop
        playsInline
        preload="none"
      />
    </div>
  )
}
