"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    npf_d?: string;
    npf_c?: string;
    npf_m?: string;
  }
}

export function NpfTrackingScript() {
  useEffect(() => {
    window.npf_d = "https://admission.sviet.ac.in";
    window.npf_c = "5151";
    window.npf_m = "1";

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://track.nopaperforms.com/js/track.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}
