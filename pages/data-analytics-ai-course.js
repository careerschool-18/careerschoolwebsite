// pages/data-analyst.js
import { useState, useMemo, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import StickyEnroll from "../components/StickyEnroll";
import { FiTrendingUp, FiChevronDown, FiChevronUp, FiMenu, FiX } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

// Form Components & Validation Utilities
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import toast from "react-hot-toast";
import { isValidPhoneNumber } from "libphonenumber-js";
import Select from "react-select";
import { State, City } from "country-state-city";
import { Send, GraduationCap } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";


export default function DataAnalyst() {
  const router = useRouter();
  const [curriculumOpen, setCurriculumOpen] = useState({});
  const [faqOpen, setFaqOpen] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // FAQ Section state trackers
  const [activeFaqTab, setActiveFaqTab] = useState("General");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  // Mobile specific accordion expanded states tracking
  const [mobileExpandedModules, setMobileExpandedModules] = useState({});



  // Custom State tracker for the brochure module accordion mapping
  const [activeModule, setActiveModule] = useState(0);

  // Hydration state fixer to attach select portal to document body safely
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // --- Multi-Field Enrollment Form State ---
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    degree: "",
    specialization: "",
    college: "",
    state: "",
    city: "",
    experience: "",
    course: "DATA_ANALYTICS_AI",
    source: "",
  });

  const [errors, setErrors] = useState({});

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

  // Toggle module visibility on mobile viewport clicks
  const toggleMobileModule = (index) => {
    setMobileExpandedModules((prev) => ({
      ...prev,
      [index]: !prev[index]
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
    window.open("https://wa.me/918939592323", "_blank");
  };

  // Custom Select Dropdown UI Configurations
  const customSelectStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#f3f4f6",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      padding: "6px",
      color: "#1e40af",
      fontWeight: "500",
      boxShadow: "none",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      zIndex: 9999,
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#eff6ff" : "transparent",
      color: "#1e40af",
      padding: "10px 20px",
    }),
    placeholder: (base) => ({ ...base, color: "#64748b" }),
    singleValue: (base) => ({ ...base, color: "#1e40af" }),
  };

  const degreeOptions = [
    { label: "B.Tech / B.E", value: "BTECH" },
    { label: "BCA", value: "BCA" },
    { label: "B.Sc", value: "BSC" },
    { label: "B.Com", value: "BCOM" },
    { label: "BBA", value: "BBA" },
    { label: "BA", value: "BA" },
    { label: "MCA", value: "MCA" },
    { label: "MBA", value: "MBA" },
    { label: "Diploma / Polytechnic", value: "DIPLOMA" },
    { label: "ITI", value: "ITI" },
    { label: "Other", value: "OTHER" },
  ];

  const experienceOptions = [
    { label: "Fresher", value: "FRESHER" },
    { label: "6 Months - 1 Year", value: "0.5_1" },
    { label: "1 Year - 3 Years", value: "1_3" },
    { label: "3 Years - 5 Years", value: "3_5" },
    { label: "5+ Years", value: "5_PLUS" },
  ];

  const sourceOptions = [
    { label: "WhatsApp", value: "WHATSAPP" },
    { label: "Google", value: "GOOGLE" },
    { label: "Referral", value: "REFERRAL" },
    { label: "LinkedIn", value: "LINKEDIN" },
    { label: "Facebook", value: "FACEBOOK" },
    { label: "Instagram", value: "INSTAGRAM" },
    { label: "YouTube", value: "YOUTUBE" },
  ];

  const courseOptions = [
    {
      label: "Combo Course",
      options: [
        { label: "Data Analytics + AI", value: "DATA_ANALYTICS_AI" },
        { label: "Python + AI + Analytics", value: "PYTHON_COMBO" },
        { label: "Java + AI + Analytics", value: "JAVA_COMBO" },
        { label: "Digital Marketing + AI + Analytics", value: "MARKETING_COMBO" },
        { label: "HR + AI + Analytics", value: "HR_COMBO" },
        { label: "Finance + AI + Analytics", value: "FINANCE_COMBO" },
      ],
    },
    {
      label: "ZOHO Certification",
      options: [
        { label: "ZOHO Payroll", value: "ZOHO_PAYROLL" },
      ],
    },
    {
      label: "IT / Software",
      options: [
        { label: "Python Full Stack + AI", value: "PYTHON_FULL_STACK" },
        { label: "Java Full Stack + AI", value: "JAVA_FULL_STACK" },
        { label: "Web Development", value: "WEB_DEVELOPMENT" },
        { label: "Data Analytics", value: "DATA_ANALYTICS" },
        { label: "Business Analytics", value: "BA" },
        { label: "Digital Marketing", value: "DIGITAL_MARKETING" },
        { label: "UI/UX", value: "UIUX" },
        { label: ".NET", value: "DOTNET" },
      ],
    },
    {
      label: "HR / Operations",
      options: [
        { label: "HR Analytics", value: "HR_ANALYTICS" },
        { label: "Finance", value: "FINANCE" },
        { label: "Accounting", value: "ACCOUNTING" },
      ],
    },
    {
      label: "Internships / Project Support",
      options: [
        { label: "Internships", value: "INTERNSHIPS" },
        { label: "Project Support", value: "PROJECT_SUPPORT" },
      ],
    },
  ];

  const currentCourseSelectedValue = useMemo(() => {
    for (const group of courseOptions) {
      const found = group.options.find(opt => opt.value === formData.course);
      if (found) return found;
    }
    return null;
  }, [formData.course]);

  const specializationOptions = [
    {
      label: "Engineering / Technology",
      options: [
        { label: "Computer Science Engineering (CSE)", value: "CSE" },
        { label: "Information Technology (IT)", value: "IT" },
        { label: "Electronics & Communication (ECE)", value: "ECE" },
        { label: "Electrical & Electronics (EEE)", value: "EEE" },
        { label: "Mechanical Engineering", value: "MECH" },
        { label: "Civil Engineering", value: "CIVIL" },
        { label: "Chemical Engineering", value: "CHEMICAL" },
        { label: "Artificial Intelligence (AI)", value: "AI" },
        { label: "AI & Machine Learning", value: "AI_ML" },
        { label: "Data Science", value: "DATA_SCIENCE" },
        { label: "Cyber Security", value: "CYBER_SECURITY" },
        { label: "Cloud Computing", value: "CLOUD" },
        { label: "Software Engineering", value: "SOFTWARE" },
        { label: "Mechatronics", value: "MECHATRONICS" },
        { label: "Robotics", value: "ROBOTICS" },
        { label: "Automobile Engineering", value: "AUTO" },
        { label: "Aerospace Engineering", value: "AEROSPACE" },
        { label: "Aeronautical Engineering", value: "AERONAUTICAL" },
        { label: "Blockchain Technology", value: "BLOCKCHAIN" },
        { label: "Internet of Things (IoT)", value: "IOT" },
        { label: "Big Data Engineering", value: "BIG_DATA" },
        { label: "Other Engineering Stream", value: "OTHER_ENGG" },
      ],
    },
    {
      label: "Commerce",
      options: [
        { label: "Accounting & Finance", value: "ACCOUNTS_FINANCE" },
        { label: "Banking & Insurance", value: "BANKING_INSURANCE" },
        { label: "Corporate Accounting", value: "CORPORATE_ACC" },
        { label: "Taxation", value: "TAXATION" },
        { label: "Auditing", value: "AUDITING" },
        { label: "Business Analytics", value: "BUSINESS_ANALYTICS" },
        { label: "E-Commerce", value: "ECOMMERCE" },
        { label: "Financial Markets", value: "FIN_MARKETS" },
        { label: "Investment Banking", value: "INVESTMENT_BANKING" },
        { label: "International Business", value: "INTL_BUSINESS" },
        { label: "Business Administration", value: "BUSINESS_ADMIN" },
        { label: "Entrepreneurship", value: "ENTREPRENEURSHIP" },
        { label: "Chartered Accountant (CA)", value: "CA" },
        { label: "Company Secretary (CS)", value: "CS" },
        { label: "Cost & Management Accounting (CMA)", value: "CMA" },
        { label: "Other Commerce Stream", value: "OTHER_COMMERCE" },
      ],
    },
    {
      label: "Arts / Humanities",
      options: [
        { label: "English Literature", value: "ENGLISH" },
        { label: "History", value: "HISTORY" },
        { label: "Political Science", value: "POLITICAL_SCIENCE" },
        { label: "Sociology", value: "SOCIOLOGY" },
        { label: "Psychology", value: "PSYCHOLOGY" },
        { label: "Economics", value: "ECONOMICS" },
        { label: "Public Administration", value: "PUBLIC_ADMIN" },
        { label: "Philosophy", value: "PHILOSOPHY" },
        { label: "Journalism & Mass Communication", value: "JOURNALISM" },
        { label: "Media Studies", value: "MEDIA" },
        { label: "Visual Communication", value: "VISCOM" },
        { label: "Fine Arts", value: "FINE_ARTS" },
        { label: "Performing Arts", value: "PERFORMING_ARTS" },
        { label: "Social Work (BSW/MSW)", value: "SOCIAL_WORK" },
        { label: "Linguistics", value: "LINGUISTICS" },
        { label: "Other Arts Stream", value: "OTHER_ARTS" },
      ],
    },
  ];

  const states = useMemo(() =>
    State.getStatesOfCountry("IN").map((s) => ({
      label: s.name,
      value: s.isoCode,
    })), []
  );

  const allCities = useMemo(() =>
    State.getStatesOfCountry("IN").flatMap((state) =>
      City.getCitiesOfState("IN", state.isoCode).map((city) => ({
        label: city.name,
        value: city.name,
        stateCode: state.isoCode,
      }))
    ), []
  );

  // Validation Engine Logic
  const validate = (data) => {
    let err = {};
    if (!data.name) err.name = "Required";
    if (!data.email) err.email = "Required";
    if (!data.mobile || !isValidPhoneNumber(data.mobile)) err.mobile = "Invalid";
    if (!data.degree) err.degree = "Required";
    if (!data.college) err.college = "Required";
    if (!data.city) err.city = "Required";
    if (!data.experience) err.experience = "Required";
    if (!data.course) err.course = "Required";
    if (!data.source) err.source = "Required";
    return err;
  };

  const updateForm = (updated) => {
    setFormData(updated);
    setErrors(validate(updated));
  };

  const handleCityChange = (selected) => {
    updateForm({
      ...formData,
      city: selected?.value || "",
      state: selected?.stateCode || "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate(formData);
    if (Object.keys(err).length) {
      toast.error("Please fill all required fields");
      return;
    }

    // Creates a loading state notification banner
    const loadingToast = toast.loading("Submitting your application...");

    try {
      // 1. Prepare payload exactly matching your CourseEnquiryRequestDTO mappings
      const payload = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        countryCode: "IN", // Matches default country parameter
        qualification: formData.degree,
        specialization: formData.specialization || "None",
        school_name: formData.college,
        City: formData.city,
        State: formData.state,
        work_experience: formData.experience,
        course: formData.course,
        source: formData.source,
        enquiryType: "COURSE_INTERNSHIP", // Maps directly to your valid Java EnquiryType Enum values
        trainingMode: "OFFLINE", // Default structural type fallback parameter
        preferredRole: "Data Analyst Associate"
      };

      
      // 2. Dispatch network pipeline transaction directly to your Spring Boot Server
      const response = await fetch("https://career-school.co.in/api/v1/course-enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      

      const result = await response.json();

      // 3. Process backend status response objects
      if (response.ok && result.success) {
        toast.dismiss(loadingToast);
        toast.success(result.message || "Application Submitted Successfully!");

        // Optional: Reset frontend form tracking variables back to empty spaces
        setFormData({
          name: "",
          email: "",
          mobile: "",
          degree: "",
          specialization: "",
          college: "",
          state: "",
          city: "",
          experience: "",
          course: "DATA_ANALYTICS_AI",
          source: "",
        });
      } else {
        toast.dismiss(loadingToast);
        toast.error(result.errorDetail || "Server accepted lead, but data synchronization failed.");
      }
    } catch (error) {
      // Handle fallback network processing pipeline errors gracefully
      toast.dismiss(loadingToast);
      console.error("Backend connection failure trace:", error);
      toast.error("Unable to connect to the server. Please check your network connection.");
    }
  };

  const isValid =
    Object.keys(errors).length === 0 &&
    Object.values(formData).every((v, index) => {
      if (Object.keys(formData)[index] === 'specialization') return true;
      return v !== "";
    });

  const getFilteredSpecs = () => {
    if (formData.degree === "BTECH") return specializationOptions.filter(s => s.label.includes("Engineering"));
    if (formData.degree === "BCOM") return specializationOptions.filter(s => s.label.includes("Commerce"));
    if (formData.degree === "BA") return specializationOptions.filter(s => s.label.includes("Arts"));
    return [];
  };

  const filteredSpecs = getFilteredSpecs();

  // Brochure Syllabus Modules structured data cleanly mapped out from the provided PDF
  const brochureModules = [
  {
    title: "Advanced Excel for Data Analytics",
    sub: "Master essential spreadsheet operations, analytical lookups, and presentation charting.",
    topics: [
      { name: "Introduction to Excel & Workspaces", details: "Overview of Excel interface, basic navigation, commands, data entry, and cell formatting for data consistency." },
      { name: "Data Cleaning & Structural Validation", details: "Identifying and handling missing data alongside advanced data validation techniques." },
      { name: "Statistical & Conditional Logic Functions", details: "Computing statistical summaries including Mean, Median, Mode, standard deviation, and variance. Conditional analysis using IF, AND, and OR functions with nested IF statements." },
      { name: "Advanced Database Lookups", details: "Extracting cross-table references via classic VLOOKUP, HLOOKUP, or using the dynamic INDEX and MATCH functions." },
      { name: "Pivot Tables & Dynamic Dashboards", details: "Creating and customizing PivotTables for dynamic data analysis, advanced charting techniques, waterfall charts, combo charts, trend lines, forecasting, and data slicing visual interactions." }
    ]
  },
  {
    title: "SQL for Analytics & Data Management",
    sub: "Design robust relational database queries to prepare, filter, and transform complex tables.",
    topics: [
      { name: "SQL Interface & Table Architectures", details: "Understanding relational databases, core data types, reading tables, updating tables, and deleting data or complete structures." },
      { name: "SQL Data Preparation & Joining", details: "Introduction to data preparation, assembling rows using Left, Right, Inner, and Full Joins, subqueries, unions, and transforming data." },
      { name: "Aggregative Functions & Segment Controls", details: "Summarizing deep records using aggregative functions with Group By clauses and filtering sets with the Having clause." },
      { name: "Data Validation & Integrity Checks", details: "Using aggregative functions to clean and validate table data dates for structural consistency." },
      { name: "Analytical Window Functions", details: "Running advanced telemetry evaluations across boundaries via window functions, statistics computation, and ranking order boundaries." }
    ]
  },
  {
    title: "Microsoft Power BI Business Intelligence",
    sub: "Connect hybrid data pipelines, write calculation rules, and assemble enterprise dashboards.",
    topics: [
      { name: "Ecosystem Connectivity & Data Loading", details: "Introduction to Business Intelligence (BI) and its role in decision-making, introductory use cases, connecting to Excel, CSV, or databases, and managing data extraction and loading." },
      { name: "Power Query Data Transformation", details: "Introduction to Power Query tools, data cleaning operations, handling missing values, layout shaping, and merging records dynamically." },
      { name: "Data Modeling & Normalized Star Schemas", details: "Building structural relationships between tables, setting up Star Schema modeling patterns, and applying data normalization basics." },
      { name: "DAX Expression Programming", details: "Introduction to Data Analysis Expressions (DAX), programming measures vs calculated columns, writing common functions like SUM, COUNT, IF, and configuring complex time intelligence functions." },
      { name: "Visualization & Enterprise Cloud Sharing", details: "Assembling interactive dashboards with charts, tables, KPIs, filters, slicers, and drill-down reports, publishing reports to the cloud, sharing dashboards, and configuring collaboration features." }
    ]
  },
  {
    title: "Tableau Visual Storytelling Narrative",
    sub: "Translate massive raw corporate metrics into high-fidelity interactive visual analytics.",
    topics: [
      { name: "Workspace Mapping & Live Connections", details: "Importance of data visualization, introduction to Tableau, layout interface overview, connecting to multiple data sources, and managing Extract vs Live connections." },
      { name: "Dimensions, Hierarchies & Attributes", details: "Data cleaning techniques, data blending configurations, working with categories, text data types, dimensions, measures, and hierarchies." },
      { name: "Telemetry Visualizations", details: "Drafting high-fidelity charts and visualizations including bar charts, line charts, pie charts, heatmaps, tree maps, and geographic/spatial analysis maps." },
      { name: "Advanced Visual Analysis", details: "Programming field variables with calculated fields, setting up custom parameters, visual filters, distinct sets, and layout groups." },
      { name: "LOD (Level of Detail) Expressions", details: "Creating calculations independent of display resolutions using Level of Detail (LOD) expressions, configuring interactive dashboard actions, and running performance optimization metrics." }
    ]
  },
  {
    title: "Artificial Intelligence & Automation Integration",
    sub: "Deploy modern generative models and prompt systems directly over your analytical processes.",
    topics: [
      { name: "AI for Data Visualization & Core Languages", details: "Utilizing deep learning models to augment visualization layers across operational platforms including Excel, SQL, Power BI, Tableau, and Python." },
      { name: "Generative AI & Prompt Engineering", details: "Constructing rigorous text prompt boundaries and patterns using foundational prompt engineering concepts to generate relational intelligence templates." },
      { name: "AI-Powered Data Preparation", details: "Deploying automated configurations to manage data cleaning and preparation pipelines across unstructured formats." },
      { name: "AI for Insights & Business Decisions", details: "Integrating predictive analytical models to evaluate trends and parse deep automated insights for business decisions." },
      { name: "Reporting Automation & Strategic Decisions", details: "Setting automated report builders to transform raw data into concise summaries, presentations, and fully automated analytics." }
    ]
  }
];

  // Placement Records extracted contextually from success reviews
  const placementGalleryItems = [
    { name: "Dhanush S", role: "Aviation Data Analyst", company: "Indigo Operations Track", package: "6.5 LPA", image: "/Student Review Images/Dhanush.jpg" },
    { name: "Ferozkhan M", role: "HR Operations Analyst", company: "Zoho Ecosystem Partner", package: "5.8 LPA", image: "/Student Review Images/Ferokhan.png" },
    { name: "Mohamed Ismail M", role: "Sports Intelligence Analyst", company: "Sportz Interactive BI Team", package: "7.2 LPA", image: "/Student Review Images/Mohammed Ismail.png" },
    { name: "Sujitha Siva", role: "Junior HR Data Scientist", company: "Tech Mahindra Analytics", package: "6.0 LPA", image: "/Student Review Images/Sujitha.png" },
    { name: "Velmurugan", role: "Business Intelligence Associate", company: "Cognizant Data Systems", package: "6.8 LPA", image: "https://randomuser.me/api/portraits/men/44.jpg" },
    { name: "Amritha", role: "Data Quality Controller", company: "Capgemini Engineering", package: "5.5 LPA", image: "https://randomuser.me/api/portraits/women/32.jpg" }
  ];

  const companyLogos = [
    "/logo/m.png", "/logo/e.png", "/logo/a.png", "/logo/d.png", "/logo/r.png", "/logo/p.png", "/logo/s.png", "/logo/r.png", "/logo/p.png",
  ];

  return (
    <>
      <Head>
        <title>Data Analytics with AI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Safe CSS Injection to format target external React Phone Input elements */}
        <style dangerouslySetInnerHTML={{
          __html: `
          .PhoneInputInput {
            background: transparent !important;
            border: none !important;
            outline: none !important;
            font-weight: 500;
            color: black !important;
            padding: 8px 0;
          }
          .logo-marquee {
            width: max-content;
            animation: marquee 25s linear infinite;
          }
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          /* Custom Placement Gallery constraints without blur */
          .placement-swiper .swiper-slide {
            transition: all 0.5s ease-in-out;
            filter: blur(0px);
            opacity: 0.6;
            transform: scale(0.85);
          }
          
          /* Spotlight cone layer falling vertically over the card bounds */
          .placement-swiper .swiper-slide-active::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(to bottom, rgba(255, 203, 14, 0.12) 0%, rgba(255, 203, 14, 0.03) 50%, transparent 100%);
            z-index: 20;
            pointer-events: none;
            border-radius: 24px;
          }
         
        `}} />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      <div className="bg-black text-white font-sans">
        {/* ================= NAVBAR ================= */}
        <nav className="bg-white shadow sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-6">
            <div className="flex items-center gap-4 cursor-pointer" onClick={goToHome}>
              <img src="/Nav Logo/CSHR - Nav Logo.png" className="h-10 md:h-11 object-contain" alt="Careerschool Logo" />
              <div className="h-7 w-[1px] bg-gray-300"></div>
              <div className="flex flex-col items-center justify-center">
                <img src="/Zoho Images/ZOHO LOGO - Zoho Card.png" className="h-7 md:h-8 object-contain" alt="Zoho Logo" />
              </div>
            </div>

            <ul className="hidden md:flex gap-6 items-center font-medium text-gray-700">
              <li className="hover:text-blue-600 cursor-pointer transition" onClick={goToHome}>Home</li>
              <li className="hover:text-blue-600 cursor-pointer transition" onClick={() => scrollToSection("enroll")}>Courses</li>
              <button
                onClick={() => scrollToSection("enroll")}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
              >
                Enroll Now
              </button>
            </ul>

            {/* Mobile Hamburger/Close Menu Trigger Button */}
            <button 
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden block text-gray-900 hover:text-blue-600 p-2 text-2xl focus:outline-none transition-colors relative z-50"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <FiX size={24} className="text-gray-900" /> : <FiMenu size={24} className="text-gray-900" />}
            </button>

          </div>

          {menuOpen && (
            <div className="md:hidden bg-white border-t">
              <div className="flex flex-col items-center py-4">
                <span className="text-xs text-gray-500 mb-4">Powered by Zoho</span>
                <ul className="flex flex-col text-center font-medium text-gray-700 w-full">
                  <li className="py-4 border-b cursor-pointer" onClick={goToHome}>Home</li>
                  <li className="py-4 border-b cursor-pointer" onClick={() => scrollToSection("enroll")}>Courses</li>
                  <li className="py-4">
                    <button onClick={() => scrollToSection("enroll")} className="bg-blue-600 text-white px-6 py-2 rounded-lg">
                      Enroll Course
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </nav>

        {/* ================= SECTION 1: HERO ================= */}
        {/* ================= SECTION 1: HERO ================= */}
        {/* ================= SECTION 1: HERO ================= */}
        <section className="bg-black text-white min-h-[74vh] relative overflow-hidden pb-10 lg:pb-20">

          <div className="relative z-10 max-w-7xl mx-auto px-6 pt-0 lg:pt-16 pb-6">
            <div className="flex flex-col-reverse lg:grid lg:grid-cols-[1fr_1.2fr] gap-4 lg:gap-16 items-center">
              <div className="text-center lg:text-left mt-[-30px] lg:mt-0">
               <h1 className="text-[28px] leading-[1.2] md:text-6xl font-bold md:leading-[1.1]">
                  <span className="text-white block">Data Analytics</span>
                  <span className="block mt-2">
                    <span className="text-white mr-3">with</span>
                    <span className="text-[#a78bfa]">
                      AI Tools Certification
                    </span>
                  </span>
                  <span className="text-white mt-2 block">Course</span>
                </h1>
                <p className="text-gray-400 text-base md:text-lg mt-4 lg:mt-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Learn Data Analytics, AI Tools, Dashboarding, PowerBI, MySQL and Payroll with hands-on projects and placement-focused training from industry experts.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8">
                  <button onClick={() => scrollToSection("enroll")} className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-2xl">
                    Enroll Now
                  </button>
                </div>
              </div>

              <div className="relative flex justify-center lg:justify-end items-center w-full min-h-[350px] lg:min-h-[700px]">
                <div className="relative w-full max-w-[450px] lg:max-w-[1000px]">
                  <img
                    src="/DA Landing Page/da1.webp"
                    alt="Data Analytics Masterclass"
                    style={{
                      maskImage: 'radial-gradient(circle, white 85%, transparent 100%)',
                      WebkitMaskImage: 'radial-gradient(circle, white 85%, transparent 100%)',
                      mixBlendMode: 'screen'
                    }}
                    className="w-full h-auto object-contain scale-110 lg:scale-150 lg:translate-y-[-40px] border-none transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= COMPANY LOGOS ================= */}
        <section className="px-6 py-6 bg-black">
          <div className="relative overflow-hidden rounded-2xl bg-black backdrop-blur-2xl shadow-2xl py-4">
            <div className="logo-marquee flex items-center">
              {[...companyLogos, ...companyLogos].map((logo, index) => (
                <div key={index} className="flex-shrink-0 flex items-center justify-center px-12">
                  <img
                    src={logo}
                    alt="company logo"
                    className="h-12 md:h-16 w-auto object-contain opacity-70 grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SECTION 2: TRAINING ENQUIRY FORM ================= */}
        <section id="enroll" className="w-full bg-white py-16 px-4 font-sans border-t border-b border-gray-100 relative z-30">
          <div className="max-w-3xl mx-auto bg-white border border-gray-200 p-6 sm:p-10 lg:p-12 rounded-[2rem] shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              <div className="grid grid-cols-1 gap-4">

                <div>
                  <label className="block text-gray-700 text-[10px] font-black uppercase tracking-widest mb-1 ml-1">Your Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    placeholder="Enter full name"
                    className="w-full p-4 rounded-xl bg-gray-100 text-black border-none placeholder:text-gray-500 focus:ring-2 ring-blue-600/20 outline-none font-medium"
                    onChange={(e) => updateForm({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-[10px] font-black uppercase tracking-widest mb-1 ml-1">Email Address</label>
                  <input
                    type="text"
                    value={formData.email}
                    placeholder="email@example.com"
                    className="w-full p-4 rounded-xl bg-gray-100 text-black border-none placeholder:text-gray-500 focus:ring-2 ring-blue-600/20 outline-none font-medium"
                    onChange={(e) => updateForm({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-[10px] font-black uppercase tracking-widest mb-1 ml-1">Phone Number</label>
                  <div className="bg-gray-100 rounded-xl p-2 px-4 border-none focus-within:ring-2 ring-blue-600/20 transition-all">
                    <PhoneInput
                      defaultCountry="IN"
                      value={formData.mobile}
                      className="custom-phone-input text-black"
                      onChange={(v) => updateForm({ ...formData, mobile: v })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-[10px] font-black uppercase tracking-widest mb-1 ml-1">Degree</label>
                    <Select
                      styles={customSelectStyles}
                      options={degreeOptions}
                      value={degreeOptions.find(o => o.value === formData.degree) || null}
                      menuPortalTarget={isMounted ? document.body : null}
                      onChange={(s) => updateForm({ ...formData, degree: s?.value, specialization: "" })}
                      placeholder="Select Degree"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-[10px] font-black uppercase tracking-widest mb-1 ml-1">College Name</label>
                    <input
                      type="text"
                      value={formData.college}
                      placeholder="College Name"
                      className="w-full p-4 rounded-xl bg-gray-100 text-black border-none placeholder:text-gray-500 font-medium"
                      onChange={(e) => updateForm({ ...formData, college: e.target.value })}
                    />
                  </div>
                </div>

                {filteredSpecs.length > 0 && (
                  <div>
                    <label className="block text-gray-700 text-[10px] font-black uppercase tracking-widest mb-1 ml-1">Specialization</label>
                    <Select
                      styles={customSelectStyles}
                      options={filteredSpecs}
                      menuPortalTarget={isMounted ? document.body : null}
                      onChange={(s) => updateForm({ ...formData, specialization: s?.value })}
                      placeholder="Select Specialization"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-[10px] font-black uppercase tracking-widest mb-1 ml-1">City</label>
                    <Select
                      styles={customSelectStyles}
                      options={allCities}
                      menuPortalTarget={isMounted ? document.body : null}
                      value={allCities.find(c => c.value === formData.city)}
                      onChange={handleCityChange}
                      placeholder="Select City"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-[10px] font-black uppercase tracking-widest mb-1 ml-1">State</label>
                    <Select
                      styles={customSelectStyles}
                      options={states}
                      menuPortalTarget={isMounted ? document.body : null}
                      value={states.find(s => s.value === formData.state)}
                      onChange={(s) => updateForm({ ...formData, state: s?.value })}
                      placeholder="Select State"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-[10px] font-black uppercase tracking-widest mb-1 ml-1">Experience</label>
                    <Select
                      styles={customSelectStyles}
                      options={experienceOptions}
                      value={experienceOptions.find(o => o.value === formData.experience) || null}
                      menuPortalTarget={isMounted ? document.body : null}
                      onChange={(s) => updateForm({ ...formData, experience: s?.value })}
                      placeholder="Select Experience"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-[10px] font-black uppercase tracking-widest mb-1 ml-1">Course Specialized</label>
                    <Select
                      styles={customSelectStyles}
                      options={courseOptions}
                      value={currentCourseSelectedValue}
                      menuPortalTarget={isMounted ? document.body : null}
                      onChange={(s) => updateForm({ ...formData, course: s?.value })}
                      placeholder="Select Course"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-[10px] font-black uppercase tracking-widest mb-1 ml-1">Where did you hear about us?</label>
                  <Select
                    styles={customSelectStyles}
                    options={sourceOptions}
                    value={sourceOptions.find(o => o.value === formData.source) || null}
                    menuPortalTarget={isMounted ? document.body : null}
                    onChange={(s) => updateForm({ ...formData, source: s?.value })}
                    placeholder="Choose Source"
                  />
                </div>

                <button
                  disabled={!isValid}
                  type="submit"
                  className={`w-full group mt-4 py-5 rounded-2xl flex items-center justify-center gap-3 text-lg font-black transition-all duration-300 shadow-xl ${isValid
                    ? "bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02] active:scale-95 shadow-blue-600/20"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}>
                  <Send size={18} />
                  Submit Application
                </button>

              </div>
            </form>
          </div>
        </section>

        {/* ================= NEW SECTION: ZOHO PAYROLL INTEGRATION ================= */}
        <section className="relative w-full overflow-hidden font-sans">

          {/* LAPTOP VIEW BACKGROUND BANNER */}
          <div
            className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{ backgroundImage: "url('/DA Landing Page/zohopayrollbanner.webp')" }}
          />

          {/* MOBILE VIEW BACKGROUND BANNER */}
          <div
            className="block md:hidden absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{ backgroundImage: "url('/DA Landing Page/zohopayrollmobile.webp')" }}
          />

          {/* DARK SEMI-TRANSPARENT OVERLAY FOR BETTER TEXT CONTRAST */}
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black/90 via-black/60 to-black/30 md:to-transparent z-10" />

          {/* INTERACTIVE TEXT GRID LAYER */}
          <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-6 py-12 sm:py-20 lg:py-32 grid md:grid-cols-2 gap-6 md:gap-8 items-center">

            {/* LEFT ALIGNED ACCENT CONTENT */}
            <div className="text-left space-y-4 md:space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#002B7F]/80 border border-blue-400/30 text-white text-[9px] md:text-xs font-black px-3 py-1.5 md:px-4 md:py-2 rounded-full uppercase tracking-widest backdrop-blur-md w-max">
                <img src="/Zoho Images/ZOHO LOGO - Zoho Card.png" alt="Zoho ecosystem" className="h-3 md:h-4 object-contain brightness-0 invert" />
                Official Certification Included
              </div>

              {/* Reduced font sizes on mobile viewports to fit perfectly inside the poster bounds */}
              <h2 className="text-2xl sm:text-4xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                Become a Certified <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-300">Zoho Payroll</span> <br className="hidden sm:block" />
                Analytics Professional
              </h2>

              <p className="text-gray-300 text-xs sm:text-base md:text-lg max-w-xl leading-relaxed">
                Gain practical expertise in Zoho Payroll, statutory compliance, payroll processing, CTC structuring, and workforce analytics with industry-focused live training.

              </p>

              {/* Responsive feature grid items updated to stay readable and tightly bound on mobile screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-4 pt-2 text-white font-semibold text-xs md:text-sm">
                <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl p-2.5 md:p-3 backdrop-blur-sm">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-bold shrink-0">✓</div>
                  Statutory Automation
                </div>
                <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl p-2.5 md:p-3 backdrop-blur-sm">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-bold shrink-0">✓</div>
                  CTC & Component Design
                </div>
                <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl p-2.5 md:p-3 backdrop-blur-sm">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-bold shrink-0">✓</div>
                  Real-time Ledger Telemetry
                </div>
                <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl p-2.5 md:p-3 backdrop-blur-sm">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-bold shrink-0">✓</div>
                  Live Industry Case Studies
                </div>
              </div>
            </div>

            {/* RIGHT SIDE SPACE RESERVED TO KEEP THE LOGO EMBLEM CRYSTAL CLEAR */}
            <div className="hidden md:block min-h-[300px] lg:min-h-[450px]" />

          </div>
        </section>

        {/* ================= MODERNIZED COURSE FEATURES SECTION WITH CAROUSEL ================= */}
        <section className="bg-[#f8fafc] py-20 rounded-t-[40px] relative z-20">
          <div className="max-w-7xl mx-auto px-6">

            {/* Clean, Modern Section Title */}
            <div className="max-w-3xl mb-16 text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">
                Project Showcases
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                Our Students Analytics Portfolio  
              </h2>
              <p className="text-slate-600 text-lg mt-4 max-w-2xl">
                Explore hands-on dashboards created by our students using Power BI, Data Analytics, HR Analytics, Finance Analytics, and real-world business datasets.
              </p>
            </div>

            {/* Swiper Slider Wrapper */}
            <div className="relative w-full">
              <Swiper
                spaceBetween={40}
                slidesPerView={1}
                loop={true}
                autoplay={{
                  delay: 7500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                  el: '.custom-modern-pagination'
                }}
                modules={[Pagination, Autoplay]}
                className="w-full"
              >
                {/* SLIDE 1: Dhanush S */}
                <SwiperSlide>
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 md:p-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center min-h-[420px]">
                    {/* Left Info Column */}
                    <div className="space-y-4 flex flex-col justify-center h-full text-left">
                      <span className="inline-block bg-purple-50 text-purple-700 text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider w-max">
                        Student Showcase — Dhanush S
                      </span>
                      <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-snug">
                        IPL Players performance Analysis
                      </h3>
                      <p className="text-slate-600 text-base leading-relaxed">
                        This project shows how raw sports data can be transformed into clear business insights using Power BI — helping us understand performance patterns, strategies, and competitive dynamics in the IPL.
                      </p>
                    </div>

                    {/* Right Protected Image Wrapper - No cropping */}
                    {/* Right Protected Image Wrapper - Fixed Corner Alignment */}
                    <div className="relative w-full flex items-center justify-center">
                      <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-slate-100 shadow-sm relative">
                        <img
                          src="/DA Landing Page/dhanushDashboard.webp"
                          alt="Aircraft Route Portfolio Dashboard"
                          className="absolute inset-0 w-full h-full object-cover block"
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                {/* SLIDE 2: Krupa */}
                <SwiperSlide>
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 md:p-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center min-h-[420px]">
                    {/* Left Info Column */}
                    <div className="space-y-4 flex flex-col justify-center h-full text-left">
                      <span className="inline-block bg-blue-50 text-blue-700 text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider w-max">
                        Student Showcase — Krupa
                      </span>
                      <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-snug">
                        End-to-End IPL Sports Analytics
                      </h3>
                      <p className="text-slate-600 text-base leading-relaxed">
                        Built a Power BI dashboard to visualize IPL historical data, providing actionable insights into team and player performance trends. Enhanced decision-making through interactive charts, slicers, and advanced analytics using DAX and Power Query.
                      </p>
                    </div>

                    {/* Right Protected Image Wrapper - No cropping */}
                    <div className="relative w-full flex items-center justify-center">
                      <div className="w-full bg-white rounded-2xl shadow-md p-1 border border-slate-100 overflow-hidden">
                        <img
                          src="/DA Landing Page/krupadashboard.webp"
                          alt="IPL History Telemetry Analysis Dashboard"
                          style={{ mixBlendMode: 'multiply' }}
                          className="w-full h-auto object-contain rounded-2xl block"
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                {/* SLIDE 3: Vinayaga*/}
                <SwiperSlide>
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 md:p-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center min-h-[420px]">
                    {/* Left Info Column */}
                    <div className="space-y-4 flex flex-col justify-center h-full text-left">
                      <span className="inline-block bg-blue-50 text-blue-700 text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider w-max">
                        Student Showcase — Vinayaga
                      </span>
                      <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-snug">
                        Brand and Hashtag Intelligence Analytics
                      </h3>
                      <p className="text-slate-600 text-base leading-relaxed">
                        Built a Power BI dashboard that tracks social media performance indicators like total engagement, impressions, virality trends, geographic distribution, and sentiment metrics across corporate brands
                      </p>
                    </div>

                    {/* Right Protected Image Wrapper - No cropping */}
                    <div className="relative w-full flex items-center justify-center">
                      <div className="w-full bg-white rounded-2xl shadow-md p-1 border border-slate-100 overflow-hidden">
                        <img
                          src="/DA Landing Page/vinayagadashboard.webp"
                          alt="IPL History Telemetry Analysis Dashboard"
                          style={{ mixBlendMode: 'multiply' }}
                          className="w-full h-auto object-contain rounded-2xl block"
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                {/* SLIDE 4: Bhuvan */}
                <SwiperSlide>
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 md:p-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center min-h-[420px]">
                    {/* Left Info Column */}
                    <div className="space-y-4 flex flex-col justify-center h-full text-left">
                      <span className="inline-block bg-blue-50 text-blue-700 text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider w-max">
                        Student Showcase — Bhuvan
                      </span>
                      <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-snug">
                        End-to-End Automative Market Insights
                      </h3>
                      <p className="text-slate-600 text-base leading-relaxed">
                        Built a  Power BI dashboard titled "Automotive Market Insights" that displays analytical charts regarding car sales, pricing trends, and market distributions.
                      </p>
                    </div>

                    {/* Right Protected Image Wrapper - No cropping */}
                    <div className="relative w-full flex items-center justify-center">
                      <div className="w-full bg-white rounded-2xl shadow-md p-1 border border-slate-100 overflow-hidden">
                        <img
                          src="/DA Landing Page/bhuvandashboard.webp"
                          alt="IPL History Telemetry Analysis Dashboard"
                          style={{ mixBlendMode: 'multiply' }}
                          className="w-full h-auto object-contain rounded-2xl block"
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>

              {/* Modern Capsule Pagination Custom Target */}
              <div className="custom-modern-pagination flex justify-center items-center gap-2 mt-8 z-30 relative"></div>
            </div>

            {/* Modern Styling Script for Custom Active Capsule Indicators */}
            <style dangerouslySetInnerHTML={{
              __html: `
              .custom-modern-pagination .swiper-pagination-bullet {
                width: 10px;
                height: 10px;
                background: #cbd5e1 !important;
                opacity: 1 !important;
                border-radius: 9999px;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              }
              .custom-modern-pagination .swiper-pagination-bullet-active {
                width: 32px !important;
                background: #2563eb !important;
                border-radius: 6px !important;
              }
            `}} />

          </div>
        </section>

        {/* ================= NEW SECTION: TRAINING SYLLABUS MODULES ACCORDION ================= */}
        <section id="training-syllabus" className="w-full bg-slate-900 py-24 px-4 font-sans text-white border-t border-b border-white/5 relative z-30">
          <div className="max-w-6xl mx-auto">

            {/* Section Headings */}
            <div className="text-center md:text-left mb-16 space-y-3">
              <p className="text-xs font-black uppercase tracking-widest text-yellow-400">
                Syllabus Breakdown
              </p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
                Explore Our Industry-Ready Curriculum
              </h2>
              <p className="text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed">
                Our tailored curriculum is built alongside data engineering mentors to transition learners fluidly into enterprise technology execution roles.
              </p>
            </div>

            {/* --- MOBILE ACCORDION VERSION --- */}
            <div className="block md:hidden space-y-4">
              {brochureModules.map((item, index) => {
                const isExpanded = !!mobileExpandedModules[index];
                return (
                  <div key={index} className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300">

                    {/* Header Action Button */}
                    <button
                      type="button"
                      onClick={() => toggleMobileModule(index)}
                      className="w-full p-5 text-left flex justify-between items-center bg-[#161616] hover:bg-[#1e1e1e] transition-colors"
                    >
                      <div className="space-y-1">
                        <p className="text-[9px] font-black uppercase tracking-wider text-yellow-400">
                          Module 0{index + 1}
                        </p>
                        <h4 className="font-extrabold text-base tracking-tight text-white">
                          {item.title}
                        </h4>
                      </div>
                      <div className="text-gray-400 shrink-0 ml-2">
                        {isExpanded ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                      </div>
                    </button>

                    {/* Expandable Body Drawer */}
                    {isExpanded && (
                      <div className="p-4 bg-[#121212] border-t border-white/5 space-y-4 text-left">
                        <p className="text-xs text-gray-400 font-medium pb-2 border-b border-white/5">
                          {item.sub}
                        </p>
                        <div className="space-y-3">
                          {item.topics.map((topic, tIdx) => (
                            <div key={tIdx} className="bg-white/5 border border-white/5 rounded-xl p-4 space-y-1">
                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-black text-[10px] shrink-0">
                                  {tIdx + 1}
                                </div>
                                <h5 className="font-extrabold text-sm text-white tracking-tight">
                                  {topic.name}
                                </h5>
                              </div>
                              <p className="text-gray-400 text-xs leading-relaxed pl-7 font-medium">
                                {topic.details}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>

            {/* --- LAPTOP/DESKTOP SPLIT VIEW VERSION --- */}
            <div className="hidden md:flex flex-col lg:flex-row gap-8 items-start">

              {/* LEFT SIDE: MODULE NAVIGATION SELECT BUTTONS */}
              <div className="w-full lg:w-[40%] flex flex-col gap-3.5">
                {brochureModules.map((item, index) => {
                  const isCurrent = activeModule === index;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveModule(index)}
                      className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 group flex justify-between items-center ${isCurrent
                        ? "bg-[#002B7F] border-blue-500 shadow-xl shadow-blue-900/20"
                        : "bg-[#121212] border-white/5 hover:border-white/20"
                        }`}
                    >
                      <div className="space-y-1 pr-4">
                        <p className={`text-[10px] font-black uppercase tracking-wider ${isCurrent ? "text-yellow-400" : "text-gray-500"}`}>
                          Module 0{index + 1}
                        </p>
                        <h4 className="font-extrabold text-sm md:text-base tracking-tight text-white group-hover:text-yellow-400 transition-colors">
                          {item.title}
                        </h4>
                      </div>
                      <div className={`p-2 rounded-xl shrink-0 transition-transform duration-300 ${isCurrent ? "bg-white/10 text-white rotate-90 md:rotate-0" : "bg-white/5 text-gray-400"}`}>
                        <FiTrendingUp size={16} />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* RIGHT SIDE: TOPIC CONTENT VIEWER CARD CONTAINER */}
              <div className="w-full lg:w-[60%] bg-[#121212] border border-white/5 rounded-3xl p-6 md:p-10 shadow-2xl relative">
                <div className="space-y-6">

                  {/* Selected Module Subheading Metadata */}
                  <div className="border-b border-white/5 pb-5 text-left">
                    <h3 className="text-xl md:text-2xl font-black text-yellow-400 tracking-tight">
                      {brochureModules[activeModule].title}
                    </h3>
                    <p className="text-gray-400 text-xs md:text-sm mt-1.5 leading-relaxed">
                      {brochureModules[activeModule].sub}
                    </p>
                  </div>

                  {/* Render Nested Specific Core Course Topics Lists */}
                  <div className="grid grid-cols-1 gap-4 max-h-[460px] overflow-y-auto pr-2 text-left scrollbar-thin scrollbar-thumb-white/10">
                    {brochureModules[activeModule].topics.map((topic, tIdx) => (
                      <div
                        key={tIdx}
                        className="bg-white/5 border border-white/5 rounded-2xl p-4 md:p-5 hover:bg-white/[0.08] transition-all duration-200"
                      >
                        <div className="flex items-start gap-3.5">
                          <div className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                            {tIdx + 1}
                          </div>
                          <div className="space-y-1">
                            <h5 className="font-extrabold text-sm md:text-base text-white tracking-tight">
                              {topic.name}
                            </h5>
                            <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-medium">
                              {topic.details}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>

            </div>

          </div>
        </section>

      {/* ================= NEW SECTION: DATA ANALYTICS PLACEMENT GALLERY ================= */}
       {/* <section id="placement-gallery" className="w-full bg-[#050b14] py-24 relative overflow-hidden z-30 border-b border-white/5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-blue-500/10 via-transparent to-transparent pointer-events-none blur-3xl z-0" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">

            <div className="text-center mb-16 space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-[#FFCB0E]">
                Our Alumni Network
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Data Analytics Placement Wall
              </h2>
              <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
                Discover our recent graduates who successfully transitioned from various academic backgrounds into high-growth enterprise data roles.
              </p>
            </div>

            <div className="w-full relative py-6">
              <Swiper
                centeredSlides={true}
                grabCursor={true}
                loop={true}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  320: { slidesPerView: 1.2, spaceBetween: 20 },
                  640: { slidesPerView: 2.2, spaceBetween: 30 },
                  1024: { slidesPerView: 3, spaceBetween: 40 }
                }}
                modules={[Autoplay]}
                className="placement-swiper overflow-visible"
              >
                {placementGalleryItems.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="bg-[#111622] rounded-3xl border border-white/5 shadow-2xl p-6 flex flex-col justify-between items-center text-center aspect-[3/4] max-w-[340px] mx-auto relative group overflow-hidden">

                      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none group-hover:from-blue-500/10 transition-all duration-500" />

                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-[#2E477D] shadow-xl relative z-10 shrink-0 mt-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover block"
                        />
                      </div>

                      <div className="space-y-2 relative z-10 my-4 flex-grow flex flex-col justify-center">
                        <h4 className="text-xl font-black text-white tracking-tight">
                          {item.name}
                        </h4>
                        <p className="text-[#FFCB0E] text-xs sm:text-sm font-bold uppercase tracking-wider">
                          {item.role}
                        </p>
                        <div className="h-px w-12 bg-white/10 mx-auto my-1" />
                        <p className="text-gray-400 text-xs font-semibold">
                          Placed at: <span className="text-white block mt-0.5 font-medium">{item.company}</span>
                        </p>
                      </div>

                      <div className="bg-[#2E477D]/40 border border-[#2E477D]/60 rounded-xl px-5 py-2.5 backdrop-blur-md relative z-10 w-full">
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">CTC Secured</p>
                        <p className="text-lg font-black text-white tracking-tight mt-0.5">{item.package}</p>
                      </div>

                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

          </div>
        </section> */}
       {/* {/* ================= NEW SECTION: DATA ANALYTICS PLACEMENT GALLERY ================= */}
        {/*<section id="placement-gallery" className="w-full bg-[#050b14] pb-6 relative overflow-hidden z-30 border-b border-white/5">
          {/* ... keeping your complete existing placement gallery swiper code exactly as is ... */}
        {/*</section>

        {/* ================= NEW SECTION: FAQ ACCORDION ================= */}

        <section className="pt-10 pb-24 bg-[#020617] px-6 relative z-30 border-b border-white/5">
          <div className="max-w-4xl mx-auto space-y-4">

            <div className="text-center mb-12 space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-[#FFCB0E]">
                Got Questions?
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Frequently Asked Questions
              </h2>
            </div>

            {/* Tab Navigation Menu */}
            <div className="flex flex-wrap justify-center gap-2 mb-10 border-b border-white/10 pb-6">
              {["General", "Power BI", "MySQL", "Zoho Payroll","AI Tools","Data Analytics Internship"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => {
                    setActiveFaqTab(tab);
                    setOpenFaqIndex(null);
                  }}
                  className={`px-5 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${activeFaqTab === tab
                    ? "bg-[#FFCB0E] text-black shadow-lg"
                    : "bg-[#0b1329] text-gray-400 border border-white/5 hover:border-white/20 hover:text-white"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Grouped Question Datasets Maps */}
            {({
              "General": [
    {
      "q": "Who can join these courses?",
      "a": "Anyone interested in building a career in Data Analytics, Business Intelligence, Payroll, or AI Tools can join. Students, freshers, working professionals, and career switchers are all welcome."
    },
    {
      "q": "Do I need prior technical knowledge?",
      "a": "No prior coding or analytics experience is required. The training starts from the fundamentals and gradually moves to advanced concepts."
    },
    {
      "q": "Are the classes practical or theory-based?",
      "a": "The training is highly practical with live projects, dashboards, assignments, tasks and real-world business scenarios."
    },
    {
      "q": "Do you provide placement support?",
      "a": "Yes, we provide placement assistance including resume building, interview preparation, mock interviews, and job referrals."
    },
    {
      "q": "Are the classes conducted in Offline or Online?",
      "a": "We offer both Online and Offline training options to provide flexible learning based on your convenience and location."
    },
    {
      "q": "What are the other additional benefits or session included in this program?",
      "a": "Along with technical training, students receive live projects, internship opportunities, LinkedIn profile optimization, Naukri profile building, resume preparation, mock interviews, career guidance, certification, and placement assistance to help them become industry ready."
    }
  ],
  "Power BI": [
    {
      "q": "What will I learn in the Power BI course?",
      "a": "You will learn data visualization, dashboard creation, DAX formulas, Power Query, data modeling, and interactive reporting using Power BI."
    },
    {
      "q": "Is Power BI useful for beginners?",
      "a": "Yes, Power BI is beginner-friendly and widely used in industries for business intelligence and analytics."
    },
    {
      "q": "Can I use Power BI without coding?",
      "a": "Absolutely. Power BI mainly focuses on drag-and-drop visualization with minimal coding requirements."
    },
    {
      "q": "What career opportunities are available after learning Power BI?",
      "a": "You can apply for roles such as Data Analyst, BI Developer, Reporting Analyst, MIS Executive, and Business Analyst."
    }
  ],
  "MySQL": [
    {
      "q": "What is MySQL used for?",
      "a": "MySQL is used to store, manage, and retrieve data for websites, applications, and business systems."
    },
    {
      "q": "Will I learn SQL queries from basics?",
      "a": "Yes, the course covers SQL fundamentals including SELECT queries, JOINS, GROUP BY, subqueries, functions, and database management."
    },
    {
      "q": "Is MySQL important for Data Analytics?",
      "a": "Yes, SQL is one of the most essential skills for Data Analysts and Business Intelligence professionals."
    },
    {
      "q": "Will there be hands-on database practice?",
      "a": "Yes, students work with real datasets and practice writing queries in live database environments."
    },
    {
      "q": "What jobs require MySQL skills?",
      "a": "MySQL skills are commonly required for Data Analyst, Database Administrator, Backend Developer, and Business Analyst roles."
    }
  ],
  "Zoho Payroll": [
    {
      "q": "What is Zoho Payroll?",
      "a": "Zoho Payroll is a cloud-based payroll management software used to automate employee salary processing and statutory compliance."
    },
    {
      "q": "What topics are covered in the Zoho Payroll course?",
      "a": "The course covers salary structures, payroll processing, PF, ESI, PT, TDS, compliance management, and payroll analytics."
    },
    {
      "q": "Is this course suitable for HR professionals?",
      "a": "Yes, this course is highly beneficial for HR professionals, payroll executives, accountants, and finance teams."
    },
    {
      "q": "Will I get payroll certification from ZOHO?",
      "a": "Yes, students will receive ZOHO payroll certificate upon successfully completing the trainings and assessment."
    }
  ],
  "AI Tools": [
    {
      "q": "What AI tools will be covered in the training?",
      "a": "The training includes modern AI productivity and analytics tools used for automation, reporting, content generation, and data analysis."
    },
    {
      "q": "Do I need programming knowledge to learn AI tools?",
      "a": "No, most AI tools covered in the course are beginner-friendly and designed for non-programmers as well."
    },
    {
      "q": "How can AI tools help in my career?",
      "a": "AI tools improve productivity, automate repetitive tasks, enhance decision-making, and increase job opportunities across industries."
    },
    {
      "q": "Are AI tools useful for Data Analytics?",
      "a": "Absolutely. AI tools help analysts automate insights, generate reports faster, clean data, and improve business intelligence workflows."
    }
  ],
  "Data Analytics Internship": [
    {
      "q": "Is internship support included in the program?",
      "a": "Yes, students get internship opportunities to gain real-world industry exposure and practical analytics experience."
    },
    {
      "q": "What kind of internship projects will I work on?",
      "a": "Students work on real-time projects including dashboards, business reports, HR analytics, finance analytics, and data visualization tasks."
    },
    {
      "q": "Will I receive an internship certificate?",
      "a": "Yes, students will receive an internship completion certificate after successfully completing the internship program."
    },
    {
      "q": "Will the internship help with placements?",
      "a": "Yes, the internship helps strengthen your resume, portfolio, LinkedIn profile, and practical experience, which improves placement opportunities."
    },
    {
      "q": "Can Experienced apply for the internship program?",
      "a": "Absolutely. The internship program is designed for students, freshers, beginners and experienced who want to gain industry-ready analytics experience."
    }
  ]
              
              
              
            }[activeFaqTab] || []).map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div key={i} className="bg-[#0b1329] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                    className="w-full text-left px-6 py-5 text-white font-extrabold text-base sm:text-lg flex justify-between items-center gap-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="tracking-tight">{faq.q}</span>
                    <span className="text-[#FFCB0E] text-2xl font-light shrink-0">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="bg-[#0e1731] text-gray-300 text-sm sm:text-base px-6 py-5 border-t border-white/5 leading-relaxed font-medium text-left">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}

          </div>
        </section>

      </div>

      <StickyEnroll />
      
    </>
  );
}