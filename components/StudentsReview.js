"use client";
import { useState } from "react";

export default function StudentsReview() {
  const [selectedReview, setSelectedReview] = useState(null);

  const reviews = [
    { id: 1, name: "Velmurugan Vignesh", training: "Data Analytics", review: "I’m truly grateful to Careerschool for providing excellent Data Analytics Training and Placement support. Coming from a non-IT background, I was unsure how to start my career in IT field, but their training and internship program gave me the right guidance and hands-on experience to confidently begin my journey as a Data Analyst. Thanks to their continuous support, I was able to secure a job and build my career in the IT domain. I highly recommend Careerschool to anyone looking for career-oriented Online & Offline Training or internships in Data Analytics or other software programs.", photo: "/Velmurugan.png" },
    { id: 2, name: "Pavithra S", training: "Python with AI", review: "I recently completed my Python with AI training at Careerschool, and it was an amazing learning experience. The Offline sessions in chennai were clear, practical, and easy to understand, which helped me build strong technical knowledge and confidence. With the effective placement support and guidance from the team, I successfully got placed as a Software Trainee. I highly recommend Careerschool HR Solutions to anyone who wants to start a successful career in IT.", photo: "/pavi pic.jpeg" },
    { id: 3, name: "Subha Vadivu Lakshmi", training: "HR Training", review: "I’m delighted to share that I’ve been placed as an HR Recruiter, and I’m truly thankful to Careerschool for this wonderful opportunity. The HR training and internship program helped me gain practical knowledge of key HR functions such as recruitment, college visits, and candidate interviews. It was an unforgettable experience that shaped my confidence and skills. I’m really happy to be moving closer to my dream career at such an early stage.", photo: "/Subha Vadivu Lakshmi.png" },
    { id: 4, name: "Rajiya", training: "Data Analytics", review: "I’m Rajiya, and I recently completed my IT training in nellore at Careerschool IT Solutions. Even after a 5-year career gap, I was able to secure a job in an IT company thanks to their excellent training, mentorship, and placement guidance. For students and job seekers in and around Nellore, I highly recommend Careerschool IT Solutions — it’s the best place to upgrade your skills and restart your career in IT.", photo: "/Rajiya.png" },
    { id: 5, name: "Malathi", training: "Data Analytics", review: "I completed a Data analytics course from Careerschool HR solutions. Good experience of training and placements session.Whole team full support and guidance for interviews.This is a good platform of start your career. Thank you...", photo: "/Malathi.png" },
    { id: 6, name: "Ranjith", training: "Data Analystics", review:"First of all special thanks to my great teacher 👩‍🏫‍ karthick sir, my moral supporter kathiya mam and my king maker brindha mam.My dear folks I have 7+ years of experience in the industry back end operations just robotic work I have done in this 7 years. Upcoming technology developments and process developments companies just rejected me because no upgraded skills. In that time only I came to know about careerschool.      I joined for the course Data analytics. Before entering into the careerschool I had a  knowledge in excel after 2 months am a little master in excel.Now I'm feeling very confident to show my skills whatever Karthick sir trained me in Excel and kathya mam advised me how to handle the office environment in the way I am following currently and getting a lot of appreciation in my company that's what careerschool specialty.        So I strongly agree and refer to join in careerschool and get your career more bright all the best", photo: "/Ranjith.png" },
    { id: 7, name: "Afsal Ahamed", training: "HR Training", review: "I am incredibly grateful to Career School HR Solutions for the invaluable guidance and support I received during my HR internship. A special thanks to Brindha Ma'am for her exceptional mentorship and for guiding not just our group but also me personally. Her encouragement and insights have been instrumental in my growth.I am thrilled to share that I have been placed as an HRBP in a corporate company, a significant milestone in my career. This achievement wouldn’t have been possible without the foundation and support I received from Career School HR Solutions.Once again thank you, Brindha Ma'am, and the entire team at Career School HR Solutions for helping me achieve this dream.", photo: "/Afsal Ahamed.png" },
    { id: 8, name: "Shyam Ganesh Prasad", training: "HR Training", review:"It's perfect for learning I joined CareerSchool 4 months ago I worked as a HR intern their very friendly staffs and mam especially Keerthana mam , Brintha mam & Roshini mam not only them all the other staffs are amazingly doing well. I'm happy that I Selected & placed in a Very good Company as a HR Recruiter.It's all Because of CareerSchool HR solutions Thank you all the staffs All the very best for your future ❤️",photo: "/Shyam Ganesh Prasad.png"},
    { id: 9, name: "Manav Magesh", training: "Data Analytics", review: "I joined Careerschool HR Solutions to pursue Data Analytics, and it completely changed me. The training was excellent — Karthikey Sir is one of the most friendly and patient mentors I’ve ever met. He explains every concept in detail and gives important tips that really helped me in interviews.Kathya Ma’am has been a big pillar of support, always encouraging me to grow not only in technical skills but also in soft skills. Careerschool conducts regular soft skill sessions, which made me more confident and ready for the corporate world.I started my journey clueless, but today I’m placed, confident, and grateful. Careerschool is truly the best training institute in Chennai! Highly recommended !!!", photo: "/Manav.png" },
    { id: 10, name: "Bhuvaneshwaran", training: "Data Analytics", review:"I have completed the Data Analytics course at Careerschool. The training mainly covered Advanced Excel, SQL, and Power BI. The teaching was clear and practical, with real-time examples that made it easier to understand and apply the concepts.The HR team also guided us with resume preparation and interview support, which was very helpful.", photo: "/Bhuwaneswar.png" },
    { id: 11, name: "Saikumar Mallarapu", training: "Frontend Development", review:"Hi this is Sai Kumar. I'm from Nellore, recently I attended the Campus Drive conducted by Careerschool IT Solutions at Krishna Chaitanya college. Now I got selected in Software Trainee in software company. Big thanks to Careerschool IT Solutions. It's a goodplatform to learn IT courses like Python or Java Full Stack, AI and Data Analytics. They will give job assistance also I genuinely share my words.", photo: "/Saikumar.png" },
    { id: 12, name: "Manoj Kumar", training: "Cloud Computing", review: "Good exposure to AWS and cloud fundamentals with live practice sessions and excellent trainer support.", photo: "/sarathi pic.jpeg" },
    { id: 13, name: "Priya", training: "Graphic Design", review: "Covered Photoshop and Illustrator basics perfectly. The practical assignments were very helpful.", photo: "/pavi pic.jpeg" },
    { id: 14, name: "Sathish", training: "Java Full Stack", review: "Java Full Stack sessions were clear and project-oriented. The placement guidance was strong.", photo: "/sarathi pic.jpeg" },
    { id: 15, name: "Harini", training: "Artificial Intelligence", review: "I have completed the Data Analytics course at Careerschool HR Solutions. The training mainly covered Advanced Excel, SQL, and Power BI. The teaching was clear and practical.", photo: "/pavi pic.jpeg" },
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
