"use client"

import { useState } from "react"

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.5107874889835!2d-122.68211492346055!3d45.51921787107615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950a051f072ee9%3A0x1e8c2d3e8e42a313!2s750%20SW%209th%20Ave%2C%20Portland%2C%20OR%2097205!5e0!3m2!1sen!2sus!4v1712789582831!5m2!1sen!2sus"

export default function InteractiveMap() {
  const [showMap, setShowMap] = useState(false)

  if (showMap) {
    return (
      <iframe
        src={MAP_EMBED_URL}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="eager"
        referrerPolicy="no-referrer-when-downgrade"
        title="Headshot Portland Studio Location"
        aria-label="Interactive map showing Headshot Portland studio location at 750 SW 9th Ave, Portland, OR 97205"
      />
    )
  }

  return (
    <div
      className="relative cursor-pointer group w-full h-full"
      onClick={() => setShowMap(true)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/map-static.webp"
        alt="Map showing Headshot Portland at 750 SW 9th Ave, Portland, OR 97205"
        className="w-full h-full object-cover rounded-md"
        loading="lazy"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors rounded-md">
        <button className="bg-white text-black font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-shadow">
          View Interactive Map
        </button>
      </div>
    </div>
  )
}
