import type { Metadata } from "next"
import PaidPageShell from "../_components/PaidPageShell"

// TODO placeholders inherited from /(paid)/layout.tsx — see that file for env vars.
// Per-page placeholders to set if you customise:
//   {{OG_CORPORATE}} — replace `og-corporate.jpg` in /public when ready

export const dynamic = "force-static"
export const revalidate = 3600

const PATH = "/corporate-headshots"

export const metadata: Metadata = {
  title: "Corporate Headshots in Portland & Vancouver | Headshot Portland",
  description:
    "Team and executive headshot sessions in Portland, OR. 4.9★ on Google, 119+ reviews. Coached studio sessions, 48-hour delivery, on-site options. Get a custom quote in 45 seconds.",
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    url: PATH,
    siteName: "Headshot Portland",
    title: "Corporate Headshots in Portland & Vancouver",
    description:
      "Studio and on-site executive headshot sessions. 48-hour delivery.",
    images: [{ url: "/og-corporate.jpg", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
}

export default function CorporateHeadshotsPage() {
  return (
    <PaidPageShell
      niche="corporate"
      path={PATH}
      headline="Corporate headshots in Portland & Vancouver"
      subhead="On-site or in-studio team sessions for executives, leadership, and growing teams — coached, retouched, and delivered in 48 hours."
      serviceName="Corporate Headshot Photography"
      serviceDescription="Executive, leadership, and team headshot sessions for Portland and Vancouver organisations. Studio or on-site, 48-hour turnaround."
    />
  )
}
