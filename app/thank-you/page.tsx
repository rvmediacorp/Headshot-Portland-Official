import Link from "next/link"
import Image from "next/image"
import Script from "next/script"
import { Phone, ArrowLeft, Calendar } from "lucide-react"
import GoogleAnalytics from "@/components/google-analytics"

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-dark-bg text-white">
      <GoogleAnalytics />

      {/* Google Ads Conversion Tracking */}
      <Script id="google-conversion-tracking" strategy="afterInteractive">
        {`
          gtag('event', 'conversion', {'send_to': 'AW-847156852/DiA7CM_nqYEDEPSs-pMD'});
        `}
      </Script>

      {/* Header */}
      <header className="w-full text-white py-6 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <Link href="/" className="block">
            <div className="w-32 h-10 relative">
              <Image src="/images/logo.png" alt="Headshot Portland" fill priority className="object-contain" />
            </div>
          </Link>
        </div>
      </header>

      {/* Thank You Content */}
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
          <div className="max-w-3xl mx-auto text-center px-4">
            {/* Success Icon */}
            <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#247BA0]/20">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 6L9 17L4 12"
                  stroke="#247BA0"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Title */}
            <h1 className="font-bodoniModa text-4xl md:text-5xl lg:text-6xl mb-6 text-white">Thank You!</h1>

            {/* Message */}
            <p className="text-xl md:text-2xl mb-8 text-[#247BA0] font-playfair">
              Your quote request has been received
            </p>

            <div className="bg-[#1C1B1C] p-8 rounded-lg mb-10 text-left">
              <p className="mb-6 text-lg">
                We've received your information and will be in touch shortly with your personalized quote. Here's what
                happens next:
              </p>

              <ol className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#247BA0] text-white mr-3">
                    1
                  </span>
                  <span>Our team will review your request and prepare a custom quote based on your needs.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#247BA0] text-white mr-3">
                    2
                  </span>
                  <span>You'll receive your quote via email within 24 hours (often much sooner).</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#247BA0] text-white mr-3">
                    3
                  </span>
                  <span>If you have any questions, feel free to call us directly using the button below.</span>
                </li>
              </ol>

              <p className="text-[#247BA0] italic">Need immediate assistance? Call us now:</p>
            </div>

            {/* Call Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href="tel:5033137121"
                className="bg-[#247BA0] text-white px-8 py-4 rounded-md flex items-center justify-center gap-2 hover:bg-[#1d6a85] transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span className="font-bold">CALL NOW: 503-313-7121</span>
              </a>

              <Link
                href="https://ww3.headshotportland.com/instant"
                className="border border-[#247BA0] text-white px-8 py-4 rounded-md flex items-center justify-center gap-2 hover:bg-[#247BA0]/10 transition-colors"
              >
                <Calendar className="h-5 w-5" />
                <span className="font-bold">BOOK NOW</span>
              </Link>
            </div>

            {/* Return Home Link */}
            <Link href="/" className="inline-flex items-center text-[#247BA0] hover:underline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Homepage
            </Link>
          </div>
        </section>
      </div>

      {/* Simple Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            805 SW Broadway | PORTLAND, OR 97205 • STUDIO HOURS | 8 AM—10 PM DAILY • 24/7 CUSTOMER SERVICE | 503-313-7121
          </p>
          <p className="mt-4 text-xs text-gray-500">
            © {new Date().getFullYear()} Headshot Portland. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
