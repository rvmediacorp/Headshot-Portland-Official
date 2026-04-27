import type { Metadata } from "next"
import PaidPageShell from "../_components/PaidPageShell"

// General / brand-term ad group landing page — targets searches like
// "best headshot photographer Portland", "Portland headshot photographer",
// "headshot photography Portland Oregon". Copy intentionally covers every
// niche (executives, actors, LinkedIn, modeling, realtors) so the page
// speaks to the broad searcher while funneling them into the same quote
// form as the niche-specific pages.
//
// TODO: drop /public/og-general.jpg (1200x630) before launch.

export const dynamic = "force-static"
export const revalidate = 3600

const PATH = "/best-headshot-photographer-portland-oregon"

export const metadata: Metadata = {
  title:
    "Best Headshot Photographer in Portland, Oregon | Headshot Portland",
  description:
    "Portland's top-rated headshot photographer. 4.9★ on Google, 119+ reviews. Executive, actor, LinkedIn, modeling & realtor sessions. 48-hour delivery. Get a custom quote in 45 seconds.",
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    url: PATH,
    siteName: "Headshot Portland",
    title: "Best Headshot Photographer in Portland, Oregon",
    description:
      "Studio headshots for executives, actors, LinkedIn, modeling, and realtors. 48-hour delivery, 4.9★ on Google.",
    images: [{ url: "/og-general.jpg", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
}

export default function GeneralHeadshotsPage() {
  return (
    <PaidPageShell
      niche="general"
      path={PATH}
      headline="Portland's best-rated headshot photographer"
      subhead="Studio sessions for executives, actors, LinkedIn, modeling, and realtors — coached, retouched, and delivered in 48 hours. 4.9★ on Google across 119+ reviews."
      serviceName="Portland Headshot Photography"
      serviceDescription="Studio headshot sessions for professionals, executives, actors, models, and realtors across Portland, OR and Southwest Washington. Coached direction, professional retouching, 48-hour delivery."
    />
  )
}
