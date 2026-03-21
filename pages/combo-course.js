// pages/data-analyst.js
import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import StickyEnroll from "../components/StickyEnroll";
import { FiTrendingUp } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export default function DataAnalyst() {
  const router = useRouter();
  const [curriculumOpen, setCurriculumOpen] = useState({});
  const [faqOpen, setFaqOpen] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleCurriculum = (index) => {
    setCurriculumOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleFaq = (index) => {
    setFaqOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Navigation functions
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToHome = () => {
    router.push("/");
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/919876543210", "_blank");
  };

  const curriculumItems = [
    {
      number: "01",
      title: "Data Aanalytics Fundamentals",
      content: [
        "Introduction to Data Analytics",
        "Data Types & Data Lifecycle",
        "Business Analytics Concepts",
        "Analytical Thinking",
      ],
      position: "right",
    },
    {
      number: "02",
      title: "Excel for Data Analytics",
      content: [
        "Advanced Excel Functions",
        "Data Cleaning Techniques",
        "Pivot Tables & Pivot Charts",
        "Dashboard Creation",
      ],
      position: "left",
    },
    {
      number: "03",
      title: "SQL For Data Management",
      content: [
        "SQL Basics",
        "Database Design Concepts",
        "Data Retrieval Queries",
        "Joins & Subqueries",
        "Data Aggregation",
      ],
      position: "right",
    },
    {
      number: "04",
      title: "Data Visualization Tools",
      content: [
        "Power BI",
        "Tableau",
        "Dashboard Development",
        "Business Reporting",
      ],
      position: "left",
    },
    {
      number: "05",
      title: "Real-World Projects",
      content: [
        "Sales Data Analysis",
        "Customer Behavior Analysis",
        "Financial Data Insights",
        "Business KPI Dashboard",
      ],
      position: "right",
    },
    {
      number: "06",
      title: "Interview Preperations",
      content: [
        "Resume Building",
        "Portfolio Development",
        "Mock Interviews",
        "Placement Support",
      ],
      position: "left",
    },
  ];

  const comboItems = [
    {
      title: "Data Analyst + Python",
      icon: "https://cdn-icons-png.flaticon.com/512/4149/4149657.png",
    },
    {
      title: "Data Analyst + AI",
      icon: "https://cdn-icons-png.flaticon.com/512/4149/4149688.png",
    },
    {
      title: "Data Analyst + ML",
      icon: "https://cdn-icons-png.flaticon.com/512/4149/4149694.png",
    },
  ];

  const reviews = [
    {
      name: "Dhanush S",
      image: "/Student Review Images/Dhanush.jpeg",
      review:
        "🚀Data Analysis Project - Aircraft Route Performance Dashboard*I recently worked on an*Aircraft Route Profitability Analysis Project* using Excel. The goal of this project was to understand how aircraft perform across different routes, aircraft types and season.",
      linkedin:
        "https://www.linkedin.com/posts/dhanush-s-9b071526b_dataanalytics-exceldashboard-datavisualization-activity-7436801902379417600-vl5X?utm_source=share&utm_medium=member_desktop&rcm=ACoAADyT6p4BnuGXSZWAph-ReTQElDyDqUml-ks",
    },
    {
      name: "Ferozkhan M",
      image: "/Student Review Images/Ferokhan.png",
      review:
        "I’m thrilled to share that I’ve completed my HR Analytics course and successfully finished my HR internship. I’m incredibly grateful for this opportunity and excited to apply.",
      linkedin:
        "https://www.linkedin.com/posts/ferozkhanm06_hr-internship-activity-7427936298977357824-VtjX?utm_source=share&utm_medium=member_desktop&rcm=ACoAADyT6p4BnuGXSZWAph-ReTQElDyDqUml-ks",
    },
    {
      name: "Mohamed Ismail M",
      image: "/Student Review Images/Mohammed Ismail.png",
      review:
        "From IPL 2008 to 2024, cricket has generated massive data—and insights 📊🏏I created an end-to-end IPL dashboard covering all seasons from 2008 to 2024, transforming raw cricket data into meaningful insights.",
      linkedin:
        "https://www.linkedin.com/posts/mohamed-ismail-m-b31886263_ipl-dataanalytics-dashboard-activity-7422924882633572352-GeaB?utm_source=share&utm_medium=member_desktop&rcm=ACoAADyT6p4BnuGXSZWAph-ReTQElDyDqUml-ks",
    },
    {
      name: "Sujitha Siva",
      image: "/Student Review Images/sujitha.png",
      review:
        "I am pleased to share that I have successfully completed the HR Analyst Course from Career School 🎓This certification has enhanced my understanding of HR analytics, data interpretation, and evidence-based HR decision making",
      linkedin:
        "https://www.linkedin.com/posts/sujitha-siva_i-am-pleased-to-share-that-i-have-successfully-activity-7419957629298393088-YuD2?utm_source=share&utm_medium=member_desktop&rcm=ACoAADyT6p4BnuGXSZWAph-ReTQElDyDqUml-ks",
    },
    {
      name: "Riyas",
      image: "/Student Review Images/Riyas.jpeg",
      review:
        "From Non-IT to Data Analyst 🚀📊 | CareerschoolIf he can do it, YOU can too!Start your journey towards a high-growth tech career today.",
      linkedin:
        "https://www.linkedin.com/posts/careerschool-dataanalytics-dashboard-ugcPost-7405164691603382272-wLVA?utm_source=share&utm_medium=member_desktop&rcm=ACoAADyT6p4BnuGXSZWAph-ReTQElDyDqUml-ks",
    },
  ];

  const faqItems = [
    {
      question: "Who can Enroll This Course?",
      answer:
        "At Careerschool HR & IT Solutions, we offer top-rated career programs like Python Full Stack, Data Analytics, HR Analytics, Digital Marketing, and Java Training with internship and placement support.",
    },
    {
      question:
        "Does Careerschool provide placement assistance after completing the training?",
      answer:
        "Yes. We provide placement assistance, resume preparation, interview training, and company referrals.",
    },
    {
      question: "Why should I choose Careerschool HR & IT Solutions?",
      answer:
        "We provide industry-level training, live projects, experienced mentors, and strong placement support.",
    },
    {
      question: "Who can enroll in Careerschool internship programs?",
      answer:
        "Students, graduates, and working professionals interested in IT and analytics careers can enroll.",
    },
    {
      question: "Do you provide demo classes?",
      answer:
        "Yes, we provide demo sessions so students can understand our training methodology.",
    },
  ];

  // SEO metadata (ONLY for Data Analytics Combo Course Page)

  const pageTitle =
    "Data Analytics Combo Course with AI Tools | Python, HR, Business, Marketing & Finance | Careerschool HR & IT Solutions";

  const pageDescription =
    "Join the Data Analytics Combo Course at Careerschool HR & IT Solutions and specialize with AI-powered training. Choose your track: Data Analytics + Python + AI, HR Analytics + AI, Business Analytics + AI, Digital Marketing Analytics + AI, or Finance Analytics + AI. Learn Excel, SQL, Power BI, Tableau, and build real-world projects with placement assistance.";

  const pageKeywords =
    "data analytics combo course, data analytics with python and ai, hr analytics course with ai, data analytics digital marketing course, business analytics with ai course, finance analytics course, data analytics specialization course, data analytics certification with ai tools, excel sql power bi tableau training, data analytics institute with placement, careerschool data analytics course";

  const pageURL = "https://careerschool.co.in/combo-course";

  const pageImage = "/public/DA Landing Page/combocourse-preview.jpeg";

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta name="author" content="Careerschool HR & IT Solutions" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="content-language" content="en" />
        <meta name="google" content="max-image-preview:large" />

        {/* Robots */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />

        {/* Canonical */}
        <link rel="canonical" href={pageURL} />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageURL} />
        <meta property="og:image" content={pageImage} />
        <meta
          property="og:image:alt"
          content="Data Analytics Combo Course with AI Tools | Careerschool HR & IT Solutions"
        />
        <meta
          property="og:site_name"
          content="Careerschool HR & IT Solutions"
        />
        <meta property="og:locale" content="en_US" />

        {/* COURSE STRUCTURED DATA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Course",
              name: "Data Analytics Combo Certification Course with AI Tools",
              description:
                "Comprehensive Data Analytics training where learners choose a specialization including Python, HR Analytics, Business Analytics, Digital Marketing Analytics, or Finance Analytics combined with AI-powered tools.",
              provider: {
                "@type": "Organization",
                name: "Careerschool HR & IT Solutions",
                sameAs: "https://careerschool.co.in",
              },
              offers: {
                "@type": "Offer",
                category: "Data Analytics Training",
                availability: "https://schema.org/InStock",
              },
              hasCourseInstance: {
                "@type": "CourseInstance",
                courseMode: ["online", "offline"],
                instructor: {
                  "@type": "Person",
                  name: "Industry Data Analytics Experts",
                },
              },
              audience: {
                "@type": "Audience",
                audienceType: "Students and Professionals and Job Seekers",
              },
              teaches: [
                "Data Analytics Fundamentals",
                "Excel for Data Analysis",
                "SQL for Data Analytics",
                "Power BI Dashboard Development",
                "Tableau Data Visualization",
                "AI Tools for Data Analysis",
                "Python for Data Analytics",
                "HR Analytics",
                "Business Analytics",
                "Digital Marketing Analytics",
                "Finance Analytics",
              ],
            }),
          }}
        />

        {/* COURSE LIST STRUCTURED DATA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: curriculumItems.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Course",
                  name: item.title,
                  description: item.content.join(", "),
                },
              })),
            }),
          }}
        />

        {/* FAQ STRUCTURED DATA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            }),
          }}
        />

        {/* ORGANIZATION STRUCTURED DATA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Careerschool HR & IT Solutions",
              url: "https://careerschool.co.in",
              logo: "public/Nav Logo/CSHR - Nav Logo.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-89 39 59 2323",
                contactType: "customer service",
                availableLanguage: ["English"],
              },
            }),
          }}
        />

        {/* Tailwind CSS */}
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      <div className="bg-gray-50 font-sans">
        {/* ================= NAVBAR ================= */}
        <nav className="bg-white shadow sticky top-0 z-50">
          {/* NAVBAR ROW */}
          <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
            {/* LOGO */}
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={goToHome}
            >
              <img
                src="/Nav Logo/CSHR - Nav Logo.png"
                className="w-18 h-14 object-contain"
                alt="Careerschool Logo"
              />
            </div>

            {/* DESKTOP MENU */}
            <ul className="hidden md:flex gap-6 items-center font-medium text-gray-700">
              <li
                className="hover:text-blue-600 cursor-pointer"
                onClick={goToHome}
              >
                Home
              </li>

              <li
                className="hover:text-blue-600 cursor-pointer"
                onClick={() => scrollToSection("curriculum")}
              >
                Courses
              </li>

              <li
                className="hover:text-blue-600 cursor-pointer"
                onClick={() => scrollToSection("reviews")}
              >
                Reviews
              </li>

              <li
                className="hover:text-blue-600 cursor-pointer"
                onClick={openWhatsApp}
              >
                Contact
              </li>

              <button
                onClick={() => {
                  const section = document.getElementById("enroll");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg"
              >
                Enroll Now
              </button>
            </ul>

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden text-2xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
          </div>

          {/* MOBILE DROPDOWN MENU */}
          {menuOpen && (
            <div className="md:hidden bg-white border-t">
              <ul className="flex flex-col text-center font-medium text-gray-700">
                <li className="py-4 border-b cursor-pointer" onClick={goToHome}>
                  Home
                </li>

                <li
                  className="py-4 border-b cursor-pointer"
                  onClick={() => scrollToSection("curriculum")}
                >
                  Courses
                </li>

                <li
                  className="py-4 border-b cursor-pointer"
                  onClick={() => scrollToSection("reviews")}
                >
                  Reviews
                </li>

                <li
                  className="py-4 border-b cursor-pointer"
                  onClick={openWhatsApp}
                >
                  Contact
                </li>

                <li className="py-4">
                  <a
                    href="#enroll"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg inline-block"
                  >
                    Enroll Course
                  </a>
                </li>
              </ul>
            </div>
          )}
        </nav>

        {/* ================= HERO ================= */}
        <section
          className="relative text-white py-20 md:py-24 pb-40 md:pb-48 bg-cover bg-center"
          style={{
            backgroundImage: "url('/DA Landing Page/dabanner.png')",
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/10"></div>

          <div className="relative max-w-7xl mx-auto px-6">
            {/* Hero Text */}
            <div className="max-w-2xl flex flex-col items-center md:items-start w-full">
              {/* Badge */}
              <div className="mb-6 w-full">
                <div
                  className="
      w-full
      text-sm md:text-base
      font-bold
      text-white
      px-5 py-4
      rounded-xl
      bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600
      shadow-lg
      border border-white/20
      flex items-center justify-center
      hover:scale-105
      transition-all duration-300
      tracking-wide
      "
                >
                  ✨ 3 PREMIUM COURSES AT 1 PRICE
                </div>
              </div>

              {/* Heading */}
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center md:text-left">
                ANY DOMAIN + DATA ANALYTICS + AI TOOLS
              </h1>

              {/* Subtitle */}
              <p className="mb-6 text-lg text-center md:text-left">
                Mastering Every Domain, securing Every Future With AI &
                Analytics.
              </p>

              {/* Button */}
              {/* Hero Badges */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 max-w-2xl">
                {[
                  "Python + Analytics + AI Tools",
                  "HR + Analytics + AI Tools",
                  "Digital Marketing  + Analytics + AI Tools",
                  "Business Analysis  + Analytics + AI Tools",
                  "Finance  + Analytics + AI Tools",
                ].map((item, index) => (
                  <button
                    key={item}
                    className={`
      w-full
      h-[60px]
      flex items-center justify-center gap-2
      text-sm md:text-base
      font-semibold
      text-white
      px-8 py-4
      rounded-xl
      bg-gradient-to-r from-blue-600 to-indigo-600
      hover:from-indigo-700 hover:to-blue-700
      transition-all duration-300
      shadow-lg hover:shadow-[0_0_20px_rgba(99,102,241,0.7)]
      hover:-translate-y-1
      border border-blue-400/30
      ${index === 4 ? "md:col-span-2 md:w-1/2 md:mx-auto" : ""}
      `}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            {/* Start Learning Button */}
            <div className="mt-5 flex justify-center md:hidden">
              <button
                onClick={() => scrollToSection("enroll")}
                className="
    w-full
    bg-white
    text-blue-600
    px-10 py-4
    rounded-xl
    text-lg
    font-bold
    shadow-lg
    hover:shadow-2xl
    hover:bg-gray-100
    transition-all duration-300
    "
              >
                Start Learning
              </button>
            </div>
          </div>
        </section>

        {/* ================= FLOATING COMBO COURSES BOX ================= */}

        <div className="w-full mt-12 px-4">
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl py-8 px-6 text-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "Industry-Aligned Curriculum",
                "Hands-on Projects & Case Studies",
                "Placement Assistance",
                "Expert Mentors from Industry",
              ].map((course) => (
                <button
                  key={course}
                  onClick={() => scrollToSection("combo")}
                  className="
          w-full
          px-8 py-4
          rounded-full
          text-white
          font-semibold
          text-sm
          bg-black
          hover:bg-gray-900
          transition-all duration-300
          shadow-lg hover:shadow-2xl
          border border-gray-700
          "
                >
                  {course}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ================= Analytics ================= */}

        <section className="bg-white py-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-10">
              Program Overview
            </h2>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Modern industries are rapidly evolving with the adoption of Data
              Analytics and Artificial Intelligence across all business
              functions. Today, professionals in domains such as Human
              Resources, Finance, Business Analytics, and Digital Marketing are
              increasingly expected to understand and work with data-driven
              insights and intelligent tools. To stay relevant and competitive
              in the job market, it has become essential for students and
              professionals to develop analytics and AI awareness alongside
              their core domain knowledge. Building these future-ready skills
              helps individuals adapt to industry changes, enhance
              decision-making capabilities, and secure long-term career growth
              in a technology-driven world.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              To stay relevant and competitive in the job market, it has become
              essential for students and professionals to develop analytics and
              AI awareness alongside their core domain knowledge. Building these
              future-ready skills helps individuals adapt to industry changes,
              enhance decision-making capabilities, and secure long-term career
              growth in a technology-driven world.
            </p>
          </div>
        </section>

        {/* ================= CURRICULUM =================
        <section id="curriculum" className="pt-44 pb-20">
          <h2 className="text-4xl font-bold text-center mb-16">
            Course Curriculum
          </h2>
          <div className="max-w-6xl mx-auto relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>

            {curriculumItems.map((item, index) => (
              <div
                key={index}
                className="mb-12 flex flex-col md:flex-row justify-between items-center w-full gap-6"
              >
                {item.position === "right" ? (
                  <>
                    <div className="hidden md:block w-5/12"></div>
                    <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold z-10">
                      {item.number}
                    </div>
                    <div className="bg-white shadow-xl rounded-lg w-full md:w-5/12 p-6 hover:shadow-2xl transition">
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => toggleCurriculum(index)}
                      >
                        <h3 className="font-semibold">{item.title}</h3>
                        <span>{curriculumOpen[index] ? "−" : "+"}</span>
                      </div>
                      <div
                        className={`mt-3 text-gray-600 ${curriculumOpen[index] ? "" : "hidden"}`}
                      >
                        {item.content.map((point, i) => (
                          <div key={i}>• {point}</div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-white shadow-xl rounded-lg w-5/12 p-6 hover:shadow-2xl transition">
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => toggleCurriculum(index)}
                      >
                        <h3 className="font-semibold">{item.title}</h3>
                        <span>{curriculumOpen[index] ? "−" : "+"}</span>
                      </div>
                      <div
                        className={`mt-3 text-gray-600 ${curriculumOpen[index] ? "" : "hidden"}`}
                      >
                        {item.content.map((point, i) => (
                          <div key={i}>• {point}</div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold z-10">
                      {item.number}
                    </div>
                    <div className="hidden md:block w-5/12"></div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        */}

        {/* ================= COMPARISON ================= */}
        <section className="bg-gray-100 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Why Choose Careerschool?
          </h2>

          <div className="max-w-5xl mx-auto px-4">
            {/* Scroll container for mobile */}
            <div className="overflow-x-auto">
              <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-blue-600 text-white text-sm md:text-base">
                    <th className="p-3 md:p-4 text-left">Features</th>
                    <th className="p-3 md:p-4 text-center">Careerschool</th>
                    <th className="p-3 md:p-4 text-center">Other Institutes</th>
                  </tr>
                </thead>

                <tbody className="text-sm md:text-base">
                  <tr className="border text-center">
                    <td className="p-3 md:p-4 text-left">
                      Industry Focused Curriculum
                    </td>
                    <td className="text-green-600 font-semibold">✔ YES</td>
                    <td className="bg-red-100 text-red-600 font-semibold px-3 md:px-4 py-2 md:py-3 rounded">
                      ✘ Limited
                    </td>
                  </tr>

                  <tr className="border text-center">
                    <td className="p-3 md:p-4 text-left">
                      Real-World Projects
                    </td>
                    <td className="text-green-600 font-semibold">✔ YES</td>
                    <td className="bg-red-100 text-red-600 font-semibold px-3 md:px-4 py-2 md:py-3 rounded">
                      ✘ Few
                    </td>
                  </tr>

                  <tr className="border text-center">
                    <td className="p-3 md:p-4 text-left">
                      Placement Assistance
                    </td>
                    <td className="text-green-600 font-semibold">
                      ✔ Dedicated Support
                    </td>
                    <td className="bg-red-100 text-red-600 font-semibold px-3 md:px-4 py-2 md:py-3 rounded">
                      ✘ Not Available
                    </td>
                  </tr>

                  <tr className="border text-center">
                    <td className="p-3 md:p-4 text-left">
                      Experienced Trainers
                    </td>
                    <td className="text-green-600 font-semibold">
                      ✔ Industry Experts
                    </td>
                    <td className="bg-red-100 text-red-600 font-semibold px-3 md:px-4 py-2 md:py-3 rounded">
                      ✘ Mostly Theoretical
                    </td>
                  </tr>

                  <tr className="border text-center">
                    <td className="p-3 md:p-4 text-left">
                      Interview Preparation
                    </td>
                    <td className="text-green-600 font-semibold">
                      ✔ Mock Interviews
                    </td>
                    <td className="bg-red-100 text-red-600 font-semibold px-3 md:px-4 py-2 md:py-3 rounded">
                      ✘ Basic Guidance
                    </td>
                  </tr>

                  <tr className="border text-center">
                    <td className="p-3 md:p-4 text-left">Practical Learning</td>
                    <td className="text-green-600 font-semibold">
                      ✔ Hands-on Training
                    </td>
                    <td className="bg-red-100 text-red-600 font-semibold px-3 md:px-4 py-2 md:py-3 rounded">
                      ✘ Heavy Theory
                    </td>
                  </tr>

                  <tr className="border text-center">
                    <td className="p-3 md:p-4 text-left">
                      Live Classroom Training
                    </td>
                    <td className="text-green-600 font-semibold">✔ YES</td>
                    <td className="bg-red-100 text-red-600 font-semibold px-3 md:px-4 py-2 md:py-3 rounded">
                      ✘ Mostly Recorded Sessions
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ================= COMBO COURSES =================
        <section className="bg-yellow-300 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Combo Courses
          </h2>
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
            {comboItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-xl p-6 text-center hover:scale-105 transition"
              >
                <img
                  src={item.icon}
                  className="w-20 mx-auto mb-4"
                  alt={item.title}
                />
                <h3 className="font-bold text-xl">{item.title}</h3>
              </div>
            ))}
          </div>
        </section>
        */}

        {/* ================= REVIEWS ================= */}
        <section id="reviews" className="bg-blue-600 text-white py-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Student Reviews
          </h2>

          <div className="max-w-6xl mx-auto px-6">
            <Swiper
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              loop={true}
              autoplay={{ delay: 5000 }}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 180,
                modifier: 2,
                slideShadows: false,
              }}
              pagination={{ clickable: true }}
              modules={[EffectCoverflow, Pagination, Autoplay]}
              className="py-10"
            >
              {reviews.map((review, index) => (
                <SwiperSlide key={index} className="w-[300px]">
                  <div className="review-card rounded-2xl p-6 text-center shadow-xl">
                    <img
                      src={review.image}
                      className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-white"
                      alt={review.name}
                    />

                    {/* Name + LinkedIn badge */}
                    <div className="flex justify-center items-center gap-2">
                      <h3 className="font-bold text-lg">{review.name}</h3>

                      <img
                        src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                        className="w-5 h-5"
                      />
                    </div>

                    {/* ⭐ Star rating */}
                    <div className="flex justify-center mt-2 text-yellow-400 text-lg">
                      ★★★★★
                    </div>

                    <p className="mt-4 text-sm">{review.review}</p>

                    <a
                      href={review.linkedin}
                      target="_blank"
                      className="text-blue-500 font-semibold block mt-4 hover:underline"
                    >
                      View LinkedIn
                    </a>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
        {/* ================= ENROLL FORM SECTION ================= */}
        <section id="enroll" className="bg-white py-20">
          <div className="max-w-5xl mx-auto px-6">
            {/* HubSpot Script */}
            <Script
              src="https://js-na2.hsforms.net/forms/embed/243742367.js"
              strategy="afterInteractive"
            />

            {/* HubSpot Form */}
            <div
              className="hs-form-frame bg-gray-50 p-6 rounded-xl shadow-lg"
              data-region="na2"
              data-form-id="0237c445-e852-43ea-9b9f-091cd6c000e5"
              data-portal-id="243742367"
            ></div>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="bg-blue-800 py-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Need Help
          </h2>
          <div className="max-w-3xl mx-auto space-y-5 px-6">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="bg-yellow-400 rounded-lg shadow-lg overflow-hidden"
              >
                <button
                  className="w-full flex justify-between items-center p-5 font-semibold text-left"
                  onClick={() => toggleFaq(index)}
                >
                  {item.question}
                  <span className="text-2xl">{faqOpen[index] ? "−" : "+"}</span>
                </button>
                <div
                  className={`bg-gray-100 p-5 text-gray-700 ${faqOpen[index] ? "" : "hidden"}`}
                >
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* ================= GLOWING WHATSAPP BUTTON ================= */}
        <a
          href="https://wa.me/918939592323"
          target="_blank"
          className="fixed bottom-20 md:bottom-6 right-6 z-50"
        >
          <div className="relative">
            {/* glow effect */}
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>

            <span className="relative bg-green-500 hover:bg-green-600 p-4 rounded-full shadow-xl flex items-center justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
                alt="WhatsApp"
                className="w-7 h-7"
              />
            </span>
          </div>
        </a>
        {/* ================= FOOTER ================= */}
        <footer className="bg-gray-900 text-white py-10">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6">
            <div>
              <img
                src="/Nav Logo/CSHR - Nav Logo.png"
                className="w-18 h-14 object-contain" /* Increased from w-10 to w-14 */
                alt="Careerschool Logo"
              />
            </div>
            <div>
              <h3 className="font-bold mb-3">Links</h3>
              <p
                className="cursor-pointer hover:text-blue-400"
                onClick={goToHome}
              >
                Home
              </p>
              <p
                className="cursor-pointer hover:text-blue-400"
                onClick={() => scrollToSection("curriculum")}
              >
                Courses
              </p>
              <p
                className="cursor-pointer hover:text-blue-400"
                onClick={() => scrollToSection("reviews")}
              >
                Reviews
              </p>
            </div>
          </div>
        </footer>
      </div>
      <>
        {/* your sections */}

        <StickyEnroll />
      </>
    </>
  );
}
