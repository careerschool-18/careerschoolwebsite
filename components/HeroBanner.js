export default function HeroBanner() {
  return (
    <section className="py-1 sm:py-2 relative overflow-hidden bg-[#f9ca1b]">
      <div className="container mx-auto flex items-center justify-between px-4 relative">
        {/* 🔵 Scrolling Text */}
        <div className="overflow-hidden whitespace-nowrap w-full relative pr-[130px]"> 
          {/* pr-[130px] = leaves space so text starts left of button */}
          <div className="animate-marquee text-sm sm:text-lg md:text-xl font-bold text-black inline-block">
            PYTHON with AI Training - Batch Starts Soon! • PYTHON with AI Training - Batch Starts Soon! • PYTHON with AI Training - Batch Starts Soon! •
          </div>
        </div>

        {/* 🟡 Button at Right Corner */}
        <button
          className="bg-[#1f4a7e] text-[#f9ca1b] px-3 sm:px-5 py-1.5 font-semibold rounded-[7px] text-xs sm:text-sm absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 z-10"
        >
          ENROLL NOW
        </button>
      </div>

      {/* 🔵 Animation Style */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0); /* Starts from left of the button */
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
