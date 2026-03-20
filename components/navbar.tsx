import Image from "next/image"
import Link from "next/link"

const NAV_ITEMS = [
  { label: "HOME", href: "/" },
  { label: "HEADSHOTS", href: "/headshots" },
  { label: "PORTRAITS", href: "/portraits" },
  { label: "GRAD", href: "/grad" },
  { label: "MODEL", href: "/model" },
  { label: "ABOUT", href: "/about" },
  { label: "FOR TEAMS", href: "/for-teams" },
  { label: "CONTACT", href: "/contact" },
]

export default function Navbar() {
  return (
    <>
      {/* Hidden checkbox — controls mobile menu via CSS */}
      <input type="checkbox" id="nav-toggle" className="hidden peer/menu" aria-hidden="true" />

      <header className="w-full text-white py-6 px-5 md:px-16 relative">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="block z-[60]">
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
                  <Link
                    href={item.href}
                    className="hover:underline focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none rounded"
                  >
                    {item.label}
                  </Link>
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

      {/* Mobile overlay — sibling of checkbox, uses peer-checked */}
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
                <label htmlFor="nav-toggle" className="cursor-pointer">
                  <Link
                    href={item.href}
                    className="text-white text-xl hover:text-brand-teal transition-colors"
                  >
                    {item.label}
                  </Link>
                </label>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
