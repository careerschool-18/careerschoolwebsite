"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ WhatsApp links
  const hireStudentsLink = "https://wa.me/7305014818";
  const contactLink = "https://wa.me/7708938866";

  // ✅ Smooth scroll to sections
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow relative">
      {/* 🔹 Left: Logo */}
      <div className="flex-shrink-0">
        <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
      </div>

      {/* 🔹 Center: Menu (Desktop) */}
      <nav className="hidden md:flex items-center gap-3 ml-auto mr-4">
        {/* Courses */}
        <button
          onClick={() => scrollToSection("courses")}
          className="bg-blue-100 text-blue-700 px-4 py-2 rounded font-semibold text-sm hover:bg-blue-200 transition"
        >
          Courses
        </button>

        {/* Placement */}
        <button
          onClick={() => scrollToSection("meet-our-stars")}
          className="bg-blue-100 text-blue-700 px-4 py-2 rounded font-semibold text-sm hover:bg-blue-200 transition"
        >
          Placement
        </button>

        {/* Hire Students */}
        <a
          href={hireStudentsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-100 text-blue-700 px-4 py-2 rounded font-semibold text-sm hover:bg-blue-200 transition"
        >
          Hire Students
        </a>
      </nav>

      {/* 🔹 Right: Contact Button (Desktop) */}
      <div className="hidden md:block">
        <a
          href={contactLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-blue-600 text-white px-5 py-2 rounded font-semibold text-sm hover:bg-blue-700 transition">
            Contact Us
          </button>
        </a>
      </div>

      {/* 🔹 Mobile Menu Toggle */}
      <button
        className="md:hidden text-gray-800 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* 🔹 Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-6 md:hidden z-50">
          {/* Courses */}
          <button
            onClick={() => {
              scrollToSection("courses");
              setMenuOpen(false);
            }}
            className="bg-blue-100 text-blue-700 px-6 py-2 rounded font-semibold text-sm hover:bg-blue-200 transition"
          >
            Courses
          </button>

          {/* Placement */}
          <button
            onClick={() => {
              scrollToSection("meet-our-stars");
              setMenuOpen(false);
            }}
            className="bg-blue-100 text-blue-700 px-6 py-2 rounded font-semibold text-sm hover:bg-blue-200 transition"
          >
            Placement
          </button>

          {/* Hire Students */}
          <a
            href={hireStudentsLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="bg-blue-100 text-blue-700 px-6 py-2 rounded font-semibold text-sm hover:bg-blue-200 transition"
          >
            Hire Students
          </a>

          {/* Contact */}
          <a
            href={contactLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            <button className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700 transition">
              Contact Us
            </button>
          </a>
        </div>
      )}
    </header>
  );
}