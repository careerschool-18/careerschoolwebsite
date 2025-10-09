"use client";
import { useEffect, useState } from "react";

export default function ShowcaseSection() {
  const words = ["STUDENTS", "TRAINING", "PLACEMENT"];
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // 🎬 Typewriter Effect
  useEffect(() => {
    const current = words[index];
    const speed = isDeleting ? 80 : 120;

    const typingEffect = setTimeout(() => {
      if (!isDeleting) {
        setText(current.substring(0, text.length + 1));
        if (text === current) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        setText(current.substring(0, text.length - 1));
        if (text === "") {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(typingEffect);
  }, [text, isDeleting, index]);

  // 🖼️ Slides
  const slides = [
    {
      src: "/Website - Social Media Banner (Google).png",
      link: "https://www.google.com/search?q=Career+School+HR+Solutions+Reviews",
      alt: "Google Reviews",
    },
    {
      src: "/Website - Social Media Banner (LinkedIn).png",
      link: "https://www.linkedin.com/company/careerschool-hr-solutions/",
      alt: "LinkedIn Page",
    },
    {
      src: "/Website - Social Media Banner (Instagram).png",
      link: "https://www.instagram.com/careerschoolhrsolutions",
      alt: "Instagram Page",
    },
  ];

  const [current, setCurrent] = useState(0);

  // ⏱️ Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="w-full flex flex-col items-center justify-start text-center overflow-hidden bg-white">
      {/* 🔹 Top Text */}
      <div className="py-10 px-4 z-10 relative bg-white">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
          Learners’ Career Transitions
        </h3>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
          TRUSTED BY 1,000+{" "}
          <span className="bg-yellow-400 px-4 py-1 rounded font-extrabold text-gray-900">
            {text}
            <span className="animate-pulse">|</span>
          </span>
        </h2>
      </div>

      {/* 🔹 Full Image Slider */}
      <div className="relative w-full h-[90vh] overflow-hidden bg-gray-100 flex items-center justify-center">
        {/* Slider Container */}
        <div
          className="flex transition-transform duration-[1000ms] ease-in-out"
          style={{
            transform: `translateX(-${current * 100}%)`,
            width: `${slides.length * 100}%`,
          }}
        >
          {slides.map((slide, i) => (
            <a
              key={i}
              href={slide.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-[90vh] flex-shrink-0 flex items-center justify-center bg-white"
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="max-w-[95%] max-h-[85vh] object-contain rounded-2xl shadow-lg"
              />
            </a>
          ))}
        </div>

        {/* 🔸 Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                current === i ? "bg-blue-600" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
