import { useState } from "react";
import { Menu, X } from "lucide-react"; // ✅ icons for toggle

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-4 bg-[#ffffff] shadow relative">
      {/* 🔹 Left: Logo */}
      <div className="flex-shrink-0">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-12 w-auto" // Logo fixed size, no animation
        />
      </div>

      {/* 🔹 Center: Menu (Desktop) */}
      <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
        <a href="#" className="hover:text-blue-600">HOME</a>
        <a href="#" className="hover:text-blue-600">COURSES</a>
        <a href="#" className="hover:text-blue-600">ABOUT</a>
        <a href="#" className="hover:text-blue-600">CONTACT</a>
      </nav>

      {/* 🔹 Right: Contact Button (Desktop) */}
      <div className="hidden md:block">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition">
          CONTACT
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
          <a href="#" className="text-gray-700 font-medium hover:text-blue-600">MENU</a>
          <a href="#" className="text-gray-700 font-medium hover:text-blue-600">MENU</a>
          <a href="#" className="text-gray-700 font-medium hover:text-blue-600">MENU</a>
          <a href="#" className="text-gray-700 font-medium hover:text-blue-600">MENU</a>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition">
            CONTACT
          </button>
        </div>
      )}
    </header>
  );
}
