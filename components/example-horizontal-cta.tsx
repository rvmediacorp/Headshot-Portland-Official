"use client";

import React from "react";
import { HorizontalCTA } from "./horizontal-cta";

export function ExampleHorizontalCTASection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 md:py-24">
      <div className="space-y-16">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Horizontal CTA with Video Background</h2>
          <p className="text-lg mb-8">
            This component showcases a responsive CTA with video background, mimicking the design seen in promotional banners.
          </p>
          
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
          
          <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded text-black mt-6">
            <p className="font-medium">How it works:</p>
            <ol className="list-decimal ml-5 mt-2 space-y-1">
              <li>When scrolled into view, video starts playing (muted)</li>
              <li>Click once: Video restarts from beginning with sound</li>
              <li>Click again: Video pauses</li>
              <li>Clicking the CTA button directs to an external URL</li>
            </ol>
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-bold mb-6">Features & Implementation</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-semibold mb-4">Key Features</h4>
              <ul className="space-y-3 list-disc ml-6">
                <li>Full-width video background with text overlay</li>
                <li>Dark gradient to improve text readability</li>
                <li>Responsive aspect ratio (16:7)</li>
                <li>Auto-plays when component enters viewport</li>
                <li>Interactive video controls with status indication</li>
                <li>PROMOTED label for advertising cases</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Implementation Details</h4>
              <ul className="space-y-3 list-disc ml-6">
                <li>Uses IntersectionObserver API for viewport detection</li>
                <li>Handles different video formats (mp4, webm)</li>
                <li>Falls back to thumbnail if video fails to load</li>
                <li>Formats text with proper styling and capitalization</li>
                <li>Maintains accessibility with proper aria-labels</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-md text-black overflow-x-auto">
            <pre className="text-sm">
{`<HorizontalCTA 
  videoSrc="/path/to/video.mp4"   // Supports mp4 and webm
  thumbnailSrc="/path/to/image.jpg"
  title="Your Title Here"
  description="DESCRIPTION TEXT. SPLIT BY PERIODS."
  ctaText="BUTTON TEXT"
  ctaUrl="https://your-link.com"
  btnColor="bg-transparent"        // For transparent button with border
/>`}
            </pre>
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-bold mb-6">Alternative Styling Example</h3>
          <p className="text-lg mb-8">
            The component supports various styling options with minimal prop changes.
          </p>
          
          <HorizontalCTA 
            videoSrc="/videos/example-video-landscape.mp4"
            thumbnailSrc="/images/example-thumbnail-landscape.jpg"
            title="Professional Headshots"
            description="BOOK YOUR SESSION TODAY. LOOK YOUR BEST FOR YOUR CAREER."
            ctaText="BOOK NOW"
            ctaUrl="https://example.com/book"
            btnColor="bg-blue-500"
            btnTextColor="text-white"
          />
        </div>
      </div>
    </section>
  );
} 