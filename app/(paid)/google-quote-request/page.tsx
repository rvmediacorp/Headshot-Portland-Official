import Image from "next/image"
import Link from "next/link"
import { Phone } from "lucide-react"
import QuoteForm from "../_components/QuoteForm"
import TrustBar from "../_components/TrustBar"

export const metadata = {
  title: "Get your custom quote — Headshot Portland",
}

export default function GoogleQuoteRequestPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-black antialiased" style={{ "--brand": "#1e7a96" } as React.CSSProperties}>
      <style>{`
        body { background-color: #000 !important; color: #fff !important; }
        .btn-brand {
          background-color: var(--brand);
          color: #fff;
        }
        .btn-brand:hover { filter: brightness(1.08); }
        .focus-ring {
          outline: 2px solid transparent;
          outline-offset: 2px;
        }
        .focus-ring:focus-visible {
          outline: 3px solid var(--brand);
          outline-offset: 3px;
          border-radius: 0.5rem;
        }
      `}</style>

      {/* Header */}
      <header className="flex h-16 sm:h-[72px] items-center justify-between px-4 lg:px-12 border-b border-white/10 bg-black">
        <Link href="/" aria-label="Headshot Portland — home" className="focus-ring rounded-md">
          <Image
            src="/images/logos/headshot_portland_white.svg"
            alt="Headshot Portland"
            width={153}
            height={52}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        <a
          href="tel:+15033137121"
          className="focus-ring btn-brand inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold"
        >
          <Phone className="h-4 w-4" aria-hidden />
          <span className="hidden sm:inline">503.313.7121</span>
          <span className="sm:hidden">Call Now</span>
        </a>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl text-white">
              Get your custom quote
            </h1>
            <p className="mt-2 text-[15px] text-white/70">
              Select an option below to get started. We reply within 1 business hour.
            </p>
          </div>
          <QuoteForm niche="corporate" variant="on-light" />
          <div className="mt-4">
            <TrustBar />
          </div>
        </div>
      </main>
    </div>
  )
}
