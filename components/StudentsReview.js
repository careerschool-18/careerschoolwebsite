"use client";
import { useState } from "react";

export default function StudentsReview() {
  const [selectedReview, setSelectedReview] = useState(null);
  const [showAllMobile, setShowAllMobile] = useState(false); 

  const reviews = [
    { id: 1, name: "Sarathi S", training: "PYTHON WITH AI", review: "I’m really thankful to Careerschool HR Solutions for their excellent training and placement support. The learning experience was very practical and helped me gain strong technical skills.A special thanks to Ms. Roshini, my placement officer, for her continuous guidance, motivation, and support throughout my journey.With their help, I successfully got placed as a Software Trainee. I truly recommend Careerschool HR Solutions to anyone looking to start a successful IT career.", photo: "/sarathi pic.jpeg",alt:"Sarathi S_PYTHON WITH AI"},
    { id: 2, name: "Pavithra S", training: "PYTHON WITH AI", review: "I recently completed my Python with AI training at Careerschool, and it was an amazing learning experience. The Offline sessions in Chennai were clear, practical, and easy to understand, which helped me build strong technical knowledge and confidence. With the effective placement support and guidance from the team, I successfully got placed as a Software Trainee. I highly recommend Careerschool HR Solutions to anyone who wants to start a successful career in IT.", photo: "/Student Review Images/Pavithra.jpg",alt:"Pavithra S_PYTHON WITH AI"},
    { id: 3, name: "Subha Vadivu Lakshmi", training: "HR TRAINING", review: "I’m delighted to share that I’ve been placed as an HR Recruiter, and I’m truly thankful to Careerschool for this wonderful opportunity. The HR training and internship program helped me gain practical knowledge of key HR functions such as recruitment, college visits, and candidate interviews. It was an unforgettable experience that shaped my confidence and skills. I’m really happy to be moving closer to my dream career at such an early stage.", photo: "/Student Review Images/Subha Vadivu Lakshmi.jpg",alt:"Subha Vadivu Lakshmi_HR"  },
    { id: 4, name: "Rajiya", training: "DATA ANALYTICS", review: "I’m Rajiya, and I recently completed my IT training in Nellore at Careerschool IT Solutions. Even after a 5-year career gap, I was able to secure a job in an IT company thanks to their excellent training, mentorship, and placement guidance. For students and job seekers in and around Nellore, I highly recommend Careerschool IT Solutions — it’s the best place to upgrade your skills and restart your career in IT.", photo: "/Student Review Images/Rajiya.jpg",alt:"Rajiya_Data Analytics"  },
    { id: 5, name: "Malathi", training: "DATA ANALYTICS", review: "I completed a Data Analytics course from Careerschool HR Solutions. Good experience of training and placement sessions. The whole team gave full support and guidance for interviews. This is a good platform to start your career. Thank you...", photo: "/Student Review Images/Malathi.jpg",alt:"Malathi_Data Analytics"  },
    { id: 6, name: "Ranjith", training: "DATA ANALYTICS", review: "First of all, special thanks to my great teacher Karthick Sir, my moral supporter Kathiya Ma'am, and my king maker Brindha Ma'am. I have 7+ years of experience in backend operations but lacked updated skills. When I joined Careerschool for Data Analytics, the training completely changed my confidence and career direction. Thanks to Careerschool, I now feel skilled and appreciated in my workplace!", photo: "/Student Review Images/Ranjith.jpg",alt:"Ranjith_Data Analytics" },
    { id: 7, name: "Afsal Ahamed", training: "HR TRAINING", review: "I am incredibly grateful to Careerschool HR Solutions for the invaluable guidance and support during my HR internship. A special thanks to Brindha Ma'am for her mentorship and encouragement. I’m thrilled to share that I’ve been placed as an HRBP — this achievement wouldn’t have been possible without the Careerschool team.", photo: "/Student Review Images/Afsal Ahamed.jpg",alt:"Afsal Ahamed_HR" },
    { id: 8, name: "Shyam Ganesh Prasad", training: "HR TRAINING", review: "I joined Careerschool 4 months ago as an HR intern. The staff and mentors were very supportive, especially Keerthana Ma'am, Brintha Ma'am, and Roshini Ma'am. I’m now placed as an HR Recruiter in a reputed company. Thanks to Careerschool HR Solutions!", photo: "/Student Review Images/Shyam Ganesh Prasad.jpg",alt:"Shyam Ganesh Prasad_HR" },
    { id: 9, name: "Manav Magesh", training: "DATA ANALYTICS", review: "I joined Careerschool HR Solutions to pursue Data Analytics, and it completely changed me. The training was excellent — Karthick Sir explains every concept clearly and gives interview tips. Kathya Ma’am encouraged me in both technical and soft skills. Now I’m placed and confident — highly recommended!", photo: "/Student Review Images/Manav.jpg",alt:"Manav_Data Analytics"},
    { id: 10, name: "Bhuvaneshwaran", training: "DATA ANALYTICS", review: "I completed the Data Analytics course at Careerschool. The sessions covered Advanced Excel, SQL, and Power BI with real-time examples. The HR team also provided strong resume and interview guidance.", photo: "/Student Review Images/Bhuwaneswar.jpg",alt:"Bhuwaneswar_Data Analytics"},
    { id: 11, name: "Saikumar Mallarapu", training: "FRONTEND DEVELOPMENT", review: "Hi, I’m Sai Kumar from Nellore. I attended the Careerschool Campus Drive and got selected as a Software Trainee. Great place to learn Python, Java Full Stack, AI, and Data Analytics with placement assistance.", photo: "/Student Review Images/Saikumar.jpg",alt:"Saikumar_NA"},
    { id: 12, name: "Gayathri", training: "DATA ANALYTICS", review: "I’m glad to have completed my training and internship with Careerschool HR Solutions. Throughout this journey, I gained valuable real-time exposure to data handling, analysis, and reporting — from collecting and cleaning data to presenting meaningful insights. This experience greatly boosted my confidence, technical skills, and professional approach.I’m also excited to share that I got placed! It’s truly the perfect start to my Data Analytics career.", photo: "/Student Review Images/Gayathri.jpg",alt:"Gayathri_Data Analytics" },
    { id: 13, name: "Divya", training: "HR", review: "I’m glad to have completed my HR internship at Careerschool HR Solutions, Guindy (one of the best training institutions in Chennai), under the guidance of the amazing Placement Team. Throughout the internship, I gained real-time exposure to recruitment and placement activities — from approaching clients to managing candidate communication and coordination.The Learning & Development (L&D) sessions were equally valuable. They helped me enhance my interpersonal skills, understand training and growth needs, and develop strong professional communication.", photo: "/Student Review Images/Divya.jpg",alt:"Divya_HR"},
    { id: 14, name: "Bhargav", training: "BUSSINESS ANALYTICS", review: "I completed my internship at Careerschool HR Solutions as a Business Analyst, where I gained valuable hands-on experience in the HR training and placement domain. This internship gave me the opportunity to work on real-time business processes, interact with clients, and support their business requirements.The mentors were extremely supportive, offering constant guidance that strengthened my practical skills and confidence in the Business Analyst role.", photo: "/Student Review Images/Bhargav.jpg",alt:"Bhargav_Bussiness Analytics"},
    { id: 15, name: "Velmurugan Vignesh", training: "DATA ANALYTICS", review: "I’m truly grateful to Careerschool for providing excellent Data Analytics Training and Placement support. Coming from a non-IT background, I was unsure how to start my career in IT field, but their training and internship program gave me the right guidance and hands-on experience to confidently begin my journey as a Data Analyst. Thanks to their continuous support, I was able to secure a job and build my career in the IT domain. I highly recommend Careerschool to anyone looking for career-oriented Online & Offline Training or internships in Data Analytics or other software programs.", photo: "/Student Review Images/Velmurugan.jpg",alt:"Velmurugan_Data Analytics"},
  ];
  const visibleReviews =
    typeof window !== "undefined" && window.innerWidth < 640 && !showAllMobile
      ? reviews.slice(0, 5)
      : reviews;

  return (
    <section className="py-10 bg-white text-center overflow-hidden px-4 sm:px-6 relative">
      <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-8 text-[#004AAD]">
        Hear It From Our Learners
      </h2>

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