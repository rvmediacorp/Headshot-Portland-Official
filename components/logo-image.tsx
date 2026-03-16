import Image from "next/image"
import type { CSSProperties } from "react"

interface LogoProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

export default function LogoImage({ src, alt, width, height, className = "" }: LogoProps) {
  // Check if the image is an SVG
  const isSvg = src && typeof src === "string" && src.endsWith(".svg")

  if (isSvg) {
    // For SVGs, use a regular img tag which handles SVGs better than Next.js Image in some cases
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={`${className} w-auto h-auto`}
        style={{ maxHeight: "100%", maxWidth: "100%" } as CSSProperties}
      />
    )
  }

  // For non-SVG images, use Next.js Image component
  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      className={`object-contain ${className}`}
    />
  )
}
