import { useRef, useState, useEffect } from "react";

export default function NewYearOffer2026() {
  const formRef = useRef(null);
  const reviewTrack = useRef(null);

  const [activeReview, setActiveReview] = useState(0);
  const [openSyllabusIndex, setOpenSyllabusIndex] = useState(null);
  const [isFormExpanded, setIsFormExpanded] = useState(false);

  /* ================= LOAD HUBSPOT SCRIPT ================= */
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js-na2.hsforms.net/forms/embed/243742367.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  /* ================= REVIEWS ================= */
  const reviews = [
    {
      name: "Pavithra",
      role: "Python with AI",
      text:
        "I recently completed my Python with AI training at Careerschool HR Solutions. The sessions were clear and practical.",
    },
    {
      name: "Gayathri",
      role: "Data Analytics",
      text:
        "The training and internship gave me real-time exposure to data handling, analysis, and reporting.",
    },
    {
      name: "Mukthar Ahamed R",
      role: "Data Analyst Intern",
      text:
        "I gained hands-on experience in dashboards, SQL, Excel, and real-time projects.",
    },
    {
      name: "Hema Sai",
      role: "Python Full Stack Intern",
      text:
        "Receiving the Star Student Award motivated me to keep learning and improving.",
    },
  ];

  /* ================= REVIEW AUTO SLIDE (CENTERED) ================= */
  useEffect(() => {
  if (!reviewTrack.current) return;

  const isMobile = window.innerWidth <= 768;

  const interval = setInterval(() => {
    if (!reviewTrack.current) return;

    const cards = reviewTrack.current.children;
    if (!cards.length) return;

    const cardWidth = cards[0].offsetWidth + 20;
    const total = reviews.length;

    setActiveReview((prev) => {
      const next = (prev + 1) % total;

      if (isMobile) {
        // Simple slide on mobile
        reviewTrack.current.style.transform = `translateX(-${
          next * cardWidth
        }px)`;
      } else {
        // Centered slide on desktop
        const containerWidth =
          reviewTrack.current.parentElement.offsetWidth;

        const offset =
          next * cardWidth -
          (containerWidth / 2 - cardWidth / 2);

        reviewTrack.current.style.transform = `translateX(-${offset}px)`;
      }

      return next;
    });
  }, 3000);

  return () => clearInterval(interval);
}, [reviews.length]);

  /* ================= HANDLERS ================= */
  const handleLogoClick = () => {
    window.location.href = "/";
  };

  const handleEnrollClick = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleFormExpand = () => {
    setIsFormExpanded((prev) => !prev);
  };
  /* ================= COURSES ================= */
  const courses = [
    {
      title: "ZOHO Payroll",
      image: "/Newyear/ZOHO Payroll.png",
      syllabus: [
        "Payroll Cycle",
        "Taxation (Income Tax,TDS)",
        "Statutory Compliance (PF, ESI, PT)",
        "Leave Management System (LMS)",
        "ZOHO Payroll Account Setup",
        "Implementation ZOHO Payroll",
        "Configuring Pay Schedule",
        "Integration with ZOHO Softwares",
        "Automation of Payroll Process",
        "Compliance and Reporting",
      ],
    },
    {
      title: "Java Mastery Program",
      image: "/Newyear/java-svg.svg",
      syllabus: [
        "Core Java & OOPS",
        "Collections & Exception Handling",
        "JDBC & MySQL",
        "Spring & Spring Boot",
        "REST APIs",
      ],
    },
    {
      title: "Python Pro Development",
      image: "/Newyear/python-svg.svg",
      syllabus: [
        "Python Fundamentals",
        "OOPS with Python",
        "Django & Flask",
        "Automation & Scripting",
        "Mini Projects",
      ],
    },
    {
      title: "Data Analytics & Visualization",
      image: "/Newyear/DA-svg.svg",
      syllabus: [
        "Excel & Advanced Formulas",
        "SQL Concepts",
        "Power BI",
        "LIVE Project",
      ],
    },
    {
      title: "HR Analytics",
      image: "/Newyear/HRAnalystics.svg",
      syllabus: [
        "Talent Acquisition",
        "Talent Management",
        "HR Operations",
        "Analytics for HR",
        "Professional Skill Development",
      ],
    },
  ];

  

  return (
    <>  

      <style jsx global>{`
        :root {
          --primary: #1ecbff;
          --primary-dark: #0fa0cf;
          --bg-dark: #0b1a24;
          --text-light: #d6e9f5;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: Inter, system-ui, sans-serif;
          background: radial-gradient(circle at top, #0e2a3f, var(--bg-dark));
          color: #fff;
        }

        /* HEADER */
        .white-header-left {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 5000;
          background: #fff;
          padding: 8px 20px;
          display: flex;
          align-items: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .logo-container-left {
          display: flex;
          gap: 20px;
          align-items: center;
          cursor: pointer;
        }

        .logo-img {
          height: 42px;
        }

        /* HERO */
        .hero {
          position: relative;
          min-height: 100vh;
          padding: 140px 16px 100px;
          display: flex;
          align-items: center;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
        }

        .hero-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(5, 15, 22, 0.65),
            rgba(5, 15, 22, 0.9)
          );
        }

        .hero-inner {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: auto;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          font-weight: 600;
          gap: 40px;
        }

        .hero h1 {
          font-size: clamp(32px, 5vw, 56px);
          margin-bottom: 16px;
          font-weight: 600;
        }

        .hero ul {
          font-weight: 600;
          list-style: none;
          margin-top: 20px;
        }

        .hero li {
          margin-bottom: 12px;
        }

        .hero li::before {
          content: "✓";
          color: var(--primary);
          margin-right: 8px;
        }

        /* FORM */
        .form-card {
          background: #fff;
          border-radius: 18px;
          padding: 12px;
          position: relative;
        }

        .form-container {
          max-height: 400px;
          overflow: hidden;
          transition: max-height 0.5s ease;
        }

        .form-container.expanded {
          max-height: 2000px;
        }

        .form-expand-btn {
          width: 100%;
          margin-top: 16px;
          padding: 12px;
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          border: none;
          border-radius: 10px;
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .form-expand-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(30, 203, 255, 0.3);
        }

        .expand-arrow {
          font-size: 18px;
          transition: transform 0.3s ease;
        }

        .expand-arrow.rotated {
          transform: rotate(180deg);
        }

        .form-card input,
        .form-card select {
          width: 100%;
          padding: 14px;
          border-radius: 10px;
          border: 1px solid #ddd;
          margin-bottom: 14px;
        }

        .primary-btn {
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          border: none;
          padding: 16px;
          border-radius: 12px;
          color: #fff;
          font-weight: 700;
          width: 100%;
          cursor: pointer;
        }

        /* SECTIONS */
        .section {
          padding: 70px 16px;
          max-width: 1100px;
          margin: auto;
        }

        /* COURSES — 3 cards per row */
        .courses {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        /* Mobile */
        @media (max-width: 900px) {
          .courses {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 900px) {
          .hero-inner {
            grid-template-columns: 1fr;
          }

          .courses {
            grid-template-columns: 1fr;
          }

          .courses > .course {
            grid-column: auto;
            justify-self: stretch;
          }

          .form-container {
            max-height: 350px;
          }
        }

        .course {
          background: #fff;
          color: #111;
          border-radius: 16px;
          padding: 22px;
        }

        .course-head {
          display: flex;
          gap: 14px;
          margin-bottom: 14px;
          align-items: center;
        }

        .course-actions {
          display: flex;
          gap: 10px;
        }

        .btn-syllabus,
        .btn-enroll {
          flex: 1;
          padding: 11px;
          border-radius: 10px;
          font-weight: 700;
          cursor: pointer;
        }

        .btn-syllabus {
          background: var(--primary);
          color: #fff;
          border: none;
        }

        .btn-enroll {
          border: 2px solid var(--primary);
          color: var(--primary);
          background: transparent;
        }

        .syllabus {
          margin-top: 14px;
          background: #f5faff;
          padding: 14px;
          border-radius: 10px;
        }

        /* REVIEWS */
        .spotlight-section {
          background: radial-gradient(circle at center, #0b1f2a, #020a10 70%);
          border-radius: 28px;
          padding: 80px 24px;
        }

        .review-carousel {
          overflow: hidden;
        }

        .review-track {
          display: flex;
          gap: 20px;
          align-items: center;
          transition: transform 0.6s ease;
          will-change: transform;
        }

        .review-card {
          background: #fff;
          color: #111;
          border-radius: 16px;
          padding: 26px;
          width: 360px;
          flex-shrink: 0;
          text-align: center;
          transition: all 0.45s ease;
        }

        .active-review {
          transform: scale(1.05);
          opacity: 1;
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.6);
        }

        .side-review {
          transform: scale(0.88);
          opacity: 0.35;
          filter: blur(1px);
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .review-track {
        }

          .review-card {
            margin: 0 auto;
        }

          .side-review {
            display: none;
          }
        }

        .review-name {
          font-size: 18px;
          font-weight: 700;
        }

        .review-role {
          font-size: 14px;
          color: #666;
          margin-bottom: 6px;
          display: block;
        }

        .stars {
          color: #ffd700;
          font-size: 18px;
          margin-bottom: 10px;
        }

        .review-subtext {
          text-align: center;
          color: #9fb3c8;
          max-width: 520px;
          margin: 0 auto 50px;
          font-size: 15px;
        }
      `}</style>

      {/* HEADER */}
      <header className="white-header-left">
        <div className="logo-container-left" onClick={handleLogoClick}>
          <img src="/Nav Logo/CSHR - Nav Logo.png" className="logo-img" />
          <img src="/Nav Logo/CSIT - Nav Logo.png" className="logo-img" />
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <img src="/Newyear/Banner.png" />
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-inner">
          <div>
            <h1>Open New Opportunities in 2026 🚀</h1>
            <p>New Year Special Offer on Job-Ready Skill Programs</p>
            <ul>
              <li>Industry aligned curriculum</li>
              <li>Live mentor support</li>
              <li>Placement assistance</li>
              <li>Lifetime access</li>
            </ul>
          </div>

          <div className="form-card" ref={formRef}>
            
            <div className={`form-container ${isFormExpanded ? 'expanded' : ''}`}>
              <div
                className="hs-form-frame"
                data-region="na2"
                data-form-id="0237c445-e852-43ea-9b9f-091cd6c000e5"
                data-portal-id="243742367"
              ></div>
            </div>

            <button className="form-expand-btn" onClick={toggleFormExpand}>
              {isFormExpanded ? 'Show Less' : 'Show More Fields'}
              <span className={`expand-arrow ${isFormExpanded ? 'rotated' : ''}`}>
                ▼
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section className="section">
        <h2 style={{ textAlign: "center", marginBottom: 36 }}>
          Choose Your Learning Path
        </h2>

        <div className="courses">
          {courses.map((course, i) => (
            <div className="course" key={i}>
              <div className="course-head">
                <img src={course.image} width="48" />
                <h4>{course.title}</h4>
              </div>

              <div className="course-actions">
                <button
                  className="btn-syllabus"
                  onClick={() =>
                    setOpenSyllabusIndex(openSyllabusIndex === i ? null : i)
                  }
                >
                  View Syllabus
                </button>
                <button className="btn-enroll" onClick={handleEnrollClick}>
                  Enroll
                </button>
              </div>

              {openSyllabusIndex === i && (
                <ul className="syllabus">
                  {course.syllabus.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section spotlight-section">
        <h2 style={{ textAlign: "center" }}>What Students Love About Us</h2>
        <p className="review-subtext">
          Real Google reviews from students who transformed their careers with us
        </p>

        <div className="review-carousel">
          <div className="review-track" ref={reviewTrack}>
            {reviews.map((r, i) => (
              <div
                key={i}
                className={`review-card ${
                  i === activeReview ? "active-review" : "side-review"
                }`}
              >
                <div className="review-name">{r.name}</div>
                <span className="review-role">{r.role}</span>
                <div className="stars">★★★★★</div>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}