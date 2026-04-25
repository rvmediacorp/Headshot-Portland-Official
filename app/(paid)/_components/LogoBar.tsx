import Image from "next/image"
import { COMPANY_LOGOS } from "@/lib/hero-images"

const SMALLER_LOGOS = new Set([
  "Nike",
  "Amazon",
  "Keen",
  "Google",
  "Apple",
  "Intel",
  "Facebook",
  "Costco",
])

export default function LogoBar() {
  return (
    <div className="w-full px-[10px] my-[10px]">
    <section
      aria-labelledby="logo-bar-heading"
      className="w-full rounded-[10px] bg-[#FAFAF7] text-[#111]"
    >
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <p
          id="logo-bar-heading"
          className="text-center text-xs font-medium uppercase tracking-[0.14em] text-[#666]"
        >
          People from these companies have trusted Headshot Portland to photograph their professional portraits.
        </p>
        <ul className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-10 sm:gap-x-10 sm:gap-y-12">
          {COMPANY_LOGOS.map((logo) => {
            const smaller = SMALLER_LOGOS.has(logo.alt)
            return (
              <li
                key={logo.alt}
                className="flex h-12 w-[130px] items-center justify-center sm:h-14 sm:w-[150px]"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={150}
                  height={56}
                  className={`max-h-full max-w-full w-auto object-contain ${smaller ? "scale-[0.78]" : ""}`}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </section>
    </div>
  )
}
