import dynamic from "next/dynamic"
import AboutHero from "@/components/about-hero"
import GoogleAnalytics from "@/components/google-analytics"

// Lazy load below-fold sections
const AboutFeatures = dynamic(() => import("@/components/about-features"))
const LeaveItToPros = dynamic(() => import("@/components/leave-it-to-pros"))
const ProudlyOwnedSection = dynamic(() => import("@/components/proudly-owned-section"))
const UnlimitedSessions = dynamic(() => import("@/components/unlimited-sessions"))
const ClientTestimonialsSection = dynamic(() => import("@/components/client-testimonials-section"))
const Footer = dynamic(() => import("@/components/footer"))

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-dark-bg text-white">
      <GoogleAnalytics />
      <AboutHero />
      <AboutFeatures />
      <LeaveItToPros />
      <ProudlyOwnedSection />
      <UnlimitedSessions />
      <ClientTestimonialsSection />
      <Footer />
    </main>
  )
}
