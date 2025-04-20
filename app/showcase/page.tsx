import { CTA } from "@/components/cta";
import { VideoReview } from "@/components/video-review";
import { SingleVideo } from "@/components/single-video";
import { ImagePopup } from "@/components/image-popup";
import { HorizontalCTA } from "@/components/horizontal-cta";
import CtaSection from "@/components/double-cta";

export default function ShowcasePage() {
  return (
    <main className="bg-black text-white min-h-screen pb-12">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Headshot Portland</h1>
        
        {/* Top section - First masonry grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Column 1 */}
          <div className="space-y-4">
            {/* Professional man headshot */}
            <ImagePopup 
              src="/images/headshot-1.png"
              alt="Professional male headshot"
              aspectRatio={1}
              width={800}
              height={800}
              priority
              name="Professional Headshot"
              quote="Make yourself look good with our professional headshot services"
              date="2023"
              camera="Canon EOS R5"
            />
            
            {/* Woman with bangs headshot */}
            <ImagePopup 
              src="/images/amy-headshot.jpeg"
              alt="Woman with bangs headshot"
              aspectRatio={1}
              width={800}
              height={800}
              name="Classic Portrait"
              quote="Professional and approachable headshots for your personal brand"
            />

            {/* video review */}
            <div className="aspect-auto">
               <VideoReview 
                videoSrc="/videos/example-video.mp4"
                thumbnailSrc="/placeholder-user.jpg"
                authorName="Mitzyn Pierce"
                authorTitle="Director, Community Relations"
                authorCompany="Seattle Mariners"
                reviewText="I needed new professional headshots and Nathan's work is absolute fantastic! The shoot was fun, relaxed, and Nathan captured my vision, he is a fantastic photographer!"
                rating={5}
              />
            </div>

            {/* Image popup */}
             <ImagePopup 
              src="/images/andrew-headshot.jpeg"
              alt="Woman with bangs headshot"
              aspectRatio={1}
              width={800}
              height={800}
              name="Classic Portrait"
              quote="Professional and approachable headshots for your personal brand"
            />

          </div>
          
          {/* Column 2 */}
          <div className="space-y-4">
            {/* Woman with long hair */}
           <div className="aspect-auto">
               <SingleVideo 
                videoSrc="/videos/example-video.mp4" 
                thumbnailSrc="/images/example-thumbnail.jpg"
                alt="Headshot session video"
                aspectRatio="portrait"
                autoPlay={true}
              />
            </div>
            
            {/* Video with person at desk */}
            <div className="aspect-auto">
               <VideoReview 
                videoSrc="/videos/example-video.mp4"
                thumbnailSrc="/placeholder-user.jpg"
                authorName="Mitzyn Pierce"
                authorTitle="Director, Community Relations"
                authorCompany="Seattle Mariners"
                reviewText="I needed new professional headshots and Nathan's work is absolute fantastic! The shoot was fun, relaxed, and Nathan captured my vision, he is a fantastic photographer!"
                rating={5}
              />
            </div>
            
            {/* Man with beard */}
            <ImagePopup 
              src="/images/headshot-2.png"
              alt="Man with beard headshot"
              aspectRatio={1}
              width={800}
              height={800}
              name="Modern Professional"
            />
          </div>
          
          {/* Column 3 */}
          <div className="space-y-4">
            {/* Older man headshot */}
            <ImagePopup 
              src="/images/angela-headshot.jpeg"
              alt="Senior executive headshot"
              aspectRatio={1}
              width={800}
              height={800}
              name="Executive Portrait"
              quote="Confidence and experience in every shot"
            />
            
            {/* Woman with blonde hair */}
            <ImagePopup 
              src="/images/headshot-8.png"
              alt="Woman with blonde hair headshot"
              aspectRatio={1}
              width={800}
              height={800}
              name="Studio Portrait"
            />

            <CTA 
              ctaUrl="/portrait"
              backgroundImage="/images/cta-background.png"
              textColor="text-black"
            />

             <ImagePopup 
              src="/images/headshot-6.png"
              alt="Woman with blonde hair headshot"
              aspectRatio={1}
              width={800}
              height={800}
              name="Studio Portrait"
            />

             <ImagePopup 
              src="/images/headshot-3.png"
              alt="Woman with blonde hair headshot"
              aspectRatio={1}
              width={800}
              height={800}
              name="Studio Portrait"
            />
          </div>
          
          {/* Column 4 */}
          <div className="space-y-4">
            {/* Man in blue suit */}
            <ImagePopup 
              src="/images/headshot-9.png"
              alt="Man in blue suit"
              aspectRatio={1/2}
              width={800}
              height={1000}
              priority
              name="Professional Executive"
              quote="Make a lasting impression with our premium headshot services"
            />
            
            {/* Woman with glasses */}
            <ImagePopup 
              src="/images/headshot-3.png"
              alt="Woman with glasses"
              aspectRatio={1}
              width={800}
              height={800}
              name="Authentic Portrait"
            />

            <div className="aspect-auto">
               <VideoReview 
                videoSrc="/videos/example-video.mp4"
                thumbnailSrc="/placeholder-user.jpg"
                authorName="Mitzyn Pierce"
                authorTitle="Director, Community Relations"
                authorCompany="Seattle Mariners"
                reviewText="I needed new professional headshots and Nathan's work is absolute fantastic! The shoot was fun, relaxed, and Nathan captured my vision, he is a fantastic photographer!"
                rating={5}
              />
            </div>
            
            {/* CTA green box */}
            {/* <div>
              <CTA 
                ctaUrl="/booking"
                imageBgColor="bg-green-300"
              />
            </div> */}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
          {/* Column 1 */}
          <div className="h-full flex flex-col">
            <div className="min-h-[400px] h-full">
              <ImagePopup 
                src="/images/headshot-3.png"
                alt="Woman with glasses"
                aspectRatio={3/4}
                width={800}
                height={800}
                name="Authentic Portrait"
                className="h-full flex-grow"
              />
            </div>
         </div>
          <div className="col-span-2 h-full flex flex-col min-h-[400px]">
            <CtaSection 
          title="Professional"
          subtitle="Headshots"
          description="and we get it—being in front of the camera can be intimidating. Our team of expert photographers will guide you through a comfortable and enjoyable session, ensuring your best self shines through."
          primaryCta={{ text: "GET QUOTE", url: "/pricing" }}
          secondaryCta={{ text: "BOOK NOW", url: "/schedule" }}
          backgroundColor="bg-blue-400"
          className="h-full flex-grow"
          width="w-full h-full"
        />
          </div>
          <div className="h-full flex flex-col">
            <div className="min-h-[400px] h-full">
              <ImagePopup 
                src="/images/headshot-3.png"
                alt="Woman with glasses"
                aspectRatio={1}
                width={800}
                height={800}
                name="Authentic Portrait"
                className="h-full flex-grow"
              />
            </div>
          </div>
        </div>

        
        {/* Second masonry grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Column 1 */}
          <div className="space-y-4">
            {/* Man with pattern shirt */}
            <ImagePopup 
              src="/images/headshot-1.png"
              alt="Man with pattern shirt"
              aspectRatio={1}
              width={800}
              height={800}
              name="Creative Portrait"
            />
            
            {/* Woman with bangs */}
            <ImagePopup 
              src="/images/headshot-5.png"
              alt="Woman with bangs"
              aspectRatio={1}
              width={800}
              height={800}
              name="Professional Woman"
            />

            <CTA 
              ctaUrl="/portrait"
              backgroundImage="/images/cta-background-1.png"
              textColor="text-[#925e12]"
              // backgroundOverlay={true}
              // backgroundOverlayColor="rgba(0, 0, 0, 0.6)"
            />

            <ImagePopup 
              src="/images/headshot-3.png"
              alt="Woman with glasses"
              aspectRatio={1}
            />
          </div>
          
          {/* Column 2 */}
          <div className="space-y-4">
            {/* Video review */}
            <div className="aspect-auto">
              <VideoReview 
                videoSrc="/videos/example-video.mp4"
                thumbnailSrc="/placeholder-user.jpg"
                authorName="Mitzyn Pierce"
                authorTitle="Director, Community Relations"
                authorCompany="Seattle Mariners"
                reviewText="I needed new professional headshots and Nathan's work is absolute fantastic! The shoot was fun, relaxed, and Nathan captured my vision, he is a fantastic photographer!"
                rating={5}
              />
            </div>
            
            {/* Video young man */}
            <div className="aspect-[3/4] rounded-lg overflow-hidden">
              <SingleVideo 
                videoSrc="/videos/example-video.mp4" 
                thumbnailSrc="/images/headshot-new-1.png"
                alt="Young man video"
                aspectRatio="portrait"
                autoPlay={true}
              />
            </div>
          </div>
          
          {/* Column 3 */}
          <div className="space-y-4">
            {/* Older man with beard */}
            <ImagePopup 
              src="/images/client-headshot-11.jpg"
              alt="Older man with beard"
              aspectRatio={1}
              width={800}
              height={800}
              name="Distinguished Professional"
            />
            
            {/* Testimonial */}
            <div className="aspect-auto">
              <VideoReview 
                videoSrc="/videos/example-video.mp4"
                thumbnailSrc="/placeholder-user.jpg"
                authorName="Mitzyn Pierce"
                authorTitle="Director, Community Relations, Seattle"
                authorCompany="Mariners"
                reviewText="I needed new professional headshots and Nathan's work is absolute fantastic! The shoot was fun, relaxed, and Nathan captured my vision, he is a fantastic photographer!"
                rating={5}
              />
            </div>
            
            {/* Man with beard */}
            <ImagePopup 
              src="/images/headshot-2.png"
              alt="Man with beard"
              aspectRatio={1}
              width={800}
              height={800}
              name="Casual Professional"
            />
          </div>
          
          {/* Column 4 */}
          <div className="space-y-4">
            {/* Green CTA */}
            <div>
              <CTA 
                ctaUrl="/services"
                imageBgColor="bg-green-300"
              />
            </div>
            
            {/* Photo grid */}
            <ImagePopup 
              src="/images/collage.png"
              alt="Photo collage"
              aspectRatio={1}
              width={800}
              height={800}
              name="Our Portfolio"
              quote="Check out our diverse range of professional headshots"
            />
            
            {/* Woman with blonde hair */}
            <ImagePopup 
              src="/images/headshot-8.png"
              alt="Woman with blonde hair"
              aspectRatio={1}
              width={800}
              height={800}
              name="Modern Portrait"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">

          <div className="col-span-3">
            <HorizontalCTA 
            videoSrc="/videos/example-video-landscape.mp4"
            thumbnailSrc="/images/example-thumbnail-landscape.jpg"
            title="Make yourself look good"
            description="CLICK BOOK NOW FROM EITHER THE HEADSHOT OR PORTRAIT PAGE. CUSTOMIZE YOUR SESSION"
            ctaText="GET QUOTE"
            ctaUrl="https://example.com/quote"
            className="mb-4"
            btnColor="bg-transparent"
          />
          </div>
          <div>
            <ImagePopup 
              src="/images/headshot-3.png"
              alt="Woman with glasses"
              aspectRatio={1}
            />
          </div>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Column 1 */}
          <div className="space-y-4">
            {/* Professional man headshot */}
            <ImagePopup 
              src="/images/headshot-1.png"
              alt="Professional male headshot"
              aspectRatio={1}
              width={800}
              height={800}
              priority
              name="Professional Headshot"
              quote="Make yourself look good with our professional headshot services"
              date="2023"
              camera="Canon EOS R5"
            />
            
            {/* Woman with bangs headshot */}
            <ImagePopup 
              src="/images/amy-headshot.jpeg"
              alt="Woman with bangs headshot"
              aspectRatio={1}
              width={800}
              height={800}
              name="Classic Portrait"
              quote="Professional and approachable headshots for your personal brand"
            />

            {/* video review */}
            <div className="aspect-auto">
               <VideoReview 
                videoSrc="/videos/example-video.mp4"
                thumbnailSrc="/placeholder-user.jpg"
                authorName="Mitzyn Pierce"
                authorTitle="Director, Community Relations"
                authorCompany="Seattle Mariners"
                reviewText="I needed new professional headshots and Nathan's work is absolute fantastic! The shoot was fun, relaxed, and Nathan captured my vision, he is a fantastic photographer!"
                rating={5}
              />
            </div>

            {/* Image popup */}
             <ImagePopup 
              src="/images/andrew-headshot.jpeg"
              alt="Woman with bangs headshot"
              aspectRatio={1}
              width={800}
              height={800}
              name="Classic Portrait"
              quote="Professional and approachable headshots for your personal brand"
            />

          </div>
          
          {/* Column 2 */}
          <div className="space-y-4">
            {/* Woman with long hair */}
           <div className="aspect-auto">
               <SingleVideo 
                videoSrc="/videos/example-video.mp4" 
                thumbnailSrc="/images/example-thumbnail.jpg"
                alt="Headshot session video"
                aspectRatio="portrait"
                autoPlay={true}
              />
            </div>
            
            {/* Video with person at desk */}
            <div className="aspect-auto">
               <VideoReview 
                videoSrc="/videos/example-video.mp4"
                thumbnailSrc="/placeholder-user.jpg"
                authorName="Mitzyn Pierce"
                authorTitle="Director, Community Relations"
                authorCompany="Seattle Mariners"
                reviewText="I needed new professional headshots and Nathan's work is absolute fantastic! The shoot was fun, relaxed, and Nathan captured my vision, he is a fantastic photographer!"
                rating={5}
              />
            </div>
            
            {/* Man with beard */}
            <ImagePopup 
              src="/images/headshot-2.png"
              alt="Man with beard headshot"
              aspectRatio={1}
              width={800}
              height={800}
              name="Modern Professional"
            />
          </div>
          
          {/* Column 3 */}
          <div className="space-y-4">
            {/* Older man headshot */}
            <ImagePopup 
              src="/images/angela-headshot.jpeg"
              alt="Senior executive headshot"
              aspectRatio={1}
              width={800}
              height={800}
              name="Executive Portrait"
              quote="Confidence and experience in every shot"
            />
            
            {/* Woman with blonde hair */}
            <ImagePopup 
              src="/images/headshot-8.png"
              alt="Woman with blonde hair headshot"
              aspectRatio={1}
              width={800}
              height={800}
              name="Studio Portrait"
            />

            <CTA 
              ctaUrl="/portrait"
              backgroundImage="/images/cta-background.png"
              textColor="text-black"
            />

             <ImagePopup 
              src="/images/headshot-6.png"
              alt="Woman with blonde hair headshot"
              aspectRatio={1}
              width={800}
              height={800}
              name="Studio Portrait"
            />

             <ImagePopup 
              src="/images/headshot-3.png"
              alt="Woman with blonde hair headshot"
              aspectRatio={1}
              width={800}
              height={800}
              name="Studio Portrait"
            />
          </div>
          
          {/* Column 4 */}
          <div className="space-y-4">
            {/* Man in blue suit */}
            <ImagePopup 
              src="/images/headshot-9.png"
              alt="Man in blue suit"
              aspectRatio={1/2}
              width={800}
              height={1000}
              priority
              name="Professional Executive"
              quote="Make a lasting impression with our premium headshot services"
            />
            
            {/* Woman with glasses */}
            <ImagePopup 
              src="/images/headshot-3.png"
              alt="Woman with glasses"
              aspectRatio={1}
              width={800}
              height={800}
              name="Authentic Portrait"
            />

            <div className="aspect-auto">
               <VideoReview 
                videoSrc="/videos/example-video.mp4"
                thumbnailSrc="/placeholder-user.jpg"
                authorName="Mitzyn Pierce"
                authorTitle="Director, Community Relations"
                authorCompany="Seattle Mariners"
                reviewText="I needed new professional headshots and Nathan's work is absolute fantastic! The shoot was fun, relaxed, and Nathan captured my vision, he is a fantastic photographer!"
                rating={5}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 