"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Instagram, Facebook, Star, Volume2, VolumeX, Play, Pause } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import styles from "./headshots.module.css"
import GoogleAnalytics from "@/components/google-analytics"

export default function HeadshotsPage() {
  // Your component state and logic
  const [displayedItems, setDisplayedItems] = useState([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [newItemsIds, setNewItemsIds] = useState([])
  const [manuallyPlayingVideos, setManuallyPlayingVideos] = useState({})
  const [videoSoundEnabled, setVideoSoundEnabled] = useState({})
  const masonryRef = useRef(null)
  const observerRef = useRef(null)
  const loadingRef = useRef(null)
  const videoRefs = useRef({})
  const [playingVideos, setPlayingVideos] = useState({})

  // Define gallery items
  const galleryItems = [
    {
      id: 1,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-8-27-angela-headshot-3304-Edit-2.jpg-uygucLH66ThUWsGws1OM8ReqAHyb2I.jpeg",
      alt: "Professional headshot of woman with dark hair in blue floral pattern top",
    },
    {
      id: 2,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-8-27-megan-headshot-3890-Edit.jpg-JH6KqVTddZQ3H8HvMT5DiDFs8ODnpr.jpeg",
      alt: "Professional headshot of woman with long brown hair in blue patterned shirt",
    },
    {
      id: 3,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-AB8I0521-2-Edit.jpg-VqOJfKcLWfZrk2Nwti6jIxh46k6b9S.jpeg",
      alt: "Professional headshot of man with gray hair in navy blue suit jacket",
    },
    {
      id: 4,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-AB8I9699-Edit.jpg-iY0QF1n0Cqz5w659eIFPaOXNVrEEqE.jpeg",
      alt: "Professional headshot of woman with brown hair in black blazer",
    },
    {
      id: 5,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-apple%20headshot%20photographer.jpg-Kx6sS5Uw1MZk0LxC9ANXBhaF3BGglH.jpeg",
      alt: "Professional headshot of man with styled hair and beard in patterned shirt",
    },
    {
      id: 6,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-Andy-headshot-5257-Edit-3.jpg-k6erqB2pvZFoiI1N1KMG29IwVkXiBB.jpeg",
      alt: "Professional headshot of man with glasses in white lab coat",
    },
    {
      id: 7,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-amy-headshot-2033-Edit-3.jpg-yYWumOptwYaRsJddLISklKugd1rG7r.jpeg",
      alt: "Professional headshot of Asian woman in white button-up shirt",
    },
    {
      id: 8,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-abby-931-Edit-Edit-2.jpg-hI0RmCQs7WnmeVFSJLhOB7vTCDmtYy.jpeg",
      alt: "Professional headshot of woman with reddish-brown hair in purple turtleneck",
    },
    {
      id: 9,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-angel-headshot-session2294.jpg-StlMLmvNvocT9uWthXevvphfDGdivX.jpeg",
      alt: "Professional headshot of man in dark suit with pink shirt and striped tie",
    },
    // New images added
    {
      id: 10,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-austyn-lee-headshot-757-Edit-2.jpg-UEZntThSE0v0P95puhxrA5RBXGKcXS.jpeg",
      alt: "Professional headshot of bald man with mustache and tattoos in purple floral patterned shirt",
    },
    {
      id: 11,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-emily-headshot-04-03-253415.jpg-J8nzVN2k6gmNaPSnjXDpK3D8j9hSG9.jpeg",
      alt: "Professional headshot of woman with curly dark hair in light blue button-up shirt",
    },
    {
      id: 12,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-chris--5.jpg-fryPgC9r4flesa5Jpw5PyRcp376SA5.jpeg",
      alt: "Professional headshot of bald man in gray suit jacket and white shirt",
    },
    {
      id: 13,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-eddie-headshot3156.jpg-3D4YmMoOS5FRgVhgGT0BR6kGXMLqhz.jpeg",
      alt: "Professional headshot of man with glasses in navy suit with blue shirt and striped tie",
    },
    {
      id: 14,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-bay%20area%20headshot.jpg-qB5ZlhEIxqfUkd3VS0xz3SVzGgcdY4.jpeg",
      alt: "Professional headshot of man with short reddish-blonde hair in light blue button-up shirt",
    },
    {
      id: 15,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-colby--5.jpg-AeI7c67D9kldSeGLkjOizD3yiIHPHS.jpeg",
      alt: "Professional headshot of man with dark hair and beard in black denim jacket",
    },
    {
      id: 16,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-colby--6.jpg-eomo6RSv6ZavJAYmE7jNLM5lTG4sK5.jpeg",
      alt: "Professional headshot of man with dark hair and beard in black denim jacket, different angle",
    },
    {
      id: 17,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-Colby%20columbia%20wealth3545%201%201.jpg-y6M6otZVkPmMbBpAlwQjxzUkqFC3Vq.jpeg",
      alt: "Professional headshot of man with glasses and mustache in navy suit with white shirt",
    },
    {
      id: 18,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-cheryl-233-Edit.jpg-PENIoJP85Cus19WZkP1OMjBI0I3VWb.jpeg",
      alt: "Professional headshot of woman with black hair in white patterned jacket with pearl necklace",
    },
    {
      id: 19,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-erica%20headshot%20retouch-12415-2.jpg-MYsa2kSGKsBjVuwYS1hbxgU4gpqT9s.jpeg",
      alt: "Professional headshot of woman with shoulder-length brown hair in black top",
    },
    {
      id: 20,
      type: "cta",
      title: "Book Your Session",
      text: "CLICK BOOK NOW FROM EITHER THE HEADSHOT OR PORTRAIT PAGE. CUSTOMIZE YOUR SESSION",
      color: "green",
    },
    {
      id: 21,
      type: "testimonial",
      name: "Tom Danowski",
      title: "VP Content Marketing, Ziply Fiber",
      quote:
        "Nathan did an amazing job! Lots of photos to choose from, gave artistic direction and helped us pick the best photos! 5star",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-tom-review.jpg-iC6FGaKijf5EoUxrX4ThVtcjnsTNRW.jpeg",
    },
    {
      id: 22,
      type: "video",
      src: "/images/emily-walton-portland-headshot-thumbnail.jpg",
      videoSrc:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Emily%20Walton%20Headshot%20Review-wGZkzE4NQP7YmonQZ9Nhsn73740iTk.mp4",
      alt: "Emily Walton video testimonial",
      overlay: {
        name: "Emily Walton",
        title: "Headshot Review",
      },
      stars: true,
    },
    {
      id: 23,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-headshot%20portland.jpg-RRJ9HrjS0663z2HBb5DZ2WCu5TeLH4.jpeg",
      alt: "Professional headshot of woman with short silver hair and red lipstick in black top against white background",
    },
    {
      id: 24,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-headshots%20san%20francisco.jpg-dpqpRin4RCmtBuh6HQ9Xlmuue4RQCZ.jpeg",
      alt: "Professional headshot of woman with shoulder-length brown hair in navy blue top against white background",
    },
    {
      id: 25,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-headshots-9-10-4434-Edit-4.jpg-VlQGNhGJN4ZHTcye8fDVynIy7jUA1c.jpeg",
      alt: "Professional headshot of Hispanic man with short dark hair and mustache in dark suit with white shirt",
    },
    {
      id: 26,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-erica%20headshot%20retouch-12778-2.jpg-OVxQLdACVtj1O0xj2UkpMlsX7qe91B.jpeg",
      alt: "Professional headshot of woman with shoulder-length brown hair in navy blue top against gray background",
    },
    {
      id: 27,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-headshots-9-10-4255-Edit.jpg-RYGxLnVB4hB7hHUvTcfQl17QzkLsv4.jpeg",
      alt: "Professional headshot of man with glasses and beard in navy blue suit with white shirt",
    },
    {
      id: 28,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-headshot%20portraits.jpg-zsBFyxRuBdJvY2ZCurysAQnjKoUjk3.jpeg",
      alt: "Professional headshot of man with styled dark hair and beard in black shirt against gray background",
    },
    {
      id: 29,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-headshots-9-10-4381-Edit.jpg-6C08zKhhBUDZteyFOf5A8IGc1oWUD4.jpeg",
      alt: "Professional headshot of Hispanic man with short dark hair in dark suit with white shirt against outdoor background",
    },
    {
      id: 30,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-Erik-Schmidt-Heashot1006.jpg-2dILUuyV1cOv3HFm3mwK9E63Ag51ol.jpeg",
      alt: "Professional headshot of man with red beard and short hair in dark gray sweater against gray background",
    },
    {
      id: 31,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-Headshots%202043.jpg-yzdibEc0giB8iaSfImdZAbHUkra2H3.jpeg",
      alt: "Professional headshot of woman with curly blonde hair in black top against dark background",
    },
    {
      id: 32,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-Headshots_Denver-2-2.jpg-kZxhCkp5EdMS0BnX2B79Ez2YYenqir.jpeg",
      alt: "Professional headshot of woman with short dark curly hair in green cardigan over blue top against dark background",
    },
    {
      id: 33,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-Mercer-609-Edit-2.jpg-IfZ8GpHfUVBi9nzLz5P2JxSuBR31n0.jpeg",
      alt: "Professional headshot of middle-aged man with brown hair and beard in navy blue suit with blue shirt against dark gray background",
    },
    {
      id: 34,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-liveperson-.jpg-yuv00yVjrQ8ryzLMxliVYa5b6vG5oq.jpeg",
      alt: "Professional headshot of man with glasses and salt-and-pepper beard in navy blue button-up shirt against white background",
    },
    {
      id: 35,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-leon-headshot-2856-Edit.jpg-M1VCGAfTMaMMdYKkawaiiuZtJHrbiw.jpeg",
      alt: "Professional headshot of young man with short dark hair in black suit and white shirt against gray background",
    },
    {
      id: 36,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-Mercer-1308-Edit-2.jpg-HFQq4OQKz5XhJufjeLCva633tdYvBi.jpeg",
      alt: "Professional headshot of man with silver hair and glasses in patterned suit jacket and white shirt against dark background",
    },
    {
      id: 37,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-john-headshot-2419-Edit-3.jpg-Wig7P3UD3HlrGf3mq5rzsuZFn8U2bO.jpeg",
      alt: "Professional headshot of man with dark hair in navy blue suit with white shirt against gray background",
    },
    {
      id: 38,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-kittleson%20headshot%20sam-headshot-5605-Edit.jpg-vm4W6AmxVu9Zl98GIBReiHR9ZagLbW.jpeg",
      alt: "Professional headshot of man with long curly blonde hair in blue and red plaid button-up shirt against gray background",
    },
    {
      id: 39,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-Jennifer%20Holland%20Headshot1603.jpg-DY8qVy4ouFJXvNKZ3z7iGlFGou52mJ.jpeg",
      alt: "Professional headshot of woman with long light brown hair in black top against gray background",
    },
    {
      id: 40,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-levi-headshot-after-.jpg-NRSwJolelIh3w2sFU0k08KKdl6L493.jpeg",
      alt: "Professional headshot of young man with short brown hair and beard in black shirt against gray background",
    },
    {
      id: 41,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-joel-soltman-headshot1344.jpg-F7HwWacGJ1jJDFc3AlWUX9WN4SVF3a.jpeg",
      alt: "Professional headshot of man with glasses and mustache in blue patterned suit jacket and white shirt against light gray background",
    },
    {
      id: 42,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-Jexport-7480.jpg-mY240fhgypz8fZ6EEX7UJGBQZ5r6eW.jpeg",
      alt: "Professional headshot of woman with shoulder-length blonde hair in black top with arms crossed against white background",
    },
    {
      id: 43,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-scott-headshot-2191-Edit.jpg-qOyXSnbMqyryx9IAXRv0CBctQViZ59.jpeg",
      alt: "Professional headshot of man with brown hair and beard in a black shirt against a gray background",
    },
    {
      id: 44,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-scott-headshot-2762-Edit.jpg-5b5sdAHLFHb8Q7dCRatV7sa64R4qDX.jpeg",
      alt: "Professional headshot of man with brown hair and beard in a blue linen shirt against a gray background with a bright smile",
    },
    {
      id: 45,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-Philip--2.jpg-dcuycrCWbCuHbTQtOVOvYMs9y9ZVo0.jpeg",
      alt: "Professional headshot of middle-aged man with brown hair in a black button-up shirt against a light blue background",
    },
    {
      id: 46,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-Philip--4.jpg-niHw1Yj3gH8hxpDDVFFoBosTdFC20G.jpeg",
      alt: "Professional headshot of middle-aged man with brown hair in a black button-up shirt against a white background",
    },
    {
      id: 47,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-micah%20headshot-.jpg-wAk3MAvjbfWmka0BxKJXJ992tBhj2L.jpeg",
      alt: "Professional headshot of young man with dark hair in a black button-up shirt against a white background",
    },
    {
      id: 48,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-Mikayla%20Montoya%20Headshot-4152-Edit.jpg-sDTdDzf35HxpGduNN7BDcgZ2iySagW.jpeg",
      alt: "Professional headshot of young woman with dark brown hair in a burgundy sleeveless turtleneck top against a gray background",
    },
    {
      id: 49,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-sahil-headshot-5085-Edit.jpg-kz5h1Zg36PiOQmgYNxFZcxrjmXOAEE.jpeg",
      alt: "Professional headshot of woman wearing a light gray hijab and black blazer with white shirt against a light gray background",
    },
    {
      id: 50,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-Non%20Profit%20Headshot%20Photographer.jpg-Lk7C8P5riovoSV3j5JJtrLFe8xekzs.jpeg",
      alt: "Professional headshot of woman wearing a tan hijab and black button-up shirt against a gray background",
    },
    {
      id: 51,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-Mercer-1651-Edit-Edit-2.jpg-AqkZeVu1temfVlwjANahEpVrBG3WwL.jpeg",
      alt: "Professional headshot of woman with short curly light brown hair and glasses in a mustard yellow coat over a striped shirt against a dark gray background",
    },
    {
      id: 52,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-nten-13511.jpg-6VaWzMUl38JNXSikk4rf6lWErJ0Zou.jpeg",
      alt: "Professional headshot of woman wearing a tan hijab and black top against a neutral background",
    },
    {
      id: 53,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-womens%20headshots.jpg-oIh67TsoOmzKtRPr7K4JU2CqcTm6YU.jpeg",
      alt: "Professional headshot of woman with blonde hair and glasses wearing a green top against a light gray background",
    },
    {
      id: 54,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-vestasteam-8803.jpg-AwbBCRHVsQu4mBsciAJ1He603Chyr6.jpeg",
      alt: "Professional headshot of woman with long blonde hair in a navy blue blazer with a colorful patterned top underneath",
    },
    {
      id: 55,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-Tom%20Fisher-698-Edit.jpg-5meyd79ogMCvfvHL1dS8R1b68KMT9b.jpeg",
      alt: "Professional headshot of bald older man with a bright smile wearing a navy blue patterned suit jacket with a white shirt",
    },
    {
      id: 56,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-vestasteam-8681.jpg-FB3mAjg4qzeALruS5VBOLQXYf71L2B.jpeg",
      alt: "Professional headshot of woman with short dark pixie-style hair and gold earrings wearing a white and black plaid button-up shirt",
    },
    {
      id: 57,
      type: "image",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-portland-vestasteam-8019.jpg-QwDxow6pnMDHUTV5oRjHC3LGb4Cztl.jpeg",
      alt: "Professional headshot of young man with short brown hair and beard wearing a navy blue suit jacket with a light blue button-up shirt",
    },
  ]

  const ITEMS_PER_PAGE = 8

  // Load initial items
  useEffect(() => {
    const initialItems = galleryItems.slice(0, ITEMS_PER_PAGE)
    setDisplayedItems(initialItems)
  }, [])

  // Load more items when page changes
  useEffect(() => {
    if (page === 1) return // Skip for initial load

    const loadMoreItems = () => {
      if (isLoading) return // Prevent multiple simultaneous loads

      setIsLoading(true)

      // Calculate the height of the masonry grid before adding new items
      const gridHeight = masonryRef.current?.offsetHeight || 0

      // Simulate network delay (shorter delay for better UX)
      setTimeout(() => {
        const startIndex = (page - 1) * ITEMS_PER_PAGE
        const endIndex = page * ITEMS_PER_PAGE
        const newItems = galleryItems.slice(startIndex, endIndex)

        if (newItems.length === 0) {
          setHasMore(false)
        } else {
          // Track the IDs of new items for styling
          setNewItemsIds(newItems.map((item) => item.id))

          // Add new items to the displayed items
          setDisplayedItems((prev) => [...prev, ...newItems])

          // Clear the new items IDs after animation completes
          setTimeout(() => {
            setNewItemsIds([])
          }, 1500) // Match this with animation duration
        }

        setIsLoading(false)
      }, 300) // Reduced from 500ms to 300ms for better responsiveness
    }

    loadMoreItems()
  }, [page, isLoading])

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    // Debounce function to prevent multiple triggers
    let debounceTimer

    const options = {
      root: null, // Use the viewport as the root
      rootMargin: "0px 0px 600px 0px", // Start loading when sentinel is 600px from viewport (increased from 400px)
      threshold: 0.1, // Trigger when 10% of the sentinel is visible
    }

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries

      if (entry.isIntersecting && !isLoading && hasMore) {
        // Clear any existing timer
        clearTimeout(debounceTimer)

        // Set a new timer to debounce the page increment
        debounceTimer = setTimeout(() => {
          setPage((prevPage) => prevPage + 1)
        }, 150) // Small debounce to prevent multiple triggers
      }
    }, options)

    if (loadingRef.current) {
      observer.observe(loadingRef.current)
    }

    observerRef.current = observer

    return () => {
      clearTimeout(debounceTimer)
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [isLoading, hasMore])

  // Set up intersection observer for video autoplay
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // When 50% of the video is visible
    }

    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const videoId = entry.target.dataset.videoId
        if (videoId) {
          // Only auto-control videos that haven't been manually interacted with
          if (!manuallyPlayingVideos[videoId]) {
            if (entry.isIntersecting) {
              // Video is in view, play it (muted)
              setPlayingVideos((prev) => ({ ...prev, [videoId]: true }))
              const videoElement = entry.target.querySelector("video")
              if (videoElement) {
                videoElement.muted = true
                videoElement.play().catch((e) => console.log("Autoplay prevented:", e))
              }
            } else {
              // Video is out of view, pause it
              setPlayingVideos((prev) => ({ ...prev, [videoId]: false }))
              const videoElement = entry.target.querySelector("video")
              if (videoElement) {
                videoElement.pause()
              }
            }
          }
        }
      })
    }, options)

    // Observe all video containers
    const videoContainers = document.querySelectorAll(`.${styles.videoContainer}`)
    videoContainers.forEach((container) => {
      videoObserver.observe(container)
    })

    return () => {
      videoObserver.disconnect()
    }
  }, [displayedItems, manuallyPlayingVideos])

  // Handle video click
  const handleVideoClick = (id) => {
    const videoElement = videoRefs.current[id]?.querySelector("video")
    if (!videoElement) return

    // If video is already manually playing, pause it
    if (manuallyPlayingVideos[id]) {
      videoElement.pause()
      setManuallyPlayingVideos((prev) => ({ ...prev, [id]: false }))
      return
    }

    // Otherwise, start playing from beginning with sound
    videoElement.currentTime = 0
    videoElement.muted = false
    videoElement.play().catch((e) => {
      console.log("Play with sound prevented:", e)
      // Fallback to muted if autoplay with sound is blocked
      videoElement.muted = true
      videoElement.play()
    })

    setManuallyPlayingVideos((prev) => ({ ...prev, [id]: true }))
    setVideoSoundEnabled((prev) => ({ ...prev, [id]: true }))
  }

  // Check if an item is newly added
  const isNewItem = (id) => {
    return newItemsIds.includes(id)
  }

  return (
    <main className={styles.container}>
      <GoogleAnalytics />
      {/* Header and Hero Section - Wrapped in the same container structure */}
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
                        style={{ maxWidth: "100px", width: "auto", height: "auto" }}
                      />
                    </div>
                  </Link>
                </div>
                <nav>
                  <ul className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
                    <li>
                      <Link href="#" className="bg-white text-[#247BA0] px-4 py-2 rounded">
                        HEADSHOTS
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:underline">
                        PORTRAITS
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:underline">
                        FOR TEAMS
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:underline">
                        GRAD
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:underline">
                        MODEL
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:underline">
                        ABOUT
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:underline">
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
                PROFESSIONAL HEADSHOT GALLERY
              </h1>
              <p className="font-playfair text-xl md:text-2xl mb-12">Your best headshot ever is a few clicks away</p>
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

      {/* Gallery Section - In a container with the requested styling */}
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

            {/* Initial Loading Indicator */}
            {displayedItems.length === 0 && (
              <div className="text-center mb-8">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#247BA0] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-2 text-gray-400">Loading gallery...</p>
              </div>
            )}

            {/* True Masonry Grid */}
            <div
              ref={masonryRef}
              className={styles.masonryGrid}
              style={{ opacity: displayedItems.length > 0 ? 1 : 0.5, transition: "opacity 0.3s ease" }}
            >
              {displayedItems.map((item) => (
                <div
                  key={item.id}
                  className={`${styles.masonryItem} ${isNewItem(item.id) ? styles.newItem : ""}`}
                  style={{
                    opacity: isNewItem(item.id) ? 0.7 : 1,
                    transition: "opacity 0.5s ease",
                  }}
                >
                  {item.type === "image" && (
                    <div className={styles.mediaContent}>
                      <div className={styles.masonryImageContainer}>
                        <div className={styles.skeletonPulse}></div>
                        <Image
                          src={item.src || "/confident-professional.png"}
                          alt={item.alt || "Gallery image"}
                          width={800}
                          height={600}
                          className={`${styles.masonryImage} ${styles.masonryImageLoaded}`}
                          loading="lazy"
                          onLoadingComplete={(img) => {
                            img.classList.add(styles.masonryImageLoaded)
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {item.type === "video" && (
                    <div
                      className={`${styles.mediaContent} ${styles.videoContainer} ${manuallyPlayingVideos[item.id] ? styles.userPlaying : ""}`}
                      data-video-id={item.id}
                      ref={(el) => {
                        if (el) videoRefs.current[item.id] = el
                      }}
                      onClick={() => handleVideoClick(item.id)}
                    >
                      <div className={styles.masonryImageContainer} style={{ aspectRatio: "9/16" }}>
                        {/* Video element that autoplays when in viewport */}
                        <video
                          src={item.videoSrc || "/videos/Gallerymp4.mp4"}
                          poster={item.src || "/images/emily-walton-portland-headshot-thumbnail.jpg"}
                          muted={!videoSoundEnabled[item.id]}
                          loop
                          playsInline
                          className="w-full h-full object-cover"
                          style={{ aspectRatio: "9/16" }}
                          autoPlay={playingVideos[item.id]}
                        />

                        {/* Play/Pause and Sound Indicator */}
                        <div
                          className={`absolute inset-0 flex items-center justify-center z-10 ${styles.videoControls}`}
                        >
                          <div className="bg-black/30 rounded-full p-3 backdrop-blur-sm transition-opacity opacity-0 group-hover:opacity-100">
                            {manuallyPlayingVideos[item.id] ? (
                              <Pause className="h-8 w-8 text-white" />
                            ) : (
                              <Play className="h-8 w-8 text-white" fill="white" />
                            )}
                          </div>

                          {/* Sound indicator */}
                          {manuallyPlayingVideos[item.id] && (
                            <div className="absolute bottom-16 right-4 bg-black/30 rounded-full p-2 backdrop-blur-sm">
                              {videoSoundEnabled[item.id] ? (
                                <Volume2 className="h-5 w-5 text-white" />
                              ) : (
                                <VolumeX className="h-5 w-5 text-white" />
                              )}
                            </div>
                          )}
                        </div>

                        {/* Overlay with info */}
                        {item.overlay && (
                          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/80 to-transparent z-10">
                            {item.stars && (
                              <div className="flex mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-[#FFA500] fill-[#FFA500]" />
                                ))}
                              </div>
                            )}
                            <h3 className={`text-lg sm:text-xl font-bodoniModa italic text-white`}>
                              {item.overlay.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-white/80">{item.overlay.title}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {item.type === "testimonial" && (
                    <div className="bg-[#1a1a1a] p-4 sm:p-6 flex flex-col">
                      <div className="flex mb-3 sm:mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-[#FFA500] fill-[#FFA500]" />
                        ))}
                      </div>
                      <div className="mb-3 sm:mb-4">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden flex-shrink-0 hidden sm:block">
                            {item.avatar ? (
                              <Image
                                src={item.avatar || "/placeholder.svg"}
                                alt={`${item.name} avatar`}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                                <span className="text-xs text-gray-500">Avatar</span>
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className={`text-lg sm:text-xl font-bodoniModa italic text-white`}>{item.name}</h3>
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

                  {item.type === "cta" && (
                    <div
                      className="bg-[#247BA0]/20 p-4 sm:p-6 flex flex-col justify-between"
                      style={{ minHeight: "200px" }}
                    >
                      <h3 className={`text-lg sm:text-xl font-bodoniModa italic text-white`}>{item.title}</h3>
                      <div className="mt-2 sm:mt-4">
                        <p className="text-xs sm:text-sm text-white mb-3 sm:mb-4 uppercase">{item.text}</p>
                        <div className="flex justify-end">
                          <div className="bg-[#247BA0] rounded-full p-1.5 sm:p-2">
                            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Loading Sentinel with improved visual feedback */}
            {hasMore && (
              <div
                ref={loadingRef}
                className="h-20 w-full flex items-center justify-center my-8"
                style={{ minHeight: isLoading ? "100px" : "0" }}
              >
                {isLoading ? (
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-[#247BA0] border-r-transparent"></div>
                    <p className="mt-2 text-gray-400 text-sm">Loading more images...</p>
                  </div>
                ) : (
                  <div className="h-10 opacity-0">Loading trigger</div>
                )}
              </div>
            )}

            {/* End of Gallery Message */}
            {!hasMore && displayedItems.length > 0 && (
              <div className="text-center mt-8 text-gray-400">
                <p>You've reached the end of the gallery</p>
              </div>
            )}
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
                <p>750 SW 9TH AVE | PORTLAND, OR 97205</p>
                <span className="hidden lg:inline-block">•</span>
                <p>STUDIO HOURS | 8 AM—10 PM DAILY</p>
                <span className="hidden lg:inline-block">•</span>
                <p>24/7 CUSTOMER SERVICE | 509.840.7925</p>
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
