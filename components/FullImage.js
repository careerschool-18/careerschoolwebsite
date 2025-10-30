"use client";

export default function FullImage() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* 🔹 Desktop Image */}
      <img
        src="/Home page images/Home Page - 3840 x 2160.jpg"
        alt="Desktop View"
        className="hidden sm:block w-full h-full object-cover"
      />

      {/* 🔹 Mobile Image */}
      <img
        src="/Home page images/Home Page - 1080 x 920.jpg"
        alt="Mobile View"
        className="block sm:hidden w-full h-full object-cover"
        loading="eager" // ensures fast loading on mobile
      />

      {/* 🔹 Optional Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* 🔹 Hero Text */}
      <div className="absolute left-5 sm:left-10 top-1/2 transform -translate-y-1/2 text-left">
        <h1 className="text-[#ffd02b] font-extrabold uppercase text-3xl sm:text-5xl md:text-6xl leading-tight drop-shadow-lg">
          <span className="block mb-4 sm:mb-6 md:mb-8">Your</span>
          <span className="block mb-4 sm:mb-6 md:mb-8">Trusted Training</span>
          <span className="block mb-4 sm:mb-6 md:mb-8">&</span>
          <span className="block">Placement Hub</span>
        </h1>
      </div>
    </section>
  );
}
