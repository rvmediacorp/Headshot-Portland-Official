"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "motion/react"

/**
 * Routes that supply their own conversion CTA — the global sticky button is
 * suppressed on these so it never doubles up with the page-level CTA.
 */
const SUPPRESS_PREFIXES = [
  "/corporate-headshots",
  "/actor-headshots",
  "/linkedin-headshots",
  "/modeling-headshots",
  "/realtor-headshots",
  "/thank-you",
  "/google-quote-request",
]

interface StickyCTAProps {
  href?: string
  label?: string
  /** Fraction of viewport height the user must scroll past before the button appears. */
  showAfterVh?: number
  /** Pixel distance from the bottom of the page at which the button hides (to avoid overlapping the footer). */
  hideNearBottomPx?: number
}

export default function StickyCTA({
  href = "https://ww3.headshotportland.com/instant-quote",
  label = "GET FREE QUOTE",
  showAfterVh = 0.6,
  hideNearBottomPx = 240,
}: StickyCTAProps) {
  const pathname = usePathname()
  const suppressed = SUPPRESS_PREFIXES.some((prefix) =>
    pathname?.startsWith(prefix)
  )
  const [visible, setVisible] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    let ticking = false

    const update = () => {
      const scrolled = window.scrollY
      const viewportH = window.innerHeight
      const docH = document.documentElement.scrollHeight

      const pastHero = scrolled > viewportH * showAfterVh
      const nearBottom = scrolled + viewportH >= docH - hideNearBottomPx

      setVisible(pastHero && !nearBottom)
      ticking = false
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [showAfterVh, hideNearBottomPx])

  if (suppressed) return null

  return (
    <motion.div
      className="fixed z-40 inset-x-4 bottom-4 flex justify-center sm:inset-x-auto sm:right-6 sm:bottom-6 sm:justify-end pointer-events-none"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.96,
      }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { type: "spring", duration: 0.5, bounce: 0.4 }
      }
      aria-hidden={!visible}
    >
      <Link
        href={href}
        className="cta-button cta-primary button-text text-sm md:text-base shadow-2xl shadow-black/40 ring-1 ring-white/10 hover:opacity-90 active:scale-[0.97] pointer-events-auto group"
        aria-label={`${label} — get a free headshot photography quote`}
        tabIndex={visible ? 0 : -1}
        data-cta="sticky-quote"
      >
        <span>{label}</span>
        <span className="arrow-icon w-8 h-8 md:w-10 md:h-10">
          <ArrowUpRight size={16} className="md:size-5 transition-transform duration-150 ease-out motion-reduce:transition-none group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </Link>
    </motion.div>
  )
}
