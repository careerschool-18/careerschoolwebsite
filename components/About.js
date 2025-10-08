export default function About() {
  return (
    <section className="py-12 sm:py-16 bg-white px-4 sm:px-6 text-center">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 text-gray-900">
        The Careerschool Edge
      </h2>

      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
        {/* 🔹 First Block: Image Left, Text Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <img
              src="/unnamed.jpg" // ✅ fixed path
              alt="Career School Training"
              className="h-48 sm:h-64 md:h-72 w-60 sm:w-72 md:w-80 rounded-lg object-cover shadow-lg"
            />
          </div>

          {/* Text */}
          <div className="text-left text-sm sm:text-base text-gray-700">
            <p className="mb-4 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </p>
            <p className="leading-relaxed">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>

        {/* 🔹 Second Block: Text Left, Image Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
          {/* Text */}
          <div className="text-left text-sm sm:text-base text-gray-700 order-2 md:order-1">
            <p className="mb-4 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </p>
            <p className="leading-relaxed">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
          </div>

          {/* Image */}
          <div className="flex justify-center order-1 md:order-2">
            <img
              src="/2023-03-06.jpg" 
              alt="Career School Success"
              className="h-48 sm:h-64 md:h-72 w-60 sm:w-72 md:w-80 rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}