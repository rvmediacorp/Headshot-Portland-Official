"use client"

import ContactHero from "@/components/contact-hero"
import ContactSection from "@/components/contact-section"
import UnlimitedSessions from "@/components/unlimited-sessions"
import ClientTestimonialsSection from "@/components/client-testimonials-section"
import VisitUsSection from "@/components/visit-us-section"
import Footer from "@/components/footer"
import GoogleAnalytics from "@/components/google-analytics"

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
