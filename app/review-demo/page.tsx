"use client";

import { VideoReview } from "@/components/video-review";

export default function VideoReviewExample() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Video Review Examples</h1>

      <div className=" gap-8 min-h-screen bg-white p-8">
        {/* Example with MP4 video */}
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

      <div className="mt-12 p-6 bg-gray-400 rounded-lg">
        <h2 className="text-xl font-bold mb-4">How to Use the VideoReview Component</h2>
        <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
{`// Import the component
import { VideoReview } from "@/components/video-review";

// Use in your component or page
<VideoReview 
  videoSrc="/path/to/your/video.mp4" // mp4 or webm supported
  thumbnailSrc="/path/to/thumbnail.jpg"
  authorName="Reviewer Name"
  authorTitle="Reviewer Title" // optional
  authorCompany="Company Name" // optional
  reviewText="The review text goes here..."
  rating={5} // optional, defaults to 5
  className="custom-class" // optional
/>`}
        </pre>
      </div>
    </div>
  );
} 