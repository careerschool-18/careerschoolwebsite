import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow relative">
      {/* 🔹 Left: Logo */}
      <div className="flex-shrink-0">
        <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
      </div>

      {/* 🔹 Center: Menu (Desktop) */}
      <nav className="hidden md:flex items-center gap-3 ml-auto mr-4">
        {["Courses", "Placement", "Services", "Hire Students"].map((item) => (
          <a
            key={item}
            href="#"
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded font-semibold text-sm hover:bg-blue-200 transition"
          >
            {item}
          </a>
        ))}
      </nav>

      {/* 🔹 Right: Contact Button (Desktop) */}
      <div className="hidden md:block">
        <button className="bg-blue-600 text-white px-5 py-2 rounded font-semibold text-sm hover:bg-blue-700 transition">
          Contact Us
        </button>
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
          {["Courses", "Placement", "Services", "Hire Students"].map((item) => (
            <a
              key={item}
              href="#"
              className="bg-blue-100 text-blue-700 px-6 py-2 rounded font-semibold text-sm hover:bg-blue-200 transition"
            >
              {item}
            </a>
          ))}
          <button className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700 transition">
            Contact Us
          </button>
        </div>
      )}
    </header>
  );
}
