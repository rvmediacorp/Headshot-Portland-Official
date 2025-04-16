import CtaSection from "@/components/double-cta";

export default function CtaExample() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">CTA Section Component</h1>
      
      {/* Default CTA Component */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Default Configuration</h2>
        <CtaSection />
      </div>
      
      {/* Custom CTA Component */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Custom Configuration</h2>
        <CtaSection 
          title="Professional"
          subtitle="Headshots"
          description="and we get it—being in front of the camera can be intimidating. Our team of expert photographers will guide you through a comfortable and enjoyable session, ensuring your best self shines through."
          primaryCta={{ text: "GET QUOTE", url: "/pricing" }}
          secondaryCta={{ text: "BOOK NOW", url: "/schedule" }}
          backgroundColor="bg-blue-600"
        />
      </div>
    </div>
  );
} 