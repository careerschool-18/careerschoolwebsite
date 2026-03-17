"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const hireStudentsLink = "https://wa.me/7305014818";
  const contactLink = "https://wa.me/7708938866";
  const takeTestFormLink = "/online-assessment";

  // Scroll behavior (only for header hide/show)
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      setScrolled(currentY > 10);

      if (window.innerWidth >= 768) {
        if (currentY > lastScrollY && currentY > 120) {
          setShowHeader(false);
        } else {
          setShowHeader(true);
        }
      }

      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`
        w-full sticky top-0 z-50
        transition-all duration-500
        ${scrolled ? "bg-white/80 backdrop-blur-xl shadow-md" : "bg-white"}
        ${showHeader ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

        {/* LOGO SECTION */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => router.push("/")}
        >

          {/* CSHR */}
          <img
            src="/Nav Logo/CSHR - Nav Logo.png"
            className="h-7 sm:h-9 md:h-10 object-contain"
          />

          {/* Divider */}
          <div className="h-6 w-[1px] bg-gray-300"></div>

          {/* CSIT */}
          <img
            src="/Nav Logo/CSIT - Nav Logo.png"
            className="h-7 sm:h-9 md:h-10 object-contain"
          />

          {/* Divider */}
          <div className="h-6 w-[1px] bg-gray-300"></div>

          {/* ZOHO (with label below) */}
          <div className="flex flex-col items-center">
            <img
              src="/Zoho Images/ZOHO LOGO - Zoho Card.png"
              className="h-6 sm:h-7 md:h-8 object-contain"
            />
          </div>

        </div>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-3 ml-auto mr-4">
          <button
            onClick={() => scrollToSection("courses")}
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded font-semibold text-sm"
          >
            Courses
          </button>

          <button
            onClick={() => scrollToSection("meet-our-stars")}
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded font-semibold text-sm"
          >
            Success Story
          </button>

          <a href={takeTestFormLink}>
            <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded font-semibold text-sm">
              Take Test
            </button>
          </a>

          <a href={hireStudentsLink}>
            <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded font-semibold text-sm">
              Hire Students
            </button>
          </a>
        </nav>

        {/* CONTACT */}
        <div className="hidden md:block">
          <a href={contactLink}>
            <button className="bg-blue-600 text-white px-5 py-2 rounded font-semibold text-sm hover:scale-105 transition">
              Contact Us
            </button>
          </a>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md flex flex-col items-center gap-4 py-6">

          <span className="text-xs text-gray-500">
            Powered by Zoho
          </span>

          <button onClick={() => scrollToSection("courses")} className="bg-blue-100 px-6 py-2 rounded">
            Courses
          </button>

          <button onClick={() => scrollToSection("meet-our-stars")} className="bg-blue-100 px-6 py-2 rounded">
            Success Story
          </button>

          <a href={takeTestFormLink}>
            <button className="bg-blue-100 px-6 py-2 rounded">
              Take Test
            </button>
          </a>

          <a href={hireStudentsLink}>
            <button className="bg-blue-100 px-6 py-2 rounded">
              Hire Students
            </button>
          </a>

          <a href={contactLink}>
            <button className="bg-blue-600 text-white px-6 py-2 rounded font-bold">
              Contact Us
            </button>
          </a>
        </div>
      )}
    </header>
  );
}