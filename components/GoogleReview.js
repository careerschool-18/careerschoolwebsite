"use client";
import { useEffect, useState } from "react";

export default function ShowcaseSection() {
  const words = ["STUDENTS", "COLLEGES", "CLIENTS", "PROFESSIONALS"];
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

  // 🖼 Slides
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

  // ⏱ Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="w-full flex flex-col items-center justify-start text-center overflow-hidden bg-white">
      {/* 🔹 Top Text */}
      <div className="py-8 px-3 sm:py-10 sm:px-6 z-10 relative bg-white">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 leading-snug">
          TRUSTED BY{" "}
          <span className="text-blue-600 font-extrabold">1,000+</span>{" "}
          <br className="block sm:hidden" />
          <span className="bg-yellow-400 px-2 sm:px-4 py-1 rounded font-extrabold text-gray-900 inline-block mt-2 sm:mt-0">
            {text}
            <span className="animate-pulse">|</span>
          </span>
        </h2>
      </div>

      {/* 🔹 Image Rotating Slider */}
      <div className="relative w-full h-[50vh] sm:h-[70vh] md:h-[90vh] overflow-hidden bg-gray-100 flex items-center justify-center">
        {slides.map((slide, i) => (
          <a
            key={i}
            href={slide.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute w-full h-full flex items-center justify-center transition-opacity duration-[1200ms] ease-in-out ${
              current === i ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover brightness-105 transition-transform duration-700 hover:scale-105"
            />
          </a>
        ))}

        {/* 🔸 Dots Indicator */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-300 ${
                current === i ? "bg-blue-600" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}