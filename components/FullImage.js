export default function FullImage() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Full-screen image */}
      <img
        src="/full-image.jpg"
        alt="Full Screen"
        className="w-full h-full object-cover"
      />

      {/* 🔹 Optional dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* 🔹 Hero Text */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 max-w-md">
        <h1 className="text-[#ffd02b] text-base sm:text-2xl md:text-4xl font-bold leading-snug">
          Learn In-Demand <br /> Skills and Get Ready <br /> For Your Dream Job
        </h1>
      </div>
    </section>
  );
}
