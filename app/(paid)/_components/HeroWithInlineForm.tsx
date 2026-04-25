import Image from "next/image"
import QuoteForm from "./QuoteForm"
import TrustBar from "./TrustBar"
import type { Niche } from "@/types/lead"
import type { HeroImage } from "@/lib/hero-images"

interface HeroWithInlineFormProps {
  niche: Niche
  headline: string
  subhead: string
  images: HeroImage[]
}

export default function HeroWithInlineForm({
  niche,
  headline,
  subhead,
  images,
}: HeroWithInlineFormProps) {
  // Mobile shows 4 tiles (2x2), tablet+ shows all 6 (3x2). Mark first 2 priority.
  const grid = images.slice(0, 6)

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full"
    >
      {/* Mobile + tablet: stacked grid → headline → form, all above the fold.
          Desktop: side-by-side hero with form card. */}
      <div className="relative isolate">
        {/* Image grid + overlay (mobile/tablet) */}
        <div className="relative w-full overflow-hidden lg:hidden">
          <div className="grid h-[55svh] min-h-[360px] grid-cols-2 grid-rows-2 gap-0 sm:h-[58svh] sm:grid-cols-3">
            {grid.map((img, i) => {
              // 2x2 = 4 visible on mobile, 3x2 = 6 on sm+
              const hideOnMobile = i >= 4 ? "hidden sm:block" : ""
              return (
                <div
                  key={`${img.src}-${i}`}
                  className={`relative h-full w-full overflow-hidden ${hideOnMobile}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 0vw"
                    priority={i < 2}
                    className="object-cover"
                  />
                </div>
              )
            })}
          </div>

          {/* Bottom-to-top dark gradient for text readability */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(15,14,15,1) 0%, rgba(15,14,15,0.85) 25%, rgba(15,14,15,0.4) 60%, rgba(15,14,15,0) 100%)",
            }}
          />

          {/* Bottom-left headline + subhead — bottom padding clears the form that overlaps by -mt-8 */}
          <div className="absolute inset-0 flex flex-col items-start justify-end p-5 pb-14 sm:p-8 sm:pb-14">
            <h1
              id="hero-heading"
              data-display
              className="text-balance text-2xl font-semibold leading-[1.15] text-white sm:text-3xl"
            >
              {headline}
            </h1>
            <p className="mt-2 max-w-md text-pretty text-sm leading-relaxed text-white/85 sm:text-[15px]">
              {subhead}
            </p>
          </div>
        </div>

        {/* Form card (mobile/tablet) — sits in the bottom 40-45% of the viewport */}
        <div className="relative -mt-8 px-4 pb-6 sm:-mt-10 sm:px-6 lg:hidden">
          <QuoteForm niche={niche} />
          <div className="mt-3">
            <TrustBar />
          </div>
        </div>

        {/* Desktop hero — split layout */}
        <div className="hidden lg:block">
          <div className="relative mx-auto grid max-w-7xl grid-cols-12 gap-8 px-8 pb-12 pt-10 xl:px-12">
            <div className="relative col-span-7 isolate overflow-clip rounded-2xl bg-black">
              <div className="grid grid-cols-3 grid-rows-2 gap-2">
                {grid.map((img, i) => {
                  // Corner cells get matching radius so their own clip handles the parent's rounded edge
                  const cornerRadius =
                    i === 0 ? "rounded-tl-2xl"
                    : i === 2 ? "rounded-tr-2xl"
                    : i === 3 ? "rounded-bl-2xl"
                    : i === 5 ? "rounded-br-2xl"
                    : ""
                  return (
                    <div
                      key={`d-${img.src}-${i}`}
                      className={`relative aspect-[4/5] w-full overflow-hidden ${cornerRadius}`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(min-width: 1280px) 240px, 22vw"
                        priority={i < 2}
                        className="object-cover"
                      />
                    </div>
                  )
                })}
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(15,14,15,1) 0%, rgba(15,14,15,0.85) 25%, rgba(15,14,15,0.4) 60%, rgba(15,14,15,0) 100%)",
                }}
              />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-8 xl:p-10">
                <h1
                  data-display
                  className="text-balance text-3xl font-semibold leading-[1.1] text-white xl:text-4xl"
                >
                  {headline}
                </h1>
                <p className="mt-3 max-w-md text-pretty text-[15px] leading-relaxed text-white/85 xl:text-base">
                  {subhead}
                </p>
              </div>
              {/* 1px inside border — rendered last so it sits on top of images + gradient + text */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-[#0F0E0F]"
              />
            </div>

            <div className="col-span-5">
              <div className="sticky top-24">
                <QuoteForm niche={niche} variant="on-light" />
                <div className="mt-3">
                  <TrustBar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
