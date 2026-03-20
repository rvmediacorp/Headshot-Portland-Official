import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import HeroVideoPlayer from "./hero-video-player"

export default function Hero() {
  return (
    <>
      {/* Hero Section with Video Background */}
      <section className="w-full min-h-[80vh] relative flex flex-col justify-center px-4 md:px-8 lg:px-16 py-6 md:py-12 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          {/* Poster rendered by server — no JS needed for LCP */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/modern-photography-studio.webp"
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <HeroVideoPlayer
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshothero-pdhaIqDrwHMpqHtCjlzLW1nNsrRcPD.mp4"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50 z-1"></div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Main Heading */}
          <h1 className="hero-heading font-bodoniModa text-center mb-8 md:mb-8 lg:mb-12 text-white">
            PORTLAND&apos;S TOP-RATED HEADSHOT &amp; PORTRAIT PHOTOGRAPHY STUDIO
          </h1>

          {/* Subheading */}
          <p className="font-playfair w-full max-w-3xl mx-auto text-center mb-6 md:mb-6 lg:mb-10 text-white">
            We Offer Headshots &amp; Portraits For Individuals, Teams &amp; Everything In Between. Trusted By Portlands Leading
            Companies &amp; Professionals.
          </p>

          {/* Tagline */}
          <p className="font-playfair text-center mb-10 md:mb-12 lg:mb-16 text-white">
            PROFESSIONAL, POLISHED &amp; PRICED RIGHT, EVERY TIME.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6">
            <Link
              href="https://ww3.headshotportland.com/instant-quote"
              className="cta-button cta-primary button-text w-full md:w-auto text-sm md:text-base py-1 md:py-4"
              aria-label="GET FREE QUOTE — get a free headshot photography quote"
            >
              <span>GET FREE QUOTE</span>
              <span className="arrow-icon w-8 h-8 md:w-10 md:h-10">
                <ArrowUpRight size={16} className="md:size-20" />
              </span>
            </Link>

            <Link
              href="https://ww3.headshotportland.com/instant"
              className="cta-button cta-secondary button-text w-full md:w-auto text-sm md:text-base py-1 md:py-4"
              aria-label="BOOK NOW — book a headshot photography session"
            >
              <span>BOOK NOW</span>
              <span className="arrow-icon w-8 h-8 md:w-10 md:h-10">
                <ArrowUpRight size={16} className="md:size-20" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Leave it to the Pros Section */}
      <section className="w-full relative mt-0 mb-0">
        <div className="relative">
          {/* Headshot Grid */}
          <div className="w-full relative overflow-hidden">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-1 md:gap-2">
              {/* Row 1 */}
              <div className="aspect-square overflow-hidden">
                <Image
                  src="/images/HeroGrid18/angela-headshot-photo.webp"
                  alt="Professional headshot of woman with dark hair in blue floral top"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 16vw"
                  priority
                />
              </div>
              <div className="aspect-square overflow-hidden">
                <Image
                  src="/images/HeroGrid18/abby-headshot-portland.webp"
                  alt="Professional headshot of woman with reddish-brown hair in purple sweater"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 16vw"
                  priority
                />
              </div>
              <div className="aspect-square overflow-hidden">
                <Image
                  src="/images/HeroGrid18/austyn-portland-headshots.webp"
                  alt="Professional headshot of bald man with mustache in floral shirt"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 16vw"
                  priority
                />
              </div>
              <div className="aspect-square overflow-hidden hidden sm:block">
                <Image
                  src="/images/HeroGrid18/john-headshot-portland.webp"
                  alt="Professional headshot of man in navy suit"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 16vw"
                />
              </div>
              <div className="aspect-square overflow-hidden hidden md:block">
                <Image
                  src="/images/HeroGrid18/cheryl-doctor-headshots.webp"
                  alt="Professional headshot of woman in black and white checkered jacket"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                  sizes="16vw"
                />
              </div>
              <div className="aspect-square overflow-hidden hidden md:block">
                <Image
                  src="/images/HeroGrid18/scott-black-shirt-headshot.webp"
                  alt="Professional headshot of man in black shirt"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                  sizes="16vw"
                />
              </div>

              {/* Row 2 */}
              <div className="aspect-square overflow-hidden">
                <Image src="/images/HeroGrid18/headshot-portland-amy.webp" alt="Professional headshot of Asian woman in white button-up shirt" width={200} height={200} className="w-full h-full object-cover" sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 16vw" />
              </div>
              <div className="aspect-square overflow-hidden">
                <Image src="/images/HeroGrid18/cameron-suit-headshot.webp" alt="Professional headshot of young man with glasses in navy suit" width={200} height={200} className="w-full h-full object-cover" sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 16vw" />
              </div>
              <div className="aspect-square overflow-hidden">
                <Image src="/images/HeroGrid18/hannah-headshots-pdx.webp" alt="Professional headshot of person with short brown hair in green polo" width={200} height={200} className="w-full h-full object-cover" sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 16vw" />
              </div>
              <div className="aspect-square overflow-hidden hidden sm:block">
                <Image src="/images/HeroGrid18/valerie-headshot-photographer.webp" alt="Professional headshot of woman with short dark hair" width={200} height={200} className="w-full h-full object-cover" sizes="(max-width: 768px) 25vw, 16vw" />
              </div>
              <div className="aspect-square overflow-hidden hidden md:block">
                <Image src="/images/HeroGrid18/portland-headshot-studio-andrew.webp" alt="Professional headshot of man with glasses and beard" width={200} height={200} className="w-full h-full object-cover" sizes="16vw" />
              </div>
              <div className="aspect-square overflow-hidden hidden md:block">
                <Image src="/images/HeroGrid18/maureen-studio-headshot.webp" alt="Professional headshot of woman with shoulder-length brown hair in light blue shirt" width={200} height={200} className="w-full h-full object-cover" style={{ objectPosition: "center 20%" }} sizes="16vw" />
              </div>

              {/* Row 3 */}
              <div className="aspect-square overflow-hidden">
                <Image src="/images/HeroGrid18/woman-hijab-headshot-studio.webp" alt="Professional headshot of woman in hijab and black blazer" width={200} height={200} className="w-full h-full object-cover" sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 16vw" />
              </div>
              <div className="aspect-square overflow-hidden">
                <Image src="/images/HeroGrid18/siddhi-headshot-photographer.webp" alt="Professional headshot of woman with reddish-brown hair" width={200} height={200} className="w-full h-full object-cover" sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 16vw" />
              </div>
              <div className="aspect-square overflow-hidden">
                <Image src="/images/HeroGrid18/woman-white-top-headshot-portraits.webp" alt="Professional headshot of woman in white top" width={200} height={200} className="w-full h-full object-cover" sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 16vw" />
              </div>
              <div className="aspect-square overflow-hidden hidden sm:block">
                <Image src="/images/HeroGrid18/headshot-medical-portland.webp" alt="Professional headshot of man with glasses and beard in white shirt and tie" width={200} height={200} className="w-full h-full object-cover" sizes="(max-width: 768px) 25vw, 16vw" />
              </div>
              <div className="aspect-square overflow-hidden hidden md:block">
                <Image src="/images/HeroGrid18/tom-fisher-headshot-photographer.webp" alt="Professional headshot of man in navy suit" width={200} height={200} className="w-full h-full object-cover" sizes="16vw" />
              </div>
              <div className="aspect-square overflow-hidden hidden md:block">
                <Image src="/images/HeroGrid18/male-headshot-portland.webp" alt="Professional headshot of man with glasses in plaid jacket" width={200} height={200} className="w-full h-full object-cover" sizes="16vw" />
              </div>
            </div>

            {/* Gradient Overlay for grid */}
            <div className="absolute bottom-0 left-0 right-0 h-2/3 md:h-1/2 bg-gradient-to-t from-black/95 via-black/80 to-transparent"></div>
          </div>

          {/* Combined Text Container */}
          <div className="absolute bottom-4 sm:bottom-8 md:bottom-12 left-0 right-0 text-center z-20 px-4 md:px-0">
            <div className="relative">
              <h2
                className="text-[#247ba0] font-bodoniModa text-center mb-0 md:mb-0"
                style={{
                  fontSize: "clamp(32px, 12vw, 60px)",
                  lineHeight: "1.1",
                  fontWeight: "400",
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  textShadow: "0px 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                LEAVE IT TO THE PROS
              </h2>

              <p
                className="collage-subheading text-white mx-auto md:overflow-hidden"
                style={{
                  fontSize: "clamp(12px, 4vw, 24px)",
                  maxWidth: "100%",
                  textShadow: "0px 1px 2px rgba(0,0,0,0.5)",
                  whiteSpace: "normal",
                }}
              >
                <span className="md:whitespace-nowrap">
                  We&apos;re a photography studio for people who hate being photographed.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
