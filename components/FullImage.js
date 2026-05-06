"use client";

import Image from "next/image";

const students = [
  {
    name: "Swathi",
    image: "/students/s1.jpg",
    linkedin: "https://linkedin.com/in/swathi",
  },
  {
    name: "Divya",
    image: "/students/s2.jpg",
    linkedin: "https://linkedin.com/in/divya",
  },
  {
    name: "Anitha",
    image: "/students/s3.jpg",
    linkedin: "https://linkedin.com/in/anitha",
  },
];

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">

      {/* 🌈 Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #1c76d0 0%, #1559a5 35%, #0a3a80 65%, #000b30 100%)",
        }}
      />

      {/* ✨ Light */}
      <div className="absolute top-0 left-0 w-[60%] h-[60%] bg-white/20 blur-3xl opacity-30" />

      {/* 🌑 Depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 py-12 gap-10">

        {/* LEFT */}
        <div className="w-full lg:w-[52%] text-white space-y-6 text-center lg:text-left">
          <h1 className="hero-title-layout">

  {/* LEFT TEXT */}
  <div className="hero-title-layout">

  <h1 className="hero-title text-center lg:text-left">

  <div className="line first-line">
    <span>INDIA’S</span>

    <span className="no-gloss">
      NO.1
    </span>
  </div>

  <div className="line">
    LEADING TRAINING
  </div>

  <div className="line">
    INSTITUTE
  </div>

</h1>

</div>
</h1>
          <div className="flex gap-4 justify-center lg:justify-start flex-wrap">
            <button className="bg-white text-black px-6 py-3 font-semibold rounded-md hover:scale-105 transition">
              Careerschool Jobs
            </button>

            <button className="bg-[#ffd02b] text-black px-6 py-3 font-semibold rounded-md hover:scale-105 transition">
              Careerschool Courses
            </button>
          </div>
        </div>

        {/* RIGHT - BADGE GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 w-full lg:w-1/2 place-items-center">

          {[...Array(11)].map((_, index) => {
            const student = students[index % students.length];

            return (
              <a
                key={index}
                href={student.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group flex flex-col items-center"
              >

                {/* Badge */}
                <div className="relative w-[100px] sm:w-[120px] h-[130px] sm:h-[150px] animate-float">

                  {/* Badge Image */}
                  <Image
                    src="/badge.png"
                    alt="badge"
                    fill
                    className="object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)] 
                               transition duration-300 group-hover:scale-110"
                  />

                  {/* 🎯 AUTO CALIBRATED PERFECT FIT */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

  {/* 🎯 EXACT FIT USING MASK */}
  <div
    className="relative w-[68%] aspect-square -translate-y-[6%]"
    style={{
      WebkitMaskImage: "url('/badge.png')",
      WebkitMaskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      WebkitMaskSize: "contain",
      maskImage: "url('/badge.png')",
      maskRepeat: "no-repeat",
      maskPosition: "center",
      maskSize: "contain",
    }}
  >
    <Image
      src={student.image}
      alt={student.name}
      fill
      className="object-cover"
    />
  </div>

</div>
{/* 🔴 NAME IN RIBBON (INSIDE CENTER — FINAL) */}
<div
  className={`
    absolute
    left-1/2
    bottom-[4%]   /* 🔥 push INTO ribbon (key fix) */

    -translate-x-1/2

    w-[70%]
    h-[24px] sm:h-[28px]   /* ribbon thickness */

    flex
    items-center
    justify-center

    pointer-events-none
  `}
>
  <span
    className={`
      text-[10px] sm:text-xs
      font-bold
      text-white
      tracking-wide
      leading-none

      whitespace-nowrap

      drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]
    `}
  >
    {student.name}
  </span>
</div>

                </div>

              </a>
            );
          })}

        </div>
      </div>

      {/* FLOAT ANIMATION */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

    </section>
  );
}