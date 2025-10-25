export default function Courses() {
  const courses = [
    {
      title: "Learn Python with AI",
      duration: "3 Months (Rapid Learning)",
      highlight: "Internship & Placement Included",
      poster: "/Python Banner.jpg",
    },
    {
      title: "HR with Analytics",
      duration: "3 Months (Rapid Learning)",
      highlight: "ZOHO Pay Roll Module Included",
      poster: "/HR Analytics Banner.png",
    },
    {
      title: "Data Analytics",
      duration: "3 Months (Rapid Learning)",
      highlight: "ZOHO Pay Roll Module Included",
      poster: "/Data Analytics Banner.png",
    },
  ];

  // ✅ Common link for all buttons
  const enrollLink =
    "https://243742367.hs-sites-na2.com/training-internship-with-certification-launch-your-career-today";

  return (
    <section
      id="courses" // 👈 Added ID for smooth scroll from Header
      className="py-12 sm:py-16 text-center px-4 sm:px-6 overflow-hidden"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* 🔹 Section Heading */}
      <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-[#004AAD]">
        Next Batch Starts Soon
      </h2>

      {/* 🔹 Section Tagline */}
      <p className="mb-10 text-sm sm:text-base text-gray-700 max-w-2xl mx-auto">
        Industry-ready Training Programs with Internships & Placement Support
        for Students, Freshers and Working Professionals.
      </p>

      {/* 🔹 Cards Section */}
      <div className="overflow-hidden relative">
        <div className="flex animate-marquee gap-6 sm:gap-8">
          {courses.concat(courses).map((course, i) => (
            <div
              key={i}
              className="shadow-lg flex flex-col hover:scale-[1.02] transition-transform duration-300 flex-shrink-0"
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                backgroundColor: "#004AAD",
                minWidth: "280px",
                maxWidth: "280px",
                height: "380px",
              }}
            >
              {/* 🔹 Poster Image */}
              <img
                src={course.poster}
                alt={course.title}
                className="w-full object-cover"
                style={{
                  height: "160px",
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                }}
              />

              {/* 🔹 Card Content */}
              <div className="flex flex-col justify-between flex-grow p-4 sm:p-6 text-center text-white">
                <div>
                  <h3 className="font-bold text-base sm:text-lg">
                    {course.title}
                  </h3>

                  <p className="text-xs sm:text-sm mt-2">⏰ {course.duration}</p>

                  {/* 🔹 Highlight */}
                  <p
                    className="text-black font-semibold text-[10px] sm:text-xs px-2 py-1 rounded mt-3 inline-block"
                    style={{ backgroundColor: "#FFD02B" }}
                  >
                    {course.highlight}
                  </p>
                </div>

                {/* 🔹 CTA Button */}
                <div className="mt-4 flex justify-center">
                  <a
                    href={enrollLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button
                      className="font-bold px-4 py-2 rounded text-xs sm:text-sm transition hover:scale-[1.05]"
                      style={{
                        backgroundColor: "#FFFFFF",
                        color: "#004AAD",
                        borderRadius: "20px",
                      }}
                    >
                      ENROLL NOW
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Explore More Courses Button */}
      <div className="mt-10 flex justify-center">
        <a href={enrollLink} target="_blank" rel="noopener noreferrer">
          <button
            className="font-extrabold px-6 py-3 rounded text-xs sm:text-sm transition hover:scale-[1.05]"
            style={{
              backgroundColor: "#004AAD",
              color: "#FFFFFF",
              borderRadius: "20px",
            }}
          >
            Explore More Courses
          </button>
        </a>
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
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}