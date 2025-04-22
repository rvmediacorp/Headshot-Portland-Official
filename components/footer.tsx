import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook } from "lucide-react"

export default function Footer() {
  return (
    <div className="w-full px-[10px] my-[10px]">
      <footer className="w-full bg-[#151315] py-8 md:py-12 px-4 md:px-8 lg:px-16 rounded-[10px]">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden md:flex md:flex-row md:justify-between md:items-center">
            {/* Left Side - Logo and Text */}
            <div className="flex items-center">
              <Link href="/" className="mr-6">
                <Image src="/images/logo.png" alt="Headshot Portland" width={200} height={60} className="h-auto w-40" />
              </Link>
              <div className="h-12 w-px bg-gray-700 mx-6"></div>
              <div className="text-white text-sm">
                PORTLAND&apos;S TOP FULL-SERVICE
                <br />
                HEADSHOT & PORTRAIT
                <br />
                PHOTOGRAPHY STUDIO
              </div>
            </div>

            {/* Right Side - Social Icons */}
            <div className="flex items-center space-x-4">
              <Link
                href="https://instagram.com/headshotportland"
                aria-label="Instagram"
                className="text-white hover:text-[#247BA0] transition-colors"
              >
                <Instagram size={24} />
              </Link>
              <Link
                href="https://facebook.com/headshotportland"
                aria-label="Facebook"
                className="text-white hover:text-[#247BA0] transition-colors"
              >
                <Facebook size={24} />
              </Link>
            </div>
          </div>

          {/* Horizontal Line - Desktop */}
          <div className="hidden md:block h-px w-full bg-gray-700 my-6"></div>

          {/* Info Section - Desktop */}
          <div className="hidden md:flex md:justify-between md:items-center">
            <div className="flex items-center text-white text-sm">
              <span>805 SW Broadway | PORTLAND, OR 97205</span>
              <span className="mx-4 text-lg">•</span>
              <span>STUDIO HOURS | 8 AM—10 PM DAILY</span>
              <span className="mx-4 text-lg">•</span>
              <span>24/7 CUSTOMER SERVICE | 503.313.7121</span>
            </div>
            <Link
              href="/contact"
              className="border border-[#247BA0] text-white hover:bg-[#247BA0] transition-colors px-6 py-3 rounded-md"
            >
              CONTACT US
            </Link>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden flex flex-col items-center text-center">
            {/* Logo */}
            <div className="mb-6">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="Headshot Portland"
                  width={200}
                  height={60}
                  className="h-auto w-48 mx-auto"
                />
              </Link>
            </div>

            {/* Horizontal Line */}
            <div className="h-px w-full bg-gray-700 my-6"></div>

            {/* Studio Description */}
            <div className="text-white text-base mb-6">
              PORTLAND&apos;S TOP FULL-SERVICE HEADSHOT
              <br />& PORTRAIT PHOTOGRAPHY STUDIO
            </div>

            {/* Horizontal Line */}
            <div className="h-px w-full bg-gray-700 my-6"></div>

            {/* Address & Hours - Mobile */}
            <div className="flex flex-col space-y-4 text-white text-sm mb-6">
              <div className="flex items-center">
                <span className="mr-2 text-lg">•</span>
                <span>805 SW Broadway | PORTLAND, OR 97205</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-lg">•</span>
                <span>STUDIO HOURS | 8 AM—10 PM DAILY</span>
              </div>
              <div>
                <span>24/7 CUSTOMER SERVICE | 503.313.7121</span>
              </div>
            </div>

            {/* Contact Button - Mobile */}
            <Link
              href="/contact"
              className="w-full border border-[#247BA0] text-white text-center py-4 rounded-md mb-6"
            >
              CONTACT US
            </Link>

            {/* Social Icons - Mobile */}
            <div className="flex justify-center space-x-6 mt-4">
              <Link
                href="https://instagram.com/headshotportland"
                aria-label="Instagram"
                className="text-white hover:text-[#247BA0] transition-colors"
              >
                <Instagram size={28} />
              </Link>
              <Link
                href="https://facebook.com/headshotportland"
                aria-label="Facebook"
                className="text-white hover:text-[#247BA0] transition-colors"
              >
                <Facebook size={28} />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
