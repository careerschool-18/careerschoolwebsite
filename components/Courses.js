"use client";
import { useEffect, useState } from "react";

export default function Courses() {
  const courses = [
    {
      title: "Learn Python with AI",
      duration: "3 Months (Rapid Learning)",
      highlight: "Internship & Placement Included",
      poster: "/Training cards image/Python Banner.jpg",
    },
    {
      title: "HR with Analytics",
      duration: "3 Months (Rapid Learning)",
      highlight: "ZOHO Pay Roll Module Included",
      poster: "/Training cards image/HR Analytics Banner.png",
    },
    {
      title: "Data Analytics",
      duration: "3 Months (Rapid Learning)",
      highlight: "ZOHO Pay Roll Module Included",
      poster: "/Training cards image/Data Analytics Banner.png",
    },
  ];

  const enrollLink =
    "https://243742367.hs-sites-na2.com/training-internship-with-certification-launch-your-career-today";

  // 🔹 Mobile auto-slide logic
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % courses.length);
    }, 3000); // every 3s
    return () => clearInterval(interval);
  }, [courses.length]);

  return (
    <section id="courses" className="w-full bg-white py-12 overflow-hidden">
      {/* 🔹 Heading */}
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#004AAD] mb-3">
          Next Batch Starts Soon
        </h2>
        <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto px-4">
          Industry-ready Training Programs with Internships & Placement Support
          for Students, Freshers, and Working Professionals.
        </p>
      </div>

      {/* 🔹 Desktop View (3 Cards) */}
      <div className="hidden sm:flex justify-center gap-6 px-6 flex-wrap">
        {courses.map((course, i) => (
          <div
            key={i}
            className="flex flex-col bg-[#004AAD] rounded-3xl shadow-xl overflow-hidden text-white transition-transform hover:scale-[1.04] flex-shrink-0 w-[300px]"
          >
            <img
              src={course.poster}
              alt={course.title}
              className="w-full h-[230px] object-cover"
            />

            <div className="flex flex-col justify-center items-center p-4 text-center">
              <h3 className="font-bold text-base sm:text-lg mb-1">
                {course.title}
              </h3>
              <p className="text-xs sm:text-sm mb-2">⏰ {course.duration}</p>
              <span
                className="text-black font-semibold text-[10px] sm:text-xs px-3 py-1 rounded-full inline-block mb-3"
                style={{ backgroundColor: "#FFD02B" }}
              >
                {course.highlight}
              </span>

              <a href={enrollLink} target="_blank" rel="noopener noreferrer">
                <button
                  className="font-bold px-5 py-2 rounded-full text-xs sm:text-sm transition hover:scale-[1.05]"
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: "#004AAD",
                  }}
                >
                  ENROLL NOW
                </button>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Mobile View (Auto-slide carousel) */}
      <div className="block sm:hidden relative w-full px-6">
        <div className="flex justify-center items-center">
          <div
            key={current}
            className="flex flex-col bg-[#004AAD] rounded-3xl shadow-xl overflow-hidden text-white transition-all duration-700 ease-in-out w-full max-w-[330px]"
          >
            <img
              src={courses[current].poster}
              alt={courses[current].title}
              className="w-full h-[220px] object-cover"
            />

            <div className="flex flex-col justify-center items-center p-4 text-center">
              <h3 className="font-bold text-base mb-1">
                {courses[current].title}
              </h3>
              <p className="text-xs mb-2">⏰ {courses[current].duration}</p>
              <span
                className="text-black font-semibold text-[10px] px-3 py-1 rounded-full inline-block mb-3"
                style={{ backgroundColor: "#FFD02B" }}
              >
                {courses[current].highlight}
              </span>

              <a href={enrollLink} target="_blank" rel="noopener noreferrer">
                <button
                  className="font-bold px-5 py-2 rounded-full text-xs transition hover:scale-[1.05]"
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: "#004AAD",
                  }}
                >
                  ENROLL NOW
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Small dots indicator */}
        <div className="flex justify-center mt-4 space-x-2">
          {courses.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? "bg-[#004AAD] scale-125" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* 🔹 Explore Button */}
      <div className="mt-12 text-center">
        <a href={enrollLink} target="_blank" rel="noopener noreferrer">
          <button
            className="font-extrabold px-7 py-3 rounded-full text-sm sm:text-base transition hover:scale-[1.05]"
            style={{
              backgroundColor: "#004AAD",
              color: "#FFFFFF",
            }}
          >
            Explore More Courses
          </button>
        </a>
      </div>
    </section>
  );
}
