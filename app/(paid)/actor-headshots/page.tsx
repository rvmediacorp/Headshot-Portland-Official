import type { Metadata } from "next"
import PaidPageShell from "../_components/PaidPageShell"

// TODO placeholders inherited from /(paid)/layout.tsx — see that file for env vars.
// Per-page placeholders to set if you customise:
//   {{OG_ACTOR}} — replace `og-actor.jpg` in /public when ready

export const dynamic = "force-static"
export const revalidate = 3600

const PATH = "/actor-headshots"

export const metadata: Metadata = {
  title: "Actor Headshots in Portland | Headshot Portland",
  description:
    "Commercial and theatrical actor headshots in Portland, OR. 4.9★ on Google, 119+ reviews. Multiple looks, expression coaching, agency-ready files in 48 hours. Get a custom quote.",
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    url: PATH,
    siteName: "Headshot Portland",
    title: "Actor Headshots in Portland",
    description:
      "Commercial and theatrical actor headshots — coached, multiple looks, 48-hour delivery.",
    images: [{ url: "/og-actor.jpg", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
}

export default function ActorHeadshotsPage() {
  return (
    <PaidPageShell
      niche="actor"
      path={PATH}
      headline="Actor headshots in Portland"
      subhead="Commercial and theatrical looks that book. Expression coaching, multiple looks, and fast turnaround — agency-ready."
      serviceName="Actor Headshot Photography"
      serviceDescription="Commercial and theatrical actor headshots in Portland with on-set expression coaching and 48-hour delivery."
    />
  )
}
