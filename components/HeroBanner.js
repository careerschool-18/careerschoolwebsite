export default function HeroBanner() {
  return (
    <section className="py-3 sm:py-4 relative overflow-hidden bg-gradient-to-r from-[#235d9f] to-[#1f4a7e]">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 px-4">
        {/* 🔵 Scrolling Text */}
        <div className="overflow-hidden whitespace-nowrap w-full sm:flex-1 relative order-2 sm:order-1">
          <div className="animate-marquee text-base sm:text-xl md:text-2xl font-bold text-white inline-block">
            PYTHON with AI Training - Batch Starts Soon!  •  PYTHON with AI Training - Batch Starts Soon!  •  PYTHON with AI Training - Batch Starts Soon! •
          </div>
        </div>

        {/* 🟡 Button at Right Corner */}
        <button
          className="bg-[#f9ca1b] text-[#1f4a7e] px-4 sm:px-6 py-2 font-semibold rounded-[07px] order-1 sm:order-2 mb-2 sm:mb-0 text-sm sm:text-base"
          style={{
            position: "relative",
            right: 0,
          }}
        >
          ENROLL NOW
        </button>
      </div>

      {/* 🔵 Animation Style */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
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
