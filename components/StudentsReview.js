"use client";
import { useState } from "react";

export default function StudentsReview() {
  const [selectedReview, setSelectedReview] = useState(null);
  const [showAllMobile, setShowAllMobile] = useState(false); // 👈 For "See More" toggle in mobile

  const reviews = [
    { id: 1, name: "Velmurugan Vignesh", training: "DATA ANALYTICS", review: "I’m truly grateful to Careerschool for providing excellent Data Analytics Training and Placement support. Coming from a non-IT background, I was unsure how to start my career in IT field, but their training and internship program gave me the right guidance and hands-on experience to confidently begin my journey as a Data Analyst. Thanks to their continuous support, I was able to secure a job and build my career in the IT domain. I highly recommend Careerschool to anyone looking for career-oriented Online & Offline Training or internships in Data Analytics or other software programs.", photo: "/Student Review Images/Velmurugan.png" },
    { id: 2, name: "Pavithra S", training: "PYTHON WITH AI", review: "I recently completed my Python with AI training at Careerschool, and it was an amazing learning experience. The Offline sessions in Chennai were clear, practical, and easy to understand, which helped me build strong technical knowledge and confidence. With the effective placement support and guidance from the team, I successfully got placed as a Software Trainee. I highly recommend Careerschool HR Solutions to anyone who wants to start a successful career in IT.", photo: "/Student Review Images/Pavithra img.jpg" },
    { id: 3, name: "Subha Vadivu Lakshmi", training: "HR TRAINING", review: "I’m delighted to share that I’ve been placed as an HR Recruiter, and I’m truly thankful to Careerschool for this wonderful opportunity. The HR training and internship program helped me gain practical knowledge of key HR functions such as recruitment, college visits, and candidate interviews. It was an unforgettable experience that shaped my confidence and skills. I’m really happy to be moving closer to my dream career at such an early stage.", photo: "/Student Review Images/Subha Vadivu Lakshmi.png" },
    { id: 4, name: "Rajiya", training: "DATA ANALYTICS", review: "I’m Rajiya, and I recently completed my IT training in Nellore at Careerschool IT Solutions. Even after a 5-year career gap, I was able to secure a job in an IT company thanks to their excellent training, mentorship, and placement guidance. For students and job seekers in and around Nellore, I highly recommend Careerschool IT Solutions — it’s the best place to upgrade your skills and restart your career in IT.", photo: "/Student Review Images/Rajiya.png" },
    { id: 5, name: "Malathi", training: "DATA ANALYTICS", review: "I completed a Data Analytics course from Careerschool HR Solutions. Good experience of training and placement sessions. The whole team gave full support and guidance for interviews. This is a good platform to start your career. Thank you...", photo: "/Student Review Images/Malathi.png" },
    { id: 6, name: "Ranjith", training: "DATA ANALYTICS", review: "First of all, special thanks to my great teacher Karthick Sir, my moral supporter Kathiya Ma'am, and my king maker Brindha Ma'am. I have 7+ years of experience in backend operations but lacked updated skills. When I joined Careerschool for Data Analytics, the training completely changed my confidence and career direction. Thanks to Careerschool, I now feel skilled and appreciated in my workplace!", photo: "/Student Review Images/Ranjith.png" },
    { id: 7, name: "Afsal Ahamed", training: "HR TRAINING", review: "I am incredibly grateful to Careerschool HR Solutions for the invaluable guidance and support during my HR internship. A special thanks to Brindha Ma'am for her mentorship and encouragement. I’m thrilled to share that I’ve been placed as an HRBP — this achievement wouldn’t have been possible without the Careerschool team.", photo: "/Student Review Images/Afsal Ahamed.png" },
    { id: 8, name: "Shyam Ganesh Prasad", training: "HR TRAINING", review: "I joined Careerschool 4 months ago as an HR intern. The staff and mentors were very supportive, especially Keerthana Ma'am, Brintha Ma'am, and Roshini Ma'am. I’m now placed as an HR Recruiter in a reputed company. Thanks to Careerschool HR Solutions!", photo: "/Student Review Images/Shyam Ganesh Prasad.png" },
    { id: 9, name: "Manav Magesh", training: "DATA ANALYTICS", review: "I joined Careerschool HR Solutions to pursue Data Analytics, and it completely changed me. The training was excellent — Karthick Sir explains every concept clearly and gives interview tips. Kathya Ma’am encouraged me in both technical and soft skills. Now I’m placed and confident — highly recommended!", photo: "/Student Review Images/Manav.png" },
    { id: 10, name: "Bhuvaneshwaran", training: "DATA ANALYTICS", review: "I completed the Data Analytics course at Careerschool. The sessions covered Advanced Excel, SQL, and Power BI with real-time examples. The HR team also provided strong resume and interview guidance.", photo: "/Student Review Images/Bhuwaneswar.png" },
    { id: 11, name: "Saikumar Mallarapu", training: "FRONTEND DEVELOPMENT", review: "Hi, I’m Sai Kumar from Nellore. I attended the Careerschool Campus Drive and got selected as a Software Trainee. Great place to learn Python, Java Full Stack, AI, and Data Analytics with placement assistance.", photo: "/Student Review Images/Saikumar.png" },
    { id: 12, name: "Manoj Kumar", training: "CLOUD COMPUTING", review: "Good exposure to AWS and cloud fundamentals with live practice sessions and excellent trainer support.", photo: "/sarathi pic.jpeg" },
    { id: 13, name: "Priya", training: "GRAPHIC DESIGN", review: "Covered Photoshop and Illustrator basics perfectly. The practical assignments were very helpful.", photo: "/Student Review Images/Pavithra img.jpg" },
    { id: 14, name: "Sathish", training: "JAVA FULL STACK", review: "Java Full Stack sessions were clear and project-oriented. The placement guidance was strong.", photo: "/sarathi pic.jpeg" },
    { id: 15, name: "Harini", training: "ARTIFICIAL INTELLIGENCE", review: "I completed the Data Analytics course at Careerschool HR Solutions. The training mainly covered Advanced Excel, SQL, and Power BI. The teaching was clear and practical.", photo: "/Student Review Images/Pavithra img.jpg" },
  ];

  // ✅ Show only 5 reviews in mobile view unless "See More" is clicked
  const visibleReviews =
    typeof window !== "undefined" && window.innerWidth < 640 && !showAllMobile
      ? reviews.slice(0, 5)
      : reviews;

  return (
    <section className="py-10 bg-white text-center overflow-hidden px-4 sm:px-6 relative">
      <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-8 text-[#004AAD]">
        Hear It From Our Learners
      </h2>

      {/* 🔹 Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 justify-center">
        {visibleReviews.map((student) => (
          <div
            key={student.id}
            className="bg-blue-700 text-white p-4 sm:p-6 rounded-xl flex flex-col items-center gap-3 shadow-lg w-full"
          >
            <img
              src={student.photo}
              alt={student.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-white shadow-md"
            />
            <h3 className="font-semibold text-[14px] sm:text-[16px] truncate w-full text-center">
              {student.name}
            </h3>
            <p className="text-[12px] sm:text-[13px] opacity-95 text-yellow-300 font-semibold truncate w-full text-center">
              {student.training}
            </p>

            <button
              onClick={() => setSelectedReview(student)}
              className="mt-2 bg-yellow-400 text-blue-900 font-semibold text-[12px] sm:text-[13px] px-3 py-1 rounded-lg hover:bg-yellow-300 transition"
            >
              Read Review
            </button>
          </div>
        ))}
      </div>

      {/* 🔹 See More Button (only on mobile view) */}
      <div className="mt-6 sm:hidden">
        {!showAllMobile ? (
          <button
            onClick={() => setShowAllMobile(true)}
            className="bg-blue-700 text-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-blue-800 transition"
          >
            See More
          </button>
        ) : (
          <button
            onClick={() => setShowAllMobile(false)}
            className="bg-gray-300 text-gray-800 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            See Less
          </button>
        )}
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

            {/* 🔹 Profile Section */}
            <div className="flex items-center mb-4 gap-3">
              <img
                src={selectedReview.photo}
                alt={selectedReview.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border border-gray-300"
              />
              <div>
                <h3 className="font-bold text-base sm:text-lg text-left">
                  {selectedReview.name}
                </h3>
                <p className="text-sm sm:text-base text-yellow-500 font-semibold text-left">
                  {selectedReview.training}
                </p>
              </div>
            </div>

            <p className="text-[13px] sm:text-[15px] leading-relaxed text-justify">
              {selectedReview.review}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}