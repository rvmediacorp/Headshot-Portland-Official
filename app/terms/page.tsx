import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Headshot Portland',
  description: 'Terms of Service and booking policies for Headshot Portland.',
}

export default function TermsPage() {
  return (
    <main className="bg-dark-bg min-h-screen text-white pt-24 pb-16 px-5 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-bodoni text-4xl md:text-5xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert max-w-none text-white/80 space-y-6">
          <p className="text-sm text-white/50">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>By accessing this website, requesting a quote, or booking a session with Headshot Portland, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Booking, Deposits, and Cancellations</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Retainer:</strong> A non-refundable retainer may be required to secure your appointment time. This amount is applied toward your final balance.</li>
              <li><strong>Cancellations:</strong> We require at least 48 hours notice to reschedule or cancel a session. Rescheduling within 48 hours may result in the forfeiture of your deposit.</li>
              <li><strong>No-shows:</strong> Failure to arrive for a scheduled appointment without prior notice forfeits the entire deposit.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Photography Services and Deliverables</h2>
            <p>We strive to provide professional, high-quality images consistent with the portfolio presented on this site. Final retouched images are delivered digitally. Unedited, raw files (RAW) are not provided to clients unless specifically negotiated into a commercial contract.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Copyright and Usage Rights</h2>
            <p>Headshot Portland retains the original copyright to all images produced. Upon final payment, clients are granted a perpetual, non-exclusive license to use the delivered images for personal, professional (e.g., LinkedIn, corporate directories), and marketing purposes across all media. Commercial resale of the images is prohibited without explicit consent.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Limitation of Liability</h2>
            <p>While we take extreme care with our equipment and digital files, in the unlikely event that photographs have been lost, stolen, or destroyed for reasons beyond our control (including equipment malfunction), Headshot Portland's liability is strictly limited to the return of all payments received for the session. In the event of a lost session, a free reshoot will be offered where practically possible.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Governing Law</h2>
            <p>These terms shall be governed by and construed in accordance with the laws of the State of Oregon, without regard to its conflict of law provisions.</p>
          </section>
        </div>
      </div>
    </main>
  )
}
