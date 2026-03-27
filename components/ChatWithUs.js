"use client";

import { useState } from "react";

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-48 right-6 z-50">
      <div className="relative">
        {/* POPUP CARD (NOW ABOVE ICON) */}
        {open && (
          <div className="absolute bottom-full right-0 mb-3 w-[300px] bg-white shadow-xl p-4">
            {/* CLOSE BUTTON */}
            <div className="flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 text-lg"
              >
                ✕
              </button>
            </div>

            {/* CONTENT */}
            <div>
              <h3 className="font-bold text-gray-800 text-sm">
                Talk to a counsellor
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                Have doubts? Our support team will be happy to assist you!
              </p>
            </div>

            {/* BUTTON */}
            <div
              onClick={() =>
                window.open("https://wa.me/918939592323", "_blank")
              }
              className="mt-4 border border-blue-500 text-blue-600 flex items-center justify-center gap-2 py-2 text-sm cursor-pointer hover:bg-blue-50 transition"
            >
              📞 +91 89 39 59 23 23
            </div>
          </div>
        )}

        {/* FLOATING ICON */}
        <div onClick={() => setOpen(true)} className="cursor-pointer">
          <div className="relative">
            {/* GLOW */}
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>

            {/* ICON */}
            <span className="relative bg-green-500 hover:bg-green-600 p-4 rounded-full shadow-xl flex items-center justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
                alt="WhatsApp"
                className="w-7 h-7"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
