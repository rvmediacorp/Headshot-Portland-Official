import Image from "next/image"

const ITEMS = [
  {
    title: "Expression coaching",
    body: "Real-time expression and posing coaching — you'll look like yourself on your best day.",
    bgImage: "/images/HeroGrid18/hannah-headshots-pdx.webp",
  },
  {
    title: "Professional retouching",
    body: "Fully retouched files for LinkedIn, press kits, or team directories. Same-day rush often available.",
    bgImage: "/images/HeroGrid18/cheryl-doctor-headshots.webp",
  },
  {
    title: "Real photos, no AI",
    body: "Authentic, copyright-protected photographs of the real you.",
    bgImage: "/images/HeroGrid18/tom-fisher-headshot-photographer.webp",
  },
] as const

export default function WhyNathan() {
  return (
    <div className="w-full px-[10px] my-[10px]">
    <section
      aria-labelledby="why-nathan-heading"
      className="w-full rounded-[10px] border-[1.5px] border-[#C8C8C8] bg-[#FAFAF7]"
    >
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <h2
          id="why-nathan-heading"
          data-display
          className="text-balance text-3xl font-semibold leading-tight text-[#111] sm:text-4xl"
        >
          Why people choose Headshot Portland
        </h2>
        <p className="mt-2 max-w-xl text-[15px] text-[#444]">
          A photography studio for people who hate being photographed.
          Professional. Polished. Priced right.
        </p>

        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {ITEMS.map(({ title, body, bgImage }) => (
            <li
              key={title}
              className="group relative overflow-hidden rounded-2xl bg-black"
            >
              <div className="absolute inset-0">
                <Image
                  src={bgImage}
                  alt={title}
                  fill
                  className="object-cover opacity-60 transition duration-700 ease-out group-hover:scale-105 group-hover:opacity-40"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
              </div>
              <div className="relative z-10 flex h-full min-h-[300px] flex-col justify-end p-6 sm:min-h-[360px] lg:min-h-[400px]">
                <h3 className="text-xl font-bold tracking-wide text-white drop-shadow-sm sm:text-2xl">{title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-white/90 drop-shadow-sm sm:text-[15px]">
                  {body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
    </div>
  )
}
