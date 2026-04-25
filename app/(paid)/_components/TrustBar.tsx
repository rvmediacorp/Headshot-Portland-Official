const REVIEW_COUNT = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_COUNT ?? "119"

export default function TrustBar() {
  return (
    <p
      className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[13px] font-medium text-white/70 sm:text-sm"
      aria-label={`4.9 stars on Google, ${REVIEW_COUNT} or more reviews. Serving Portland and Vancouver, WA.`}
    >
      <span className="inline-flex items-center gap-1.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/google-g-logo.svg" alt="Google" width={16} height={16} className="w-4 h-4" />
        <span aria-hidden className="text-[#FFB300] text-[15px] leading-none">★</span>
        <span>4.9 on Google</span>
      </span>
      <span aria-hidden className="text-white/30">
        ·
      </span>
      <span>{REVIEW_COUNT}+ reviews</span>
      <span aria-hidden className="text-white/30">
        ·
      </span>
      <span>Serving Portland &amp; Vancouver WA</span>
    </p>
  )
}
