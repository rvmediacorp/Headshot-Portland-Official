"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import NavLink from "./nav-link"

/**
 * Routes that supply their own focused header (paid landing pages, etc).
 * The global marketing nav is suppressed there to keep conversion pages clean.
 */
const SUPPRESS_PREFIXES = [
  "/corporate-headshots",
  "/actor-headshots",
  "/linkedin-headshots",
  "/modeling-headshots",
  "/realtor-headshots",
  "/google-quote-request",
]

const NAV_ITEMS = [
  { label: "HOME", href: "/" },
  { label: "HEADSHOTS", href: "/headshots" },
  { label: "PORTRAITS", href: "/portraits" },
  // { label: "MODEL", href: "/model" }, // temporarily hidden
  { label: "REVIEWS", href: "/reviews" },
  { label: "ABOUT", href: "/about" },
  { label: "FOR TEAMS", href: "/for-teams" },
  { label: "CONTACT", href: "/contact" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (
    pathname &&
    SUPPRESS_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  ) {
    return null
  }

  return (
    <>
      {/* Hidden checkbox — controls mobile menu via CSS */}
      <input type="checkbox" id="nav-toggle" className="hidden peer/menu" aria-hidden="true" />

      <header
        className={`sticky top-0 z-50 w-full text-white py-6 px-5 md:px-16 transition-colors duration-200 ${
          scrolled ? "border-b border-white/10 bg-black/70 backdrop-blur-md" : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="block z-60">
            <div className="w-24 h-8 relative">
              <Image
                src="/images/logos/headshot_portland_white.svg"
                alt="Headshot Portland"
                fill
                priority
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <ul className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <NavLink
                    href={item.href}
                    className="hover:underline focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-hidden rounded"
                    activeClassName="bg-white text-brand-teal px-4 py-2 rounded-full font-bold focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-hidden"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile toggle button */}
          <label htmlFor="nav-toggle" className="md:hidden text-white cursor-pointer" aria-label="Toggle menu">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </label>
        </div>
      </header>

      {/* Mobile overlay */}
      <div className="fixed inset-0 bg-dark-bg z-50 hidden flex-col items-center justify-center peer-checked/menu:flex">
        {/* Close button */}
        <label htmlFor="nav-toggle" className="absolute top-6 right-5 text-white cursor-pointer" aria-label="Close menu">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </label>
        <nav>
          <ul className="flex flex-col space-y-6 text-center">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <NavLink
                  href={item.href}
                  className="text-white text-xl hover:text-brand-teal transition-colors"
                  activeClassName="text-brand-teal text-xl font-bold"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
