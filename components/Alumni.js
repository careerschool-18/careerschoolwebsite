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
              <img src="/Cognizant.png" alt="Cognizant" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Concentrix.png" alt="Concentrix" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Foundever.png" alt="Foundever" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Datamark.png" alt="Datamart" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Hexaware.png" alt="Hexaware" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Hcl.png" alt="HCL" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Ideas.png" alt="Ideal 2 IT" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Hinduja.png" alt="Hinduja" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Induslnd.png" alt="Indusind Bank" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Tata Consultancy Services.png" alt="Tata Consultancy Services" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Row 2 (scroll right, fixed continuous motion) */}
      <div className="relative w-full overflow-hidden py-2 sm:py-3">
        <div className="flex animate-marquee-right gap-6 sm:gap-10">
          {[...Array(2)].map((_, copy) => (
            <div key={copy} className="flex gap-6 sm:gap-10 items-center">
              <img src="/VThink.png" alt="VThink" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Movate.png" alt="Movate" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Omega Healthcare.png" alt="Omega Healthcare" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Quess.png" alt="Quess" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Advertflair.png" alt="Advertflair" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Altruist.png" alt="Altruist" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Ison.png" alt="Ison" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Teleperformance.png" alt="Teleperformance" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Tech Mahindra.png" alt="Tech Mahindra" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Startek.png" alt="Startek" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Row 3 (scroll left) */}
      <div className="relative w-full overflow-hidden py-2 sm:py-3">
        <div className="flex animate-marquee-left gap-6 sm:gap-10">
          {[...Array(2)].map((_, copy) => (
            <div key={copy} className="flex gap-6 sm:gap-10 items-center">
              <img src="/Zoho.png" alt="Zoho" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/HDFC Bank.png" alt="HDFC" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/STAR Health Insurance.png" alt="STAR Health Insurance" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Sysekam.png" alt="Sysekam" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Access Healthcare.png" alt="Access Healthcare" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Emayam Tech.png" alt="Emayam Tech" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Paisabazaar.png" alt="Paisabazaar" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Mtutor.png" alt="Mtutor" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/ICICI Bank.png" alt="ICICI Bank" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
              <img src="/Sutherland.png" alt="Sutherland" className="h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2" />
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

        .animate-marquee-left,
        .animate-marquee-right {
          display: flex;
          width: max-content;
          will-change: transform;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        /* ✅ Both move the same distance; second one reversed for opposite direction */
        .animate-marquee-left {
          animation: marquee-left 25s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-left 25s linear infinite reverse;
        }
      `}</style>
    </section>
  );
}