export default function NeedHelp() {
  return (
    <section className="py-12 sm:py-16 bg-blue-800 text-center px-4 sm:px-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-white">
        Need Help?
      </h2>

      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-20 sm:h-24 rounded-xl shadow-md flex items-center justify-center 
                       text-base sm:text-lg font-semibold text-gray-800
                       bg-gradient-to-r from-white via-yellow-200 to-yellow-400 hover:scale-[1.02] transition-transform duration-300"
          >
            Box {i}
          </div>
        ))}
      </div>
    </section>
  );
}
