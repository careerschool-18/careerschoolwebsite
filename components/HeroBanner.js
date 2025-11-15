"use client";

export default function HeroBanner() {
  const enrollLink =
    "https://243742367.hs-sites-na2.com/training-internship-with-certification-launch-your-career-today";

  return (
    <section className="relative overflow-hidden bg-[#f9ca1b] py-1 sm:py-2">
      <div className="relative flex items-center justify-end w-full px-4 sm:px-6">
        {/* 🟡 Enroll Button (fixed right) */}
        <a
          href={enrollLink}
          target="_blank"
          rel="noopener noreferrer"
          className="z-20 flex-shrink-0"
        >
          <button className="bg-[#1f4a7e] text-[#f9ca1b] px-4 sm:px-6 py-1.5 sm:py-2 font-semibold rounded-[7px] text-xs sm:text-sm lg:text-base transition-all duration-300 hover:scale-105 hover:bg-[#173a65]">
            ENROLL NOW
          </button>
        </a>

        {/* 🔵 Scrolling Text (starts from left edge of button) */}
        <div
          className="absolute left-0 overflow-hidden whitespace-nowrap"
          style={{ right: "min(8vw, 180px)" }}
        >
          {/* Duplicate content for smooth infinite loop */}
          <div className="marquee-track text-sm sm:text-lg md:text-xl xl:text-2xl font-bold text-black">
            <span>
              FREE Data Analytics & HR Workshop – Limited Seats! • FREE Data Analytics & HR Workshop – Limited Seats! • FREE Data Analytics & HR Workshop – Limited Seats! • FREE Data Analytics & HR Workshop – Limited Seats! •
            </span>
            <span>
              FREE Data Analytics & HR Workshop – Limited Seats! • FREE Data Analytics & HR Workshop – Limited Seats! • FREE Data Analytics & HR Workshop – Limited Seats! • FREE Data Analytics & HR Workshop – Limited Seats! •
            </span>
          </div>
        </div>
      </div>

      {/* 🔹 Styles */}
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
