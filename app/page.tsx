import dynamic from "next/dynamic"
import Hero from "@/components/hero"
import GoogleAnalytics from "@/components/google-analytics"

// Lazy load below-fold sections
const QuotesSection = dynamic(() => import("@/components/quotes-section"))
const CreativeProcess = dynamic(() => import("@/components/creative-process"))
const BeforeAfterSection = dynamic(() => import("@/components/before-after-section"))
const UnlimitedSessions = dynamic(() => import("@/components/unlimited-sessions"))
const HighEndRetouchingSection = dynamic(() => import("@/components/before-after-slider-comp"))
const SimpleAndFunExperience = dynamic(() => import("@/components/simple-and-fun-experience"))
const ProudlyOwnedSection = dynamic(() => import("@/components/proudly-owned-section"))
const ClientTestimonialsSection = dynamic(() => import("@/components/client-testimonials-section"))
const BehindTheScenesSection = dynamic(() => import("@/components/behind-the-scenes-section"))
const WhoWeWorkWithSection = dynamic(() => import("@/components/who-we-work-with-section"))
const LatestWorkSection = dynamic(() => import("@/components/latest-work-section"))
const VisitUsSection = dynamic(() => import("@/components/visit-us-section"))
const Footer = dynamic(() => import("@/components/footer"))

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-bg text-white">
      <GoogleAnalytics />
      <Hero />
      <QuotesSection />
      <CreativeProcess />
      <BeforeAfterSection />
      <UnlimitedSessions />
      <HighEndRetouchingSection />
      <SimpleAndFunExperience />
      <ProudlyOwnedSection />
      <ClientTestimonialsSection />
      <BehindTheScenesSection />
      <WhoWeWorkWithSection />
      <LatestWorkSection />
      <VisitUsSection />
      <Footer />
    </main>
  )
}
