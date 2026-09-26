"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = "/assets/videos/sviet_vedio.mp4";

export function AboutHeroVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const applyVideoSettings = () => {
      video.muted = true;
      video.loop = true;
      video.playbackRate = 1.3;
      video.play().catch(() => {
        // Autoplay may be blocked, fallback to visibility
      });
    };

    const onCanPlay = () => {
      setIsVideoVisible(true);
      applyVideoSettings();
    };

    const onLoadedMetadata = () => {
      applyVideoSettings();
    };

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("loadedmetadata", onLoadedMetadata);

    // Fallback to ensure video is visible after timeout
    const fallbackTimer = window.setTimeout(() => {
      setIsVideoVisible(true);
      applyVideoSettings();
    }, 1500);

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 bg-black" />
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        title="SVGOI about hero background video"
        playsInline
        className={`pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity duration-500 ${isVideoVisible ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
