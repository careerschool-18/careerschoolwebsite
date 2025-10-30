export default function Alumni() {
  return (
    <section className="py-12 sm:py-16 text-center bg-blue-900 overflow-hidden">
      <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-8 sm:mb-10 text-white">
        Our Alumni Proudly Placed In
      </h2>

      {/* 🔹 Row 1 (scroll left) */}
      <div className="relative w-full overflow-hidden py-2 sm:py-3">
        <div className="flex animate-marquee-left gap-6 sm:gap-10">
          {[...Array(3)].map((_, copy) => (
            <div key={copy} className="flex gap-6 sm:gap-10 items-center flex-shrink-0">
              <img src="/Client image/Cognizant.png" alt="Cognizant" className="h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Client image/Concentrix.png" alt="Concentrix" className="h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Client image/Foundever.png" alt="Foundever" className="h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Client image/Zoho.png" alt="Zoho" className="h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Client image/Hexaware.png" alt="Hexaware" className="h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Client image/Hcl.png" alt="HCL" className="h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Client image/Ideas 2 IT.png" alt="Ideal 2 IT" className="h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Client image/Hinduja.png" alt="Hinduja" className="h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Client image/Indusind Bank.png" alt="Indusind Bank" className="h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Client image/Tata Consultancy Services.png" alt="Tata Consultancy Services" className="h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Row 2 (scroll right) */}
      <div className="relative w-full overflow-hidden py-2 sm:py-3">
        <div className="flex animate-marquee-right gap-6 sm:gap-10">
          {[...Array(3)].map((_, copy) => (
            <div key={copy} className="flex gap-6 sm:gap-10 items-center flex-shrink-0">
              <img src="/Client image/VThink.png" alt="VThink" className="h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Client image/Movate.png" alt="Movate" className="h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Client image/Omega Healthcare.png" alt="Omega Healthcare" className="h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Client image/Quess.png" alt="Quess" className="h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Client image/Advertflair.png" alt="Advertflair" className="h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Client image/Altruist.png" alt="Altruist" className="h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Client image/Ison.png" alt="Ison" className="h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Client image/Teleperformance.png" alt="Teleperformance" className="h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Client image/Tech Mahindra.png" alt="Tech Mahindra" className="h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Client image/Startek.png" alt="Startek" className="h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Row 3 (scroll left) */}
      <div className="relative w-full overflow-hidden py-2 sm:py-3">
        <div className="flex animate-marquee-left gap-6 sm:gap-10">
          {[...Array(3)].map((_, copy) => (
            <div key={copy} className="flex gap-6 sm:gap-10 items-center flex-shrink-0">
              <img src="/Client image/Datamark.png" alt="Datamark" className="h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Client image/HDFC Bank.png" alt="HDFC" className="h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Client image/STAR Health Insurance.png" alt="STAR Health Insurance" className="h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Client image/Sysekam.png" alt="Sysekam" className="h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Client image/Access Healthcare.png" alt="Access Healthcare" className="h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Client image/Emayam Tech.png" alt="Emayam Tech" className="h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Client image/Paisabazaar.png" alt="Paisabazaar" className="h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Client image/Mtutor.png" alt="Mtutor" className="h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Client image/ICICI Bank.png" alt="ICICI Bank" className="h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Client image/Sutherland.png" alt="Sutherland" className="h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
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
            transform: translateX(-33.333%);
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
          animation: marquee-left 30s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-left 30s linear infinite reverse;
        }
      `}</style>
    </section>
  );
}