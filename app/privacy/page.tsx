import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Headshot Portland',
  description: 'Privacy Policy and data handling practices for Headshot Portland.',
}

export default function PrivacyPage() {
  return (
    <main className="bg-dark-bg min-h-screen text-white pt-24 pb-16 px-5 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-bodoni text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none text-white/80 space-y-6">
          <p className="text-sm text-white/50">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
            <p>At Headshot Portland, we collect personal information when you book a session, request a quote, or contact us. This includes your name, email address, phone number, and any details you provide about your photography needs. We may also collect technical data (like IP addresses and browser types) through cookies to improve our website experience and track advertising performance.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Data</h2>
            <p>Your information is used strictly to provide our photography services. We use it to schedule appointments, communicate about your session, deliver digital galleries, and process payments. We also use analytics tools (such as Google Analytics and Meta Pixel) to understand how visitors interact with our website, which helps us optimize our advertising and content.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Data Sharing and Protection</h2>
            <p>We do not sell your personal data to third parties. We only share information with trusted service providers necessary to run our business (e.g., payment processors, CRM systems, and gallery hosting platforms) under strict confidentiality agreements. We implement industry-standard security measures to protect your data against unauthorized access.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Image Rights and Usage</h2>
            <p>As standard in the photography industry, Headshot Portland retains copyright to all generated images. Unless explicitly agreed upon with a non-disclosure agreement (NDA), we reserve the right to use select anonymized final images for portfolio, marketing, and promotional purposes. We deeply respect client privacy; if you require complete confidentiality for unreleased products or corporate policies, please let us know prior to booking.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Contact Us</h2>
            <p>If you have any questions or concerns regarding this Privacy Policy or wish to request the deletion of your personal data, please contact us at:</p>
            <address className="not-italic mt-2 p-4 bg-white/5 rounded-lg inline-block">
              <strong>Headshot Portland</strong><br />
              805 SW Broadway<br/>
              Portland, OR 97205<br/>
              Phone: 503-313-7121
            </address>
          </section>
        </div>
      </div>
    </main>
  )
}
