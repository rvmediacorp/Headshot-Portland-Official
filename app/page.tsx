import Hero from "@/components/hero"
import QuotesSection from "@/components/quotes-section"
import CreativeProcess from "@/components/creative-process"
import BeforeAfterSection from "@/components/before-after-section"
import UnlimitedSessions from "@/components/unlimited-sessions"
import HighEndRetouchingSection from "@/components/before-after-slider-comp"
import SimpleAndFunExperience from "@/components/simple-and-fun-experience"
import ProudlyOwnedSection from "@/components/proudly-owned-section"
import ClientTestimonialsSection from "@/components/client-testimonials-section"
import BehindTheScenesSection from "@/components/behind-the-scenes-section"
import WhoWeWorkWithSection from "@/components/who-we-work-with-section"
import LatestWorkSection from "@/components/latest-work-section"
import VisitUsSection from "@/components/visit-us-section"
import Footer from "@/components/footer"
import GoogleAnalytics from "@/components/google-analytics"

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
