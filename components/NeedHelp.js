"use client";
import { useState } from "react";

export default function NeedHelp() {
  // ✅ 6 Python Questions and Answers
  const faqs = [
    {
      q: " What are the best placement-oriented training courses after graduation?",
      a: "At Careerschool HR & IT Solutions, we offer top-rated career programs like Python Full Stack, Data Analytics, HR Analytics, Digital Marketing, and Java Training with internship and placement support.",
    },
    {
      q: " Does Careerschool provide placement assistance after completing the training?",
      a: "Yes! Every training program at Careerschool includes pre-placement and post-placement support — covering interview preparation, resume building, aptitude sessions, and company tie-ups to help you get hired faster.",
    },
    {
      q: "Why should I choose Careerschool HR & IT Solutions for training and placement?",
      a: "Careerschool stands out for its industry-ready curriculum, live tools exposure, certified trainers, internships, and placement tie-ups with leading companies. With branches in Guindy (Chennai) and Nellore (Andhra Pradesh), we’re helping learners across allover India launch their dream careers.",
    },
    {
      q: "Who can enroll in Careerschool training & internship programs?",
      a: "Our programs are open to college students, fresh graduates (freshers), and working professionals who want to start or switch careers in IT, HR, or Analytics domains. No prior technical background is required — our courses are beginner-friendly and skill-based.",
    },
    {
      q: "Do you have any free courses or demo training programs?",
      a: "Yes, Careerschool provides free demo training sessions and career guidance workshops for students, freshers, and professionals. These sessions cover the basics and helps learners choose the right course for their career goals.",
    },
    {
      q: "Do you have courses in Chennai and Nellore only?",
      a: "Careerschool currently has training centers in Guindy, Chennai and Nellore, Andhra Pradesh, where we conduct offline sessions with internship and placement support. However, we also offer LIVE online classes with the same benefits that can be accessed from anywhere in India. So, whether you’re in Chennai, Nellore, or another city, you can still join our programs and learn from our expert trainers.",
    },
  ];

  // ✅ State to track which question is open
  const [openIndex, setOpenIndex] = useState(null);

  // ✅ Toggle open/close on click
  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-16 bg-blue-800 text-center px-4 sm:px-6">
      {/* 🔹 Heading */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-white">
        Need Help
      </h2>

      {/* 🔹 FAQ Boxes */}
      <div className="max-w-3xl mx-auto flex flex-col items-center space-y-4 sm:space-y-6">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="w-full rounded-xl shadow-md overflow-hidden bg-gradient-to-r from-white via-yellow-200 to-yellow-400 transition-transform duration-300 hover:scale-[1.02]"
          >
            {/* 🔸 Question */}
            <button
              onClick={() => toggleAnswer(i)}
              className="w-full text-left px-5 py-4 text-gray-800 font-semibold text-base sm:text-lg flex justify-between items-center"
            >
              {faq.q}
              <span className="text-gray-700 font-bold text-xl">
                {openIndex === i ? "−" : "+"}
              </span>
            </button>

            {/* 🔸 Answer */}
            {openIndex === i && (
              <div className="bg-white text-gray-800 text-sm sm:text-base px-5 py-4 border-t border-yellow-400">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}