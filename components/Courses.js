export default function Courses() {
  const courses = [
    {
      title: "Learn Python with AI",
      duration: "3 Months (Rapid Learning)",
      highlight: "Internship & Placement Included",
      poster: "/Python-AI--(1).webp",
    },
    {
      title: "HR with Analytics",
      duration: "3 Months (Rapid Learning)",
      highlight: "ZOHO Pay Roll Module Included",
      poster: "/HR-Analytics.jpg",
    },
    {
      title: "Data Analytics",
      duration: "3 Months (Rapid Learning)",
      highlight: "ZOHO Pay Roll Module Included",
      poster: "/data-analysis-skills-duties-responsibilities.jpeg",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-blue-50 text-center px-4 sm:px-6 overflow-hidden">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-900">
        Next Batch Starts Soon
      </h2>

      <p className="mb-8 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
        Industry-ready Training Programs with Internships & Placement Support
        for Students, Freshers and Working Professionals.
      </p>

      {/* 🔹 Horizontal Scroll Container */}
      <div className="overflow-hidden relative">
        <div className="flex animate-marquee gap-6 sm:gap-8">
          {courses.concat(courses).map((course, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden shadow-lg bg-white flex flex-col hover:scale-[1.02] transition-transform duration-300 min-w-[280px] flex-shrink-0"
            >
              {/* Poster Image */}
              <img
                src={course.poster}
                alt={course.title}
                className="h-40 sm:h-48 w-full object-cover"
              />

              {/* Bottom Blue Section */}
              <div className="bg-blue-700 text-white p-4 sm:p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-bold text-base sm:text-lg">{course.title}</h3>
                  <p className="text-xs sm:text-sm flex items-center gap-2 mt-2">
                    ⏰ {course.duration}
                  </p>
                  <p className="bg-yellow-400 text-black font-semibold text-[10px] sm:text-xs px-2 py-1 rounded mt-3 inline-block">
                    {course.highlight}
                  </p>
                </div>

                {/* Buttons */}
                <div className="mt-4 sm:mt-6 flex flex-col gap-2">
                  <button className="border border-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm hover:bg-white hover:text-blue-700 transition">
                    Learn More
                  </button>
                  <button className="bg-white text-blue-700 font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm">
                    ENROLL
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Explore More Courses Button */}
      <div className="mt-8 sm:mt-10">
        <button className="bg-blue-700 hover:bg-blue-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium shadow-md text-sm sm:text-base">
          Explore More Courses
        </button>
      </div>

      {/* 🔹 Marquee Animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          gap: 1.5rem;
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </section>
  );
}
