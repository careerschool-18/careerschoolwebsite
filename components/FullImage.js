export default function FullImage() {
  return (
    <section
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-start"
      style={{ backgroundImage: "url('/full-image.jpeg')" }}
    >
      {/* 🔹 Optional dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* 🔹 Hero Text - left aligned and vertically centered */}
      <div className="relative z-10 pl-8 sm:pl-12 md:pl-20 max-w-xl text-left">
        <h1 className="text-[#ffd02b] text-2xl sm:text-5xl md:text-5x1 font-bold leading-snug">
      Learn In-Demand <br /> Skills and Get Ready  <br /> For Your Dream Job
        </h1>
      </div>
    </section>
  );
}