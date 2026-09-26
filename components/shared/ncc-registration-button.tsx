"use client";

import { useState } from "react";

function NccModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-2xl font-bold text-[#fea700]">
          NCC Registration
        </h2>
        <p className="mb-6 text-lg text-gray-800">
          The registration link will be shared shortly.
          <br />
          Stay&nbsp;tuned!
        </p>
        <button
          onClick={onClose}
          className="mt-2 rounded bg-[#fea700] px-6 py-2 text-white transition hover:bg-[#e09e00]"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export function NccRegistrationButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hover:text-white transition-colors"
      >
        NCC Registration
      </button>
      {open && <NccModal onClose={() => setOpen(false)} />}
    </>
  );
}
