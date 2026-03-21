import { reviews } from "@/data/reviews"

function StarIcon() {
  return (
    <svg className="w-4 h-4 text-[#FFC107] fill-[#FFC107]" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
    </svg>
  )
}

function ReviewCard({ name, text, avatar }: { name: string; text: string; avatar: string }) {
  return (
    <div className="flex-shrink-0 w-[300px] md:w-[350px] h-[180px] bg-[#1C1B1C] rounded-xl p-5 border border-[#2a2a2a] flex flex-col">
      {/* Stars + Google logo */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/google-g-logo.svg" alt="Google" width={18} height={18} className="w-[18px] h-[18px]" />
      </div>
      {/* Review text */}
      <p className="text-white/80 text-sm leading-relaxed line-clamp-3 flex-1">{text}</p>
      {/* Avatar + name — pinned to bottom */}
      <div className="flex items-center gap-2.5 mt-auto pt-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatar}
          alt={name}
          width={28}
          height={28}
          className="w-7 h-7 rounded-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <span className="text-white text-sm font-medium">{name}</span>
      </div>
    </div>
  )
}

export default function ReviewsMarquee() {
  const row1 = reviews.slice(0, 16)
  const row2 = reviews.slice(16)

  return (
    <section className="w-full py-8 overflow-hidden bg-black relative group">
      {/* Dark edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Hover overlay — desktop only */}
      <div className="hidden md:flex absolute inset-0 z-20 items-center justify-center pointer-events-none group-hover:pointer-events-auto">
        <div className="absolute inset-0 bg-black/0 backdrop-blur-[0px] group-hover:bg-black/50 group-hover:backdrop-blur-[8px] transition-all duration-200" style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }} />
        <a
          href="/reviews"
          className="relative z-10 bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-500 shadow-lg opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
          style={{ transitionTimingFunction: "cubic-bezier(.23, 1, .32, 1)" }}
        >
          SEE ALL REVIEWS
        </a>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="flex gap-4 mb-4 animate-marquee w-fit md:group-hover:[animation-play-state:paused]">
        {[...row1, ...row1].map((review, i) => (
          <ReviewCard key={`r1-${i}`} name={review.name} text={review.text} avatar={review.avatar} />
        ))}
      </div>
      {/* Row 2 — scrolls right */}
      <div className="flex gap-4 mb-6 md:mb-0 animate-marquee-reverse w-fit md:group-hover:[animation-play-state:paused]">
        {[...row2, ...row2, ...row2, ...row2].map((review, i) => (
          <ReviewCard key={`r2-${i}`} name={review.name} text={review.text} avatar={review.avatar} />
        ))}
      </div>

      {/* Mobile — button below marquee */}
      <div className="flex md:hidden justify-center pt-2 pb-2">
        <a
          href="/reviews"
          className="bg-white text-black font-bold py-3 px-8 rounded-full shadow-lg"
        >
          SEE ALL REVIEWS
        </a>
      </div>
    </section>
  )
}
