import type { Metadata } from "next"
import Image from "next/image"
import { Phone, MapPin, Clock } from "lucide-react"

// Inline filled star (matches Testimonials). Hardcoded #FFC107 because
// Tailwind's fill-amber-* utilities aren't reliably wired up in this v4 setup.
function StarIcon() {
  return (
    <svg
      className="h-4 w-4 text-[#FFC107]"
      viewBox="0 0 24 24"
      fill="#FFC107"
      aria-hidden
    >
      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Google Ads "Call Now" sitelink target. Renders a branded landing page, fires
// a Google Ads call-conversion tag on load, then auto-triggers the device
// dialer after a short paint delay so the page doesn't flash blank.
// ─────────────────────────────────────────────────────────────────────────────

const PHONE_DISPLAY = "(503) 313-7121"
const PHONE_TEL = "+15033137121"

// How long to show the branded page before firing the dialer intent. Needs
// to be long enough for the page to fully paint (including fonts) but short
// enough that the user-perceived experience still feels like "tap → call".
const AUTO_DIAL_DELAY_MS = 500

// Google Ads configuration. AW ID is hardcoded to match what the root layout
// already loads; the conversion label is injected via env var so it can be set
// in Vercel without a code change once you create the conversion action.
const GOOGLE_ADS_CONVERSION_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID ?? "AW-847156852"
const CALL_CONVERSION_LABEL =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION_LABEL ?? ""
const REVIEW_COUNT = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_COUNT ?? "119"

export const metadata: Metadata = {
  title: `Call Headshot Portland — ${PHONE_DISPLAY}`,
  description: `Tap to call Headshot Portland at ${PHONE_DISPLAY}. Portland, Oregon's top-rated headshot studio.`,
  robots: { index: false, follow: false },
  alternates: { canonical: "/call" },
}

// Inline script runs as the browser parses it (before React hydration).
// 1. Fires a GTM phone_click event for any tag listening on the data layer.
// 2. Fires the Google Ads call-conversion tag if the env label is set.
// 3. Queues the tel: navigation after the configured paint delay.
const INLINE_SCRIPT = `
(function(){
  var TEL = "tel:${PHONE_TEL}";
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  try {
    window.dataLayer.push({
      event: "phone_click",
      from: "ad_call_sitelink",
      phone_number: "${PHONE_TEL}"
    });
  } catch(e) {}
  ${
    CALL_CONVERSION_LABEL
      ? `
  try {
    gtag("event", "conversion", {
      send_to: "${GOOGLE_ADS_CONVERSION_ID}/${CALL_CONVERSION_LABEL}",
      value: 1.0,
      currency: "USD",
      transaction_id: String(Date.now())
    });
  } catch(e) {}
  `
      : ""
  }
  setTimeout(function(){
    try { window.location.href = TEL; } catch(e) {}
  }, ${AUTO_DIAL_DELAY_MS});
})();
`

export default function CallPage(): React.JSX.Element {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: INLINE_SCRIPT }} />

      <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-lg text-center">
          <div className="mx-auto mb-8 h-10 w-52 relative">
            <Image
              src="/images/logos/headshot_portland_black.svg"
              alt="Headshot Portland"
              fill
              priority
              style={{ objectFit: "contain" }}
            />
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-neutral-600">
            <span className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} />
              ))}
            </span>
            <span>
              <span className="font-semibold text-neutral-800">4.9</span>
              <span className="mx-1.5 text-neutral-400">&middot;</span>
              {REVIEW_COUNT}+ Google reviews
            </span>
          </div>

          <h1
            data-display
            className="mt-8 text-4xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-5xl"
          >
            Calling Headshot Portland&hellip;
          </h1>

          <p className="mt-4 text-base text-neutral-600">
            Your phone should open the dialer in a moment. If it doesn&rsquo;t,
            tap the number below to call us.
          </p>

          <p
            data-display
            className="mt-10 text-4xl font-bold tracking-tight tabular-nums text-[var(--brand)] sm:text-5xl"
          >
            {PHONE_DISPLAY}
          </p>

          <a
            href={`tel:${PHONE_TEL}`}
            className="btn-brand focus-ring mt-6 inline-flex w-full items-center justify-center gap-3 rounded-xl px-8 py-5 text-lg font-semibold text-white shadow-lg transition active:translate-y-0.5 sm:w-auto"
            aria-label={`Call Headshot Portland at ${PHONE_DISPLAY}`}
          >
            <Phone className="h-6 w-6" aria-hidden />
            Tap to Call Now
          </a>

          <div className="mt-12 grid gap-4 text-sm text-neutral-600 sm:grid-cols-2">
            <div className="flex items-start justify-center gap-2">
              <Clock
                className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400"
                aria-hidden
              />
              <div className="text-left">
                <div className="font-medium text-neutral-800">Hours</div>
                <div>Mon&ndash;Fri 9&ndash;6</div>
                <div>Sat 10&ndash;4</div>
              </div>
            </div>
            <div className="flex items-start justify-center gap-2">
              <MapPin
                className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400"
                aria-hidden
              />
              <div className="text-left">
                <div className="font-medium text-neutral-800">Studio</div>
                <div>805 SW Broadway</div>
                <div>Portland, OR 97205</div>
              </div>
            </div>
          </div>

          <p className="mt-10 text-xs text-neutral-400">
            Portland, Oregon&rsquo;s top-rated headshot studio &middot;{" "}
            <a
              href="/"
              className="underline underline-offset-2 hover:text-neutral-600"
            >
              headshotportland.com
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
