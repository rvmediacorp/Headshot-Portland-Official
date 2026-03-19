import dynamic from "next/dynamic"
import ContactHero from "@/components/contact-hero"
import GoogleAnalytics from "@/components/google-analytics"

// Lazy load below-fold sections
const ContactSection = dynamic(() => import("@/components/contact-section"))
const UnlimitedSessions = dynamic(() => import("@/components/unlimited-sessions"))
const ClientTestimonialsSection = dynamic(() => import("@/components/client-testimonials-section"))
const VisitUsSection = dynamic(() => import("@/components/visit-us-section"))
const Footer = dynamic(() => import("@/components/footer"))

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-dark-bg text-white">
      <GoogleAnalytics />
      <ContactHero />
      <ContactSection />
      <UnlimitedSessions />
      <ClientTestimonialsSection />
      <VisitUsSection />
      <Footer />
    </main>
  )
}
