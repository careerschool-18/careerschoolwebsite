"use client";

import React from "react";

export default function PythonNellore() {
  const [activeForm, setActiveForm] = React.useState("python");
  const [seatsLeft] = React.useState(7);

  const getCurrentMonth = () =>{
    return new Date().toLocaleString("default", { month: "long" });
  };

  
// Comparison Data stored in a variable for cleaner rendering
  const comparisonData = [
    { feature: "Trainer Interaction", bad: "Limited due to large batches", good: "Direct & personal interaction" },
    { feature: "Teaching Approach", bad: "Fast-paced, generic flow", good: "Student-paced, concept clarity" },
    { feature: "Doubt Resolution", bad: "Fixed or time-bound sessions", good: "Continuous doubt clarification support" },
    { feature: "Language Comfort", bad: "Mostly English", good: "Telugu + English explanation" },
    { feature: "Class Mode", bad: "Only Online or Only Offline", good: "Live Online + Offline" },
    { feature: "Local Support", bad: "No local after-class support", good: "On-ground support in Nellore" },
  ];
  
 return (
    <div className="min-h-screen font-sans text-gray-800 bg-slate-50 overflow-x-hidden">

{/* PREMIUM URGENCY TICKER */}
<div className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">

  <div className="max-w-7xl mx-auto px-4 py-2 
                  flex flex-wrap items-center justify-center gap-3 
                  text-white text-[11px] sm:text-sm md:text-base font-semibold text-center">

    {/* Blinking Red Dot */}
    <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>

    {/* Dynamic Month Text */}
    <span>
      🚨 {getCurrentMonth()} Batch Closing Soon
    </span>


    {/* Seats Left */}
    <span className="bg-red-600 px-3 py-1 rounded-full text-white animate-pulse">
      Only {seatsLeft} Seats Left
    </span>
</div>
</div>
            {/* NAVBAR */}
      <nav className="bg-white/95 backdrop-blur shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        <a href="https://careerschool.co.in" className="flex items-center">
            <img 
              src="/Nav Logo/CSIT - Nav Logo.png" 
              alt="CSIT Logo" 
              className="h-8 md:h-10 hover:opacity-80 transition-opacity" 
            />
          </a>
          
          <a 
  href="#register" 
  className="
  bg-blue-700 text-white 
  px-3 py-1.5 
  sm:px-4 sm:py-2 
  md:px-6 md:py-2.5 
  rounded-lg 
  text-xs sm:text-sm md:text-base 
  font-bold 
  hover:bg-blue-800 
  transition 
  shadow-lg
  "
>
🎁 Free Demo + Career Guidance
</a>


        </div>
      </nav>

     {/* HERO SECTION */}
<section
  className="relative pt-8 pb-16 lg:pt-20 lg:pb-28 overflow-hidden bg-cover bg-[25%_center] lg:bg-[center_30%]"
  style={{
    backgroundImage: "url('/Nellore Python/nellorepython.jpg')",
  }}
>
  <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black/80 via-black/50 to-transparent z-0"></div>

  <div className="max-w-7xl mx-auto px-4 relative z-10">
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

      {/* LEFT CONTENT */}
      <div className="text-center lg:text-left space-y-6 pt-4">
        <div className="inline-flex items-center gap-2 bg-white/90 text-slate-900 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-bold border backdrop-blur shadow mx-auto lg:mx-0">
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
          Why go to Hyderabad? Learn in Nellore.
        </div>

        <h1 className="
text-2xl 
sm:text-3xl 
md:text-5xl 
lg:text-6xl 
font-extrabold 
text-white 
leading-snug 
drop-shadow-[0_6px_30px_rgba(0,0,0,0.6)]
">

  <span className="block">
    Live Online & Offline
  </span>

  <span className="block">
    Python + AI Training
  </span>

  <span className="
    block mt-2 
    text-transparent bg-clip-text 
    bg-gradient-to-r from-sky-400 to-blue-500
  ">
    in Mana Nellore.
  </span>

</h1>


<p className="text-sm sm:text-base md:text-lg 
text-slate-200 max-w-xl
mx-auto lg:mx-0 leading-relaxed drop-shadow px-2 md:px-0">
  Same <b className="text-white">"MNC Level"</b> training, now near you.
</p>


        <div className="flex flex-wrap gap-2 md:gap-3 pt-2 justify-center lg:justify-start">
          {[
            "100% Practical",
            "Resume Building",
            "Mock Interviews",
            "Internships",
            "Expert Guidance",
            "Pre Placement Support",
            "Post Placement Support",
            "Communication Building"
          ].map((item) => (
            <div
              key={item}
              className="text-xs md:text-sm font-semibold text-white bg-black/40 px-2 py-1.5 md:px-3 md:py-2 rounded-md border border-white/20 backdrop-blur"
            >
              ✅ {item}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE – TOGGLE + FORM */}
      <div id="register" className="w-full mt-6 lg:mt-0 space-y-4">

      {/* PREMIUM TAB SWITCHER */}
<div className="bg-white rounded-2xl shadow-2xl border p-2 relative overflow-hidden">

<div className="relative flex">

  {/* Sliding Highlight */}
  <div
    className={`absolute top-0 left-0 h-full w-1/2 rounded-xl transition-all duration-500 ease-in-out
    ${
      activeForm === "python"
        ? "translate-x-0"
        : "translate-x-full"
    }
    bg-gradient-to-r from-blue-600 to-indigo-600 shadow-[0_0_25px_rgba(59,130,246,0.7)]`}
  />

  {/* Python Button */}
  <button
    onClick={() => setActiveForm("python")}
    className={`relative z-10 w-1/2 py-4 text-lg font-semibold rounded-xl transition-colors duration-300
    ${
      activeForm === "python"
        ? "text-white"
        : "text-gray-700"
    }`}
  >
    Python Training
  </button>

  {/* Others Button */}
  <button
    onClick={() => setActiveForm("others")}
    className={`relative z-10 w-1/2 py-4 text-lg font-semibold rounded-xl transition-colors duration-300
    ${
      activeForm === "others"
        ? "text-white"
        : "text-gray-700"
    }`}
  >
    Other Courses
  </button>

</div>
</div>
{/* ENQUIRY FORM */}
<div className="bg-white rounded-2xl shadow-2xl border overflow-hidden mt-4">
  <div className="bg-blue-900 p-3 text-center">
    <h3 className="text-base md:text-lg font-bold text-white">
      Enquiry Form
      </h3>
      </div>
      <div></div>
      <iframe
      src={
        activeForm === "python"
        ? "https://docs.google.com/forms/d/e/1FAIpQLSepDUm2PNnUH5xhcT8XHoX7_YmptpTqXjZvYGfUM_wFaGWvDw/viewform?embedded=true"
        : "https://docs.google.com/forms/d/e/1FAIpQLScsKgrL4O2V7y0VJjicVAR2wsfWVQ6t-O8_SsDYFIvHPUn0SQ/viewform?pli=1"
      }
      className="w-full h-[400px] sm:h-[450px] md:h-[600px] transition-all duration-500"
      frameBorder="0"
      title="Training Registration"
      >
        Loading…
        </iframe>
        </div>
        </div>
        </div>
        </div>
        </section>
  {/* COMPARISON + HIGHLIGHT SECTION */}
      <section className="py-12 md:py-24 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-20">
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900">
              Why Nellore Students Choose Us?
            </h2>
            <p className="text-gray-500 mt-2 md:mt-3 text-sm md:text-lg">
              Real differences that matter while learning.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 md:gap-20 items-center">
            
            {/* LEFT: COMPARISON (Responsive Split) */}
            <div className="w-full max-w-xl mx-auto lg:mx-0">
              
              {/* DESKTOP VIEW: Table (Hidden on small screens) */}
              <div className="hidden md:block bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-3 bg-gray-100 border-b border-gray-200 font-bold text-base text-gray-700">
                  <div className="p-5 text-center">Learning Factor</div>
                  <div className="p-5 text-center text-gray-500">Metro City Institutes</div>
                  <div className="p-5 text-center text-green-700 bg-green-50">Careerschool</div>
                </div>
                {comparisonData.map((row, idx) => (
                   <div key={idx} className="grid grid-cols-3 border-b border-gray-100 last:border-0 text-base">
                      <div className="p-4 font-medium text-gray-700 flex items-center justify-center text-center">{row.feature}</div>
                      <div className="p-4 text-red-500 bg-red-50/30 flex items-center justify-center text-center">{row.bad}</div>
                      <div className="p-4 text-green-700 font-bold bg-green-50 flex items-center justify-center text-center shadow-[inset_0_0_10px_rgba(0,128,0,0.05)]">
                          {row.good}
                      </div>
                   </div>
                ))}
              </div>

              {/* MOBILE VIEW: Cards (Visible only on small screens) */}
              <div className="md:hidden space-y-4">
                {comparisonData.map((row, idx) => (
                  <div key={idx} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gray-100 px-4 py-2 font-bold text-gray-800 border-b border-gray-200 text-center text-sm">
                      {row.feature}
                    </div>
                    {/* Body */}
                    <div className="grid grid-cols-2 text-xs">
                      <div className="p-3 text-center border-r border-gray-100 bg-red-50/10">
                         <span className="block text-gray-400 text-[10px] uppercase mb-1">Metro Cities</span>
                         <span className="text-red-500 font-medium">{row.bad}</span>
                      </div>
                      <div className="p-3 text-center bg-green-50/50">
                         <span className="block text-green-600/70 text-[10px] uppercase mb-1">Careerschool</span>
                         <span className="text-green-700 font-bold">{row.good}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: TEXT */}
            <div className="text-center lg:text-left max-w-xl mx-auto lg:mx-0 space-y-6 md:space-y-8">
              <h3 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                No.1 Choice for <br />
                <span className="text-blue-600">Python & AI Training</span> <br />
                in Nellore
              </h3>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Live Online & Offline classes designed to build strong fundamentals,
                real-world skills, and confidence - with personal trainer guidance at every step.
              </p>
              <ul className="space-y-2 md:space-y-3 text-gray-700 text-sm md:text-base font-medium inline-block text-left">
                <li>✔ Learn with clarity</li>
                <li>✔ Practice with support</li>
                <li>✔ Grow with confidence</li>
              </ul>
              <div>
                <a href="#register" className="inline-block mt-4 md:mt-6 bg-blue-700 text-white px-8 py-3 md:px-10 md:py-3.5 rounded-xl font-bold text-sm md:text-base shadow-lg hover:bg-blue-800 transition">
                  Start Your Python Journey
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCAL TESTIMONIALS */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-900">
            <span className="text-blue-600">Mana Students Emani Antunaru?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ReviewCard 
              initial="L"
              name="Lakshmi Lahari" 
              review="I have joined Careerschool IT Solutions for the Python Full Stack course, and my experience so far has been very positive. The training is well structured, starting from the basics and gradually progressing to advanced topics. The instructors are knowledgeable, supportive, and always willing to clear doubts. The practical sessions and real-time project exposure have significantly boosted my confidence. The learning environment is encouraging and promotes continuous improvement. Overall, it is a great platform for learning a variety of courses."
            />
            <ReviewCard 
              initial="A"
              name="Aghamarsh"
              review="I’m really enjoying my Python Full Stack course at Careerschool. The trainers are highly knowledgeable and make the learning process engaging and easy to understand. They begin from the very basics, which is perfect even for those with no prior coding experience. The trainers are always supportive and ready to help whenever doubts arise. I’m excited to apply these skills and build a successful career in the software industry."
            />
            <ReviewCard 
              initial="P"
              name="Pravalika" 
              review="The Python AI course at Careerschool IT Solutions provides a strong foundation for beginners as well as for those looking to upskill in artificial intelligence. The curriculum is well structured, with a balanced focus on Python fundamentals and practical AI applications. The instructors are knowledgeable and supportive, making complex concepts easy to understand. Overall, it is a great choice for anyone interested in building skills in Python and artificial intelligence(AI)."
            />
            <ReviewCard 
              initial="S"
              name="Sekhar Uppala" 
              review="I had the opportunity to enroll in the Python Full Stack course offered by Career School IT Solutions, Nellore, and I was thoroughly impressed. The course is well structured, beginning with the fundamentals and gradually introducing more complex concepts with clarity and purpose. The supportive learning environment and clear teaching approach make it highly recommended for anyone serious about learning Python in a structured and encouraging setting."
            />
            <ReviewCard 
              initial="R"
              name="Rohith" 
              review="I am currently pursuing a software training course at Careerschool, where I am learning Python Full Stack development. The trainers are IT industry experts who teach each technology from the basics to an advanced level. The support provided to students is excellent and helps prepare us for opportunities in the software and IT industry."
            />
          </div>
        </div>
      </section>

      {/* COURSE ROADMAP */}
      {/* --- ROADMAP SECTION --- */}
      <section className="py-12 md:py-28 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          <div className="text-center mb-12 md:mb-24">
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900">
              Full Stack Python & AI Learning Roadmap
            </h2>
            <p className="text-gray-500 mt-2 md:mt-4 text-sm md:text-lg max-w-2xl mx-auto">
              A structured training module from Python fundamentals to full-stack development
              and AI applications.
            </p>
          </div>

          <div className="relative">

            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 h-full w-1 
                            bg-gradient-to-b from-blue-600 via-indigo-500 to-sky-500 
                            transform -translate-x-1/2 hidden md:block rounded-full opacity-20" />

            {/* STEP 01 */}
            <RoadmapItem
              step="01"
              title="Python Programming (Core to Advanced)"
              side="left"
              sections={[
                {
                  heading: "Introduction & Setup",
                  items: [
                    "Introduction to Python",
                    "Installation of Python & PyCharm",
                    "Python Environment & IDE Overview",
                  ],
                },
                {
                  heading: "Basics",
                  items: [
                    "Variables & Data Types",
                    "Operators",
                    "Control Flow (if, elif, else)",
                    "Loops (for, while)",
                  ],
                },
                {
                  heading: "Data Structures",
                  items: [
                    "Strings",
                    "Lists & Tuples",
                    "Sets & Dictionaries",
                  ],
                },
                {
                  heading: "Functions & Advanced Python",
                  items: [
                    "User-defined & Built-in Functions",
                    "map(), filter(), reduce()",
                    "Modules & Packages",
                    "File Handling",
                    "OOP, Inheritance & Polymorphism",
                    "Method Overloading & Overriding",
                    "Abstract Methods",
                  ],
                },
              ]}
            />

            {/* STEP 02 */}
            <RoadmapItem
              step="02"
              title="Web Development – HTML5"
              side="right"
              sections={[
                {
                  heading: "HTML Basics",
                  items: [
                    "Introduction to HTML",
                    "Text Formatting",
                    "Tables & Lists",
                  ],
                },
                {
                  heading: "Forms & Layout",
                  items: [
                    "Forms & Input Elements",
                    "Semantic Elements",
                    "div & span",
                  ],
                },
              ]}
            />

            {/* STEP 03 */}
            <RoadmapItem
              step="03"
              title="CSS – Styling & Layout"
              side="left"
              sections={[
                {
                  heading: "CSS Fundamentals",
                  items: [
                    "CSS Introduction",
                    "Selectors",
                    "Box Model",
                    "Float",
                  ],
                },
                {
                  heading: "Styling & Layout",
                  items: [
                    "Text Properties",
                    "Background Properties",
                    "Positioning",
                    "Flexbox",
                    "Grid",
                    "Transform",
                    "Animations",
                    "Media Queries (Responsive Design)",
                  ],
                },
              ]}
            />

            {/* STEP 04 */}
            <RoadmapItem
              step="04"
              title="JavaScript – Client-Side Programming"
              side="right"
              sections={[
                {
                  heading: "JavaScript Basics",
                  items: [
                    "Introduction to JavaScript",
                    "Variables & Data Types",
                  ],
                },
                {
                  heading: "Core Concepts",
                  items: [
                    "Functions",
                    "Arrays & Array Methods",
                    "Objects & Object Methods",
                    "String & Number Handling",
                  ],
                },
                {
                  heading: "Advanced & Async",
                  items: [
                    "this keyword",
                    "bind(), call(), apply()",
                    "ES6 Features",
                    "setTimeout(), setInterval(), find()",
                    "Promises, async & await",
                    "Fetch API",
                  ],
                },
                {
                  heading: "Browser APIs",
                  items: [
                    "DOM Introduction",
                    "Events",
                    "Local Storage & Session Storage",
                  ],
                },
              ]}
            />

            {/* STEP 05 */}
            <RoadmapItem
              step="05"
              title="SQL & Database Management"
              side="left"
              sections={[
                {
                  heading: "SQL Basics & Queries",
                  items: [
                    "Introduction to SQL",
                    "Types of SQL",
                    "DDL & DML Commands",
                    "Aggregate Queries",
                    "Sub Queries",
                    "Join Queries",
                  ],
                },
              ]}
            />

            {/* STEP 06 */}
            <RoadmapItem
              step="06"
              title="Django Web Framework"
              side="right"
              sections={[
                {
                  heading: "Django Basics",
                  items: [
                    "Introduction to Django",
                    "Installation & Project Setup",
                  ],
                },
                {
                  heading: "Core Concepts",
                  items: [
                    "MVT Architecture",
                    "URLs Configuration",
                    "Templates",
                  ],
                },
                {
                  heading: "Database & APIs",
                  items: [
                    "Models",
                    "CRUD Operations",
                    "REST API using Django",
                  ],
                },
              ]}
            />

            {/* STEP 07 */}
            <RoadmapItem
              step="07"
              title="Artificial Intelligence & OpenCV"
              side="left"
              sections={[
                {
                  heading: "AI & Computer Vision",
                  items: [
                    "Introduction to Artificial Intelligence",
                    "Use cases of AI",
                    "Introduction to OpenCV",
                    "Image Processing Basics",
                    "Installing & Using AI Packages",
                  ],
                },
              ]}
            />

            <div className="flex justify-center mt-12 md:mt-24">
              <div className="bg-green-600 text-white px-6 py-3 md:px-10 md:py-4 rounded-full 
                              font-bold shadow-xl text-sm md:text-lg text-center z-10 relative">
                🎯 Industry-Ready Python & AI Developer
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-8 md:py-12 text-sm">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="col-span-1 md:col-span-2">
          <a href="https://careerschool.co.in" className="flex items-center">
            <img 
              src="/Nav Logo/CSIT - Nav Logo.png" 
              alt="CSIT Logo" 
              className="h-8 md:h-10 hover:opacity-80 transition-opacity" 
            />
          </a>
            <p className="leading-relaxed text-gray-400 mb-4 pr-0 md:pr-4">
            We are on a mission to make Nellore students IT-ready by providing industry-standard training right in their hometown.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-base">Contact Us</h4>
            <p className="mb-2 flex items-center justify-center md:justify-start gap-2">📞 +91 73959 17767</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-base">Walkin</h4>
            <p className="leading-relaxed">
            Children's Park Road, opposite to Aditya Degree College,<br />
            Aditya Nagar, Ramji Nagar,<br />
            Nellore, AP 524002.
            </p>
          </div>
        </div>
        <div className="text-center mt-8 md:mt-12 pt-8 border-t border-gray-800 text-gray-500 text-xs">
          © 2026 Careerschool HR & IT Solutions. Built with ❤️ for our City.
        </div>
      </footer>

      {/* FLOATING WHATSAPP WIDGET */}
      <FloatingWhatsApp />

    </div>
  );


/* --- SUB COMPONENTS --- */

function ReviewCard({ initial, name, review }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 relative mt-6 md:mt-0">
      <div className="absolute -top-6 left-6 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
        {initial}
      </div>
      <div className="mt-4 md:mt-6">
        <div className="flex text-yellow-400 text-sm mb-3">★★★★★</div>
        <p className="text-gray-600 italic mb-4 text-sm leading-relaxed">"{review}"</p>
        <h4 className="font-bold text-gray-900">{name}</h4>
      </div>
    </div>
  );
}

function RoadmapItem({ step, title, sections, side }) {
  const [open, setOpen] = React.useState(false);
  const isLeft = side === "left";

  return (
    <div className="relative mb-8 md:mb-16">
      
      {/* CONNECTOR DOT (Desktop Only) - Centered absolutely */}
      <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center h-full pointer-events-none">
        <div className="sticky top-1/2 w-6 h-6 rounded-full bg-white border-4 border-blue-600 shadow-sm" />
      </div>

      {/* CONTENT CARD WRAPPER */}
      <div className={`flex w-full ${isLeft ? "md:justify-end" : "md:justify-start"}`}>
        
        {/* THE CARD */}
        <div 
          className={`
            relative bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-200 
            w-full md:w-[48%] lg:w-[45%] p-4 md:p-6 transition-all
            /* Mobile: Centered with margin */
            mx-auto
            /* Desktop: Remove center, align to side */
            md:mx-0
            ${isLeft ? "md:mr-8 lg:mr-12" : "md:ml-8 lg:ml-12"}
          `}
        >
          <button
            onClick={() => setOpen(!open)}
            className="w-full text-left focus:outline-none"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="bg-blue-600 text-white font-extrabold 
                               px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl text-sm md:text-base shadow-sm">
                  {step}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">
                  {title}
                </h3>
              </div>
              <span className={`text-xl md:text-2xl font-bold text-gray-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
                {open ? "−" : "+"}
              </span>
            </div>
          </button>

          {/* EXPANDABLE CONTENT */}
          <div 
            className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
              open ? "max-h-[1000px] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="min-h-0 space-y-4">
              {sections.map((sec, i) => (
                <div key={i} className="bg-slate-50 rounded-xl p-3 md:p-4 border border-slate-100">
                  <h4 className="font-semibold text-gray-800 mb-2 md:mb-3 text-sm md:text-base">
                    {sec.heading}
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm text-gray-600">
                    {sec.items.map((item, j) => (
                      <li key={j} className="flex gap-2 items-start">
                        <span className="text-green-600 font-bold shrink-0 mt-0.5">✔</span>
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function FloatingWhatsApp() {
  return (
    <>
      {/* Animation Styles */}
      <style>
        {`
        
        /* Slide In Animation */
        @keyframes slideIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* Smart Occasional Wiggle */
        @keyframes wiggleSmart {
          0%, 88%, 100% { transform: rotate(0deg); }
          90% { transform: rotate(-6deg); }
          92% { transform: rotate(6deg); }
          94% { transform: rotate(-4deg); }
          96% { transform: rotate(4deg); }
        }

        /* Soft Glow Pulse */
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 0 rgba(37, 211, 102, 0.4); }
          50% { box-shadow: 0 0 20px rgba(37, 211, 102, 0.7); }
        }

        .animate-entry {
          animation: slideIn 0.6s ease-out forwards;
        }

        .animate-wiggle {
          animation: wiggleSmart 4s ease-in-out infinite;
        }

        .animate-glow {
  animation: glowPulse 2.5s ease-in-out infinite;
}

@keyframes blinkDot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.animate-dot {
  animation: blinkDot 1s infinite;
}

 } `}

</style>

      {/* Wrapper (Entry Animation Here) */}
      <div className="fixed bottom-6 right-6 z-50 animate-entry">

        {/* Button (Wiggle + Glow Here) */}
        <a
          href="https://wa.me/918939592323?text=Hi,%20I%20am%20interested%20in%20Python%20Training"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 
          bg-[#25D366] text-white px-4 py-3 rounded-full 
          shadow-2xl hover:bg-[#20bd5a] transition-all 
          hover:scale-110 animate-wiggle animate-glow"
          aria-label="Chat on WhatsApp"
        >
          {/* WhatsApp Icon */}
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>

          {/* Label (Hidden on Mobile) */}
          <div className="hidden md:block text-left">
            <div className="text-[10px] leading-tight opacity-90">
              Need Help?
            </div>
            <div className="font-bold text-sm leading-tight">
              Chat with us
            </div>
          </div>
        </a>
      </div>
    </>
  );
}
}
