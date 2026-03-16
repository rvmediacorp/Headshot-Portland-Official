"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV_ITEMS = ["HOME", "HEADSHOTS", "PORTRAITS", "GRAD", "MODEL", "ABOUT", "FOR TEAMS", "CONTACT"]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="w-full text-white py-6 px-5 md:px-16">
      <div className="flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <div className="mb-6 md:mb-0">
          <Link href="/" className="block">
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
        </div>

        {/* Nav links */}
        <nav>
          <ul className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
            {NAV_ITEMS.map((item) => {
              const href = item === "HOME" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`
              const isActive = pathname === href || (item === "HOME" && pathname === "/")
              return (
                <li key={item}>
                  <Link
                    href={href}
                    className={
                      isActive
                        ? "bg-white text-brand-teal px-4 py-2 rounded-full font-bold focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                        : "hover:underline focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none rounded"
                    }
                  >
                    {item}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
