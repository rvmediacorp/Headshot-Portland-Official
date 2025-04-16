"use client";

import React from "react";
import { SingleVideo } from "./ui/single-video";

export function ExampleSingleVideoSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Single Video Component</h2>
          <ul className="space-y-3 list-disc ml-6">
            <li className="text-lg">Supports mp4 and Webm</li>
            <li className="text-lg">Loads thumbnail first</li>
            <li className="text-lg">Auto-plays when in viewport</li>
            <li className="text-lg">Tap to unmute and restart</li>
            <li className="text-lg">Tap again to pause</li>
            <li className="text-lg">Plays inline on the page</li>
          </ul>
          <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded text-black">
            <p className="font-medium">Instructions:</p>
            <ol className="list-decimal ml-5 mt-2 space-y-1">
              <li>When scrolled into view, video starts playing (muted)</li>
              <li>Click once: Video restarts from beginning with sound</li>
              <li>Click again: Video pauses</li>
              <li>Click again: Video continues playing with sound</li>
            </ol>
          </div>
        </div>
        
        <div className="w-full">
          <SingleVideo 
            videoSrc="/videos/example-video.mp4" 
            thumbnailSrc="/images/example-thumbnail.jpg"
            alt="Example video"
            className="shadow-lg"
            autoPlay={true}
          />
          <p className="text-sm text-gray-500 mt-2 text-center">
            Standard 16:9 landscape video
          </p>
        </div>
      </div>

      {/* Portrait Video Example */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-6">Portrait Video Support</h3>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 flex justify-center">
            <div className="w-full max-w-[320px]">
              <SingleVideo 
                videoSrc="/videos/example-video.mp4" 
                thumbnailSrc="/images/woman-black-blazer-headshot.jpeg"
                alt="Portrait video example"
                className="rounded-xl shadow-xl"
                aspectRatio="portrait"
                autoPlay={true}
              />
              <p className="text-sm text-gray-500 mt-2 text-center">
                Portrait mode (9:16 aspect ratio)
              </p>
            </div>
          </div>
          <div className="md:col-span-8 flex flex-col justify-center space-y-4">
            <h4 className="text-xl font-semibold">Portrait Video Support</h4>
            <p>
              For portrait videos (like those from mobile phones or social media), 
              you can use the <code>aspectRatio="portrait"</code> prop to display 
              videos in a 9:16 aspect ratio.
            </p>
            <div className="bg-gray-100 p-4 rounded-md text-black">
              <pre className="text-sm overflow-x-auto">
{`<SingleVideo 
  videoSrc="/videos/portrait-video.mp4" 
  thumbnailSrc="/images/portrait-thumbnail.jpg"
  alt="Portrait video"
  aspectRatio="portrait"
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Object Fit Example */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-6">Object Fit Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <SingleVideo 
              videoSrc="/videos/example-video.mp4"
              thumbnailSrc="/images/headshot-portland-logo-white.png"
              alt="Example with object-contain"
              className="rounded-md bg-gray-200"
              objectFit="contain"
              autoPlay={true}
            />
            <p className="text-sm text-gray-500 mt-2 text-center">
              objectFit="contain" - preserves aspect ratio without cropping
            </p>
          </div>
          <div>
            <SingleVideo 
              videoSrc="/videos/example-video.mp4"
              thumbnailSrc="/images/headshot-portland-logo-white.png"
              alt="Example with object-cover"
              className="rounded-md bg-gray-200"
              objectFit="cover"
              autoPlay={true}
            />
            <p className="text-sm text-gray-500 mt-2 text-center">
              objectFit="cover" (default) - fills entire container, may crop
            </p>
          </div>
        </div>
      </div>

      {/* Square Video Example */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-6">Square Video Support</h3>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5 flex justify-center">
            <div className="w-full max-w-[400px]">
              <SingleVideo 
                videoSrc="/videos/example-video.mp4" 
                thumbnailSrc="/images/headshot-1.png"
                alt="Square video example"
                className="rounded-xl shadow-xl"
                aspectRatio="square"
                autoPlay={false}
              />
              <p className="text-sm text-gray-500 mt-2 text-center">
                Square mode (1:1 aspect ratio)
              </p>
            </div>
          </div>
          <div className="md:col-span-7 flex flex-col justify-center space-y-4">
            <h4 className="text-xl font-semibold">All Supported Aspect Ratios</h4>
            <ul className="list-disc ml-6 space-y-2">
              <li><code>aspectRatio="video"</code> - Standard 16:9 widescreen (default)</li>
              <li><code>aspectRatio="portrait"</code> - Portrait 9:16 for vertical videos</li>
              <li><code>aspectRatio="square"</code> - Square 1:1 for Instagram-style content</li>
            </ul>
            <p>
              The component adapts to maintain the correct aspect ratio across all screen sizes
              while preserving optimal viewing experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 