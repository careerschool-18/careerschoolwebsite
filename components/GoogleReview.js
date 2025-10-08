"use client";
import { useEffect, useState } from "react";

export default function ShowcaseSection() {
  const words = ["STUDENTS", "TRAINING", "PLACEMENT"];
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [step, setStep] = useState(0); // 0 = Google Reviews, 1 = Instagram

  // 🎬 Typewriter Effect (CareerSchool style)
  useEffect(() => {
    if (step !== 0) return; // stop typing when Instagram is visible

    const current = words[index];
    const speed = isDeleting ? 80 : 120;

    const typingEffect = setTimeout(() => {
      if (!isDeleting) {
        setText(current.substring(0, text.length + 1));
        if (text === current) {
          setTimeout(() => setIsDeleting(true), 1000); // pause before deleting
        }
      } else {
        setText(current.substring(0, text.length - 1));
        if (text === "") {
          setIsDeleting(false);
          if (index + 1 === words.length) {
            // ✅ After finishing all words, switch to Instagram
            setTimeout(() => setStep(1), 1000);
          } else {
            setIndex((prev) => prev + 1);
          }
        }
      }
    }, speed);

    return () => clearTimeout(typingEffect);
  }, [text, isDeleting, index, step]);

  // 🔁 Auto return from Instagram to Google after few seconds
  useEffect(() => {
    if (step === 1) {
      const timer = setTimeout(() => {
        // Reset everything to start again
        setText("");
        setIndex(0);
        setIsDeleting(false);
        setStep(0);
      }, 5000); // Instagram visible for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <section className="relative w-full h-[100vh] overflow-hidden bg-white flex items-center justify-center">
      {/* 🔹 GOOGLE REVIEWS SECTION */}
      <div
        className={`absolute inset-0 flex flex-col justify-center items-center text-center bg-white px-4 transition-opacity duration-1000 ${
          step === 0 ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
      >
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700">
          Learners’ Career Transitions
        </h3>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 text-gray-900">
          TRUSTED BY 1,000+{" "}
          <span className="bg-yellow-400 px-4 py-1 rounded font-extrabold text-gray-900">
            {text}
            <span className="animate-pulse">|</span>
          </span>
        </h2>

        {/* ⭐ Google Reviews */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 items-center gap-8 max-w-5xl mx-auto">
          <div className="flex flex-col items-center">
            <img
              src="/google.jpeg"
              alt="Google Logo"
              className="w-16 h-16 sm:w-20 sm:h-20"
            />
            <p className="mt-2 text-lg font-semibold text-blue-600">
              500+ REVIEWS
            </p>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-7xl font-extrabold text-blue-700">4.9</span>
            <div className="flex mt-2">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <span key={i} className="text-yellow-400 text-3xl">
                    ★
                  </span>
                ))}
            </div>
          </div>

          <div className="flex justify-center">
            <a
              href="https://www.google.com/search?q=Career+School+HR+Solutions+Reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-blue-800"
            >
              Take Me To Google Reviews
            </a>
          </div>
        </div>
      </div>

      {/* 🔹 INSTAGRAM SECTION */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center bg-pink-50 text-center px-4 transition-opacity duration-1000 ${
          step === 1 ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">
          Follow Us on Instagram
        </h2>
        <a
          href="https://www.instagram.com/careerschoolhrsolutions?igsh=MWEyc3RsZTZhMW15eg=="
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/cshr.png"
            alt="Instagram Profile"
            className="w-72 h-72 sm:w-96 sm:h-96 object-cover rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500"
          />
        </a>
        <a
          href="https://www.instagram.com/careerschoolhrsolutions?igsh=MWEyc3RsZTZhMW15eg=="
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 transition"
        >
          Visit Our Instagram →
        </a>
      </div>
    </section>
  );
}
