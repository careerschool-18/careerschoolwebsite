"use client";
import { useState, useEffect } from "react";
import Image from "next/image";



export default function HeroSection() {

    const scrollToSection = (id) => {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    };

  const [scrolled, setScrolled] = useState(false);
  
  const frameData = [
    { image: "/Hero Banner Student/Appas Banner.webp", link: "https://youtube.com/shorts/LSASGf5u7gE?si=p80jvjCtDg8iZEkL" },
    { image: "/Hero Banner Student/Rakesh Banner.webp", link: "https://youtube.com/shorts/XChAnt4XhKA?si=Wh1vw4GYV857v_uC" },
    { image: "/Hero Banner Student/Kokila Banner.webp", link: "https://youtube.com/shorts/fd23oWEWE-k?si=l9bMA5M2ejTL-1-1" },
    { image: "/Hero Banner Student/Gayathri Banner.webp", link: "https://youtube.com/shorts/4oGEpUAHbn0?si=mfydq8Am1lrctdj9" },
    { image: "/Hero Banner Student/Riyasudeen.webp", link: "https://youtube.com/shorts/lluWa-rLirU?si=kApKEc5C_OVjq2J2" },
    { image: "/Hero Banner Student/Srinivas Banner.webp", link: "https://youtu.be/Dxw0yIA_9qw?si=HYR_OQfm2SNyFWs0" },
    { image: "/Hero Banner Student/Sneha Banner.webp", link: "https://www.linkedin.com/feed/update/urn:li:activity:7458961699233067008/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADyT6p4BnuGXSZWAph-ReTQElDyDqUml-ks" },
    { image: "/Hero Banner Student/Siddiq Banner.webp", link: "https://www.linkedin.com/posts/abubackar-siddiq-56339a383_jobdrive-srmuniversity-careeropportunities-activity-7450506585073778688-dmM0?utm_source=share&utm_medium=member_desktop&rcm=ACoAADyT6p4BnuGXSZWAph-ReTQElDyDqUml-ks" },
    { image: "/Hero Banner Student/Thasleem Banner.webp", link: "https://www.linkedin.com/posts/thasleem-s_thank-you-to-careerschool-it-solutions-careerschool-share-7458192716322230272-f9HL?utm_source=share&utm_medium=member_desktop&rcm=ACoAADyT6p4BnuGXSZWAph-ReTQElDyDqUml-ks" },
    { image: "/Hero Banner Student/Dhanush Banner.webp", link: "https://www.linkedin.com/posts/dhanush-siva-9b071526b_powerbi-dataanalytics-ipl-ugcPost-7458056176044531712-L1Xz?utm_source=share&utm_medium=member_desktop&rcm=ACoAADyT6p4BnuGXSZWAph-ReTQElDyDqUml-ks" },
    { image: "/Hero Banner Student/Hasma Banner.webp", link: "https://youtube.com/shorts/mBaM14b4Xbs?si=qSps-sCqRKlVTgWJ" },
  ];

  return (
    <section className="relative w-full min-h-screen overflow-hidden">

      {/* Background Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #2f80d1 0%, #1d5fae 40%, #0b3475 70%, #00164d 100%)",
        }}
      />

      {/* Soft Glow */}
      <div className="absolute top-0 left-0 w-[60%] h-[60%] bg-white/10 blur-3xl opacity-30" />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 py-12 gap-10">

        {/* LEFT SIDE */}
        <div className="w-full lg:w-[50%] text-white text-center lg:text-left">

          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold"
            style={{ textShadow: "0 4px 8px rgba(0,0,0,0.3)" }}
          >
            <span className="india-flag-text">
              INDIA's
            </span>

            <br />

            TRUSTED CAREER DEVELOPMENT PLATFORM FOR TECHNOLOGY AND MANAGEMENT
          </h2>

          {/* Buttons */}
            <div className="flex gap-4 justify-center lg:justify-start flex-wrap mt-8">

              <a
                /*href={`https://wa.me/918939592323?text=${encodeURIComponent(
                  "Hi, I would like to know about the current job openings. Please let me know the available timings for a walk-in interview or a call with the HR team."
                )}`}*/
                href="/training-enquiry-form"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black mt-6 sm:mt-10 px-9 sm:px-11 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:scale-105 transition duration-300 inline-block w-full sm:w-auto text-center"
              >
                CAREERSCHOOL JOBS
              </a>

              <button
                onClick={() => scrollToSection("courses")}
                className="bg-yellow-400 text-black mt-6 sm:mt-10 px-5 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:scale-105 transition duration-300 w-full sm:w-auto"
              >
                CAREERSCHOOL TRAINING
              </button>

            </div>
        </div>

        {/* RIGHT SIDE - IMAGE GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 w-full lg:w-1/2 place-items-center">

          {frameData.map((frame, index) => (
            <a
              key={index}
              href={frame.link}
              target="_blank"
              rel="noopener noreferrer"
              className="float-item relative w-[120px] h-[150px] cursor-pointer block"
            >
              <div className="absolute left-2 top-1/4 -translate-y-1/2 w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center shadow animate-pulse">
                <span className="text-black text-xs font-bold">▶</span>
              </div>
              <Image
                src={frame.image}
                alt={`Student ${index}`}
                fill
                className="object-contain rounded-lg drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
              />
            </a>
        ))}

        </div>
      </div>

      {/* Floating Animation */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px) scale(1);
          }

          50% {
            transform: translateY(-8px) scale(1);
          }

          100% {
            transform: translateY(0px) scale(1);
          }
        }

        .float-item {
          animation: float 4s ease-in-out infinite;
          transition: transform 1000ms
        }

        .float-item:hover {
          animation: none;
          transform: scale(1.1);
          transition: transform 300ms ease-in-out;
        }
        
        .india-flag-text {
          display: inline-block;

          background: linear-gradient(
            90deg,
            #ff9933 0%,
            #ffb366 15%,
            #ffffff 35%,
            #dff5df 50%,
            #138808 70%,
            #46c646 85%,
            #ff9933 100%
            
          );

          /* large background for seamless looping */
          background-size: 300% 100%;

          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;

          animation: smoothIndiaFlow 8s linear infinite;
        }

        /* perfectly smooth infinite flow */
        @keyframes smoothIndiaFlow {
          from {
            background-position: 0% center;
          }

          to {
            background-position: -200% center;
          }
        }
      `}</style>

    </section>
  );
}