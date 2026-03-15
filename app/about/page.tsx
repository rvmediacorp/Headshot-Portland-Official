"use client"

import Navbar from "@/components/navbar"
import AboutHero from "@/components/about-hero"
import AboutFeatures from "@/components/about-features"
import ProudlyOwnedSection from "@/components/proudly-owned-section"
import UnlimitedSessions from "@/components/unlimited-sessions"
import ClientTestimonialsSection from "@/components/client-testimonials-section"
import Footer from "@/components/footer"
import GoogleAnalytics from "@/components/google-analytics"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-dark-bg text-white">
      <GoogleAnalytics />
      <Navbar />
      <AboutHero />
      <AboutFeatures />
      <ProudlyOwnedSection />
      <UnlimitedSessions />
      <ClientTestimonialsSection />
      <Footer />
    </main>
  )
}
