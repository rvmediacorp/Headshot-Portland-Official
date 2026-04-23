import type { Metadata } from "next"
import PaidPageShell from "../_components/PaidPageShell"

// TODO placeholders inherited from /(paid)/layout.tsx — see that file for env vars.
// Per-page placeholders to set if you customise:
//   {{OG_REALTOR}} — replace `og-realtor.jpg` in /public when ready

export const dynamic = "force-static"
export const revalidate = 3600

const PATH = "/realtor-headshots"

export const metadata: Metadata = {
  title: "Realtor Headshots in Portland & Vancouver | Headshot Portland",
  description:
    "Real estate agent and broker headshots in Portland, OR. 4.9★ on Google, 119+ reviews. Approachable, brand-consistent, ready in 48 hours. Get a custom quote.",
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    url: PATH,
    siteName: "Headshot Portland",
    title: "Realtor Headshots in Portland & Vancouver",
    description:
      "Approachable, brand-consistent realtor headshots — ready to use in 48 hours.",
    images: [{ url: "/og-realtor.jpg", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
}

export default function RealtorHeadshotsPage() {
  return (
    <PaidPageShell
      niche="realtor"
      path={PATH}
      headline="Realtor headshots in Portland & Vancouver"
      subhead="Approachable, brand-consistent headshots for your website, listings, and social — ready to use in 48 hours."
      serviceName="Realtor Headshot Photography"
      serviceDescription="Realtor and broker headshots in Portland and Vancouver — approachable, brand-consistent, 48-hour delivery."
    />
  )
}
