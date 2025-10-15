"use client";
import { useState } from "react";

export default function StudentsReview() {
  const [selectedReview, setSelectedReview] = useState(null);

  const reviews = [
    { id: 1, name: "Velmurugan Vignesh", training: "Data Analytics", review: "Excellent Data Analytics training and placement support! Helped me start my IT career confidently.", photo: "/sarathi pic.jpeg" },
    { id: 2, name: "Pavithra S", training: "Python with AI", review: "Great learning experience! The sessions were simple and clear. I got placed successfully as a Software Trainee.", photo: "/pavi pic.jpeg" },
    { id: 3, name: "Subha Vadivu Lakshmi", training: "HR Training", review: "Hands-on HR training helped me gain real-world skills in recruitment. It built my confidence and career path.", photo: "/pavi pic.jpeg" },
    { id: 4, name: "Rajiya", training: "Data Analytics", review: "After a long career gap, I restarted my career with Careerschool’s amazing IT training and placement support.", photo: "/sarathi pic.jpeg" },
    { id: 5, name: "Karthik", training: "Full Stack Development", review: "Practical sessions and live projects helped me master full stack development quickly and efficiently.", photo: "/sarathi pic.jpeg" },
    { id: 6, name: "Monika", training: "Digital Marketing", review: "Learned SEO, Ads, and campaign setup with real examples. The mentors were super supportive and skilled.", photo: "/pavi pic.jpeg" },
    { id: 7, name: "Saranya", training: "Python Programming", review: "Clear and interactive sessions improved my coding skills. I now feel confident attending interviews.", photo: "/pavi pic.jpeg" },
    { id: 8, name: "Aravind", training: "Data Science", review: "Covered Power BI, Python, and ML basics. Excellent structure and guidance throughout the course.", photo: "/sarathi pic.jpeg" },
    { id: 9, name: "Nivetha", training: "UI/UX Design", review: "Creative training sessions helped me design real projects and build a portfolio for my career.", photo: "/pavi pic.jpeg" },
    { id: 10, name: "Vignesh", training: "Software Testing", review: "Manual and automation testing were explained clearly. Helpful for placement preparation.", photo: "/sarathi pic.jpeg" },
    { id: 11, name: "Deepika", training: "Frontend Development", review: "React and Tailwind sessions were practical. I created my own frontend projects confidently.", photo: "/pavi pic.jpeg" },
    { id: 12, name: "Manoj Kumar", training: "Cloud Computing", review: "Good exposure to AWS and cloud fundamentals with live practice sessions and excellent trainer support.", photo: "/sarathi pic.jpeg" },
    { id: 13, name: "Priya", training: "Graphic Design", review: "Covered Photoshop and Illustrator basics perfectly. The practical assignments were very helpful.", photo: "/pavi pic.jpeg" },
    { id: 14, name: "Sathish", training: "Java Full Stack", review: "Java Full Stack sessions were clear and project-oriented. The placement guidance was strong.", photo: "/sarathi pic.jpeg" },
    { id: 15, name: "Harini", training: "Artificial Intelligence", review: "AI training included real examples and ML concepts. It made complex topics easy to understand.", photo: "/pavi pic.jpeg" },
  ];

  return (
    <section className="py-10 bg-white text-center overflow-hidden px-6 relative">
      <h2 className="text-2xl font-extrabold mb-8 text-gray-900">
        Hear It From Our Learners
      </h2>

      {/* 🔹 5 Columns × 3 Rows Grid */}
      <div className="grid grid-cols-5 gap-5 max-w-full mx-auto justify-center">
        {reviews.map((student) => (
          <div
            key={student.id}
            onClick={() => setSelectedReview(student)}
            className="bg-blue-700 text-white p-6 rounded-xl flex flex-col items-center gap-3 cursor-pointer hover:scale-[1.05] transition-transform duration-300 shadow-lg"
            style={{ width: "230px", height: "230px" }} // 🔹 Reduced height
          >
            <img
              src={student.photo}
              alt={student.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md"
            />
            <h3 className="font-semibold text-[16px] truncate w-full text-center">
              {student.name}
            </h3>
            <p className="text-[13px] opacity-95 truncate w-full text-center">
              {student.training}
            </p>
            <div className="flex text-yellow-400 justify-center mt-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[12px]">★</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Modal Popup */}
      {selectedReview && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 px-4">
          <div className="bg-white text-gray-800 rounded-xl shadow-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setSelectedReview(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-lg"
            >
              ✖
            </button>

            <div className="flex items-center mb-4 gap-3">
              <img
                src={selectedReview.photo}
                alt={selectedReview.name}
                className="w-14 h-14 rounded-full object-cover border border-gray-300"
              />
              <div>
                <h3 className="font-bold text-base">{selectedReview.name}</h3>
                <p className="text-sm text-gray-600">{selectedReview.training}</p>
              </div>
            </div>

            <p className="text-[15px] leading-relaxed">{selectedReview.review}</p>
          </div>
        </div>
      )}
    </section>
  );
}
