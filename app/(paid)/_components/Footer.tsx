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
    <footer className="border-t border-black/5 bg-[#FAFAF7]">
      <div className="mx-auto max-w-6xl px-5 pb-28 pt-10 sm:px-8 sm:py-12">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <Link href="/" className="focus-ring inline-flex items-center">
            <Image
              src="/images/logos/headshot_portland_black.svg"
              alt="Headshot Portland"
              width={148}
              height={32}
              className="h-7 w-auto"
            />
          </Link>
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[#444]">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="focus-ring rounded px-1 underline-offset-4 hover:underline"
                >
                  Also serving: {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <dl className="mt-8 grid grid-cols-1 gap-4 text-sm text-[#444] sm:grid-cols-3">
          <div className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 text-[#666]" aria-hidden />
            <div>
              <dt className="sr-only">Address</dt>
              <dd>
                805 SW Broadway
                <br />
                Portland, OR 97205
              </dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Phone className="mt-0.5 h-4 w-4 text-[#666]" aria-hidden />
            <div>
              <dt className="sr-only">Phone</dt>
              <dd>
                <a
                  href="tel:+15033137121"
                  className="focus-ring rounded font-medium text-[#111] underline-offset-4 hover:underline"
                >
                  503.313.7121
                </a>
                <br />
                <span className="text-[#777]">24/7 customer service</span>
              </dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="mt-0.5 h-4 w-4 text-[#666]" aria-hidden />
            <div>
              <dt className="sr-only">Hours</dt>
              <dd>
                Mon–Fri 9am–6pm
                <br />
                Sat 10am–4pm
              </dd>
            </div>
          </div>
        </dl>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-black/5 pt-6 text-xs text-[#777] sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} Headshot Portland. Photography by
            Nathan Reimche-Vu.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-[#111]">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[#111]">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
