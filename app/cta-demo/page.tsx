import { CTA } from "@/components/cta";

export default function CTADemoPage() {
  return (
    <main className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-12 text-center">CTA Component Demo</h1>
      
      <div className="space-y-16 max-w-4xl mx-auto">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Basic CTA</h2>
          <div className="w-80 h-64">
            <CTA 
              ctaUrl="/book"
            />
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">CTA with Background Image</h2>
          <div className="w-80 h-64">
            <CTA 
              ctaUrl="/schedule"
              backgroundImage="/images/cta-background.png"
            />
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">CTA with Background Image and Overlay</h2>
          <div className="w-80 h-64">
            <CTA 
              ctaUrl="/portrait"
              backgroundImage="/images/cta-background.png"
              backgroundOverlay={true}
              backgroundOverlayColor="rgba(0, 0, 0, 0.6)"
            />
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">CTA with Custom Image</h2>
          <div className="w-80 h-64">
            <CTA 
              ctaUrl="/pricing"
              imageUrl="/images/cta-background.png"
            />
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">CTA with Custom Colors</h2>
          <div className="w-80 h-64">
            <CTA 
              ctaUrl="/contact"
              imageBgColor="bg-blue-300"
              className="shadow-lg"
            />
          </div>
        </div>
      </div>
    </main>
  );
} 