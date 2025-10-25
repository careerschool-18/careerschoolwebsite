export default function HeroBanner() {
  // ✅ Common link for Enroll button
  const enrollLink =
    "https://243742367.hs-sites-na2.com/training-internship-with-certification-launch-your-career-today";

  return (
    <section className="py-1 sm:py-2 relative overflow-hidden bg-[#f9ca1b]">
      <div className="container mx-auto flex items-center justify-between px-4 relative">
        {/* 🔵 Scrolling Text */}
        <div className="overflow-hidden whitespace-nowrap w-full relative pr-[130px]">
          {/* pr-[130px] leaves space so text doesn't overlap button */}
          <div className="animate-marquee text-sm sm:text-lg md:text-xl font-bold text-black inline-block">
            PYTHON with AI Training - Batch Starts Soon! • PYTHON with AI Training - Batch Starts Soon! • PYTHON with AI Training - Batch Starts Soon! •
          </div>
        </div>

        {/* 🟡 Button at Right Corner */}
        <a
          href={enrollLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 z-10"
        >
          <button className="bg-[#1f4a7e] text-[#f9ca1b] px-3 sm:px-5 py-1.5 font-semibold rounded-[7px] text-xs sm:text-sm transition hover:scale-105 hover:bg-[#173a65]">
            ENROLL NOW
          </button>
        </a>
      </div>

      {/* 🔵 Animation Style */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-marquee {
          display: inline-block;
          animation: marquee 15s linear infinite;
          white-space: nowrap;
        }
      `}</style>
    </section>
  );
}