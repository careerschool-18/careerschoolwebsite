"use client";

export default function HeroBanner() {
  // Link to your NewYearOffer2026 page
  const offerPageUrl = "/NewYearOffer2026";

  return (
    <section className="relative overflow-hidden bg-[#f9ca1b] py-1 sm:py-2">
      <div className="relative flex items-center justify-end w-full px-4 sm:px-6">
        
        {/* ENROLL NOW Button - Opens in NEW TAB */}
        <a
          href={offerPageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="z-20 flex-shrink-0"
        >
          <button className="bg-[#1f4a7e] text-[#f9ca1b] px-4 sm:px-6 py-1.5 sm:py-2 font-semibold rounded-[7px] text-xs sm:text-sm lg:text-base transition-all duration-300 hover:scale-105 hover:bg-[#173a65] focus:outline-none focus:ring-2 focus:ring-[#1f4a7e] focus:ring-offset-2">
            ENROLL NOW
          </button>
        </a>

        {/* Scrolling Text */}
        <div
          className="absolute left-0 overflow-hidden whitespace-nowrap"
          style={{ right: "min(8vw, 180px)" }}
        >
          <div className="marquee-track text-sm sm:text-lg md:text-xl xl:text-2xl font-bold text-[#1f4a7e]">
            <span>
              Open New Opportunities in 2026 🚀 | Start Your Skill Journey Today • 
            </span>
            <span>
              Open New Opportunities in 2026 🚀 | Start Your Skill Journey Today • 
            </span>
          </div>
        </div>
      </div>

      {/* Marquee Animation Styles */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-track {
          display: inline-flex;
          white-space: nowrap;
          width: 200%;
          animation: marquee 25s linear infinite;
          will-change: transform;
        }

        /* 🖥 Adjust speed and font size for large screens */
        @media (min-width: 2560px) {
          .marquee-track {
            font-size: 1.8rem;
            animation-duration: 35s;
          }
        }

        @media (min-width: 1920px) and (max-width: 2559px) {
          .marquee-track {
            font-size: 1.5rem;
            animation-duration: 30s;
          }
        }

        /* 📱 Slightly faster on mobile */
        @media (max-width: 768px) {
          .marquee-track {
            animation-duration: 18s;
          }
        }
      `}</style>
    </section>
  );
}