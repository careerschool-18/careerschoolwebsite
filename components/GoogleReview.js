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

  // 🖥️ Desktop slides
  const desktopSlides = [
    {
      src: "/Social Media Banner image/Social Media Banners - Google (1).jpg",
      link: "https://www.google.com/search?q=Career+School+HR+Solutions+Reviews",
      alt: "Desktop Banner 1",
    },
    {
      src: "/Social Media Banner image/Social Media Banners - LinkedIn(1).jpg",
      link: "https://www.linkedin.com/company/careerschool-hr-solutions/",
      alt: "Desktop Banner 2",
    },
    {
      src: "/Social Media Banner image/Social Media Banners - Instagram(2).jpg",
      link: "https://www.instagram.com/careerschoolhrsolutions",
      alt: "Desktop Banner 3",
    },
  ];

  // 📱 Mobile slides
  const mobileSlides = [
    {
      src: "/Social Media Banner image/Mobile view image/SM Banner - Google (Mobile).jpg",
      link: "https://www.google.com/search?q=Career+School+HR+Solutions+Reviews",
      alt: "Mobile Banner 1",
    },
    {
      src: "/Social Media Banner image/Mobile view image/SM Banner - Linkedin (Mobile).jpg",
      link: "https://www.linkedin.com/company/careerschool-hr-solutions/",
      alt: "Mobile Banner 2",
    },
    {
      src:"/Social Media Banner image/Mobile view image/SM Banner - Insta (Mobile).jpg",
      link: "https://www.instagram.com/careerschoolhrsolutions",
      alt: "Mobile Banner 3",
    },
  ];

  // 🧭 Current Slide Index
  const [currentDesktop, setCurrentDesktop] = useState(0);
  const [currentMobile, setCurrentMobile] = useState(0);

  // ⏱ Auto-slide for Desktop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDesktop((prev) => (prev + 1) % desktopSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [desktopSlides.length]);

  // ⏱ Auto-slide for Mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMobile((prev) => (prev + 1) % mobileSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [mobileSlides.length]);

  return (
    <section className="relative w-full flex flex-col items-center justify-center overflow-hidden bg-white py-8">
      {/* 🔹 Typewriter Heading */}
      <div className="text-center mb-6 px-3">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
          TRUSTED BY{" "}
          <span className="text-blue-600 font-extrabold">1,000+</span>{" "}
          <br className="block sm:hidden" />
          <span className="bg-yellow-400 px-3 py-1 rounded font-extrabold text-gray-900 inline-block mt-2">
            {text}
            <span className="animate-pulse">|</span>
          </span>
        </h2>
      </div>

      {/* 🖥️ Desktop Carousel */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden items-center justify-center bg-white hidden sm:flex">
        {desktopSlides.map((slide, i) => (
          <a
            key={i}
            href={slide.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-[2000ms] ease-in-out ${
              currentDesktop === i ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-[100vw] h-auto max-h-full object-contain object-center"
            />
          </a>
        ))}

        {/* 🔸 Dots Indicator (Desktop) */}
        <div className="absolute bottom-10 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
          {desktopSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentDesktop(i)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                currentDesktop === i ? "bg-blue-600" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </div>

      {/* 📱 Mobile Carousel */}
      <div className="relative w-full h-[45vh] overflow-hidden flex items-center justify-center bg-white sm:hidden">
        {mobileSlides.map((slide, i) => (
          <a
            key={i}
            href={slide.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-[2000ms] ease-in-out ${
              currentMobile === i ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-auto object-contain object-center"
            />
          </a>
        ))}

        {/* 🔹 Dots Indicator (Mobile) */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {mobileSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentMobile(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                currentMobile === i ? "bg-blue-600" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
