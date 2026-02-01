"use client";

export default function FullImage() {
  return (
    <section className="relative w-full h-[100svh] overflow-hidden">

      {/* Desktop Image */}
      <img
        src="/Home page images/Home Page - 3840 x 2160(updated).jpg"
        alt="Desktop View"
        className="hidden sm:block w-full h-full object-cover"
      />

      {/* Mobile Image */}
      <img
        src="/Home page images/Home Page - 1080 x 920(updated).jpg"
        alt="Mobile View"
        className="block sm:hidden w-full h-full object-cover"
        loading="eager"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* TEXT */}
      <div className="absolute bottom-[32vh] sm:bottom-[25vh] w-full px-4 text-center">
        <h1
          className="
            font-extrabold uppercase text-[#ffd02b]
            drop-shadow-xl leading-tight
            mx-auto max-w-[95%] sm:max-w-[85%]

            /* Mobile */
            text-[20px]
            line-clamp-none

            /* Tablet & Desktop */
            sm:text-[clamp(25px,4vw,45px)]
            sm:line-clamp-2
          "
        >
          Your Trusted Training & <br /> Placement Hub
        </h1>
      </div>

    </section>
  );
}