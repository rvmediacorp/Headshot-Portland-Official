import type { Metadata } from "next"
import PaidPageShell from "../_components/PaidPageShell"

// TODO placeholders inherited from /(paid)/layout.tsx — see that file for env vars.
// Per-page placeholders to set if you customise:
//   {{OG_MODELING}} — replace `og-modeling.jpg` in /public when ready

export const dynamic = "force-static"
export const revalidate = 3600

const PATH = "/modeling-headshots"

export const metadata: Metadata = {
  title: "Modeling Headshots & Portfolios in Portland | Headshot Portland",
  description:
    "Modeling headshots, portfolio shoots, and comp card images in Portland, OR. 4.9★ on Google, 119+ reviews. Agency-ready, retouched in 48 hours. Get a custom quote.",
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    url: PATH,
    siteName: "Headshot Portland",
    title: "Modeling Headshots & Portfolios in Portland",
    description:
      "Portfolio-ready headshots and comp card images for agency submissions and casting calls.",
    images: [{ url: "/og-modeling.jpg", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
}

export default function ModelingHeadshotsPage() {
  return (
    <PaidPageShell
      niche="modeling"
      path={PATH}
      headline="Modeling headshots & portfolios in Portland"
      subhead="Portfolio-ready headshots and comp card images for agency submissions and casting calls."
      serviceName="Modeling Portfolio Photography"
      serviceDescription="Modeling headshots and portfolio sessions for agency submissions and casting calls in Portland and Vancouver."
    />
  )
}
