"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import BookReleaseWidget from "@/components/Globals/BookReleaseWidget";

export function GlobalEnquiryModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-enquiry-modal", handler);
    return () => window.removeEventListener("open-enquiry-modal", handler);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-9999 items-center justify-center bg-black/60 px-4 ${open ? "flex" : "hidden"}`}
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full max-w-lg rounded-xl bg-white shadow-2xl overflow-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 z-10 rounded-full bg-gray-100 p-1.5 text-gray-600 hover:bg-gray-200"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="p-4">
          <BookReleaseWidget />
        </div>
      </div>
    </div>
  );
}
