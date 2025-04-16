"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SingleVideoProps {
  videoSrc: string;
  thumbnailSrc: string;
  alt: string;
  className?: string;
  autoPlay?: boolean;
  aspectRatio?: "video" | "portrait" | "square";
  objectFit?: "cover" | "contain";
}

export function SingleVideo({ 
  videoSrc, 
  thumbnailSrc, 
  alt, 
  className,
  autoPlay = true,
  aspectRatio = "video",
  objectFit = "cover"
}: SingleVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get aspect ratio class based on prop
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "portrait":
        return "aspect-[9/16]"; // Portrait videos (9:16)
      case "square":
        return "aspect-square"; // Square videos (1:1)
      case "video":
      default:
        return "aspect-video"; // Standard 16:9 videos
    }
  };

  // Get object fit class
  const getObjectFitClass = () => {
    return objectFit === "contain" ? "object-contain" : "object-cover";
  };

  // Handle intersection observer to auto-play when in viewport
  useEffect(() => {
    // Skip autoplay setup if autoPlay is false
    if (!autoPlay) return;
    
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          playVideoMuted();
        } else {
          pauseVideo();
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersection, options);
    
    if (containerRef.current) {
      observerRef.current.observe(containerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [autoPlay]);

  // Check video source when component mounts
  useEffect(() => {
    // Function to check if video exists
    const checkVideoSource = async () => {
      try {
        const response = await fetch(videoSrc, { method: 'HEAD' });
        if (!response.ok) {
          console.error(`Video file not accessible: ${videoSrc} (Status ${response.status})`);
          setHasError(true);
        }
      } catch (error) {
        console.error(`Error checking video file: ${videoSrc}`, error);
        // Don't set error here as it might just be a CORS issue with HEAD request
      }
    };

    checkVideoSource();
  }, [videoSrc]);

  // Play video function (muted - for autoplay)
  const playVideoMuted = () => {
    if (videoRef.current) {
      // Ensure it's muted for autoplay policies
      videoRef.current.muted = true;
      setIsMuted(true);
      
      // Try to play
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Video autoplay started successfully (muted)");
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Error during autoplay:", error);
            // Keep thumbnail visible if autoplay fails
            setShowThumbnail(true);
          });
      }
    }
  };

  // Play video function (with user interaction - can be unmuted)
  const playVideo = () => {
    if (videoRef.current) {
      // Play the video
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Video play with user interaction successful");
            setIsPlaying(true);
            // Hide thumbnail after successful play
            setShowThumbnail(false);
          })
          .catch((error) => {
            console.error("Error playing video with user interaction:", error);
          });
      }
    }
  };

  // Pause video function
  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Toggle play/pause with sound control
  const togglePlayPause = () => {
    console.log("Toggle play/pause clicked", { isPlaying, isMuted });
    
    if (isPlaying && !isMuted) {
      // If playing and unmuted, pause the video
      pauseVideo();
    } else if (isPlaying && isMuted) {
      // If playing but muted, unmute and restart from beginning
      setIsMuted(false);
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.currentTime = 0;
        playVideo();
      }
    } else {
      // If not playing, start playing unmuted from beginning
      setIsMuted(false);
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.currentTime = 0;
        playVideo();
      }
    }
  };

  // Handle video loaded data
  const handleVideoLoaded = () => {
    console.log("Video loaded and ready");
    // Only hide thumbnail automatically if video is already playing
    if (isPlaying && !showThumbnail) {
      setShowThumbnail(false);
    }
  };

  // Handle video error
  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error("Video error event:", e);
    setHasError(true);
    setShowThumbnail(true);
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative w-full max-w-full overflow-hidden rounded-lg",
        getAspectRatioClass(),
        className
      )}
    >
      {/* Thumbnail */}
      {(showThumbnail || hasError) && (
        <div className="absolute inset-0 z-10">
          <Image
            src={thumbnailSrc}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={cn("w-full h-full", getObjectFitClass())}
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center">
            {!hasError ? (
              <button
                className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                onClick={togglePlayPause}
                aria-label={isPlaying && !isMuted ? "Pause video" : "Play video with sound"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-8 h-8"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            ) : (
              <div className="bg-black/50 backdrop-blur-sm p-3 rounded-lg text-white text-center">
                <p>Video unavailable</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Video Element */}
      {!hasError && (
        <video
          ref={videoRef}
          className={cn(
            "w-full h-full",
            getObjectFitClass(),
            showThumbnail ? "opacity-0" : "opacity-100"
          )}
          onClick={togglePlayPause}
          onLoadedData={handleVideoLoaded}
          onError={handleVideoError}
          playsInline
          muted={isMuted}
          preload="auto"
          loop
        >
          <source src={videoSrc} type={videoSrc.endsWith(".webm") ? "video/webm" : "video/mp4"} />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Play/Pause Button Overlay when video is visible */}
      {!showThumbnail && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            className={cn(
              "w-16 h-16 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-opacity",
              isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
            )}
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause video" : "Play video with sound"}
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-8 h-8"
              >
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-8 h-8"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
} 