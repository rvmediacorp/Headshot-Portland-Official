import type { Metadata } from "next"
import PaidPageShell from "../_components/PaidPageShell"

// TODO placeholders inherited from /(paid)/layout.tsx — see that file for env vars.
// Per-page placeholders to set if you customise:
//   {{OG_LINKEDIN}} — replace `og-linkedin.jpg` in /public when ready

export const dynamic = "force-static"
export const revalidate = 3600

const PATH = "/linkedin-headshots"

export const metadata: Metadata = {
  title: "LinkedIn Headshots in Portland & Vancouver | Headshot Portland",
  description:
    "Professional LinkedIn headshots in Portland, OR. 4.9★ on Google, 119+ reviews. Coached studio sessions, retouched, ready in 48 hours. Get a custom quote in 45 seconds.",
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    url: PATH,
    siteName: "Headshot Portland",
    title: "LinkedIn Headshots in Portland & Vancouver",
    description:
      "Show up on LinkedIn like someone you'd hire. Coached, retouched, 48-hour delivery.",
    images: [{ url: "/og-linkedin.jpg", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
}

export default function LinkedInHeadshotsPage() {
  return (
    <PaidPageShell
      niche="linkedin"
      path={PATH}
      headline="LinkedIn headshots in Portland & Vancouver"
      subhead="Show up on LinkedIn like someone you'd hire. Coached, retouched, and in your inbox in 48 hours."
      serviceName="LinkedIn Profile Headshot Photography"
      serviceDescription="Professional LinkedIn profile headshots in Portland and Vancouver — coached studio sessions with 48-hour retouched delivery."
    />
  )
}
