"use client";
import { useEffect, useState } from "react";

export default function Courses() {
  const courses = [
    {
      title: "ZOHO Payroll",
      duration: "1.5 Months (Practical Focused)",
      highlight: "Live Payroll Processing + Certification",
      poster: "/Training cards image/ZOHO Payroll Banner.jpg",
      label: {
        text: "RECENTLY ADDED",
        color: "bg-red-600",
      },
    },
    {
      title: "Learn Python with AI",
      duration: "3 Months (Rapid Learning)",
      highlight: "Internship & Placement Included",
      poster: "/Training cards image/Python Banner.jpg",
    },
    {
      title: "Data Analytics",
      duration: "3 Months (Rapid Learning)",
      highlight: "Hands-on Projects & Placement Support",
      poster: "/Training cards image/Data Analytics Banner.png",
      label: {
        text: "TRENDING COURSE 📈",
        color: "bg-red-600",
      },
    },
    {
      title: "HR with Analytics",
      duration: "3 Months (Rapid Learning)",
      highlight: "ZOHO Pay Roll Module Included",
      poster: "/Training cards image/HR Analytics Banner.png",
    },
  ];

  const enrollLink =
    "https://243742367.hs-sites-na2.com/training-internship-with-certification-launch-your-career-today";

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % courses.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [courses.length]);

  const Card = ({ course }) => (
    <div className="relative flex flex-col bg-[#004AAD] rounded-3xl shadow-xl overflow-hidden text-white w-[260px] transition-transform hover:scale-[1.04]">
      {course.label && (
        <span
          className={`absolute top-3 right-3 ${course.label.color} text-white text-[10px] font-bold px-3 py-1 rounded-full z-10`}
        >
          {course.label.text}
        </span>
      )}

      <img
        src={course.poster}
        alt={course.title}
        className="w-full h-[210px] object-cover"
      />

      <div className="flex flex-col justify-center items-center p-4 text-center">
        <h3 className="font-bold text-base sm:text-lg mb-1">
          {course.title}
        </h3>

        <p className="text-xs sm:text-sm mb-2">⏰ {course.duration}</p>

        <span
          className="text-black font-semibold text-[10px] sm:text-xs px-3 py-1 rounded-full mb-3"
          style={{ backgroundColor: "#FFD02B" }}
        >
          {course.highlight}
        </span>

        <a href={enrollLink} target="_blank" rel="noopener noreferrer">
          <button
            className="font-bold px-5 py-2 rounded-full text-xs sm:text-sm transition hover:scale-[1.05]"
            style={{ backgroundColor: "#FFFFFF", color: "#004AAD" }}
          >
            ENROLL NOW
          </button>
        </a>
      </div>
    </div>
  );

  return (
    <section id="courses" className="w-full bg-white py-12 overflow-hidden">
      {/* HEADING */}
      <div className="text-center mb-10 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#004AAD] mb-3">
          Next Batch Starts Soon
        </h2>
        <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto">
          Industry-ready Training Programs with Internships & Placement Support
          for Students, Freshers, and Working Professionals.
        </p>
      </div>

      {/* DESKTOP (NO SIDE SCROLL) */}
      <div className="hidden sm:flex justify-center gap-6 px-6 flex-wrap">
        {courses.map((course, i) => (
          <Card key={i} course={course} />
        ))}
      </div>

      {/* MOBILE (AUTO SLIDE) */}
      <div className="block sm:hidden px-6">
        <div className="flex justify-center">
          <Card course={courses[current]} />
        </div>

        <div className="flex justify-center mt-4 space-x-2">
          {courses.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === current ? "bg-[#004AAD] scale-125" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
