"use client";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation"; // ✅ For navigation

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [testMenuOpen, setTestMenuOpen] = useState(false);
  const [highlightArrow, setHighlightArrow] = useState(false); // ✅ Arrow bold effect

  // ✅ WhatsApp links
  const hireStudentsLink = "https://wa.me/7305014818";
  const contactLink = "https://wa.me/7708938866";

  // ✅ Take Test links
  const testLinks = {
    python: "https://forms.gle/BP4RJkwow1aCz4s16",
    webdev: "https://forms.gle/GEcM5bv9EU7nVMMg6",
    java: "https://forms.gle/7o4o88vi2zWQdBPd9",
    aptitude: "https://forms.gle/yGwM9nvTKtY6C2Jo7",
    dataAnalytics: "https://forms.gle/vESjkjjdgf7rEB977",
  };

  // ✅ Smooth scroll
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ When logo clicked
  const handleLogoClick = () => {
    router.push("/"); // navigate to homepage
    setHighlightArrow(true); // highlight arrow
    setTimeout(() => setHighlightArrow(false), 2000); // remove highlight after 2s
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow relative">
      {/* 🔹 Clickable Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={handleLogoClick}
      >
        <img
          src="/Footer Logo/New CSHR Logo (TM).png"
          alt="Logo"
          className="h-10 w-auto transition-transform hover:scale-105"
        />
      </div>

      {/* 🔹 Center: Menu (Desktop) */}
      <nav className="hidden md:flex items-center gap-3 ml-auto mr-4 relative">
        <button
          onClick={() => scrollToSection("courses")}
          className="bg-blue-100 text-blue-700 px-4 py-2 rounded font-semibold text-sm hover:bg-blue-200 transition"
        >
          Courses
        </button>

        <button
          onClick={() => scrollToSection("meet-our-stars")}
          className="bg-blue-100 text-blue-700 px-4 py-2 rounded font-semibold text-sm hover:bg-blue-200 transition"
        >
          Success Story
        </button>

        {/* 🔹 Take Test Dropdown */}
        <div className="relative group">
          <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded font-semibold text-sm hover:bg-blue-200 transition flex items-center gap-1">
            Take Test{" "}
            <ChevronDown
              size={18}
              className={`transition-all ${
                highlightArrow
                  ? "text-blue-800 font-extrabold scale-125"
                  : "text-blue-700"
              }`}
            />
          </button>

          {/* Dropdown */}
          <div className="absolute hidden group-hover:flex flex-col bg-white shadow-md rounded mt-1 w-52 z-50">
            {Object.entries(testLinks).map(([key, link]) => (
              <a
                key={key}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
              >
                {key === "webdev"
                  ? "Web Development Test"
                  : key === "dataAnalytics"
                  ? "Data Analytics Test"
                  : `${key.charAt(0).toUpperCase() + key.slice(1)} Test`}
              </a>
            ))}
          </div>
        </div>

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

      {/* 🔹 Right: Contact Button */}
      <div className="hidden md:block">
        <a href={contactLink} target="_blank" rel="noopener noreferrer">
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

      {/* 🔹 Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-6 md:hidden z-50">
          <button
            onClick={() => {
              scrollToSection("courses");
              setMenuOpen(false);
            }}
            className="bg-blue-100 text-blue-700 px-6 py-2 rounded font-semibold text-sm hover:bg-blue-200 transition"
          >
            Courses
          </button>

          <button
            onClick={() => {
              scrollToSection("meet-our-stars");
              setMenuOpen(false);
            }}
            className="bg-blue-100 text-blue-700 px-6 py-2 rounded font-semibold text-sm hover:bg-blue-200 transition"
          >
            Success Story
          </button>

          {/* 🔹 Take Test (Expandable) */}
          <div className="w-full flex flex-col items-center">
            <button
              onClick={() => setTestMenuOpen(!testMenuOpen)}
              className={`bg-blue-100 text-blue-700 px-6 py-2 rounded font-semibold text-sm flex items-center gap-1 hover:bg-blue-200 transition ${
                highlightArrow ? "border-2 border-blue-600" : ""
              }`}
            >
              Take Test{" "}
              <ChevronDown
                size={16}
                className={`${
                  highlightArrow
                    ? "text-blue-800 font-extrabold scale-125"
                    : "text-blue-700"
                } transition-all`}
              />
            </button>

            {testMenuOpen && (
              <div className="flex flex-col mt-2 gap-2 text-center">
                {Object.entries(testLinks).map(([key, link]) => (
                  <a
                    key={key}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="text-blue-700 font-medium text-sm hover:underline"
                  >
                    {key === "webdev"
                      ? "Web Development Test"
                      : key === "dataAnalytics"
                      ? "Data Analytics Test"
                      : `${key.charAt(0).toUpperCase() + key.slice(1)} Test`}
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href={hireStudentsLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="bg-blue-100 text-blue-700 px-6 py-2 rounded font-semibold text-sm hover:bg-blue-200 transition"
          >
            Hire Students
          </a>

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
