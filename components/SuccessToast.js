import React, { useEffect } from "react";

/**
 * SuccessToast
 * Props:
 *  - message  {string}   – text to display
 *  - onClose  {function} – called when toast should be dismissed
 *  - duration {number}   – ms before auto-close (default 2500)
 */
const SuccessToast = ({ message, onClose, duration = 2500 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", backgroundColor: "rgba(0,0,0,0.25)" }}
      onClick={onClose}
    >
      <style>{`
        @keyframes successPop {
          0%   { opacity: 0; transform: scale(0.82); }
          60%  { opacity: 1; transform: scale(1.04); }
          100% { opacity: 1; transform: scale(1);    }
        }
        @keyframes checkDraw {
          from { stroke-dashoffset: 48; }
          to   { stroke-dashoffset: 0;  }
        }
        @keyframes circlePop {
          0%   { transform: scale(0); opacity: 0; }
          70%  { transform: scale(1.12); opacity: 1; }
          100% { transform: scale(1);    opacity: 1; }
        }
      `}</style>

      <div
        className="bg-white rounded-3xl shadow-2xl px-14 py-12 flex flex-col items-center gap-6 max-w-sm w-full mx-4"
        style={{ animation: "successPop 0.42s cubic-bezier(0.34,1.56,0.64,1) both" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated green circle + tick */}
        <div
          className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center"
          style={{ animation: "circlePop 0.45s cubic-bezier(0.34,1.56,0.64,1) 0.05s both" }}
        >
          <svg
            viewBox="0 0 48 48"
            fill="none"
            className="w-12 h-12"
          >
            <circle cx="24" cy="24" r="22" fill="#dcfce7" stroke="#16a34a" strokeWidth="2.5" />
            <polyline
              points="13,25 21,33 35,16"
              stroke="#16a34a"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="48"
              strokeDashoffset="48"
              style={{ animation: "checkDraw 0.38s ease 0.3s forwards" }}
            />
          </svg>
        </div>

        {/* Heading */}
        <div className="text-center">
          <p className="text-2xl font-bold text-green-700 mb-1">Success!</p>
          <p className="text-base text-gray-600 leading-snug">{message}</p>
        </div>

        {/* Dismiss hint */}
        <p className="text-xs text-gray-400 mt-1">Tap anywhere to dismiss</p>
      </div>
    </div>
  );
};

export default SuccessToast;
