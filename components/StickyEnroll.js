import { useState, useEffect } from "react";

export default function StickyEnroll() {
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const formSection = document.getElementById("enroll");

      if (!formSection) return;

      const rect = formSection.getBoundingClientRect();

      // hide when form is visible
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setShowButton(false);
      } else {
        setShowButton(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToEnroll = () => {
    const section = document.getElementById("enroll");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 w-full z-50 sm:hidden transition-all duration-300 ${
        showButton ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-white border-t shadow-lg p-3">
        <button
          onClick={scrollToEnroll}
          className="
          w-full
          px-6 py-4
          text-lg
          font-semibold
          text-white
          rounded-md
          bg-gradient-to-r from-blue-600 to-indigo-600
          shadow-md
          hover:bg-indigo-700
          transition
          "
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
}