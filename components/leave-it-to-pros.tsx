import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export default function LeaveItToPros() {
  return (
    <div className="w-full px-[10px] my-[10px]">
      <section
        className="w-full rounded-[10px] bg-white"
        style={{
          display: "flex",
          padding: "116px 64px",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div className="max-w-5xl mx-auto w-full text-center">
          {/* Eyebrow */}
          <p className="font-inter text-[#247BA0] text-sm font-bold tracking-widest uppercase mb-6">
            About Us
          </p>

          {/* Main Heading */}
          <h2
            className="font-bodoniModa italic text-black text-4xl md:text-6xl lg:text-7xl mb-8 leading-tight"
          >
            Leave it to the Pros
          </h2>

          {/* Tagline */}
          <p className="font-inter text-gray-500 text-lg md:text-xl lg:text-2xl mb-14 max-w-2xl mx-auto leading-relaxed">
            We&apos;re a photography studio for people who hate being photographed.
          </p>

          {/* Three pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 text-left mb-16">
            <div>
              <div className="w-10 h-[3px] bg-[#247BA0] mb-5" />
              <h3 className="font-bodoniModa italic text-black text-2xl md:text-3xl mb-3">
                We make it easy.
              </h3>
              <p className="font-inter text-gray-500 text-base leading-relaxed">
                Book online in minutes. Show up, look great, leave with photos you&apos;re proud of — all in under an hour.
              </p>
            </div>
            <div>
              <div className="w-10 h-[3px] bg-[#247BA0] mb-5" />
              <h3 className="font-bodoniModa italic text-black text-2xl md:text-3xl mb-3">
                We make it fun.
              </h3>
              <p className="font-inter text-gray-500 text-base leading-relaxed">
                Our photographers specialize in posing and expression coaching — so even camera-shy clients walk away looking like naturals.
              </p>
            </div>
            <div>
              <div className="w-10 h-[3px] bg-[#247BA0] mb-5" />
              <h3 className="font-bodoniModa italic text-black text-2xl md:text-3xl mb-3">
                We make it count.
              </h3>
              <p className="font-inter text-gray-500 text-base leading-relaxed">
                Unlimited photos, no time limits, delivered in 24–48 hours. Your headshot is your first impression — we take that seriously.
              </p>
            </div>
          </div>

          {/* CTA */}
          <Link
            href="https://ww3.headshotportland.com/instant-quote"
            className="inline-flex items-center gap-3 bg-black text-white py-4 px-10 rounded-full hover:bg-[#247BA0] transition-colors focus-visible:ring-2 focus-visible:ring-[#247BA0] focus-visible:outline-none"
          >
            <span className="font-inter font-bold text-base">GET A FREE QUOTE</span>
            <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center" aria-hidden="true">
              <ArrowUpRight size={16} className="text-white" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  )
}
