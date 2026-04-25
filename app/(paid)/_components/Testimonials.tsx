import { reviews } from "@/data/reviews"

function StarIcon() {
  return (
    <svg className="w-5 h-5 text-[#FFC107] fill-[#FFC107]" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
    </svg>
  )
}

export default function Testimonials() {
  // Grab the first 6 real reviews
  const selectedReviews = reviews.slice(0, 6)

  return (
    <div className="w-full px-[10px] my-[10px]">
    <section
      aria-labelledby="testimonials-heading"
      className="w-full rounded-[10px] border-[1.5px] border-[#C8C8C8] bg-[#FDF0E1] text-[#111]"
    >
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <div className="text-center">
        <h2
          id="testimonials-heading"
          data-display
          className="text-balance text-3xl font-semibold leading-tight sm:text-4xl"
        >
          What Portland clients say
        </h2>
        <p className="mt-2 text-[15px] text-[#444]">
          119 five-star reviews from real people.
        </p>
      </div>

      <div className="mt-10 columns-1 gap-5 md:columns-2 lg:columns-3">
        {selectedReviews.map((review, i) => (
          <div
            key={i}
            className="mb-5 break-inside-avoid rounded-[16px] border border-[#1D1C1D] flex flex-col bg-[#FDF0E1] hover:bg-[#1D1C1D] transition-colors duration-300 group"
          >
            <div className="p-6 flex flex-col flex-1">
              {/* Stars + Google logo */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex">
                  {[...Array(review.rating)].map((_, j) => (
                    <StarIcon key={j} />
                  ))}
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/google-g-logo.svg" alt="Google" width={20} height={20} className="w-5 h-5" />
              </div>

              {/* Review text */}
              <p className="text-[#222] group-hover:text-white transition-colors duration-300 text-sm md:text-base leading-relaxed mb-4">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Author — pinned to bottom */}
              <div className="flex items-center gap-3 mt-auto pt-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={review.avatar}
                  alt={review.name}
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full object-cover shadow-sm"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <p className="text-[#111] group-hover:text-white transition-colors duration-300 font-semibold text-sm">
                  {review.name}
                </p>
              </div>
            </div>


          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <a
          href="https://maps.app.goo.gl/xRqN4nmhtpQkNQXa7"
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-6 py-3.5 text-sm font-bold tracking-wide text-[#111] hover:bg-black/5 transition-colors"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/google-g-logo.svg" alt="Google" width={20} height={20} className="w-5 h-5" />
          <span>SEE ALL 119 REVIEWS ON GOOGLE</span>
        </a>
      </div>
      </div>
    </section>
    </div>
  )
}
