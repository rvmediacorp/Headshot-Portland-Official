import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { reviews } from "@/data/reviews"
import dynamic from "next/dynamic"

const Footer = dynamic(() => import("@/components/footer"))

function StarIcon() {
  return (
    <svg className="w-5 h-5 text-[#FFC107] fill-[#FFC107]" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
    </svg>
  )
}

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-dark-bg text-white">
      {/* Hero — matches headshots/portraits pages */}
      <div className="w-full px-[10px] my-[10px]">
        <section
          className="w-full rounded-[10px] bg-[#247BA0] px-5 md:px-16"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div className="w-full text-white py-16 md:py-24">
            <div className="container mx-auto text-center">
              <h1 className="font-bodoniModa text-4xl md:text-5xl lg:text-6xl mb-6 tracking-wide">
                CLIENT REVIEWS
              </h1>
              <p className="font-playfair text-xl md:text-2xl mb-12">
                119 five-star reviews from real clients
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="https://maps.app.goo.gl/xRqN4nmhtpQkNQXa7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-[#247BA0] px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/google-g-logo.svg" alt="Google" width={20} height={20} className="w-5 h-5" />
                  <span className="font-bold">SEE ALL 119 REVIEWS ON GOOGLE</span>
                  <div className="bg-[#247BA0] rounded-full p-1">
                    <ArrowUpRight className="h-4 w-4 text-white" />
                  </div>
                </Link>
                <Link
                  href="/google-quote-request"
                  className="border border-white text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                >
                  <span className="font-bold">GET FREE QUOTE</span>
                  <div className="bg-white/20 rounded-full p-1">
                    <ArrowUpRight className="h-4 w-4 text-white" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Reviews Masonry Grid */}
      <div className="w-full px-[10px] my-[10px]">
        <section
          className="w-full rounded-[10px] bg-[#0F0E0F]"
          style={{
            display: "flex",
            padding: "60px 10px",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="max-w-6xl mx-auto w-full px-4">
            {/* Masonry via flex columns — supports flex height stretching */}
            {(() => {
              // Distribute into columns round-robin
              const cols: (typeof reviews)[] = [[], [], []]
              reviews.forEach((r, i) => cols[i % 3].push(r))

              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
                  {cols.map((col, colIdx) => (
                    <div key={colIdx} className="flex flex-col gap-4">
                      {col.map((review, i) => (
                        <div
                          key={`${colIdx}-${i}`}
                          className="bg-[#1C1B1C] rounded-xl border border-[#2a2a2a] flex flex-col"
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
                            <p className="text-white/90 text-sm md:text-base leading-relaxed mb-4">
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
                                className="w-9 h-9 rounded-full object-cover"
                                loading="lazy"
                                referrerPolicy="no-referrer"
                              />
                              <p className="text-white font-bodoniModa italic text-sm">
                                {review.name}
                              </p>
                            </div>
                          </div>


                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )
            })()}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
