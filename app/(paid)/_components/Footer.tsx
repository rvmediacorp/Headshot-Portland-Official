import Image from "next/image"
import Link from "next/link"
import { Phone, MapPin, Clock } from "lucide-react"

const NICHE_LINKS: { href: string; label: string }[] = [
  { href: "/corporate-headshots", label: "Corporate" },
  { href: "/actor-headshots", label: "Actor" },
  { href: "/linkedin-headshots", label: "LinkedIn" },
  { href: "/modeling-headshots", label: "Modeling" },
  { href: "/realtor-headshots", label: "Realtor" },
]

interface FooterProps {
  /** Path of the page rendering this footer — that link is excluded from the row. */
  currentPath?: string
}

export default function Footer({ currentPath }: FooterProps) {
  const links = NICHE_LINKS.filter((l) => l.href !== currentPath)
  return (
    <div className="w-full px-[10px] my-[10px]">
    <footer className="w-full rounded-[10px] bg-[#0F0E0F]">
      <div className="mx-auto max-w-6xl px-5 pb-28 pt-12 sm:px-8 sm:py-16">
        {/* Logo row */}
        <Link href="/" className="focus-ring inline-flex items-center">
          <Image
            src="/images/logos/headshot_portland_white.svg"
            alt="Headshot Portland"
            width={148}
            height={32}
            className="h-8 w-auto"
          />
        </Link>

        {/* Contact grid */}
        <dl className="mt-10 grid grid-cols-1 gap-6 text-sm text-white/70 sm:grid-cols-3">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/50" aria-hidden />
            <div>
              <dt className="mb-1 text-xs uppercase tracking-wider text-white/50">Studio</dt>
              <dd className="leading-relaxed">
                805 SW Broadway
                <br />
                Portland, OR 97205
              </dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-white/50" aria-hidden />
            <div>
              <dt className="mb-1 text-xs uppercase tracking-wider text-white/50">Call</dt>
              <dd className="leading-relaxed">
                <a
                  href="tel:+15033137121"
                  className="focus-ring rounded font-medium text-white underline-offset-4 hover:underline"
                >
                  503.313.7121
                </a>
                <br />
                <span className="text-white/50">24/7 customer service</span>
              </dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-white/50" aria-hidden />
            <div>
              <dt className="mb-1 text-xs uppercase tracking-wider text-white/50">Hours</dt>
              <dd className="leading-relaxed">
                Mon–Fri 9am–6pm
                <br />
                Sat 10am–4pm
              </dd>
            </div>
          </div>
        </dl>

        {/* Also serving */}
        {links.length > 0 && (
          <div className="mt-10 border-t border-white/10 pt-8">
            <p className="text-xs uppercase tracking-wider text-white/50">Also serving</p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/80">
              {links.map((l, i) => (
                <li key={l.href} className="flex items-center gap-4">
                  <Link
                    href={l.href}
                    className="focus-ring rounded underline-offset-4 hover:underline hover:text-white"
                  >
                    {l.label} headshots
                  </Link>
                  {i < links.length - 1 && <span aria-hidden className="text-white/20">·</span>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} Headshot Portland. Photography by Nathan Reimche-Vu.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
    </div>
  )
}
