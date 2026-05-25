"use client";
import { useEffect, useState } from "react";

export default function Courses() {
  const enrollLink = "/data-analytics-ai-course";
  const trainingLink = "/training-enquiry-form";
  const courses = [
    {
      title: "Python Full Stack + Analytics + AI",
      duration: "3 Months (Rapid Learning)",
      highlight: "Internship & Placement Support",
      poster: "/Training cards image/Python-card.jpeg",
      redirect: trainingLink,
    },
    {
      title: "Data Analytics + AI",
      duration: "3 Months (Rapid Learning)",
      highlight: "Internship & Placement Support",
      poster: "/Training cards image/data-analytics-card.jpeg",
      label: { text: "MOST PREFERRED 📈", color: "bg-red-600" },
      redirect: enrollLink,
    },
    {
      title: "HR with Analytics + AI",
      duration: "3 Months (Rapid Learning)",
      highlight: "ZOHO Pay Roll Module Included",
      poster: "/Training cards image/hr-analytics-card.jpeg",
      label: { text: "MOST PREFERRED 📈", color: "bg-red-600" },
      redirect: trainingLink,
    },
    {
      title: "ZOHO Payroll",
      duration: "1.5 Months (Practical Focused)",
      highlight: "Live Payroll Processing + Certification",
      poster: "/Training cards image/zoho-card.jpeg",
      label: { text: "RECENTLY ADDED", color: "bg-red-600" },
      redirect: trainingLink,
    },
    {
      title: "Digital Marketing",
      duration: "3 Months (Rapid Learning)",
      highlight: "Internship & Placement Support",
      poster: "/Training cards image/digitalmarketing-card.jpeg",
      redirect: trainingLink,
    },
    {
      title: "Java Full Stack + Analytics + AI",
      duration: "3 Months (Rapid Learning)",
      highlight: "Internship & Placement Support",
      poster: "/Training cards image/Java-card.jpeg",
      redirect: trainingLink,
    },
    {
      title: "AI + Analytics",
      duration: "3 Months (Rapid Learning)",
      highlight: "Analytics + Elective Subject Included",
      poster: "/Training cards image/ai-card.jpeg",
      redirect: trainingLink,
    },
    {
      title: "Finance & Accounting",
      duration: "3 Months (Rapid Learning)",
      highlight: "Internship & Placement Support",
      poster: "/Training cards image/fin-acc-card.jpeg",
      redirect: trainingLink,
    },
  ];

  
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % courses.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [courses.length]);

  const Card = ({ course }) => (
    <div className="relative flex flex-col bg-[#004AAD] rounded-3xl shadow-xl overflow-hidden text-white w-full h-full transition-transform hover:scale-[1.04]">
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
        className="w-full h-[180px] object-cover"
      />

      {/* Content Container - flex-1 ensures it fills the height */}
      <div className="flex flex-col flex-1 p-4 text-center">
        {/* Fixed height for title prevents misalignment */}
        <h3 className="font-bold text-base mb-1 min-h-[48px] flex items-center justify-center">
          {course.title}
        </h3>

        <p className="text-xs mb-2">⏰ {course.duration}</p>

        {/* Fixed height for highlight tag ensures buttons stay in line */}
        <div className="min-h-[40px] flex items-center justify-center mb-4">
          <span
            className="text-black font-semibold text-[10px] px-3 py-1 rounded-full"
            style={{ backgroundColor: "#FFD02B" }}
          >
            {course.highlight}
          </span>
        </div>

        {/* mt-auto pushes the button to the very bottom of the card */}
        <div className="mt-auto">
          <a href={course.redirect}>
            <button
              className="font-bold px-5 py-2 rounded-full text-xs transition hover:scale-[1.05]"
              style={{ backgroundColor: "#FFFFFF", color: "#004AAD" }}
            >
              ENROLL NOW
            </button>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <section id="courses" className="w-full bg-white py-12">
      <div className="text-center mb-10 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#004AAD] mb-3">
          Next Batch Starts Soon
        </h2>
        <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto">
          Industry-ready Training Programs with Internships & Placement Support
          for Students, Freshers, and Working Professionals.
        </p>
      </div>

      {/* DESKTOP GRID (4 Columns) */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 px-10 max-w-7xl mx-auto">
        {courses.map((course, i) => (
          <Card key={i} course={course} />
        ))}
      </div>

      {/* MOBILE (SLIDER) */}
      <div className="block sm:hidden px-6">
        <div className="flex justify-center h-[420px]">
          <div className="w-[280px]">
            <Card course={courses[current]} />
          </div>
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          {courses.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${i === current ? "bg-[#004AAD] scale-125" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
