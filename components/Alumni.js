export default function Alumni() {
  return (
    <section className="py-12 sm:py-16 text-center bg-blue-900 overflow-hidden">
      <h2 className="text-xl sm:text-2xl font-bold mb-8 sm:mb-10 text-white">
        Our Alumni Proudly Placed In
      </h2>

      {/* 🔹 Row 1 (scroll left) */}
      <div className="relative w-full overflow-hidden py-2 sm:py-3">
        <div className="flex animate-marquee-left gap-6 sm:gap-10">
          {[...Array(2)].map((_, copy) => (
            <div key={copy} className="flex gap-6 sm:gap-10 items-center">
              <img src="/tcs.jpg" alt="TCS" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src= "/tcs.jpg"alt="Infosys" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/tcs.jpg" alt="Wipro" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src= "/tcs.jpg"alt="Amazon" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/tcs.jpg" alt="Zoho" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/tcs.jpg" alt="HCL" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Row 2 (scroll right) */}
      <div className="relative w-full overflow-hidden py-2 sm:py-3">
        <div className="flex animate-marquee-right gap-6 sm:gap-10">
          {[...Array(2)].map((_, copy) => (
            <div key={copy} className="flex gap-6 sm:gap-10 items-center">
              <img src="/google.jpg" alt="Google" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/google.jpg"alt="Cognizant" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/google.jpg" alt="Deloitte" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src= "/google.jpg"alt="Accenture" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/google.jpg" alt="Microsoft" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/google.jpg" alt="Capgemini" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Row 3 (scroll left) */}
      <div className="relative w-full overflow-hidden py-2 sm:py-3">
        <div className="flex animate-marquee-left gap-6 sm:gap-10">
          {[...Array(2)].map((_, copy) => (
            <div key={copy} className="flex gap-6 sm:gap-10 items-center">
              <img src="/flipkart.jpg" alt="Flipkart" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src= "/flipkart.jpg"alt="PayPal" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/flipkart.jpg" alt="Oracle" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/flipkart.jpg" alt="IBM" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/flipkart.jpg" alt="HP" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/flipkart.jpg" alt="Siemens" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Animation CSS */}
      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(50%);
          }
        }
        .animate-marquee-left,
        .animate-marquee-right {
          display: flex;
          width: max-content;
          will-change: transform;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .animate-marquee-left {
          animation: marquee-left 25s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
