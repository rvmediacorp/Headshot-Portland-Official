import Image from "next/image"
import { COMPANY_LOGOS } from "@/lib/hero-images"

export default function LogoBar() {
  return (
    <section
      aria-labelledby="logo-bar-heading"
      className="border-y border-black/5 bg-[#FAFAF7]"
    >
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <p
          id="logo-bar-heading"
          className="text-center text-xs font-medium uppercase tracking-[0.14em] text-[#666]"
        >
          People from these companies have trusted Headshot Portland to photograph their professional portraits.
        </p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-12">
          {COMPANY_LOGOS.map((logo) => (
            <li
              key={logo.alt}
              className="transition hover:scale-105"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={96}
                height={32}
                className="h-8 w-auto sm:h-10 object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
