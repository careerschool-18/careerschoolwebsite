export default function FullImage() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* 🔹 Full-screen image */}
      <img
        src="/Home Page - 3840 x 2160.png"
        alt="Full Screen"
        className="w-full h-full object-cover"
      />

      {/* 🔹 Optional dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* 🔹 Hero Text */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
        <h1 className="text-[#ffd02b] font-extrabold uppercase text-3xl sm:text-5xl md:text-6xl">
          <span className="block mb-6 sm:mb-8 md:mb-10">Your</span>
          <span className="block mb-6 sm:mb-8 md:mb-10">Trusted Training</span>
          <span className="block mb-6 sm:mb-8 md:mb-10">&</span>
          <span className="block">Placement Hub</span>
        </h1>
      </div>
    </section>
  );
}